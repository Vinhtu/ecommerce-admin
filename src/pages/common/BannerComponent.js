import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import classNames from 'classnames';
import moment from 'moment';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import storage from '../../firebase';
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
import { GetBanners, PostBanner, PutBanner, DeleteBanner } from '../../redux/actions/banners';

const selectShow = [
	{ value: 'True', text: 'True' },
	{ value: 'False', text: 'False' },
];
// eslint-disable-next-line react/prop-types
const BannerComponent = ({ isFluid }) => {
	const dispatch = useDispatch();
	const {
		// themeStatus,
		darkModeStatus,
	} = useDarkMode();
	const { bannerList, isPostBanner, isPutBanner, isDeleteBanner } = useSelector(
		(state) => state.banner,
	);

	const [opentNewBanner, setOpenNewBanner] = useState(false);
	const [opentEditBanner, setOpenEditBanner] = useState(false);
	const [opentDeleteBanner, setOpenDeleteBanner] = useState(false);
	const [thumbnailBanner, setThumbnailBanner] = React.useState();

	// const accountInfo = localStorage.getItem('accountinfo');
	const accessToken = localStorage.getItem('accessToken');
	// const refreshToken = localStorage.getItem('refreshToken');
	// const account_id = JSON.parse(accountInfo);
	const token = JSON.parse(accessToken);
	// const refreshtoken = JSON.parse(refreshToken);

	const banner = [
		{
			name: '',
			create_date: moment().add(0, 'days').format('YYYY-MM-DD'),
		},
	];
	// const addNewbanner = () => {
	// 	setUpcomingEventsEditOffcanvas(!upcomingEventsEditOffcanvas);
	// };
	useEffect(() => {
		dispatch(GetBanners());
	}, [dispatch, isPostBanner, isPutBanner, isDeleteBanner]);

	const [dataFormik, setDataFormik] = React.useState({
		title: '',
		content: '',
		thumbnail: '',
		show: '',
		create_date: moment().add(0, 'days').format('YYYY-MM-DD'),
	});

	const handleDataFormik = (e) => {
		setDataFormik({ ...dataFormik, [e.target.id]: e.target.value });
	};

	const [currentPage, setCurrentPage] = useState(1);
	const [perPage, setPerPage] = useState(PER_COUNT['5']);

	const { items, requestSort, getClassNamesFor } = useSortableData(
		bannerList ? bannerList.data.results : banner,
	);

	const postBanner = () => {
		dispatch(PostBanner(dataFormik, token));
		if (!(isPostBanner === 'success')) {
			setOpenNewBanner(false);
		}
	};

	const [dataform, setDataForm] = React.useState({
		_id: '',
		title: '',
		content: '',
		thumbnail: '',
		show: '',
		create_date: moment().add(0, 'days').format('YYYY-MM-DD'),
	});
	const openEditBanner = (item) => {
		setDataForm({
			...dataform,
			_id: item._id,
			title: item.title,
			content: item.content,
			thumbnail: item.thumbnail,
			show: item.show,
			create_date: item.create_date,
		});
		setOpenEditBanner(true);
	};
	const handleEditForm = (event) => {
		setDataForm({ ...dataform, [event.target.id]: event.target.value });
	};

	const openDeleteBanner = (item) => {
		setDataForm({
			...dataform,
			_id: item._id,
			title: item.title,
			content: item.content,
			thumbnail: item.thumbnail,
			show: item.show,
			create_date: item.create_date,
		});
		setOpenDeleteBanner(true);
	};

	const editBanner = () => {
		dispatch(PutBanner(dataform._id, dataform, token));
		if (!(isPutBanner === 'fail')) {
			setOpenEditBanner(false);
		}
	};
	const deleteBanner = () => {
		dispatch(DeleteBanner(dataform._id, token));
		if (!(isDeleteBanner === 'fail')) {
			setOpenDeleteBanner(false);
		}
		
	};

	const deleteThumbnailBanner = () => {
		setThumbnailBanner('');
	};

	const handleSetThumbnailBanner = (e) => {
		const image = e.target.files[0];
		const imageRef = ref(storage, `thumbnailcolors/${image.name}`);
		uploadBytes(imageRef, image).then((res) =>
			getDownloadURL(res.ref).then((url) => {
				setThumbnailBanner(url);
				setDataFormik({ ...dataFormik, thumbnail: url });
			}),
		);
	};
	return (
		<>
			<Card stretch={isFluid}>
				<CardHeader borderSize={1}>
					<CardLabel icon='Alarm' iconColor='info'>
						<CardTitle>
							Total ' {bannerList && bannerList.data.results.length} ' banners
						</CardTitle>
					</CardLabel>
					<CardActions>
						<Button
							color='info'
							icon='CloudDownload'
							isLight
							onClick={() => setOpenNewBanner(true)}>
							New banner
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
								<th>Title</th>
								<th>Thumbnail</th>
								<th>Content</th>
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
											<div>{item.title}</div>
										</div>
									</td>
									<td>
										<div>
											<div>
												<img
													src={item.thumbnail}
													style={{
														width: 80,
														height: 80,
														borderRadius: 4,
													}}
													alt='aljjt'
												/>
											</div>
										</div>
									</td>
									<td>
										<div>
											<div>{item.content}</div>
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
											onClick={() => openEditBanner(item)}>
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
											onClick={() => openDeleteBanner(item)}>
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
				setOpen={setOpenNewBanner}
				isOpen={opentNewBanner}
				titleId='New banner'
				isBodyScroll
				placement='end'>
				<OffCanvasHeader setOpen={setOpenNewBanner}>
					<OffCanvasTitle id='NewBanner'>New Banner</OffCanvasTitle>
				</OffCanvasHeader>
				<OffCanvasBody>
					<div className='row g-4'>
						<div className='col-12'>
							<FormGroup id='create_date' label='Create Date'>
								<Input
									onChange={handleDataFormik}
									value={dataFormik.create_date}
									type='date'
								/>
							</FormGroup>
						</div>
						<div className='mt-2 mb-2 col-12'>
							<div
								style={{
									width: '100%',
									height: 200,
									borderRadius: 10,
									display: 'flex',
									justifyContent: 'center',
									alignItems: 'center',
									borderWidth: thumbnailBanner ? 0 : 1,
									borderStyle: 'dashed',
									borderColor: '#E9E5E5',
									backgroundImage: `url(${thumbnailBanner}`,
									backgroundSize: 'cover',
									cursor: 'pointer',
									'&:hover': {
										opacity: 0.5,
									},
									position: 'relative',
								}}>
								{thumbnailBanner ? (
									<label htmlFor='img-input-description'>
										<h1 style={{ color: '#E9E5E5', cursor: 'pointer' }}>
											<Icon icon='edit' style={{ fontSize: 26 }} />
										</h1>
									</label>
								) : (
									<label htmlFor='img-input-description'>
										<h1 style={{ color: '#E9E5E5', cursor: 'pointer' }}>+</h1>
									</label>
								)}

								<input
									id='img-input-description'
									style={{ display: 'none' }}
									type='file'
									autoComplete='photo'
									onChange={handleSetThumbnailBanner}
								/>
								{thumbnailBanner && (
									<div
										onClick={() => deleteThumbnailBanner()}
										onKeyDown={() => deleteThumbnailBanner()}
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
						<div className='col-12'>
							<FormGroup id='title' label='Title'>
								<Input onChange={handleDataFormik} value={dataFormik.title} />
							</FormGroup>
						</div>
						<div className='col-12'>
							<FormGroup id='content' label='Content'>
								<Input onChange={handleDataFormik} value={dataFormik.content} />
							</FormGroup>
						</div>

						<div className='col-12'>
							<FormGroup id='show' label='Show' className='col-md-12'>
								<Select
									ariaLabel='Show'
									placeholder='Choose Show'
									list={selectShow}
									onChange={handleDataFormik}
									value={dataFormik.show}
									isValid={dataFormik.show}
									isTouched={dataFormik.show}
								/>
							</FormGroup>
						</div>
					</div>
				</OffCanvasBody>
				<div className='row m-0'>
					<div className='col-12 p-3'>
						{isPostBanner === 'fail' && (
							<p style={{ color: 'red' }}>Them khong thanh cong</p>
						)}
						<Button color='info' className='w-100' onClick={() => postBanner()}>
							Save
						</Button>
					</div>
				</div>
			</OffCanvas>

			<OffCanvas
				setOpen={setOpenEditBanner}
				isOpen={opentEditBanner}
				titleId='Edit Banner'
				isBodyScroll
				placement='end'>
				<OffCanvasHeader setOpen={setOpenEditBanner}>
					<OffCanvasTitle id='EditBanner'>Edit Banner</OffCanvasTitle>
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
							<FormGroup id='title' label='Title'>
								<Input onChange={handleEditForm} value={dataform.title} />
							</FormGroup>
						</div>
						<div className='col-12'>
							<FormGroup id='content' label='Content'>
								<Input onChange={handleEditForm} value={dataform.content} />
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
						{isPutBanner === 'fail' && (
							<p style={{ color: 'red' }}>Edit khong thanh cong</p>
						)}
						<Button color='info' className='w-100' onClick={() => editBanner()}>
							Save
						</Button>
					</div>
				</div>
			</OffCanvas>

			<OffCanvas
				setOpen={setOpenDeleteBanner}
				isOpen={opentDeleteBanner}
				titleId='Edit Banner'
				isBodyScroll
				placement='end'>
				<OffCanvasHeader setOpen={setOpenDeleteBanner}>
					<OffCanvasTitle id='EditBanner'>Delete Banner</OffCanvasTitle>
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
							<FormGroup id='title' label='Title'>
								<Input onChange={handleEditForm} value={dataform.title} />
							</FormGroup>
						</div>
						<div className='col-12'>
							<FormGroup id='content' label='Content'>
								<Input onChange={handleEditForm} value={dataform.content} />
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
						{isDeleteBanner === 'fail' && (
							<p style={{ color: 'red' }}>Delete khong thanh cong</p>
						)}
						<Button color='waring' className='w-100' onClick={() => deleteBanner()}>
							Delete
						</Button>
					</div>
				</div>
			</OffCanvas>
		</>
	);
};

export default BannerComponent;
