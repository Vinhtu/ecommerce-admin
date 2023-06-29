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
	GetDeliveryMethods,
	PostDeliveryMethod,
	PutDeliveryMethod,
	DeleteDeliveryMethod,
} from '../../redux/actions/deliverymethods';

import './styles.css';
import Select from '../../components/bootstrap/forms/Select';

// eslint-disable-next-line react/prop-types
const DeliveryMethodComponent = ({ isFluid }) => {
	const dispatch = useDispatch();
	const {
		// themeStatus,
		darkModeStatus,
	} = useDarkMode();
	const { deliverymethodList, isPutDeliveryMethod, isPostDeliveryMethod, isDeleteDeliveryMethod } =
		useSelector((state) => state.deliverymethod);

	const [opentNewDeliveryMethod, setOpenNewDeliveryMethod] = useState(false);
	const [opentEditDeliveryMethod, setOpenEditDeliveryMethod] = useState(false);
	const [opentDeleteDeliveryMethod, setOpenDeleteDeliveryMethod] = useState(false);

	// const accountInfo = localStorage.getItem('accountinfo');
	const accessToken = localStorage.getItem('accessToken');
	// const refreshToken = localStorage.getItem('refreshToken');
	// const account_id = JSON.parse(accountInfo);
	const token = JSON.parse(accessToken);
	// const refreshtoken = JSON.parse(refreshToken);

	const DeliveryMethod = [
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
		dispatch(GetDeliveryMethods());
	}, [dispatch]);

	useEffect(() => {
		dispatch(GetDeliveryMethods());
	}, [dispatch, isPutDeliveryMethod, isPostDeliveryMethod, isDeleteDeliveryMethod]);

	const [currentPage, setCurrentPage] = useState(1);
	const [perPage, setPerPage] = useState(PER_COUNT['5']);

	const { items, requestSort, getClassNamesFor } = useSortableData(
		deliverymethodList ? deliverymethodList.data.results : DeliveryMethod,
	);

	const [dataform, setDataForm] = React.useState({
		_id: '',
		type: '',
		code: '',
		status: 'Normal',
		create_date: moment().add(0, 'days').format('YYYY-MM-DD'),
	});

	const [dataformedit, setDataFormEdit] = React.useState({
		_id: '',
		type: '',
		code: '',
		status: 'Normal',
		create_date: moment().add(0, 'days').format('YYYY-MM-DD'),
	});
	const openEditDeliveryMethod = (item) => {
		setDataFormEdit({
			...dataformedit,
			_id: item._id,
			type: item.type,
			code: item.code,
			status: item.status,
			create_date: item.create_date,
		});

		setOpenEditDeliveryMethod(true);
	};
	const handleEditForm = (event) => {
		setDataFormEdit({ ...dataformedit, [event.target.id]: event.target.value });
	};

	const openDeleteDeliveryMethod = (item) => {
		console.log(item, 'item');
		setDataFormEdit({
			...dataformedit,
			_id: item._id,
			type: item.type,
			code: item.code,
			status: item.status,
			create_date: item.create_date,
		});

		setOpenDeleteDeliveryMethod(true);
	};

	const deleteDeliveryMethod = () => {
		dispatch(DeleteDeliveryMethod(dataformedit._id, token));
	};

	const handleChangeDeliveryMethod = (e) => {
		setDataForm({ ...dataform, [e.target.id]: e.target.value });
	};

	const postDeliveryMethod = () => {
		dispatch(PostDeliveryMethod(dataform, token));
	};
	useEffect(() => {
		if (isPostDeliveryMethod === 'success') {
			setOpenNewDeliveryMethod(false);
		}
	}, [isPostDeliveryMethod]);

	const editDeliveryMethod = () => {
		dispatch(PutDeliveryMethod(dataformedit._id, dataformedit, token));
	};

	useEffect(() => {
		if (isPutDeliveryMethod === 'success') {
			setOpenEditDeliveryMethod(false);
		}
	}, [isPutDeliveryMethod]);
	useEffect(() => {
		if (isDeleteDeliveryMethod === 'success') {
			setOpenDeleteDeliveryMethod(false);
		}
	}, [isDeleteDeliveryMethod]);
	return (
		<>
			<Card stretch={isFluid}>
				<CardHeader borderSize={1}>
					<CardLabel icon='Alarm' iconColor='info'>
						<CardTitle>
							Total ' {deliverymethodList && deliverymethodList.data.results.length} '
							DeliveryMethods
						</CardTitle>
					</CardLabel>
					<CardActions>
						<Button
							color='info'
							icon='CloudDownload'
							isLight
							onClick={() => setOpenNewDeliveryMethod(true)}>
							New DeliveryMethod
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
								<th>Mã</th>
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
											<div>{item.code}</div>
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
											onClick={() => openEditDeliveryMethod(item)}>
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
											onClick={() => openDeleteDeliveryMethod(item)}>
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
				setOpen={setOpenNewDeliveryMethod}
				isOpen={opentNewDeliveryMethod}
				titleId='New DeliveryMethod'
				isBodyScroll
				placement='end'
				// className='offcanvas-newDeliveryMethod'
			>
				<OffCanvasHeader setOpen={setOpenNewDeliveryMethod}>
					<OffCanvasTitle id='NewDeliveryMethod'>New Useage Status</OffCanvasTitle>
				</OffCanvasHeader>
				<OffCanvasBody>
					<div className='row g-4'>
						<div className='col-12'>
							<FormGroup id='create_date' label='Thời gian'>
								<Input
									onChange={handleChangeDeliveryMethod}
									value={dataform.create_date}
									type='date'
								/>
							</FormGroup>
						</div>
						<div className='col-12'>
							<FormGroup id='code' label='Mã'>
								<Input onChange={handleChangeDeliveryMethod} value={dataform.code} />
							</FormGroup>
						</div>
						<div className='col-12'>
							<FormGroup id='type' label='Loại'>
								<Input onChange={handleChangeDeliveryMethod} value={dataform.type} />
							</FormGroup>
						</div>

						<div className='col-12'>
							<FormGroup id='status' label='Trạng thái'>
								<Select
									ariaLabel='Status'
									placeholder='Chọn trạng thái'
									list={selectStatus}
									onChange={handleChangeDeliveryMethod}
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
						{isPostDeliveryMethod === 'isPostDeliveryMethod' && (
							<p style={{ fontSize: 14, color: 'red' }}> Tao moi that bai</p>
						)}
						<Button color='info' className='w-100' onClick={() => postDeliveryMethod()}>
							Save
						</Button>
					</div>
				</div>
			</OffCanvas>

			<OffCanvas
				setOpen={setOpenEditDeliveryMethod}
				isOpen={opentEditDeliveryMethod}
				titleId='Edit DeliveryMethod'
				isBodyScroll
				placement='end'>
				<OffCanvasHeader setOpen={setOpenEditDeliveryMethod}>
					<OffCanvasTitle id='EditDeliveryMethod'>Edit Useage Status</OffCanvasTitle>
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
							<FormGroup id='code' label='Mã'>
								<Input onChange={handleEditForm} value={dataformedit.code} />
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
						{isPutDeliveryMethod === 'fail' && (
							<p style={{ fontSize: 14, color: 'red' }}> Edit that bai</p>
						)}

						<Button color='info' className='w-100' onClick={() => editDeliveryMethod()}>
							Save
						</Button>
					</div>
				</div>
			</OffCanvas>

			<OffCanvas
				setOpen={setOpenDeleteDeliveryMethod}
				isOpen={opentDeleteDeliveryMethod}
				titleId='Edit DeliveryMethod'
				isBodyScroll
				placement='end'>
				<OffCanvasHeader setOpen={setOpenDeleteDeliveryMethod}>
					<OffCanvasTitle id='EditDeliveryMethod'>Delete Usage Status</OffCanvasTitle>
				</OffCanvasHeader>
				<OffCanvasBody>
					<div className='row g-4'>
						<div className='col-12'>
							<FormGroup id='create_date' label='Thời gian'>
								<Input value={dataformedit.create_date} type='date' />
							</FormGroup>
						</div>
						<div className='col-12'>
							<FormGroup id='code' label='Mã'>
								<Input value={dataformedit.code} />
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
						{isDeleteDeliveryMethod === 'fail' && (
							<p style={{ fontSize: 14, color: 'red' }}> Delete thất bại</p>
						)}
						<Button
							color='waring'
							className='w-100'
							onClick={() => deleteDeliveryMethod()}>
							Delete
						</Button>
					</div>
				</div>
			</OffCanvas>
		</>
	);
};

export default DeliveryMethodComponent;
