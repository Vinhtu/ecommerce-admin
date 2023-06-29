import React, { useState } from 'react';
import moment from 'moment';
import { Calendar as DatePicker } from 'react-date-range';
import SubHeader, { SubHeaderLeft, SubHeaderRight } from '../../../layout/SubHeader/SubHeader';
import Icon from '../../../components/icon/Icon';
import Button from '../../../components/bootstrap/Button';
import Page from '../../../layout/Page/Page';
import PageWrapper from '../../../layout/PageWrapper/PageWrapper';
import Popovers from '../../../components/bootstrap/Popovers';
// import { demoPages } from '../../../menu';
import useDarkMode from '../../../hooks/useDarkMode';
import CategoryTreeComponent from '../../common/CategoryTreeComponent';
import BrandComponent from '../../common/BrandComponent';
import ColorComponent from '../../common/ColorComponent';
import SizeComponent from '../../common/SizeComponent';
import CategoryComponent from '../../common/CategoryComponent';
import UsageStatusComponent from '../../common/UsageStatusComponent';
import DeliveryMethodComponent from '../../common/DeliveryMethodComponent';

const ExtendProductPage = () => {
	const [isTag, setIsTag] = React.useState('category');

	
	const { themeStatus } = useDarkMode();

	const [date, setDate] = useState(new Date());

	return (
		<PageWrapper>
			<SubHeader>
				<SubHeaderLeft>
					<Icon icon='Info' className='me-2' size='2x' />
					<span className='text-muted'>
						You have{' '}
						<Button color='info' isLight onClick={() => setIsTag('category')}>
							Category
						</Button>{' '}

						<Button color='info' isLight onClick={() => setIsTag('brand')}>
							Brand
						</Button>{' '}
						<Button color='info' isLight onClick={() => setIsTag('color')}>
							Color
						</Button>{' '}
						<Button color='info' isLight onClick={() => setIsTag('size')}>
							Size
						</Button>{' '}

						<Button color='info' isLight onClick={() => setIsTag('categorytree')}>
							Category Tree
						</Button>{' '}
						<Button color='info' isLight onClick={() => setIsTag('usagestatus')}>
							Tình trạng
						</Button>{' '}
						<Button color='info' isLight onClick={() => setIsTag('deliverymethod')}>
							Phương pháp vận chuyển
						</Button>{' '}
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
						<Button color={themeStatus}>
							{`${moment(date).startOf('weeks').format('MMM Do')} - ${moment(date)
								.endOf('weeks')
								.format('MMM Do')}`}
						</Button>
					</Popovers>
				</SubHeaderRight>
			</SubHeader>
			<Page container='fluid'>
				{isTag === 'category' && <CategoryComponent isFluid />}
				{isTag === 'brand' && <BrandComponent isFluid />}
				{isTag === 'color' && <ColorComponent isFluid />}
				{isTag === 'size' && <SizeComponent isFluid />}
				{isTag === 'categorytree' && <CategoryTreeComponent isFluid />}
				{isTag === 'usagestatus' && <UsageStatusComponent isFluid />}
				{isTag === 'deliverymethod' && <DeliveryMethodComponent isFluid />}
			</Page>
		</PageWrapper>
	);
};

export default ExtendProductPage;
