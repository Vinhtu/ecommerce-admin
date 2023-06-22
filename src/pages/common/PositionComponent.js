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
import { GetPositions, PostPosition, PutPosition, DeletePosition } from '../../redux/actions/positions';

// eslint-disable-next-line react/prop-types
const PositionComponent = ({ isFluid }) => {
	const dispatch = useDispatch();
	const {
		// themeStatus,
		darkModeStatus,
	} = useDarkMode();
	const { positionList } = useSelector((state) => state.position);

	const [opentNewPosition, setOpenNewPosition] = useState(false);
	const [opentEditPosition, setOpenEditPosition] = useState(false);
	const [opentDeletePosition, setOpenDeletePosition] = useState(false);

	const position = [
		{
			name: '',
			create_date: moment().add(0, 'days').format('YYYY-MM-DD'),
		},
	];
	// const addNewposition = () => {
	// 	setUpcomingEventsEditOffcanvas(!upcomingEventsEditOffcanvas);
	// };
	useEffect(() => {
		dispatch(GetPositions());
	}, [dispatch]);

	const formik = useFormik({
		initialValues: {
			name: '',
			create_date: moment().add(0, 'days').format('YYYY-MM-DD'),
		},
	});

	const [currentPage, setCurrentPage] = useState(1);
	const [perPage, setPerPage] = useState(PER_COUNT['5']);

	const { items, requestSort, getClassNamesFor } = useSortableData(
		positionList ? positionList.data.results : position,
	);

	const postPosition = () => {
		dispatch(PostPosition(formik.values));
		setOpenNewPosition(false);
	};

	const [dataform, setDataForm] = React.useState({
		_id: '',
		name: '',
		create_date: moment().add(0, 'days').format('YYYY-MM-DD'),
	});
	const openEditPosition = (item) => {
		setDataForm({ ...dataform, _id: item._id, name: item.name, create_date: item.create_date });
		setOpenEditPosition(true);
	};
	const handleEditForm = (event) => {
		setDataForm({ ...dataform, [event.target.id]: event.target.value });
	};

	const openDeletePosition = (item) => {
		setDataForm({ ...dataform, _id: item._id, name: item.name, create_date: item.create_date });
		setOpenDeletePosition(true);
	};

	const editPosition = () => {
		dispatch(PutPosition(dataform._id, dataform));
		setOpenEditPosition(false);
	};
	const deletePosition = () => {
		dispatch(DeletePosition(dataform._id));
		setOpenDeletePosition(false);
	};

	console.log(positionList && positionList.data.results.length,'length')
	return (
		<>
			<Card stretch={isFluid}>
				<CardHeader borderSize={1}>
					<CardLabel icon='Alarm' iconColor='info'>
						<CardTitle>
						Total {' '}'{' '}{positionList && positionList.data.results.length}{' '}'{' '} positions
							</CardTitle>
					</CardLabel>
					<CardActions>
						<Button
							color='info'
							icon='CloudDownload'
							isLight
							onClick={() => setOpenNewPosition(true)}>
							New Position
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
								<tr key={item._id}>
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
											onClick={() => openEditPosition(item)}>
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
											onClick={() => openDeletePosition(item)}>
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
				setOpen={setOpenNewPosition}
				isOpen={opentNewPosition}
				titleId='New Position'
				isBodyScroll
				placement='end'>
				<OffCanvasHeader setOpen={setOpenNewPosition}>
					<OffCanvasTitle id='NewPosition'>New Position</OffCanvasTitle>
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
						<Button color='info' className='w-100' onClick={() => postPosition()}>
							Save
						</Button>
					</div>
				</div>
			</OffCanvas>

			<OffCanvas
				setOpen={setOpenEditPosition}
				isOpen={opentEditPosition}
				titleId='Edit Position'
				isBodyScroll
				placement='end'>
				<OffCanvasHeader setOpen={setOpenEditPosition}>
					<OffCanvasTitle id='EditPosition'>Edit Position</OffCanvasTitle>
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
						<Button color='info' className='w-100' onClick={() => editPosition()}>
							Save
						</Button>
					</div>
				</div>
			</OffCanvas>

			<OffCanvas
				setOpen={setOpenDeletePosition}
				isOpen={opentDeletePosition}
				titleId='Edit Position'
				isBodyScroll
				placement='end'>
				<OffCanvasHeader setOpen={setOpenDeletePosition}>
					<OffCanvasTitle id='EditPosition'>Delete Position</OffCanvasTitle>
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
						<Button color='waring' className='w-100' onClick={() => deletePosition()}>
							Delete
						</Button>
					</div>
				</div>
			</OffCanvas>
		</>
	);
};

export default PositionComponent;
