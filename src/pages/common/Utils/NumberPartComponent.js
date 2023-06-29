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
	GetNumberParts,
	PostNumberPart,
	PutNumberPart,
	DeleteNumberPart,
} from '../../../redux/actions/utils/numberparts';

import Select from '../../../components/bootstrap/forms/Select';
import { GetCategorys } from '../../../redux/actions/categorys';

// eslint-disable-next-line react/prop-types
const NumberPartComponent = ({ isFluid }) => {
	const dispatch = useDispatch();
	const {
		// themeStatus,
		darkModeStatus,
	} = useDarkMode();
	const { NumberPartList, isPutNumberPart, isPostNumberPart, isDeleteNumberPart } = useSelector(
		(state) => state.numberpart,
	);
	const {
		categoryList,
		// , isPutCategory, isPostCategory, isDeleteCategory
	} = useSelector((state) => state.category);
	const [opentNewNumberPart, setOpenNewNumberPart] = useState(false);
	const [opentEditNumberPart, setOpenEditNumberPart] = useState(false);
	const [opentDeleteNumberPart, setOpenDeleteNumberPart] = useState(false);

	// const accountInfo = localStorage.getItem('accountinfo');
	const accessToken = localStorage.getItem('accessToken');
	// const refreshToken = localStorage.getItem('refreshToken');
	// const account_id = JSON.parse(accountInfo);
	const token = JSON.parse(accessToken);
	// const refreshtoken = JSON.parse(refreshToken);

	const NumberPart = [
		{
			name: '',
			create_date: moment().add(0, 'days').format('YYYY-MM-DD'),
		},
	];

	useEffect(() => {
		dispatch(GetCategorys());
	}, [dispatch]);

	useEffect(() => {
		dispatch(GetNumberParts());
	}, [dispatch]);

	useEffect(() => {
		dispatch(GetNumberParts());
	}, [dispatch, isPutNumberPart, isPostNumberPart, isDeleteNumberPart]);

	const [currentPage, setCurrentPage] = useState(1);
	const [perPage, setPerPage] = useState(PER_COUNT['5']);

	const { items } = useSortableData(NumberPartList ? NumberPartList.data.results : NumberPart);

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
	const openEditNumberPart = (item) => {
		setDataFormEdit({
			...dataformedit,
			_id: item._id,
			name: item.name,
			category: item.category,
			subcategory: item.subcategory,
			create_date: item.create_date,
		});

		setOpenEditNumberPart(true);
	};

	const openDeleteNumberPart = (item) => {
		setDataFormEdit({
			...dataformedit,
			_id: item._id,
			name: item.name,
			category: item.category,
			subcategory: item.subcategory,
			create_date: item.create_date,
		});

		setOpenDeleteNumberPart(true);
	};

	const deleteNumberPart = () => {
		dispatch(DeleteNumberPart(dataformedit._id, token));
	};

	const handleChangeNumberPart = (e) => {
		setDataForm({ ...dataform, [e.target.id]: e.target.value });
	};

	const handleChangeNumberPartEdit = (e) => {
		setDataFormEdit({ ...dataformedit, [e.target.id]: e.target.value });
	};

	const postNumberPart = () => {
		dispatch(PostNumberPart(dataform, token));
	};
	useEffect(() => {
		if (isPostNumberPart === 'success') {
			setOpenNewNumberPart(false);
		}
	}, [isPostNumberPart]);

	const editNumberPart = () => {
		dispatch(PutNumberPart(dataformedit._id, dataformedit, token));
	};

	useEffect(() => {
		if (isPutNumberPart === 'success') {
			setOpenEditNumberPart(false);
		}
	}, [isPutNumberPart]);
	useEffect(() => {
		if (isDeleteNumberPart === 'success') {
			setOpenDeleteNumberPart(false);
		}
	}, [isDeleteNumberPart]);

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
							Total ' {NumberPartList && NumberPartList.data.results.length} ' NumberParts
						</CardTitle>
					</CardLabel>
					<CardActions>
						<Button
							color='info'
							icon='CloudDownload'
							isLight
							onClick={() => setOpenNewNumberPart(true)}>
							New NumberPart
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
											onClick={() => openEditNumberPart(item)}>
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
											onClick={() => openDeleteNumberPart(item)}>
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
				setOpen={setOpenNewNumberPart}
				isOpen={opentNewNumberPart}
				titleId='New NumberPart'
				isBodyScroll
				placement='end'
				// className='offcanvas-newNumberPart'
			>
				<OffCanvasHeader setOpen={setOpenNewNumberPart}>
					<OffCanvasTitle id='NewNumberPart'>New NumberPart</OffCanvasTitle>
				</OffCanvasHeader>
				<OffCanvasBody>
					<div className='row g-4'>
						<div className='col-12'>
							<FormGroup id='category' label='Danh mục' className='col-md-12'>
								<Select
									ariaLabel='Category'
									placeholder='Choose Category'
									list={selectCategory}
									onChange={handleChangeNumberPart}
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
									onChange={handleChangeNumberPart}
									value={dataform.subcategory}
									isValid={dataform.subcategory}
									isTouched={dataform.subcategory}
								/>
							</FormGroup>
						</div>
						<div className='col-12'>
							<FormGroup id='name' label='Tên tính năng'>
								<Input onChange={handleChangeNumberPart} value={dataform.name} />
							</FormGroup>
						</div>
					</div>
				</OffCanvasBody>
				<div className='row m-0'>
					<div className='col-12 p-3'>
						{isPostNumberPart === 'isPostNumberPart' && (
							<p style={{ fontSize: 14, color: 'red' }}> Tao moi that bai</p>
						)}
						<Button color='info' className='w-100' onClick={() => postNumberPart()}>
							Save
						</Button>
					</div>
				</div>
			</OffCanvas>

			<OffCanvas
				setOpen={setOpenEditNumberPart}
				isOpen={opentEditNumberPart}
				titleId='Edit NumberPart'
				isBodyScroll
				placement='end'>
				<OffCanvasHeader setOpen={setOpenEditNumberPart}>
					<OffCanvasTitle id='EditNumberPart'>Edit NumberPart</OffCanvasTitle>
				</OffCanvasHeader>
				<OffCanvasBody>
					<div className='row g-4'>
						<div className='col-12'>
							<FormGroup id='category' label='Danh mục' className='col-md-12'>
								<Select
									ariaLabel='Category'
									placeholder='Choose Category'
									list={selectCategory}
									onChange={handleChangeNumberPartEdit}
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
									onChange={handleChangeNumberPartEdit}
									value={dataformedit.subcategory}
									isValid={dataformedit.subcategory}
									isTouched={dataformedit.subcategory}
								/>
							</FormGroup>
						</div>
						<div className='col-12'>
							<FormGroup id='name' label='Tên tính năng'>
								<Input
									onChange={handleChangeNumberPartEdit}
									value={dataformedit.name}
								/>
							</FormGroup>
						</div>
					</div>
				</OffCanvasBody>
				<div className='row m-0'>
					<div className='col-12 p-3'>
						{isPutNumberPart === 'fail' && (
							<p style={{ fontSize: 14, color: 'red' }}> Edit that bai</p>
						)}

						<Button color='info' className='w-100' onClick={() => editNumberPart()}>
							Save
						</Button>
					</div>
				</div>
			</OffCanvas>

			<OffCanvas
				setOpen={setOpenDeleteNumberPart}
				isOpen={opentDeleteNumberPart}
				titleId='Edit NumberPart'
				isBodyScroll
				placement='end'>
				<OffCanvasHeader setOpen={setOpenDeleteNumberPart}>
					<OffCanvasTitle id='EditNumberPart'>Delete NumberPart</OffCanvasTitle>
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
						{isDeleteNumberPart === 'fail' && (
							<p style={{ fontSize: 14, color: 'red' }}> Delete thất bại</p>
						)}
						<Button color='waring' className='w-100' onClick={() => deleteNumberPart()}>
							Delete
						</Button>
					</div>
				</div>
			</OffCanvas>
		</>
	);
};

export default NumberPartComponent;
