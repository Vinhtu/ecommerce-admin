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
	GetStorageCapacitys,
	PostStorageCapacity,
	PutStorageCapacity,
	DeleteStorageCapacity,
} from '../../../redux/actions/utils/storagecapacitys';

import Select from '../../../components/bootstrap/forms/Select';
import { GetCategorys } from '../../../redux/actions/categorys';

// eslint-disable-next-line react/prop-types
const StorageCapacityComponent = ({ isFluid }) => {
	const dispatch = useDispatch();
	const {
		// themeStatus,
		darkModeStatus,
	} = useDarkMode();
	const { StorageCapacityList, isPutStorageCapacity, isPostStorageCapacity, isDeleteStorageCapacity } = useSelector(
		(state) => state.storagecapacity,
	);
	const {
		categoryList,
		// , isPutCategory, isPostCategory, isDeleteCategory
	} = useSelector((state) => state.category);
	const [opentNewStorageCapacity, setOpenNewStorageCapacity] = useState(false);
	const [opentEditStorageCapacity, setOpenEditStorageCapacity] = useState(false);
	const [opentDeleteStorageCapacity, setOpenDeleteStorageCapacity] = useState(false);

	// const accountInfo = localStorage.getItem('accountinfo');
	const accessToken = localStorage.getItem('accessToken');
	// const refreshToken = localStorage.getItem('refreshToken');
	// const account_id = JSON.parse(accountInfo);
	const token = JSON.parse(accessToken);
	// const refreshtoken = JSON.parse(refreshToken);

	const StorageCapacity = [
		{
			name: '',
			create_date: moment().add(0, 'days').format('YYYY-MM-DD'),
		},
	];

	useEffect(() => {
		dispatch(GetCategorys());
	}, [dispatch]);

	useEffect(() => {
		dispatch(GetStorageCapacitys());
	}, [dispatch]);

	useEffect(() => {
		dispatch(GetStorageCapacitys());
	}, [dispatch, isPutStorageCapacity, isPostStorageCapacity, isDeleteStorageCapacity]);

	const [currentPage, setCurrentPage] = useState(1);
	const [perPage, setPerPage] = useState(PER_COUNT['5']);

	const { items } = useSortableData(StorageCapacityList ? StorageCapacityList.data.results : StorageCapacity);

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
	const openEditStorageCapacity = (item) => {
		setDataFormEdit({
			...dataformedit,
			_id: item._id,
			name: item.name,
			category: item.category,
			subcategory: item.subcategory,
			create_date: item.create_date,
		});

		setOpenEditStorageCapacity(true);
	};

	const openDeleteStorageCapacity = (item) => {
		setDataFormEdit({
			...dataformedit,
			_id: item._id,
			name: item.name,
			category: item.category,
			subcategory: item.subcategory,
			create_date: item.create_date,
		});

		setOpenDeleteStorageCapacity(true);
	};

	const deleteStorageCapacity = () => {
		dispatch(DeleteStorageCapacity(dataformedit._id, token));
	};

	const handleChangeStorageCapacity = (e) => {
		setDataForm({ ...dataform, [e.target.id]: e.target.value });
	};

	const handleChangeStorageCapacityEdit = (e) => {
		setDataFormEdit({ ...dataformedit, [e.target.id]: e.target.value });
	};

	const postStorageCapacity = () => {
		dispatch(PostStorageCapacity(dataform, token));
	};
	useEffect(() => {
		if (isPostStorageCapacity === 'success') {
			setOpenNewStorageCapacity(false);
		}
	}, [isPostStorageCapacity]);

	const editStorageCapacity = () => {
		dispatch(PutStorageCapacity(dataformedit._id, dataformedit, token));
	};

	useEffect(() => {
		if (isPutStorageCapacity === 'success') {
			setOpenEditStorageCapacity(false);
		}
	}, [isPutStorageCapacity]);
	useEffect(() => {
		if (isDeleteStorageCapacity === 'success') {
			setOpenDeleteStorageCapacity(false);
		}
	}, [isDeleteStorageCapacity]);

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
							Total ' {StorageCapacityList && StorageCapacityList.data.results.length} ' StorageCapacitys
						</CardTitle>
					</CardLabel>
					<CardActions>
						<Button
							color='info'
							icon='CloudDownload'
							isLight
							onClick={() => setOpenNewStorageCapacity(true)}>
							New StorageCapacity
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
											onClick={() => openEditStorageCapacity(item)}>
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
											onClick={() => openDeleteStorageCapacity(item)}>
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
				setOpen={setOpenNewStorageCapacity}
				isOpen={opentNewStorageCapacity}
				titleId='New StorageCapacity'
				isBodyScroll
				placement='end'
				// className='offcanvas-newStorageCapacity'
			>
				<OffCanvasHeader setOpen={setOpenNewStorageCapacity}>
					<OffCanvasTitle id='NewStorageCapacity'>New StorageCapacity</OffCanvasTitle>
				</OffCanvasHeader>
				<OffCanvasBody>
					<div className='row g-4'>
						<div className='col-12'>
							<FormGroup id='category' label='Danh mục' className='col-md-12'>
								<Select
									ariaLabel='Category'
									placeholder='Choose Category'
									list={selectCategory}
									onChange={handleChangeStorageCapacity}
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
									onChange={handleChangeStorageCapacity}
									value={dataform.subcategory}
									isValid={dataform.subcategory}
									isTouched={dataform.subcategory}
								/>
							</FormGroup>
						</div>
						<div className='col-12'>
							<FormGroup id='name' label='Tên tính năng'>
								<Input onChange={handleChangeStorageCapacity} value={dataform.name} />
							</FormGroup>
						</div>
					</div>
				</OffCanvasBody>
				<div className='row m-0'>
					<div className='col-12 p-3'>
						{isPostStorageCapacity === 'isPostStorageCapacity' && (
							<p style={{ fontSize: 14, color: 'red' }}> Tao moi that bai</p>
						)}
						<Button color='info' className='w-100' onClick={() => postStorageCapacity()}>
							Save
						</Button>
					</div>
				</div>
			</OffCanvas>

			<OffCanvas
				setOpen={setOpenEditStorageCapacity}
				isOpen={opentEditStorageCapacity}
				titleId='Edit StorageCapacity'
				isBodyScroll
				placement='end'>
				<OffCanvasHeader setOpen={setOpenEditStorageCapacity}>
					<OffCanvasTitle id='EditStorageCapacity'>Edit StorageCapacity</OffCanvasTitle>
				</OffCanvasHeader>
				<OffCanvasBody>
					<div className='row g-4'>
						<div className='col-12'>
							<FormGroup id='category' label='Danh mục' className='col-md-12'>
								<Select
									ariaLabel='Category'
									placeholder='Choose Category'
									list={selectCategory}
									onChange={handleChangeStorageCapacityEdit}
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
									onChange={handleChangeStorageCapacityEdit}
									value={dataformedit.subcategory}
									isValid={dataformedit.subcategory}
									isTouched={dataformedit.subcategory}
								/>
							</FormGroup>
						</div>
						<div className='col-12'>
							<FormGroup id='name' label='Tên tính năng'>
								<Input
									onChange={handleChangeStorageCapacityEdit}
									value={dataformedit.name}
								/>
							</FormGroup>
						</div>
					</div>
				</OffCanvasBody>
				<div className='row m-0'>
					<div className='col-12 p-3'>
						{isPutStorageCapacity === 'fail' && (
							<p style={{ fontSize: 14, color: 'red' }}> Edit that bai</p>
						)}

						<Button color='info' className='w-100' onClick={() => editStorageCapacity()}>
							Save
						</Button>
					</div>
				</div>
			</OffCanvas>

			<OffCanvas
				setOpen={setOpenDeleteStorageCapacity}
				isOpen={opentDeleteStorageCapacity}
				titleId='Edit StorageCapacity'
				isBodyScroll
				placement='end'>
				<OffCanvasHeader setOpen={setOpenDeleteStorageCapacity}>
					<OffCanvasTitle id='EditStorageCapacity'>Delete StorageCapacity</OffCanvasTitle>
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
						{isDeleteStorageCapacity === 'fail' && (
							<p style={{ fontSize: 14, color: 'red' }}> Delete thất bại</p>
						)}
						<Button color='waring' className='w-100' onClick={() => deleteStorageCapacity()}>
							Delete
						</Button>
					</div>
				</div>
			</OffCanvas>
		</>
	);
};

export default StorageCapacityComponent;
