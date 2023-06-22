import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
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
// import Icon from '../../../components/icon/Icon';
// import { priceFormat } from '../../../helpers/helpers';
// import Chart from '../../../components/extras/Chart';
// import Accordion, { AccordionItem } from '../../../components/bootstrap/Accordion';
// import PlaceholderImage from '../../../components/extras/PlaceholderImage';
import Input from '../../../components/bootstrap/forms/Input';
import FormGroup from '../../../components/bootstrap/forms/FormGroup';
// import useDarkMode from '../../../hooks/useDarkMode';
import { DeleteVoucher, GetVouchers } from '../../../redux/actions/vouchers';

// const validate = (values) => {
// 	const errors = {};

// 	if (!values.name) {
// 		errors.name = 'Required';
// 	} else if (values.name.length < 3) {
// 		errors.name = 'Must be 3 characters or more';
// 	} else if (values.name.length > 20) {
// 		errors.name = 'Must be 20 characters or less';
// 	}

// 	if (!values.price) {
// 		errors.price = 'Required';
// 	} else if (values.price < 0) {
// 		errors.price = 'Price should not be 0';
// 	}

// 	if (!values.stock) {
// 		errors.stock = 'Required';
// 	}

// 	if (!values.category) {
// 		errors.category = 'Required';
// 	} else if (values.category.length < 3) {
// 		errors.category = 'Must be 3 characters or more';
// 	} else if (values.category.length > 20) {
// 		errors.category = 'Must be 20 characters or less';
// 	}

// 	return errors;
// };

const ViewVoucher = () => {
	const location = useLocation();

	// const { darkModeStatus } = useDarkMode();

	const navigate = useNavigate();
	const dispatch = useDispatch();

	const { voucherDetail, isPutVoucher, isDeleteVoucher } = useSelector((state) => state.voucher);

	// const accountInfo = localStorage.getItem('accountinfo');
	const accessToken = localStorage.getItem('accessToken');
	// const refreshToken = localStorage.getItem('refreshToken');
	// const account_id = JSON.parse(accountInfo);
	const token = JSON.parse(accessToken);
	// const refreshtoken = JSON.parse(refreshToken);

	useEffect(() => {
		dispatch(GetVouchers(location.state.item._id));
	}, [dispatch, location.state.item._id, isPutVoucher, isDeleteVoucher]);

	// eslint-disable-next-line no-unused-vars
	const TABS = {
		SUMMARY: 'Summary',
		COMMENTS: 'Comments',
		EDIT: 'Edit',
	};
	const [activeTab, setActiveTab] = useState(TABS.SUMMARY);

	const [dataVoucher, setDataVoucher] = React.useState({
		_id: voucherDetail?._id,
		name: voucherDetail?.name,
		address: voucherDetail?.address,
		phone: voucherDetail?.phone,
		level: voucherDetail?.level,
		create_date: voucherDetail?.create_date,
		status: voucherDetail?.status,
	});
	useEffect(() => {
		setDataVoucher({
			_id: voucherDetail?._id,
			name: voucherDetail?.name,
			address: voucherDetail?.address,
			phone: voucherDetail?.phone,
			level: voucherDetail?.level,
			create_date: voucherDetail?.create_date,
			status: voucherDetail?.status,
		});
	}, [voucherDetail]);
	const handleVoucher = (e) => {
		setDataVoucher({ ...dataVoucher, [e.target.id]: e.target.value });
	};

	const editVoucher = (item) => {
		navigate(`../${demoPages.sales.subMenu.editvoucher.path}/${item._id}`, { state: { item } });
	};
	const deleteVoucher = () => {
		dispatch(DeleteVoucher(location.state.item._id, token));
		if (!(isDeleteVoucher === 'fail')) {
			navigate(`../${demoPages.Voucher.path}`);
		}
	};

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
				<div className='display-4 fw-bold py-3'>{voucherDetail?.name}</div>
				<div className='row h-100'>
					<div className='col-lg-4'>
						<Card stretch>
							<CardBody isScrollable>
								<div className='row g-3'>
									<div className='col-12'>
										<img
											src={voucherDetail?.thumbnail}
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
											onClick={() => editVoucher(voucherDetail)}>
											{TABS.EDIT}
										</Button>
									</div>
								</div>
							</CardBody>
							<CardFooter>
								<CardFooterLeft className='w-100'>
									{isDeleteVoucher === 'fail' && (
										<p style={{ fontSize: 14, color: 'red' }}>
											{' '}
											Tao moi that bai
										</p>
									)}
									<Button
										icon='Delete'
										color='danger'
										isLight
										className='w-100 p-3'
										onClick={() => deleteVoucher()}>
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
							// onSubmit={formik.handleSubmit}
						>
							{activeTab === TABS.SUMMARY && (
								<>
									<CardHeader>
										<CardLabel icon='Summarize' iconColor='info'>
											<CardTitle>Summary</CardTitle>
											<CardSubTitle>Product Information</CardSubTitle>
										</CardLabel>
									</CardHeader>
									<CardBody isScrollable>
										<div className='row' />
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
														<FormGroup
															id='name'
															label='Name'
															isFloating>
															<Input
																placeholder='Name'
																onChange={handleVoucher}
																// onBlur={formik.handleBlur}
																value={dataVoucher.name}
																// isValid={formik.isValid}
																// isTouched={formik.touched.name}
																// invalidFeedback={formik.errors.name}
																// validFeedback='Looks good!'
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
																onChange={handleVoucher}
																value={dataVoucher.address}
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
																onChange={handleVoucher}
																value={dataVoucher.phone}
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
																onChange={handleVoucher}
																value={dataVoucher.level}
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
																onChange={handleVoucher}
																value={dataVoucher.create_date}
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
																onChange={handleVoucher}
																value={dataVoucher.status}
															/>
														</FormGroup>
													</div>
												</div>
											</CardBody>
										</Card>
									</CardBody>
									<CardFooter>
										<CardFooterRight>
											<Button color='info' icon='Save' type='submit'>
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

export default ViewVoucher;
