import React, { useEffect } from 'react';
//  import { moment} from 'moment'
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useLocation } from "react-router-dom";

// import moment from 'moment';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import Select from '../../../components/bootstrap/forms/Select';
import storage from '../../../firebase';

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
	CardHeader,
	CardLabel,
	CardTitle,
} from '../../../components/bootstrap/Card';
import Modal, {
	ModalBody,
	ModalFooter,
	ModalHeader,
	ModalTitle,
} from '../../../components/bootstrap/Modal';
import Input from '../../../components/bootstrap/forms/Input';
import FormGroup from '../../../components/bootstrap/forms/FormGroup';
import { PostProduct } from '../../../redux/actions/products';
import { GetSizes } from '../../../redux/actions/sizes';
import { GetColors } from '../../../redux/actions/colors';
import { GetBrands } from '../../../redux/actions/brands';
import { GetCategorys } from '../../../redux/actions/categorys';
import { GetAffilateshops } from '../../../redux/actions/affilateshops';

import Icon from '../../../components/icon/Icon';
import Textarea from '../../../components/bootstrap/forms/Textarea';

const EditEvent = () => {
	const location = useLocation();
	console.log(location.state.item,'location.state.item')

	const dispatch = useDispatch();
	const navigate = useNavigate();

	const [color, setColor] = React.useState();
	const [isOpenColor, setIsOpenColor] = React.useState(false);
	const [isOpenEditColor, setIsOpenEditColor] = React.useState(false);
	const [isOpenDescription, setIsOpenDescription] = React.useState(false);

	const [colorVitural, setColorVitural] = React.useState();
	const [amountVitural, setAmountVitural] = React.useState();

	const [thumbnailColorVitural, setThumbnailColorVitural] = React.useState(location.state.item.thumbnail);
	const [sizeVitural, setSizeVitural] = React.useState();
	const [priceSizeVitural, setPriceSizeVitural] = React.useState();
	const [priceSizePromotionVitural, setPriceSizePromotionVitural] = React.useState();
	const [arrSizePriceVitural, setArrSizePriceVitural] = React.useState([]);
	const [arrColorThumbnailSizePriceVitural, setArrColorThumbnailSizePriceVitural] =
		React.useState(location.state.item.color);

	const [bodyDescriptionVitural, setBodyDescriptionVitural] = React.useState();
	const [thumbnailDescriptionVitural, setThumbnailDescriptionVitural] = React.useState();
	const [arrBodyDescription, setArrBodyDescription] = React.useState(location.state.item.description);

	const [fullShowDescription, setFullShowDescription] = React.useState(false);
	const [fullShowSizeColor, setFullShowSizeColor] = React.useState(false);

	const [thumbnailMain, setThumbnailMain] = React.useState(location.state.item.thumbnail);
	const [arrThumbnailChildren, setArrThumbnailChildren] = React.useState(location.state.item.thumbnail_children);

	// const today = new Date();
	const { sizeList } = useSelector((state) => state.size);
	const { colorList } = useSelector((state) => state.color);
	const { brandList } = useSelector((state) => state.brand);
	const { categoryList } = useSelector((state) => state.category);
	const { affilateshopList } = useSelector((state) => state.affilateshop);
	// const formatdate = moment(today).format('YYYY-MM-DD');

	const [dataform, setDataForm] = React.useState({
		code: location.state.item.code,
		name: location.state.item.name,
		brand: location.state.item.brand,
		category: location.state.item.category,
		affilateshop: location.state.item.affilateshop,
		create_date: location.state.item.create_date,
		status: location.state.item.status,
	});

	useEffect(() => {
		dispatch(GetSizes());
		dispatch(GetColors());
		dispatch(GetBrands());
		dispatch(GetCategorys());
		dispatch(GetAffilateshops());
	}, [dispatch]);

	const handleChange = (e) => {
		setDataForm({ ...dataform, [e.target.id]: e.target.value });
	};

	const handleColor = (e) => {
		setColor(e.target.value);
		setColorVitural(e.target.value);
		// setArrColors((current) => [...current, { name: e.target.value }]);
		setIsOpenColor(true);
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
	

	const selectBrand = [];
	if (brandList) {
		for (let i = 0; i < brandList.data.results.length; i += 1) {
			selectBrand.push({
				value: brandList.data.results[i].name,
				text: brandList.data.results[i].name,
			});
		}
	}
	const selectCategory = [];
	if (categoryList) {
		for (let i = 0; i < categoryList.data.results.length; i += 1) {
			selectCategory.push({
				value: categoryList.data.results[i].name,
				text: categoryList.data.results[i].name,
			});
		}
	}
	const selectAffilateshop = [];
	if (affilateshopList) {
		for (let i = 0; i < affilateshopList.data.results.length; i += 1) {
			selectAffilateshop.push({
				value: affilateshopList.data.results[i].name,
				text: affilateshopList.data.results[i].name,
			});
		}
	}
	const selectStatus = [
		{ value: 'Normal', text: 'Normal' },
		{ value: 'Pending', text: 'Pending' },
		{ value: 'Destroy', text: 'Destroy' },
	];

	// const deletePositionColor = (name) => {
	// 	setArrColors(arrColors.filter((items) => items.name !== name));
	// };

	const handleSetThumbnailColor = (e) => {
		const image = e.target.files[0];
		const imageRef = ref(storage, `thumbnailcolors/${image.name}`);
		uploadBytes(imageRef, image).then((res) =>
			getDownloadURL(res.ref).then((url) => setThumbnailColorVitural(url)),
		);
	};

	const handleSizeVitural = (e) => {
		setSizeVitural(e.target.value);
	};
	const handleAmountVitural = (e) => {
		setAmountVitural(e.target.value);
	};

	const deleteThumbnailColor = () => {
		setThumbnailColorVitural('');
	};
	const deleteSizeVitural = () => {
		setSizeVitural('');
		setPriceSizeVitural('');
		setPriceSizePromotionVitural('');
	};

	const addArrSizePrice = () => {
		setArrSizePriceVitural((current) => [
			...current,
			{
				name: sizeVitural,
				price: priceSizeVitural,
				p_price: priceSizePromotionVitural,
				amount: amountVitural,
			},
		]);
		setSizeVitural('');
		setPriceSizeVitural('');
		setPriceSizePromotionVitural('');
	};

	const deleteArrSizePriceVitural = (data) => {
		setArrSizePriceVitural(arrSizePriceVitural.filter((items) => items.name !== data));
	};
	const saveColor = () => {
		setArrColorThumbnailSizePriceVitural((current) => [
			...current,
			{
				name: colorVitural,
				thumbanil: thumbnailColorVitural,
				size: arrSizePriceVitural,
			},
		]);
		setSizeVitural('');
		setThumbnailColorVitural('');
		setPriceSizeVitural('');
		setPriceSizePromotionVitural('');
		setArrSizePriceVitural([]);
		setAmountVitural('');
		setIsOpenColor(false);
	};
	const deleteArrColor = (data) => {
		setArrColorThumbnailSizePriceVitural(
			arrColorThumbnailSizePriceVitural.filter((items) => items.name !== data),
		);
	};

	const editArrColor = (e) => {
		
		setColorVitural(e.name);
		setThumbnailColorVitural(e.thumbnail);
		setArrSizePriceVitural(e.size);
		// setAmountVitural(e.amount);
		setIsOpenEditColor(true);
	};

	const saveEditColor = () => {
		setArrColorThumbnailSizePriceVitural(
			arrColorThumbnailSizePriceVitural.filter((items) => items.name !== colorVitural),
		);
		setArrColorThumbnailSizePriceVitural((current) => [
			...current,
			{
				name: colorVitural,
				thumbnail: thumbnailColorVitural,
				size: arrSizePriceVitural,
				
			},
		]);
		setSizeVitural('');
		setThumbnailColorVitural('');
		setPriceSizeVitural('');
		setPriceSizePromotionVitural('');
		setArrSizePriceVitural([]);
		setAmountVitural('');
		setIsOpenEditColor(false);
	};

	const handleDescription = () => {
		setIsOpenDescription(true);
	};

	const deleteThumbnailDescriptionVitural = () => {
		setThumbnailDescriptionVitural('');
	};

	const handleSetThumbnailDescriptionVitural = (e) => {
		const image = e.target.files[0];
		const imageRef = ref(storage, `thumbnailcolors/${image.name}`);
		uploadBytes(imageRef, image).then((res) =>
			getDownloadURL(res.ref).then((url) => setThumbnailDescriptionVitural(url)),
		);
	};

	const saveArrDescriptionVitural = () => {
		setArrBodyDescription((current) => [
			...current,
			{ body: bodyDescriptionVitural, thumbnail: thumbnailDescriptionVitural },
		]);
		setBodyDescriptionVitural('');
		setThumbnailDescriptionVitural('');
	};

	const deleteItemArrBodyDescription = (e) => {
		setArrBodyDescription(arrBodyDescription.filter((items) => items.body !== e));
	};

	const saveArrDescription = () => {
		setIsOpenDescription(false);
	};

	const handleThumbnailMain = (e) => {
		const image = e.target.files[0];
		const imageRef = ref(storage, `thumbnailcolors/${image.name}`);
		uploadBytes(imageRef, image).then((res) =>
			getDownloadURL(res.ref).then((url) => setThumbnailMain(url)),
		);
	};

	const deleteThumbnailMain = () => {
		setThumbnailMain('');
	};
	const handleThumbnailChildrenVitural = (e) => {
		const image = e.target.files[0];
		const imageRef = ref(storage, `thumbnailcolors/${image.name}`);
		uploadBytes(imageRef, image).then((res) =>
			getDownloadURL(res.ref).then((url) =>
				setArrThumbnailChildren((current) => [...current, { thumbnail: url }]),
			),
		);
	};

	const deleteItemThumbnailChildren = (e) => {
		setArrThumbnailChildren(
			arrThumbnailChildren.filter((items) => items.thumbnail !== e),
		);
	};

	const postProductFrom = () => {
		const data = {
			formdata: dataform,
			sizecolor: arrColorThumbnailSizePriceVitural,
			description: arrBodyDescription,
			thumbnailMain,
			thumbnailChildren: arrThumbnailChildren,
		};

		dispatch(PostProduct(data));
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
			<Page container='isfuld' className='m-3'>
				{/* <div className='display-4 fw-bold py-3'>{data.name}</div> */}
				<div className='row g-4'>
					<FormGroup id='code' label='Code' className='col-md-3'>
						<Input onChange={handleChange} value={dataform.code} />
					</FormGroup>
					<FormGroup id='name' label='Name' className='col-md-3'>
						<Input onChange={handleChange} value={dataform.name} />
					</FormGroup>
					<FormGroup id='brand' label='Brand' className='col-md-3'>
						<Select
							ariaLabel='Brand'
							placeholder='Choose brand'
							list={selectBrand}
							onChange={handleChange}
							value={dataform.brand}
							isValid={dataform.brand}
							isTouched={dataform.brand}
						/>
					</FormGroup>
					<FormGroup id='category' label='Category' className='col-md-3'>
						<Select
							ariaLabel='Category'
							placeholder='Choose category'
							list={selectCategory}
							onChange={handleChange}
							value={dataform.category}
							isValid={dataform.category}
							isTouched={dataform.category}
						/>
					</FormGroup>
					<FormGroup id='affilateshop' label='Affilate Shop' className='col-md-3'>
						<Select
							ariaLabel='Affilate Shop'
							placeholder='Choose affilate shop'
							list={selectAffilateshop}
							onChange={handleChange}
							value={dataform.affilateshop}
							isValid={dataform.affilateshop}
							isTouched={dataform.affilateshop}
						/>
					</FormGroup>
					<FormGroup id='status' label='Status' className='col-md-3'>
						<Select
							ariaLabel='status'
							placeholder='Choose status'
							list={selectStatus}
							onChange={handleChange}
							value={dataform.status}
							isValid={dataform.status}
							isTouched={dataform.status}
						/>
					</FormGroup>
					<FormGroup id='create_date' label='create_date' className='col-md-3'>
						<Input onChange={handleChange} value={dataform.create_date} />
					</FormGroup>

					{/* Color ------------------ */}
					<div className='col-md-6'>
						<FormGroup id='color' label='Color' className='col-md-12'>
							<Select
								ariaLabel='Position'
								placeholder='Choose...'
								list={selectColor}
								onChange={handleColor}
								value={color}
								isValid={color}
								isTouched={color}
							/>
						</FormGroup>

						{arrColorThumbnailSizePriceVitural.length > 0 && (
							<div
								style={
									fullShowSizeColor
										? { display: 'block', position: 'relative' }
										: { height: 300, overflow: 'hidden', position: 'relative' }
								}>
								{arrColorThumbnailSizePriceVitural.map((item) => {
									return (
										<div
											style={{
												marginTop: 8,
												padding: '8px 16px',
												borderWidth: 1,
												borderStyle: 'dashed',
												borderRadius: 10,
												borderColor: '#E9E5E5',
												position: 'relative',
											}}>
											<div
												style={{
													display: 'flex',
													justifyContent: 'space-between',
												}}>
												<div>Color: {item.name}</div>
												<div
													style={{
														cursor: 'pointer',
														color: 'red',
														fontSize: 10,
													}}
													onClick={() => editArrColor(item)}
													onKeyDown={() => editArrColor(item)}
													role='button'
													tabIndex='0'>
													Edit
												</div>
											</div>

											<div
												style={{
													display: 'flex',
												}}>
												<div style={{ marginRight: 8 }}>
													<div
														style={{
															width: 80,
															height: 80,
															borderRadius: 10,
															display: 'flex',
															justifyContent: 'center',
															alignItems: 'center',
															borderStyle: 'dashed',
															borderColor: '#E9E5E5',
															backgroundImage: `url(${item.thumbnail}`,
															backgroundSize: 'cover',
															cursor: 'pointer',
															'&:hover': {
																opacity: 0.5,
															},
															position: 'relative',
														}}
													/>
												</div>
												<div style={{ display: 'flex', flexWrap: 'wrap' }}>
													{item.size.map((i) => {
														return (
															<div
																style={{
																	height: 32,
																	padding: '4px 8px',
																	borderRadius: 4,
																	backgroundColor: '#FBECE9',
																	display: 'flex',
																	justifyContent: 'center',
																	alignItems: 'center',
																	marginRight: 4,
																	marginTop: 4,
																	fontSize: 12,
																	position: 'relative',
																}}>
																{i.name} - {i.price}đ - {i.p_price}đ 
																- {i.amount}
															</div>
														);
													})}
												</div>
											</div>
											<div
												onClick={() => deleteArrColor(item.name)}
												onKeyDown={() => deleteArrColor(item.name)}
												role='button'
												tabIndex='0'
												style={{
													position: 'absolute',
													top: -4,
													right: -4,
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
								{arrColorThumbnailSizePriceVitural.length > 1 && (
									<div>
										<div
											style={{
												position: 'absolute',
												bottom: 0,
												width: '100%',
												height: 60,
												backgroundColor: 'red',
												backgroundImage:
													'linear-gradient(to top , black, white)',
												zIndex: 1,
												opacity: 0.2,
												borderBottomLeftRadius: 10,
												borderBottomRightRadius: 10,
											}}
										/>
										<div
											style={{
												display: 'flex',
												justifyContent: 'center',
												position: 'absolute',
												width: '100%',
												bottom: 0,
												zIndex: 2,
											}}>
											<Button
												style={{
													margin: '8px',
												}}
												color='info'
												outlited
												className='col-md-3'
												onClick={() =>
													setFullShowSizeColor(!fullShowSizeColor)
												}>
												{fullShowSizeColor === true
													? 'Hidden more'
													: `Show more ${arrColorThumbnailSizePriceVitural.length}`}
											</Button>
										</div>
									</div>
								)}
							</div>
						)}
					</div>
					{/* Description --------------------------------*/}
					<div className='col-md-6'>
						<FormGroup id='' label='Description'>
							<Input
								onClick={handleDescription}
								placeholder='Click add or edit description'
							/>
						</FormGroup>
						{arrBodyDescription.length > 0 && (
							<div
								style={
									fullShowDescription
										? { display: 'block', position: 'relative' }
										: { height: 300, overflow: 'hidden', position: 'relative' }
								}>
								{arrBodyDescription.map((item) => {
									return (
										<div className='col-md-12'>
											<div
												style={{
													marginTop: 8,
													padding: '8px 16px',
													borderWidth: 1,
													borderStyle: 'dashed',
													borderRadius: 10,
													borderColor: '#E9E5E5',
													alignItems: 'center',
													position: 'relative',
												}}>
												<div style={{ marginBottom: 16 }}>{item.body}</div>
												{item.thumbnail && (
													<div
														style={{
															width: '100%',
															height: 200,
															borderRadius: 10,
															display: 'flex',
															justifyContent: 'center',
															alignItems: 'center',
															borderColor: '#E9E5E5',
															backgroundImage: `url(${item.thumbnail})`,
															backgroundSize: 'cover',
															cursor: 'pointer',
															'&:hover': {
																opacity: 0.5,
															},
														}}
													/>
												)}

												<div
													onClick={() =>
														deleteItemArrBodyDescription(item.body)
													}
													onKeyDown={() =>
														deleteItemArrBodyDescription(item.body)
													}
													role='button'
													tabIndex='0'
													style={{
														position: 'absolute',
														top: -4,
														right: -4,
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
										</div>
									);
								})}
								{arrBodyDescription.length > 1 && (
									<div>
										<div
											style={{
												position: 'absolute',
												bottom: 0,
												width: '100%',
												height: 60,
												backgroundColor: 'red',
												backgroundImage:
													'linear-gradient(to top , black, white)',
												zIndex: 1,
												opacity: 0.2,
												borderBottomLeftRadius: 10,
												borderBottomRightRadius: 10,
											}}
										/>
										<div
											style={{
												display: 'flex',
												justifyContent: 'center',
												position: 'absolute',
												width: '100%',
												bottom: 0,
												zIndex: 2,
											}}>
											<Button
												style={{
													margin: '8px',
												}}
												color='info'
												outlited
												className='col-md-3'
												onClick={() =>
													setFullShowDescription(!fullShowDescription)
												}>
												{fullShowDescription === true
													? 'Hidden more'
													: `Show more ${arrBodyDescription.length}`}
											</Button>
										</div>
									</div>
								)}
							</div>
						)}
					</div>

					<div />
					{/* Thumbnail------------- */}
					<div className='col-md-6'>
						<Card className='rounded-1 mb-0'>
							<CardHeader>
								<CardLabel icon='LocalShipping'>
									<CardTitle>Thumbnail</CardTitle>
								</CardLabel>
							</CardHeader>
							<CardBody className='row'>
								<div className='mt-2 mb-2'>
									<div
										style={{
											width: '100%',
											height: 200,
											borderRadius: 10,
											display: 'flex',
											justifyContent: 'center',
											alignItems: 'center',
											borderWidth: thumbnailMain ? 0 : 1,
											borderStyle: 'dashed',
											borderColor: '#E9E5E5',
											backgroundImage: `url(${thumbnailMain}`,
											backgroundSize: 'cover',
											cursor: 'pointer',
											'&:hover': {
												opacity: 0.5,
											},
											position: 'relative',
										}}>
										{thumbnailMain ? (
											<label htmlFor='img-input'>
												<h1 style={{ color: '#E9E5E5', cursor: 'pointer' }}>
													<Icon icon='edit' style={{ fontSize: 26 }} />
												</h1>
											</label>
										) : (
											<label htmlFor='img-input'>
												<h1 style={{ color: '#E9E5E5', cursor: 'pointer' }}>
													+
												</h1>
											</label>
										)}

										<input
											id='img-input'
											style={{ display: 'none' }}
											type='file'
											autoComplete='photo'
											onChange={handleThumbnailMain}
										/>
										{thumbnailMain && (
											<div
												onClick={() => deleteThumbnailMain()}
												onKeyDown={() => deleteThumbnailMain()}
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
								<div style={{ display: 'flex' }}>
									{arrThumbnailChildren && (
										<div className='mt-2 mb-2' style={{ display: 'flex' }}>
											{arrThumbnailChildren.map((item) => {
												return (
													<div
														style={{
															width: 80,
															height: 80,
															borderRadius: 10,
															display: 'flex',
															justifyContent: 'center',
															alignItems: 'center',
															borderWidth: 0,
															marginRight: 8,
															borderColor: '#E9E5E5',
															backgroundImage: `url(${item.thumbnail}`,
															backgroundSize: 'cover',
															cursor: 'pointer',
															'&:hover': {
																opacity: 0.5,
															},
															position: 'relative',
														}}>
														<div
															onClick={() =>
																deleteItemThumbnailChildren(
																	item.thumbnail,
																)
															}
															onKeyDown={() =>
																deleteItemThumbnailChildren(
																	item.thumbnail,
																)
															}
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
															<Icon
																icon='clear'
																style={{ fontSize: 14 }}
															/>
														</div>
													</div>
												);
											})}
										</div>
									)}
									<div className='mt-2 mb-2'>
										<div
											style={{
												width: 80,
												height: 80,
												borderRadius: 10,
												display: 'flex',
												justifyContent: 'center',
												alignItems: 'center',
												borderWidth: 1,
												borderStyle: 'dashed',
												borderColor: '#E9E5E5',
												backgroundImage: `url(''}`,
												backgroundSize: 'cover',
												cursor: 'pointer',
												'&:hover': {
													opacity: 0.5,
												},
												position: 'relative',
											}}>
											<label htmlFor='img-input-children'>
												<h1 style={{ color: '#E9E5E5', cursor: 'pointer' }}>
													+
												</h1>
											</label>

											<input
												id='img-input-children'
												style={{ display: 'none' }}
												type='file'
												autoComplete='photo'
												onChange={handleThumbnailChildrenVitural}
											/>
										</div>
									</div>
								</div>
							</CardBody>
						</Card>
					</div>
				</div>
				<div className='mt-3' style={{ display: 'flex', justifyContent: 'flex-end' }}>
					<Button color='info' className='col-md-3' onClick={() => postProductFrom()}>
						New Product
					</Button>
				</div>
			</Page>

			{/* Modal New Color----------- */}
			<Modal isOpen={isOpenColor} setIsOpen={setIsOpenColor} size='xl'>
				<ModalHeader setIsOpen={setIsOpenColor} className='p-4'>
					<ModalTitle>New Color</ModalTitle>
				</ModalHeader>
				<ModalBody className='px-4'>
					<div className='row g-4 col-md-12'>
						<div className='col-md-3'>
							<FormGroup id='color' label='Color'>
								<Input value={colorVitural} />
							</FormGroup>

							<div className='mt-2'>
								<div
									style={{
										width: 80,
										height: 80,
										borderRadius: 10,
										display: 'flex',
										justifyContent: 'center',
										alignItems: 'center',
										borderWidth: thumbnailColorVitural ? 0 : 1,
										borderStyle: 'dashed',
										borderColor: '#E9E5E5',
										backgroundImage: `url(${thumbnailColorVitural}`,
										backgroundSize: 'cover',
										cursor: 'pointer',
										'&:hover': {
											opacity: 0.5,
										},
										position: 'relative',
									}}>
									{thumbnailColorVitural ? (
										<label htmlFor='img-input-color'>
											<h1 style={{ color: '#E9E5E5', cursor: 'pointer' }}>
												<Icon icon='edit' style={{ fontSize: 26 }} />
											</h1>
										</label>
									) : (
										<label htmlFor='img-input-color'>
											<h1 style={{ color: '#E9E5E5', cursor: 'pointer' }}>
												+
											</h1>
										</label>
									)}

									<input
										id='img-input-color'
										style={{ display: 'none' }}
										type='file'
										autoComplete='photo'
										onChange={handleSetThumbnailColor}
									/>
									{thumbnailColorVitural && (
										<div
											onClick={() => deleteThumbnailColor()}
											onKeyDown={() => deleteThumbnailColor()}
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
						</div>
						<div className='col-md-9'>
							<FormGroup id='size' label='Size'>
								<Select
									ariaLabel='Size'
									placeholder='Choose Size'
									list={selectSize}
									onChange={handleSizeVitural}
									value={sizeVitural}
									isValid={sizeVitural}
									isTouched={sizeVitural}
								/>
							</FormGroup>
							{sizeVitural && (
								<div
									style={{
										display: 'flex',
										marginTop: 8,
										padding: '8px 16px',
										borderWidth: 1,
										borderStyle: 'dashed',
										borderRadius: 10,
										borderColor: '#E9E5E5',
										alignItems: 'center',
									}}>
									<div
										style={{
											padding: 4,
											borderRadius: 4,
											backgroundColor: '#FBECE9',
											display: 'flex',
											justifyContent: 'center',
											alignItems: 'center',
											marginRight: 4,
											width: 32,
											fontSize: 12,
											position: 'relative',
										}}>
										{sizeVitural}
										<div
											onClick={() => deleteSizeVitural()}
											onKeyDown={() => deleteSizeVitural()}
											role='button'
											tabIndex='0'
											style={{
												position: 'absolute',
												top: -4,
												right: -4,
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
									<FormGroup id='priceSizeVitural' style={{ marginRight: 8 }}>
										<Input
											placeholder='Price size'
											onChange={(e) => setPriceSizeVitural(e.target.value)}
											value={priceSizeVitural}
										/>
									</FormGroup>
									<FormGroup
										id='priceSizePromotionVitural'
										style={{ marginRight: 8 }}>
										<Input
											placeholder='Price promotion'
											onChange={(e) =>
												setPriceSizePromotionVitural(e.target.value)
											}
											value={priceSizePromotionVitural}
										/>
									</FormGroup>
									<FormGroup id='amountVitural'>
										<Input
											placeholder='Amount'
											onChange={handleAmountVitural}
											value={amountVitural}
										/>
									</FormGroup>

									<Icon
										icon='ArrowForward'
										style={{
											fontSize: 24,
											marginLeft: 16,
											color: 'black',
											justifyContent: 'center',
										}}
										onClick={addArrSizePrice}
									/>
								</div>
							)}
							{arrSizePriceVitural.length > 0 && (
								<div
									style={{
										display: 'flex',
										marginTop: 8,
										padding: '8px 16px',
										borderWidth: 1,
										borderStyle: 'dashed',
										borderRadius: 10,
										borderColor: '#E9E5E5',
										alignItems: 'center',
										flexWrap: 'wrap',
									}}>
									{arrSizePriceVitural.map((item) => {
										return (
											<div
												style={{
													padding: '4px 8px',
													borderRadius: 4,
													backgroundColor: '#FBECE9',
													display: 'flex',
													justifyContent: 'center',
													alignItems: 'center',
													marginRight: 4,
													marginTop: 4,
													fontSize: 12,
													position: 'relative',
												}}>
												{item.name} - {item.price}đ - {item.p_price}đ -{' '}
												{item.amount}
												<div
													onClick={() =>
														deleteArrSizePriceVitural(item.name)
													}
													onKeyDown={() =>
														deleteArrSizePriceVitural(item.name)
													}
													role='button'
													tabIndex='0'
													style={{
														position: 'absolute',
														top: -4,
														right: -4,
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
					</div>
				</ModalBody>
				<ModalFooter className='px-4 pb-4'>
					<Button color='info' onClick={() => saveColor()}>
						Save
					</Button>
				</ModalFooter>
			</Modal>

			{/* Modal Edit Color -------------- */}

			<Modal isOpen={isOpenEditColor} setIsOpen={setIsOpenEditColor} size='xl'>
				<ModalHeader setIsOpen={setIsOpenEditColor} className='p-4'>
					<ModalTitle>Edit Color</ModalTitle>
				</ModalHeader>
				<ModalBody className='px-4'>
					<div className='row g-4 col-md-12'>
						<div className='col-md-3'>
							<FormGroup id='color' label='Color'>
								<Input value={colorVitural} />
							</FormGroup>

							<div className='mt-2'>
								<div
									style={{
										width: 80,
										height: 80,
										borderRadius: 10,
										display: 'flex',
										justifyContent: 'center',
										alignItems: 'center',
										borderWidth: thumbnailColorVitural ? 0 : 1,
										borderStyle: 'dashed',
										borderColor: '#E9E5E5',
										backgroundImage: `url(${thumbnailColorVitural}`,
										backgroundSize: 'cover',
										cursor: 'pointer',
										'&:hover': {
											opacity: 0.5,
										},
										position: 'relative',
									}}>
									{thumbnailColorVitural ? (
										<label htmlFor='img-input-color'>
											<h1 style={{ color: '#E9E5E5', cursor: 'pointer' }}>
												<Icon icon='edit' style={{ fontSize: 26 }} />
											</h1>
										</label>
									) : (
										<label htmlFor='img-input-color'>
											<h1 style={{ color: '#E9E5E5', cursor: 'pointer' }}>
												+
											</h1>
										</label>
									)}

									<input
										id='img-input-color'
										style={{ display: 'none' }}
										type='file'
										autoComplete='photo'
										onChange={handleSetThumbnailColor}
									/>
									{thumbnailColorVitural && (
										<div
											onClick={() => deleteThumbnailColor()}
											onKeyDown={() => deleteThumbnailColor()}
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
						</div>
						<div className='col-md-9'>
							<FormGroup id='size' label='Size'>
								<Select
									ariaLabel='Size'
									placeholder='Choose Size'
									list={selectSize}
									onChange={handleSizeVitural}
									value={sizeVitural}
									isValid={sizeVitural}
									isTouched={sizeVitural}
								/>
							</FormGroup>
							{sizeVitural && (
								<div
									style={{
										display: 'flex',
										marginTop: 8,
										padding: '8px 16px',
										borderWidth: 1,
										borderStyle: 'dashed',
										borderRadius: 10,
										borderColor: '#E9E5E5',
										alignItems: 'center',
									}}>
									<div
										style={{
											padding: 4,
											borderRadius: 4,
											backgroundColor: '#FBECE9',
											display: 'flex',
											justifyContent: 'center',
											alignItems: 'center',
											marginRight: 4,
											width: 32,
											fontSize: 12,
											position: 'relative',
										}}>
										{sizeVitural}
										<div
											onClick={() => deleteSizeVitural()}
											onKeyDown={() => deleteSizeVitural()}
											role='button'
											tabIndex='0'
											style={{
												position: 'absolute',
												top: -4,
												right: -4,
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
									<FormGroup id='priceSizeVitural' style={{ marginRight: 8 }}>
										<Input
											placeholder='Price size'
											onChange={(e) => setPriceSizeVitural(e.target.value)}
											value={priceSizeVitural}
										/>
									</FormGroup>
									<FormGroup id='priceSizePromotionVitural' style={{ marginRight: 8 }}>
										<Input
											placeholder='Price promotion'
											onChange={(e) =>
												setPriceSizePromotionVitural(e.target.value)
											}
											value={priceSizePromotionVitural}
										/>
									</FormGroup>
									<FormGroup id='amountVitural' style={{ marginRight: 8 }}>
										<Input
											placeholder='Amount'
											onChange={handleAmountVitural}
											value={amountVitural}
										/>
									</FormGroup>

									<Icon
										icon='ArrowForward'
										style={{
											fontSize: 24,
											marginLeft: 16,
											color: 'black',
											justifyContent: 'center',
										}}
										onClick={addArrSizePrice}
									/>
								</div>
							)}
							{arrSizePriceVitural.length > 0 && (
								<div
									style={{
										display: 'flex',
										marginTop: 8,
										padding: '8px 16px',
										borderWidth: 1,
										borderStyle: 'dashed',
										borderRadius: 10,
										borderColor: '#E9E5E5',
										alignItems: 'center',
										flexWrap: 'wrap',
									}}>
									{arrSizePriceVitural.map((item) => {
										return (
											<div
												style={{
													padding: 4,
													borderRadius: 4,
													backgroundColor: '#FBECE9',
													display: 'flex',
													justifyContent: 'center',
													alignItems: 'center',
													marginRight: 4,
													marginTop: 4,
													fontSize: 12,
													position: 'relative',
												}}>
												{item.name} - {item.price}đ - {item.p_price}đ
												<div
													onClick={() =>
														deleteArrSizePriceVitural(item.name)
													}
													onKeyDown={() =>
														deleteArrSizePriceVitural(item.name)
													}
													role='button'
													tabIndex='0'
													style={{
														position: 'absolute',
														top: -4,
														right: -4,
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
					
					</div>
				</ModalBody>
				<ModalFooter className='px-4 pb-4'>
					<Button color='info' onClick={() => saveEditColor()}>
						Edit
					</Button>
				</ModalFooter>
			</Modal>

			{/* Modal New Description-------- */}

			<Modal isOpen={isOpenDescription} setIsOpen={setIsOpenDescription} size='xl'>
				<ModalHeader setIsOpen={setIsOpenDescription} className='p-4'>
					<ModalTitle>Add New Description</ModalTitle>
				</ModalHeader>
				<ModalBody className='px-4'>
					<div className='row g-4 col-md-12'>
						<div className='col-md-3' />
						<div className='col-md-6'>
							<FormGroup id='bodyDescriptionVitural' label='Body'>
								<Textarea
									multiple
									rows={4}
									value={bodyDescriptionVitural}
									onChange={(e) => setBodyDescriptionVitural(e.target.value)}
								/>
							</FormGroup>

							<div className='mt-2 mb-2'>
								<div
									style={{
										width: '100%',
										height: 200,
										borderRadius: 10,
										display: 'flex',
										justifyContent: 'center',
										alignItems: 'center',
										borderWidth: thumbnailDescriptionVitural ? 0 : 1,
										borderStyle: 'dashed',
										borderColor: '#E9E5E5',
										backgroundImage: `url(${thumbnailDescriptionVitural}`,
										backgroundSize: 'cover',
										cursor: 'pointer',
										'&:hover': {
											opacity: 0.5,
										},
										position: 'relative',
									}}>
									{thumbnailDescriptionVitural ? (
										<label htmlFor='img-input-description'>
											<h1 style={{ color: '#E9E5E5', cursor: 'pointer' }}>
												<Icon icon='edit' style={{ fontSize: 26 }} />
											</h1>
										</label>
									) : (
										<label htmlFor='img-input-description'>
											<h1 style={{ color: '#E9E5E5', cursor: 'pointer' }}>
												+
											</h1>
										</label>
									)}

									<input
										id='img-input-description'
										style={{ display: 'none' }}
										type='file'
										autoComplete='photo'
										onChange={handleSetThumbnailDescriptionVitural}
									/>
									{thumbnailDescriptionVitural && (
										<div
											onClick={() => deleteThumbnailDescriptionVitural()}
											onKeyDown={() => deleteThumbnailDescriptionVitural()}
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
							<Button
								color='info'
								onClick={() => saveArrDescriptionVitural()}
								style={{ float: 'right' }}>
								Save
							</Button>
						</div>

						<div className='col-md-3' />

						{arrBodyDescription &&
							arrBodyDescription.map((item) => {
								return (
									<div className='col-md-6'>
										<div
											style={{
												marginTop: 8,
												padding: '8px 16px',
												borderWidth: 1,
												borderStyle: 'dashed',
												borderRadius: 10,
												borderColor: '#E9E5E5',
												alignItems: 'center',
												position: 'relative',
											}}>
											<div style={{ marginBottom: 16 }}>{item.body}</div>
											{item.thumbnaildescription && (
												<div
													style={{
														width: '100%',
														height: 200,
														borderRadius: 10,
														display: 'flex',
														justifyContent: 'center',
														alignItems: 'center',
														borderColor: '#E9E5E5',
														backgroundImage: `url(${item.thumbnaildescription})`,
														backgroundSize: 'cover',
														cursor: 'pointer',
														'&:hover': {
															opacity: 0.5,
														},
													}}
												/>
											)}

											<div
												onClick={() =>
													deleteItemArrBodyDescription(item.body)
												}
												onKeyDown={() =>
													deleteItemArrBodyDescription(item.body)
												}
												role='button'
												tabIndex='0'
												style={{
													position: 'absolute',
													top: -4,
													right: -4,
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
									</div>
								);
							})}
					</div>
				</ModalBody>
				<ModalFooter className='px-4 pb-4'>
					<Button color='info' onClick={() => saveArrDescription()}>
						Save
					</Button>
				</ModalFooter>
			</Modal>
		</PageWrapper>
	);
};

export default EditEvent;
