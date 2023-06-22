import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
// import classNames from 'classnames';
import { useNavigate } from 'react-router-dom';

// import moment from 'moment';
// import { useFormik } from 'formik';
// import { Calendar as DatePicker } from 'react-date-range';
// import classNames from 'classnames';
import SubHeader, {
	SubHeaderLeft,
	// SubHeaderRight,
	// SubheaderSeparator,
} from '../../../layout/SubHeader/SubHeader';
import Avatar from '../../../components/Avatar';
import UserImageWebp from '../../../assets/img/wanna/wanna1.webp';
import UserImage from '../../../assets/img/wanna/wanna1.png';
import Button from '../../../components/bootstrap/Button';
import PageWrapper from '../../../layout/PageWrapper/PageWrapper';
import Page from '../../../layout/Page/Page';
import Card, {
	CardActions,
	CardBody,
	CardHeader,
	CardLabel,
	CardTitle,
} from '../../../components/bootstrap/Card';
import Dropdown, {
	DropdownItem,
	DropdownMenu,
	DropdownToggle,
} from '../../../components/bootstrap/Dropdown';
// import EVENT_STATUS from '../../../common/data/enumEventStatus';

// import Chart from '../../components/extras/Chart';
// import Checks, { ChecksGroup } from '../../../components/bootstrap/forms/Checks';
// import InputGroup, { InputGroupText } from '../../../components/bootstrap/forms/InputGroup';
// import Input from '../../../components/bootstrap/forms/Input';
// import FormGroup from '../../../components/bootstrap/forms/FormGroup';
// import Label from '../../../components/bootstrap/forms/Label';
// import CommonFilterTag from '../../common/CommonFilterTag';
// import CommonTableRow from '../../common/CommonTableRow';
// import Select from '../../../components/bootstrap/forms/Select';
// import Popovers from '../../../components/bootstrap/Popovers';

// import data from '../../../common/data/dummyProductData';
import { demoPages } from '../../../menu';
import PaginationButtons, {
	dataPagination,
	PER_COUNT,
} from '../../../components/PaginationButtons';
// import NewProduct from '../crm/NewProduct';
import useSortableData from '../../../hooks/useSortableData';
import Icon from '../../../components/icon/Icon';
// import useSelectTable from '../../../hooks/useSelectTable';
// import useDarkMode from '../../../hooks/useDarkMode';
import useTourStep from '../../../hooks/useTourStep';
import { GetOrders, PutOrder } from '../../../redux/actions/orders';
import EVENT_ORDER_STATUS from '../../../common/data/enumOrderStatus';

const OrderPage = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const { orderList, isPutOrder } = useSelector((state) => state.order);
	console.log(orderList, 'orderList');

	// const accountInfo = localStorage.getItem('accountinfo');
	const accessToken = localStorage.getItem('accessToken');
	// const refreshToken = localStorage.getItem('refreshToken');
	// const account_id = JSON.parse(accountInfo);
	const token = JSON.parse(accessToken);
	// const refreshtoken = JSON.parse(refreshToken);

	console.log(token, 'token');

	useEffect(() => {
		dispatch(GetOrders(token));
	}, [dispatch, token, isPutOrder]);

	useTourStep(6);

	// const { themeStatus, darkModeStatus } = useDarkMode();

	// const [date, setDate] = useState(new Date());

	// const [filterMenu, setFilterMenu] = useState(false);
	// const formik = useFormik({
	// 	initialValues: {
	// 		minPrice: '',
	// 		maxPrice: '',
	// 		categoryName: '3D Shapes',
	// 		companyA: true,
	// 		companyB: true,
	// 		companyC: true,
	// 		companyD: true,
	// 	},
	// 	// eslint-disable-next-line no-unused-vars
	// 	onSubmit: (values) => {
	// 		// setFilterMenu(false);
	// 		// alert(JSON.stringify(values, null, 2));
	// 	},
	// });

	// const filteredData = data.filter(
	// 	(f) =>
	// 		// Category
	// 		f.category === formik.values.categoryName &&
	// 		// Price
	// 		(formik.values.minPrice === '' || f.price > formik.values.minPrice) &&
	// 		(formik.values.maxPrice === '' || f.price < formik.values.maxPrice) &&
	// 		//	Company
	// 		((formik.values.companyA ? f.store === 'Company A' : false) ||
	// 			(formik.values.companyB ? f.store === 'Company B' : false) ||
	// 			(formik.values.companyC ? f.store === 'Company C' : false) ||
	// 			(formik.values.companyD ? f.store === 'Company D' : false)),
	// );
	let arrOrder = [];

	if (orderList) {
		arrOrder = orderList.data.results;
	}

	const [currentPage, setCurrentPage] = useState(1);
	const [perPage, setPerPage] = useState(PER_COUNT['10']);

	const { items, requestSort, getClassNamesFor } = useSortableData(arrOrder);
	const onCurrentPageItems = dataPagination(items, currentPage, perPage);
	// const { selectTable, SelectAllCheck } = useSelectTable(onCurrentPageItems);
	// const [newModalStatus, setNewModalStatus] = useState(false);

	// const toViewProduct = (item) => {
	// 	navigate(`../${demoPages.sales.subMenu.viewproduct.path}/${item._id}`, { state: { item } });
	// };

	const putStatusOrder = (e, item) => {
		const datas = { status: e };
		dispatch(PutOrder(item._id, datas, token));
	};

	return (
		<PageWrapper
		// title={demoPages.listPages.subMenu.listBoxed.text}
		>
			<SubHeader>
				<SubHeaderLeft>
					<Avatar srcSet={UserImageWebp} src={UserImage} size={32} />
					<span>
						<strong>Report by</strong> Timothy J. Doe
					</span>
				</SubHeaderLeft>
			</SubHeader>
			<Page container='fluid'>
				<Card stretch data-tour='list'>
					<CardHeader>
						<CardLabel icon='ShoppingCart' iconColor='info'>
							<CardTitle>
								Top Seller{' '}
								<small className='ms-2'>
									Item:{' '}
									{/* {selectTable.values.selectedList.length
										? `${selectTable.values.selectedList.length} / `
										: null} */}
									{/* {filteredData.length} */}
								</small>
							</CardTitle>
						</CardLabel>
						<CardActions>
							<Button
								color='info'
								icon='CloudDownload'
								isLight
								tag='a'
								to={`../${demoPages.sales.subMenu.newproduct.path}`}>
								New Product
							</Button>
							<Button
								color='info'
								icon='CloudDownload'
								isLight
								tag='a'
								to='/somefile.txt'
								target='_blank'
								download>
								Export
							</Button>
							<Dropdown className='d-inline'>
								<DropdownToggle hasIcon={false}>
									<Button
										// color={themeStatus}
										icon='MoreHoriz'
									/>
								</DropdownToggle>
								<DropdownMenu isAlignmentEnd>
									<DropdownItem>
										<Button icon='Edit'>Edit</Button>
									</DropdownItem>
									<DropdownItem>
										<Button icon='Delete'>Delete</Button>
									</DropdownItem>
								</DropdownMenu>
							</Dropdown>
						</CardActions>
					</CardHeader>
					<CardBody className='table-responsive' isScrollable>
						<table className='table table-modern table-hover'>
							<thead>
								<tr>
									<th scope='col'>{/* {SelectAllCheck} */}</th>
									<th
										onClick={() => requestSort('date')}
										className='cursor-pointer text-decoration-underline'>
										Date / Time{' '}
										<Icon
											size='lg'
											className={getClassNamesFor('date')}
											icon='FilterList'
										/>
									</th>
									<th>Code</th>
									<th>Account</th>
									<th>Amount product</th>
									<th>Total price</th>

									<th>Type pay</th>
									<th>status_pay</th>
									<th>Status</th>
									<td />
								</tr>
							</thead>
							<tbody>
								{onCurrentPageItems.map((item) => (
									<tr key={item.id}>
										<td>
											<Button icon='Info' aria-label='Detailed information' />
										</td>
										<td>
											<div className='d-flex align-items-center'>
												<span className='text-nowrap'>
												{new Date(item.create_date).toLocaleDateString()}
												</span>
											</div>
										</td>
										<td>
											<div>{item.code}</div>
										</td>
										<td>
											<div>{item.account && item.account.username}</div>
										</td>
										<td>
											<div className='d-flex'>
												<div className='flex-grow-1 ms-3 d-flex align-items-center text-nowrap'>
													{item.amount}
												</div>
											</div>
										</td>
										<td>{parseInt(item.t_price, 10).toLocaleString('it-IT', {
											style: 'currency',
											currency: 'VND',
										})}</td>

										<td>{item.type_pay}</td>
										<td>{item.status_pay}</td>
										<td>
											<Dropdown>
												<DropdownToggle hasIcon={false}>
													<Button
														isLink
														icon='Circle'
														className='text-nowrap'>
														{item.status}
													</Button>
												</DropdownToggle>
												<DropdownMenu>
													{Object.keys(EVENT_ORDER_STATUS).map((key) => (
														<DropdownItem
															key={key}
															onClick={() =>
																putStatusOrder(
																	EVENT_ORDER_STATUS[key].name,
																	item,
																)
															}>
															<div>
																<Icon
																	icon='Circle'
																	color={
																		EVENT_ORDER_STATUS[key]
																			.color
																	}
																/>
																{EVENT_ORDER_STATUS[key].name}
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
												View
											</Button>
										</td>
									</tr>
								))}
							</tbody>
						</table>
					</CardBody>
					<PaginationButtons
						data={items}
						label='items'
						setCurrentPage={setCurrentPage}
						currentPage={currentPage}
						perPage={perPage}
						setPerPage={setPerPage}
					/>
				</Card>
			</Page>
			{/* <NewProduct setIsOpen={setNewModalStatus} isOpen={newModalStatus} /> */}
		</PageWrapper>
	);
};

export default OrderPage;
