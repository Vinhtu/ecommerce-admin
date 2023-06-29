import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import classNames from 'classnames';
import moment from 'moment';
// import { useFormik } from 'formik';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

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

import './styles.css';
import storage from '../../firebase';

const selectType = [
	{ value: 'Normal', text: 'Normal' },
	{ value: 'Hot', text: 'Hot' },
];

const selectShow = [
	{ value: 'True', text: 'True' },
	{ value: 'False', text: 'False' },
];
// eslint-disable-next-line react/prop-types
const CategoryTreeComponent = ({ isFluid }) => {
	const dispatch = useDispatch();
	const {
		// themeStatus,
		darkModeStatus,
	} = useDarkMode();
	const { categoryList, isPutCategory, isPostCategory, isDeleteCategory } = useSelector(
		(state) => state.category,
	);

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
	}, [dispatch, isPutCategory, isPostCategory, isDeleteCategory]);

	// const formik = useFormik({
	// 	initialValues: {
	// 		name: '',
	// 		type: '',
	// 		show: '',
	// 		subcategory: '',
	// 		create_date: moment().add(0, 'days').format('YYYY-MM-DD'),
	// 	},
	// });

	const [currentPage, setCurrentPage] = useState(1);
	const [perPage, setPerPage] = useState(PER_COUNT['5']);

	const { items, requestSort, getClassNamesFor } = useSortableData(
		categoryList ? categoryList.data.results : category,
	);

	const [dataform, setDataForm] = React.useState({
		_id: '',
		name: '',
		code: '',
		type: '',
		show: '',
		image: '',
		subcategory: '',
		create_date: moment().add(0, 'days').format('YYYY-MM-DD'),
	});

	const [dataformedit, setDataFormEdit] = React.useState({
		_id: '',
		name: '',
		code: '',
		type: '',
		show: '',
		image: '',
		subcategory: '',
		create_date: moment().add(0, 'days').format('YYYY-MM-DD'),
	});
	const openEditCategory = (item) => {
		setDataFormEdit({
			...dataformedit,
			_id: item._id,
			name: item.name,
			code: item.code,
			type: item.type,
			show: item.show,
			image: item.image,
			subcategory: item.subcategory,
			create_date: item.create_date,
		});

		setOpenEditCategory(true);
	};
	const handleEditForm = (event) => {
		setDataFormEdit({ ...dataformedit, [event.target.id]: event.target.value });
	};

	const openDeleteCategory = (item) => {
		setDataForm({
			...dataform,
			_id: item._id,
			name: item.name,
			code: item.code,
			type: item.type,
			show: item.show,
			image: item.image,
			subcategory: item.subcategory,
			create_date: item.create_date,
		});

		setOpenDeleteCategory(true);
	};

	const deleteCategory = () => {
		dispatch(DeleteCategory(dataform._id, token));
		setOpenDeleteCategory(false);
	};

	const [thumbnailMain, setThumbnailMain] = React.useState(false);
	const handleThumbnailMain = (e) => {
		const image = e.target.files[0];
		const imageRef = ref(storage, `thumbnailcolors/${image.name}`);
		uploadBytes(imageRef, image).then((res) =>
			getDownloadURL(res.ref).then((url) => {
				setThumbnailMain(url);
				setDataFormEdit({ ...dataformedit, image: url });
				setDataForm({ ...dataform, image: url });
			}),
		);
	};

	const deleteThumbnailMain = () => {
		setDataForm({ ...dataform, image: '' });
		setDataFormEdit({ ...dataformedit, image: '' });
		setThumbnailMain('');
	};

	const [testSubcategory, SetTestCategory] = React.useState('');

	const [subcategory, SetSubCategory] = React.useState([]);

	const handleTextSubCategory = (e) => {
		SetTestCategory(e.target.value);
	};

	const addTextSubCategory = () => {
		if (testSubcategory) {
			SetSubCategory((current) => [
				...current,
				{
					name: testSubcategory,
				},
			]);

			setDataForm({
				...dataform,
				subcategory,
			});

			SetTestCategory('');
		}
	};

	const addTextSubCategoryEdit = () => {
		if (testSubcategory) {
			setDataFormEdit({
				...dataformedit,
				subcategory: [...dataformedit.subcategory, { name: testSubcategory }],
			});

			SetTestCategory('');
		}
	};

	const deleteSubCategory = (data) => {
		SetSubCategory(subcategory.filter((e) => e.name !== data));

		setDataForm({
			...dataform,
			subcategory,
		});
	};

	const deleteSubCategoryEdit = (data) => {
		setDataFormEdit({
			...dataformedit,
			subcategory: dataformedit.subcategory.filter((e) => e.name !== data),
		});
	};
	const handleChangeCategory = (e) => {
		setDataForm({ ...dataform, [e.target.id]: e.target.value });
	};

	const postCategory = () => {
		dispatch(PostCategory(dataform, token));
	};
	useEffect(() => {
		if (isPostCategory === 'success') {
			setOpenNewCategory(false);
		}
	}, [isPostCategory]);

	const editCategory = () => {
		dispatch(PutCategory(dataformedit._id, dataformedit, token));
	};

	useEffect(() => {
		if (isPutCategory === 'success') {
			setOpenEditCategory(false);
		}
	}, [isPutCategory]);
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
								<th>Code</th>
								<th>Name</th>
								<th>Amount Sub Category</th>
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
											<div>{item.code}</div>
										</div>
									</td>
									<td>
										<div>
											<div>{item.name}</div>
										</div>
									</td>
									<td>
										<div>
											<div>{item?.subcategory?.length}</div>
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
				placement='end'
				// className='offcanvas-newcategory'
			>
				<OffCanvasHeader setOpen={setOpenNewCategory}>
					<OffCanvasTitle id='NewCategory'>New Category</OffCanvasTitle>
				</OffCanvasHeader>
				<OffCanvasBody>
					<div className='row g-4'>
						<div className='col-12'>
							<FormGroup id='create_date' label='Create Date'>
								<Input
									onChange={handleChangeCategory}
									value={dataform.create_date}
									type='date'
								/>
							</FormGroup>
						</div>
						<div className='col-12'>
							<FormGroup id='code' label='Code'>
								<Input onChange={handleChangeCategory} value={dataform.code} />
							</FormGroup>
						</div>
						<div className='col-12'>
							<FormGroup id='name' label='Name'>
								<Input onChange={handleChangeCategory} value={dataform.name} />
							</FormGroup>
						</div>
						<div className='col-12'>
							<FormGroup id='Image' label='Image'>
								<div className='mt-2 mb-2'>
									<div
										style={{
											width: '100%',
											height: 200,
											borderRadius: 10,
											display: 'flex',
											justifyContent: 'center',
											alignItems: 'center',
											borderWidth: thumbnailMain ? 0 : 1,
											borderStyle: 'dashed',
											borderColor: '#E9E5E5',
											backgroundImage: `url(${thumbnailMain}`,
											backgroundSize: '100% 100%',
											cursor: 'pointer',
											'&:hover': {
												opacity: 0.5,
											},
											position: 'relative',
										}}>
										{thumbnailMain ? (
											<label htmlFor='img-input'>
												<h1 style={{ color: '#E9E5E5', cursor: 'pointer' }}>
													<Icon icon='edit' style={{ fontSize: 26 }} />
												</h1>
											</label>
										) : (
											<label htmlFor='img-input'>
												<h1 style={{ color: '#E9E5E5', cursor: 'pointer' }}>
													+
												</h1>
											</label>
										)}

										<input
											id='img-input'
											style={{ display: 'none' }}
											type='file'
											autoComplete='photo'
											onChange={handleThumbnailMain}
										/>
										{thumbnailMain && (
											<div
												onClick={() => deleteThumbnailMain()}
												onKeyDown={() => deleteThumbnailMain()}
												role='button'
												tabIndex='0'
												style={{
													position: 'absolute',
													top: -10,
													right: -10,
													color: 'red',
													zIndex: 1,
													fontSize: 24,
													display: 'flex',
													justifyContent: 'center',
													alignItems: 'center',
													width: 20,
													height: 20,
													borderRadius: 50,
													backgroundColor: '#FBECE9',
													cursor: 'pointer',
												}}>
												<Icon icon='clear' style={{ fontSize: 14 }} />
											</div>
										)}
									</div>
								</div>
							</FormGroup>
						</div>

						<div display='flex'>
							<div className='col-9'>
								<FormGroup id='subcategory' label='Sub Category'>
									<Input
										onChange={handleTextSubCategory}
										value={testSubcategory}
									/>
								</FormGroup>
							</div>
							<Icon
								icon='ArrowForward'
								style={{
									fontSize: 24,
									marginLeft: 16,
									color: 'black',
									justifyContent: 'center',
								}}
								onClick={addTextSubCategory}
							/>
						</div>

						<div className='col-12'>
							{subcategory.length > 0 && (
								<div
									style={{
										display: 'flex',
										marginTop: 8,
										padding: '8px 16px',
										borderWidth: 1,
										borderStyle: 'dashed',
										borderRadius: 10,
										borderColor: '#E9E5E5',
										alignItems: 'center',
										flexWrap: 'wrap',
									}}>
									{subcategory.map((item) => {
										return (
											<div
												style={{
													padding: '4px 8px',
													borderRadius: 4,
													backgroundColor: '#FBECE9',
													display: 'flex',
													justifyContent: 'center',
													alignItems: 'center',
													marginRight: 4,
													marginTop: 4,
													fontSize: 12,
													position: 'relative',
												}}>
												{item.name}

												<div
													onClick={() => deleteSubCategory(item.name)}
													onKeyDown={() => deleteSubCategory(item.name)}
													role='button'
													tabIndex='0'
													style={{
														position: 'absolute',
														top: -4,
														right: -4,
														color: 'red',
														zIndex: 1,
														fontSize: 10,
														display: 'flex',
														justifyContent: 'center',
														alignItems: 'center',
														width: 10,
														height: 10,
														borderRadius: 50,
														backgroundColor: '#FBECE9',
														cursor: 'pointer',
													}}>
													x
												</div>
											</div>
										);
									})}
								</div>
							)}
						</div>

						<div className='col-12'>
							<FormGroup id='type' label='Type' className='col-md-12'>
								<Select
									ariaLabel='Type'
									placeholder='Choose Type'
									list={selectType}
									onChange={handleChangeCategory}
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
									onChange={handleChangeCategory}
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
						{isPostCategory === 'isPostCategory' && (
							<p style={{ fontSize: 14, color: 'red' }}> Tao moi that bai</p>
						)}
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
									value={dataformedit.create_date}
									type='date'
								/>
							</FormGroup>
						</div>
						<div className='col-12'>
							<FormGroup id='code' label='Code'>
								<Input onChange={handleEditForm} value={dataformedit.code} />
							</FormGroup>
						</div>
						<div className='col-12'>
							<FormGroup id='name' label='Name'>
								<Input onChange={handleEditForm} value={dataformedit.name} />
							</FormGroup>
						</div>
						<div className='col-12'>
							<FormGroup id='Image' label='Image'>
								<div className='mt-2 mb-2'>
									<div
										style={{
											width: '100%',
											height: 200,
											borderRadius: 10,
											display: 'flex',
											justifyContent: 'center',
											alignItems: 'center',
											borderWidth: dataformedit.image ? 0 : 1,
											borderStyle: 'dashed',
											borderColor: '#E9E5E5',
											backgroundImage: `url(${dataformedit.image}`,
											backgroundSize: '100% 100%',
											cursor: 'pointer',
											'&:hover': {
												opacity: 0.5,
											},
											position: 'relative',
										}}>
										{dataformedit.image ? (
											<label htmlFor='img-input'>
												<h1 style={{ color: '#E9E5E5', cursor: 'pointer' }}>
													<Icon icon='edit' style={{ fontSize: 26 }} />
												</h1>
											</label>
										) : (
											<label htmlFor='img-input'>
												<h1 style={{ color: '#E9E5E5', cursor: 'pointer' }}>
													+
												</h1>
											</label>
										)}

										<input
											id='img-input'
											style={{ display: 'none' }}
											type='file'
											autoComplete='photo'
											onChange={handleThumbnailMain}
										/>
										{dataformedit.image && (
											<div
												onClick={() => deleteThumbnailMain()}
												onKeyDown={() => deleteThumbnailMain()}
												role='button'
												tabIndex='0'
												style={{
													position: 'absolute',
													top: -10,
													right: -10,
													color: 'red',
													zIndex: 1,
													fontSize: 24,
													display: 'flex',
													justifyContent: 'center',
													alignItems: 'center',
													width: 20,
													height: 20,
													borderRadius: 50,
													backgroundColor: '#FBECE9',
													cursor: 'pointer',
												}}>
												<Icon icon='clear' style={{ fontSize: 14 }} />
											</div>
										)}
									</div>
								</div>
							</FormGroup>
						</div>

						<div display='flex'>
							<div className='col-9'>
								<FormGroup id='subcategory' label='Sub Category'>
									<Input
										onChange={handleTextSubCategory}
										value={testSubcategory}
									/>
								</FormGroup>
							</div>
							<Icon
								icon='ArrowForward'
								style={{
									fontSize: 24,
									marginLeft: 16,
									color: 'black',
									justifyContent: 'center',
								}}
								onClick={addTextSubCategoryEdit}
							/>
						</div>

						<div className='col-12'>
							{dataformedit?.subcategory?.length > 0 && (
								<div
									style={{
										display: 'flex',
										marginTop: 8,
										padding: '8px 16px',
										borderWidth: 1,
										borderStyle: 'dashed',
										borderRadius: 10,
										borderColor: '#E9E5E5',
										alignItems: 'center',
										flexWrap: 'wrap',
									}}>
									{dataformedit?.subcategory?.map((item) => {
										return (
											<div
												style={{
													padding: '4px 8px',
													borderRadius: 4,
													backgroundColor: '#FBECE9',
													display: 'flex',
													justifyContent: 'center',
													alignItems: 'center',
													marginRight: 4,
													marginTop: 4,
													fontSize: 12,
													position: 'relative',
												}}>
												{item.name}

												<div
													onClick={() => deleteSubCategoryEdit(item.name)}
													onKeyDown={() =>
														deleteSubCategoryEdit(item.name)
													}
													role='button'
													tabIndex='0'
													style={{
														position: 'absolute',
														top: -4,
														right: -4,
														color: 'red',
														zIndex: 1,
														fontSize: 10,
														display: 'flex',
														justifyContent: 'center',
														alignItems: 'center',
														width: 10,
														height: 10,
														borderRadius: 50,
														backgroundColor: '#FBECE9',
														cursor: 'pointer',
													}}>
													x
												</div>
											</div>
										);
									})}
								</div>
							)}
						</div>

						<div className='col-12'>
							<FormGroup id='type' label='Type' className='col-md-12'>
								<Select
									ariaLabel='Type'
									placeholder='Choose Type'
									list={selectType}
									onChange={handleEditForm}
									value={dataformedit.type}
									isValid={dataformedit.type}
									isTouched={dataformedit.type}
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
									value={dataformedit.show}
									isValid={dataformedit.show}
									isTouched={dataformedit.show}
								/>
							</FormGroup>
						</div>
					</div>
				</OffCanvasBody>
				<div className='row m-0'>
					<div className='col-12 p-3'>
						{isPutCategory === 'fail' && (
							<p style={{ fontSize: 14, color: 'red' }}> Edit that bai</p>
						)}

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
							<FormGroup id='code' label='Code'>
								<Input onChange={handleEditForm} value={dataform.code} disabled />
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

export default CategoryTreeComponent;
