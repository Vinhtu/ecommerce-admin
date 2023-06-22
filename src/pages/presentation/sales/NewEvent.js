import React, { useEffect } from 'react'; // useEffect
import * as moment from 'moment';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import Select from '../../../components/bootstrap/forms/Select';

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
import Input from '../../../components/bootstrap/forms/Input';
import FormGroup from '../../../components/bootstrap/forms/FormGroup';
import Icon from '../../../components/icon/Icon';
import { GetProducts } from '../../../redux/actions/products';
import { PostEvent } from '../../../redux/actions/events';

const selectStatus = [
	{ value: 'Normal', text: 'Normal' },
	{ value: 'Pending', text: 'Pending' },
	{ value: 'Finally', text: 'Finally' },
];

const NewEvent = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const { productList } = useSelector((state) => state.product);
	const { isPostEvent } = useSelector((state) => state.event);

	const [dataform, setDataForm] = React.useState({
		code: '',
		name: '',
		content: '',
		create_date: moment().add(0, 'days').format('YYYY-MM-DD'),
		date_start: moment().add(0, 'days').format('YYYY-MM-DD'),
		date_end: moment().add(0, 'days').format('YYYY-MM-DD'),
		status: 'Normal',
	});
	// const accountInfo = localStorage.getItem('accountinfo');
	const accessToken = localStorage.getItem('accessToken');
	// const refreshToken = localStorage.getItem('refreshToken');
	// const account_id = JSON.parse(accountInfo);
	const token = JSON.parse(accessToken);
	// const refreshtoken = JSON.parse(refreshToken);

	const [eventItemProduct, setEventItemProduct] = React.useState([]);

	const [eventItem, setEventItem] = React.useState({
		code_product: '',
		p_price: '',
	});

	const handleChangeEventItem = (e) => {
		setEventItem({ ...eventItem, [e.target.id]: e.target.value });
	};
	useEffect(() => {
		dispatch(GetProducts());
	}, [dispatch]);

	const handleChange = (e) => {
		setDataForm({ ...dataform, [e.target.id]: e.target.value });
	};

	const [addProduct, setAddProduct] = React.useState(false);
	const addToProduct = () => {
		setAddProduct(true);
	};

	const addEventItem = () => {
		// dispatch(GetProductCode())
		setEventItemProduct((current) => [
			...current,
			{ code_product: eventItem.code_product, p_price: eventItem.p_price },
		]);
		setEventItem({ ...eventItem, code_product: '', p_price: '' });
		setAddProduct(false);
	};

	const arrProductCode = [];
	if (productList) {
		for (let i = 0; i < productList.length; i += 1) {
			arrProductCode.push({ value: productList[i]._id, text: productList[i].code });
		}
	}

	const deleteItemEventProduct = (e) => {
		setEventItemProduct(eventItemProduct.filter((items) => items.code_product !== e));
	};

	const addEvent = () => {
		const data = {
			dataform,
			eventItem: eventItemProduct,
		};

		dispatch(PostEvent(data, token));

		if (!(isPostEvent === 'fail')) {
			navigate(-1);
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
			<Page container='isfuld' className='m-3'>
				{/* <div className='display-4 fw-bold py-3'>{data.name}</div> */}
				<div className='row g-4'>
					<FormGroup id='code' label='Code' className='col-md-3'>
						<Input onChange={handleChange} value={dataform.code} />
					</FormGroup>
					<FormGroup id='name' label='Name' className='col-md-3'>
						<Input onChange={handleChange} value={dataform.name} />
					</FormGroup>
					<FormGroup id='content' label='Content' className='col-md-3'>
						<Input onChange={handleChange} value={dataform.content} />
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
					<FormGroup id='create_date' label='Create Date' className='col-md-3'>
						<Input onChange={handleChange} value={dataform.create_date} type='date' />
					</FormGroup>

					<FormGroup id='date_start' label='Date Start' className='col-md-3'>
						<Input
							onChange={handleChange}
							value={dataform.date_start}
							type='datetime-local'
							step='2'
						/>
					</FormGroup>

					<FormGroup id='date_end' label='Date End' className='col-md-3'>
						<Input
							onChange={handleChange}
							value={dataform.date_end}
							type='datetime-local'
							step='2'
						/>
					</FormGroup>
					<div className='col-md-12'>
						<FormGroup label='Product' className='col-md-12'>
							<Button
								color='info'
								style={{ marginLeft: 16 }}
								onClick={() => addToProduct()}>
								Them san pham
							</Button>
						</FormGroup>
						{addProduct && (
							<div className='col-md-12' style={{ display: 'flex', marginTop: 16 }}>
								<FormGroup
									id='code_product'
									style={{ marginRight: 8 }}
									className='col-md-2'>
									<Select
										ariaLabel='code_product'
										placeholder='Choose code product'
										list={arrProductCode}
										onChange={handleChangeEventItem}
										value={eventItem.code_product}
										isValid={eventItem.code_product}
										isTouched={eventItem.code_product}
									/>
								</FormGroup>
								<FormGroup id='p_price' className='col-md-2'>
									<Input
										placeholder='Promotion Price'
										onChange={handleChangeEventItem}
										value={eventItem.p_price}
									/>
								</FormGroup>

								<Icon
									icon='ArrowForward'
									style={{
										fontSize: 24,
										marginLeft: 16,
										color: 'black',
										justifyContent: 'center',
										cursor: 'pointer',
									}}
									onClick={addEventItem}
								/>
							</div>
						)}

						{eventItemProduct.length > 0 && (
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
								{eventItemProduct.map((item) => {
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
											{item.code_product} - {item.p_price}đ
											<div
												onClick={() =>
													deleteItemEventProduct(item.code_product)
												}
												onKeyDown={() =>
													deleteItemEventProduct(item.code_product)
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
				<div className='mt-3' style={{ display: 'flex', justifyContent: 'flex-end' }}>
					{isPostEvent === 'fail' && (
						<p style={{ color: 'red' }}>Them khong thanh cong</p>
					)}
					<Button color='info' className='col-md-3' onClick={addEvent}>
						New event
					</Button>
				</div>
			</Page>
		</PageWrapper>
	);
};

export default NewEvent;
