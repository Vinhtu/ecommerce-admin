import React, { useState,
	 useEffect 
	} from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import SubHeader, { SubHeaderLeft } from '../../../layout/SubHeader/SubHeader';
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
import Badge from '../../../components/bootstrap/Badge';

import Dropdown, {
	DropdownItem,
	DropdownMenu,
	DropdownToggle,
} from '../../../components/bootstrap/Dropdown';
import Checks from '../../../components/bootstrap/forms/Checks';
import { demoPages } from '../../../menu';
import PaginationButtons, {
	dataPagination,
	PER_COUNT,
} from '../../../components/PaginationButtons';
import useSortableData from '../../../hooks/useSortableData';
import Icon from '../../../components/icon/Icon';
import useTourStep from '../../../hooks/useTourStep';
import { GetVouchers } from '../../../redux/actions/vouchers';

const VoucherPage = () => {

	useTourStep(6);

	const dispatch = useDispatch();
	const navigate = useNavigate();
	const { voucherList } = useSelector((state) => state.voucher);

	useEffect(() => {
		dispatch(GetVouchers());
	}, [dispatch]);

	let arrVoucher = []
	if (voucherList) {
		arrVoucher = voucherList.data.results;
	}
// useTourStep(6);
	const [currentPage, setCurrentPage] = useState(1);
	const [perPage, setPerPage] = useState(PER_COUNT['10']);

	const { items, requestSort, getClassNamesFor } = useSortableData(arrVoucher);
	const onCurrentPageItems = dataPagination(items, currentPage, perPage);
	// const { selectTable, SelectAllCheck } = useSelectTable(onCurrentPageItems);

	const toViewVoucher = (item) => {
		navigate(`../${demoPages.sales.subMenu.viewvoucher.path}/${item._id}`, { state: { item } });
	};


	console.log(voucherList,'voucherlist')
	return (
		<PageWrapper >
			<SubHeader>
				<SubHeaderLeft>
					<Avatar srcSet={UserImageWebp} src={UserImage} size={32} />
					<span>
						<strong>Report by</strong> Timothy J. Doe
					</span>
				</SubHeaderLeft>
				{/* <SubHeaderRight>
					{(!!formik.values.minPrice || !!formik.values.maxPrice) && (
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
					)}
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
								<form className='row g-3' onSubmit={formik.handleSubmit}>
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
								</form>
							</div>
						</DropdownMenu>
					</Dropdown>
				</SubHeaderRight> */}
			</SubHeader>
			<Page>
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
								{/* <Popovers
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
								</Popovers> */}
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
								to={`../${demoPages.sales.subMenu.newvoucher.path}`}>
								New Voucher
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
									<Button icon='MoreHoriz' />
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
									<th scope='col'>
										<div>x</div>
									</th>
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
									<th scope='col'>Image</th>
									<th scope='col'>Name</th>
									<th scope='col'>Title</th>
									<th scope='col'>Body</th>
									<th
										scope='col'
										onClick={() => requestSort('price')}
										className='cursor-pointer text-decoration-underline'>
										Promotion Price{' '}
										<Icon
											size='lg'
											className={getClassNamesFor('price')}
											icon='FilterList'
										/>
									</th>
									<th scope='col'>Promotion Percent</th>
									<th scope='col'>Date Start</th>
									<th scope='col'>Date End</th>

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
											<div>{item.name}</div>
										</td>
										<td>
											<div>{item.title}</div>
										</td>
										<td>
											<span>{item.body}</span>
										</td>

										<td>
											<span>{item.p_price}</span>
										</td>
										<td>
											<span>{item.percent}</span>
										</td>

										<td>
											<span>{item.date_start}</span>
										</td>
										<td>
											<span>{item.date_end}</span>
										</td>

										<td>
											<span>{item.create_date}</span>
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
												onClick={() => toViewVoucher(item)}
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

export default VoucherPage;
