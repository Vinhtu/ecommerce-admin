import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import Page from '../../../layout/Page/Page';
import Dropdown, {
	DropdownItem,
	DropdownMenu,
	DropdownToggle,
} from '../../../components/bootstrap/Dropdown';
import PageWrapper from '../../../layout/PageWrapper/PageWrapper';
import SubHeader, {
	// SubHeaderLeft,
	SubHeaderRight,
	// SubheaderSeparator,
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
	CardHeader,
	CardLabel,
	CardSubTitle,
	CardTitle,
} from '../../../components/bootstrap/Card';
import Icon from '../../../components/icon/Icon';
// import { priceFormat } from '../../../helpers/helpers';
// import Chart from '../../../components/extras/Chart';
// import PlaceholderImage from '../../../components/extras/PlaceholderImage';
import Input from '../../../components/bootstrap/forms/Input';
import FormGroup from '../../../components/bootstrap/forms/FormGroup';
import EVENT_ORDER_STATUS from '../../../common/data/enumOrderStatus';
import { DeleteOrder, GetOrder, PutOrder } from '../../../redux/actions/orders';

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

const ViewOrder = () => {
	const location = useLocation();

	const navigate = useNavigate();
	const dispatch = useDispatch();
	// const accountInfo = localStorage.getItem('accountinfo');
	const accessToken = localStorage.getItem('accessToken');
	// const refreshToken = localStorage.getItem('refreshToken');
	// const account_id = JSON.parse(accountInfo);
	const token = JSON.parse(accessToken);
	// const refreshtoken = JSON.parse(refreshToken);

	console.log(location.state, 'location.state');

	// eslint-disable-next-line no-unused-vars
	const TABS = {
		ORDER: 'Order',
		ORDERITEM: 'Order Item',
		EDIT: 'Edit',
	};

	const { orderDetail, isPutOrder, isPostOrder, isDeleteOrder } = useSelector(
		(state) => state.order,
	);

	console.log(orderDetail, 'orderDetail');
	useEffect(() => {
		dispatch(GetOrder(location.state.item._id));
	}, [dispatch, location.state.item._id, isPutOrder, isDeleteOrder]);

	const [activeTab, setActiveTab] = useState(TABS.ORDER);

	const [dataform, setDataForm] = React.useState({
		_id: orderDetail?._id,
		account: orderDetail?.account?.username,
		t_price: orderDetail?.t_price,
		t_product_price: orderDetail?.t_product_price,
		amount: orderDetail?.amount,
		t_ship: orderDetail?.t_ship,
		create_date: orderDetail?.create_date,
		status: orderDetail?.status,
		type_pay: orderDetail?.type_pay,
		status_pay: orderDetail?.status_pay,
		streetAddress: orderDetail?.streetAddress,
		wardCommunedistrictAddress: orderDetail?.wardCommunedistrictAddress,
		cityAddress: orderDetail?.cityAddress,
		zipAddress: orderDetail?.zipAddress,
		voucher: orderDetail?.voucher?.code,
		p_price: orderDetail?.voucher?.p_price,
		orderitem: orderDetail?.orderitem,
	});

	useEffect(() => {
		setDataForm({
			_id: orderDetail?._id,
			account: orderDetail?.account?.username,
			t_price: orderDetail?.t_price,
			t_product_price: orderDetail?.t_product_price,
			amount: orderDetail?.amount,
			t_ship: orderDetail?.t_ship,
			create_date: orderDetail?.create_date,
			status: orderDetail?.status,
			type_pay: orderDetail?.type_pay,
			status_pay: orderDetail?.status_pay,
			streetAddress: orderDetail?.streetAddress,
			wardCommunedistrictAddress: orderDetail?.wardCommunedistrictAddress,
			cityAddress: orderDetail?.cityAddress,
			zipAddress: orderDetail?.zipAddress,
			voucher: orderDetail?.voucher?.code,
			p_price: orderDetail?.voucher?.p_price,
			orderitem: orderDetail?.orderitem,
		});
	}, [orderDetail]);

	// const putAffilateshop = () => {
	// 	navigate(`../admin/affilateshop`);
	// };

	const deleteOrder = () => {
		dispatch(DeleteOrder(dataform._id, token));
		navigate(`../admin/order/shop`);
	};

	const putStatusOrder = (e) => {
		const datas = { status: e };
		dispatch(PutOrder(orderDetail?._id, datas, token));
	};

	if (!orderDetail) {
		return <p>Không có thông tin</p>;
	}

	console.log(isPutOrder, isPostOrder, 'isPutOrder');
	return (
		<PageWrapper title={demoPages.sales.subMenu.product.text}>
			<SubHeader>
				{/* <SubHeaderLeft>
					<Button color='info' isLink icon='ArrowBack' onClick={() => navigate(-1)}>
						Back to List
					</Button>
					<SubheaderSeparator />
					<Avatar
						srcSet={orderDetail?.account && orderDetail?.account.avatar}
						src={orderDetail?.account.avatar}
						size={32}
					/> 
					 <span>
						<strong>{`${orderDetail?.account.username} ${orderDetail?.account.fullname}`}</strong>
					</span>
					<span className='text-muted'>Owner</span>
				</SubHeaderLeft> */}
				<SubHeaderRight>
					<span className='text-muted fst-italic me-2'>Last update:</span>
					<span className='fw-bold'>13 hours ago</span>
				</SubHeaderRight>
			</SubHeader>
			<Page>
				<div className='display-4 fw-bold py-3'>{orderDetail?.name}</div>
				<div className='row h-100'>
					<div className='col-lg-4'>
						<Card stretch>
							<CardBody isScrollable>
								<div className='row g-3'>
									<div className='col-12'>
										<Button
											icon='Summarize'
											color='info'
											className='w-100 p-3'
											isLight={activeTab !== TABS.ORDER}
											onClick={() => setActiveTab(TABS.ORDER)}>
											{TABS.ORDER}
										</Button>
									</div>
									<div className='col-12'>
										<Button
											icon='Chat'
											color='info'
											className='w-100 p-3'
											isLight={activeTab !== TABS.ORDERITEM}
											onClick={() => setActiveTab(TABS.ORDERITEM)}>
											{TABS.ORDERITEM}
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
										onClick={() => deleteOrder()}>
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
							{activeTab === TABS.ORDER && (
								<>
									<CardHeader>
										<CardLabel icon='Summarize' iconColor='info'>
											<CardTitle>Order</CardTitle>
											<CardSubTitle>Order infomation</CardSubTitle>
										</CardLabel>
										<div style={{ display: 'flex', alignItems: 'center' }}>
											<div style={{ color: 'rgb(16 185 129)' }}>
												{dataform.type_pay}
											</div>
											<div style={{ marginLeft: 16, marginRight: 16 }}>|</div>
											<div
												style={{
													color:
														dataform.status_pay === 'Chưa thanh toán'
															? '#ff502f'
															: 'rgb(16 185 129)',
												}}>
												{dataform.status_pay}
											</div>

											<div style={{ marginLeft: 16, marginRight: 16 }}>|</div>
											<div>
												<Dropdown>
													<DropdownToggle hasIcon={false}>
														<Button
															isLink
															icon='Circle'
															className='text-nowrap'>
															{dataform.status}
														</Button>
													</DropdownToggle>
													<DropdownMenu>
														{Object.keys(EVENT_ORDER_STATUS).map(
															(key) => (
																<DropdownItem
																	key={key}
																	onClick={() =>
																		putStatusOrder(
																			EVENT_ORDER_STATUS[key]
																				.name,
																		)
																	}>
																	<div>
																		<Icon
																			icon='Circle'
																			color={
																				EVENT_ORDER_STATUS[
																					key
																				].color
																			}
																		/>
																		{
																			EVENT_ORDER_STATUS[key]
																				.name
																		}
																	</div>
																</DropdownItem>
															),
														)}
													</DropdownMenu>
												</Dropdown>
											</div>
										</div>
									</CardHeader>
									<CardBody isScrollable>
										<div className='row'>
											<div className='col-4' style={{ marginBottom: 16 }}>
												<FormGroup id='account' label='Account' isFloating>
													<Input
														placeholder='Account'
														// onChange={formik.handleChange}
														// onBlur={formik.handleBlur}
														value={dataform.account}
														// isValid={formik.isValid}
														// isTouched={formik.touched.name}
														// invalidFeedback={formik.errors.name}
														// validFeedback='Looks good!'
													/>
												</FormGroup>
											</div>
											<div className='col-4' style={{ marginBottom: 16 }}>
												<FormGroup
													id='t_price'
													label='Total price'
													isFloating>
													<Input
														placeholder='Total price'
														value={dataform.t_price}
													/>
												</FormGroup>
											</div>
											<div className='col-4' style={{ marginBottom: 16 }}>
												<FormGroup
													id='t_product_price'
													label='Total price product'
													isFloating>
													<Input
														placeholder='Total price product'
														value={dataform.t_product_price}
													/>
												</FormGroup>
											</div>
											<div className='col-4' style={{ marginBottom: 16 }}>
												<FormGroup
													id='amount'
													label='Amount product'
													isFloating>
													<Input
														placeholder='Amount product'
														value={dataform.amount}
													/>
												</FormGroup>
											</div>
											<div className='col-4' style={{ marginBottom: 16 }}>
												<FormGroup
													id='t_ship'
													label='Total ship price'
													isFloating>
													<Input
														placeholder='Total ship price'
														value={dataform.t_ship}
													/>
												</FormGroup>
											</div>
											<div className='col-4' style={{ marginBottom: 16 }}>
												<FormGroup id='address' label='Address' isFloating>
													<Input
														placeholder='Address'
														value={
															dataform.streetAddress +
															dataform.wardCommunedistrictAddress +
															dataform.cityAddress +
															dataform.zipAddress
														}
													/>
												</FormGroup>
											</div>
											<div className='col-4' style={{ marginBottom: 16 }}>
												<FormGroup id='voucher' label='Voucher' isFloating>
													<Input
														placeholder='Voucher'
														value={dataform.voucher}
													/>
												</FormGroup>
											</div>
											<div className='col-4' style={{ marginBottom: 16 }}>
												<FormGroup
													id='p_price'
													label='Price promotion'
													isFloating>
													<Input
														placeholder='Price promotion'
														value={dataform.p_price}
													/>
												</FormGroup>
											</div>
											<div className='col-4' style={{ marginBottom: 16 }}>
												<FormGroup
													id='create_date'
													label='Create date'
													isFloating>
													<Input
														placeholder='Create date'
														value={dataform.create_date}
													/>
												</FormGroup>
											</div>
										</div>
									</CardBody>
								</>
							)}
							{activeTab === TABS.ORDERITEM && (
								<>
									<CardHeader>
										<CardLabel icon='Chat' iconColor='info'>
											<CardTitle>Order Item</CardTitle>
											<CardSubTitle>List order</CardSubTitle>
										</CardLabel>
									</CardHeader>
									<CardBody isScrollable>
										<div className='row g-12'>
											<table className='table table-modern table-hover'>
												<thead>
													<tr>
														<th scope='col'>Thumbnail Product</th>
														<th>Code</th>
														<th>Price</th>
														<th>Color</th>
														<th>Size</th>
														<th>Amount</th>
														<th>Note</th>
														<th>Ship</th>
														<th>Total price</th>
														<th>Ship start</th>
														<th>Ship end</th>
														{/* <td />
														<td />
														<td /> */}
													</tr>
												</thead>
												<tbody>
													{dataform.orderitem.map((item) => (
														<tr key={item._id}>
															<td>
																<img
																	style={{
																		width: 50,
																		height: 50,
																		botderRadius: 4,
																	}}
																	src={item?.product?.thumbnail}
																	alt='alt'
																/>
															</td>
															<td>
																<div className='d-flex align-items-center'>
																	<span className='text-nowrap'>
																		{item?.product?.code}
																	</span>
																</div>
															</td>
															<td>
																<div>{item?.price}</div>
															</td>
															<td>
																<div>{item?.color}</div>
															</td>
															<td>
																<div className='d-flex'>
																	<div className='flex-grow-1 ms-3 d-flex align-items-center text-nowrap'>
																		{item?.size}
																	</div>
																</div>
															</td>
															<td>{item?.amount}</td>

															<td>{item?.note}</td>
															<td>{item?.ship}</td>
															<td>
																{parseInt(item.ship, 10) +
																	parseInt(item.amount, 10) *
																		parseInt(item.price, 10)}
															</td>
															<td>
																{' '}
																{new Date(
																	item.ship_start,
																).toLocaleDateString()}
															</td>
															<td>
																{' '}
																{new Date(
																	item.ship_end,
																).toLocaleDateString()}
															</td>
															{/* <td>
																<Dropdown>
																	<DropdownToggle hasIcon={false}>
																		<Button
																			isLink
																			icon='Circle'
																			className='text-nowrap'>
																			{dataform.status}
																		</Button>
																	</DropdownToggle>
																	<DropdownMenu>
																		{Object.keys(
																			EVENT_ORDER_STATUS,
																		).map((key) => (
																			<DropdownItem
																				key={key}
																				onClick={() =>
																					putStatusOrder(
																						EVENT_ORDER_STATUS[
																							key
																						].name,
																					)
																				}>
																				<div>
																					<Icon
																						icon='Circle'
																						color={
																							EVENT_ORDER_STATUS[
																								key
																							].color
																						}
																					/>
																					{
																						EVENT_ORDER_STATUS[
																							key
																						].name
																					}
																				</div>
																			</DropdownItem>
																		))}
																	</DropdownMenu>
																</Dropdown>
															</td>
															<td>
																<Button
																	color='dark'
																	onClick={() =>
																		navigate(
																			`../${demoPages.sales.subMenu.view_order.path}/${item._id}`,
																			{ state: { item } },
																		)
																	}>
																	Edit
																</Button>
															</td>
															<td>
																<Button
																	color='dark'
																	onClick={() =>
																		navigate(
																			`../${demoPages.sales.subMenu.view_order.path}/${item._id}`,
																			{ state: { item } },
																		)
																	}>
																	Delete
																</Button>
															</td> */}
														</tr>
													))}
												</tbody>
											</table>
										</div>
									</CardBody>
								</>
							)}
						</Card>
					</div>
				</div>
			</Page>
		</PageWrapper>
	);
};

export default ViewOrder;
