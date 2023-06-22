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
import useSortableData from '../../../hooks/useSortableData';
import Icon from '../../../components/icon/Icon';

import useTourStep from '../../../hooks/useTourStep';
import { Getevents } from '../../../redux/actions/events';

const EventPage = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const { eventList, isPostEvent, isPutEvent,isDeleteEvent } = useSelector((state) => state.event);

	useEffect(() => {
		dispatch(Getevents());
	}, [dispatch, isPostEvent, isPutEvent,isDeleteEvent]);

	console.log(eventList, 'event list');

	useTourStep(6);

	let arrEventList = [];

	if (eventList) {
		arrEventList = eventList;
	}

	const [currentPage, setCurrentPage] = useState(1);
	const [perPage, setPerPage] = useState(PER_COUNT['10']);

	const { items, requestSort, getClassNamesFor } = useSortableData(arrEventList);
	const onCurrentPageItems = dataPagination(items, currentPage, perPage);
	// const { selectTable, SelectAllCheck } = useSelectTable(onCurrentPageItems);

	const toViewEvent = (item) => {
		navigate(`../${demoPages.sales.subMenu.viewevent.path}/${item._id}`, { state: { item } });
	};

	return (
		<PageWrapper >
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
								to={`../${demoPages.sales.subMenu.newevent.path}`}>
								New Event
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
									<th scope='col'>Account create</th>
									<th scope='col'>Name</th>
									<th scope='col'>Content</th>
									<th scope='col'>Amount Product</th>
									<th scope='col'>Time start</th>
									<th scope='col'>Time end</th>
									<th scope='col'>Create date</th>
									<th scope='col'>Status</th>
									<th scope='col' className='text-end'>
										Actions
									</th>
								</tr>
							</thead>
							<tbody>
								{eventList &&
									onCurrentPageItems.map((item) => (
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
											<td>{item.name}</td>
											<td>
												<div>
													<Link
														to={`../${demoPages.sales.subMenu.productID.path}/${item._id}`}
														style={{ textDecorationLine: 'none' }}>
														{item.name}
													</Link>
												</div>
											</td>

											<td>{item.content}</td>
											<td>
												<span>{item.eventitem.length}</span>
											</td>
											<td>
												<span>
													{new Date(item.date_start).toLocaleString()}
												</span>
											</td>

											<td>
												<span>
													{' '}
													{new Date(item.date_end).toLocaleString()}
												</span>
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
													onClick={() => toViewEvent(item)}
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

export default EventPage;
