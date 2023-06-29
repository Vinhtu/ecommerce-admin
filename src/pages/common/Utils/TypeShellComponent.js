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
	GetTypeShells,
	PostTypeShell,
	PutTypeShell,
	DeleteTypeShell,
} from '../../../redux/actions/utils/typeshells';

import Select from '../../../components/bootstrap/forms/Select';
import { GetCategorys } from '../../../redux/actions/categorys';

// eslint-disable-next-line react/prop-types
const TypeShellComponent = ({ isFluid }) => {
	const dispatch = useDispatch();
	const {
		// themeStatus,
		darkModeStatus,
	} = useDarkMode();
	const { TypeShellList, isPutTypeShell, isPostTypeShell, isDeleteTypeShell } = useSelector(
		(state) => state.typeshell,
	);
	const {
		categoryList,
		// , isPutCategory, isPostCategory, isDeleteCategory
	} = useSelector((state) => state.category);
	const [opentNewTypeShell, setOpenNewTypeShell] = useState(false);
	const [opentEditTypeShell, setOpenEditTypeShell] = useState(false);
	const [opentDeleteTypeShell, setOpenDeleteTypeShell] = useState(false);

	// const accountInfo = localStorage.getItem('accountinfo');
	const accessToken = localStorage.getItem('accessToken');
	// const refreshToken = localStorage.getItem('refreshToken');
	// const account_id = JSON.parse(accountInfo);
	const token = JSON.parse(accessToken);
	// const refreshtoken = JSON.parse(refreshToken);

	const TypeShell = [
		{
			name: '',
			create_date: moment().add(0, 'days').format('YYYY-MM-DD'),
		},
	];

	useEffect(() => {
		dispatch(GetCategorys());
	}, [dispatch]);

	useEffect(() => {
		dispatch(GetTypeShells());
	}, [dispatch]);

	useEffect(() => {
		dispatch(GetTypeShells());
	}, [dispatch, isPutTypeShell, isPostTypeShell, isDeleteTypeShell]);

	const [currentPage, setCurrentPage] = useState(1);
	const [perPage, setPerPage] = useState(PER_COUNT['5']);

	const { items } = useSortableData(TypeShellList ? TypeShellList.data.results : TypeShell);

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
	const openEditTypeShell = (item) => {
		setDataFormEdit({
			...dataformedit,
			_id: item._id,
			name: item.name,
			category: item.category,
			subcategory: item.subcategory,
			create_date: item.create_date,
		});

		setOpenEditTypeShell(true);
	};

	const openDeleteTypeShell = (item) => {
		setDataFormEdit({
			...dataformedit,
			_id: item._id,
			name: item.name,
			category: item.category,
			subcategory: item.subcategory,
			create_date: item.create_date,
		});

		setOpenDeleteTypeShell(true);
	};

	const deleteTypeShell = () => {
		dispatch(DeleteTypeShell(dataformedit._id, token));
	};

	const handleChangeTypeShell = (e) => {
		setDataForm({ ...dataform, [e.target.id]: e.target.value });
	};

	const handleChangeTypeShellEdit = (e) => {
		setDataFormEdit({ ...dataformedit, [e.target.id]: e.target.value });
	};

	const postTypeShell = () => {
		dispatch(PostTypeShell(dataform, token));
	};
	useEffect(() => {
		if (isPostTypeShell === 'success') {
			setOpenNewTypeShell(false);
		}
	}, [isPostTypeShell]);

	const editTypeShell = () => {
		dispatch(PutTypeShell(dataformedit._id, dataformedit, token));
	};

	useEffect(() => {
		if (isPutTypeShell === 'success') {
			setOpenEditTypeShell(false);
		}
	}, [isPutTypeShell]);
	useEffect(() => {
		if (isDeleteTypeShell === 'success') {
			setOpenDeleteTypeShell(false);
		}
	}, [isDeleteTypeShell]);

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
							Total ' {TypeShellList && TypeShellList.data.results.length} ' TypeShells
						</CardTitle>
					</CardLabel>
					<CardActions>
						<Button
							color='info'
							icon='CloudDownload'
							isLight
							onClick={() => setOpenNewTypeShell(true)}>
							New TypeShell
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
											onClick={() => openEditTypeShell(item)}>
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
											onClick={() => openDeleteTypeShell(item)}>
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
				setOpen={setOpenNewTypeShell}
				isOpen={opentNewTypeShell}
				titleId='New TypeShell'
				isBodyScroll
				placement='end'
				// className='offcanvas-newTypeShell'
			>
				<OffCanvasHeader setOpen={setOpenNewTypeShell}>
					<OffCanvasTitle id='NewTypeShell'>New TypeShell</OffCanvasTitle>
				</OffCanvasHeader>
				<OffCanvasBody>
					<div className='row g-4'>
						<div className='col-12'>
							<FormGroup id='category' label='Danh mục' className='col-md-12'>
								<Select
									ariaLabel='Category'
									placeholder='Choose Category'
									list={selectCategory}
									onChange={handleChangeTypeShell}
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
									onChange={handleChangeTypeShell}
									value={dataform.subcategory}
									isValid={dataform.subcategory}
									isTouched={dataform.subcategory}
								/>
							</FormGroup>
						</div>
						<div className='col-12'>
							<FormGroup id='name' label='Tên tính năng'>
								<Input onChange={handleChangeTypeShell} value={dataform.name} />
							</FormGroup>
						</div>
					</div>
				</OffCanvasBody>
				<div className='row m-0'>
					<div className='col-12 p-3'>
						{isPostTypeShell === 'isPostTypeShell' && (
							<p style={{ fontSize: 14, color: 'red' }}> Tao moi that bai</p>
						)}
						<Button color='info' className='w-100' onClick={() => postTypeShell()}>
							Save
						</Button>
					</div>
				</div>
			</OffCanvas>

			<OffCanvas
				setOpen={setOpenEditTypeShell}
				isOpen={opentEditTypeShell}
				titleId='Edit TypeShell'
				isBodyScroll
				placement='end'>
				<OffCanvasHeader setOpen={setOpenEditTypeShell}>
					<OffCanvasTitle id='EditTypeShell'>Edit TypeShell</OffCanvasTitle>
				</OffCanvasHeader>
				<OffCanvasBody>
					<div className='row g-4'>
						<div className='col-12'>
							<FormGroup id='category' label='Danh mục' className='col-md-12'>
								<Select
									ariaLabel='Category'
									placeholder='Choose Category'
									list={selectCategory}
									onChange={handleChangeTypeShellEdit}
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
									onChange={handleChangeTypeShellEdit}
									value={dataformedit.subcategory}
									isValid={dataformedit.subcategory}
									isTouched={dataformedit.subcategory}
								/>
							</FormGroup>
						</div>
						<div className='col-12'>
							<FormGroup id='name' label='Tên tính năng'>
								<Input
									onChange={handleChangeTypeShellEdit}
									value={dataformedit.name}
								/>
							</FormGroup>
						</div>
					</div>
				</OffCanvasBody>
				<div className='row m-0'>
					<div className='col-12 p-3'>
						{isPutTypeShell === 'fail' && (
							<p style={{ fontSize: 14, color: 'red' }}> Edit that bai</p>
						)}

						<Button color='info' className='w-100' onClick={() => editTypeShell()}>
							Save
						</Button>
					</div>
				</div>
			</OffCanvas>

			<OffCanvas
				setOpen={setOpenDeleteTypeShell}
				isOpen={opentDeleteTypeShell}
				titleId='Edit TypeShell'
				isBodyScroll
				placement='end'>
				<OffCanvasHeader setOpen={setOpenDeleteTypeShell}>
					<OffCanvasTitle id='EditTypeShell'>Delete TypeShell</OffCanvasTitle>
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
						{isDeleteTypeShell === 'fail' && (
							<p style={{ fontSize: 14, color: 'red' }}> Delete thất bại</p>
						)}
						<Button color='waring' className='w-100' onClick={() => deleteTypeShell()}>
							Delete
						</Button>
					</div>
				</div>
			</OffCanvas>
		</>
	);
};

export default TypeShellComponent;
