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
import { Box } from '../../../components/icon/bootstrap';
import FeatureComponent from '../../common/Utils/FeatureComponent';
import OriginComponent from '../../common/Utils/OriginComponent';
import MaterialComponent from '../../common/Utils/MaterialComponent';
import ModelProductComponent from '../../common/Utils/ModelProductComponent';
import NumberPartComponent from '../../common/Utils/NumberPartComponent';
import OperatingSystemComponent from '../../common/Utils/OperatingSystemComponent';
import ProcessorComponent from '../../common/Utils/ProcessorComponent';
import RamComponent from '../../common/Utils/RamComponent';
import RomComponent from '../../common/Utils/RomComponent';
import ScreenResolutionComponent from '../../common/Utils/ScreenResolutionComponent';
import ScreenComponent from '../../common/Utils/ScreenComponent';
import SkinTypeComponent from '../../common/Utils/SkinTypeComponent';
import StickerStyleComponent from '../../common/Utils/StickerStyleComponent';
import StorageCapacityComponent from '../../common/Utils/StorageCapacityComponent';
import TypeDeviceComponent from '../../common/Utils/TypeDeviceComponent';
import TypeLockComponent from '../../common/Utils/TypeLockComponent';
import TypeShellComponent from '../../common/Utils/TypeShellComponent';
import TypeWarrantyComponent from '../../common/Utils/TypeWarrantyComponent';
import WarrantyPeriodComponent from '../../common/Utils/WarrantyPeriodComponent';
import SeasonComponent from '../../common/Utils/SeasonComponent';
import SampleComponent from '../../common/Utils/SampleComponent';
import StyleComponent from '../../common/Utils/StyleComponent';

const UtilsProduct = () => {
	const [isTag, setIsTag] = React.useState('category');

	const { themeStatus } = useDarkMode();

	const [date, setDate] = useState(new Date());

	return (
		<PageWrapper>
			<SubHeader className={{ display: 'flex', flexWrap: 'nowrap' }}>
				<SubHeaderLeft style={{ display: 'flex', flexWrap: 'nowrap', width: '80%' }}>
					<Icon icon='Info' className='me-2' size='2x' />
					You have
					<Box style={{ padding: 8 }} />
					<span
						className='text-muted'
						style={{
							display: 'flex',
							whiteSpace: 'nowrap',
							alignItems: 'center',
							width: 1000,
							overflow: 'scroll',
						}}>
						<Button color='info' isLight onClick={() => setIsTag('feature')}>
							Tính năng
						</Button>
						<Box style={{ padding: 4 }} />
						<Button color='info' isLight onClick={() => setIsTag('gender')}>
							Giới tính
						</Button>
						<Box style={{ padding: 4 }} />
						<Button color='info' isLight onClick={() => setIsTag('material')}>
							Chất liệu
						</Button>
						<Box style={{ padding: 4 }} />
						<Button color='info' isLight onClick={() => setIsTag('modelproduct')}>
							Model sản phẩm
						</Button>
						<Box style={{ padding: 4 }} />
						<Button color='info' isLight onClick={() => setIsTag('numberpart')}>
							Số lượng thành phần
						</Button>
						<Box style={{ padding: 4 }} />
						<Button color='info' isLight onClick={() => setIsTag('operatingsystem')}>
							Hệ điều hành
						</Button>
						<Box style={{ padding: 4 }} />
						<Button
							color='info'
							isLight
							onClick={() => setIsTag('origin')}
							style={{ whiteSpace: 'nowrap' }}>
							Nguồn gốc
						</Button>
						<Box style={{ padding: 4 }} />
						<Button color='info' isLight onClick={() => setIsTag('processor')}>
							Bộ xử lý
						</Button>
						<Box style={{ padding: 4 }} />
						<Button color='info' isLight onClick={() => setIsTag('ram')}>
							Ram
						</Button>
						<Box style={{ padding: 4 }} />
						<Button color='info' isLight onClick={() => setIsTag('rom')}>
							Rom
						</Button>
						<Box style={{ padding: 4 }} />
						<Button color='info' isLight onClick={() => setIsTag('screenresolution')}>
							Độ phân giải màng hình
						</Button>
						<Box style={{ padding: 4 }} />
						<Button color='info' isLight onClick={() => setIsTag('screen')}>
							Kích thước màng hình
						</Button>
						<Box style={{ padding: 4 }} />
						<Button color='info' isLight onClick={() => setIsTag('typeskin')}>
							Loại da
						</Button>
						<Box style={{ padding: 4 }} />
						<Button color='info' isLight onClick={() => setIsTag('typesticker')}>
							Kiểu dán
						</Button>
						<Box style={{ padding: 4 }} />
						<Button color='info' isLight onClick={() => setIsTag('storagecapacity')}>
							Dung lượng lưu trữ
						</Button>
						<Box style={{ padding: 4 }} />
						<Button color='info' isLight onClick={() => setIsTag('typeproduct')}>
							Loại sản phẩm
						</Button>
						<Box style={{ padding: 4 }} />
						<Button color='info' isLight onClick={() => setIsTag('typelock')}>
							Loại khoá
						</Button>
						<Box style={{ padding: 4 }} />
						<Button color='info' isLight onClick={() => setIsTag('typeshell')}>
							Loại Vỏ
						</Button>
						<Box style={{ padding: 4 }} />
						<Button color='info' isLight onClick={() => setIsTag('typewarranty')}>
							Loại bảo hành
						</Button>
						<Box style={{ padding: 4 }} />
						<Button color='info' isLight onClick={() => setIsTag('warrantyperiod')}>
							Hạn bảo hành
						</Button>
						<Box style={{ padding: 4 }} />
						<Button color='info' isLight onClick={() => setIsTag('season')}>
							Mùa
						</Button>
						<Box style={{ padding: 4 }} />
						<Button color='info' isLight onClick={() => setIsTag('sample')}>
							Mẫu
						</Button>
						<Box style={{ padding: 4 }} />
						<Button color='info' isLight onClick={() => setIsTag('style')}>
							Phong cách
						</Button>
						<Box style={{ padding: 4 }} />
					</span>
				</SubHeaderLeft>
				<SubHeaderRight style={{ width: '20%' }}>
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
				{isTag === 'feature' && <FeatureComponent isFluid />}
				{isTag === 'material' && <MaterialComponent isFluid />}
				{isTag === 'modelproduct' && <ModelProductComponent isFluid />}
				{isTag === 'numberpart' && <NumberPartComponent isFluid />}
				{isTag === 'operatingsystem' && <OperatingSystemComponent isFluid />}
				{isTag === 'origin' && <OriginComponent isFluid />}
				{isTag === 'processor' && <ProcessorComponent isFluid />}
				{isTag === 'ram' && <RamComponent isFluid />}
				{isTag === 'rom' && <RomComponent isFluid />}
				{isTag === 'screenresolution' && <ScreenResolutionComponent isFluid />}
				{isTag === 'screen' && <ScreenComponent isFluid />}
				{isTag === 'skintype' && <SkinTypeComponent isFluid />}
				{isTag === 'stickerstyle' && <StickerStyleComponent isFluid />}
				{isTag === 'storagecapacity' && <StorageCapacityComponent isFluid />}
				{isTag === 'typedevice' && <TypeDeviceComponent isFluid />}
				{isTag === 'typelock' && <TypeLockComponent isFluid />}
				{isTag === 'typeshell' && <TypeShellComponent isFluid />}
				{isTag === 'typewarranty' && <TypeWarrantyComponent isFluid />}
				{isTag === 'warrantyperiod' && <WarrantyPeriodComponent isFluid />}
				{isTag === 'season' && <SeasonComponent isFluid />}{' '}
				{isTag === 'sample' && <SampleComponent isFluid />}
				{isTag === 'style' && <StyleComponent isFluid />}
			</Page>
		</PageWrapper>
	);
};

export default UtilsProduct;
