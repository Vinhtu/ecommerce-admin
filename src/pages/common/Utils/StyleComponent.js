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
	GetStyles,
	PostStyle,
	PutStyle,
	DeleteStyle,
} from '../../../redux/actions/utils/styles';

import Select from '../../../components/bootstrap/forms/Select';
import { GetCategorys } from '../../../redux/actions/categorys';

// eslint-disable-next-line react/prop-types
const StyleComponent = ({ isFluid }) => {
	const dispatch = useDispatch();
	const {
		// themeStatus,
		darkModeStatus,
	} = useDarkMode();
	const { StyleList, isPutStyle, isPostStyle, isDeleteStyle } = useSelector(
		(state) => state.style,
	);
	const {
		categoryList,
		// , isPutCategory, isPostCategory, isDeleteCategory
	} = useSelector((state) => state.category);
	const [opentNewStyle, setOpenNewStyle] = useState(false);
	const [opentEditStyle, setOpenEditStyle] = useState(false);
	const [opentDeleteStyle, setOpenDeleteStyle] = useState(false);

	// const accountInfo = localStorage.getItem('accountinfo');
	const accessToken = localStorage.getItem('accessToken');
	// const refreshToken = localStorage.getItem('refreshToken');
	// const account_id = JSON.parse(accountInfo);
	const token = JSON.parse(accessToken);
	// const refreshtoken = JSON.parse(refreshToken);

	const Style = [
		{
			name: '',
			create_date: moment().add(0, 'days').format('YYYY-MM-DD'),
		},
	];

	useEffect(() => {
		dispatch(GetCategorys());
	}, [dispatch]);

	useEffect(() => {
		dispatch(GetStyles());
	}, [dispatch]);

	useEffect(() => {
		dispatch(GetStyles());
	}, [dispatch, isPutStyle, isPostStyle, isDeleteStyle]);

	const [currentPage, setCurrentPage] = useState(1);
	const [perPage, setPerPage] = useState(PER_COUNT['5']);

	const { items } = useSortableData(StyleList ? StyleList.data.results : Style);

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
	const openEditStyle = (item) => {
		setDataFormEdit({
			...dataformedit,
			_id: item._id,
			name: item.name,
			category: item.category,
			subcategory: item.subcategory,
			create_date: item.create_date,
		});

		setOpenEditStyle(true);
	};

	const openDeleteStyle = (item) => {
		setDataFormEdit({
			...dataformedit,
			_id: item._id,
			name: item.name,
			category: item.category,
			subcategory: item.subcategory,
			create_date: item.create_date,
		});

		setOpenDeleteStyle(true);
	};

	const deleteStyle = () => {
		dispatch(DeleteStyle(dataformedit._id, token));
	};

	const handleChangeStyle = (e) => {
		setDataForm({ ...dataform, [e.target.id]: e.target.value });
	};

	const handleChangeStyleEdit = (e) => {
		setDataFormEdit({ ...dataformedit, [e.target.id]: e.target.value });
	};

	const postStyle = () => {
		dispatch(PostStyle(dataform, token));
	};
	useEffect(() => {
		if (isPostStyle === 'success') {
			setOpenNewStyle(false);
		}
	}, [isPostStyle]);

	const editStyle = () => {
		dispatch(PutStyle(dataformedit._id, dataformedit, token));
	};

	useEffect(() => {
		if (isPutStyle === 'success') {
			setOpenEditStyle(false);
		}
	}, [isPutStyle]);
	useEffect(() => {
		if (isDeleteStyle === 'success') {
			setOpenDeleteStyle(false);
		}
	}, [isDeleteStyle]);

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
							Total ' {StyleList && StyleList.data.results.length} ' Styles
						</CardTitle>
					</CardLabel>
					<CardActions>
						<Button
							color='info'
							icon='CloudDownload'
							isLight
							onClick={() => setOpenNewStyle(true)}>
							New Style
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
											onClick={() => openEditStyle(item)}>
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
											onClick={() => openDeleteStyle(item)}>
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
				setOpen={setOpenNewStyle}
				isOpen={opentNewStyle}
				titleId='New Style'
				isBodyScroll
				placement='end'
				// className='offcanvas-newStyle'
			>
				<OffCanvasHeader setOpen={setOpenNewStyle}>
					<OffCanvasTitle id='NewStyle'>New Style</OffCanvasTitle>
				</OffCanvasHeader>
				<OffCanvasBody>
					<div className='row g-4'>
						<div className='col-12'>
							<FormGroup id='category' label='Danh mục' className='col-md-12'>
								<Select
									ariaLabel='Category'
									placeholder='Choose Category'
									list={selectCategory}
									onChange={handleChangeStyle}
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
									onChange={handleChangeStyle}
									value={dataform.subcategory}
									isValid={dataform.subcategory}
									isTouched={dataform.subcategory}
								/>
							</FormGroup>
						</div>
						<div className='col-12'>
							<FormGroup id='name' label='Tên tính năng'>
								<Input onChange={handleChangeStyle} value={dataform.name} />
							</FormGroup>
						</div>
					</div>
				</OffCanvasBody>
				<div className='row m-0'>
					<div className='col-12 p-3'>
						{isPostStyle === 'isPostStyle' && (
							<p style={{ fontSize: 14, color: 'red' }}> Tao moi that bai</p>
						)}
						<Button color='info' className='w-100' onClick={() => postStyle()}>
							Save
						</Button>
					</div>
				</div>
			</OffCanvas>

			<OffCanvas
				setOpen={setOpenEditStyle}
				isOpen={opentEditStyle}
				titleId='Edit Style'
				isBodyScroll
				placement='end'>
				<OffCanvasHeader setOpen={setOpenEditStyle}>
					<OffCanvasTitle id='EditStyle'>Edit Style</OffCanvasTitle>
				</OffCanvasHeader>
				<OffCanvasBody>
					<div className='row g-4'>
						<div className='col-12'>
							<FormGroup id='category' label='Danh mục' className='col-md-12'>
								<Select
									ariaLabel='Category'
									placeholder='Choose Category'
									list={selectCategory}
									onChange={handleChangeStyleEdit}
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
									onChange={handleChangeStyleEdit}
									value={dataformedit.subcategory}
									isValid={dataformedit.subcategory}
									isTouched={dataformedit.subcategory}
								/>
							</FormGroup>
						</div>
						<div className='col-12'>
							<FormGroup id='name' label='Tên tính năng'>
								<Input
									onChange={handleChangeStyleEdit}
									value={dataformedit.name}
								/>
							</FormGroup>
						</div>
					</div>
				</OffCanvasBody>
				<div className='row m-0'>
					<div className='col-12 p-3'>
						{isPutStyle === 'fail' && (
							<p style={{ fontSize: 14, color: 'red' }}> Edit that bai</p>
						)}

						<Button color='info' className='w-100' onClick={() => editStyle()}>
							Save
						</Button>
					</div>
				</div>
			</OffCanvas>

			<OffCanvas
				setOpen={setOpenDeleteStyle}
				isOpen={opentDeleteStyle}
				titleId='Edit Style'
				isBodyScroll
				placement='end'>
				<OffCanvasHeader setOpen={setOpenDeleteStyle}>
					<OffCanvasTitle id='EditStyle'>Delete Style</OffCanvasTitle>
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
						{isDeleteStyle === 'fail' && (
							<p style={{ fontSize: 14, color: 'red' }}> Delete thất bại</p>
						)}
						<Button color='waring' className='w-100' onClick={() => deleteStyle()}>
							Delete
						</Button>
					</div>
				</div>
			</OffCanvas>
		</>
	);
};

export default StyleComponent;
