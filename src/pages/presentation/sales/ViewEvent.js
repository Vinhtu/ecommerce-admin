import React, { 
	// useEffect,
	 useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import { useLocation } from "react-router-dom";
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
// import Accordion, { AccordionItem } from '../../../components/bootstrap/Accordion';
// import PlaceholderImage from '../../../components/extras/PlaceholderImage';
import Input from '../../../components/bootstrap/forms/Input';
import FormGroup from '../../../components/bootstrap/forms/FormGroup';
import showNotification from '../../../components/extras/showNotification';
import useDarkMode from '../../../hooks/useDarkMode';
import { DeleteEvent } from '../../../redux/actions/events';

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

const ViewEvent = () => {
	const location = useLocation();


	const { darkModeStatus } = useDarkMode();

	const navigate = useNavigate();
	const dispatch = useDispatch();


	// eslint-disable-next-line no-unused-vars
	const TABS = {
		SUMMARY: 'Summary',
		COMMENTS: 'Comments',
		EDIT: 'Edit',
	};
	const [activeTab, setActiveTab] = useState(TABS.SUMMARY);

	const formik = useFormik({
		initialValues: {
			_id: location.state.item._id,
			name: location.state.item.name,
			address: location.state.item.address,
			phone: location.state.item.phone,
			level: location.state.item.level,
			create_date: location.state.item.create_date,
			status: location.state.item.status,
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
	
		navigate(`../admin/affilateshop`)

	}

	const deleteAffilateshop = () => {
		dispatch(DeleteEvent(formik.values._id));
		navigate(`../admin/event`)

	}

	const toEditProduct = (item) => {
		navigate(`../${demoPages.sales.subMenu.editproduct.path}/${item._id}`, {state: {item}});

	}
	
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
				<div className='display-4 fw-bold py-3'>{location.state.item.name}</div>
				<div className='row h-100'>
					<div className='col-lg-4'>
						<Card stretch>
							<CardBody isScrollable>
								<div className='row g-3'>
									<div className='col-12'>
										<img src={location.state.item.thumbnail} alt='' width='100%' className='p-5' style={{borderRadius: 50}}/>
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
											onClick={() => toEditProduct(location.state.item)}>
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
										onClick={() => deleteAffilateshop()}
										>
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
																	{location.state.item.name}
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
															    type="date"
																placeholder='Create Date'
																onChange={formik.handleChange}
																onBlur={formik.handleBlur}
																value={formik.values.create_date}
																isValid={formik.isValid}
																isTouched={formik.touched.create_date}
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
												onClick={() => putAffilateshop()}
												>
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

export default ViewEvent;
