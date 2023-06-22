import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import classNames from 'classnames';
import moment from 'moment';
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
import { GetBrands, PostBrand, PutBrand, DeleteBrand } from '../../redux/actions/brands';
import { GetCategorys } from '../../redux/actions/categorys';

import Select from '../../components/bootstrap/forms/Select';

// eslint-disable-next-line react/prop-types
const BrandComponent = ({ isFluid }) => {
	const dispatch = useDispatch();
	const {
		// themeStatus,
		darkModeStatus,
	} = useDarkMode();
	const { brandList, isPostBrand, isPutBrand, isDeleteBrand } = useSelector(
		(state) => state.brand,
	);
	const {
		categoryList,
		// , isPutCategory, isPostCategory, isDeleteCategory
	} = useSelector((state) => state.category);

	const [opentNewBrand, setOpenNewBrand] = useState(false);
	const [opentEditBrand, setOpenEditBrand] = useState(false);
	const [opentDeleteBrand, setOpenDeleteBrand] = useState(false);

	// const accountInfo = localStorage.getItem('accountinfo');
	const accessToken = localStorage.getItem('accessToken');
	// const refreshToken = localStorage.getItem('refreshToken');
	// const account_id = JSON.parse(accountInfo);
	const token = JSON.parse(accessToken);
	// const refreshtoken = JSON.parse(refreshToken);

	const brand = [
		{
			name: '',
			create_date: moment().add(0, 'days').format('YYYY-MM-DD'),
		},
	];
	// const addNewbrand = () => {
	// 	setUpcomingEventsEditOffcanvas(!upcomingEventsEditOffcanvas);
	// };
	useEffect(() => {
		dispatch(GetBrands());
	}, [dispatch]);

	useEffect(() => {
		dispatch(GetBrands());
	}, [dispatch, isPostBrand, isPutBrand, isDeleteBrand]);

	useEffect(() => {
		dispatch(GetCategorys());
	}, [dispatch]);

	const [currentPage, setCurrentPage] = useState(1);
	const [perPage, setPerPage] = useState(PER_COUNT['5']);

	const { items, requestSort, getClassNamesFor } = useSortableData(
		brandList ? brandList.data.results : brand,
	);

	const [dataform, setDataForm] = React.useState({
		_id: '',
		category: '',
		subcategory: '',
		subbrand: '',
		create_date: moment().add(0, 'days').format('YYYY-MM-DD'),
	});

	const [dataformedit, setDataFormEdit] = React.useState({
		_id: '',
		category: '',
		subcategory: '',
		subbrand: '',
		create_date: moment().add(0, 'days').format('YYYY-MM-DD'),
	});

	const openEditBrand = (item) => {
		setDataFormEdit({
			...dataformedit,
			_id: item._id,
			category: item.category,
			subcategory: item.subcategory,
			subbrand: item.subbrand,
			create_date: item.create_date,
		});

		SetArrBrand(item.subbrand);
		// console.log(dataform,'datafrom')
		setOpenEditBrand(true);
	};
	const handleEditForm = (event) => {
		setDataForm({ ...dataform, [event.target.id]: event.target.value });
	};

	const openDeleteBrand = (item) => {
		setDataForm({
			...dataform,
			_id: item._id,
			category: item.category,
			subcategory: item.subcategory,
			subbrand: item.subbrand,
			create_date: item.create_date,
		});
		setOpenDeleteBrand(true);
	};

	const deleteBrand = () => {
		dispatch(DeleteBrand(dataform._id, token));
		setOpenDeleteBrand(false);
	};
	const handleChangeCategory = (e) => {
		setDataForm({ ...dataform, [e.target.id]: e.target.value });
	};

	const selectCategory = [];
	if (categoryList) {
		for (let i = 0; i < categoryList.data.results.length; i += 1) {
			selectCategory.push({
				value: categoryList.data.results[i].name,
				text: categoryList.data.results[i].name,
			});
		}
	}

	const selectSubCategory = [];
	if (categoryList) {
		for (let i = 0; i < categoryList.data.results.length; i += 1) {
			if (categoryList.data.results[i].name === dataform.category) {
				for (let j = 0; j < categoryList.data.results[i].subcategory.length; j += 1) {
					selectSubCategory.push({
						value: categoryList.data.results[i].subcategory[j].name,
						text: categoryList.data.results[i].subcategory[j].name,
					});
				}
			}
		}
	}

	const [testBrand, SetTestBrand] = React.useState('');

	const [arrbrand, SetArrBrand] = React.useState([]);

	const handleTextSubCategory = (e) => {
		SetTestBrand(e.target.value);
	};

	const addTextBrand = () => {
		if (testBrand) {
			SetArrBrand((current) => [
				...current,
				{
					name: testBrand,
				},
			]);
			setDataForm({
				...dataform,
				subbrand: arrbrand,
			});

			SetTestBrand('');
		}
	};

	const addTextBrandEdit = async () => {
		if (testBrand) {
			// SetArrBrand((current) => [
			// 	...current,

			// 	{
			// 		name: testBrand,
			// 	},
			// ]);
			setDataFormEdit({
				...dataformedit,
				subbrand: [...dataformedit.subbrand, { name: testBrand }],
			});
			SetTestBrand('');
		}
	};

	const deleteArrBrand = (data) => {
		SetArrBrand(arrbrand.filter((e) => e.name !== data));
	};

	const deleteArrBrandEdit = (data) => {
		setDataFormEdit({
			...dataformedit,
			subbrand: dataformedit.subbrand.filter((e) => e.name !== data),
		});
	};

	const postBrand = () => {
		dispatch(PostBrand(dataform, token));
	};

	const editBrand = () => {
		dispatch(PutBrand(dataformedit._id, dataformedit, token));
	};

	useEffect(() => {
		if (isPostBrand === 'success') {
			setOpenNewBrand(false);
		}
	}, [isPostBrand]);

	useEffect(() => {
		if (isPutBrand === 'success') {
			setOpenEditBrand(false);
		}
	}, [isPutBrand]);

	return (
		<>
			<Card stretch={isFluid}>
				<CardHeader borderSize={1}>
					<CardLabel icon='Alarm' iconColor='info'>
						<CardTitle>
							Total ' {brandList && brandList.data.results.length} ' brands
						</CardTitle>
					</CardLabel>
					<CardActions>
						<Button
							color='info'
							icon='CloudDownload'
							isLight
							onClick={() => setOpenNewBrand(true)}>
							New Brand
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
								<th>Category</th>
								<th>Sub Category</th>
								<th>Amount Brand</th>

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
											<div>{item?.category}</div>
										</div>
									</td>

									<td>
										<div>
											<div>{item?.subcategory}</div>
										</div>
									</td>
									<td>
										<div>
											<div>{item?.subbrand?.length}</div>
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
											onClick={() => openEditBrand(item)}>
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
											onClick={() => openDeleteBrand(item)}>
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
				setOpen={setOpenNewBrand}
				isOpen={opentNewBrand}
				titleId='New Brand'
				isBodyScroll
				placement='end'>
				<OffCanvasHeader setOpen={setOpenNewBrand}>
					<OffCanvasTitle id='NewBrand'>New Brand</OffCanvasTitle>
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
							<FormGroup id='category' label='Category' className='col-md-12'>
								<Select
									ariaLabel='Category'
									placeholder='Choose Category'
									list={selectCategory}
									onChange={handleChangeCategory}
									value={dataform.category}
									isValid={dataform.category}
									isTouched={dataform.category}
								/>
							</FormGroup>
						</div>

						<div className='col-12'>
							<FormGroup id='subcategory' label='Sub Category' className='col-md-12'>
								<Select
									ariaLabel='Sub Category'
									placeholder='Choose Sub Category'
									list={selectSubCategory}
									onChange={handleChangeCategory}
									value={dataform.subcategory}
									isValid={dataform.subcategory}
									isTouched={dataform.subcategory}
								/>
							</FormGroup>
						</div>

						<div display='flex'>
							<div className='col-9'>
								<FormGroup id='subcategory' label='Sub Category'>
									<Input onChange={handleTextSubCategory} value={testBrand} />
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
								onClick={addTextBrand}
							/>
						</div>

						<div className='col-12'>
							{dataformedit?.subbrand?.length > 0 && (
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
									{dataformedit?.subbrand?.map((item) => {
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
													onClick={() => deleteArrBrand(item.name)}
													onKeyDown={() => deleteArrBrand(item.name)}
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
					</div>
				</OffCanvasBody>
				<div className='row m-0'>
					<div className='col-12 p-3'>
						{isPostBrand === 'fail' && (
							<p style={{ fontSize: 14, color: 'red' }}> Tao moi that bai</p>
						)}

						<Button color='info' className='w-100' onClick={() => postBrand()}>
							Save
						</Button>
					</div>
				</div>
			</OffCanvas>

			<OffCanvas
				setOpen={setOpenEditBrand}
				isOpen={opentEditBrand}
				titleId='Edit Brand'
				isBodyScroll
				placement='end'>
				<OffCanvasHeader setOpen={setOpenEditBrand}>
					<OffCanvasTitle id='EditBrand'>Edit Brand</OffCanvasTitle>
				</OffCanvasHeader>
				<OffCanvasBody>
					<div className='row g-4'>
						<div className='col-12'>
							<FormGroup id='create_date' label='Create Date'>
								<Input
									onChange={handleChangeCategory}
									value={dataformedit.create_date}
									type='date'
								/>
							</FormGroup>
						</div>

						<div className='col-12'>
							<FormGroup id='category' label='Category' className='col-md-12'>
								<Select
									ariaLabel='Category'
									placeholder={dataformedit.category}
									list={selectCategory}
									onChange={handleChangeCategory}
									value={dataformedit.category}
									isValid={dataformedit.category}
									isTouched={dataformedit.category}
								/>
							</FormGroup>
						</div>

						<div className='col-12'>
							<FormGroup id='subcategory' label='Sub Category' className='col-md-12'>
								<Select
									ariaLabel='Sub Category'
									placeholder={dataformedit.subcategory}
									list={selectSubCategory}
									onChange={handleChangeCategory}
									value={dataformedit.subcategory}
									isValid={dataformedit.subcategory}
									isTouched={dataformedit.subcategory}
								/>
							</FormGroup>
						</div>

						<div display='flex'>
							<div className='col-9'>
								<FormGroup id='subcategory' label='Sub Category'>
									<Input onChange={handleTextSubCategory} value={testBrand} />
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
								onClick={addTextBrandEdit}
							/>
						</div>

						<div className='col-12'>
							{dataformedit?.subbrand?.length > 0 && (
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
									{dataformedit?.subbrand?.map((item) => {
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
													onClick={() => deleteArrBrandEdit(item.name)}
													onKeyDown={() => deleteArrBrandEdit(item.name)}
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
					</div>
				</OffCanvasBody>
				<div className='row m-0'>
					<div className='col-12 p-3'>
						{isPutBrand === 'fail' && (
							<p style={{ fontSize: 14, color: 'red' }}> Edit that bai</p>
						)}
						<Button color='info' className='w-100' onClick={() => editBrand()}>
							Save
						</Button>
					</div>
				</div>
			</OffCanvas>

			<OffCanvas
				setOpen={setOpenDeleteBrand}
				isOpen={opentDeleteBrand}
				titleId='Edit Brand'
				isBodyScroll
				placement='end'>
				<OffCanvasHeader setOpen={setOpenDeleteBrand}>
					<OffCanvasTitle id='EditBrand'>Delete Brand</OffCanvasTitle>
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
						<Button color='waring' className='w-100' onClick={() => deleteBrand()}>
							Delete
						</Button>
					</div>
				</div>
			</OffCanvas>
		</>
	);
};

export default BrandComponent;
