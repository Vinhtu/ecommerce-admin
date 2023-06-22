import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import moment from 'moment';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

import storage from '../../../firebase';
import Avatar from '../../../components/Avatar';
import Modal, {
	ModalBody,
	ModalFooter,
	ModalHeader,
	ModalTitle,
} from '../../../components/bootstrap/Modal';
// import data from '../../../common/data/dummyCustomerData';
import showNotification from '../../../components/extras/showNotification';
import Icon from '../../../components/icon/Icon';
import Select from '../../../components/bootstrap/forms/Select';
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
import { Register } from '../../../redux/actions/accounts';
import { GetPositions } from '../../../redux/actions/positions';
import { GetTeams } from '../../../redux/actions/teams';

// import { isContentEditable } from '@testing-library/user-event/dist/utils';

const NewAccountRemember = ({ isOpen, setIsOpen }) => {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const { teamList } = useSelector((state) => state.team);
	const { positionList } = useSelector((state) => state.position);

	const today = new Date();
	const formatdate = moment(today).format('YYYY-MM-DD');
	const { isPostAccount } = useSelector((state) => state.account);
	const [avatar, setAvatar] = React.useState(
		'https://toppng.com/uploads/preview/roger-berry-avatar-placeholder-11562991561rbrfzlng6h.png',
	);

	useEffect(() => {
		dispatch(GetTeams());
		dispatch(GetPositions());
	}, [dispatch]);

	console.log(positionList, 'arr res');

	const formik = useFormik({
		initialValues: {
			avatar: '',
			fullname: '',
			phone: '',
			username: '',
			password: '',
			create_date: formatdate,
			streetAddress: '',
			wardCommunedistrictAddress: '',
			cityAddress: '',
			zipAddress: '',
			role: '',
			team: '',
			position: '',
			status: 'Normal',
		},
		// eslint-disable-next-line no-unused-vars
		onSubmit: (values) => {
			values.avatar = avatar;
			dispatch(Register(values));
			navigate('/admin/account/customor');
			setTimeout(() => {
				if (isPostAccount) {
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
			});

			setIsOpen(false);
		},
	});

	const handleImageAsFile = (e) => {
		const image = e.target.files[0];

		const imageRef = ref(storage, `images/${image.name}`);

		uploadBytes(imageRef, image).then((res) =>
			getDownloadURL(res.ref).then((url) => setAvatar(url)),
		);
	};
	const deleteAvatar = () => {
		setAvatar('');
	};

	const selectTeam = [];
	if (teamList) {
		for (let i = 0; i < teamList.data.results.length; i += 1) {
			selectTeam.push({
				value: teamList.data.results[i].name,
				text: teamList.data.results[i].name,
			});
		}
	}
	const selectPosition = [];
	if (positionList) {
		for (let i = 0; i < positionList.data.results.length; i += 1) {
			selectPosition.push({
				value: positionList.data.results[i].name,
				text: positionList.data.results[i].name,
			});
		}
	}

	return (
		<Modal isOpen={isOpen} setIsOpen={setIsOpen} size='xl'>
			<ModalHeader setIsOpen={setIsOpen} className='p-4'>
				<ModalTitle>New Customer</ModalTitle>
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
									<FormGroup id='cityAddress' label='City' className='col-md-4'>
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

						<FormGroup id='team' label='Team' isFloating className='mt-3'>
							<Select
								ariaLabel='Team'
								placeholder='Choose...'
								list={selectTeam}
								onChange={formik.handleChange}
								onBlur={formik.handleBlur}
								value={formik.values.team}
								isValid={formik.isValid}
								isTouched={formik.touched.state}
								// invalidFeedback={formik.errors.state}
							/>
						</FormGroup>
						<FormGroup id='position' label='Position' isFloating className='mt-3'>
							<Select
								ariaLabel='Position'
								placeholder='Choose...'
								list={selectPosition}
								onChange={formik.handleChange}
								onBlur={formik.handleBlur}
								value={formik.values.position}
								isValid={formik.isValid}
								isTouched={formik.touched.state}
								// invalidFeedback={formik.errors.state}
							/>
						</FormGroup>
						<div className='row g-4 align-items-center mt-3'>
							<div className='col-lg-auto'>
								<Avatar
									srcSet={avatar}
									src={avatar}
									// color={USERS.JOHN.color}
								/>
							</div>
							<div className='col-lg'>
								<div className='row g-4'>
									<div className='col-auto'>
										<Input
											type='file'
											autoComplete='photo'
											onChange={handleImageAsFile}
										/>
									</div>

									<div className='col-12'>
										<Button
											color='dark'
											isLight
											icon='Delete'
											onClick={() => deleteAvatar()}>
											Delete Avatar
										</Button>
									</div>
								</div>
							</div>
						</div>
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
NewAccountRemember.propTypes = {
	isOpen: PropTypes.bool.isRequired,
	setIsOpen: PropTypes.func.isRequired,
};

export default NewAccountRemember;
