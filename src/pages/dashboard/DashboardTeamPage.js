import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';

import moment from 'moment';

import {
	// Link,
	useNavigate,
} from 'react-router-dom';
import classNames from 'classnames';
import { useTour } from '@reactour/tour';
import PageWrapper from '../../layout/PageWrapper/PageWrapper';
import SubHeader, {
	SubHeaderLeft,
	SubHeaderRight,
	SubheaderSeparator,
} from '../../layout/SubHeader/SubHeader';
import Page from '../../layout/Page/Page';
import Button, { ButtonGroup } from '../../components/bootstrap/Button';
import Card, {
	CardActions,
	CardBody,
	CardHeader,
	CardLabel,
	CardSubTitle,
	CardTitle,
} from '../../components/bootstrap/Card';
import Chart from '../../components/extras/Chart';

import Dropdown, {
	DropdownItem,
	DropdownMenu,
	DropdownToggle,
} from '../../components/bootstrap/Dropdown';
import Alert, { AlertHeading } from '../../components/bootstrap/Alert';
import Icon from '../../components/icon/Icon';
// import Badge from '../../components/bootstrap/Badge';

// import Popovers from '../../components/bootstrap/Popovers';
import CommonAvatarTeam from '../../components/common/CommonAvatarTeam';
// import CommonMyWallet from '../common/CommonMyWallet';

// import Company1 from '../../assets/logos/company1.png';
// import Company2 from '../../assets/logos/company2.png';
// import Company3 from '../../assets/logos/company3.png';
// import Company4 from '../../assets/logos/company4.png';

import UserContact from '../../components/UserContact';
import Avatar, { AvatarGroup } from '../../components/Avatar';
import { demoPages } from '../../menu';
// import data from '../../common/data/dummyProductData';
import {
	average,
	//  priceFormat
} from '../../helpers/helpers';
import PercentComparison from '../../components/extras/PercentComparison';
// import
//  PaginationButtons,
//   {
// dataPagination,
//  PER_COUNT } from '../../components/PaginationButtons';
// import useSortableData from '../../hooks/useSortableData';
import useDarkMode from '../../hooks/useDarkMode';
// import Timeline, { TimelineItem } from '../../components/extras/Timeline';
// import CommonTodo from '../common/CommonTodo';
import { GetTeams } from '../../redux/actions/teams';
import { GetAccount } from '../../redux/actions/accounts';
import { GetOrders } from '../../redux/actions/orders';
import { GetProducts } from '../../redux/actions/products';

// eslint-disable-next-line react/prop-types

// const TableRow = ({ id, image, name, category, series, color, stock, price, store }) => {
// 	const { darkModeStatus } = useDarkMode();
// 	const dummyOptions = {
// 		colors: [color],
// 		chart: {
// 			type: 'line',
// 			width: 100,
// 			height: 35,
// 			sparkline: {
// 				enabled: true,
// 			},
// 		},
// 		tooltip: {
// 			theme: 'dark',
// 			fixed: {
// 				enabled: false,
// 			},
// 			x: {
// 				show: false,
// 			},
// 			y: {
// 				title: {
// 					// eslint-disable-next-line no-unused-vars
// 					formatter(seriesName) {
// 						return '';
// 					},
// 				},
// 			},
// 		},
// 		stroke: {
// 			curve: 'smooth',
// 			width: 2,
// 		},
// 	};
// 	return (
// 		<tr>
// 			<th scope='row'>{id}</th>
// 			<td>
// 				<Link to={`../${demoPages.sales.subMenu.productID.path}/${id}`}>
// 					<img src={image} alt='' width={54} height={54} />
// 				</Link>
// 			</td>
// 			<td>
// 				<div>
// 					<Link
// 						to={`../${demoPages.sales.subMenu.productID.path}/${id}`}
// 						className={classNames('fw-bold', {
// 							'link-dark': !darkModeStatus,
// 							'link-light': darkModeStatus,
// 						})}>
// 						{name}
// 					</Link>
// 					<div className='text-muted'>
// 						<small>{category}</small>
// 					</div>
// 				</div>
// 			</td>
// 			<td>
// 				<Chart
// 					series={series}
// 					options={dummyOptions}
// 					type={dummyOptions.chart.type}
// 					height={dummyOptions.chart.height}
// 					width={dummyOptions.chart.width}
// 				/>
// 			</td>
// 			<td>
// 				<span>{stock}</span>
// 			</td>
// 			<td>
// 				<span>
// 					{price.toLocaleString('en-US', {
// 						style: 'currency',
// 						currency: 'USD',
// 					})}
// 				</span>
// 			</td>
// 			<td className='h5'>
// 				<Badge
// 					color={
// 						(store === 'Company A' && 'danger') ||
// 						(store === 'Company B' && 'warning') ||
// 						(store === 'Company C' && 'success') ||
// 						'info'
// 					}>
// 					{store}
// 				</Badge>
// 			</td>
// 		</tr>
// 	);
// };

// eslint-disable-next-line react/prop-types
// const AnswerCustomer = ({ id, imgWebp, img, name, job, value, color }) => {
// 	const { darkModeStatus } = useDarkMode();

// 	const [state] = useState({
// 		series: [value],
// 		options: {
// 			chart: {
// 				type: 'radialBar',
// 				width: 50,
// 				height: 50,
// 				sparkline: {
// 					enabled: true,
// 				},
// 			},
// 			dataLabels: {
// 				enabled: false,
// 			},
// 			plotOptions: {
// 				radialBar: {
// 					hollow: {
// 						margin: 0,
// 						size: '50%',
// 					},
// 					track: {
// 						margin: 0,
// 					},
// 					dataLabels: {
// 						show: false,
// 					},
// 				},
// 			},
// 			stroke: {
// 				lineCap: 'round',
// 			},
// 			colors: [
// 				(color === 'primary' && process.env.REACT_APP_PRIMARY_COLOR) ||
// 					(color === 'secondary' && process.env.REACT_APP_SECONDARY_COLOR) ||
// 					(color === 'success' && process.env.REACT_APP_SUCCESS_COLOR) ||
// 					(color === 'info' && process.env.REACT_APP_INFO_COLOR) ||
// 					(color === 'warning' && process.env.REACT_APP_WARNING_COLOR) ||
// 					(color === 'danger' && process.env.REACT_APP_DANGER_COLOR),
// 			],
// 		},
// 	});
// 	return (
// 		<div className='col-12'>
// 			<div className='row g-2'>
// 				<div className='col d-flex'>
// 					<div className='flex-shrink-0'>
// 						<Avatar
// 							src={img}
// 							srcSet={imgWebp}
// 							size={54}
// 							userName={name}
// 							color={color}
// 						/>
// 					</div>
// 					<div className='flex-grow-1 ms-3 d-flex justify-content-between align-items-center'>
// 						<div>
// 							<Link
// 								to={`../${demoPages.appointment.subMenu.employeeID.path}/${id}`}
// 								className={classNames('fw-bold fs-6 mb-0', {
// 									'link-dark': !darkModeStatus,
// 									'link-light': darkModeStatus,
// 								})}>
// 								{name}
// 							</Link>
// 							<div className='text-muted mt-n1'>
// 								<small>{job}</small>
// 							</div>
// 						</div>
// 					</div>
// 				</div>
// 				<div className='col-auto'>
// 					<div className='d-flex align-items-center'>
// 						<Popovers desc='Remaining time' trigger='hover'>
// 							<span className='me-3'>%{value}</span>
// 						</Popovers>
// 						<Chart
// 							series={state.series}
// 							options={state.options}
// 							type={state.options.chart.type}
// 							height={state.options.chart.height}
// 							width={state.options.chart.width}
// 							className='me-3'
// 						/>
// 						<Button
// 							color='info'
// 							isLight
// 							icon='ScheduleSend'
// 							className='text-nowrap'
// 							tag='a'
// 							href='mailto:example@site.com'>
// 							Send
// 						</Button>
// 					</div>
// 				</div>
// 			</div>
// 		</div>
// 	);
// };

const DashboardTeamPage = () => {
	const dispatch = useDispatch();
	const { teamList } = useSelector((state) => state.team);
	const { accountList, accountDetail } = useSelector((state) => state.account);
	const { orderList } = useSelector((state) => state.order);
	const { productList } = useSelector((state) => state.product);



	const accountInfo = localStorage.getItem('accountinfo');
	const accountId = JSON.parse(accountInfo);
 
	console.log(accountId,'accountId')

	// console.log(accountList, orderList, productList, 'data list')

	/**
	 * Tour Start
	 */
	const { setIsOpen } = useTour();
	useEffect(() => {
		dispatch(GetTeams());
		dispatch(GetAccount(accountId));
		dispatch(GetOrders());
		dispatch(GetProducts());
		dispatch(GetAccount())
		if (localStorage.getItem('tourModalStarted') !== 'shown') {
			setTimeout(() => {
				setIsOpen(true);
				localStorage.setItem('tourModalStarted', 'shown');
			}, 3000);
		}
		return () => {};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const { themeStatus, darkModeStatus } = useDarkMode();

	const navigate = useNavigate();
	const handleOnClickToEmployeeListPage = (item) => {
		navigate(`../${demoPages.appointment.subMenu.employeeList.path}`, { state: { item } });
	};

	const TABS = {
		WEEKLY: 'Weekly',
		MONTHLY: 'Monthly',
		YEARLY: 'Yearly',
	};
	const [activeTab, setActiveTab] = useState('All');

	const [sales, setSales] = useState({
		series: [
			{
				data: [34, 32, 36, 34, 34],
			},
		],
		options: {
			colors: [process.env.REACT_APP_WARNING_COLOR],
			chart: {
				type: 'line',
				width: '100%',
				height: 150,
				sparkline: {
					enabled: true,
				},
			},
			tooltip: {
				theme: 'dark',
				fixed: {
					enabled: false,
				},
				x: {
					show: false,
				},
				y: {
					title: {
						// eslint-disable-next-line no-unused-vars
						formatter(seriesName) {
							return '';
						},
					},
				},
			},
			stroke: {
				curve: 'smooth',
				width: 2,
			},
		},
		sales: {
			compare: 0,
		},
		campaigns: {
			price: 0,
			compare: 0,
		},
		coupons: {
			price: 0,
			compare: 0,
		},
	});

	useEffect(() => {
		if (activeTab === TABS.YEARLY) {
			setSales({
				series: [
					{
						data: [34, 32, 36, 34, 34],
					},
				],
				sales: {
					compare: 24,
				},
				campaigns: {
					price: 3265.72,
					compare: 5000,
				},
				coupons: {
					price: 2654.2,
					compare: 2300,
				},
				options: sales.options,
			});
		}
		if (activeTab === TABS.MONTHLY) {
			setSales({
				series: [
					{
						data: [32, 35, 40, 30, 32],
					},
				],
				sales: {
					compare: 27,
				},
				campaigns: {
					price: 450,
					compare: 480,
				},
				coupons: {
					price: 98,
					compare: 120,
				},
				options: sales.options,
			});
		}
		// if (activeTab === TABS.WEEKLY) {
		// 	setSales({
		// 		series: [
		// 			{
		// 				data: [28, 32, 30, 29, 30],
		// 			},
		// 		],
		// 		sales: {
		// 			compare: 12,
		// 		},
		// 		campaigns: {
		// 			price: 94,
		// 			compare: 80,
		// 		},
		// 		coupons: {
		// 			price: 80,
		// 			compare: 45,
		// 		},
		// 		options: sales.options,
		// 	});
		// }
		return () => {};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [activeTab]);

	// const [year, setYear] = useState(Number(moment().format('YYYY')));
	// const companies = [
	// 	{ name: 'Người dùng', img: Company1 },
	// 	{ name: 'Doanh số báng hàng', img: Company2 },
	// ];
	// const COMPANIES_TAB = {
	// 	COMP1: companies[0].name,
	// 	COMP2: companies[1].name,
	// };
	// // const [activeCompanyTab, setActiveCompanyTab] = useState(COMPANIES_TAB.COMP1);
	// function randomize(value, x = year) {
	// 	if (x === 2019) {
	// 		if (value.toFixed(0) % 2) {
	// 			return (value * 1.5).toFixed(2);
	// 		}
	// 		return (value / 1.4).toFixed(2);
	// 	}
	// 	if (x === 2020) {
	// 		if (value.toFixed(0) % 2) {
	// 			return (value / 1.5).toFixed(2);
	// 		}
	// 		return (value * 1.4).toFixed(2);
	// 	}
	// 	if (x === 2021) {
	// 		if (value.toFixed(0) % 2) {
	// 			return (value / 2).toFixed(2);
	// 		}
	// 		return (value * 1.4).toFixed(2);
	// 	}
	// 	return value.toFixed(2);
	// }

	// const salesByStoreOptions = {
	// 	chart: {
	// 		height: 370,
	// 		type: 'line',
	// 		stacked: false,
	// 		toolbar: { show: false },
	// 	},
	// 	colors: [
	// 		process.env.REACT_APP_INFO_COLOR,
	// 		process.env.REACT_APP_SUCCESS_COLOR,
	// 		process.env.REACT_APP_WARNING_COLOR,
	// 	],
	// 	dataLabels: {
	// 		enabled: false,
	// 	},
	// 	stroke: {
	// 		width: [1, 1, 4],
	// 		curve: 'smooth',
	// 	},
	// 	plotOptions: {
	// 		bar: {
	// 			borderRadius: 5,
	// 			columnWidth: '20px',
	// 		},
	// 	},
	// 	xaxis: {
	// 		categories: [
	// 			'Jan',
	// 			'Feb',
	// 			'Mar',
	// 			'Apr',
	// 			'May',
	// 			'Jun',
	// 			'Jul',
	// 			'Aug',
	// 			'Sep',
	// 			'Oct',
	// 			'Nov',
	// 			'Dec',
	// 		],
	// 	},
	// 	yaxis: [
	// 		{
	// 			axisTicks: {
	// 				show: true,
	// 			},
	// 			axisBorder: {
	// 				show: true,
	// 				color: process.env.REACT_APP_INFO_COLOR,
	// 			},
	// 			labels: {
	// 				style: {
	// 					colors: process.env.REACT_APP_INFO_COLOR,
	// 				},
	// 			},
	// 			title: {
	// 				text: 'Income (thousand cores)',
	// 				style: {
	// 					color: process.env.REACT_APP_INFO_COLOR,
	// 				},
	// 			},
	// 			tooltip: {
	// 				enabled: true,
	// 			},
	// 		},
	// 		{
	// 			seriesName: 'Income',
	// 			opposite: true,
	// 			axisTicks: {
	// 				show: true,
	// 			},
	// 			axisBorder: {
	// 				show: true,
	// 				color: process.env.REACT_APP_SUCCESS_COLOR,
	// 			},
	// 			labels: {
	// 				style: {
	// 					colors: process.env.REACT_APP_SUCCESS_COLOR,
	// 				},
	// 			},
	// 			title: {
	// 				text: 'Operating Cash Flow (thousand cores)',
	// 				style: {
	// 					color: process.env.REACT_APP_SUCCESS_COLOR,
	// 				},
	// 			},
	// 		},
	// 		{
	// 			seriesName: 'Revenue',
	// 			opposite: true,
	// 			axisTicks: {
	// 				show: true,
	// 			},
	// 			axisBorder: {
	// 				show: true,
	// 				color: process.env.REACT_APP_WARNING_COLOR,
	// 			},
	// 			labels: {
	// 				style: {
	// 					colors: process.env.REACT_APP_WARNING_COLOR,
	// 				},
	// 			},
	// 			title: {
	// 				text: 'Revenue (thousand cores)',
	// 				style: {
	// 					color: process.env.REACT_APP_WARNING_COLOR,
	// 				},
	// 			},
	// 		},
	// 	],
	// 	tooltip: {
	// 		theme: 'dark',
	// 		fixed: {
	// 			enabled: true,
	// 			position: 'topLeft', // topRight, topLeft, bottomRight, bottomLeft
	// 			offsetY: 30,
	// 			offsetX: 60,
	// 		},
	// 	},
	// 	legend: {
	// 		horizontalAlign: 'left',
	// 		offsetX: 40,
	// 	},
	// };
	// const salesByStoreSeries1 = [
	// 	{
	// 		name: 'Income',
	// 		type: 'column',
	// 		data: [
	// 			randomize(1.4),
	// 			randomize(2),
	// 			randomize(2.5),
	// 			randomize(1.5),
	// 			randomize(2.5),
	// 			randomize(2.8),
	// 			randomize(3.8),
	// 			randomize(4.6),
	// 		],
	// 	},
	// 	{
	// 		name: 'Cash Flow',
	// 		type: 'column',
	// 		data: [
	// 			randomize(1.1),
	// 			randomize(3),
	// 			randomize(3.1),
	// 			randomize(4),
	// 			randomize(4.1),
	// 			randomize(4.9),
	// 			randomize(6.5),
	// 			randomize(8.5),
	// 		],
	// 	},
	// 	{
	// 		name: 'Revenue',
	// 		type: 'line',
	// 		data: [
	// 			randomize(20),
	// 			randomize(29),
	// 			randomize(37),
	// 			randomize(36),
	// 			randomize(44),
	// 			randomize(45),
	// 			randomize(50),
	// 			randomize(58),
	// 		],
	// 	},
	// ];
	// const salesByStoreSeries2 = [
	// 	{
	// 		name: 'Income',
	// 		type: 'column',
	// 		data: [
	// 			randomize(4.4),
	// 			randomize(5),
	// 			randomize(6.5),
	// 			randomize(7.5),
	// 			randomize(6.5),
	// 			randomize(9.8),
	// 			randomize(7.8),
	// 			randomize(6.6),
	// 		],
	// 	},
	// 	{
	// 		name: 'Cash Flow',
	// 		type: 'column',
	// 		data: [
	// 			randomize(3),
	// 			randomize(3),
	// 			randomize(5.1),
	// 			randomize(5),
	// 			randomize(7.1),
	// 			randomize(9.9),
	// 			randomize(8.5),
	// 			randomize(9.5),
	// 		],
	// 	},
	// 	{
	// 		name: 'Revenue',
	// 		type: 'line',
	// 		data: [
	// 			randomize(34),
	// 			randomize(54),
	// 			randomize(43),
	// 			randomize(63),
	// 			randomize(35),
	// 			randomize(63),
	// 			randomize(46),
	// 			randomize(53),
	// 		],
	// 	},
	// ];
	// const salesByStoreSeries3 = [
	// 	{
	// 		name: 'Income',
	// 		type: 'column',
	// 		data: [
	// 			randomize(4),
	// 			randomize(3),
	// 			randomize(2.5),
	// 			randomize(1.5),
	// 			randomize(2.5),
	// 			randomize(3.8),
	// 			randomize(3.8),
	// 			randomize(4.6),
	// 		],
	// 	},
	// 	{
	// 		name: 'Cash Flow',
	// 		type: 'column',
	// 		data: [
	// 			randomize(2),
	// 			randomize(5),
	// 			randomize(6.1),
	// 			randomize(2),
	// 			randomize(6.1),
	// 			randomize(3.9),
	// 			randomize(6.5),
	// 			randomize(8.5),
	// 		],
	// 	},
	// 	{
	// 		name: 'Revenue',
	// 		type: 'line',
	// 		data: [
	// 			randomize(34),
	// 			randomize(21),
	// 			randomize(54),
	// 			randomize(56),
	// 			randomize(34),
	// 			randomize(43),
	// 			randomize(37),
	// 			randomize(43),
	// 		],
	// 	},
	// ];
	// const salesByStoreSeries4 = [
	// 	{
	// 		name: 'Income',
	// 		type: 'column',
	// 		data: [
	// 			randomize(3),
	// 			randomize(3.2),
	// 			randomize(1.4),
	// 			randomize(1.9),
	// 			randomize(2.9),
	// 			randomize(1.8),
	// 			randomize(4.6),
	// 			randomize(4.2),
	// 		],
	// 	},
	// 	{
	// 		name: 'Cash Flow',
	// 		type: 'column',
	// 		data: [
	// 			randomize(3),
	// 			randomize(2),
	// 			randomize(3.1),
	// 			randomize(5),
	// 			randomize(3.1),
	// 			randomize(3.9),
	// 			randomize(3.5),
	// 			randomize(5.5),
	// 		],
	// 	},
	// 	{
	// 		name: 'Revenue',
	// 		type: 'line',
	// 		data: [
	// 			randomize(30),
	// 			randomize(43),
	// 			randomize(51),
	// 			randomize(19),
	// 			randomize(32),
	// 			randomize(25),
	// 			randomize(39),
	// 			randomize(42),
	// 		],
	// 	},
	// ];

	// const TOP_SELLER_FILTER = {
	// 	DAY: 'day',
	// 	WEEK: 'week',
	// 	MONTH: 'month',
	// };
	// const [topSellerFilter, setTopSellerFilter] = useState(TOP_SELLER_FILTER.DAY);
	// const filteredData = data
	// 	.filter(
	// 		(f) =>
	// 			(topSellerFilter === TOP_SELLER_FILTER.DAY && f.id < 6) ||
	// 			(topSellerFilter === TOP_SELLER_FILTER.WEEK && f.name.includes('c')) ||
	// 			(topSellerFilter === TOP_SELLER_FILTER.MONTH && f.price > 13),
	// 	)
	// 	.filter((c, index) => index < 5);

	// const [currentPage, setCurrentPage] = useState(1);
	// const [perPage, setPerPage] = useState(PER_COUNT['3']);
	// const { items, requestSort, getClassNamesFor } = useSortableData(filteredData);

	function compareLabel(amount = -1, name = false) {
		if (activeTab === TABS.YEARLY) {
			return name ? 'year' : moment().add(amount, 'year').format('YYYY');
		}
		if (activeTab === TABS.MONTHLY) {
			return name ? 'month' : moment().add(amount, 'month').format('MMMM');
		}
		return name ? 'week' : moment().add(amount, 'week').format('w [th week]');
	}

	// const accessToken = localStorage.getItem('accessToken');
	// const token = JSON.parse(accessToken);

	useEffect(() => {
		if (!accountDetail) {
			navigate('/admin/login');
		}
	});

	const [totalOrder, setTotalOrder] = React.useState({
		total: 0,
		description: '',
	});
	const [productSale, setProductSale] = React.useState({
		total: 0,
		description: '',
	});
	const [totalprice, setTotalPrice] = React.useState(0);

	const gapYear = 31536000000;
	const gapMonth = 2678400000;
	const gapWeek = 604800000;
	const gapDay = 86400000;
	const now = new Date().getTime();


	useEffect(() => {
		if (activeTab === TABS.YEARLY) {
			setTotalOrder({ ...totalOrder, total: 0 });
			let dem = 0;
			let product = 0;
			const seriesdata = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
			let totalprices = 0;
			for (let i = 0; i < orderList?.data?.results?.length; i += 1) {
				const validateGap = now - gapYear;

				if (
					new Date(orderList?.data?.results[i]?.create_date).getTime() >= validateGap &&
					new Date(orderList?.data?.results[i]?.create_date).getTime() <= now
				) {
					dem += 1;
					product += parseInt(orderList.data.results[i].amount, 10);
					totalprices += parseInt(orderList.data.results[i].t_price, 10);

					if (
						new Date(orderList.data.results[i].create_date).getTime() >= validateGap &&
						new Date(orderList.data.results[i].create_date).getTime() <=
							validateGap + gapDay + 31
					) {
						seriesdata[0] += parseInt(orderList.data.results[i].amount, 10);
					}
					if (
						new Date(orderList?.data?.results[i]?.create_date).getTime() >=
							validateGap + gapDay * 32 &&
						new Date(orderList?.data?.results[i]?.create_date).getTime() <=
							validateGap + gapDay * 63
					) {
						seriesdata[1] += parseInt(orderList.data.results[i].amount, 10);
					}
					if (
						new Date(orderList?.data?.results[i]?.create_date).getTime() >=
							validateGap + gapDay * 64 &&
						new Date(orderList?.data?.results[i]?.create_date).getTime() <=
							validateGap + gapDay * 95
					) {
						seriesdata[2] += parseInt(orderList.data.results[i].amount, 10);
					}
					if (
						new Date(orderList?.data?.results[i]?.create_date).getTime() >=
							validateGap + gapDay * 96 &&
						new Date(orderList?.data?.results[i]?.create_date).getTime() <=
							validateGap + gapDay * 127
					) {
						seriesdata[3] += parseInt(orderList.data.results[i].amount, 10);
					}
					if (
						new Date(orderList?.data?.results[i]?.create_date).getTime() >=
							validateGap + gapDay * 128 &&
						new Date(orderList?.data?.results[i]?.create_date).getTime() <=
							validateGap + gapDay * 159
					) {
						seriesdata[4] += parseInt(orderList.data.results[i].amount, 10);
					}
					if (
						new Date(orderList?.data?.results[i]?.create_date).getTime() >=
							validateGap + gapDay * 160 &&
						new Date(orderList?.data?.results[i]?.create_date).getTime() <=
							validateGap + gapDay * 191
					) {
						seriesdata[5] += parseInt(orderList.data.results[i].amount, 10);
					}
					if (
						new Date(orderList?.data?.results[i]?.create_date).getTime() >=
							validateGap + gapDay * 192 &&
						new Date(orderList?.data?.results[i]?.create_date).getTime() <=
							validateGap + gapDay * 223
					) {
						seriesdata[6] += parseInt(orderList.data.results[i].amount, 10);
					}
					if (
						new Date(orderList.data.results[i].create_date).getTime() >=
							validateGap + 224 &&
						new Date(orderList.data.results[i].create_date).getTime() <=
							validateGap + gapDay * 255
					) {
						seriesdata[7] += parseInt(orderList.data.results[i].amount, 10);
					}
					if (
						new Date(orderList?.data?.results[i]?.create_date).getTime() >=
							validateGap + gapDay * 256 &&
						new Date(orderList?.data?.results[i]?.create_date).getTime() <=
							validateGap + gapDay * 287
					) {
						seriesdata[8] += parseInt(orderList.data.results[i].amount, 10);
					}
					if (
						new Date(orderList?.data?.results[i]?.create_date).getTime() >=
							validateGap + gapDay * 288 &&
						new Date(orderList?.data?.results[i]?.create_date).getTime() <=
							validateGap + gapDay * 319
					) {
						seriesdata[9] += parseInt(orderList.data.results[i].amount, 10);
					}
					if (
						new Date(orderList?.data?.results[i]?.create_date).getTime() >=
							validateGap + gapDay * 320 &&
						new Date(orderList?.data?.results[i]?.create_date).getTime() <=
							validateGap + gapDay * 351
					) {
						seriesdata[10] += parseInt(orderList.data.results[i].amount, 10);
					}
					if (
						new Date(orderList?.data?.results[i]?.create_date).getTime() >=
							validateGap + gapDay * 352 &&
						new Date(orderList?.data?.results[i]?.create_date).getTime() <=
							validateGap + gapDay * 383
					) {
						seriesdata[11] += parseInt(orderList.data.results[i].amount, 10);
					}
				}
				if (i === orderList.data.results.length - 1) {
					setTotalOrder({
						total: dem,
						description: 'Số đơn hàng trong 1 năm',
					});
					setProductSale({
						total: product,
						description: 'Số sản phẩm bán trong 1 năm',
					});
					setSales({
						series: [
							{
								data: seriesdata,
							},
						],
						sales: {
							compare: 1,
						},
						campaigns: {
							price: 3,
							compare: 5,
						},
						coupons: {
							price: 7,
							compare: 9,
						},
						options: sales.options,
					});

					setTotalPrice(totalprices);
				}
			}
		}
		if (activeTab === TABS.MONTHLY) {
			setTotalOrder({ ...totalOrder, total: 0 });
			let dem = 0;
			let product = 0;
			let totalprices = 0;
			const seriesdata = [0, 0, 0, 0];
			for (let i = 0; i < orderList?.data?.results?.length; i += 1) {
				const validateGap = now - gapMonth;

				if (
					new Date(orderList?.data?.results[i]?.create_date).getTime() >= validateGap &&
					new Date(orderList?.data?.results[i]?.create_date).getTime() <= now
				) {
					dem += 1;
					product += parseInt(orderList.data.results[i].amount, 10);
					totalprices += parseInt(orderList.data.results[i].t_price, 10);
					if (
						new Date(orderList.data.results[i].create_date).getTime() >= validateGap &&
						new Date(orderList.data.results[i].create_date).getTime() <=
							validateGap + gapDay * 7
					) {
						seriesdata[0] += parseInt(orderList.data.results[i].amount, 10);
					}
					if (
						new Date(orderList?.data?.results[i]?.create_date).getTime() >=
							validateGap + gapDay * 7 &&
						new Date(orderList?.data?.results[i]?.create_date).getTime() <=
							validateGap + gapDay * 14
					) {
						seriesdata[1] += parseInt(orderList.data.results[i].amount, 10);
					}
					if (
						new Date(orderList?.data?.results[i]?.create_date).getTime() >=
							validateGap + gapDay * 15 &&
						new Date(orderList?.data?.results[i]?.create_date).getTime() <=
							validateGap + gapDay * 22
					) {
						seriesdata[2] += parseInt(orderList.data.results[i].amount, 10);
					}
					if (
						new Date(orderList?.data?.results[i]?.create_date).getTime() >=
							validateGap + gapDay * 23 &&
						new Date(orderList?.data?.results[i]?.create_date).getTime() <=
							validateGap + gapDay * 31
					) {
						seriesdata[3] += parseInt(orderList.data.results[i].amount, 10);
					}
				}
				if (i === orderList.data.results.length - 1) {
					setTotalOrder({
						total: dem,
						description: 'Số đơn hàng trong 30 ngày',
					});
					setProductSale({
						total: product,
						description: 'Số sản phẩm bán trong 30 ngày',
					});
					setSales({
						series: [
							{
								data: seriesdata,
							},
						],
						sales: {
							compare: 1,
						},
						campaigns: {
							price: 3,
							compare: 5,
						},
						coupons: {
							price: 7,
							compare: 9,
						},
						options: sales.options,
					});

					setTotalPrice(totalprices);
				}
			}
		}
		if (activeTab === TABS.WEEKLY) {
			setTotalOrder({ ...totalOrder, total: 0 });
			let dem = 0;
			let product = 0;
			const seriesdata = [0, 0, 0, 0, 0, 0, 0];
			let totalprices = 0;

			for (let i = 0; i < orderList?.data?.results?.length; i += 1) {
				const validateGap = now - gapWeek;

				if (
					new Date(orderList?.data?.results[i]?.create_date).getTime() >= validateGap &&
					new Date(orderList?.data?.results[i]?.create_date).getTime() <= now
				) {
					dem += 1;
					product += parseInt(orderList.data.results[i].amount, 10);
					totalprices += parseInt(orderList.data.results[i].t_price, 10);
					if (
						new Date(orderList.data.results[i].create_date).getTime() >= validateGap &&
						new Date(orderList.data.results[i].create_date).getTime() <=
							validateGap + gapDay
					) {
						seriesdata[0] += parseInt(orderList.data.results[i].amount, 10);
					}
					if (
						new Date(orderList?.data?.results[i]?.create_date).getTime() >=
							validateGap + gapDay &&
						new Date(orderList?.data?.results[i]?.create_date).getTime() <=
							validateGap + gapDay * 2
					) {
						seriesdata[1] += parseInt(orderList.data.results[i].amount, 10);
					}
					if (
						new Date(orderList?.data?.results[i]?.create_date).getTime() >=
							validateGap + gapDay * 2 &&
						new Date(orderList?.data?.results[i]?.create_date).getTime() <=
							validateGap + gapDay * 3
					) {
						seriesdata[2] += parseInt(orderList.data.results[i].amount, 10);
					}
					if (
						new Date(orderList?.data?.results[i]?.create_date).getTime() >=
							validateGap + gapDay * 3 &&
						new Date(orderList?.data?.results[i]?.create_date).getTime() <=
							validateGap + gapDay * 4
					) {
						seriesdata[3] += parseInt(orderList.data.results[i].amount, 10);
					}
					if (
						new Date(orderList?.data?.results[i]?.create_date).getTime() >=
							validateGap + gapDay * 4 &&
						new Date(orderList?.data?.results[i]?.create_date).getTime() <=
							validateGap + gapDay * 5
					) {
						seriesdata[4] += parseInt(orderList.data.results[i].amount, 10);
					}
					if (
						new Date(orderList?.data?.results[i]?.create_date).getTime() >=
							validateGap + gapDay * 5 &&
						new Date(orderList?.data?.results[i]?.create_date).getTime() <=
							validateGap + gapDay * 6
					) {
						seriesdata[5] += parseInt(orderList.data.results[i].amount, 10);
					}
					if (
						new Date(orderList?.data?.results[i]?.create_date).getTime() >=
							validateGap + gapDay * 6 &&
						new Date(orderList?.data?.results[i]?.create_date).getTime() <=
							validateGap + gapDay * 7
					) {
						seriesdata[6] += parseInt(orderList.data.results[i].amount, 10);
					}
				}
				if (i === orderList.data.results.length - 1) {
					setTotalOrder({
						total: dem,
						description: 'Số đơn hàng trong 7 ngày',
					});
					setProductSale({
						total: product,
						description: 'Số sản phẩm bán trong 7 ngày',
					});

					setSales({
						series: [
							{
								data: seriesdata,
							},
						],
						sales: {
							compare: 1,
						},
						campaigns: {
							price: 3,
							compare: 5,
						},
						coupons: {
							price: 7,
							compare: 9,
						},
						options: sales.options,
					});

					setTotalPrice(totalprices);
				}
			}
		}

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [activeTab]);

	useEffect(() => {
		if (activeTab === 'All') {
			setTotalOrder({ ...totalOrder, total: 0 });
			let dem = 0;
			let product = 0;
			const seriesdata = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
			let totalprices = 0;
			for (let i = 0; i < orderList?.data?.results?.length; i += 1) {
				dem += 1;
				product += parseInt(orderList.data.results[i].amount, 10);
				totalprices += parseInt(orderList.data.results[i].t_price, 10);

				if (i === orderList.data.results.length - 1) {
					setTotalOrder({
						total: dem,
						description: 'Số đơn hàng',
					});
					setProductSale({
						total: product,
						description: 'Số sản phẩm đã bán',
					});
					setSales({
						series: [
							{
								data: seriesdata,
							},
						],
						sales: {
							compare: 1,
						},
						campaigns: {
							price: 3,
							compare: 5,
						},
						coupons: {
							price: 7,
							compare: 9,
						},
						options: sales.options,
					});

					setTotalPrice(totalprices);
				}
			}
		}

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [orderList]);


	return (
		<PageWrapper title={demoPages.sales.subMenu.dashboard.text}>
			<SubHeader>
				<SubHeaderLeft>
					<span className='h4 mb-0 fw-bold'>Overview</span>
					<SubheaderSeparator />
					<ButtonGroup>
						{Object.keys(TABS).map((key) => (
							<Button
								key={key}
								color={activeTab === TABS[key] ? 'success' : themeStatus}
								onClick={() => setActiveTab(TABS[key])}>
								{TABS[key]}
							</Button>
						))}
					</ButtonGroup>
				</SubHeaderLeft>
				<SubHeaderRight>
					<CommonAvatarTeam>
						<strong>Marketing</strong> Team
					</CommonAvatarTeam>
				</SubHeaderRight>
			</SubHeader>
			<Page container='fluid'>
				<div className='row'>
					<div className='col-12'>
						<Alert
							icon='Verified'
							isLight
							color='primary'
							borderWidth={0}
							className='shadow-3d-primary'
							isDismissible>
							<AlertHeading tag='h2' className='h4'>
								Congratulations! 🎉
							</AlertHeading>
							<span>You have reached your monthly sales targets.</span>
						</Alert>
					</div>

					<div className='col-xl-4'>
						<UserContact
							name={accountDetail?.fullname}
							position={accountDetail?.team}
							mail={accountDetail?.username}
							phone={accountDetail?.phone}
							onChat={() =>
								navigate(`../${demoPages.chat.subMenu.withListChat.path}`)
							}
							src={accountDetail?.avatar ? accountDetail?.avatar : "https://static.vecteezy.com/system/resources/previews/002/318/271/original/user-profile-icon-free-vector.jpg"}
							srcSet={accountDetail?.avatar}
							color={accountDetail?.avatar}
						/>
					</div>
					{teamList &&
						teamList.data.results.map((item) => {
							let amount = 0;
							const listConvert = [];
							if (accountList) {
								for (let i = 0; i < accountList.data.results.length; i += 1) {
									if (
										accountList.data.results[i].role === 'Admin' &&
										accountList.data.results[i].team === item.name
									) {
										listConvert.push(accountList.data.results[i]);
										amount += 1;
									}
								}
							}
							return (
								<div className='col-xl-4'>
									<Card stretch>
										<CardHeader className='bg-transparent'>
											<CardLabel>
												<CardTitle tag='h4' className='h5'>
													{item.name} Teams
												</CardTitle>
												<CardSubTitle tag='h5' className='h6 text-muted'>
													<p>Have {amount} remembers</p>
												</CardSubTitle>
											</CardLabel>
											<CardActions>
												<Button
													icon='ArrowForwardIos'
													aria-label='Read More'
													hoverShadow='default'
													color={darkModeStatus ? 'dark' : null}
													onClick={() =>
														handleOnClickToEmployeeListPage(listConvert)
													}
												/>
											</CardActions>
										</CardHeader>
										<CardBody>
											<AvatarGroup>
												{listConvert.map((account) => (
													<Avatar
														srcSet={account.avatar}
														src={account.avatar}
														userName={account.fullname}
														color='white'
													/>
												))}
											</AvatarGroup>
										</CardBody>
									</Card>
								</div>
							);
						})}
					<div className='col-12' />
					<div className='col-xxl-12'>
						<Card stretch>
							<CardHeader>
								<CardLabel icon='PointOfSale' iconColor='success'>
									<CardTitle tag='h4' className='h5'>
										Income
									</CardTitle>
									<CardSubTitle>{activeTab}</CardSubTitle>
								</CardLabel>
								<CardActions>
									<Dropdown>
										<DropdownToggle>
											<Button color='info' icon='Compare' isLight>
												Compared to <strong>{compareLabel()}</strong>
											</Button>
										</DropdownToggle>
										<DropdownMenu isAlignmentEnd size='sm'>
											<DropdownItem>
												<Button>{compareLabel(-2)}</Button>
											</DropdownItem>
											<DropdownItem>
												<Button>{compareLabel(-3)}</Button>
											</DropdownItem>
										</DropdownMenu>
									</Dropdown>
								</CardActions>
							</CardHeader>
							<CardBody>
								<div className='row g-4'>
									<div className='col-md-6'>
										<Card
											className={classNames(
												'transition-base rounded-2 mb-0 text-dark',
												{
													'bg-l25-warning bg-l10-warning-hover':
														!darkModeStatus,
													'bg-lo50-warning bg-lo25-warning-hover':
														darkModeStatus,
												},
											)}
											stretch
											shadow='sm'>
											<CardHeader className='bg-transparent'>
												<CardLabel>
													<CardTitle tag='h4' className='h5'>
														Thông số bán
													</CardTitle>
												</CardLabel>
											</CardHeader>
											<CardBody>
												<Chart
													className='mx-n4'
													series={sales.series}
													options={sales.options}
													type={sales.options.chart.type}
													height={sales.options.chart.height}
													width={sales.options.chart.width}
												/>
												<div className='d-flex align-items-center pb-3'>
													<div className='flex-shrink-0'>
														<Icon
															icon='AttachMoney'
															size='4x'
															color='warning'
														/>
													</div>
													<div className='flex-grow-1 ms-3'>
														<div className='fw-bold fs-3 mb-0'>
															{/* {priceFormat(
																average(sales.series[0].data),
															)} */}
															{/* {totalprice} */}

															{parseInt(
																totalprice,
																10,
															).toLocaleString('it-IT', {
																style: 'currency',
																currency: 'VND',
															})}
															<PercentComparison
																valueOne={average(
																	sales.series[0].data,
																)}
																valueTwo={sales.sales.compare}
															/>
														</div>
														<div
															className={classNames({
																'text-muted': !darkModeStatus,
																'text-light': darkModeStatus,
															})}>
															{/* Compared to (
															{priceFormat(sales.sales.compare)} last{' '}
															{compareLabel(0, true)}) */}
															{activeTab === TABS.MONTHLY &&
																'Doanh thu 30 ngày'}

															{activeTab === TABS.YEARLY &&
																'Doanh thu trong 1 năm'}
															{activeTab === TABS.WEEKLY &&
																'Doanh thu trong 7 ngày'}
															{activeTab === 'All' &&
																'Tổng doanh thu'}
														</div>
													</div>
												</div>
											</CardBody>
										</Card>
									</div>
									<div className='col-md-3'>
										<Card
											className={classNames(
												'transition-base rounded-2 mb-4 text-dark',
												{
													'bg-l25-secondary bg-l10-secondary-hover':
														!darkModeStatus,
													'bg-lo50-secondary bg-lo25-secondary-hover':
														darkModeStatus,
												},
											)}
											shadow='sm'>
											<CardHeader className='bg-transparent'>
												<CardLabel>
													<CardTitle tag='h4' className='h5'>
														Tổng sản phẩm
													</CardTitle>
												</CardLabel>
											</CardHeader>
											<CardBody>
												<div className='d-flex align-items-center pb-3'>
													<div className='flex-shrink-0'>
														<Icon
															icon='LocalOffer'
															size='4x'
															color='secondary'
														/>
													</div>
													<div className='flex-grow-1 ms-3'>
														<div className='fw-bold fs-3 mb-0'>
															{/* {priceFormat(sales.campaigns.price)} */}
															{productList?.length} sản phẩm
															{/* <PercentComparison
																valueOne={sales.campaigns.price}
																valueTwo={sales.campaigns.compare}
															/> */}
														</div>
														<div
															className={classNames({
																'text-muted': !darkModeStatus,
																'text-light': darkModeStatus,
															})}>
															{/* Compared to (
															{priceFormat(sales.campaigns.compare)}{' '}
															last {compareLabel(0, true)}) */}
															Tổng sản phẩm có trong Database
														</div>
													</div>
												</div>
											</CardBody>
										</Card>
										<Card
											className={classNames(
												'transition-base rounded-2 mb-0 text-dark',
												{
													'bg-l25-primary bg-l10-primary-hover':
														!darkModeStatus,
													'bg-lo50-primary bg-lo25-primary-hover':
														darkModeStatus,
												},
											)}
											shadow='sm'>
											<CardHeader className='bg-transparent'>
												<CardLabel>
													<CardTitle tag='h4' className='h5'>
														Tổng người dùng
													</CardTitle>
												</CardLabel>
											</CardHeader>
											<CardBody>
												<div className='d-flex align-items-center pb-3'>
													<div className='flex-shrink-0'>
														<Icon
															icon='ConfirmationNumber'
															size='4x'
															color='primary'
														/>
													</div>
													<div className='flex-grow-1 ms-3'>
														<div className='fw-bold fs-3 mb-0'>
															{accountList?.data?.results?.length}{' '}
															người dùng
															{/* {priceFormat(sales.coupons.price)} */}
															{/* <PercentComparison
																valueOne={sales.coupons.price}
																valueTwo={sales.coupons.compare}
															/> */}
														</div>
														<div
															className={classNames({
																'text-muted': !darkModeStatus,
																'text-light': darkModeStatus,
															})}>
															{/* Compared to (
															{priceFormat(sales.coupons.compare)}{' '}
															last {compareLabel(0, true)}) */}
															Tổng người dùng có trong Database
														</div>
													</div>
												</div>
											</CardBody>
										</Card>
									</div>
									<div className='col-md-3'>
										<Card
											className={classNames(
												'transition-base rounded-2 mb-4 text-dark',
												{
													'bg-l25-secondary bg-l10-secondary-hover':
														!darkModeStatus,
													'bg-lo50-secondary bg-lo25-secondary-hover':
														darkModeStatus,
												},
											)}
											shadow='sm'>
											<CardHeader className='bg-transparent'>
												<CardLabel>
													<CardTitle tag='h4' className='h5'>
														Tổng sản phẩm đã bán
													</CardTitle>
												</CardLabel>
											</CardHeader>
											<CardBody>
												<div className='d-flex align-items-center pb-3'>
													<div className='flex-shrink-0'>
														<Icon
															icon='LocalOffer'
															size='4x'
															color='secondary'
														/>
													</div>

													{activeTab === TABS.YEARLY ||
													activeTab === TABS.MONTHLY ||
													activeTab === TABS.WEEKLY ? (
														<div className='flex-grow-1 ms-3'>
															<div className='fw-bold fs-3 mb-0'>
																{/* {priceFormat(sales.campaigns.price)} */}
																{productSale?.total} sản phẩm
																{/* <PercentComparison
																valueOne={sales.campaigns.price}
																valueTwo={sales.campaigns.compare}
															/> */}
															</div>
															<div
																className={classNames({
																	'text-muted': !darkModeStatus,
																	'text-light': darkModeStatus,
																})}>
																{/* Compared to (
															{priceFormat(sales.campaigns.compare)}{' '}
															last {compareLabel(0, true)}) */}
																{productSale?.description}
															</div>
														</div>
													) : (
														activeTab === 'All' && (
															<div className='flex-grow-1 ms-3'>
																<div className='fw-bold fs-3 mb-0'>
																	{/* {priceFormat(sales.campaigns.price)} */}
																	{productSale?.total} sản phẩm
																	{/* <PercentComparison
																	valueOne={sales.campaigns.price}
																	valueTwo={sales.campaigns.compare}
																/> */}
																</div>
																<div
																	className={classNames({
																		'text-muted':
																			!darkModeStatus,
																		'text-light':
																			darkModeStatus,
																	})}>
																	{/* Compared to (
																{priceFormat(sales.campaigns.compare)}{' '}
																last {compareLabel(0, true)}) */}
																	{productSale?.description}
																</div>
															</div>
														)
													)}
												</div>
											</CardBody>
										</Card>
										<Card
											className={classNames(
												'transition-base rounded-2 mb-0 text-dark',
												{
													'bg-l25-primary bg-l10-primary-hover':
														!darkModeStatus,
													'bg-lo50-primary bg-lo25-primary-hover':
														darkModeStatus,
												},
											)}
											shadow='sm'>
											<CardHeader className='bg-transparent'>
												<CardLabel>
													<CardTitle tag='h4' className='h5'>
														Tổng đơn hàng
													</CardTitle>
												</CardLabel>
											</CardHeader>
											<CardBody>
												<div className='d-flex align-items-center pb-3'>
													<div className='flex-shrink-0'>
														<Icon
															icon='ConfirmationNumber'
															size='4x'
															color='primary'
														/>
													</div>
													{activeTab === TABS.YEARLY ||
													activeTab === TABS.MONTHLY ||
													activeTab === TABS.WEEKLY ? (
														<div className='flex-grow-1 ms-3'>
															<div className='fw-bold fs-3 mb-0'>
																{/* {priceFormat(sales.coupons.price)} */}
																{totalOrder.total} Đơn
																<PercentComparison
																	valueOne={sales.coupons.price}
																	valueTwo={sales.coupons.compare}
																/>
															</div>
															<div
																className={classNames({
																	'text-muted': !darkModeStatus,
																	'text-light': darkModeStatus,
																})}>
																{/* Compared to (
															{priceFormat(sales.coupons.compare)}{' '}
															last {compareLabel(0, true)}) */}
																{totalOrder.description}
															</div>
														</div>
													) : (
														activeTab === 'All' && (
															<div className='flex-grow-1 ms-3'>
																<div className='fw-bold fs-3 mb-0'>
																	{/* {priceFormat(sales.coupons.price)} */}
																	{
																		orderList?.data?.results
																			?.length
																	}{' '}
																	Đơn
																	<PercentComparison
																		valueOne={
																			sales.coupons.price
																		}
																		valueTwo={
																			sales.coupons.compare
																		}
																	/>
																</div>
																<div
																	className={classNames({
																		'text-muted':
																			!darkModeStatus,
																		'text-light':
																			darkModeStatus,
																	})}>
																	{/* Compared to (
															{priceFormat(sales.coupons.compare)}{' '}
															last {compareLabel(0, true)}) */}
																	Tổng đơn hàng trong database
																</div>
															</div>
														)
													)}
												</div>
											</CardBody>
										</Card>
									</div>
								</div>
							</CardBody>
						</Card>
					</div>
					{/* <div className='col-xxl-3'>
						<Card stretch>
							<CardHeader>
								<CardLabel icon='NotificationsActive' iconColor='warning'>
									<CardTitle tag='h4' className='h5'>
										Recent Activities
									</CardTitle>
									<CardSubTitle>last 2 weeks</CardSubTitle>
								</CardLabel>
							</CardHeader>
							<CardBody isScrollable>
								<Timeline>
									<TimelineItem
										label={moment().add(-0.25, 'hours').format('LT')}
										color='primary'>
										Extended license purchased from France.
									</TimelineItem>
									<TimelineItem
										label={moment().add(-4.54, 'hours').format('LT')}
										color='success'>
										<Popovers desc='5 stars' trigger='hover'>
											<span>
												<Icon icon='StarFill' color='warning' />
												<Icon icon='StarFill' color='warning' />
												<Icon icon='StarFill' color='warning' />
												<Icon icon='StarFill' color='warning' />
												<Icon icon='StarFill' color='warning' />
											</span>
										</Popovers>
										<b>, a new rating has been received.</b>
									</TimelineItem>
									<TimelineItem
										label={moment().add(-9.34, 'hours').format('LT')}
										color='warning'>
										Customer's problem solved.
									</TimelineItem>
									<TimelineItem
										label={moment().add(-1, 'day').fromNow()}
										color='primary'>
										Regular license purchased from United Kingdom.
									</TimelineItem>
									<TimelineItem
										label={moment().add(-1, 'day').fromNow()}
										color='primary'>
										Regular license purchased from Italy.
									</TimelineItem>
									<TimelineItem
										label={moment().add(-2, 'day').fromNow()}
										color='info'>
										<span className='text-muted'>
											New version released.{' '}
											<a href='/' className='fw-bold'>
												V12.1.0
											</a>
										</span>
									</TimelineItem>
									<TimelineItem
										label={moment().add(-3, 'day').fromNow()}
										color='danger'>
										Market research meeting for new product.
									</TimelineItem>
									<TimelineItem
										label={moment().add(-7, 'day').fromNow()}
										color='secondary'>
										Updating, compiling and going live the product introduction
										page.
									</TimelineItem>
									<TimelineItem
										label={moment().add(-8, 'day').fromNow()}
										color='primary'>
										Regular license purchased from Germany.
									</TimelineItem>
								</Timeline>
							</CardBody>
						</Card>
					</div> */}
					{/* <div className='col-xxl-3'>
						<CommonTodo />
					</div> */}

					{/* <div className='col-xxl-12'>
						<Card stretch>
							<CardHeader>
								<CardLabel icon='ReceiptLong'>
									<CardTitle tag='h4' className='h5'>
										Biểu đồ tăng trưởng
									</CardTitle>
									<CardSubTitle tag='h5' className='h6'>
										Báo cáo
									</CardSubTitle>
								</CardLabel>
								<CardActions>
									<ButtonGroup>
										<Button
											color='primary'
											isLight
											icon='ChevronLeft'
											aria-label='Previous Year'
											isDisable={year <= 2019}
											onClick={() => setYear(year - 1)}
										/>
										<Button color='primary' isLight isDisable>
											{year}
										</Button>
										<Button
											color='primary'
											isLight
											icon='ChevronRight'
											aria-label='Next Year'
											isDisable={year >= 2021}
											onClick={() => setYear(year + 1)}
										/>
									</ButtonGroup>
								</CardActions>
							</CardHeader>
							<CardBody>
								<div className='row'>
									<div className='col-xl-3 col-xxl-2'>
										<div className='row g-3'>
											{companies.map((company, idx) => (
												<div
													key={company.name}
													className='col-xl-12 col-lg-6 col-sm-12'>
													<Button
														isLight={activeCompanyTab !== company.name}
														onClick={() =>
															setActiveCompanyTab(company.name)
														}
														style={{
															color: idx === 0 ? 'gray' : 'orange',
														}}
														color={themeStatus}
														className='w-100 py-4'
														shadow='sm'
														hoverShadow='none'>
														<img
															src={company.name}
															alt={company.name}
															width='auto'
															height={24}
														/>
														{company.name}
													</Button>
												</div>
											))}
										</div>
									</div>
									<div className='col-xl-9 col-xxl-10'>
										<Chart
											series={
												(activeCompanyTab === COMPANIES_TAB.COMP1 &&
													salesByStoreSeries1) ||
												(activeCompanyTab === COMPANIES_TAB.COMP2 &&
													salesByStoreSeries2)
											}
											options={salesByStoreOptions}
											type={salesByStoreOptions.chart.type}
											height={salesByStoreOptions.chart.height}
										/>
									</div>
								</div>
							</CardBody>
						</Card>
					</div> */}
					{/* <div className='col-xxl-4 col-xl-6'>
						<Card stretch>
							<CardHeader>
								<CardLabel icon='ContactSupport' iconColor='secondary'>
									<CardTitle tag='h4' className='h5'>
										Waiting for an Answer
									</CardTitle>
									<CardSubTitle tag='h5' className='h6'>
										Customer
									</CardSubTitle>
								</CardLabel>
								<CardActions>
									<Dropdown>
										<DropdownToggle hasIcon={false}>
											<Button
												color={darkModeStatus ? 'light' : 'dark'}
												isLink
												hoverShadow='default'
												icon='MoreHoriz'
												aria-label='More Actions'
											/>
										</DropdownToggle>
										<DropdownMenu isAlignmentEnd>
											<DropdownItem>
												<Button
													icon='Send'
													tag='a'
													href='mailto:example@site.com'>
													Send Bulk Mail
												</Button>
											</DropdownItem>
										</DropdownMenu>
									</Dropdown>
								</CardActions>
							</CardHeader>
							<CardBody>
								<div className='row g-3'>
									<AnswerCustomer
										id={USERS.GRACE.id}
										img={USERS.GRACE.src}
										imgWebp={USERS.GRACE.srcSet}
										name={`${USERS.GRACE.name} ${USERS.GRACE.surname}`}
										color={USERS.GRACE.color}
										job='Maryland'
										value={43}
									/>
									<AnswerCustomer
										id={USERS.JANE.id}
										img={USERS.JANE.src}
										imgWebp={USERS.JANE.srcSet}
										name={`${USERS.JANE.name} ${USERS.JANE.surname}`}
										color={USERS.JANE.color}
										job='North Carolina'
										value={35}
									/>
									<AnswerCustomer
										id={USERS.RYAN.id}
										img={USERS.RYAN.src}
										imgWebp={USERS.RYAN.srcSet}
										name={`${USERS.RYAN.name} ${USERS.RYAN.surname}`}
										color={USERS.RYAN.color}
										job='Rhode Island'
										value={27}
									/>
									<AnswerCustomer
										id={USERS.ELLA.id}
										img={USERS.ELLA.src}
										imgWebp={USERS.ELLA.srcSet}
										name={`${USERS.ELLA.name} ${USERS.ELLA.surname}`}
										color={USERS.ELLA.color}
										job='Washington'
										value={15}
									/>
									<AnswerCustomer
										id={USERS.CHLOE.id}
										img={USERS.CHLOE.src}
										imgWebp={USERS.CHLOE.srcSet}
										name={`${USERS.CHLOE.name} ${USERS.CHLOE.surname}`}
										color={USERS.CHLOE.color}
										job='Kentucky'
										value={12}
									/>
									<AnswerCustomer
										id={USERS.SAM.id}
										img={USERS.SAM.src}
										imgWebp={USERS.SAM.srcSet}
										name={`${USERS.SAM.name} ${USERS.SAM.surname}`}
										color={USERS.SAM.color}
										job='Michigan'
										value={12}
									/>
								</div>
							</CardBody>
						</Card>
					</div> */}

					{/* <div className='col-xxl-4 col-xl-6'>
						<CommonMyWallet />
					</div> */}
					{/* <div className='col-xxl-8'>
						<Card>
							<CardHeader>
								<CardLabel icon='Storefront' iconColor='info'>
									<CardTitle tag='h4' className='h5'>
										Top Seller
									</CardTitle>
								</CardLabel>
								<CardActions>
									<Dropdown isButtonGroup>
										<Button color='success' isLight icon='WaterfallChart'>
											{(topSellerFilter === TOP_SELLER_FILTER.DAY &&
												moment().format('MMM Do')) ||
												(topSellerFilter === TOP_SELLER_FILTER.WEEK &&
													`${moment()
														.startOf('week')
														.format('MMM Do')} - ${moment()
														.endOf('week')
														.format('MMM Do')}`) ||
												(topSellerFilter === TOP_SELLER_FILTER.MONTH &&
													moment().format('MMM YYYY'))}
										</Button>
										<DropdownToggle>
											<Button color='success' isLight isVisuallyHidden />
										</DropdownToggle>
										<DropdownMenu isAlignmentEnd>
											<DropdownItem>
												<Button
													onClick={() =>
														setTopSellerFilter(TOP_SELLER_FILTER.DAY)
													}>
													Last Day
												</Button>
											</DropdownItem>
											<DropdownItem>
												<Button
													onClick={() =>
														setTopSellerFilter(TOP_SELLER_FILTER.WEEK)
													}>
													Last Week
												</Button>
											</DropdownItem>
											<DropdownItem>
												<Button
													onClick={() =>
														setTopSellerFilter(TOP_SELLER_FILTER.MONTH)
													}>
													Last Month
												</Button>
											</DropdownItem>
										</DropdownMenu>
									</Dropdown>
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
								</CardActions>
							</CardHeader>
							<CardBody className='table-responsive'>
								<table className='table table-modern table-hover'>
									<thead>
										<tr>
											<th
												scope='col'
												onClick={() => requestSort('id')}
												className='cursor-pointer text-decoration-underline'>
												#{' '}
												<Icon
													size='lg'
													className={getClassNamesFor('id')}
													icon='FilterList'
												/>
											</th>
											<th scope='col'>Image</th>
											<th
												scope='col'
												onClick={() => requestSort('name')}
												className='cursor-pointer text-decoration-underline'>
												Name{' '}
												<Icon
													size='lg'
													className={getClassNamesFor('name')}
													icon='FilterList'
												/>
											</th>
											<th scope='col'>Sales</th>
											<th
												scope='col'
												onClick={() => requestSort('stock')}
												className='cursor-pointer text-decoration-underline'>
												Stock{' '}
												<Icon
													size='lg'
													className={getClassNamesFor('stock')}
													icon='FilterList'
												/>
											</th>
											<th
												scope='col'
												onClick={() => requestSort('price')}
												className='cursor-pointer text-decoration-underline'>
												Price{' '}
												<Icon
													size='lg'
													className={getClassNamesFor('price')}
													icon='FilterList'
												/>
											</th>
											<th
												scope='col'
												onClick={() => requestSort('store')}
												className='cursor-pointer text-decoration-underline'>
												Store{' '}
												<Icon
													size='lg'
													className={getClassNamesFor('store')}
													icon='FilterList'
												/>
											</th>
										</tr>
									</thead>
									<tbody>
										{dataPagination(items, currentPage, perPage).map((i) => (
											// eslint-disable-next-line react/jsx-props-no-spreading
											<TableRow key={i.id} {...i} />
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
					</div> */}
				</div>
			</Page>
		</PageWrapper>
	);
};

export default DashboardTeamPage;
