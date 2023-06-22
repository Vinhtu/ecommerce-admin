import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import { useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';

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
// import Avatar from '../../../components/Avatar';
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
import {
	PutAffilateshop,
	DeleteAffilateshop,
	GetAffilateshop,
} from '../../../redux/actions/affilateshops';

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

const AffilateshopViewPage = () => {
	const location = useLocation();

	const { darkModeStatus } = useDarkMode();

	const navigate = useNavigate();
	const dispatch = useDispatch();

	const { affilateshopDetail, isPutAffilateshop, isDeleteAffilateshop } = useSelector(
		(state) => state.affilateshop,
	);

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
	const [dataAffilateshop, setDataAffilateshop] = React.useState({
		_id: affilateshopDetail?._id,
		name: affilateshopDetail?.name,
		streetAddress: affilateshopDetail?.streetAddress,
		wardCommunedistrictAddress: affilateshopDetail?.wardCommunedistrictAddress,
		cityAddress: affilateshopDetail?.cityAddress,
		zipAddress: affilateshopDetail?.zipAddress,
		phone: affilateshopDetail?.phone,
		level: affilateshopDetail?.level,
		create_date: affilateshopDetail?.create_date,
		status: affilateshopDetail?.status,
	});

	useEffect(() => {
		setDataAffilateshop({
			_id: affilateshopDetail?._id,
			name: affilateshopDetail?.name,
			streetAddress: affilateshopDetail?.streetAddress,
			wardCommunedistrictAddress: affilateshopDetail?.wardCommunedistrictAddress,
			cityAddress: affilateshopDetail?.cityAddress,
			zipAddress: affilateshopDetail?.zipAddress,
			phone: affilateshopDetail?.phone,
			level: affilateshopDetail?.level,
			create_date: affilateshopDetail?.create_date,
			status: affilateshopDetail?.status,
		});
	}, [affilateshopDetail]);

	const formik = useFormik({
		initialValues: {},
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
		dispatch(PutAffilateshop(location.state.item._id, dataAffilateshop, token));
		if (!(isPutAffilateshop === 'fail')) {
			navigate(`../admin/affilateshop`);
		}
	};

	const deleteAffilateshop = () => {
		dispatch(DeleteAffilateshop(location.state.item._id, token));
		if (!(isDeleteAffilateshop === 'fail')) {
			navigate(`../admin/affilateshop`);
		}
	};

	const handleChangeAffilate = (e) => {
		setDataAffilateshop({ ...dataAffilateshop, [e.target.id]: e.target.value });
	};

	useEffect(() => {
		dispatch(GetAffilateshop(location.state.item._id));
	}, [dispatch, location.state.item._id]);

	useEffect(() => {
		dispatch(GetAffilateshop(location.state.item._id));
	}, [dispatch, location.state.item._id, isPutAffilateshop, isDeleteAffilateshop]);

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
				<div className='display-4 fw-bold py-3'>{affilateshopDetail?.name}</div>
				<div className='row h-100'>
					<div className='col-lg-4'>
						<Card stretch>
							<CardBody isScrollable>
								<div className='row g-3'>
									<div className='col-12'>
										<img
											src={affilateshopDetail?.image}
											alt=''
											width='100%'
											className='p-5'
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
											onClick={() => setActiveTab(TABS.EDIT)}>
											{TABS.EDIT}
										</Button>
									</div>
								</div>
							</CardBody>
							<CardFooter>
								<CardFooterLeft className='w-100'>
									{isDeleteAffilateshop === 'fail' && (
										<p style={{ fontSize: 14, color: 'red' }}> Xoa that bai</p>
									)}
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
											<CardTitle>Summary</CardTitle>
											<CardSubTitle>Product Information</CardSubTitle>
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
															<CardTitle>Price</CardTitle>
														</CardLabel>
													</CardHeader>
													<CardBody>
														<div className='d-flex align-items-center pb-3'>
															<div className='flex-shrink-0'>
																<Icon
																	icon='ConfirmationNumber'
																	size='4x'
																	color='primary'
																/>
															</div>
															<div className='flex-grow-1 ms-3'>
																{/* <div className='fw-bold fs-3 mb-0'>
																	{priceFormat(data.price)}
																</div>
																<div className='text-muted'>
																	<b>Quantity: </b> {data.stock}
																</div> */}
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
														{/* <Chart
															className='mx-n4'
															series={data.series}
															options={chartOptions}
															type={chartOptions.chart.type}
															height={chartOptions.chart.height}
															width={chartOptions.chart.width}
														/> */}
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
															<CardTitle>Category</CardTitle>
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
																	{affilateshopDetail?.name}
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
															<CardTitle>Compatible</CardTitle>
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
																{/* <div className='fw-bold fs-3 mb-0'>
																	{data.file}
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
											<CardSubTitle>Product Reviews</CardSubTitle>
										</CardLabel>
									</CardHeader>
									<CardBody isScrollable>
										<div className='row g-4'>
											<div className='col-12 d-flex align-items-center'>
												<div className='flex-shrink-0'>
													{/* <Avatar
														src={USERS.GRACE.src}
														srcSet={USERS.GRACE.srcSet}
														color={USERS.GRACE.color}
														size={64}
													/> */}
												</div>
												<div className='flex-grow-1 ms-3 d-flex justify-content-between align-items-center'>
													<figure className='mb-0'>
														<blockquote className='blockquote'>
															<p>
																We made a very logical decision to
																use it in our project. Design
																quality is very nice.
															</p>
														</blockquote>
														<figcaption className='blockquote-footer mb-0'>
															{/* {USERS.GRACE.name} in{' '} */}
															<cite title='Company'>Company</cite>
														</figcaption>
													</figure>
												</div>
											</div>
											<div className='col-12 d-flex align-items-center'>
												<div className='flex-shrink-0'>
													{/* <Avatar
														src={USERS.SAM.src}
														srcSet={USERS.SAM.srcSet}
														color={USERS.SAM.color}
														size={64}
													/> */}
												</div>
												<div className='flex-grow-1 ms-3 d-flex justify-content-between align-items-center'>
													<figure className='mb-0'>
														<blockquote className='blockquote'>
															<p>
																We have used another product of the
																same author before. It was very easy
																to integrate it into our project.
															</p>
														</blockquote>
														<figcaption className='blockquote-footer mb-0'>
															{/* {USERS.SAM.name} in{' '} */}
															<cite title='Company'>Company</cite>
														</figcaption>
													</figure>
												</div>
											</div>
											<div className='col-12 d-flex align-items-center'>
												<div className='flex-shrink-0'>
													{/* <Avatar
														src={USERS.CHLOE.src}
														srcSet={USERS.CHLOE.srcSet}
														color={USERS.CHLOE.color}
														size={64}
													/> */}
												</div>
												<div className='flex-grow-1 ms-3 d-flex justify-content-between align-items-center'>
													<figure className='mb-0'>
														<blockquote className='blockquote'>
															<p>
																Just the design I was looking
																for.🎉🎉
															</p>
														</blockquote>
														<figcaption className='blockquote-footer mb-0'>
															{/* {USERS.CHLOE.name} in{' '} */}
															<cite title='Company'>Company</cite>
														</figcaption>
													</figure>
												</div>
											</div>
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
										<Card>
											<CardHeader>
												<CardLabel icon='Description' iconColor='success'>
													<CardTitle>Product Details</CardTitle>
												</CardLabel>
											</CardHeader>
											<CardBody>
												<div className='row g-4'>
													<div className='col-12'>
														<FormGroup id='name' label='Name'>
															<Input
																placeholder='Name'
																onChange={handleChangeAffilate}
																value={dataAffilateshop.name}
																validFeedback='Looks good!'
															/>
														</FormGroup>
													</div>

													<div className='col-12'>
														<FormGroup
															id='streetAddress'
															label='Street Address'>
															<Input
																placeholder='Street'
																onChange={handleChangeAffilate}
																value={
																	dataAffilateshop.streetAddress
																}
																validFeedback='Looks good!'
															/>
														</FormGroup>
													</div>
													<div className='col-12'>
														<FormGroup
															id='wardCommunedistrictAddress'
															label='Ward Commune District Address'>
															<Input
																placeholder='District'
																onChange={handleChangeAffilate}
																value={
																	dataAffilateshop.wardCommunedistrictAddress
																}
																isValid={
																	dataAffilateshop.wardCommunedistrictAddress
																}
																isTouched={
																	dataAffilateshop.wardCommunedistrictAddress
																}
																validFeedback='Looks good!'
															/>
														</FormGroup>
													</div>
													<div className='col-12'>
														<FormGroup
															id='cityAddress'
															label='City Address'>
															<Input
																placeholder='City Address'
																onChange={handleChangeAffilate}
																value={dataAffilateshop.cityAddress}
																validFeedback='Looks good!'
															/>
														</FormGroup>
													</div>
													<div className='col-12'>
														<FormGroup
															id='zipAddress'
															label='Zip Address'>
															<Input
																placeholder='Zip Address'
																onChange={handleChangeAffilate}
																value={dataAffilateshop.zipAddress}
																validFeedback='Looks good!'
															/>
														</FormGroup>
													</div>
													<div className='col-12'>
														<FormGroup id='phone' label='Phone'>
															<Input
																placeholder='Phone'
																onChange={handleChangeAffilate}
																value={dataAffilateshop.phone}
																validFeedback='Looks good!'
															/>
														</FormGroup>
													</div>
													<div className='col-12'>
														<FormGroup id='level' label='Level'>
															<Input
																placeholder='Level'
																onChange={handleChangeAffilate}
																value={dataAffilateshop.level}
																validFeedback='Looks good!'
															/>
														</FormGroup>
													</div>
													<div className='col-12'>
														<FormGroup
															id='create_date'
															label='Create Date'>
															<Input
																type='date'
																placeholder='Create Date'
																onChange={handleChangeAffilate}
																value={dataAffilateshop.create_date}
																validFeedback='Looks good!'
															/>
														</FormGroup>
													</div>
													<div className='col-12'>
														<FormGroup id='status' label='Status'>
															<Input
																placeholder='Status'
																onChange={handleChangeAffilate}
																value={dataAffilateshop.status}
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
											{isPutAffilateshop === 'fail' && (
												<p style={{ fontSize: 14, color: 'red' }}>
													{' '}
													Tao moi that bai
												</p>
											)}
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
			</Page>
		</PageWrapper>
	);
};

export default AffilateshopViewPage;
