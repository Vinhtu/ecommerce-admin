import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';

import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import moment from 'moment';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import Select from '../../../components/bootstrap/forms/Select';
import storage from '../../../firebase';
import Avatar from '../../../components/Avatar';
import Modal, {
	ModalBody,
	ModalFooter,
	ModalHeader,
	ModalTitle,
} from '../../../components/bootstrap/Modal';
// import data from '../../../common/data/dummyCustomerData';
import FormGroup from '../../../components/bootstrap/forms/FormGroup';
import Input from '../../../components/bootstrap/forms/Input';
import Card, {
	CardBody,
	CardHeader,
	CardLabel,
	CardTitle,
} from '../../../components/bootstrap/Card';
import Button from '../../../components/bootstrap/Button';
// import PAYMENTS from '../../../common/data/enumPaymentMethod';
import { PostProduct } from '../../../redux/actions/products';
import { GetSizes } from '../../../redux/actions/sizes';
import { GetColors } from '../../../redux/actions/colors';

// import { isContentEditable } from '@testing-library/user-event/dist/utils';

// let arrSize = [];
const NewProduct = ({ isOpen, setIsOpen }) => {
	const dispatch = useDispatch();

	const [size, setSize] = React.useState();
	const [color, setColor] = React.useState();
	const [arrSizes, setArrSizes] = React.useState([]);
	const [arrColors, setArrColors] = React.useState([]);

	const today = new Date();
	const thumbnailchildrens = [];
	const { sizeList } = useSelector((state) => state.size);
	const { colorList } = useSelector((state) => state.color);
	const formatdate = moment(today).format('YYYY-MM-DD');
	const [avatar, setAvatar] = React.useState(
		'https://toppng.com/uploads/preview/roger-berry-avatar-placeholder-11562991561rbrfzlng6h.png',
	);
	const [thumbnailchildren, setThumbnailchildren] = React.useState(
		'https://toppng.com/uploads/preview/roger-berry-avatar-placeholder-11562991561rbrfzlng6h.png',
	);

	const [dataform, setDataForm] = React.useState({
		code: '',
		name: '',
		price: '',
		p_price: '',
		brand: '',
		category: '',
		amount: '',
		affilateshop: '',
		create_date: formatdate,
		thumbnail: '',
		status: 'Normal',
		size: [],
		arrSize: [{}],
	});

	useEffect(() => {
		dispatch(GetSizes());
		dispatch(GetColors());
		
	}, [dispatch]);

	const handleChange = (e) => {
		setDataForm({ ...dataform, [e.target.id]: e.target.value });
	};

	const handleImageAsFile = (e) => {
		const image = e.target.files[0];
		const imageRef = ref(storage, `images/${image.name}`);
		uploadBytes(imageRef, image).then((res) =>
			getDownloadURL(res.ref).then((url) => setDataForm({ ...dataform, thumbnail: url })),
		);
	};
	const deleteAvatar = () => {
		setAvatar('');
	};

	const handleThumnailchildren = (e) => {
		const image = e.target.files[0];
		const imageRef = ref(storage, `thumbnailchildrens/${image.name}`);
		uploadBytes(imageRef, image).then((res) =>
			getDownloadURL(res.ref).then((url) =>
				thumbnailchildrens.push({ code: 'thumbnailchildren', thumbnail: url }),
			),
		);
	};
	const deleteThumnailChildren = () => {
		setThumbnailchildren('');
	};

	const postProductFrom = () => {
		console.log(dataform, 'dâtfrom');
		dispatch(PostProduct(dataform, thumbnailchildrens));
		setIsOpen(false);
	};

	const handleSize = (e) => {
		setSize(e.target.value);
		setArrSizes((current) => [...current, { name: e.target.value }]);
	};

	const handleColor = (e) => {
		setColor(e.target.value);
		setArrColors((current) => [...current, { name: e.target.value }]);
	};
	const selectSize = [];
	if (sizeList) {
		for (let i = 0; i < sizeList.data.results.length; i += 1) {
			selectSize.push({
				value: sizeList.data.results[i].name,
				text: sizeList.data.results[i].name,
			});
		}
	}

	const selectColor = [];
	if (colorList) {
		for (let i = 0; i < colorList.data.results.length; i += 1) {
			selectColor.push({
				value: colorList.data.results[i].name,
				text: colorList.data.results[i].name,
			});
		}
	}
	const deletePositionSize = (name) => {
		setArrSizes(arrSizes.filter((items) => items.name !== name));
	};

	const deletePositionColor = (name) => {
		setArrColors(arrColors.filter((items) => items.name !== name));
	};

	console.log(arrSizes, 'arr trong state');
	return (
		<Modal isOpen={isOpen} setIsOpen={setIsOpen} size='xl'>
			<ModalHeader setIsOpen={setIsOpen} className='p-4'>
				<ModalTitle>New Product</ModalTitle>
			</ModalHeader>
			<ModalBody className='px-4'>
				<div className='row g-4'>
					<FormGroup id='code' label='Code' className='col-md-3'>
						<Input onChange={handleChange} value={dataform.code} />
					</FormGroup>
					<FormGroup id='name' label='Name' className='col-md-3'>
						<Input onChange={handleChange} value={dataform.name} />
					</FormGroup>
					<FormGroup id='price' label='Price' className='col-md-3'>
						<Input onChange={handleChange} value={dataform.price} />
					</FormGroup>
					<FormGroup id='p_price' label='Promotion Price' className='col-md-3'>
						<Input onChange={handleChange} value={dataform.p_price} />
					</FormGroup>
					<FormGroup id='brand' label='Brand' className='col-md-3'>
						<Input onChange={handleChange} value={dataform.brand} />
					</FormGroup>
					<FormGroup id='category' label='Category' className='col-md-3'>
						<Input onChange={handleChange} value={dataform.category} />
					</FormGroup>
					<FormGroup id='amount' label='Amount' className='col-md-3'>
						<Input onChange={handleChange} value={dataform.amount} />
					</FormGroup>
					<FormGroup id='affilateshop' label='Affilate Shop' className='col-md-3'>
						<Input onChange={handleChange} value={dataform.affilateshop} />
					</FormGroup>
					<div className='col-md-3'>
						<FormGroup id='size' label='Size' className='col-md-12'>
							<Select
								ariaLabel='Position'
								placeholder='Choose...'
								list={selectSize}
								onChange={handleSize}
								value={size}
								isValid={size}
								isTouched={size}
								// invalidFeedback={formik.errors.state}
							/>
						</FormGroup>
						{arrSizes.length > 0 && (
							<div style={{ display: 'flex', padding: '4px 8px', flexWrap: 'wrap' }}>
								{arrSizes.map((item) => {
									return (
										<div
											style={{
												padding: 4,
												borderRadius: 4,
												backgroundColor: '#FBFBFB',
												marginTop: 4,
												marginRight: 4,
												fontSize: 12,
												position: 'relative',
											}}>
											{item.name}
											<div
												onClick={() => deletePositionSize(item.name)}
												onKeyDown={() => deletePositionSize(item.name)}
												role='button'
												tabIndex='0'
												style={{
													position: 'absolute',
													top: 0,
													right: 0,
													color: 'red',
													zIndex: 1,
													fontSize: 10,
													display: 'flex',
													justifyContent: 'center',
													alignItems: 'center',
													width: 10,
													height: 10,
													borderRadius: 50,
													backgroundColor: '#FBECE9',
													cursor: 'pointer',
												}}>
												x
											</div>
										</div>
									);
								})}
							</div>
						)}
					</div>
					<div className='col-md-3'>
						<FormGroup id='color' label='Color' className='col-md-12'>
							<Select
								ariaLabel='Position'
								placeholder='Choose...'
								list={selectColor}
								onChange={handleColor}
								value={color}
								isValid={color}
								isTouched={color}
								// invalidFeedback={formik.errors.state}
							/>
						</FormGroup>
						{arrColors.length > 0 && (
							<div style={{ display: 'flex', padding: '4px 8px', flexWrap: 'wrap' }}>
								{arrColors.map((item) => {
									return (
										<div
											style={{
												padding: 4,
												borderRadius: 4,
												backgroundColor: '#FBFBFB',
												marginTop: 4,
												marginRight: 4,
												fontSize: 12,
												position: 'relative',
											}}>
											{item.name}
											<div
												onClick={() => deletePositionColor(item.name)}
												onKeyDown={() => deletePositionColor(item.name)}
												role='button'
												tabIndex='0'
												style={{
													position: 'absolute',
													top: 0,
													right: 0,
													color: 'red',
													zIndex: 1,
													fontSize: 10,
													display: 'flex',
													justifyContent: 'center',
													alignItems: 'center',
													width: 10,
													height: 10,
													borderRadius: 50,
													backgroundColor: '#FBECE9',
													cursor: 'pointer',
												}}>
												x
											</div>
										</div>
									);
								})}
							</div>
						)}
					</div>
					<FormGroup id='create_date' label='Create Date' className='col-md-3'>
						<Input onChange={handleChange} value={dataform.create_date} />
					</FormGroup>
					<FormGroup id='status' label='Status' className='col-md-3'>
						<Input onChange={handleChange} value={dataform.status} />
					</FormGroup>
					<div />

					<div className='col-md-6'>
						<Card className='rounded-1 mb-0'>
							<CardHeader>
								<CardLabel icon='LocalShipping'>
									<CardTitle>Thumbnail</CardTitle>
								</CardLabel>
							</CardHeader>
							<CardBody className='row'>
								<div className='col g-1'>
									<div className='col-lg-auto'>
										<Avatar
											style={{ width: 100, height: 100 }}
											srcSet={avatar}
											src={avatar}
											// color={USERS.JOHN.color}
										/>
									</div>

									<div style={{ display: 'flex' }}>
										<div className='mt-1' style={{ width: 76 }}>
											<Input
												type='file'
												autoComplete='photo'
												onChange={handleImageAsFile}
											/>
										</div>

										<div className='mt-1'>
											<Button
												color='dark'
												isLight
												icon='Delete'
												onClick={() => deleteAvatar()}
											/>
										</div>
									</div>
								</div>
								<div className='col g-1'>
									<div className='col-lg-auto'>
										<Avatar
											style={{ width: 100, height: 100 }}
											srcSet={thumbnailchildren}
											src={thumbnailchildren}
											// color={USERS.JOHN.color}
										/>
									</div>

									<div style={{ display: 'flex' }}>
										<div className='mt-1' style={{ width: 76 }}>
											<Input
												type='file'
												autoComplete='photo'
												onChange={handleThumnailchildren}
											/>
										</div>

										<div className='mt-1'>
											<Button
												color='dark'
												isLight
												icon='Delete'
												onClick={() => deleteThumnailChildren()}
											/>
										</div>
									</div>
								</div>
								<div className='col g-1'>
									<div className='col-lg-auto'>
										<Avatar
											style={{ width: 100, height: 100 }}
											srcSet={thumbnailchildren}
											src={thumbnailchildren}
											// color={USERS.JOHN.color}
										/>
									</div>

									<div style={{ display: 'flex' }}>
										<div className='mt-1' style={{ width: 76 }}>
											<Input
												type='file'
												autoComplete='photo'
												onChange={handleThumnailchildren}
											/>
										</div>

										<div className='mt-1'>
											<Button
												color='dark'
												isLight
												icon='Delete'
												onClick={() => deleteThumnailChildren()}
											/>
										</div>
									</div>
								</div>
								<div className='col g-1'>
									<div className='col-lg-auto'>
										<Avatar
											style={{ width: 100, height: 100 }}
											srcSet={thumbnailchildren}
											src={thumbnailchildren}
											// color={USERS.JOHN.color}
										/>
									</div>

									<div style={{ display: 'flex' }}>
										<div className='mt-1' style={{ width: 76 }}>
											<Input
												type='file'
												autoComplete='photo'
												onChange={handleThumnailchildren}
											/>
										</div>

										<div className='mt-1'>
											<Button
												color='dark'
												isLight
												icon='Delete'
												onClick={() => deleteAvatar()}
											/>
										</div>
									</div>
								</div>
							</CardBody>
						</Card>
					</div>
				</div>
			</ModalBody>
			<ModalFooter className='px-4 pb-4'>
				<Button color='info' onClick={() => postProductFrom()}>
					Save
				</Button>
			</ModalFooter>
		</Modal>
	);
};
NewProduct.propTypes = {
	isOpen: PropTypes.bool.isRequired,
	setIsOpen: PropTypes.func.isRequired,
};

export default NewProduct;
