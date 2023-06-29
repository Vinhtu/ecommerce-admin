import React, { useEffect } from 'react';
//  import { moment} from 'moment'
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import moment from 'moment';
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
import { GetBrands } from '../../../redux/actions/brands';
import { GetCategorys } from '../../../redux/actions/categorys';
import { GetAffilateshops } from '../../../redux/actions/affilateshops';

import Icon from '../../../components/icon/Icon';
import Textarea from '../../../components/bootstrap/forms/Textarea';
import { GetColoradmins } from '../../../redux/actions/coloradmins';
import ConvertVND from '../../../utils/ConvertVND';
import { GetDeliveryMethods } from '../../../redux/actions/deliverymethods';
import { GetUsageStatuss } from '../../../redux/actions/usagestatus';
import { GetOrigins } from '../../../redux/actions/utils/origins';
import { GetMaterials } from '../../../redux/actions/utils/materials';
import { GetSkinTypes } from '../../../redux/actions/utils/skintypes';
import { GetStickerStyles } from '../../../redux/actions/utils/stickerstyles';

const selectGender = [
	{ value: 'Không chọn', text: 'Không chọn' },
	{ value: 'Nam', text: 'Nam' },
	{ value: 'Nữ', text: 'Nữ' },
	{ value: 'Cả 2', text: 'Cả 2' },
	{ value: 'Khác', text: 'Khác' },
];

const NewProduct = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const [color, setColor] = React.useState();
	const [isOpenColor, setIsOpenColor] = React.useState(false);
	const [isOpenEditColor, setIsOpenEditColor] = React.useState(false);
	const [isOpenDescription, setIsOpenDescription] = React.useState(false);

	const [colorVitural, setColorVitural] = React.useState();
	const [amountVitural, setAmountVitural] = React.useState();

	const [thumbnailColorVitural, setThumbnailColorVitural] = React.useState('');
	const [sizeVitural, setSizeVitural] = React.useState();
	const [priceSizeVitural, setPriceSizeVitural] = React.useState();
	const [priceSizePromotionVitural, setPriceSizePromotionVitural] = React.useState();
	const [arrSizePriceVitural, setArrSizePriceVitural] = React.useState([]);
	const [arrColorThumbnailSizePriceVitural, setArrColorThumbnailSizePriceVitural] =
		React.useState([]);

	const [bodyDescriptionVitural, setBodyDescriptionVitural] = React.useState();
	const [thumbnailDescriptionVitural, setThumbnailDescriptionVitural] = React.useState();
	const [arrBodyDescription, setArrBodyDescription] = React.useState([]);

	const [fullShowDescription, setFullShowDescription] = React.useState(false);
	const [fullShowSizeColor, setFullShowSizeColor] = React.useState(false);

	const [thumbnailMain, setThumbnailMain] = React.useState(false);
	const [arrThumbnailChildren, setArrThumbnailChildren] = React.useState([]);

	const [percentInfo1, setPercentInfo1] = React.useState(0);
	const { deliverymethodList } = useSelector((state) => state.deliverymethod);

	const { usagestatusList } = useSelector((state) => state.usagestatus);

	const today = new Date();
	const { sizeList } = useSelector((state) => state.size);
	const { coloradminList } = useSelector((state) => state.coloradmin);
	const { brandList } = useSelector((state) => state.brand);
	const { categoryList } = useSelector((state) => state.category);
	const { affilateshopList } = useSelector((state) => state.affilateshop);
	const formatdate = moment(today).format('YYYY-MM-DD');

	const [dataform, setDataForm] = React.useState({
		code: '',
		name: '',
		brand: '',
		category: '',
		subcategory: '',
		affilateshop: '',
		usagestatus: '',
		deliverymethod: '',
		create_date: formatdate,
		status: 'Normal',
		gender: '',
	});

	useEffect(() => {
		dispatch(GetSizes());
		dispatch(GetColoradmins());
		dispatch(GetBrands());
		dispatch(GetCategorys());
		dispatch(GetAffilateshops());
		dispatch(GetDeliveryMethods());
		dispatch(GetUsageStatuss());
	}, [dispatch]);

	const handleChange = (e) => {
		if (
			dataform.code &&
			dataform.name &&
			dataform.brand &&
			dataform.category &&
			dataform.subcategory &&
			dataform.affilateshop &&
			dataform.create_date &&
			dataform.status
		) {
			setPercentInfo1(100);
		}

		if (e.target.id === 'code') {
			if (e.target.value.length < 25)
				setDataForm({ ...dataform, [e.target.id]: e.target.value });
		} else if (e.target.id === 'name') {
			if (e.target.value.length < 101)
				setDataForm({ ...dataform, [e.target.id]: e.target.value });
		} else {
			setDataForm({ ...dataform, [e.target.id]: e.target.value });
		}
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
	if (coloradminList) {
		for (let i = 0; i < coloradminList.data.results.length; i += 1) {
			selectColor.push({
				value: coloradminList.data.results[i].name,
				text: coloradminList.data.results[i].name,
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

	const selectSubCategory = [];
	if (categoryList) {
		for (let i = 0; i < categoryList.data.results.length; i += 1) {
			if (categoryList.data.results[i].name === dataform.category) {
				for (let j = 0; j < categoryList.data.results[i].subcategory.length; i += 1) {
					selectSubCategory.push({
						value: categoryList.data.results[i].subcategory[j].name,
						text: categoryList.data.results[i].subcategory[j].name,
					});
				}
			}
		}
	}

	console.log(brandList, 'brand list');

	const selectBrand = [];
	if (brandList) {
		for (let i = 0; i < brandList.data.results.length; i += 1) {
			if (
				brandList.data.results[i].category === dataform.category &&
				brandList.data.results[i].subcategory === dataform.subcategory
			) {
				for (let j = 0; j < brandList.data.results[i].subbrand.length; j += 1) {
					selectBrand.push({
						value: brandList.data.results[i].subbrand[j].name,
						text: brandList.data.results[i].subbrand[j].name,
					});
				}
			}
		}
	}

	const selectAffilateshop = [];
	if (affilateshopList) {
		for (let i = 0; i < affilateshopList.length; i += 1) {
			selectAffilateshop.push({
				value: affilateshopList[i].name,
				text: affilateshopList[i].name,
			});
		}
	}
	const selectStatus = [
		{ value: 'Normal', text: 'Normal' },
		{ value: 'Pending', text: 'Pending' },
		{ value: 'Destroy', text: 'Destroy' },
	];

	console.log(deliverymethodList, usagestatusList, 'ddata ');

	const selectUsagestatus = [];
	if (usagestatusList) {
		for (let i = 0; i < usagestatusList.data.results.length; i += 1) {
			selectUsagestatus.push({
				value: usagestatusList.data.results[i].type,
				text: usagestatusList.data.results[i].type,
			});
		}
	}

	const selectDeliverymethodList = [];
	if (deliverymethodList) {
		for (let i = 0; i < deliverymethodList.data.results.length; i += 1) {
			selectDeliverymethodList.push({
				value: deliverymethodList.data.results[i].code,
				text: deliverymethodList.data.results[i].type,
			});
		}
	}

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
		if (
			sizeVitural &&
			priceSizeVitural &&
			priceSizePromotionVitural &&
			amountVitural &&
			!arrSizePriceVitural.filter((item) => item.name.includes(sizeVitural)).length > 0
		) {
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
		}
	};

	const deleteArrSizePriceVitural = (data) => {
		setArrSizePriceVitural(arrSizePriceVitural.filter((items) => items.name !== data));
	};
	const saveColor = () => {
		if (errorPricePromotionVitural) {
			setErrorSaveColor('Lưu thất bại vui lòng kiểm tra thông tin');
		} else {
			setArrColorThumbnailSizePriceVitural((current) => [
				...current,
				{
					color: colorVitural,
					thumbnailcolor: thumbnailColorVitural,
					sizeprice: arrSizePriceVitural,
				},
			]);
			setSizeVitural('');
			setThumbnailColorVitural('');
			setPriceSizeVitural('');
			setPriceSizePromotionVitural('');
			setArrSizePriceVitural([]);
			setAmountVitural('');
			setIsOpenColor(false);
		}
	};
	const deleteArrColor = (data) => {
		setArrColorThumbnailSizePriceVitural(
			arrColorThumbnailSizePriceVitural.filter((items) => items.color !== data),
		);
	};

	const editArrColor = (e) => {
		console.log(e, 'e');
		setColorVitural(e.color);
		setThumbnailColorVitural(e.thumbnailcolor);
		setArrSizePriceVitural(e.sizeprice);
		setAmountVitural(e.amount);
		setIsOpenEditColor(true);
	};

	const saveEditColor = () => {
		setArrColorThumbnailSizePriceVitural(
			arrColorThumbnailSizePriceVitural.filter((items) => items.color !== colorVitural),
		);
		setArrColorThumbnailSizePriceVitural((current) => [
			...current,
			{
				color: colorVitural,
				thumbnailcolor: thumbnailColorVitural,
				sizeprice: arrSizePriceVitural,
				amount: amountVitural,
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
			{ body: bodyDescriptionVitural, thumbnaildescription: thumbnailDescriptionVitural },
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
				setArrThumbnailChildren((current) => [...current, { thumbnailchildren: url }]),
			),
		);
	};

	const deleteItemThumbnailChildren = (e) => {
		setArrThumbnailChildren(
			arrThumbnailChildren.filter((items) => items.thumbnailchildren !== e),
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

	const { isPostProduct } = useSelector((state) => state.product);

	useEffect(() => {
		if (isPostProduct === 'success') {
			navigate(-1);
		}
	}, [isPostProduct, navigate]);

	const [errorPricePromotionVitural, setErrorPricePromotionVitural] = React.useState(false);
	const [errorSaveColor, setErrorSaveColor] = React.useState('');

	console.log(errorPricePromotionVitural, 'errorPricePromotionVitural');

	const { OriginList } = useSelector((state) => state.origin);
	useEffect(() => {
		dispatch(GetOrigins());
	}, [dispatch]);
	const selectOrigin = [];
	if (OriginList) {
		for (let i = 0; i < OriginList.data.results.length; i += 1) {
			selectOrigin.push({
				value: OriginList.data.results[i].name,
				text: OriginList.data.results[i].name,
			});
		}
	}

	const { MaterialList } = useSelector((state) => state.material);
	useEffect(() => {
		dispatch(GetMaterials());
	}, [dispatch]);

	const selectMaterial = [];
	if (MaterialList) {
		for (let i = 0; i < MaterialList.data.results.length; i += 1) {
			selectMaterial.push({
				value: MaterialList.data.results[i].name,
				text: MaterialList.data.results[i].name,
			});
		}
	}

	const { SkinTypeList } = useSelector((state) => state.material);
	useEffect(() => {
		dispatch(GetSkinTypes());
	}, [dispatch]);

	const selectSkinType = [];
	if (SkinTypeList) {
		for (let i = 0; i < SkinTypeList.data.results.length; i += 1) {
			selectSkinType.push({
				value: SkinTypeList.data.results[i].name,
				text: SkinTypeList.data.results[i].name,
			});
		}
	}

	const { StickerStyleList } = useSelector((state) => state.stickerstyle);

	useEffect(() => {
		dispatch(GetStickerStyles());
	}, [dispatch]);

	const selectStickerType = [];
	if (SkinTypeList) {
		for (let i = 0; i < StickerStyleList.data.results.length; i += 1) {
			selectStickerType.push({
				value: StickerStyleList.data.results[i].name,
				text: StickerStyleList.data.results[i].name,
			});
		}
	}

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
					<div style={{ fontSize: 20, fontWeight: '500', marginBottom: 30 }}>
						Thông tin cơ bản{' '}
						<span style={{ color: percentInfo1 === 100 ? 'green' : 'black' }}>
							{' '}
							{percentInfo1}%
						</span>
					</div>

					<div className='col-md-6'>
						<Card className='rounded-1 mb-0'>
							<CardHeader>
								<CardLabel icon='LocalShipping'>
									<CardTitle>Hình ảnh</CardTitle>
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
											borderStyle: thumbnailMain ? 'none' : 'dashed',
											borderColor: '#E9E5E5',
											backgroundImage: `url(${thumbnailMain}`,
											backgroundSize: '100% 100%',
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
															backgroundImage: `url(${item.thumbnailchildren}`,
															backgroundSize: '100% 100%',
															cursor: 'pointer',
															'&:hover': {
																opacity: 0.5,
															},
															position: 'relative',
														}}>
														<div
															onClick={() =>
																deleteItemThumbnailChildren(
																	item.thumbnailchildren,
																)
															}
															onKeyDown={() =>
																deleteItemThumbnailChildren(
																	item.thumbnailchildren,
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
					<div className='col-md-3'>
						<FormGroup
							id='code'
							label={`Mã sản phẩm (${dataform.code.length}/24)`}
							className='col-md-12'>
							<Input onChange={handleChange} value={dataform.code} />
						</FormGroup>
						<div style={{ height: 28 }} />
						<FormGroup id='category' label='Ngành hàng' className='col-md-12'>
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

						<div style={{ height: 28 }} />
						<FormGroup id='brand' label='Thương hiệu' className='col-md-12'>
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
						<div style={{ height: 28 }} />
						<FormGroup id='status' label='Trạng thái sản phẩm' className='col-md-12'>
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
					</div>
					<div className='col-md-3'>
						<FormGroup
							id='name'
							label={`Tên sản phẩm (${dataform.name.length}/100)`}
							className='col-md-12'>
							<Input onChange={handleChange} value={dataform.name} />
						</FormGroup>

						<div style={{ height: 28 }} />
						<FormGroup id='subcategory' label='Danh mục' className='col-md-12'>
							<Select
								ariaLabel='Sub Category'
								placeholder='Choose Sub Category'
								list={selectSubCategory}
								onChange={handleChange}
								value={dataform.subcategory}
								isValid={dataform.subcategory}
								isTouched={dataform.subcategory}
							/>
						</FormGroup>

						<div style={{ height: 28 }} />
						<FormGroup id='affilateshop' label='Chọn shop' className='col-md-12'>
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

						<div style={{ height: 28 }} />
						<FormGroup id='create_date' label='Ngày tạo sản phẩm' className='col-md-12'>
							<Input
								onChange={handleChange}
								value={dataform.create_date}
								type='date'
							/>
						</FormGroup>
					</div>

					<div
						style={{
							fontSize: 20,
							fontWeight: '500',
							marginTop: 40,
						}}>
						Thông tin chi tiết
					</div>

					<div
						style={{
							fontSize: 20,
							fontWeight: '500',
							marginTop: 40,
						}}>
						Giày
					</div>

					<div className='row g-4 col-md-12'>
						<FormGroup id='origin' label='Xuất xứ' className='col-md-6'>
							<Select
								ariaLabel='origin'
								placeholder='Chọn xuất xứ'
								list={selectOrigin}
								onChange={handleChange}
								value={dataform.origin}
								isValid={dataform.origin}
								isTouched={dataform.origin}
							/>
						</FormGroup>
						<FormGroup id='material' label='Chất liệu' className='col-md-6'>
							<Select
								ariaLabel='material'
								placeholder='Chọn Chất liệu'
								list={selectMaterial}
								onChange={handleChange}
								value={dataform.material}
								isValid={dataform.material}
								isTouched={dataform.material}
							/>
						</FormGroup>
						<FormGroup id='skintype' label='Loại Da' className='col-md-6'>
							<Select
								ariaLabel='skintype'
								placeholder='Chọn Loại Da'
								list={selectSkinType}
								onChange={handleChange}
								value={dataform.skintype}
								isValid={dataform.skintype}
								isTouched={dataform.skintype}
							/>
						</FormGroup>
						<FormGroup id='gender' label='Giới tính' className='col-md-6'>
							<Select
								ariaLabel='gender'
								placeholder='Chọn Giới tính'
								list={selectGender}
								onChange={handleChange}
								value={dataform.gender}
								isValid={dataform.gender}
								isTouched={dataform.gender}
							/>
						</FormGroup>
						<FormGroup id='stickerstyle' label='Kiểu dán' className='col-md-6'>
							<Select
								ariaLabel='stickerstyle'
								placeholder='Chọn Kiểu dán'
								list={selectStickerType}
								onChange={handleChange}
								value={dataform.stickerstyle}
								isValid={dataform.stickerstyle}
								isTouched={dataform.stickerstyle}
							/>{' '}
						</FormGroup>
					</div>

					<div
						style={{
							fontSize: 20,
							fontWeight: '500',
							marginTop: 40,
						}}>
						Điện thoại
					</div>

					<div className='row g-4 col-md-12'>
						<FormGroup id='origin' label='Xuất xứ' className='col-md-6'>
							<Select
								ariaLabel='origin'
								placeholder='Chọn xuất xứ'
								list={selectOrigin}
								onChange={handleChange}
								value={dataform.origin}
								isValid={dataform.origin}
								isTouched={dataform.origin}
							/>
						</FormGroup>
						<FormGroup
							id='storagecapacity'
							label='Dung lượng lưu trữ'
							className='col-md-6'>
							<Input onChange={handleChange} value={dataform.storagecapacity} />
						</FormGroup>
						<FormGroup
							id='batterycapacity'
							label='Dung lượng pin (mhm, cell, Wh)'
							className='col-md-6'>
							<Input onChange={handleChange} value={dataform.batterycapacity} />
						</FormGroup>

						<FormGroup
							id='screenresolution'
							label='Độ phân giải màng hình'
							className='col-md-6'>
							<Input onChange={handleChange} value={dataform.screenresolution} />
						</FormGroup>

						<FormGroup id='typeofwarranty' label='Loại bảo hành' className='col-md-6'>
							<Input onChange={handleChange} value={dataform.typeofwarranty} />
						</FormGroup>
						<FormGroup id='warrantyperiod' label='Hạn bảo hành' className='col-md-6'>
							<Input onChange={handleChange} value={dataform.warrantyperiod} />
						</FormGroup>
						<FormGroup id='condition' label='Tình trạng ' className='col-md-6'>
							<Input onChange={handleChange} value={dataform.condition} />
						</FormGroup>
						<FormGroup id='phonemodel' label='Model điện thoại' className='col-md-6'>
							<Input onChange={handleChange} value={dataform.phonemodel} />
						</FormGroup>

						<FormGroup id='processor' label='Bộ xử lý' className='col-md-6'>
							<Input onChange={handleChange} value={dataform.processor} />
						</FormGroup>

						<FormGroup id='ram' label='Ram' className='col-md-6'>
							<Input onChange={handleChange} value={dataform.ram} />
						</FormGroup>
						<FormGroup id='rom' label='Rom' className='col-md-6'>
							<Input onChange={handleChange} value={dataform.rom} />
						</FormGroup>
						<FormGroup
							id='numberofsimslots'
							label='Số khe cắm sim'
							className='col-md-6'>
							<Input onChange={handleChange} value={dataform.numberofsimslots} />
						</FormGroup>
						<FormGroup
							id='numberofmaincameras'
							label='Số camera chính'
							className='col-md-6'>
							<Input onChange={handleChange} value={dataform.numberofmaincameras} />
						</FormGroup>

						<FormGroup
							id='phonefeature'
							label='Tính năng điện thoại'
							className='col-md-6'>
							<Input onChange={handleChange} value={dataform.phonefeature} />
						</FormGroup>

						<FormGroup id='typeofphone' label='Loại điện thoại' className='col-md-6'>
							<Input onChange={handleChange} value={dataform.typeofphone} />
						</FormGroup>
						<FormGroup id='mobilephone' label='Điện thoại di động' className='col-md-6'>
							<Input onChange={handleChange} value={dataform.mobilephone} />
						</FormGroup>
						<FormGroup id='operatingsystem' label='Hệ điều hành' className='col-md-6'>
							<Input onChange={handleChange} value={dataform.operatingsystem} />
						</FormGroup>
						<FormGroup
							id='typeoftelephonecable'
							label='Loại cáp điện thoại'
							className='col-md-6'>
							<Input onChange={handleChange} value={dataform.typeoftelephonecable} />
						</FormGroup>

						<FormGroup id='typeofsim' label='Loại sim' className='col-md-6'>
							<Input onChange={handleChange} value={dataform.typeofsim} />
						</FormGroup>

						<FormGroup
							id='screenprotectortype'
							label='Loại miếng dáng bảo vệ màng hình'
							className='col-md-6'>
							<Input onChange={handleChange} value={dataform.screenprotectortype} />
						</FormGroup>
						<FormGroup id='covertype' label='Loại Ốp' className='col-md-6'>
							<Input onChange={handleChange} value={dataform.covertype} />
						</FormGroup>

						<FormGroup
							id='dateofmanufacture'
							label='Ngày sản xuất'
							className='col-md-6'>
							<Input onChange={handleChange} value={dataform.dateofmanufacture} />
						</FormGroup>
					</div>

					<div
						style={{
							fontSize: 20,
							fontWeight: '500',
							marginTop: 40,
						}}>
						Ví
					</div>

					<div className='row g-4 col-md-12'>
						<FormGroup id='origin' label='Xuất xứ' className='col-md-6'>
							<Input onChange={handleChange} value={dataform.origin} />
						</FormGroup>
						<FormGroup
							id='detachablestrap'
							label='Dây đeo tháo rời'
							className='col-md-6'>
							<Input onChange={handleChange} value={dataform.detachablestrap} />
						</FormGroup>
						<FormGroup id='pocketlocktype' label='Loại khoá túi' className='col-md-6'>
							<Input onChange={handleChange} value={dataform.pocketlocktype} />
						</FormGroup>

						<FormGroup id='skintexture' label='Kết cấu da' className='col-md-6'>
							<Input onChange={handleChange} value={dataform.skintexture} />
						</FormGroup>

						<FormGroup id='skintype' label='Loại da' className='col-md-6'>
							<Input onChange={handleChange} value={dataform.skintype} />
						</FormGroup>

						<FormGroup id='walletstyle' label='Kiểu ví' className='col-md-6'>
							<Input onChange={handleChange} value={dataform.walletstyle} />
						</FormGroup>

						<FormGroup id='material' label='Chất liệu' className='col-md-6'>
							<Input onChange={handleChange} value={dataform.material} />
						</FormGroup>
						<FormGroup id='typeofwarranty' label='Loại bảo hành' className='col-md-6'>
							<Input onChange={handleChange} value={dataform.typeofwarranty} />
						</FormGroup>
						<FormGroup id='warrantyperiod' label='Hạn bảo hành' className='col-md-6'>
							<Input onChange={handleChange} value={dataform.warrantyperiod} />
						</FormGroup>
					</div>

					<div
						style={{
							fontSize: 20,
							fontWeight: '500',
							marginTop: 40,
						}}>
						Áo
					</div>
					<div className='row g-4 col-md-12'>
						<FormGroup id='origin' label='Xuất xứ' className='col-md-6'>
							<Input onChange={handleChange} value={dataform.origin} />
						</FormGroup>
						<FormGroup id='shirtlength' label='Chiều dài áo' className='col-md-6'>
							<Input onChange={handleChange} value={dataform.shirtlength} />
						</FormGroup>
						<FormGroup id='sleevelenght' label='Chiều dài tay áo ' className='col-md-6'>
							<Input onChange={handleChange} value={dataform.sleevelenght} />
						</FormGroup>

						<FormGroup id='collar' label='Cổ áo' className='col-md-6'>
							<Input onChange={handleChange} value={dataform.collar} />
						</FormGroup>

						<FormGroup id='material' label='Chất liệu ' className='col-md-6'>
							<Input onChange={handleChange} value={dataform.material} />
						</FormGroup>

						<FormGroup id='season' label='Mùa' className='col-md-6'>
							<Input onChange={handleChange} value={dataform.season} />
						</FormGroup>

						<FormGroup id='sample' label='Mẫu' className='col-md-6'>
							<Input onChange={handleChange} value={dataform.sample} />
						</FormGroup>
						<FormGroup id='style' label='Phong cách' className='col-md-6'>
							<Input onChange={handleChange} value={dataform.style} />
						</FormGroup>
					</div>

					<div
						style={{
							fontSize: 20,
							fontWeight: '500',
							marginTop: 40,
						}}>
						Quần
					</div>
					<div className='row g-4 col-md-12'>
						<FormGroup id='origin' label='Xuất xứ' className='col-md-6'>
							<Input onChange={handleChange} value={dataform.origin} />
						</FormGroup>
						<FormGroup id='pantslength' label='Chiều dài quần' className='col-md-6'>
							<Input onChange={handleChange} value={dataform.pantslength} />
						</FormGroup>
						<FormGroup id='pantsstyle' label='Kiểu quần ' className='col-md-6'>
							<Input onChange={handleChange} value={dataform.pantsstyle} />
						</FormGroup>

						<FormGroup id='material' label='Chất liệu' className='col-md-6'>
							<Input onChange={handleChange} value={dataform.material} />
						</FormGroup>

						<FormGroup id='season' label='Mùa ' className='col-md-6'>
							<Input onChange={handleChange} value={dataform.season} />
						</FormGroup>

						<FormGroup id='sample' label='Mẫu' className='col-md-6'>
							<Input onChange={handleChange} value={dataform.sample} />
						</FormGroup>

						<FormGroup id='style' label='Phong cách' className='col-md-6'>
							<Input onChange={handleChange} value={dataform.style} />
						</FormGroup>
					</div>

					<div
						style={{
							fontSize: 20,
							fontWeight: '500',
							marginTop: 40,
						}}>
						Váy
					</div>
					<div className='row g-4 col-md-12'>
						<FormGroup id='origin' label='Xuất xứ' className='col-md-6'>
							<Input onChange={handleChange} value={dataform.origin} />
						</FormGroup>
						<FormGroup id='lengthofshoulder' label='Chiều dài vaý' className='col-md-6'>
							<Input onChange={handleChange} value={dataform.lengthofshoulder} />
						</FormGroup>
						<FormGroup id='dressstyle' label='Kiểu váy ' className='col-md-6'>
							<Input onChange={handleChange} value={dataform.dressstyle} />
						</FormGroup>

						<FormGroup id='material' label='Chất liệu' className='col-md-6'>
							<Input onChange={handleChange} value={dataform.material} />
						</FormGroup>

						<FormGroup id='season' label='Mùa ' className='col-md-6'>
							<Input onChange={handleChange} value={dataform.season} />
						</FormGroup>

						<FormGroup id='sample' label='Mẫu' className='col-md-6'>
							<Input onChange={handleChange} value={dataform.sample} />
						</FormGroup>

						<FormGroup id='style' label='Phong cách' className='col-md-6'>
							<Input onChange={handleChange} value={dataform.style} />
						</FormGroup>
					</div>

					<div
						style={{
							fontSize: 20,
							fontWeight: '500',
							marginTop: 40,
						}}>
						Máy tính
					</div>
					<div className='row g-4 col-md-12'>
						<FormGroup id='origin' label='Xuất xứ' className='col-md-6'>
							<Input onChange={handleChange} value={dataform.origin} />
						</FormGroup>
						<FormGroup id='typeoflaptop' label='Loại laptop' className='col-md-6'>
							<Input onChange={handleChange} value={dataform.typeoflaptop} />
						</FormGroup>
						<FormGroup
							id='originofscreen'
							label='Xuất xứ màng hình '
							className='col-md-6'>
							<Input onChange={handleChange} value={dataform.originofscreen} />
						</FormGroup>

						<FormGroup
							id='manufacturerofgraphicschips'
							label='Nhà sản xuất chip đồ hoạ'
							className='col-md-6'>
							<Input
								onChange={handleChange}
								value={dataform.manufacturerofgraphicschips}
							/>
						</FormGroup>

						<FormGroup id='laptopmodel' label='Laptop Model ' className='col-md-6'>
							<Input onChange={handleChange} value={dataform.laptopmodel} />
						</FormGroup>

						<FormGroup
							id='storagecapacity'
							label='Dung lượng lưu trữ'
							className='col-md-6'>
							<Input onChange={handleChange} value={dataform.storagecapacity} />
						</FormGroup>

						<FormGroup id='interfaceport' label='Cổng giao diện' className='col-md-6'>
							<Input onChange={handleChange} value={dataform.interfaceport} />
						</FormGroup>

						<FormGroup id='processor' label='Bộ xử lý' className='col-md-6'>
							<Input onChange={handleChange} value={dataform.processor} />
						</FormGroup>

						<FormGroup id='numberofcores' label='Số lõi' className='col-md-6'>
							<Input onChange={handleChange} value={dataform.numberofcores} />
						</FormGroup>

						<FormGroup id='frequency' label='Tần số' className='col-md-6'>
							<Input onChange={handleChange} value={dataform.frequency} />
						</FormGroup>

						<FormGroup id='operatingsystem' label='Hệ điều hành' className='col-md-6'>
							<Input onChange={handleChange} value={dataform.operatingsystem} />
						</FormGroup>

						<FormGroup id='batterycapacity' label='Dung lượng pin' className='col-md-6'>
							<Input onChange={handleChange} value={dataform.batterycapacity} />
						</FormGroup>

						<FormGroup id='opticaldisc' label='Ổ đĩa quang' className='col-md-6'>
							<Input onChange={handleChange} value={dataform.opticaldisc} />
						</FormGroup>

						<FormGroup id='status' label='Tình trạng' className='col-md-6'>
							<Input onChange={handleChange} value={dataform.status} />
						</FormGroup>

						<FormGroup id='warrantyperiod' label='Hạn bảo hành' className='col-md-6'>
							<Input onChange={handleChange} value={dataform.warrantyperiod} />
						</FormGroup>

						<FormGroup id='typeofwarranty' label='Loại bảo hành' className='col-md-6'>
							<Input onChange={handleChange} value={dataform.typeofwarranty} />
						</FormGroup>

						<FormGroup
							id='dateofmanufacture'
							label='Ngày sản xuất'
							className='col-md-6'>
							<Input onChange={handleChange} value={dataform.dateofmanufacture} />
						</FormGroup>
					</div>

					<div
						style={{
							fontSize: 20,
							fontWeight: '500',
							marginTop: 40,
						}}>
						Nước hoa
					</div>
					<div className='row g-4 col-md-12'>
						<FormGroup id='origin' label='Xuất xứ' className='col-md-6'>
							<Input onChange={handleChange} value={dataform.origin} />
						</FormGroup>
						<FormGroup id='gender' label='Giới tính' className='col-md-6'>
							<Input onChange={handleChange} value={dataform.gender} />
						</FormGroup>
						<FormGroup id='ingredient' label='Thành phần ' className='col-md-6'>
							<Input onChange={handleChange} value={dataform.ingredient} />
						</FormGroup>

						<FormGroup id='productsize' label='Kích cỡ sản phẩm' className='col-md-6'>
							<Input onChange={handleChange} value={dataform.productsize} />
						</FormGroup>

						<FormGroup id='fragrant' label='Mùi hương ' className='col-md-6'>
							<Input onChange={handleChange} value={dataform.fragrant} />
						</FormGroup>

						<FormGroup id='expiry' label='Hạn sử dụng' className='col-md-6'>
							<Input onChange={handleChange} value={dataform.expiry} />
						</FormGroup>

						<FormGroup id='capacity' label='Dung tích' className='col-md-6'>
							<Input onChange={handleChange} value={dataform.capacity} />
						</FormGroup>
						<FormGroup
							id='flavorconcentration'
							label='Nồng độ hương'
							className='col-md-6'>
							<Input onChange={handleChange} value={dataform.flavorconcentration} />
						</FormGroup>
						<FormGroup id='recipe' label='Công thức' className='col-md-6'>
							<Input onChange={handleChange} value={dataform.recipe} />
						</FormGroup>
						<FormGroup id='weight' label='Trọng lượng' className='col-md-6'>
							<Input onChange={handleChange} value={dataform.weight} />
						</FormGroup>
					</div>

					<div
						style={{
							fontSize: 20,
							fontWeight: '500',
							marginTop: 40,
						}}>
						Đồng hồ
					</div>
					<div className='row g-4 col-md-12'>
						<FormGroup id='origin' label='Xuất xứ' className='col-md-6'>
							<Input onChange={handleChange} value={dataform.origin} />
						</FormGroup>
						<FormGroup id='clockface' label='Mặt đồng hồ' className='col-md-6'>
							<Input onChange={handleChange} value={dataform.clockface} />
						</FormGroup>
						<FormGroup id='watchstyle' label='Kiểu đồng hồ' className='col-md-6'>
							<Input onChange={handleChange} value={dataform.watchstyle} />
						</FormGroup>
						<FormGroup id='typeofwarranty' label='Loại bảo hành' className='col-md-6'>
							<Input onChange={handleChange} value={dataform.typeofwarranty} />
						</FormGroup>

						<FormGroup
							id='diameterofwatchcase'
							label='Đường kính vỏ đồng hồ'
							className='col-md-6'>
							<Input onChange={handleChange} value={dataform.diameterofwatchcase} />
						</FormGroup>

						<FormGroup
							id='watchcasestyle'
							label='Kiểu vỏ đồng hồ '
							className='col-md-6'>
							<Input onChange={handleChange} value={dataform.watchcasestyle} />
						</FormGroup>

						<FormGroup
							id='watchcasematerial'
							label='Chất liệu vỏ đồng hồ'
							className='col-md-6'>
							<Input onChange={handleChange} value={dataform.watchcasematerial} />
						</FormGroup>

						<FormGroup
							id='clocklockstyle'
							label='Kiểu khoá đồng hồ'
							className='col-md-6'>
							<Input onChange={handleChange} value={dataform.clocklockstyle} />
						</FormGroup>
						<FormGroup
							id='strapmaterial'
							label='Chất liệu dây đeo'
							className='col-md-6'>
							<Input onChange={handleChange} value={dataform.strapmaterial} />
						</FormGroup>
						<FormGroup id='Feature' label='Tính năng' className='col-md-6'>
							<Input onChange={handleChange} value={dataform.origin} />
						</FormGroup>
						<FormGroup
							id='depthofwaterresistance'
							label='Đọ sâu chống nước'
							className='col-md-6'>
							<Input
								onChange={handleChange}
								value={dataform.depthofwaterresistance}
							/>
						</FormGroup>

						<FormGroup id='warrantyperiod' label='Hạn bảo hành' className='col-md-6'>
							<Input onChange={handleChange} value={dataform.warrantyperiod} />
						</FormGroup>

						<FormGroup id='material' label='Chất liệu' className='col-md-6'>
							<Input onChange={handleChange} value={dataform.material} />
						</FormGroup>

						<FormGroup id='skintype' label='Loại da' className='col-md-6'>
							<Input onChange={handleChange} value={dataform.skintype} />
						</FormGroup>
					</div>

					<div
						style={{
							fontSize: 20,
							fontWeight: '500',
							marginTop: 40,
						}}>
						Thông tin phân loại
					</div>

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
												marginTop: 24,
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
												<div>Color: {item.color}</div>
												{/* <div
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
												</div> */}
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
															borderStyle: item.thumbnailcolor
																? 'none'
																: 'dashed',
															borderColor: '#E9E5E5',
															backgroundImage: `url(${item.thumbnailcolor}`,
															backgroundSize: '100% 100%',
															cursor: 'pointer',
															'&:hover': {
																opacity: 0.5,
															},
															position: 'relative',
														}}
													/>
												</div>
												<div
													style={{
														display: 'flex',
														flexWrap: 'wrap',
														width: '100%',
													}}>
													{item.sizeprice && (
														<CardBody
															className='table-responsive'
															isScrollable
															style={{
																paddingLeft: 0,
																paddingRight: 0,
																paddingTop: 0,
																height: 250,
																width: '100%',
															}}>
															<table className='table table-modern table-hover'>
																<thead>
																	<tr>
																		<th scope='col'>
																			Tên size
																		</th>
																		<th scope='col'>
																			Giá size
																		</th>
																		<th scope='col'>
																			Giá khuyến mãi
																		</th>
																		<th scope='col'>
																			Số lượng
																		</th>
																	</tr>
																</thead>
																<tbody>
																	{item.sizeprice?.map((i) => (
																		// <CommonTableRow
																		// 	key={i.id}
																		// 	// eslint-disable-next-line react/jsx-props-no-spreading
																		// 	{...i}
																		// 	selectName='selectedList'
																		// 	selectOnChange={selectTable.handleChange}
																		// 	selectChecked={selectTable.values.selectedList.includes(
																		// 		i.id.toString(),
																		// 	)}
																		// />
																		<tr>
																			<td>
																				<span>
																					{i.name}
																				</span>
																			</td>

																			<td>
																				<span>
																					{ConvertVND(
																						i.price,
																					)}
																				</span>
																			</td>
																			<td>
																				<span>
																					{ConvertVND(
																						i.p_price,
																					)}
																				</span>
																			</td>
																			<td>
																				<span>
																					{ConvertVND(
																						i.amount,
																					)}
																				</span>
																			</td>
																		</tr>
																	))}
																</tbody>
															</table>
														</CardBody>
													)}

													{/* {item.sizeprice.map((i) => {
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
													})} */}
												</div>
											</div>
											<div
												onClick={() => deleteArrColor(item.color)}
												onKeyDown={() => deleteArrColor(item.color)}
												role='button'
												tabIndex='0'
												style={{
													position: 'absolute',
													top: -10,
													right: 0,
													color: 'red',
													zIndex: 1,
													fontSize: 10,
													display: 'flex',
													justifyContent: 'center',
													alignItems: 'center',
													width: 20,
													height: 20,
													padding: 2,
													borderRadius: 50,
													backgroundColor: '#FBECE9',
													cursor: 'pointer',
												}}>
												<Icon icon='delete' style={{ fontSize: 30 }} />
											</div>

											<div
												onClick={() => editArrColor(item)}
												onKeyDown={() => editArrColor(item)}
												role='button'
												tabIndex='0'
												style={{
													position: 'absolute',
													top: -10,
													right: 32,
													color: 'red',
													zIndex: 1,
													fontSize: 10,
													display: 'flex',
													justifyContent: 'center',
													alignItems: 'center',
													width: 20,
													height: 20,
													padding: 2,
													borderRadius: 50,
													backgroundColor: '#FBECE9',
													cursor: 'pointer',
												}}>
												<Icon icon='edit' style={{ fontSize: 30 }} />
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

					<div
						style={{
							fontSize: 20,
							fontWeight: '500',
							marginTop: 40,
						}}>
						Thông tin vận chuyển
					</div>

					<div className='row g-4 col-md-12'>
						{/* <div className='col-md-3'> */}
						<FormGroup id='usagestatus' label='Tình trạng' className='col-md-6'>
							<Select
								ariaLabel='Tình trạng'
								placeholder='Chọn tình trạng'
								list={selectUsagestatus}
								onChange={handleChange}
								value={dataform.usagestatus}
								isValid={dataform.usagestatus}
								isTouched={dataform.usagestatus}
							/>
						</FormGroup>
						<FormGroup id='weight' label='Cân nặng' className='col-md-6'>
							<Input onChange={handleChange} type='number' value='1' />
						</FormGroup>
						{/* </div>
						<div className='col-md-3'> */}
						<FormGroup
							id='weight'
							label='Kích thước đóng gói ( X )'
							className='col-md-6'>
							<Input onChange={handleChange} type='number' value='1' />
						</FormGroup>
						{/* </div>
						<div className='col-md-3'> */}
						<FormGroup
							id='weight'
							label='Kích thước đóng gói ( Y )'
							className='col-md-6'>
							<Input onChange={handleChange} type='number' value='1' />
						</FormGroup>
						{/* </div>
						<div className='col-md-3'> */}
						<FormGroup
							id='weight'
							label='Kích thước đóng gói ( Z )'
							className='col-md-6'>
							<Input onChange={handleChange} type='number' value='1' />
						</FormGroup>
						<FormGroup
							id='deliverymethod'
							label='Phương pháp vận chuyển'
							className='col-md-6'>
							<Select
								ariaLabel='Phương pháp vận chuyển'
								placeholder='Chọn Phương pháp vận chuyển'
								list={selectDeliverymethodList}
								onChange={handleChange}
								value={dataform.deliverymethod}
								isValid={dataform.deliverymethod}
								isTouched={dataform.deliverymethod}
							/>
						</FormGroup>
						{/* </div> */}
					</div>

					<div />
					{/* Thumbnail------------- */}
				</div>
				<div className='mt-3' style={{ display: 'flex', justifyContent: 'flex-end' }}>
					{isPostProduct === 'fail' && (
						<p style={{ fontSize: 14, color: 'red' }}> Tạo mới thất bại</p>
					)}
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
										borderStyle: thumbnailColorVitural ? 'none' : 'dashed',
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
												padding: 2,
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
												right: -10,
												color: 'red',
												zIndex: 1,
												fontSize: 10,
												display: 'flex',
												justifyContent: 'center',
												alignItems: 'center',
												width: 20,
												height: 20,
												padding: 2,
												borderRadius: 50,
												backgroundColor: '#FBECE9',
												cursor: 'pointer',
											}}>
											<Icon icon='delete' style={{ fontSize: 30 }} />
										</div>
									</div>
									<FormGroup id='priceSizeVitural' style={{ marginRight: 8 }}>
										<Input
											type='number'
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
											type='number'
											onChange={(e) => {
												setErrorPricePromotionVitural(
													(parseInt(priceSizePromotionVitural, 10) >
														parseInt(priceSizeVitural, 10) &&
														true) ||
														false,
												);
												setPriceSizePromotionVitural(e.target.value);
											}}
											style={{
												color: errorPricePromotionVitural ? 'red' : 'black',
											}}
											value={priceSizePromotionVitural}
										/>
									</FormGroup>
									<FormGroup id='amountVitural' style={{ marginRight: 8 }}>
										<Input
											type='number'
											placeholder='Amount'
											onChange={handleAmountVitural}
											value={amountVitural}
										/>
									</FormGroup>

									<Icon
										icon='Plus'
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
								<CardBody
									className='table-responsive'
									isScrollable
									style={{ paddingLeft: 0, paddingRight: 0, height: 250 }}>
									<table className='table table-modern table-hover'>
										<thead>
											<tr>
												<th scope='col'>Tên size</th>
												<th scope='col'>Giá size</th>
												<th scope='col'>Giá khuyến mãi</th>
												<th scope='col'>Số lượng</th>
												<th scope='col' className='text-end'>
													Actions
												</th>
											</tr>
										</thead>
										<tbody>
											{arrSizePriceVitural?.map((item) => (
												// <CommonTableRow
												// 	key={i.id}
												// 	// eslint-disable-next-line react/jsx-props-no-spreading
												// 	{...i}
												// 	selectName='selectedList'
												// 	selectOnChange={selectTable.handleChange}
												// 	selectChecked={selectTable.values.selectedList.includes(
												// 		i.id.toString(),
												// 	)}
												// />
												<tr>
													<td>
														<span>{item.name}</span>
													</td>

													<td>
														<span>{ConvertVND(item.price)}</span>
													</td>
													<td>
														<span>{ConvertVND(item.p_price)}</span>
													</td>
													<td>
														<span>{ConvertVND(item.amount)}</span>
													</td>

													<td className='text-end'>
														<Button
															color='dark'
															isLight
															icon='delete'
															tag='a'
															onClick={() =>
																deleteArrSizePriceVitural(item.name)
															}
														/>
													</td>
												</tr>
											))}
										</tbody>
									</table>
								</CardBody>
							)}
						</div>
					</div>
				</ModalBody>
				<ModalFooter className='px-4 pb-4'>
					{errorSaveColor && (
						<p style={{ fontSize: 14, color: 'red' }}> {errorSaveColor}</p>
					)}
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
										borderStyle: thumbnailColorVitural ? 'none' : 'dashed',
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
						<div className='col-md-6'>
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
												right: -10,
												color: 'red',
												zIndex: 1,
												fontSize: 10,
												display: 'flex',
												justifyContent: 'center',
												alignItems: 'center',
												width: 20,
												height: 20,
												padding: 2,
												borderRadius: 50,
												backgroundColor: '#FBECE9',
												cursor: 'pointer',
											}}>
											<Icon icon='delete' style={{ fontSize: 30 }} />
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
											type='number'
											onChange={(e) => {
												setErrorPricePromotionVitural(
													(parseInt(priceSizePromotionVitural, 10) >
														parseInt(priceSizeVitural, 10) &&
														true) ||
														false,
												);
												setPriceSizePromotionVitural(e.target.value);
											}}
											style={{
												color: errorPricePromotionVitural ? 'red' : 'black',
											}}
											value={priceSizePromotionVitural}
										/>
									</FormGroup>

									<FormGroup id='amountVitural' style={{ marginRight: 8 }}>
										<Input
											type='number'
											placeholder='Amount'
											onChange={handleAmountVitural}
											value={amountVitural}
										/>
									</FormGroup>

									<Icon
										icon='Plus'
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
								<CardBody
									className='table-responsive'
									isScrollable
									style={{ paddingLeft: 0, paddingRight: 0, height: 250 }}>
									<table className='table table-modern table-hover'>
										<thead>
											<tr>
												<th scope='col'>Tên size</th>
												<th scope='col'>Giá size</th>
												<th scope='col'>Giá khuyến mãi</th>
												<th scope='col'>Số lượng</th>
												<th scope='col' className='text-end'>
													Actions
												</th>
											</tr>
										</thead>
										<tbody>
											{arrSizePriceVitural?.map((item) => (
												// <CommonTableRow
												// 	key={i.id}
												// 	// eslint-disable-next-line react/jsx-props-no-spreading
												// 	{...i}
												// 	selectName='selectedList'
												// 	selectOnChange={selectTable.handleChange}
												// 	selectChecked={selectTable.values.selectedList.includes(
												// 		i.id.toString(),
												// 	)}
												// />
												<tr>
													<td>
														<span>{item.name}</span>
													</td>

													<td>
														<span>{ConvertVND(item.price)}</span>
													</td>
													<td>
														<span>{ConvertVND(item.p_price)}</span>
													</td>
													<td>
														<span>{ConvertVND(item.amount)}</span>
													</td>

													<td className='text-end'>
														<Button
															color='dark'
															isLight
															icon='delete'
															tag='a'
															onClick={() =>
																deleteArrSizePriceVitural(item.name)
															}
														/>
													</td>
												</tr>
											))}
										</tbody>
									</table>
								</CardBody>
								// <div
								// 	style={{
								// 		display: 'flex',
								// 		marginTop: 8,
								// 		padding: '8px 16px',
								// 		borderWidth: 1,
								// 		borderStyle: 'dashed',
								// 		borderRadius: 10,
								// 		borderColor: '#E9E5E5',
								// 		alignItems: 'center',
								// 		flexWrap: 'wrap',
								// 	}}>
								// 	{arrSizePriceVitural.map((item) => {
								// 		return (
								// 			<div
								// 				style={{
								// 					padding: 4,
								// 					borderRadius: 4,
								// 					backgroundColor: '#FBECE9',
								// 					display: 'flex',
								// 					justifyContent: 'center',
								// 					alignItems: 'center',
								// 					marginRight: 4,
								// 					marginTop: 4,
								// 					fontSize: 12,
								// 					position: 'relative',
								// 				}}>
								// 				{item.name} - {item.price}đ - {item.p_price}đ
								// 				<div
								// 					onClick={() =>
								// 						deleteArrSizePriceVitural(item.name)
								// 					}
								// 					onKeyDown={() =>
								// 						deleteArrSizePriceVitural(item.name)
								// 					}
								// 					role='button'
								// 					tabIndex='0'
								// 					style={{
								// 						position: 'absolute',
								// 						top: -4,
								// 						right: -4,
								// 						color: 'red',
								// 						zIndex: 1,
								// 						fontSize: 10,
								// 						display: 'flex',
								// 						justifyContent: 'center',
								// 						alignItems: 'center',
								// 						width: 10,
								// 						height: 10,
								// 						borderRadius: 50,
								// 						backgroundColor: '#FBECE9',
								// 						cursor: 'pointer',
								// 					}}>
								// 					x
								// 				</div>
								// 			</div>
								// 		);
								// 	})}
								// </div>
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
										borderStyle: thumbnailDescriptionVitural
											? 'none'
											: 'dashed',
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

export default NewProduct;
