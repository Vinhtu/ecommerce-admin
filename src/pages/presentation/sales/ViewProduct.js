import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import { useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import OffCanvas, {
	OffCanvasBody,
	OffCanvasHeader,
	OffCanvasTitle,
} from '../../../components/bootstrap/OffCanvas';
import Page from '../../../layout/Page/Page';
import PageWrapper from '../../../layout/PageWrapper/PageWrapper';
import SubHeader, {
	SubHeaderLeft,
	SubHeaderRight,
	SubheaderSeparator,
} from '../../../layout/SubHeader/SubHeader';
import Button from '../../../components/bootstrap/Button';
import { demoPages } from '../../../menu';
// import tableData from '../../../common/data/dummyProductData';
import Avatar from '../../../components/Avatar';
// import USERS from '../../../common/data/userDummyData';
import Card, {
	CardBody,
	CardFooter,
	CardFooterLeft,
	CardFooterRight,
	CardHeader,
	CardLabel,
	CardSubTitle,
	CardTitle,
} from '../../../components/bootstrap/Card';
import Icon from '../../../components/icon/Icon';
// import { priceFormat } from '../../../helpers/helpers';
// import Chart from '../../../components/extras/Chart';
// import PlaceholderImage from '../../../components/extras/PlaceholderImage';
import Input from '../../../components/bootstrap/forms/Input';
import FormGroup from '../../../components/bootstrap/forms/FormGroup';
import showNotification from '../../../components/extras/showNotification';
import useDarkMode from '../../../hooks/useDarkMode';
import { DeleteProduct, GetProduct } from '../../../redux/actions/products';
import { DeleteComment,
	//  PutComment,
	//  PutCommentBodys,
	//  PutCommentBody
	 } from '../../../redux/actions/comments';

const validate = (values) => {
	const errors = {};

	if (!values.name) {
		errors.name = 'Required';
	} else if (values.name.length < 3) {
		errors.name = 'Must be 3 characters or more';
	} else if (values.name.length > 20) {
		errors.name = 'Must be 20 characters or less';
	}

	if (!values.price) {
		errors.price = 'Required';
	} else if (values.price < 0) {
		errors.price = 'Price should not be 0';
	}

	if (!values.stock) {
		errors.stock = 'Required';
	}

	if (!values.category) {
		errors.category = 'Required';
	} else if (values.category.length < 3) {
		errors.category = 'Must be 3 characters or more';
	} else if (values.category.length > 20) {
		errors.category = 'Must be 20 characters or less';
	}

	return errors;
};

const ViewProduct = () => {
	const location = useLocation();

	const { darkModeStatus } = useDarkMode();

	const navigate = useNavigate();
	const dispatch = useDispatch();

	const { productDetail } = useSelector((state) => state.product);
	const {  isPutComment, isDeleteComment} = useSelector((state) => state.comment);


	console.log(productDetail, 'productDetail');
	useEffect(() => {
		dispatch(GetProduct(location.state.item._id));
	}, [dispatch, location.state.item._id, isPutComment, isDeleteComment]);

	// const accountInfo = localStorage.getItem('accountinfo');
	const accessToken = localStorage.getItem('accessToken');
	// const refreshToken = localStorage.getItem('refreshToken');
	// const account_id = JSON.parse(accountInfo);
	const token = JSON.parse(accessToken);
	// const refreshtoken = JSON.parse(refreshToken);

	// eslint-disable-next-line no-unused-vars
	const TABS = {
		SUMMARY: 'Summary',
		COMMENTS: 'Comments',
		EDIT: 'Edit',
	};
	const [activeTab, setActiveTab] = useState(TABS.SUMMARY);

	const formik = useFormik({
		initialValues: {
			_id: productDetail?._id,
			name: productDetail?.name,
			address: productDetail?.address,
			phone: productDetail?.phone,
			level: productDetail?.level,
			create_date: productDetail?.create_date,
			status: productDetail?.status,
		},
		validate,
		// eslint-disable-next-line no-unused-vars
		onSubmit: (values) => {
			showNotification(
				<span className='d-flex align-items-center'>
					<Icon icon='Info' size='lg' className='me-1' />
					<span>Updated Successfully</span>
				</span>,
				'Product has been updated successfully',
			);
		},
	});
	const putAffilateshop = () => {
		navigate(`../admin/affilateshop`);
	};

	const deleteAffilateshop = () => {
		dispatch(DeleteProduct(formik.values._id));
		navigate(`../admin/product/shop`);
	};

	const toEditProduct = (item) => {
		navigate(`../${demoPages.sales.subMenu.editproduct.path}/${item._id}`, { state: { item } });
	};

	console.log(productDetail, 'item');
	const [dataShowModel, setDataShowModel] = React.useState();
	const [upcomingEventsInfoOffcanvas, setUpcomingEventsInfoOffcanvas] = useState(false);
	const handleUpcomingDetails = (e) => {
		setDataShowModel(e);
		setUpcomingEventsInfoOffcanvas(!upcomingEventsInfoOffcanvas);
	};

	const [reply, setReply] = React.useState(false);

	console.log(dataShowModel, 'data ');

	const [bodyComment, setBodyComment] = React.useState({
		body: '',
		id: '',
	});
	const [opentEditComment, setOpenEditComment] = useState(false);
	const [opentDeleteComment, setOpenDeleteComment] = useState(false);

	const editComment = (body, id) => {
		setBodyComment({ ...bodyComment, body, id });
		setOpenEditComment(true);
	};
	const toEditComment = () => {
		console.log(bodyComment.id, bodyComment.body, token, 'tokennnnn')
		// dispatch( PutCommentBodys(bodyComment.id, bodyComment.body, token));
		// setOpenEditComment(false);
	};
	const deleteComment = (body, id) => {
		setBodyComment({ ...bodyComment, body, id });

		setOpenDeleteComment(true);
	};
	const toDeleteComment = () => {
		dispatch(DeleteComment(bodyComment.id, token));
		setOpenDeleteComment(false);
	};
	console.log(bodyComment, 'body comment');
	
	return (
		<PageWrapper title={demoPages.sales.subMenu.product.text}>
			<SubHeader>
				<SubHeaderLeft>
					<Button color='info' isLink icon='ArrowBack' onClick={() => navigate(-1)}>
						Back to List
					</Button>
					<SubheaderSeparator />
					{/* <Avatar
						srcSet={USERS.RYAN.srcSet}
						src={USERS.RYAN.src}
						size={32}
						color={USERS.RYAN.color}
					/> */}
					{/* <span>
						<strong>{`${USERS.RYAN.name} ${USERS.RYAN.surname}`}</strong>
					</span> */}
					<span className='text-muted'>Owner</span>
				</SubHeaderLeft>
				<SubHeaderRight>
					<span className='text-muted fst-italic me-2'>Last update:</span>
					<span className='fw-bold'>13 hours ago</span>
				</SubHeaderRight>
			</SubHeader>
			<Page>
				<div className='display-4 fw-bold py-2'>{productDetail?.name}</div>
				<div className='display-4 py-1' style={{ fontSize: 14 }}>
					Code: {productDetail?.code}
				</div>
				<div className='row h-100'>
					<div className='col-lg-4'>
						<Card stretch>
							<CardBody isScrollable>
								<div className='row g-3'>
									<div className='col-12'>
										<img
											src={productDetail?.thumbnail}
											alt=''
											width='100%'
											className='p-5'
											style={{ borderRadius: 50 }}
										/>
									</div>
									<div className='col-12'>
										<Button
											icon='Summarize'
											color='info'
											className='w-100 p-3'
											isLight={activeTab !== TABS.SUMMARY}
											onClick={() => setActiveTab(TABS.SUMMARY)}>
											{TABS.SUMMARY}
										</Button>
									</div>
									<div className='col-12'>
										<Button
											icon='Chat'
											color='info'
											className='w-100 p-3'
											isLight={activeTab !== TABS.COMMENTS}
											onClick={() => setActiveTab(TABS.COMMENTS)}>
											{TABS.COMMENTS}
										</Button>
									</div>
									<div className='col-12'>
										<Button
											icon='Edit'
											color='success'
											className='w-100 p-3'
											isLight={activeTab !== TABS.EDIT}
											onClick={() => toEditProduct(productDetail)}>
											{TABS.EDIT}
										</Button>
									</div>
								</div>
							</CardBody>
							<CardFooter>
								<CardFooterLeft className='w-100'>
									<Button
										icon='Delete'
										color='danger'
										isLight
										className='w-100 p-3'
										onClick={() => deleteAffilateshop()}>
										Delete
									</Button>
								</CardFooterLeft>
							</CardFooter>
						</Card>
					</div>
					<div className='col-lg-8'>
						<Card
							stretch
							className='overflow-hidden'
							tag='form'
							noValidate
							onSubmit={formik.handleSubmit}>
							{activeTab === TABS.SUMMARY && (
								<>
									<CardHeader>
										<CardLabel icon='Summarize' iconColor='info'>
											<CardTitle>Category</CardTitle>
											<CardSubTitle>{productDetail?.category}</CardSubTitle>
										</CardLabel>
									</CardHeader>
									<CardBody isScrollable>
										<div className='row'>
											<div className='col-lg-6'>
												<Card
													stretch
													shadow='sm'
													className={`bg-l${
														darkModeStatus ? 'o25' : '25'
													}-primary rounded-2`}>
													<CardHeader className='bg-transparent'>
														<CardLabel>
															<CardTitle>Total amount</CardTitle>
														</CardLabel>
													</CardHeader>
													<CardBody className='py-0'>
														<div className='d-flex align-items-center pb-3'>
															<div className='flex-shrink-0'>
																<Icon
																	icon='ConfirmationNumber'
																	size='4x'
																	color='primary'
																/>
															</div>
															<div className='flex-grow-1 ms-3'>
																<div className='fw-bold fs-3 mb-0'>
																	{productDetail?.t_amount}
																</div>
															</div>
														</div>
													</CardBody>
												</Card>
											</div>
											<div className='col-lg-6'>
												<Card
													stretch
													shadow='sm'
													className={`bg-l${
														darkModeStatus ? 'o25' : '25'
													}-warning bg-l${
														darkModeStatus ? 'o50' : '10'
													}-warning-hover transition-base rounded-2`}>
													<CardHeader className='bg-transparent'>
														<CardLabel>
															<CardTitle tag='h4' className='h5'>
																Sales
															</CardTitle>
														</CardLabel>
													</CardHeader>
													<CardBody className='py-0'>
														<div className='d-flex align-items-center pb-3'>
															<div className='flex-shrink-0'>
																<Icon
																	icon='ConfirmationNumber'
																	size='4x'
																	color='primary'
																/>
															</div>
															<div className='flex-grow-1 ms-3'>
																<div className='fw-bold fs-3 mb-0'>
																	{productDetail?.amount_sale}
																</div>
															</div>
														</div>
													</CardBody>
												</Card>
											</div>
											<div className='col-lg-6'>
												<Card
													stretch
													shadow='sm'
													className={`bg-l${
														darkModeStatus ? 'o25' : '25'
													}-success rounded-2`}>
													<CardHeader className='bg-transparent'>
														<CardLabel>
															<CardTitle>Affilate shop</CardTitle>
														</CardLabel>
													</CardHeader>
													<CardBody>
														<div className='d-flex align-items-center pb-3'>
															<div className='flex-shrink-0'>
																<Icon
																	icon='Category'
																	size='4x'
																	color='success'
																/>
															</div>
															<div className='flex-grow-1 ms-3'>
																<div className='fw-bold fs-3 mb-0'>
																	{
																		productDetail?.affilateshop
																			.name
																	}
																</div>
																<div className='text-muted'>
																	<b>Address: </b>{' '}
																	{
																		productDetail?.affilateshop
																			.cityAddress
																	}
																</div>
															</div>
														</div>
													</CardBody>
												</Card>
											</div>
											<div className='col-lg-6'>
												<Card
													stretch
													shadow='sm'
													className={`bg-l${
														darkModeStatus ? 'o25' : '25'
													}-info rounded-2`}>
													<CardHeader className='bg-transparent'>
														<CardLabel>
															<CardTitle>Rate</CardTitle>
														</CardLabel>
													</CardHeader>
													<CardBody>
														<div className='d-flex align-items-center pb-3'>
															<div className='flex-shrink-0'>
																<Icon
																	icon='Extension'
																	size='4x'
																	color='info'
																/>
															</div>
															<div className='flex-grow-1 ms-3'>
																<div className='fw-bold fs-3 mb-0'>
																	{/* {productDetail?.rate} */}
																	5 star
																</div>
															</div>
														</div>
													</CardBody>
												</Card>
											</div>
											<div className='col-lg-6'>
												<Card
													stretch
													shadow='sm'
													className={`bg-l${
														darkModeStatus ? 'o25' : '25'
													}-success rounded-2`}>
													<CardHeader className='bg-transparent'>
														<CardLabel>
															<CardTitle>Create date</CardTitle>
														</CardLabel>
													</CardHeader>
													<CardBody>
														<div className='d-flex align-items-center pb-3'>
															<div className='flex-shrink-0'>
																<Icon
																	icon='Category'
																	size='4x'
																	color='success'
																/>
															</div>
															<div className='flex-grow-1 ms-3'>
																<div className='fw-bold fs-3 mb-0'>
																	{productDetail?.create_date}
																</div>
																{/* <div className='text-muted'>
																	<b>Address: </b>{' '}
																	{
																		productDetail?
																			.affilateshop
																			.cityAddress
																	}
																</div> */}
															</div>
														</div>
													</CardBody>
												</Card>
											</div>
										</div>
									</CardBody>
								</>
							)}
							{activeTab === TABS.COMMENTS && (
								<>
									<CardHeader>
										<CardLabel icon='Chat' iconColor='info'>
											<CardTitle>Comments</CardTitle>
											<CardSubTitle>
												{productDetail?.comment.length}
											</CardSubTitle>
										</CardLabel>
									</CardHeader>
									<CardBody isScrollable>
										<div className='row g-4'>
											{productDetail?.comment?.map((item) => {
												console.log(item, 'item');
												return (
													<div className='col-12 d-flex'>
														<div className='flex-shrink-0'>
															<Avatar
																src={item.account?.avatar}
																srcSet={item.account?.avatar}
																size={64}
															/>
														</div>
														<div className='flex-grow-1 ms-3 d-flex justify-content-between align-items-center'>
															<figure
																className='mb-0'
																style={{ width: '100%' }}>
																<div
																	style={{
																		display: 'flex',
																		justifyContent:
																			'space-between',
																		alignItems: 'center',
																	}}>
																	<p style={{ marginBottom: 0 }}>
																		Number like: ({item.n_like})
																		-{item.create_date}
																	</p>
																	<p
																		style={{
																			display: 'flex',
																			alignItems: 'center',
																		}}>
																		{item.likecomment.map(
																			(like, idx) => {
																				if (idx < 2) {
																					return (
																						<Avatar
																							src={
																								like
																									.account
																									?.avatar
																							}
																							srcSet={
																								like
																									.account
																									?.avatar
																							}
																							size={
																								32
																							}
																							style={{
																								cursor: 'pointer',
																							}}
																							onClick={() =>
																								handleUpcomingDetails(
																									item.likecomment,
																								)
																							}
																						/>
																					);
																				}

																				if (idx === 2) {
																					return (
																						<div
																							style={{
																								position:
																									'relative',
																							}}>
																							<Avatar
																								src={
																									like
																										.account
																										?.avatar
																								}
																								srcSet={
																									like
																										.account
																										?.avatar
																								}
																								size={
																									32
																								}
																								style={{
																									cursor: 'pointer',
																								}}
																							/>
																							{item
																								.likecomment
																								?.length >
																								3 && (
																								<div>
																									<div
																										style={{
																											position:
																												'absolute',
																											height: 32,
																											width: 32,
																											backgroundColor:
																												'white',
																											display:
																												'flex',
																											justifyContent:
																												'center',
																											alignItems:
																												'center',
																											top: 0,
																											opacity: 0.5,
																											borderRadius: 10,
																											zIndex: 9,
																											cursor: 'pointer',
																										}}
																									/>

																									<div
																										style={{
																											position:
																												'absolute',
																											height: 32,
																											width: 32,

																											display:
																												'flex',
																											justifyContent:
																												'center',
																											alignItems:
																												'center',
																											top: 0,
																											zIndex: 10,
																											cursor: 'pointer',
																										}}
																										onClick={() =>
																											handleUpcomingDetails(
																												item.likecomment,
																											)
																										}
																										onKeyDown={() =>
																											handleUpcomingDetails(
																												item.likecomment,
																											)
																										}
																										role='button'
																										tabIndex='0'>
																										+
																										{parseInt(
																											item
																												.likecomment
																												.length,
																											10,
																										) -
																											3}
																									</div>
																								</div>
																							)}
																						</div>
																					);
																				}
																				return null;
																			},
																		)}
																	</p>
																</div>
																<blockquote
																	className='blockquote'
																	style={{
																		display: 'flex',
																		justifyContent:
																			'space-between',
																	}}>
																	<p>{item.body}</p>
																	<div
																		style={{ display: 'flex' }}>
																		<Button
																			color='info'
																			isLight
																			style={{
																				marginRight: 8,
																			}}
																			onClick={() =>
																				editComment(
																					item.body,
																					item._id,
																				)
																			}>
																			Sua
																		</Button>
																		<Button
																			color='info'
																			isLight
																			onClick={() =>
																				deleteComment(
																					item.body,
																					item._id,
																				)
																			}>
																			Xoa
																		</Button>
																	</div>
																</blockquote>
																<figcaption className='blockquote-footer mb-0'>
																	{/* {USERS.GRACE.name} in{' '} */}
																	<div
																		style={{
																			display: 'flex',
																			justifyContent:
																				'space-between',
																			alignItems: 'center',
																		}}>
																		<cite
																			title='Company'
																			style={{
																				cursor: 'pointer',
																			}}
																			onClick={() =>
																				setReply(!reply)
																			}
																			onKeyDown={() =>
																				setReply(!reply)
																			}
																			role='button'
																			tabIndex='0'>
																			Reply (
																			{
																				item.replycomment
																					?.length
																			}
																			)
																		</cite>
																		<p
																			style={{
																				display: 'flex',
																				alignItems:
																					'center',
																			}}>
																			{item.replycomment?.map(
																				(
																					itemReply,
																					idx,
																				) => {
																					if (idx < 2) {
																						return (
																							<Avatar
																								src={
																									itemReply
																										.account
																										?.avatar
																								}
																								srcSet={
																									itemReply
																										.account
																										?.avatar
																								}
																								size={
																									32
																								}
																								style={{
																									cursor: 'pointer',
																								}}
																								onClick={() =>
																									handleUpcomingDetails(
																										item.replycomment,
																									)
																								}
																							/>
																						);
																					}

																					if (idx === 2) {
																						return (
																							<div
																								style={{
																									position:
																										'relative',
																								}}>
																								<Avatar
																									src={
																										itemReply
																											.account
																											?.avatar
																									}
																									srcSet={
																										itemReply
																											.account
																											?.avatar
																									}
																									size={
																										32
																									}
																									style={{
																										cursor: 'pointer',
																									}}
																									onClick={() =>
																										handleUpcomingDetails(
																											item.replycomment,
																										)
																									}
																								/>
																								{item
																									.replycomment
																									?.length >
																									3 && (
																									<div>
																										<div
																											style={{
																												position:
																													'absolute',
																												height: 32,
																												width: 32,
																												backgroundColor:
																													'white',
																												display:
																													'flex',
																												justifyContent:
																													'center',
																												alignItems:
																													'center',
																												top: 0,
																												opacity: 0.5,
																												borderRadius: 10,
																												zIndex: 9,
																												cursor: 'pointer',
																											}}
																										/>

																										<div
																											style={{
																												position:
																													'absolute',
																												height: 32,
																												width: 32,

																												display:
																													'flex',
																												justifyContent:
																													'center',
																												alignItems:
																													'center',
																												top: 0,
																												zIndex: 10,
																												cursor: 'pointer',
																											}}
																											onClick={() =>
																												handleUpcomingDetails(
																													item.replycomment,
																												)
																											}
																											onKeyDown={() =>
																												handleUpcomingDetails(
																													item.replycomment,
																												)
																											}
																											role='button'
																											tabIndex='0'>
																											+
																											{parseInt(
																												item
																													.replycomment
																													.length,
																												10,
																											) -
																												3}
																										</div>
																									</div>
																								)}
																							</div>
																						);
																					}
																					return null;
																				},
																			)}
																		</p>
																	</div>
																	{reply &&
																		item.replycomment?.map(
																			(itemReply) => {
																				return (
																					<div className='col-12 d-flex'>
																						<div className='flex-shrink-0'>
																							<Avatar
																								src={
																									itemReply
																										.account
																										?.avatar
																								}
																								srcSet={
																									itemReply
																										.account
																										?.avatar
																								}
																								size={
																									64
																								}
																							/>
																						</div>
																						<div className='flex-grow-1 ms-3 d-flex justify-content-between align-items-center'>
																							<figure
																								className='mb-0'
																								style={{
																									width: '100%',
																								}}>
																								<div
																									style={{
																										display:
																											'flex',
																										justifyContent:
																											'space-between',
																										alignItems:
																											'center',
																									}}>
																									<p
																										style={{
																											marginBottom: 0,
																										}}>
																										{
																											itemReply.create_date
																										}
																									</p>
																									<p
																										style={{
																											display:
																												'flex',
																											alignItems:
																												'center',
																										}}>
																										{/* {item.likecomment.map(
																			(like, idx) => {
																				if (idx < 2) {
																					return (
																						<Avatar
																							src={
																								like
																									.account
																									?.avatar
																							}
																							srcSet={
																								like
																									.account
																									?.avatar
																							}
																							size={
																								32
																							}
																							style={{
																								cursor: 'pointer',
																							}}
																							onClick={() =>
																								handleUpcomingDetails(
																									item.likecomment,
																								)
																							}
																						/>
																					);
																				}

																				if (idx === 2) {
																					return (
																						<div
																							style={{
																								position:
																									'relative',
																							}}>
																							<Avatar
																								src={
																									like
																										.account
																										?.avatar
																								}
																								srcSet={
																									like
																										.account
																										?.avatar
																								}
																								size={
																									32
																								}
																								style={{
																									cursor: 'pointer',
																								}}
																							/>
																							<div
																								style={{
																									position:
																										'absolute',
																									height: 32,
																									width: 32,
																									backgroundColor:
																										'white',
																									display:
																										'flex',
																									justifyContent:
																										'center',
																									alignItems:
																										'center',
																									top: 0,
																									opacity: 0.5,
																									borderRadius: 10,
																									zIndex: 9,
																									cursor: 'pointer',
																								}}
																							/>

																							<div
																								style={{
																									position:
																										'absolute',
																									height: 32,
																									width: 32,

																									display:
																										'flex',
																									justifyContent:
																										'center',
																									alignItems:
																										'center',
																									top: 0,
																									zIndex: 10,
																									cursor: 'pointer',
																								}}
																								onClick={() =>
																									handleUpcomingDetails(
																										item.likecomment,
																									)
																								}
																								onKeyDown={() =>
																									handleUpcomingDetails(
																										item.likecomment,
																									)
																								}
																								role='button'
																								tabIndex='0'>
																								+
																								{parseInt(
																									item
																										.likecomment
																										.length,
																									10,
																								) -
																									3}
																							</div>
																						</div>
																					);
																				}
																				return null;
																			},
																		)} */}
																									</p>
																								</div>
																								<blockquote className='blockquote'>
																									<p>
																										{
																											itemReply.body
																										}
																									</p>
																								</blockquote>
																							</figure>
																						</div>
																					</div>
																				);
																			},
																		)}
																</figcaption>
															</figure>
														</div>
													</div>
												);
											})}
										</div>
									</CardBody>
								</>
							)}
							{activeTab === TABS.EDIT && (
								<>
									<CardHeader>
										<CardLabel icon='Edit' iconColor='success'>
											<CardTitle>Edit</CardTitle>
											<CardSubTitle>Product Details</CardSubTitle>
										</CardLabel>
									</CardHeader>
									<CardBody isScrollable>
										{/* <Card>
											<CardHeader>
												<CardLabel icon='Photo' iconColor='info'>
													<CardTitle>Product Image</CardTitle>
												</CardLabel>
											</CardHeader>
											<CardBody>
												<div className='row'>
													<div className='col-lg-4'>
														{editItem?.image ? (
															<img
																src={editItem.image}
																alt=''
																width={128}
																height={128}
																className='mx-auto d-block img-fluid mb-3'
															/>
														) : (
															<PlaceholderImage
																width={128}
																height={128}
																className='mx-auto d-block img-fluid mb-3 rounded'
															/>
														)}
													</div>
													<div className='col-lg-8'>
														<div className='row g-4'>
															<div className='col-12'>
																<Input
																	type='file'
																	autoComplete='photo'
																/>
															</div>
															<div className='col-12'>
																<Button
																	color='dark'
																	isLight
																	icon='Delete'
																	onClick={() => {
																		setEditItem({
																			...editItem,
																			image: null,
																		});
																	}}>
																	Delete Image
																</Button>
															</div>
														</div>
													</div>
												</div>
											</CardBody>
										</Card> */}

										<Card>
											<CardHeader>
												<CardLabel icon='Description' iconColor='success'>
													<CardTitle>Product Details</CardTitle>
												</CardLabel>
											</CardHeader>
											<CardBody>
												<div className='row g-4'>
													<div className='col-12'>
														<FormGroup
															id='name'
															label='Name'
															isFloating>
															<Input
																placeholder='Name'
																onChange={formik.handleChange}
																onBlur={formik.handleBlur}
																value={formik.values.name}
																isValid={formik.isValid}
																isTouched={formik.touched.name}
																invalidFeedback={formik.errors.name}
																validFeedback='Looks good!'
															/>
														</FormGroup>
													</div>
													<div className='col-12'>
														<FormGroup
															id='address'
															label='Address'
															isFloating>
															<Input
																placeholder='Price'
																onChange={formik.handleChange}
																onBlur={formik.handleBlur}
																value={formik.values.address}
																isValid={formik.isValid}
																isTouched={formik.touched.address}
																invalidFeedback={
																	formik.errors.address
																}
																validFeedback='Looks good!'
															/>
														</FormGroup>
													</div>
													<div className='col-12'>
														<FormGroup
															id='phone'
															label='Phone'
															isFloating>
															<Input
																placeholder='Phone'
																onChange={formik.handleChange}
																onBlur={formik.handleBlur}
																value={formik.values.phone}
																isValid={formik.isValid}
																isTouched={formik.touched.phone}
																invalidFeedback={
																	formik.errors.phone
																}
																validFeedback='Looks good!'
															/>
														</FormGroup>
													</div>
													<div className='col-12'>
														<FormGroup
															id='level'
															label='Level'
															isFloating>
															<Input
																placeholder='Level'
																onChange={formik.handleChange}
																onBlur={formik.handleBlur}
																value={formik.values.level}
																isValid={formik.isValid}
																isTouched={formik.touched.level}
																invalidFeedback={
																	formik.errors.level
																}
																validFeedback='Looks good!'
															/>
														</FormGroup>
													</div>
													<div className='col-12'>
														<FormGroup
															id='create_date'
															label='Create Date'
															isFloating>
															<Input
																type='date'
																placeholder='Create Date'
																onChange={formik.handleChange}
																onBlur={formik.handleBlur}
																value={formik.values.create_date}
																isValid={formik.isValid}
																isTouched={
																	formik.touched.create_date
																}
																invalidFeedback={
																	formik.errors.create_date
																}
																validFeedback='Looks good!'
															/>
														</FormGroup>
													</div>
													<div className='col-12'>
														<FormGroup
															id='status'
															label='Status'
															isFloating>
															<Input
																placeholder='Status'
																onChange={formik.handleChange}
																onBlur={formik.handleBlur}
																value={formik.values.status}
																isValid={formik.isValid}
																isTouched={formik.touched.status}
																invalidFeedback={
																	formik.errors.status
																}
																validFeedback='Looks good!'
															/>
														</FormGroup>
													</div>
												</div>
											</CardBody>
										</Card>
									</CardBody>
									<CardFooter>
										<CardFooterRight>
											<Button
												color='info'
												icon='Save'
												type='submit'
												onClick={() => putAffilateshop()}>
												Save
											</Button>
										</CardFooterRight>
									</CardFooter>
								</>
							)}
						</Card>
					</div>
				</div>

				<OffCanvas
					setOpen={setUpcomingEventsInfoOffcanvas}
					isOpen={upcomingEventsInfoOffcanvas}
					titleId='upcomingDetails'
					placement='bottom'>
					<OffCanvasHeader setOpen={setUpcomingEventsInfoOffcanvas}>
						<OffCanvasTitle id='upcomingDetails'>Customer: Alison Berry</OffCanvasTitle>
					</OffCanvasHeader>
					<OffCanvasBody>
						<div style={{ display: 'flex' }}>
							{dataShowModel?.map((item) => {
								return (
									<div
										className='row g-4'
										style={{
											width: 150,
											height: 150,
											marginRight: 24,
											display: 'flex',
											flexDirection: 'row',
											alignItems: 'center',
											justifyContent: 'center',
										}}>
										<Avatar
											src={item.account?.avatar}
											srcSet={item.account?.avatar}
											style={{
												cursor: 'pointer',
												width: 80,
												height: 80,
											}}
										/>
										<p>{item.account?.username}</p>
									</div>
								);
							})}
						</div>
					</OffCanvasBody>
				</OffCanvas>
			</Page>
			<OffCanvas
				setOpen={setOpenEditComment}
				isOpen={opentEditComment}
				titleId='Edit Category'
				isBodyScroll
				placement='end'>
				<OffCanvasHeader setOpen={setOpenEditComment}>
					<OffCanvasTitle id='EditCategory'>Edit Comment</OffCanvasTitle>
				</OffCanvasHeader>
				<OffCanvasBody>
					<div className='row g-4'>
						<div className='col-12'>
							<FormGroup id='body' label='Create Date'>
								<Input
									onChange={(e) =>
										setBodyComment({
											...bodyComment,
											[e.target.id]: e.target.value,
										})
									}
									value={bodyComment.body}
									type='text'
								/>
							</FormGroup>
						</div>
					</div>
				</OffCanvasBody>
				<div className='row m-0'>
					<div className='col-12 p-3'>
						<Button color='info' className='w-100' onClick={() => toEditComment()}>
							Save
						</Button>
					</div>
				</div>
			</OffCanvas>
			<OffCanvas
				setOpen={setOpenDeleteComment}
				isOpen={opentDeleteComment}
				titleId='Edit Category'
				isBodyScroll
				placement='end'>
				<OffCanvasHeader setOpen={setOpenDeleteComment}>
					<OffCanvasTitle id='EditCategory'>Delete Comment</OffCanvasTitle>
				</OffCanvasHeader>
				<OffCanvasBody>
					<div className='row g-4'>
						<div className='col-12'>
							<FormGroup id='bodyComment' label='Create Date'>
								<Input value={bodyComment.body} type='text' />
							</FormGroup>
						</div>
					</div>
				</OffCanvasBody>
				<div className='row m-0'>
					<div className='col-12 p-3'>
						<Button color='info' className='w-100' onClick={() => toDeleteComment()}>
							Delete
						</Button>
					</div>
				</div>
			</OffCanvas>
		</PageWrapper>
	);
};

export default ViewProduct;
