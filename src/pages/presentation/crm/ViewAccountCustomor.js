import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

import moment from 'moment';
import PageWrapper from '../../../layout/PageWrapper/PageWrapper';
import SubHeader, {
	SubHeaderLeft,
	SubHeaderRight,
	SubheaderSeparator,
} from '../../../layout/SubHeader/SubHeader';
import Page from '../../../layout/Page/Page';
import { demoPages } from '../../../menu';
// import data from '../../../common/data/dummyCustomerData';
import Button from '../../../components/bootstrap/Button';
import Card, {
	CardActions,
	CardBody,
	CardHeader,
	CardLabel,
	CardTitle,
} from '../../../components/bootstrap/Card';
import Avatar from '../../../components/Avatar';
import Icon from '../../../components/icon/Icon';
import { priceFormat } from '../../../helpers/helpers';

import EditAccountCustomor from './EditAccountCustomor';
// import { getColorNameWithIndex } from '../../../common/data/enumColors';
import useDarkMode from '../../../hooks/useDarkMode';
import { GetAccount, DeleteAccount } from '../../../redux/actions/accounts';

const ViewAccountCustomor = () => {
	const { darkModeStatus } = useDarkMode();
	const navigate = useNavigate();
	const location = useLocation();
	const dispatch = useDispatch();

	// const accountInfo = localStorage.getItem('accountinfo');
	// const accessToken = localStorage.getItem('accessToken');
	// const refreshToken = localStorage.getItem('refreshToken');
	// const accountId = JSON.parse(accountInfo);
	// const token = JSON.parse(accessToken);
	// const refreshtoken = JSON.parse(refreshToken);

	const { accountDetail } = useSelector((state) => state.account);
	console.log(location.state.item._id, 'location.state.item._id');

	
	useEffect(() => {
		
		dispatch(GetAccount(location.state.item._id));
	}, [dispatch, location.state.item._id]);

	const [dataAccount, setDataAccount] = React.useState({
		_id: accountDetail?._id,
		fullname: accountDetail?.fullname,
		username: accountDetail?.username,
		phone: accountDetail?.phone,
		streetAddress: accountDetail?.streetAddress,
		wardCommunedistrictAddress: accountDetail?.wardCommunedistrictAddress,
		cityAddress: accountDetail?.cityAddress,
		zipAddress: accountDetail?.zipAddress,
		district: accountDetail?.district,
		province: accountDetail?.province,
		ward: accountDetail?.ward,
		zip: accountDetail?.zip,
	});

	useEffect(() => {
		setDataAccount({
			_id: accountDetail._id,
			fullname: accountDetail?.fullname,
			username: accountDetail?.username,
			phone: accountDetail?.phone,
			streetAddress: accountDetail?.streetAddress,
			wardCommunedistrictAddress: accountDetail?.wardCommunedistrictAddress,
			cityAddress: accountDetail?.cityAddress,
			zipAddress: accountDetail?.zipAddress,
			district: accountDetail?.district,
			province: accountDetail?.province,
			ward: accountDetail?.ward,
			zip: accountDetail?.zip,
		});
	}, [location.state.item._id, accountDetail]);

	// console.log(accountDetail,'accountDetail')

	const [editModalStatus, setEditModalStatus] = useState(false);
	const handleClickEdit = () => {
		setEditModalStatus(true);
	};
	const handleClickDelete = () => {
		dispatch(DeleteAccount(location.state.item._id));
		navigate('/admin/account/customor');
	};

	return (
		<PageWrapper title={demoPages.crm.subMenu.customer.text}>
			<SubHeader>
				<SubHeaderLeft>
					<Button
						color='primary'
						isLink
						icon='ArrowBack'
						tag='a'
						to={`../${demoPages.crm.subMenu.customersList.path}`}>
						Back to List
					</Button>
					<SubheaderSeparator />
					<span className='text-muted fst-italic me-2'>Last update:</span>
					<span className='fw-bold'>13 hours ago</span>
				</SubHeaderLeft>
				<SubHeaderRight>
					<Button icon='Edit' color='primary' isLight onClick={handleClickEdit}>
						Edit
					</Button>
					<Button icon='Delete' color='primary' isLight onClick={handleClickDelete}>
						Delete
					</Button>
				</SubHeaderRight>
			</SubHeader>
			<Page>
				<div className='pt-3 pb-5 d-flex align-items-center'>
					<span className='display-4 fw-bold me-3'>{dataAccount?.fullname}</span>
					<span className='border border-success border-2 text-success fw-bold px-3 py-2 rounded'>
						{dataAccount?.create_date}
					</span>
				</div>
				<div className='row'>
					<div className='col-lg-4'>
						<Card className='shadow-3d-primary'>
							<CardBody>
								<div className='row g-5 py-3'>
									<div className='col-12 d-flex justify-content-center'>
										<Avatar
											src={dataAccount?.avatar ? dataAccount?.avatar : "https://img.redro.pl/obrazy/user-icon-vector-people-icon-profile-vector-icon-person-illustration-business-user-icon-users-group-symbol-male-user-symbol-700-223068879.jpg"}
											srcSet={dataAccount?.avatar}
											// color={getColorNameWithIndex(dataAccount.id)}
											// isOnline={dataAccount.isOnline}
										/>
									</div>
									<div className='col-12'>
										<div className='row g-3'>
											<div className='col-12'>
												<div className='d-flex align-items-center'>
													<div className='flex-shrink-0'>
														<Icon
															icon='Mail'
															size='3x'
															color='primary'
														/>
													</div>
													<div className='flex-grow-1 ms-3'>
														<div className='fw-bold fs-5 mb-0'>
															{dataAccount?.username}
														</div>
														<div className='text-muted'>
															Email Address
														</div>
													</div>
												</div>
											</div>
											<div className='col-12'>
												<div className='d-flex align-items-center'>
													<div className='flex-shrink-0'>
														<Icon
															icon='Lock'
															size='3x'
															color='primary'
														/>
													</div>
													<div className='flex-grow-1 ms-3'>
														<div className='fw-bold fs-5 mb-0'>
															{dataAccount?.password}
														</div>
														<div className='text-muted'>Password</div>
													</div>
												</div>
											</div>
										</div>
									</div>
								</div>
							</CardBody>
						</Card>
						<Card>
							<CardHeader>
								<CardLabel icon='StackedLineChart'>
									<CardTitle>Statics</CardTitle>
								</CardLabel>
								<CardActions>
									Only in <strong>{moment().format('MMM')}</strong>.
								</CardActions>
							</CardHeader>
							<CardBody>
								<div className='row g-4 align-items-center'>
									<div className='col-xl-6'>
										<div
											className={`d-flex align-items-center bg-l${
												darkModeStatus ? 'o25' : '10'
											}-warning rounded-2 p-3`}>
											<div className='flex-shrink-0'>
												<Icon icon='DoneAll' size='3x' color='warning' />
											</div>
											<div className='flex-grow-1 ms-3'>
												<div className='fw-bold fs-3 mb-0'>135</div>
												<div className='text-muted mt-n2 truncate-line-1'>
													Sales
												</div>
											</div>
										</div>
									</div>
									<div className='col-xl-6'>
										<div
											className={`d-flex align-items-center bg-l${
												darkModeStatus ? 'o25' : '10'
											}-info rounded-2 p-3`}>
											<div className='flex-shrink-0'>
												<Icon icon='Savings' size='3x' color='info' />
											</div>
											<div className='flex-grow-1 ms-3'>
												<div className='fw-bold fs-3 mb-0'>
													{priceFormat(1260)}
												</div>
												<div className='text-muted mt-n2 truncate-line-1'>
													Earning
												</div>
											</div>
										</div>
									</div>
									<div className='col-xl-6'>
										<div
											className={`d-flex align-items-center bg-l${
												darkModeStatus ? 'o25' : '10'
											}-primary rounded-2 p-3`}>
											<div className='flex-shrink-0'>
												<Icon icon='Star' size='3x' color='primary' />
											</div>
											<div className='flex-grow-1 ms-3'>
												<div className='fw-bold fs-3 mb-0'>4.96</div>
												<div className='text-muted mt-n2 truncate-line-1'>
													Rating
												</div>
											</div>
										</div>
									</div>
									<div className='col-xl-6'>
										<div
											className={`d-flex align-items-center bg-l${
												darkModeStatus ? 'o25' : '10'
											}-success rounded-2 p-3`}>
											<div className='flex-shrink-0'>
												<Icon icon='Timer' size='3x' color='success' />
											</div>
											<div className='flex-grow-1 ms-3'>
												<div className='fw-bold fs-3 mb-0'>3 years</div>
												<div className='text-muted mt-n2'>Membership</div>
											</div>
										</div>
									</div>
								</div>
							</CardBody>
						</Card>
					</div>
					<div className='col-lg-8'>
						<Card>
							<CardHeader>
								<CardLabel icon='Receipt'>
									<CardTitle>Product Buy</CardTitle>
								</CardLabel>
							</CardHeader>
							<CardBody>
								<table className='table table-modern table-hover'>
									<thead>
										<tr>
											<th className='cursor-pointer text-decoration-underline'>
												Name <Icon size='lg' icon='FilterList' />
											</th>
											<th className='cursor-pointer text-decoration-underline'>
												Date <Icon size='lg' icon='FilterList' />
											</th>
											<th className='cursor-pointer text-decoration-underline'>
												Price <Icon size='lg' icon='FilterList' />
											</th>
										</tr>
									</thead>
								</table>
							</CardBody>
						</Card>
						<Card>
							<CardHeader>
								<CardLabel icon='MapsHomeWork'>
									<CardTitle>Info account</CardTitle>
								</CardLabel>
							</CardHeader>
							<CardBody>
								<div className='row'>
									<div className='col-md-6'>
										<p className='lead fw-bold'>Billing address</p>
										<div>{dataAccount?.phone}</div>
										<div>{dataAccount?.streetAddress}</div>
										<div>{dataAccount?.wardCommunedistrictAddress}</div>
										<div>{dataAccount?.cityAddress}</div>
										<div>{dataAccount?.zipAddress}</div>
										<br />
										<div className='row g-2'>
											<div className='col-auto'>
												<Button
													icon='Edit'
													color='dark'
													isLight
													onClick={handleClickEdit}>
													Edit
												</Button>
											</div>
											<div className='col-auto'>
												<Button icon='Location On' color='primary' isLight>
													Make Primary
												</Button>
											</div>
										</div>
									</div>
									<div className='col-md-6'>
										<p className='lead fw-bold'>Role</p>
										<div>{dataAccount?.role}</div>
										<div className='row g-2'>
											<div className='col-auto'>
												<Button
													icon='Edit'
													color='dark'
													isLight
													onClick={handleClickEdit}>
													Edit
												</Button>
											</div>
											<div className='col-auto'>
												<Button
													icon='LocationOn'
													color='primary'
													isLight
													isDisable>
													Primary
												</Button>
											</div>
										</div>
									</div>
								</div>
							</CardBody>
						</Card>
					</div>
				</div>
			</Page>
			<EditAccountCustomor
				setIsOpen={setEditModalStatus}
				isOpen={editModalStatus}
				data={dataAccount}
			/>
		</PageWrapper>
	);
};

export default ViewAccountCustomor;
