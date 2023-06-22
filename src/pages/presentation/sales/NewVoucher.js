import React  from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import Select from '../../../components/bootstrap/forms/Select';
import storage from '../../../firebase';

import Page from '../../../layout/Page/Page';
import PageWrapper from '../../../layout/PageWrapper/PageWrapper';
import SubHeader, {
	SubHeaderLeft,
	SubHeaderRight,
	SubheaderSeparator,
} from '../../../layout/SubHeader/SubHeader';
import Button from '../../../components/bootstrap/Button';
import { demoPages } from '../../../menu';
import Card, {
	CardBody,
	CardHeader,
	CardLabel,
	CardTitle,
} from '../../../components/bootstrap/Card';
// import Avatar from '../../../components/Avatar';
// import USERS from '../../../common/data/userDummyData';

import Icon from '../../../components/icon/Icon';
import Input from '../../../components/bootstrap/forms/Input';
import FormGroup from '../../../components/bootstrap/forms/FormGroup';
import { PostVoucher } from '../../../redux/actions/vouchers';

const NewVoucher = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const [voucher, setVoucher] = React.useState({
		code: '',
		name: '',
		title: '',
		thumbnail: '',
		p_price: '',
		percent: '',
		date_start: new Date(),
		date_end: new Date(),
		body: '',
		status: '',
		create_date: new Date(),
	});

	const selectStatus = [
		{ value: 'Normal', text: 'Normal' },
		{ value: 'Pending', text: 'Pending' },
		{ value: 'Destroy', text: 'Destroy' },
	];

	const handleChange = (e) => {
		setVoucher({ ...voucher, [e.target.id]: e.target.value });
	};

	const handleSetThumbnailVoucher = (e) => {
		const image = e.target.files[0];
		const imageRef = ref(storage, `thumbnailcolors/${image.name}`);
		uploadBytes(imageRef, image).then((res) =>
			getDownloadURL(res.ref).then((url) => setVoucher({ ...voucher, thumbnail: url })),
		);
	};

	const deleteVoucherThumbnail = () => {
		setVoucher({ ...voucher, thumbnail: '' });
	};
	// const accountInfo = localStorage.getItem('accountinfo');
	const accessToken = localStorage.getItem('accessToken');
	// const refreshToken = localStorage.getItem('refreshToken');
	// const account_id = JSON.parse(accountInfo);
	const token = JSON.parse(accessToken);
	// const refreshtoken = JSON.parse(refreshToken);

	const { isPostVoucher } = useSelector((state) => state.voucher);

	const postVoucher = () => {
		dispatch(PostVoucher(voucher, token));
		if (!(isPostVoucher === 'fail')) {
			navigate(`../${demoPages.Voucher.path}`);
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
					{/* <Avatar
						srcSet={USERS.RYAN.srcSet}
						src={USERS.RYAN.src}
						size={32}
						color={USERS.RYAN.color}
					/> */}
					{/* <span>
						<strong>{`${USERS.RYAN.name} ${USERS.RYAN.surname}`}</strong>
					</span> */}
					<span className='text-muted'>Owner</span>
				</SubHeaderLeft>
				<SubHeaderRight>
					<span className='text-muted fst-italic me-2'>Last update:</span>
					<span className='fw-bold'>13 hours ago</span>
				</SubHeaderRight>
			</SubHeader>
			<Page>
				<div className='row g-4'>
					<FormGroup id='code' label='Code' className='col-md-3'>
						<Input onChange={handleChange} value={voucher.code} />
					</FormGroup>
					<FormGroup id='name' label='Name' className='col-md-3'>
						<Input onChange={handleChange} value={voucher.name} />
					</FormGroup>
					<FormGroup id='title' label='Title' className='col-md-3'>
						<Input onChange={handleChange} value={voucher.title} />
					</FormGroup>
					<FormGroup id='p_price' label='Price' className='col-md-3'>
						<Input onChange={handleChange} value={voucher.p_price} />
					</FormGroup>
					<FormGroup id='percent' label='Percent' className='col-md-3'>
						<Input onChange={handleChange} value={voucher.percent} />
					</FormGroup>
					<FormGroup id='date_start' label='Date start' className='col-md-3'>
						<Input onChange={handleChange} value={voucher.date_start} type='date' />
					</FormGroup>
					<FormGroup id='date_end' label='Date end' className='col-md-3'>
						<Input onChange={handleChange} value={voucher.date_end} type='date' />
					</FormGroup>
					<FormGroup id='body' label='Body' className='col-md-3'>
						<Input onChange={handleChange} value={voucher.body} />
					</FormGroup>

					<FormGroup id='status' label='Status' className='col-md-3'>
						<Select
							ariaLabel='status'
							placeholder='Choose status'
							list={selectStatus}
							onChange={handleChange}
							value={voucher.status}
							isValid={voucher.status}
							isTouched={voucher.status}
						/>
					</FormGroup>
					<FormGroup id='create_date' label='Create_date' className='col-md-3'>
						<Input onChange={handleChange} value={voucher.create_date} type='date' />
					</FormGroup>
					<div className='mt-2 mb-2 col-md-3'>
						<Card className='rounded-1 mb-0'>
							<CardHeader>
								<CardLabel icon='LocalShipping'>
									<CardTitle>Thumbnail</CardTitle>
								</CardLabel>
							</CardHeader>
							<CardBody className='row'>
								<div
									style={{
										width: '100%',
										height: 200,
										borderRadius: 10,
										display: 'flex',
										justifyContent: 'center',
										alignItems: 'center',
										borderWidth: voucher.thumbnail ? 0 : 1,
										borderStyle: 'dashed',
										borderColor: '#E9E5E5',
										backgroundImage: `url(${voucher.thumbnail}`,
										backgroundSize: 'cover',
										cursor: 'pointer',
										'&:hover': {
											opacity: 0.5,
										},
										position: 'relative',
									}}>
									{voucher.thumbnail ? (
										<label htmlFor='img-input'>
											<h1 style={{ color: '#E9E5E5', cursor: 'pointer' }}>
												<Icon icon='edit' style={{ fontSize: 26 }} />
											</h1>
										</label>
									) : (
										<label htmlFor='img-input'>
											<h1 style={{ color: '#E9E5E5', cursor: 'pointer' }}>
												+
											</h1>
										</label>
									)}

									<input
										id='img-input'
										style={{ display: 'none' }}
										type='file'
										autoComplete='photo'
										onChange={handleSetThumbnailVoucher}
									/>
									{voucher.thumbnail && (
										<div
											onClick={() => deleteVoucherThumbnail()}
											onKeyDown={() => deleteVoucherThumbnail()}
											role='button'
											tabIndex='0'
											style={{
												position: 'absolute',
												top: -10,
												right: -10,
												color: 'red',
												zIndex: 1,
												fontSize: 24,
												display: 'flex',
												justifyContent: 'center',
												alignItems: 'center',
												width: 20,
												height: 20,
												borderRadius: 50,
												backgroundColor: '#FBECE9',
												cursor: 'pointer',
											}}>
											<Icon icon='clear' style={{ fontSize: 14 }} />
										</div>
									)}
								</div>
							</CardBody>
						</Card>
					</div>
					<div className='mt-3' style={{ display: 'flex', justifyContent: 'flex-end' }}>
						{isPostVoucher === 'fail' && (
							<p style={{ fontSize: 14, color: 'red' }}> Tao moi that bai</p>
						)}
						<Button color='info' className='col-md-3' onClick={() => postVoucher()}>
							New Voucher
						</Button>
					</div>
				</div>
			</Page>
		</PageWrapper>
	);
};

export default NewVoucher;
