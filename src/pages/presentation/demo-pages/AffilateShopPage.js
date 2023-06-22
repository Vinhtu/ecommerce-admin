import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import moment from 'moment';
// import { useFormik } from 'formik';
import { Calendar as DatePicker } from 'react-date-range';
import classNames from 'classnames';
import SubHeader, {
	SubHeaderLeft,
	SubHeaderRight,
	SubheaderSeparator,
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
// import Checks, { ChecksGroup } from '../../../components/bootstrap/forms/Checks';
// import InputGroup, { InputGroupText } from '../../../components/bootstrap/forms/InputGroup';
// import Input from '../../../components/bootstrap/forms/Input';
// import FormGroup from '../../../components/bootstrap/forms/FormGroup';
// import Label from '../../../components/bootstrap/forms/Label';
// import CommonFilterTag from '../../common/CommonFilterTag';
// import CommonAffilateshopTableRow from '../../common/CommonAffilateshopTableRow';
// import Select from '../../../components/bootstrap/forms/Select';
import Popovers from '../../../components/bootstrap/Popovers';

// import data from '../../../common/data/dummyProductData';
import { demoPages } from '../../../menu';
import PaginationButtons, {
	// dataPagination,
	PER_COUNT,
} from '../../../components/PaginationButtons';
import useSortableData from '../../../hooks/useSortableData';
import Icon from '../../../components/icon/Icon';
// import useSelectTable from '../../../hooks/useSelectTable';
import useDarkMode from '../../../hooks/useDarkMode';
import useTourStep from '../../../hooks/useTourStep';
import { GetAffilateshops } from '../../../redux/actions/affilateshops';

const AffilateShopPage = () => {
	/**
	 * For Tour
	 */
	useTourStep(6);
	const dispatch = useDispatch();

	const { themeStatus, darkModeStatus } = useDarkMode();

	const navigate = useNavigate();

	const { affilateshopList } = useSelector((state) => state.affilateshop);

	const [date, setDate] = useState(new Date());

	


	const [filterMenu, setFilterMenu] = useState(false);
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
	// 		setFilterMenu(false);
	// 		// alert(JSON.stringify(values, null, 2));
	// 	},
	// });
	useEffect(() => {
		dispatch(GetAffilateshops());
	}, [dispatch]);

	console.log(affilateshopList, 'affilateshop');
	const utilData = [];

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

	const [currentPage, setCurrentPage] = useState(1);
	const [perPage, setPerPage] = useState(PER_COUNT['10']);

	const { items, requestSort, getClassNamesFor } = useSortableData(
		 affilateshopList || utilData,
	);
	// const onCurrentPageItems = dataPagination(items, currentPage, perPage);
	// const { selectTable, SelectAllCheck } = useSelectTable(onCurrentPageItems);

	const toEditAffilateshop = (item) => {
		navigate(`../${demoPages.sales.subMenu.viewaffilateshop.path}/${item._id}`, {
			state: { item },
		});
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
				<SubHeaderRight>
					{/* {(!!formik.values.minPrice || !!formik.values.maxPrice) && (
						<CommonFilterTag
							title='Price'
							text={`${formik.values.minPrice || '0'} to ${
								formik.values.maxPrice || 'no limit'
							}`}
						/>
					)}

					{!!formik.values.categoryName && (
						<CommonFilterTag title='Category' text={formik.values.categoryName} />
					)}

					{(formik.values.companyA ||
						formik.values.companyB ||
						formik.values.companyC ||
						formik.values.companyD) && (
						<CommonFilterTag
							title='Store'
							text={
								(formik.values.companyA ? 'Company A, ' : '') +
								(formik.values.companyB ? 'Company B, ' : '') +
								(formik.values.companyC ? 'Company C, ' : '') +
								(formik.values.companyD ? 'Company D ' : '')
							}
						/>
					)} */}
					<SubheaderSeparator />
					<Dropdown isOpen={filterMenu} setIsOpen={setFilterMenu}>
						<DropdownToggle hasIcon={false}>
							<Button icon='Filter' color='primary' isLight data-tour='filter'>
								Filter
								<span
									className={classNames(
										'position-absolute',
										'top-0 start-95',
										'translate-middle',
										'badge',
										'rounded-pill',
										'bg-danger',
										'border border-2',
										{
											'border-white': !darkModeStatus,
											'border-dark': darkModeStatus,
										},
									)}>
									2/3
									<span className='visually-hidden'>filter</span>
								</span>
							</Button>
						</DropdownToggle>
						<DropdownMenu
							isAlignmentEnd
							size='lg'
							isCloseAfterLeave={false}
							data-tour='filter-menu'>
							<div className='container py-2'>
								{/* <form className='row g-3' onSubmit={formik.handleSubmit}>
									<div className='col-12'>
										<FormGroup>
											<Label htmlFor='minPrice'>Price</Label>
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
									</div>
									<div className='col-12'>
										<FormGroup>
											<Label htmlFor='categoryName'>Category</Label>
											<Select
												id='categoryName'
												ariaLabel='Category'
												placeholder='Category Name'
												list={[
													{ value: '3D Shapes', text: '3D Shapes' },
													{ value: 'Illustrator', text: 'Illustrator' },
													{ value: 'Photo', text: 'Photo' },
												]}
												onChange={formik.handleChange}
												value={formik.values.categoryName}
											/>
										</FormGroup>
									</div>
									<div className='col-12'>
										<FormGroup>
											<Label>Store</Label>
											<ChecksGroup>
												<Checks
													id='companyA'
													label='Company A'
													onChange={formik.handleChange}
													checked={formik.values.companyA}
												/>
												<Checks
													id='companyB'
													label='Company B'
													onChange={formik.handleChange}
													checked={formik.values.companyB}
												/>
												<Checks
													id='companyC'
													label='Company C'
													onChange={formik.handleChange}
													checked={formik.values.companyC}
												/>
												<Checks
													id='companyD'
													label='Company D'
													onChange={formik.handleChange}
													checked={formik.values.companyD}
												/>
											</ChecksGroup>
										</FormGroup>
									</div>
									<div className='col-6'>
										<Button
											color='primary'
											isOutline
											className='w-100'
											onClick={formik.resetForm}>
											Reset
										</Button>
									</div>
									<div className='col-6'>
										<Button color='primary' className='w-100' type='submit'>
											Filter
										</Button>
									</div>
								</form> */}
							</div>
						</DropdownMenu>
					</Dropdown>
				</SubHeaderRight>
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
										: null}
									{filteredData.length} */}
								</small>
							</CardTitle>
						</CardLabel>
						<CardActions>
							<Dropdown isButtonGroup>
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
									<Button color='success' isLight icon='WaterfallChart'>
										{moment(date).format('MMM Do')}
									</Button>
								</Popovers>
								<DropdownToggle>
									<Button color='success' isLight />
								</DropdownToggle>
								<DropdownMenu isAlignmentEnd>
									<DropdownItem>
										<span>Last Hour</span>
									</DropdownItem>
									<DropdownItem>
										<span>Last Day</span>
									</DropdownItem>
									<DropdownItem>
										<span>Last Week</span>
									</DropdownItem>
									<DropdownItem>
										<span>Last Month</span>
									</DropdownItem>
								</DropdownMenu>
							</Dropdown>
							<Button
								color='info'
								icon='CloudDownload'
								isLight
								tag='a'
								to={`../${demoPages.sales.subMenu.newaffilateshop.path}`}>
								New Affilateshop
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
									<Button color={themeStatus} icon='MoreHoriz' />
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
									{/* <th scope='col'>{SelectAllCheck}</th> */}
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
									<th scope='col'>Name</th>

									<th scope='col'>Address</th>
									<th scope='col'>phone</th>
									{/* <th
										scope='col'
										onClick={() => requestSort('stock')}
										className='cursor-pointer text-decoration-underline'>
										Stock{' '}
										<Icon
											size='lg'
											className={getClassNamesFor('stock')}
											icon='FilterList'
										/>
									</th> */}
									{/* <th
										scope='col'
										onClick={() => requestSort('price')}
										className='cursor-pointer text-decoration-underline'>
										Price{' '}
										<Icon
											size='lg'
											className={getClassNamesFor('price')}
											icon='FilterList'
										/>
									</th> */}
									<th scope='col'>Level</th>
									<th scope='col'>Create Date</th>
									<th scope='col'>Status</th>
									<th scope='col' className='text-end'>
										Actions
									</th>
								</tr>
							</thead>
							<tbody>
								{items.map((item, idx) => (
									<tr>
										<th scope='row'>
											{/* <Checks
											id={_id}
											name={selectName}
											value={_id}
											onChange={selectOnChange}
											checked={selectChecked}
										/> */}
											{idx}
										</th>
										<th scope='row'>{item.name}</th>
										<td>
											<span>
												{item.streetAddress +
													item.wardCommunedistrictAddress +
													item.cityAddress +
													item.zipAddress}
											</span>
										</td>

										<td>
											<span>{item.phone}</span>
										</td>
										<td>
											<span>{item.level}</span>
										</td>

										<td>
											<span>{item.create_date}</span>
										</td>
										<td>
											<span>{item.status}</span>
										</td>

										<td className='text-end'>
											<Button
												color='dark'
												isLight
												icon='Edit'
												onClick={() => toEditAffilateshop(item)}
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
		</PageWrapper>
	);
};

export default AffilateShopPage;
