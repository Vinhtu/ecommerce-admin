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
import Select from '../../components/bootstrap/forms/Select';

import PaginationButtons, { dataPagination, PER_COUNT } from '../../components/PaginationButtons';
import useSortableData from '../../hooks/useSortableData';
import useDarkMode from '../../hooks/useDarkMode';
import {
	GetCategorys,
	PostCategory,
	PutCategory,
	DeleteCategory,
} from '../../redux/actions/categorys';

const selectType = [
	{ value: 'Normal', text: 'Normal' },
	{ value: 'Hot', text: 'Hot' },
];

const selectShow = [
	{ value: "True", text: 'True' },
	{ value: "False", text: 'False' },
];
// eslint-disable-next-line react/prop-types
const CategoryComponent = ({ isFluid }) => {
	const dispatch = useDispatch();
	const {
		// themeStatus,
		darkModeStatus,
	} = useDarkMode();
	const { categoryList, isPutCategory ,isPostCategory, isDeleteCategory} = useSelector((state) => state.category);

	const [opentNewCategory, setOpenNewCategory] = useState(false);
	const [opentEditCategory, setOpenEditCategory] = useState(false);
	const [opentDeleteCategory, setOpenDeleteCategory] = useState(false);


	// const accountInfo = localStorage.getItem('accountinfo');
	const accessToken = localStorage.getItem('accessToken');
	// const refreshToken = localStorage.getItem('refreshToken');
	// const account_id = JSON.parse(accountInfo);
	const token = JSON.parse(accessToken);
	// const refreshtoken = JSON.parse(refreshToken);
	
	const category = [
		{
			name: '',
			create_date: moment().add(0, 'days').format('YYYY-MM-DD'),
		},
	];
	// const addNewcategory = () => {
	// 	setUpcomingEventsEditOffcanvas(!upcomingEventsEditOffcanvas);
	// };
	useEffect(() => {
		dispatch(GetCategorys());
	}, [dispatch]);

	useEffect(() => {
		dispatch(GetCategorys());
	}, [dispatch, isPutCategory ,isPostCategory, isDeleteCategory]);

	const formik = useFormik({
		initialValues: {
			name: '',
			type: '',
			show: '',
			create_date: moment().add(0, 'days').format('YYYY-MM-DD'),
		},
	});



	const [currentPage, setCurrentPage] = useState(1);
	const [perPage, setPerPage] = useState(PER_COUNT['5']);

	const { items, requestSort, getClassNamesFor } = useSortableData(
		categoryList ? categoryList.data.results : category,
	);

	const postCategory = () => {
		dispatch(PostCategory(formik.values, token));
		setOpenNewCategory(false);
	};

	const [dataform, setDataForm] = React.useState({
		_id: '',
		name: '',
		type:'',
		show:'',
		create_date: moment().add(0, 'days').format('YYYY-MM-DD'),
	});
	const openEditCategory = (item) => {
		setDataForm({ ...dataform, _id: item._id, name: item.name,type: item.type, show: item.show, create_date: item.create_date });
		setOpenEditCategory(true);
	};
	const handleEditForm = (event) => {
		setDataForm({ ...dataform, [event.target.id]: event.target.value });
	};

	const openDeleteCategory = (item) => {
		setDataForm({ ...dataform, _id: item._id, name: item.name,type: item.type, show: item.show, create_date: item.create_date });
		setOpenDeleteCategory(true);
	};

	const editCategory = () => {
		dispatch(PutCategory(dataform._id, dataform, token));
		setOpenEditCategory(false);
	};
	const deleteCategory = () => {
		dispatch(DeleteCategory(dataform._id, token));
		setOpenDeleteCategory(false);
	};


	console.log(categoryList,'')
	return (
		<>
			<Card stretch={isFluid}>
				<CardHeader borderSize={1}>
					<CardLabel icon='Alarm' iconColor='info'>
						<CardTitle>
							Total ' {categoryList && categoryList.data.results.length} ' categorys
						</CardTitle>
					</CardLabel>
					<CardActions>
						<Button
							color='info'
							icon='CloudDownload'
							isLight
							onClick={() => setOpenNewCategory(true)}>
							New category
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
								<th>Type</th>
								<th>Show</th>
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
										<div>
											<div>{item.type}</div>
										</div>
									</td>
									<td>
										<div>
											<div>{item.show}</div>
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
											onClick={() => openEditCategory(item)}>
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
											onClick={() => openDeleteCategory(item)}>
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
				setOpen={setOpenNewCategory}
				isOpen={opentNewCategory}
				titleId='New Category'
				isBodyScroll
				placement='end'>
				<OffCanvasHeader setOpen={setOpenNewCategory}>
					<OffCanvasTitle id='NewCategory'>New Category</OffCanvasTitle>
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
						<div className='col-12'>
							<FormGroup id='type' label='Type' className='col-md-12'>
								<Select
									ariaLabel='Type'
									placeholder='Choose Type'
									list={selectType}
									onChange={formik.handleChange}
									value={formik.values.type}
									isValid={formik.values.type}
									isTouched={formik.values.type}
								/>
							</FormGroup>
						</div>
						<div className='col-12'>
							<FormGroup id='show' label='Show' className='col-md-12'>
								<Select
									ariaLabel='Show'
									placeholder='Choose Show'
									list={selectShow}
									onChange={formik.handleChange}
									value={formik.values.show}
									isValid={formik.values.show}
									isTouched={formik.values.show}
								/>
							</FormGroup>
						</div>
					</div>
				</OffCanvasBody>
				<div className='row m-0'>
					<div className='col-12 p-3'>
						<Button color='info' className='w-100' onClick={() => postCategory()}>
							Save
						</Button>
					</div>
				</div>
			</OffCanvas>

			<OffCanvas
				setOpen={setOpenEditCategory}
				isOpen={opentEditCategory}
				titleId='Edit Category'
				isBodyScroll
				placement='end'>
				<OffCanvasHeader setOpen={setOpenEditCategory}>
					<OffCanvasTitle id='EditCategory'>Edit Category</OffCanvasTitle>
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
						<div className='col-12'>
							<FormGroup id='type' label='Type' className='col-md-12'>
								<Select
									ariaLabel='Type'
									placeholder='Choose Type'
									list={selectType}
									onChange={handleEditForm}
									value={dataform.type}
									isValid={dataform.type}
									isTouched={dataform.type}
								/>
							</FormGroup>
						</div>
						<div className='col-12'>
							<FormGroup id='show' label='Show' className='col-md-12'>
								<Select
									ariaLabel='Show'
									placeholder='Choose Show'
									list={selectShow}
									onChange={handleEditForm}
									value={dataform.show}
									isValid={dataform.show}
									isTouched={dataform.show}
								/>
							</FormGroup>
						</div>
					</div>
				</OffCanvasBody>
				<div className='row m-0'>
					<div className='col-12 p-3'>
						<Button color='info' className='w-100' onClick={() => editCategory()}>
							Save
						</Button>
					</div>
				</div>
			</OffCanvas>

			<OffCanvas
				setOpen={setOpenDeleteCategory}
				isOpen={opentDeleteCategory}
				titleId='Edit Category'
				isBodyScroll
				placement='end'>
				<OffCanvasHeader setOpen={setOpenDeleteCategory}>
					<OffCanvasTitle id='EditCategory'>Delete Category</OffCanvasTitle>
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
						<div className='col-12'>
							<FormGroup id='type' label='Type' className='col-md-12'>
								<Select
									ariaLabel='Type'
									placeholder='Choose Type'
									list={selectType}
									onChange={handleEditForm}
									value={dataform.type}
									isValid={dataform.type}
									isTouched={dataform.type}
								/>
							</FormGroup>
						</div>
						<div className='col-12'>
							<FormGroup id='show' label='Show' className='col-md-12'>
								<Select
									ariaLabel='Show'
									placeholder='Choose Show'
									list={selectShow}
									onChange={handleEditForm}
									value={dataform.show}
									isValid={dataform.show}
									isTouched={dataform.show}
								/>
							</FormGroup>
						</div>
					</div>
				</OffCanvasBody>
				<div className='row m-0'>
					<div className='col-12 p-3'>
						<Button color='waring' className='w-100' onClick={() => deleteCategory()}>
							Delete
						</Button>
					</div>
				</div>
			</OffCanvas>
		</>
	);
};

export default CategoryComponent;
