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
} from '../../../components/bootstrap/Card';
import Button from '../../../components/bootstrap/Button';

// import Icon from '../../../components/icon/Icon';
import OffCanvas, {
	OffCanvasBody,
	OffCanvasHeader,
	OffCanvasTitle,
} from '../../../components/bootstrap/OffCanvas';
import FormGroup from '../../../components/bootstrap/forms/FormGroup';
import Input from '../../../components/bootstrap/forms/Input';

import PaginationButtons, {
	dataPagination,
	PER_COUNT,
} from '../../../components/PaginationButtons';
import useSortableData from '../../../hooks/useSortableData';
import useDarkMode from '../../../hooks/useDarkMode';
import {
	GetSkinTypes,
	PostSkinType,
	PutSkinType,
	DeleteSkinType,
} from '../../../redux/actions/utils/skintypes';

import Select from '../../../components/bootstrap/forms/Select';
import { GetCategorys } from '../../../redux/actions/categorys';

// eslint-disable-next-line react/prop-types
const SkinTypeComponent = ({ isFluid }) => {
	const dispatch = useDispatch();
	const {
		// themeStatus,
		darkModeStatus,
	} = useDarkMode();
	const { SkinTypeList, isPutSkinType, isPostSkinType, isDeleteSkinType } = useSelector(
		(state) => state.skintype,
	);
	const {
		categoryList,
		// , isPutCategory, isPostCategory, isDeleteCategory
	} = useSelector((state) => state.category);
	const [opentNewSkinType, setOpenNewSkinType] = useState(false);
	const [opentEditSkinType, setOpenEditSkinType] = useState(false);
	const [opentDeleteSkinType, setOpenDeleteSkinType] = useState(false);

	// const accountInfo = localStorage.getItem('accountinfo');
	const accessToken = localStorage.getItem('accessToken');
	// const refreshToken = localStorage.getItem('refreshToken');
	// const account_id = JSON.parse(accountInfo);
	const token = JSON.parse(accessToken);
	// const refreshtoken = JSON.parse(refreshToken);

	const SkinType = [
		{
			name: '',
			create_date: moment().add(0, 'days').format('YYYY-MM-DD'),
		},
	];

	useEffect(() => {
		dispatch(GetCategorys());
	}, [dispatch]);

	useEffect(() => {
		dispatch(GetSkinTypes());
	}, [dispatch]);

	useEffect(() => {
		dispatch(GetSkinTypes());
	}, [dispatch, isPutSkinType, isPostSkinType, isDeleteSkinType]);

	const [currentPage, setCurrentPage] = useState(1);
	const [perPage, setPerPage] = useState(PER_COUNT['5']);

	const { items } = useSortableData(SkinTypeList ? SkinTypeList.data.results : SkinType);

	const [dataform, setDataForm] = React.useState({
		_id: '',
		name: '',
		category: '',
		subcategory: '',
		create_date: moment().add(0, 'days').format('YYYY-MM-DD'),
	});

	const [dataformedit, setDataFormEdit] = React.useState({
		_id: '',
		name: '',
		category: '',
		subcategory: '',
		create_date: moment().add(0, 'days').format('YYYY-MM-DD'),
	});
	const openEditSkinType = (item) => {
		setDataFormEdit({
			...dataformedit,
			_id: item._id,
			name: item.name,
			category: item.category,
			subcategory: item.subcategory,
			create_date: item.create_date,
		});

		setOpenEditSkinType(true);
	};

	const openDeleteSkinType = (item) => {
		setDataFormEdit({
			...dataformedit,
			_id: item._id,
			name: item.name,
			category: item.category,
			subcategory: item.subcategory,
			create_date: item.create_date,
		});

		setOpenDeleteSkinType(true);
	};

	const deleteSkinType = () => {
		dispatch(DeleteSkinType(dataformedit._id, token));
	};

	const handleChangeSkinType = (e) => {
		setDataForm({ ...dataform, [e.target.id]: e.target.value });
	};

	const handleChangeSkinTypeEdit = (e) => {
		setDataFormEdit({ ...dataformedit, [e.target.id]: e.target.value });
	};

	const postSkinType = () => {
		dispatch(PostSkinType(dataform, token));
	};
	useEffect(() => {
		if (isPostSkinType === 'success') {
			setOpenNewSkinType(false);
		}
	}, [isPostSkinType]);

	const editSkinType = () => {
		dispatch(PutSkinType(dataformedit._id, dataformedit, token));
	};

	useEffect(() => {
		if (isPutSkinType === 'success') {
			setOpenEditSkinType(false);
		}
	}, [isPutSkinType]);
	useEffect(() => {
		if (isDeleteSkinType === 'success') {
			setOpenDeleteSkinType(false);
		}
	}, [isDeleteSkinType]);

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


	return (
		<>
			<Card stretch={isFluid}>
				<CardHeader borderSize={1}>
					<CardLabel icon='Alarm' iconColor='info'>
						<CardTitle>
							Total ' {SkinTypeList && SkinTypeList.data.results.length} ' SkinTypes
						</CardTitle>
					</CardLabel>
					<CardActions>
						<Button
							color='info'
							icon='CloudDownload'
							isLight
							onClick={() => setOpenNewSkinType(true)}>
							New SkinType
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
								<th>Tên</th>
								<th>Danh mục</th>
								<th>Nhánh danh mục</th>

								<td />
							</tr>
						</thead>
						<tbody>
							{dataPagination(items, currentPage, perPage).map((item) => (
								<tr key={item.id}>
									<td>
										<div>
											<div>{item.name}</div>
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
										<Button
											isOutline={!darkModeStatus}
											color='dark'
											isLight={darkModeStatus}
											className={classNames('text-nowrap', {
												'border-light': !darkModeStatus,
											})}
											style={{ marginRight: 8 }}
											icon='Edit'
											onClick={() => openEditSkinType(item)}>
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
											onClick={() => openDeleteSkinType(item)}>
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
				setOpen={setOpenNewSkinType}
				isOpen={opentNewSkinType}
				titleId='New SkinType'
				isBodyScroll
				placement='end'
				// className='offcanvas-newSkinType'
			>
				<OffCanvasHeader setOpen={setOpenNewSkinType}>
					<OffCanvasTitle id='NewSkinType'>New SkinType</OffCanvasTitle>
				</OffCanvasHeader>
				<OffCanvasBody>
					<div className='row g-4'>
						<div className='col-12'>
							<FormGroup id='category' label='Danh mục' className='col-md-12'>
								<Select
									ariaLabel='Category'
									placeholder='Choose Category'
									list={selectCategory}
									onChange={handleChangeSkinType}
									value={dataform.category}
									isValid={dataform.category}
									isTouched={dataform.category}
								/>
							</FormGroup>
						</div>

						<div className='col-12'>
							<FormGroup
								id='subcategory'
								label='Nhánh dannh mục'
								className='col-md-12'>
								<Select
									ariaLabel='Sub Category'
									placeholder='Choose Sub Category'
									list={selectSubCategory}
									onChange={handleChangeSkinType}
									value={dataform.subcategory}
									isValid={dataform.subcategory}
									isTouched={dataform.subcategory}
								/>
							</FormGroup>
						</div>
						<div className='col-12'>
							<FormGroup id='name' label='Tên tính năng'>
								<Input onChange={handleChangeSkinType} value={dataform.name} />
							</FormGroup>
						</div>
					</div>
				</OffCanvasBody>
				<div className='row m-0'>
					<div className='col-12 p-3'>
						{isPostSkinType === 'isPostSkinType' && (
							<p style={{ fontSize: 14, color: 'red' }}> Tao moi that bai</p>
						)}
						<Button color='info' className='w-100' onClick={() => postSkinType()}>
							Save
						</Button>
					</div>
				</div>
			</OffCanvas>

			<OffCanvas
				setOpen={setOpenEditSkinType}
				isOpen={opentEditSkinType}
				titleId='Edit SkinType'
				isBodyScroll
				placement='end'>
				<OffCanvasHeader setOpen={setOpenEditSkinType}>
					<OffCanvasTitle id='EditSkinType'>Edit SkinType</OffCanvasTitle>
				</OffCanvasHeader>
				<OffCanvasBody>
					<div className='row g-4'>
						<div className='col-12'>
							<FormGroup id='category' label='Danh mục' className='col-md-12'>
								<Select
									ariaLabel='Category'
									placeholder='Choose Category'
									list={selectCategory}
									onChange={handleChangeSkinTypeEdit}
									value={dataformedit.category}
									isValid={dataformedit.category}
									isTouched={dataformedit.category}
								/>
							</FormGroup>
						</div>

						<div className='col-12'>
							<FormGroup
								id='subcategory'
								label='Nhánh dannh mục'
								className='col-md-12'>
								<Select
									ariaLabel='Sub Category'
									placeholder='Choose Sub Category'
									list={selectSubCategory}
									onChange={handleChangeSkinTypeEdit}
									value={dataformedit.subcategory}
									isValid={dataformedit.subcategory}
									isTouched={dataformedit.subcategory}
								/>
							</FormGroup>
						</div>
						<div className='col-12'>
							<FormGroup id='name' label='Tên tính năng'>
								<Input
									onChange={handleChangeSkinTypeEdit}
									value={dataformedit.name}
								/>
							</FormGroup>
						</div>
					</div>
				</OffCanvasBody>
				<div className='row m-0'>
					<div className='col-12 p-3'>
						{isPutSkinType === 'fail' && (
							<p style={{ fontSize: 14, color: 'red' }}> Edit that bai</p>
						)}

						<Button color='info' className='w-100' onClick={() => editSkinType()}>
							Save
						</Button>
					</div>
				</div>
			</OffCanvas>

			<OffCanvas
				setOpen={setOpenDeleteSkinType}
				isOpen={opentDeleteSkinType}
				titleId='Edit SkinType'
				isBodyScroll
				placement='end'>
				<OffCanvasHeader setOpen={setOpenDeleteSkinType}>
					<OffCanvasTitle id='EditSkinType'>Delete SkinType</OffCanvasTitle>
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
						{isDeleteSkinType === 'fail' && (
							<p style={{ fontSize: 14, color: 'red' }}> Delete thất bại</p>
						)}
						<Button color='waring' className='w-100' onClick={() => deleteSkinType()}>
							Delete
						</Button>
					</div>
				</div>
			</OffCanvas>
		</>
	);
};

export default SkinTypeComponent;
