import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import classNames from 'classnames';
import moment from 'moment';
// import { useFormik } from 'formik';

import Card, {
	CardActions,
	CardBody,
	CardHeader,
	CardLabel,
	CardTitle,
} from '../../components/bootstrap/Card';
import Button from '../../components/bootstrap/Button';

import Icon from '../../components/icon/Icon';
import OffCanvas, {
	OffCanvasBody,
	OffCanvasHeader,
	OffCanvasTitle,
} from '../../components/bootstrap/OffCanvas';
import FormGroup from '../../components/bootstrap/forms/FormGroup';
import Input from '../../components/bootstrap/forms/Input';

import PaginationButtons, { dataPagination, PER_COUNT } from '../../components/PaginationButtons';
import useSortableData from '../../hooks/useSortableData';
import useDarkMode from '../../hooks/useDarkMode';
import {
	GetUsageStatuss,
	PostUsageStatus,
	PutUsageStatus,
	DeleteUsageStatus,
} from '../../redux/actions/usagestatus';

import './styles.css';
import Select from '../../components/bootstrap/forms/Select';

// eslint-disable-next-line react/prop-types
const UsageStatusComponent = ({ isFluid }) => {
	const dispatch = useDispatch();
	const {
		// themeStatus,
		darkModeStatus,
	} = useDarkMode();
	const { usagestatusList, isPutUsageStatus, isPostUsageStatus, isDeleteUsageStatus } =
		useSelector((state) => state.usagestatus);

	const [opentNewUsageStatus, setOpenNewUsageStatus] = useState(false);
	const [opentEditUsageStatus, setOpenEditUsageStatus] = useState(false);
	const [opentDeleteUsageStatus, setOpenDeleteUsageStatus] = useState(false);

	// const accountInfo = localStorage.getItem('accountinfo');
	const accessToken = localStorage.getItem('accessToken');
	// const refreshToken = localStorage.getItem('refreshToken');
	// const account_id = JSON.parse(accountInfo);
	const token = JSON.parse(accessToken);
	// const refreshtoken = JSON.parse(refreshToken);

	const UsageStatus = [
		{
			name: '',
			create_date: moment().add(0, 'days').format('YYYY-MM-DD'),
		},
	];

	const selectStatus = [
		{ value: 'Normal', text: 'Normal' },
		{ value: 'Hidden', text: 'Hidden' },
	];
	

	useEffect(() => {
		dispatch(GetUsageStatuss());
	}, [dispatch]);

	useEffect(() => {
		dispatch(GetUsageStatuss());
	}, [dispatch, isPutUsageStatus, isPostUsageStatus, isDeleteUsageStatus]);

	const [currentPage, setCurrentPage] = useState(1);
	const [perPage, setPerPage] = useState(PER_COUNT['5']);

	const { items, requestSort, getClassNamesFor } = useSortableData(
		usagestatusList ? usagestatusList.data.results : UsageStatus,
	);

	const [dataform, setDataForm] = React.useState({
		_id: '',
		type: '',
		status: 'Normal',
		create_date: moment().add(0, 'days').format('YYYY-MM-DD'),
	});

	const [dataformedit, setDataFormEdit] = React.useState({
		_id: '',
		type: '',
		status: 'Normal',
		create_date: moment().add(0, 'days').format('YYYY-MM-DD'),
	});
	const openEditUsageStatus = (item) => {
		setDataFormEdit({
			...dataformedit,
			_id: item._id,
			type: item.type,
			status: item.status,
			create_date: item.create_date,
		});

		setOpenEditUsageStatus(true);
	};
	const handleEditForm = (event) => {
		setDataFormEdit({ ...dataformedit, [event.target.id]: event.target.value });
	};

	const openDeleteUsageStatus = (item) => {
		console.log(item, 'item');
		setDataFormEdit({
			...dataformedit,
			_id: item._id,
			type: item.type,
			status: item.status,
			create_date: item.create_date,
		});

		setOpenDeleteUsageStatus(true);
	};

	const deleteUsageStatus = () => {
		dispatch(DeleteUsageStatus(dataformedit._id, token));
	};

	const handleChangeUsageStatus = (e) => {
		setDataForm({ ...dataform, [e.target.id]: e.target.value });
	};

	const postUsageStatus = () => {
		dispatch(PostUsageStatus(dataform, token));
	};
	useEffect(() => {
		if (isPostUsageStatus === 'success') {
			setOpenNewUsageStatus(false);
		}
	}, [isPostUsageStatus]);

	const editUsageStatus = () => {
		dispatch(PutUsageStatus(dataformedit._id, dataformedit, token));
	};

	useEffect(() => {
		if (isPutUsageStatus === 'success') {
			setOpenEditUsageStatus(false);
		}
	}, [isPutUsageStatus]);
	useEffect(() => {
		if (isDeleteUsageStatus === 'success') {
			setOpenDeleteUsageStatus(false);
		}
	}, [isDeleteUsageStatus]);
	return (
		<>
			<Card stretch={isFluid}>
				<CardHeader borderSize={1}>
					<CardLabel icon='Alarm' iconColor='info'>
						<CardTitle>
							Total ' {usagestatusList && usagestatusList.data.results.length} '
							UsageStatuss
						</CardTitle>
					</CardLabel>
					<CardActions>
						<Button
							color='info'
							icon='CloudDownload'
							isLight
							onClick={() => setOpenNewUsageStatus(true)}>
							New UsageStatus
						</Button>
						<Button
							color='info'
							icon='CloudDownload'
							isLight
							tag='a'
							to='/somefile.txt'
							target='_blank'
							download>
							Export
						</Button>
					</CardActions>
				</CardHeader>
				<CardBody className='table-responsive' isScrollable={isFluid}>
					<table className='table table-modern'>
						<thead>
							<tr>
								<th
									onClick={() => requestSort('date')}
									className='cursor-pointer text-decoration-underline'>
									Thời gian{' '}
									<Icon
										size='lg'
										className={getClassNamesFor('date')}
										icon='FilterList'
									/>
								</th>
								<th>Loại</th>
								<th>Trạng thái</th>
								<th>Hành động</th>

								<td />
							</tr>
						</thead>
						<tbody>
							{dataPagination(items, currentPage, perPage).map((item) => (
								<tr key={item.id}>
									<td>
										<div className='d-flex align-items-center'>
											<span
											// className={classNames(
											// 	'badge',
											// 	'border border-2',
											// 	[`border-${themeStatus}`],
											// 	'rounded-circle',
											// 	'bg-success',
											// 	'p-2 me-2',
											// 	`bg-${item.color}`,
											// )}
											>
												{/* <span className='visually-hidden'>
													{item.name}
												</span> */}
											</span>
											<span className='text-nowrap'>
												{moment(`${item.create_date}`).format('YYYY-MM-DD')}
											</span>
										</div>
									</td>
									<td>
										<div>
											<div>{item.type}</div>
										</div>
									</td>
									<td>
										<div>
											<div>{item?.status}</div>
										</div>
									</td>

									<td>
										<Button
											isOutline={!darkModeStatus}
											color='dark'
											isLight={darkModeStatus}
											className={classNames('text-nowrap', {
												'border-light': !darkModeStatus,
											})}
											style={{ marginRight: 8 }}
											icon='Edit'
											onClick={() => openEditUsageStatus(item)}>
											Edit
										</Button>
										<Button
											isOutline={!darkModeStatus}
											color='dark'
											isLight={darkModeStatus}
											className={classNames('text-nowrap', {
												'border-light': !darkModeStatus,
											})}
											icon='Edit'
											onClick={() => openDeleteUsageStatus(item)}>
											Delete
										</Button>
									</td>
								</tr>
							))}
						</tbody>
					</table>
				</CardBody>
				<PaginationButtons
					data={items}
					label='items'
					setCurrentPage={setCurrentPage}
					currentPage={currentPage}
					perPage={perPage}
					setPerPage={setPerPage}
				/>
			</Card>

			<OffCanvas
				setOpen={setOpenNewUsageStatus}
				isOpen={opentNewUsageStatus}
				titleId='New UsageStatus'
				isBodyScroll
				placement='end'
				// className='offcanvas-newUsageStatus'
			>
				<OffCanvasHeader setOpen={setOpenNewUsageStatus}>
					<OffCanvasTitle id='NewUsageStatus'>New Useage Status</OffCanvasTitle>
				</OffCanvasHeader>
				<OffCanvasBody>
					<div className='row g-4'>
						<div className='col-12'>
							<FormGroup id='create_date' label='Thời gian'>
								<Input
									onChange={handleChangeUsageStatus}
									value={dataform.create_date}
									type='date'
								/>
							</FormGroup>
						</div>
						<div className='col-12'>
							<FormGroup id='type' label='Loại'>
								<Input onChange={handleChangeUsageStatus} value={dataform.type} />
							</FormGroup>
						</div>

						<div className='col-12'>
							<FormGroup id='status' label='Trạng thái'>
								<Select
									ariaLabel='Status'
									placeholder='Chọn trạng thái'
									list={selectStatus}
									onChange={handleChangeUsageStatus}
									value={dataform.status}
									isValid={dataform.status}
									isTouched={dataform.status}
								/>
							</FormGroup>
						</div>
					</div>
				</OffCanvasBody>
				<div className='row m-0'>
					<div className='col-12 p-3'>
						{isPostUsageStatus === 'isPostUsageStatus' && (
							<p style={{ fontSize: 14, color: 'red' }}> Tao moi that bai</p>
						)}
						<Button color='info' className='w-100' onClick={() => postUsageStatus()}>
							Save
						</Button>
					</div>
				</div>
			</OffCanvas>

			<OffCanvas
				setOpen={setOpenEditUsageStatus}
				isOpen={opentEditUsageStatus}
				titleId='Edit UsageStatus'
				isBodyScroll
				placement='end'>
				<OffCanvasHeader setOpen={setOpenEditUsageStatus}>
					<OffCanvasTitle id='EditUsageStatus'>Edit Useage Status</OffCanvasTitle>
				</OffCanvasHeader>
				<OffCanvasBody>
					<div className='row g-4'>
						<div className='col-12'>
							<FormGroup id='create_date' label='Thời gian'>
								<Input
									onChange={handleEditForm}
									value={dataformedit.create_date}
									type='date'
								/>
							</FormGroup>
						</div>
						<div className='col-12'>
							<FormGroup id='type' label='Loại'>
								<Input onChange={handleEditForm} value={dataformedit.type} />
							</FormGroup>
						</div>

						<div className='col-12'>
							<FormGroup id='status' label='Trạng thái'>
							<Select
									ariaLabel='Status'
									placeholder='Chọn trạng thái'
									list={selectStatus}
									onChange={handleEditForm}
									value={dataformedit.status}
									isValid={dataformedit.status}
									isTouched={dataformedit.status}
								/>
							</FormGroup>
						</div>
					</div>
				</OffCanvasBody>
				<div className='row m-0'>
					<div className='col-12 p-3'>
						{isPutUsageStatus === 'fail' && (
							<p style={{ fontSize: 14, color: 'red' }}> Edit that bai</p>
						)}

						<Button color='info' className='w-100' onClick={() => editUsageStatus()}>
							Save
						</Button>
					</div>
				</div>
			</OffCanvas>

			<OffCanvas
				setOpen={setOpenDeleteUsageStatus}
				isOpen={opentDeleteUsageStatus}
				titleId='Edit UsageStatus'
				isBodyScroll
				placement='end'>
				<OffCanvasHeader setOpen={setOpenDeleteUsageStatus}>
					<OffCanvasTitle id='EditUsageStatus'>Delete Usage Status</OffCanvasTitle>
				</OffCanvasHeader>
				<OffCanvasBody>
					<div className='row g-4'>
						<div className='col-12'>
							<FormGroup id='create_date' label='Thời gian'>
								<Input value={dataformedit.create_date} type='date' />
							</FormGroup>
						</div>
						<div className='col-12'>
							<FormGroup id='type' label='Loại'>
								<Input value={dataformedit.type} />
							</FormGroup>
						</div>

						<div className='col-12'>
							<FormGroup id='status' label='Trạng thái'>
								<Input value={dataformedit.status} />
							</FormGroup>
						</div>
					</div>
				</OffCanvasBody>
				<div className='row m-0'>
					<div className='col-12 p-3'>
						{isDeleteUsageStatus === 'fail' && (
							<p style={{ fontSize: 14, color: 'red' }}> Delete thất bại</p>
						)}
						<Button
							color='waring'
							className='w-100'
							onClick={() => deleteUsageStatus()}>
							Delete
						</Button>
					</div>
				</div>
			</OffCanvas>
		</>
	);
};

export default UsageStatusComponent;
