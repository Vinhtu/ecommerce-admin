import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
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
// import showNotification from '../../../components/extras/showNotification';
// import Icon from '../../../components/icon/Icon';
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
import Select from '../../../components/bootstrap/forms/Select';
import { GetTeams } from '../../../redux/actions/teams';
import { GetDistricts, GetProvinces, GetWards } from '../../../redux/actions/utils';

// import { isContentEditable } from '@testing-library/user-event/dist/utils';

const NewAccountCustomor = ({ isOpen, setIsOpen }) => {
	const dispatch = useDispatch();

	const today = new Date();
	const formatdate = moment(today).format('YYYY-MM-DD');
	const { isPostAccount } = useSelector((state) => state.account);
	const [avatar, setAvatar] = React.useState(
		'https://toppng.com/uploads/preview/roger-berry-avatar-placeholder-11562991561rbrfzlng6h.png',
	);

	const { teamList } = useSelector((state) => state.team);
	const tokenGHN = '90ce8fc1-612b-11ed-b824-262f869eb1a7';
	const { provinceList, districtList, wardList } = useSelector((state) => state.utils);

	useEffect(() => {
		dispatch(GetTeams());
	}, [dispatch]);

	const [dataForm, setDataForm] = React.useState({
		avatar: '',
		fullname: '',
		phone: '',
		username: '',
		password: '',
		create_date: formatdate,
		province: '',
		district: '',
		ward: '',
		line: '',
		zip: '',
		team: '',
		role: '',
		status: 'Normal',
	});

	const getIDProcinve = (name) => {
		return new Promise((resolve) => {
			for (let i = 0; i < provinceList?.data.length; i += 1) {
				if (provinceList?.data[i].ProvinceName === name) {
					resolve(provinceList?.data[i].ProvinceID);
				}
			}
		});
	};

	const getIDistrict = (name) => {
		return new Promise((resolve) => {
			for (let i = 0; i < districtList?.data.length; i += 1) {
				if (districtList?.data[i].DistrictName === name) {
					resolve(districtList?.data[i].DistrictID);
				}
			}
		});
	};

	const onChangeForm = async (e) => {
		setDataForm({ ...dataForm, [e.target.id]: e.target.value });
	};

	const onChangeFormProvince = async (e) => {
		setDataForm({ ...dataForm, [e.target.id]: e.target.value });
		dispatch(GetDistricts(tokenGHN, await getIDProcinve(e.target.value)));
	};

	const onChangeFormDistrict = async (e) => {
		setDataForm({ ...dataForm, [e.target.id]: e.target.value });
		dispatch(GetWards(tokenGHN, await getIDistrict(e.target.value)));
	};
	console.log(dataForm, 'dataForm');

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

	const [arrProvince, setArrProvince] = React.useState([]);
	const [arrDistrict, setArrDistrict] = React.useState([]);
	const [arrWard, setArrWard] = React.useState([]);

	useEffect(() => {
		setArrProvince([]);
		if (provinceList)
			for (let i = 0; i < provinceList?.data.length; i += 1) {
				setArrProvince((current) => [
					...current,
					{
						value: provinceList?.data[i].ProvinceName,
						text: provinceList?.data[i].ProvinceName,
					},
				]);
			}
	}, [provinceList]);

	useEffect(() => {
		setArrDistrict([]);
		if (districtList)
			for (let i = 0; i < districtList?.data.length; i += 1) {
				setArrDistrict((current) => [
					...current,
					{
						value: districtList?.data[i].DistrictName,
						text: districtList?.data[i].DistrictName,
					},
				]);
			}
	}, [districtList]);

	useEffect(() => {
		setArrWard([]);
		if (wardList)
			for (let i = 0; i < wardList?.data.length; i += 1) {
				setArrWard((current) => [
					...current,
					{
						value: wardList?.data[i].WardName,
						text: wardList?.data[i].WardName,
					},
				]);
			}
	}, [wardList]);

	useEffect(() => {
		dispatch(GetProvinces(tokenGHN));
	}, [dispatch]);

	const PostAccount = () => {
		dataForm.avatar = avatar;
		dispatch(Register(dataForm));
		if (isPostAccount === 'success') {
			setIsOpen(false);
		}
	};

	return (
		<Modal isOpen={isOpen} setIsOpen={setIsOpen} size='xl'>
			<ModalHeader setIsOpen={setIsOpen} className='p-4'>
				<ModalTitle>New Customer</ModalTitle>
			</ModalHeader>
			<ModalBody className='px-4'>
				<div className='row g-4'>
					<FormGroup id='fullname' label='Name' className='col-md-6'>
						<Input onChange={onChangeForm} value={dataForm.fullname} />
					</FormGroup>
					<FormGroup id='phone' label='Phone' className='col-md-6'>
						<Input type='text' onChange={onChangeForm} value={dataForm.phone} />
					</FormGroup>
					<FormGroup id='username' label='Email' className='col-md-6'>
						<Input type='email' onChange={onChangeForm} value={dataForm.username} />
					</FormGroup>
					<FormGroup id='password' label='Password' className='col-md-6'>
						<Input type='password' onChange={onChangeForm} value={dataForm.password} />
					</FormGroup>
					<FormGroup id='team' label='Team' className='col-md-3'>
						<Select
							ariaLabel='Team'
							placeholder='Choose Team'
							list={selectTeam}
							onChange={onChangeForm}
							value={dataForm.team}
							isValid={dataForm.team}
							isTouched={dataForm.team}
						/>
					</FormGroup>
					<FormGroup id='createdate' label='Create Date' className='col-md-3'>
						<Input
							// type='date'
							onChange={onChangeForm}
							value={dataForm.create_date}
							disabled
						/>
					</FormGroup>

					<FormGroup id='status' label='Status' className='col-md-3'>
						<Input onChange={onChangeForm} value={dataForm.status} disabled />
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
									<FormGroup id='province' label='Province' className='col-md-12'>
										<Select
											ariaLabel='Province'
											placeholder='Choose Province'
											list={arrProvince && arrProvince}
											onChange={onChangeFormProvince}
											value={dataForm.province}
											isValid={dataForm.province}
											isTouched={dataForm.province}
										/>
									</FormGroup>
									<FormGroup id='district' label='District' className='col-md-12'>
										<Select
											ariaLabel='District'
											placeholder='Choose District'
											list={arrDistrict}
											onChange={onChangeFormDistrict}
											value={dataForm.district}
											isValid={dataForm.district}
											isTouched={dataForm.district}
										/>
									</FormGroup>
									<FormGroup id='ward' label='Ward' className='col-md-12'>
										<Select
											ariaLabel='Ward'
											placeholder='Choose Ward'
											list={arrWard}
											onChange={onChangeForm}
											value={dataForm.ward}
											isValid={dataForm.ward}
											isTouched={dataForm.ward}
										/>
									</FormGroup>

									<FormGroup id='line' label='Line' className='col-6'>
										<Input onChange={onChangeForm} value={dataForm.line} />
									</FormGroup>

									<FormGroup id='zip' label='Zip' className='col-md-6'>
										<Input onChange={onChangeForm} value={dataForm.zip} />
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
									id='rolee'
									label={ROLE[i].name}
									name='role'
									value={ROLE[i].name}
									onChange={onChangeForm}
									checked={dataForm.role}
								/>
							))}
						</ChecksGroup>
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
				<Button color='info' onClick={PostAccount}>
					Save
				</Button>
			</ModalFooter>
		</Modal>
	);
};
NewAccountCustomor.propTypes = {
	isOpen: PropTypes.bool.isRequired,
	setIsOpen: PropTypes.func.isRequired,
};

export default NewAccountCustomor;
