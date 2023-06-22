import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
// import classNames from 'classnames';
import { useNavigate } from 'react-router-dom';

import { Link } from 'react-router-dom';

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
import Checks from '../../../components/bootstrap/forms/Checks';
// import Chart from '../../components/extras/Chart';
import Badge from '../../../components/bootstrap/Badge';
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
import { GetProducts } from '../../../redux/actions/products';

const ProductShopPage = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const { productList } = useSelector((state) => state.product);

	useEffect(() => {
		dispatch(GetProducts());
	}, [dispatch]);

	useTourStep(6);

	console.log(productList, 'productlist');

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
	let arrProductShop = [];

	// useEffect(() => {
	// 	if (productList) {
	// 		arrProductShop = productList;
	// 	}
	// }, productList,arrProductShop);

	if (productList) {
		// for (let i = 0; i < productList.length; i += 1) {
		// 	// if(productList.data.results[i].affilateshop === 'My shop'){
		// 	// 	arrProductShop.push(productList.data.results[i]);
		// 	// }
		// 	arrProductShop.push(productList[i]);
		// }
		arrProductShop = productList;
	}

	const [currentPage, setCurrentPage] = useState(1);
	const [perPage, setPerPage] = useState(PER_COUNT['10']);

	const { items, requestSort, getClassNamesFor } = useSortableData(arrProductShop);
	const onCurrentPageItems = dataPagination(items, currentPage, perPage);
	// const { selectTable, SelectAllCheck } = useSelectTable(onCurrentPageItems);
	// const [newModalStatus, setNewModalStatus] = useState(false);

	const toViewProduct = (item) => {
		navigate(`../${demoPages.sales.subMenu.viewproduct.path}/${item._id}`, { state: { item } });
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
										scope='col'
										onClick={() => requestSort('id')}
										className='cursor-pointer text-decoration-underline'>
										Code{' '}
										<Icon
											size='lg'
											className={getClassNamesFor('id')}
											icon='FilterList'
										/>
									</th>
									<th scope='col'>Thumbnail</th>
									<th scope='col'>Name</th>
									<th scope='col'>Sales</th>
									<th scope='col'>Affilate Shop</th>

									{/* <th
										scope='col'
										onClick={() => requestSort('stock')}
										className='cursor-pointer text-decoration-underline'>
										Video{' '}
										<Icon
											size='lg'
											className={getClassNamesFor('stock')}
											icon='FilterList'
										/>
									</th> */}
									<th
										scope='col'
										onClick={() => requestSort('price')}
										className='cursor-pointer text-decoration-underline'>
										Brand{' '}
										<Icon
											size='lg'
											className={getClassNamesFor('price')}
											icon='FilterList'
										/>
									</th>

									<th scope='col'>Create Date</th>
									<th scope='col'>Status</th>
									<th scope='col' className='text-end'>
										Actions
									</th>
								</tr>
							</thead>
							<tbody>
								{onCurrentPageItems.map((item) => (
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
										<th scope='row'>
											<Checks
												id={item._id}
												// name={selectName}
												value={item._id}
												// onChange={selectTable.handleChange}
												// checked={selectTable.values.selectedList.includes(
												// 	item._id,
												// )}
											/>
										</th>
										<th scope='row'>{item.code}</th>
										<td>
											<Link
												to={`../${demoPages.sales.subMenu.productID.path}/${item._id}`}>
												<img
													src={item.thumbnail}
													alt={item.thumbnail}
													width={54}
													height={54}
													style={{ borderRadius: 4 }}
												/>
											</Link>
										</td>
										<td>
											<div>
												<Link
													to={`../${demoPages.sales.subMenu.productID.path}/${item._id}`}
													style={{ textDecorationLine: 'none' }}>
													{item.name}
												</Link>
												<div className='text-muted'>
													<small>{item.category}</small>
												</div>
											</div>
										</td>

										<td>
											{/* <Chart
												series={series}
												options={dummyOptions}
												type={dummyOptions.chart.type}
												height={dummyOptions.chart.height}
												width={dummyOptions.chart.width}
											/> */}
										</td>
										<td>
											<span>{item.affilateshop.name}</span>
										</td>
										<td>
											<span>{item.brand}</span>
										</td>

										<td>
											<span> {new Date(item.create_date).toLocaleDateString()}</span>
										</td>

										<td className='h5'>
											<Badge
											// color={
											// 	(store === 'Company A' && 'danger') ||
											// 	(store === 'Company B' && 'warning') ||
											// 	(store === 'Company C' && 'success') ||
											// 	'info'
											// }
											>
												{item.status}
											</Badge>
										</td>
										<td className='text-end'>
											<Button
												color='dark'
												isLight
												icon='Edit'
												tag='a'
												onClick={() => toViewProduct(item)}
											/>
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

export default ProductShopPage;
