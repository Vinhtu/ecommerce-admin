import React, {useEffect} from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';

import { useFormik } from 'formik';
import Modal, {
	ModalBody,
	ModalFooter,
	ModalHeader,
	ModalTitle,
} from '../../../components/bootstrap/Modal';
// import data from '../../../common/data/dummyCustomerData';
import showNotification from '../../../components/extras/showNotification';
import Icon from '../../../components/icon/Icon';
import FormGroup from '../../../components/bootstrap/forms/FormGroup';
import Input from '../../../components/bootstrap/forms/Input';
import Card, {
	CardBody,
	CardHeader,
	CardLabel,
	CardTitle,
} from '../../../components/bootstrap/Card';
import Button from '../../../components/bootstrap/Button';
import Label from '../../../components/bootstrap/forms/Label';
import Checks, { ChecksGroup } from '../../../components/bootstrap/forms/Checks';
// import PAYMENTS from '../../../common/data/enumPaymentMethod';
import ROLE from '../../../common/data/enumRoleMethod';
import { PutAccount } from '../../../redux/actions/accounts';


// import { isContentEditable } from '@testing-library/user-event/dist/utils';

const EditAccountRemember = ({ data, isOpen, setIsOpen }) => {
	const dispatch = useDispatch();
	const { isPutAccount } = useSelector((state) => state.account);
	const navigate = useNavigate();
	
	useEffect(() => {
		
		  formik.setValues({
			...data
		  });
		
	  }, [formik,data]);
	const formik = useFormik({
		initialValues: {
			fullname: data ? data.fullname : '',
			phone:  data ?  data.phone: '',
			username:  data ?  data.username: '',
			password:  data ? data.password: '',
			create_date: data ?   new Date(data.create_date) : '',
			streetAddress: data ?  data.streetAddress: '',
			wardCommunedistrictAddress:  data ? data.wardCommunedistrictAddress: '',
			cityAddress:  data ? data.cityAddress: '',
			zipAddress:  data ? data.zipAddress: '',
			role:  data ? data.role: '',
			status:  data ?  data.status: '',
		},
		// eslint-disable-next-line no-unused-vars
		onSubmit: (values) => {
			console.log(values, 'values');
			dispatch(PutAccount(data._id, values));
			navigate('/admin/account/customor');
			setTimeout(() => {
				if (isPutAccount) {
					showNotification(
						<span className='d-flex align-items-center'>
							<Icon icon='Info' size='lg' className='me-1' />
							<span>Updated Successfully</span>
						</span>,
						'Customer has been updated successfully',
					);
				} else {
					showNotification(
						<span className='d-flex align-items-center'>
							<Icon icon='Info' size='lg' className='me-1' />
							<span>Updated Error</span>
						</span>,
						'Customer has been updated successfully',
					);
				}
			}, 1000);

			setIsOpen(false);
		},
	});


	
		return (
			<Modal isOpen={isOpen} setIsOpen={setIsOpen} size='xl' >
				<ModalHeader setIsOpen={setIsOpen} className='p-4'>
					<ModalTitle >{data.fullname || 'New Customer'}</ModalTitle>
				</ModalHeader>
				<ModalBody className='px-4'>
					<div className='row g-4'>
						<FormGroup id='fullname' label='Name' className='col-md-6'>
							<Input onChange={formik.handleChange} value={formik.values.fullname} />
						</FormGroup>
						<FormGroup id='phone' label='Phone' className='col-md-6'>
							<Input
								type='text'
								onChange={formik.handleChange}
								value={formik.values.phone}
							/>
						</FormGroup>
						<FormGroup id='username' label='Email' className='col-md-6'>
							<Input
								type='email'
								onChange={formik.handleChange}
								value={formik.values.username}
							/>
						</FormGroup>
						<FormGroup id='password' label='Password' className='col-md-6'>
							<Input
								type='password'
								onChange={formik.handleChange}
								value={formik.values.password}
							/>
						</FormGroup>
						<FormGroup id='createdate' label='Create Date' className='col-md-6'>
							<Input
								// type='date'
								onChange={formik.handleChange}
								value={formik.values.create_date}
								disabled
							/>
						</FormGroup>

						<FormGroup id='status' label='Status' className='col-md-6'>
							<Input
								onChange={formik.handleChange}
								value={formik.values.status}
								disabled
							/>
						</FormGroup>

						{/* <div className='col-md-6'>
							<Card className='rounded-1 mb-0'>
								<CardHeader>
									<CardLabel icon='ReceiptLong'>
										<CardTitle>Billing Address</CardTitle>
									</CardLabel>
								</CardHeader>
								<CardBody>
									<div className='row g-3'>
										<FormGroup
											id='streetAddress'
											label='Address Line'
											className='col-12'>
											<Input
												onChange={formik.handleChange}
												value={formik.values.streetAddress}
											/>
										</FormGroup>
										<FormGroup
											id='streetAddress2'
											label='Address Line 2'
											className='col-12'>
											<Input
												onChange={formik.handleChange}
												value={formik.values.streetAddress2}
											/>
										</FormGroup>
										<FormGroup id='city' label='City' className='col-md-4'>
											<Input
												onChange={formik.handleChange}
												value={formik.values.city}
											/>
										</FormGroup>
										<FormGroup
											id='stateFull'
											label='State'
											className='col-md-4'>
											<Input
												onChange={formik.handleChange}
												value={formik.values.stateFull}
											/>
										</FormGroup>
										<FormGroup id='zip' label='Zip' className='col-md-4'>
											<Input
												onChange={formik.handleChange}
												value={formik.values.zip}
											/>
										</FormGroup>
									</div>
								</CardBody>
							</Card>
						</div> */}
						<div className='col-md-6'>
							<Card className='rounded-1 mb-0'>
								<CardHeader>
									<CardLabel icon='LocalShipping'>
										<CardTitle>Delivery Address</CardTitle>
									</CardLabel>
								</CardHeader>
								<CardBody>
									<div className='row g-3'>
										<FormGroup
											id='streetAddress'
											label='Address Line'
											className='col-12'>
											<Input
												onChange={formik.handleChange}
												value={formik.values.streetAddress}
											/>
										</FormGroup>
										<FormGroup
											id='wardCommunedistrictAddress'
											label='Ward Commune District'
											className='col-12'>
											<Input
												onChange={formik.handleChange}
												value={formik.values.wardCommunedistrictAddress}
											/>
										</FormGroup>
										<FormGroup
											id='cityAddress'
											label='City'
											className='col-md-4'>
											<Input
												onChange={formik.handleChange}
												value={formik.values.cityAddress}
											/>
										</FormGroup>

										<FormGroup id='zipAddress' label='Zip' className='col-md-4'>
											<Input
												onChange={formik.handleChange}
												value={formik.values.zipAddress}
											/>
										</FormGroup>
									</div>
								</CardBody>
							</Card>
						</div>

						<FormGroup className='col-md-6'>
							<Label>Role</Label>
							<ChecksGroup isInline>
								{Object.keys(ROLE).map((i) => (
									<Checks
										type='radio'
										key={ROLE[i].name}
										id={ROLE[i].name}
										label={ROLE[i].name}
										name='role'
										value={ROLE[i].name}
										onChange={formik.handleChange}
										checked={formik.values.role}
									/>
								))}
							</ChecksGroup>
						</FormGroup>
					</div>
				</ModalBody>
				<ModalFooter className='px-4 pb-4'>
					<Button color='info' onClick={formik.handleSubmit}>
						Save
					</Button>
				</ModalFooter>
			</Modal>
		);
	
};
EditAccountRemember.propTypes = {
	data: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
	isOpen: PropTypes.bool.isRequired,
	setIsOpen: PropTypes.func.isRequired,
};

export default EditAccountRemember;
