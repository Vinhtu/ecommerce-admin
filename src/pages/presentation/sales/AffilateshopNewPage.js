import React from // useEffect,
'react';
//  import { moment} from 'moment'
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';

import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import Page from '../../../layout/Page/Page';
import PageWrapper from '../../../layout/PageWrapper/PageWrapper';
import SubHeader, {
	SubHeaderLeft,
	SubHeaderRight,
	SubheaderSeparator,
} from '../../../layout/SubHeader/SubHeader';
import Button from '../../../components/bootstrap/Button';
import { demoPages } from '../../../menu';
import Avatar from '../../../components/Avatar';
import USERS from '../../../common/data/userDummyData';
import Card, {
	CardBody,
	CardFooter,
	CardFooterRight,
	CardHeader,
	CardLabel,
	CardSubTitle,
	CardTitle,
} from '../../../components/bootstrap/Card';
import Icon from '../../../components/icon/Icon';

import Input from '../../../components/bootstrap/forms/Input';
import FormGroup from '../../../components/bootstrap/forms/FormGroup';
import showNotification from '../../../components/extras/showNotification';
import { PostAffilateshop } from '../../../redux/actions/affilateshops';

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

const AffilateshopNewPage = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	// eslint-disable-next-line no-unused-vars
	const { isPostAffilateshop } = useSelector((state) => state.affilateshop);

	const formik = useFormik({
		initialValues: {
			name: '',
			phone: '',
			level: '',
			streetAddress: '',
			wardCommunedistrictAddress: '',
			cityAddress: '',
			zipAddress: '',
			create_date: new Date(),
			status: 'Normal',
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

	// const accountInfo = localStorage.getItem('accountinfo');
	const accessToken = localStorage.getItem('accessToken');
	// const refreshToken = localStorage.getItem('refreshToken');
	// const account_id = JSON.parse(accountInfo);
	const token = JSON.parse(accessToken);
	// const refreshtoken = JSON.parse(refreshToken);

	const postAffilateshop = () => {
		dispatch(PostAffilateshop(formik.values, token));
		if (!(isPostAffilateshop === 'fail')) {
			navigate(`../admin/affilateshop`);
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
					<Avatar
						srcSet={USERS.RYAN.srcSet}
						src={USERS.RYAN.src}
						size={32}
						color={USERS.RYAN.color}
					/>
					<span>
						<strong>{`${USERS.RYAN.name} ${USERS.RYAN.surname}`}</strong>
					</span>
					<span className='text-muted'>Owner</span>
				</SubHeaderLeft>
				<SubHeaderRight>
					<span className='text-muted fst-italic me-2'>Last update:</span>
					<span className='fw-bold'>13 hours ago</span>
				</SubHeaderRight>
			</SubHeader>
			<Page>
				{/* <div className='display-4 fw-bold py-3'>{data.name}</div> */}
				<div className='row h-100'>
					<div className='col-lg-12'>
						<Card
							stretch
							className='overflow-hidden'
							tag='form'
							noValidate
							onSubmit={formik.handleSubmit}>
							<CardHeader>
								<CardLabel icon='Edit' iconColor='success'>
									<CardTitle>Affilate Shop</CardTitle>
									<CardSubTitle>New Affilate Shop</CardSubTitle>
								</CardLabel>
							</CardHeader>
							<CardBody isScrollable>
								<Card>
									<CardHeader>
										<CardLabel icon='Description' iconColor='success'>
											<CardTitle>Affilateshop New</CardTitle>
										</CardLabel>
									</CardHeader>
									<CardBody>
										<div className='row g-4'>
											<div className='col-12'>
												<FormGroup id='name' label='Name' isFloating>
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
													id='streetAddress'
													label='Street Address'
													isFloating>
													<Input
														placeholder='Street'
														onChange={formik.handleChange}
														onBlur={formik.handleBlur}
														value={formik.values.streetAddress}
														isValid={formik.isValid}
														isTouched={formik.touched.streetAddress}
														invalidFeedback={
															formik.errors.streetAddress
														}
														validFeedback='Looks good!'
													/>
												</FormGroup>
											</div>
											<div className='col-12'>
												<FormGroup
													id='wardCommunedistrictAddress'
													label='Ward Commune District Address'
													isFloating>
													<Input
														placeholder='District'
														onChange={formik.handleChange}
														onBlur={formik.handleBlur}
														value={
															formik.values.wardCommunedistrictAddress
														}
														isValid={formik.isValid}
														isTouched={
															formik.touched
																.wardCommunedistrictAddress
														}
														invalidFeedback={
															formik.errors.wardCommunedistrictAddress
														}
														validFeedback='Looks good!'
													/>
												</FormGroup>
											</div>
											<div className='col-12'>
												<FormGroup
													id='cityAddress'
													label='City Address'
													isFloating>
													<Input
														placeholder='City Address'
														onChange={formik.handleChange}
														onBlur={formik.handleBlur}
														value={formik.values.cityAddress}
														isValid={formik.isValid}
														isTouched={formik.touched.cityAddress}
														invalidFeedback={formik.errors.cityAddress}
														validFeedback='Looks good!'
													/>
												</FormGroup>
											</div>
											<div className='col-12'>
												<FormGroup
													id='zipAddress'
													label='Zip Address'
													isFloating>
													<Input
														placeholder='Zip Address'
														onChange={formik.handleChange}
														onBlur={formik.handleBlur}
														value={formik.values.zipAddress}
														isValid={formik.isValid}
														isTouched={formik.touched.zipAddress}
														invalidFeedback={formik.errors.zipAddress}
														validFeedback='Looks good!'
													/>
												</FormGroup>
											</div>
											<div className='col-12'>
												<FormGroup id='phone' label='Phone' isFloating>
													<Input
														placeholder='Phone'
														onChange={formik.handleChange}
														onBlur={formik.handleBlur}
														value={formik.values.phone}
														isValid={formik.isValid}
														isTouched={formik.touched.phone}
														invalidFeedback={formik.errors.phone}
														validFeedback='Looks good!'
													/>
												</FormGroup>
											</div>
											<div className='col-12'>
												<FormGroup id='level' label='Level' isFloating>
													<Input
														placeholder='Level'
														onChange={formik.handleChange}
														onBlur={formik.handleBlur}
														value={formik.values.level}
														isValid={formik.isValid}
														isTouched={formik.touched.level}
														invalidFeedback={formik.errors.level}
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
														isTouched={formik.touched.create_date}
														invalidFeedback={formik.errors.create_date}
														validFeedback='Looks good!'
													/>
												</FormGroup>
											</div>
											<div className='col-12'>
												<FormGroup id='status' label='Status' isFloating>
													<Input
														placeholder='Status'
														onChange={formik.handleChange}
														onBlur={formik.handleBlur}
														value={formik.values.status}
														isValid={formik.isValid}
														isTouched={formik.touched.status}
														invalidFeedback={formik.errors.status}
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
									{isPostAffilateshop === 'fail' && (
										<p style={{ color: 'red' }}>Them khong thanh cong</p>
									)}
									<Button
										color='info'
										icon='Save'
										type='submit'
										onClick={() => postAffilateshop()}>
										Save
									</Button>
								</CardFooterRight>
							</CardFooter>
						</Card>
					</div>
				</div>
			</Page>
		</PageWrapper>
	);
};

export default AffilateshopNewPage;
