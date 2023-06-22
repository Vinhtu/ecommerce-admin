import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import moment from 'moment';
import { useNavigate } from 'react-router-dom';

import { useDispatch } from 'react-redux';
import { Calendar as DatePicker } from 'react-date-range';
import { useFormik } from 'formik';
import PageWrapper from '../../../layout/PageWrapper/PageWrapper';
import SubHeader, {
	SubHeaderLeft,
	SubHeaderRight,
	SubheaderSeparator,
} from '../../../layout/SubHeader/SubHeader';

import Page from '../../../layout/Page/Page';
import { demoPages } from '../../../menu';
import Card, { CardBody } from '../../../components/bootstrap/Card';
import {
	// getFirstLetter,
	priceFormat,
} from '../../../helpers/helpers';
import data from '../../../common/data/dummyCustomerData';
import PaginationButtons, {
	dataPagination,
	PER_COUNT,
} from '../../../components/PaginationButtons';
import Button from '../../../components/bootstrap/Button';
import Icon from '../../../components/icon/Icon';
import Input from '../../../components/bootstrap/forms/Input';
import Dropdown, {
	DropdownItem,
	DropdownMenu,
	DropdownToggle,
} from '../../../components/bootstrap/Dropdown';
import FormGroup from '../../../components/bootstrap/forms/FormGroup';
import Checks, { ChecksGroup } from '../../../components/bootstrap/forms/Checks';
import PAYMENTS from '../../../common/data/enumPaymentMethod';
import useSortableData from '../../../hooks/useSortableData';
import InputGroup, { InputGroupText } from '../../../components/bootstrap/forms/InputGroup';
import Popovers from '../../../components/bootstrap/Popovers';
import NewAccountCustomor from '../crm/NewAccountCustomor';
// import { getColorNameWithIndex } from '../../../common/data/enumColors';
// import useDarkMode from '../../../hooks/useDarkMode';
import { PostAccountDates, GetAccounts } from '../../../redux/actions/accounts';
// import { GetAdminAccountNotifications } from '../../../redux/actions/notifications';
import useDarkMode from '../../../hooks/useDarkMode';

// import classNames from 'classnames';

const AccountCustomorPage = () => {
	const dispatch = useDispatch();
	const { themeStatus } = useDarkMode();
	const navigate = useNavigate();
	const { accountList } = useSelector((state) => state.account);
	const { notificationAdminAccountList } = useSelector((state) => state.notification);
	const { isPostAccount, isPutAccount, isDeleteAccount } = useSelector((state) => state.account);

	// const accountInfo = localStorage.getItem('accountinfo');
	const accessToken = localStorage.getItem('accessToken');
	// const refreshToken = localStorage.getItem('refreshToken');
	// const account_id = JSON.parse(accountInfo);
	const token = JSON.parse(accessToken);
	// const refreshtoken = JSON.parse(refreshToken);


	console.log(token, accessToken, 'token');

	const accounts = [
		{
			id: 1,
			_id: 3,
			fullname: 'test',
			phone: 'test',
			username: 'test',
			password: 'test',
			create_date: 'test',
			streetAddress: 'test',
			wardCommunedistrictAddress: 'test',
			cityAddress: 'test',
			zipAddress: 'test',
			role: 'test',
			status: 'test',
		},
	];
	useEffect(() => {
		dispatch(GetAccounts(token));
		// dispatch(GetAdminAccountNotifications(token));
	}, [dispatch, token]);

	useEffect(() => {
		dispatch(GetAccounts(token));
	}, [dispatch, token,isPostAccount, isDeleteAccount, isPutAccount]);

	let numberNewRegisterNotificationAdminAccountList = 0;
	let numberNewDeleteNotificationAdminAccountList = 0;

	if (notificationAdminAccountList) {
		for (let i = 0; i < notificationAdminAccountList.length; i += 1) {
			if (
				notificationAdminAccountList[i].status === 'Pending' &&
				notificationAdminAccountList[i].title === 'Register Account'
			) {
				numberNewRegisterNotificationAdminAccountList += 1;
			}
			if (
				notificationAdminAccountList[i].status === 'Pending' &&
				notificationAdminAccountList[i].title === 'Delete Account'
			) {
				numberNewDeleteNotificationAdminAccountList += 1;
			}
		}
	}
	console.log(accountList, 'accountList');

	// const { darkModeStatus } = useDarkMode();
	const [date, setDate] = useState(new Date());
	const [currentPage, setCurrentPage] = useState(1);
	const [perPage, setPerPage] = useState(PER_COUNT['10']);
	const formik = useFormik({
		initialValues: {
			searchInput: '',
			payment: Object.keys(PAYMENTS).map((i) => PAYMENTS[i].name),
			minPrice: '',
			maxPrice: '',
		},
		// eslint-disable-next-line no-unused-vars
		onSubmit: (values) => {
			// alert(JSON.stringify(values, null, 2));
		},
	});

	const filteredData = accountList
		? accountList.data?.results?.filter(
				(f) =>
					// Name
					f?.fullname?.toLowerCase().includes(formik.values.searchInput.toLowerCase()) &&
					// Price
					(formik.values.minPrice === '' || f.balance > formik.values.minPrice) &&
					(formik.values.maxPrice === '' || f.balance < formik.values.maxPrice),
				// Payment Type
		  )
		: accounts.filter(
				(f) =>
					// Name
					f.fullname.toLowerCase().includes(formik.values.searchInput.toLowerCase()) &&
					// Price
					(formik.values.minPrice === '' || f.balance > formik.values.minPrice) &&
					(formik.values.maxPrice === '' || f.balance < formik.values.maxPrice),
				// Payment Type
		  );
	const { items, requestSort, getClassNamesFor } = useSortableData(filteredData);

	const [editModalStatus, setEditModalStatus] = useState(false);

	const datebody = {
		startDate: moment(date).startOf('month').format('YYYY-MM-DD'),
		endDate: moment(date).endOf('month').format('YYYY-MM-DD'),
	};

	const PostAccountDate = () => {
		dispatch(PostAccountDates(datebody));
	};
	const { accountLogin } = useSelector((state) => state.account);

	useEffect(() => {
		console.log(accountLogin, 'account login2 ', 'da vo useEffect 2');
	});
	return (
		<PageWrapper title={demoPages.crm.subMenu.customersList.text}>
			<SubHeader className='mb-3'>
				<SubHeaderLeft>
					<Icon icon='Info' className='me-2' size='2x' />
					<span className='text-muted'>
						You have <Icon icon='TaskAlt' color='success' className='mx-1' size='lg' />{' '}
						{numberNewRegisterNotificationAdminAccountList} new register account{' '}
						<Icon icon='Alarm' color='warning' className='mx-1' size='lg' />
						{numberNewDeleteNotificationAdminAccountList} new delete account
					</span>
				</SubHeaderLeft>
				<SubHeaderRight>
					<Popovers
						desc={
							<DatePicker
								onChange={(item) => setDate(item)}
								date={date}
								color={process.env.REACT_APP_PRIMARY_COLOR}
							/>
						}
						placement='bottom-end'
						className='mw-100'
						trigger='click'>
						<Button color={themeStatus} onClick={() => PostAccountDate()}>
							{`${moment(date).startOf('month').format('DD-MM-YYYY')} -> ${moment(
								date,
							)
								.endOf('month')
								.format('DD-MM-YYYY')}`}
						</Button>
					</Popovers>
				</SubHeaderRight>
			</SubHeader>
			<SubHeader>
				<SubHeaderLeft>
					<label
						className='border-0 bg-transparent cursor-pointer me-0'
						htmlFor='searchInput'>
						<Icon icon='Search' size='2x' color='primary' />
					</label>
					<Input
						id='searchInput'
						type='search'
						className='border-0 shadow-none bg-transparent'
						placeholder='Search customer...'
						onChange={formik.handleChange}
						value={formik.values.searchInput}
					/>
				</SubHeaderLeft>
				<SubHeaderRight>
					<Dropdown>
						<DropdownToggle hasIcon={false}>
							<Button
								icon='FilterAlt'
								color='dark'
								isLight
								className='btn-only-icon position-relative'>
								{data.length !== filteredData.length && (
									<Popovers desc='Filtering applied' trigger='hover'>
										<span className='position-absolute top-0 start-100 translate-middle badge border border-light rounded-circle bg-danger p-2'>
											<span className='visually-hidden'>
												there is filtering
											</span>
										</span>
									</Popovers>
								)}
							</Button>
						</DropdownToggle>
						<DropdownMenu isAlignmentEnd size='lg'>
							<div className='container py-2'>
								<div className='row g-3'>
									<FormGroup label='Balance' className='col-12'>
										<InputGroup>
											<Input
												id='minPrice'
												ariaLabel='Minimum price'
												placeholder='Min.'
												onChange={formik.handleChange}
												value={formik.values.minPrice}
											/>
											<InputGroupText>to</InputGroupText>
											<Input
												id='maxPrice'
												ariaLabel='Maximum price'
												placeholder='Max.'
												onChange={formik.handleChange}
												value={formik.values.maxPrice}
											/>
										</InputGroup>
									</FormGroup>
									<FormGroup label='Payments' className='col-12'>
										<ChecksGroup>
											{Object.keys(PAYMENTS).map((payment) => (
												<Checks
													key={PAYMENTS[payment].name}
													id={PAYMENTS[payment].name}
													label={PAYMENTS[payment].name}
													name='payment'
													value={PAYMENTS[payment].name}
													onChange={formik.handleChange}
													checked={formik.values.payment.includes(
														PAYMENTS[payment].name,
													)}
												/>
											))}
										</ChecksGroup>
									</FormGroup>
								</div>
							</div>
						</DropdownMenu>
					</Dropdown>
					<SubheaderSeparator />
					<Button
						icon='PersonAdd'
						color='primary'
						isLight
						onClick={() => setEditModalStatus(true)}>
						New Customer
					</Button>
				</SubHeaderRight>
			</SubHeader>
			<Page container='fluid'>
				<div className='row h-100'>
					<div className='col-12'>
						<Card stretch>
							<CardBody isScrollable className='table-responsive'>
								<table className='table table-modern table-hover'>
									<thead>
										<tr>
											{/* <th
									onClick={() => requestSort('date')}
									className='cursor-pointer text-decoration-underline'>
									Date / Time{' '}
									<Icon
										size='lg'
										className={getClassNamesFor('date')}
										icon='FilterList'
									/>
								</th> */}
											<th
												onClick={() => requestSort('name')}
												className='cursor-pointer text-decoration-underline'>
												Customer{' '}
												<Icon
													size='lg'
													className={getClassNamesFor('name')}
													icon='FilterList'
												/>
											</th>
											<th>Email</th>
											<th>Password</th>
											<th>Phone</th>
											<th>Address</th>

											<th
												onClick={() => requestSort('balance')}
												className='cursor-pointer text-decoration-underline'>
												Balance
												<Icon
													size='lg'
													className={getClassNamesFor('balance')}
													icon='FilterList'
												/>
											</th>
											<th>Status</th>

											<td />
										</tr>
									</thead>
									<tbody>
										{dataPagination(items, currentPage, perPage).map((item) => {
											// if (item) {
											return (
												<tr key={item.id}>
													{/* <td>
													<div className='d-flex align-items-center'>
														<span
															className={classNames(
																'badge',
																'border border-2',
																[`border-${themeStatus}`],
																'rounded-circle',
																'bg-success',
																'p-2 me-2',
																`bg-${i.status.color}`,
															)}>
															<span className='visually-hidden'>
																{item.status.name}
															</span>
														</span>
														<span className='text-nowrap'>
															{moment(
																`${item.date} ${item.time}`,
															).format('MMM Do YYYY, h:mm a')}
														</span>
													</div>
												</td> */}
													<td>
														<div className='d-flex align-items-center'>
															<div className='flex-shrink-0'>
																<img
																	src={item?.avatar ?  item.avatar : "https://img.redro.pl/obrazy/user-icon-vector-people-icon-profile-vector-icon-person-illustration-business-user-icon-users-group-symbol-male-user-symbol-700-223068879.jpg"}
																	alt='s'
																	width={54}
																	height={54}
																	style={{
																		borderRadius: 8,
																		marginRight: 4,
																	}}
																/>
															</div>
															<div className='flex-grow-1'>
																<div className='fs-6 fw-bold'>
																	{item.fullname}
																</div>
																<div className='text-muted'>
																	<Icon icon='Label' />{' '}
																	<small>
																		{item.create_date}
																	</small>
																</div>
															</div>
														</div>
													</td>
													<td>
														<Button
															isLink
															color='light'
															icon='Email'
															className='text-lowercase'
															tag='a'
															href={`mailto:${item.username}`}>
															{item.username}
														</Button>
													</td>
													<td>
														{/* <div>{i.membershipDate.format('ll')}</div> */}
														<div>
															<small className='text-muted'>
																{item.password}
															</small>
														</div>
													</td>

													<td>{priceFormat(item.phone)}</td>
													<td>{item.streetAddress}</td>
													<td>{item.p_price}</td>

													<td>
														{/* <Icon
														size='lg'
														icon={`custom ${i.payout.toLowerCase()}`}
													/>{' '} */}
														<td>{item.status}</td>
													</td>
													<td>
														<Dropdown>
															<DropdownToggle hasIcon={false}>
																<Button
																	icon='MoreHoriz'
																	color='dark'
																	isLight
																	shadow='sm'
																/>
															</DropdownToggle>
															<DropdownMenu isAlignmentEnd>
																<DropdownItem>
																	<Button
																		icon='Visibility'
																		tag='a'
																		onClick={() =>
																			navigate(
																				`../${demoPages.crm.subMenu.ViewAccountCustomor.path}/${item._id}`, { state: { item } },
																				
																			)
																		}
																		>
																		View
																	</Button>
																</DropdownItem>
															</DropdownMenu>
														</Dropdown>
													</td>
												</tr>
											);
											// }
											// return(null)
										})}
									</tbody>
								</table>
							</CardBody>
							<PaginationButtons
								data={filteredData}
								label='customers'
								setCurrentPage={setCurrentPage}
								currentPage={currentPage}
								perPage={perPage}
								setPerPage={setPerPage}
							/>
						</Card>
					</div>
				</div>
			</Page>
			<NewAccountCustomor setIsOpen={setEditModalStatus} isOpen={editModalStatus} />
		</PageWrapper>
	);
};

export default AccountCustomorPage;
