import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import classNames from 'classnames';
import moment from 'moment';
import { useFormik } from 'formik';
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
import { GetColoradmins, PostColoradmin, PutColoradmin, DeleteColoradmin } from '../../redux/actions/coloradmins';

// eslint-disable-next-line react/prop-types
const ColorComponent = ({ isFluid }) => {
	const dispatch = useDispatch();
	const {
		// themeStatus,
		darkModeStatus,
	} = useDarkMode();
	const { coloradminList, isPutColoradmin, isPostColoradmin, isDeleteColoradmin } = useSelector(
		(state) => state.coloradmin,
	);

	const [opentNewColor, setOpenNewColor] = useState(false);
	const [opentEditColor, setOpenEditColor] = useState(false);
	const [opentDeleteColor, setOpenDeleteColor] = useState(false);

	// const accountInfo = localStorage.getItem('accountinfo');
	const accessToken = localStorage.getItem('accessToken');
	// const refreshToken = localStorage.getItem('refreshToken');
	// const account_id = JSON.parse(accountInfo);
	const token = JSON.parse(accessToken);
	// const refreshtoken = JSON.parse(refreshToken);

	const coloradmin = [
		{
			name: '',
			create_date: moment().add(0, 'days').format('YYYY-MM-DD'),
		},
	];
	// const addNewcolor = () => {
	// 	setUpcomingEventsEditOffcanvas(!upcomingEventsEditOffcanvas);
	// };
	useEffect(() => {
		dispatch(GetColoradmins());
	}, [dispatch]);

	useEffect(() => {
		dispatch(GetColoradmins());
	}, [dispatch, isPutColoradmin, isPostColoradmin, isDeleteColoradmin]);

	const formik = useFormik({
		initialValues: {
			name: '',
			create_date: moment().add(0, 'days').format('YYYY-MM-DD'),
		},
	});

	const [currentPage, setCurrentPage] = useState(1);
	const [perPage, setPerPage] = useState(PER_COUNT['5']);

	const { items, requestSort, getClassNamesFor } = useSortableData(
		coloradminList ? coloradminList.data.results : coloradmin,
	);

	const postColor = () => {
		dispatch(PostColoradmin(formik.values, token));
		setOpenNewColor(false);
	};

	const [dataform, setDataForm] = React.useState({
		_id: '',
		name: '',
		create_date: moment().add(0, 'days').format('YYYY-MM-DD'),
	});
	const openEditColor = (item) => {
		setDataForm({ ...dataform, _id: item._id, name: item.name, create_date: item.create_date });
		setOpenEditColor(true);
	};
	const handleEditForm = (event) => {
		setDataForm({ ...dataform, [event.target.id]: event.target.value });
	};

	const openDeleteColor = (item) => {
		setDataForm({ ...dataform, _id: item._id, name: item.name, create_date: item.create_date });
		setOpenDeleteColor(true);
	};

	const editColor = () => {
		dispatch(PutColoradmin(dataform._id, dataform, token));
		setOpenEditColor(false);
	};
	const deleteColor = () => {
		dispatch(DeleteColoradmin(dataform._id, token));
		setOpenDeleteColor(false);
	};
	return (
		<>
			<Card stretch={isFluid}>
				<CardHeader borderSize={1}>
					<CardLabel icon='Alarm' iconColor='info'>
						<CardTitle>
							Total ' {coloradminList && coloradminList.data.results.length} ' colors
						</CardTitle>
					</CardLabel>
					<CardActions>
						<Button
							color='info'
							icon='CloudDownload'
							isLight
							onClick={() => setOpenNewColor(true)}>
							New Color
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
									Date / Time{' '}
									<Icon
										size='lg'
										className={getClassNamesFor('date')}
										icon='FilterList'
									/>
								</th>
								<th>Name</th>

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
											<div>{item.name}</div>
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
											onClick={() => openEditColor(item)}>
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
											onClick={() => openDeleteColor(item)}>
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
				setOpen={setOpenNewColor}
				isOpen={opentNewColor}
				titleId='New Color'
				isBodyScroll
				placement='end'>
				<OffCanvasHeader setOpen={setOpenNewColor}>
					<OffCanvasTitle id='NewColor'>New Color</OffCanvasTitle>
				</OffCanvasHeader>
				<OffCanvasBody>
					<div className='row g-4'>
						<div className='col-12'>
							<FormGroup id='create_date' label='Create Date'>
								<Input
									onChange={formik.handleChange}
									value={formik.values.create_date}
									type='date'
								/>
							</FormGroup>
						</div>
						<div className='col-12'>
							<FormGroup id='name' label='Name'>
								<Input onChange={formik.handleChange} value={formik.values.name} />
							</FormGroup>
						</div>
					</div>
				</OffCanvasBody>
				<div className='row m-0'>
					<div className='col-12 p-3'>
						<Button color='info' className='w-100' onClick={() => postColor()}>
							Save
						</Button>
					</div>
				</div>
			</OffCanvas>

			<OffCanvas
				setOpen={setOpenEditColor}
				isOpen={opentEditColor}
				titleId='Edit Color'
				isBodyScroll
				placement='end'>
				<OffCanvasHeader setOpen={setOpenEditColor}>
					<OffCanvasTitle id='EditColor'>Edit Color</OffCanvasTitle>
				</OffCanvasHeader>
				<OffCanvasBody>
					<div className='row g-4'>
						<div className='col-12'>
							<FormGroup id='create_date' label='Create Date'>
								<Input
									onChange={handleEditForm}
									value={dataform.create_date}
									type='date'
								/>
							</FormGroup>
						</div>
						<div className='col-12'>
							<FormGroup id='name' label='Name'>
								<Input onChange={handleEditForm} value={dataform.name} />
							</FormGroup>
						</div>
					</div>
				</OffCanvasBody>
				<div className='row m-0'>
					<div className='col-12 p-3'>
						<Button color='info' className='w-100' onClick={() => editColor()}>
							Save
						</Button>
					</div>
				</div>
			</OffCanvas>

			<OffCanvas
				setOpen={setOpenDeleteColor}
				isOpen={opentDeleteColor}
				titleId='Edit Color'
				isBodyScroll
				placement='end'>
				<OffCanvasHeader setOpen={setOpenDeleteColor}>
					<OffCanvasTitle id='EditColor'>Delete Color</OffCanvasTitle>
				</OffCanvasHeader>
				<OffCanvasBody>
					<div className='row g-4'>
						<div className='col-12'>
							<FormGroup id='create_date' label='Create Date'>
								<Input
									onChange={handleEditForm}
									value={dataform.create_date}
									type='date'
									disabled
								/>
							</FormGroup>
						</div>
						<div className='col-12'>
							<FormGroup id='name' label='Name'>
								<Input onChange={handleEditForm} value={dataform.name} disabled />
							</FormGroup>
						</div>
					</div>
				</OffCanvasBody>
				<div className='row m-0'>
					<div className='col-12 p-3'>
						<Button color='waring' className='w-100' onClick={() => deleteColor()}>
							Delete
						</Button>
					</div>
				</div>
			</OffCanvas>
		</>
	);
};

export default ColorComponent;
