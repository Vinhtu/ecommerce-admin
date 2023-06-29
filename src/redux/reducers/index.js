import { combineReducers } from 'redux';
import AccountReducer from './accounts';
import NotificationReducer from './notifications';
import TeamReducer from './teams';
import PositionReducer from './positions';
import CategoryReducer from './categorys';
import BrandReducer from './brands';
import ColorReducer from './colors';
import SizeReducer from './sizes';
import AffilateshopReducer from './affilateshops';
import ProductReducer from './products';
import VoucherReducer from './vouchers';
import CartReducer from './carts';
import BannerReducer from './banners';
import EventReducer from './events';
import OrderReducer from './orders';
import ConversationReducer from './conversations';
import MessageReducer from './messages';
import UtilsReducer from './utils';
import CommentReducer from './comments';
import ColoradminReducer from './coloradmins';
import SizeadminReducer from './sizeadmins';
import UsageStatusReducer from './usagestatus';
import DeliveryMethodReducer from './deliverymethods';

import FeatureReducer from './utils/features';
import GenderReducer from './utils/genders';
import MaterialReducer from './utils/materials';
import ModelProductReducer from './utils/modelproducts';
import NumberPartReducer from './utils/numberparts';
import OperatingSystemReducer from './utils/operatingsystems';
import OriginReducer from './utils/origins';
import ProcessorReducer from './utils/processors';
import RamReducer from './utils/rams';
import RomReducer from './utils/roms';
import SampleReducer from './utils/samples';
import ScreenResolutionReducer from './utils/screenresolutions';
import ScreenReducer from './utils/screens';
import SeasonReducer from './utils/seasons';
import SkinTypeReducer from './utils/skintypes';
import StickerStyleReducer from './utils/stickerstyles';
import StorageCapacityReducer from './utils/storagecapacitys';
import StyleReducer from './utils/styles';
import TypeDeviceReducer from './utils/typedevices';
import TypeLockReducer from './utils/typelocks';
import TypeShellReducer from './utils/typeshells';
import TypeWarranntyReducer from './utils/typewarrantys';
import WarrantyPeriodReducer from './utils/warrantyperiods';

const Reducers = combineReducers({
	account: AccountReducer,
	notification: NotificationReducer,
	team: TeamReducer,
	position: PositionReducer,
	category: CategoryReducer,
	brand: BrandReducer,
	color: ColorReducer,
	size: SizeReducer,
	affilateshop: AffilateshopReducer,
	product: ProductReducer,
	voucher: VoucherReducer,
	cart: CartReducer,
	banner: BannerReducer,
	event: EventReducer,
	order: OrderReducer,
	conversation: ConversationReducer,
	message: MessageReducer,
	utils: UtilsReducer,
	comment: CommentReducer,
	coloradmin: ColoradminReducer,
	sizeadmin: SizeadminReducer,
	usagestatus: UsageStatusReducer,
	deliverymethod: DeliveryMethodReducer,

	feature: FeatureReducer,
	gender: GenderReducer,
	material: MaterialReducer,
	modelproduct: ModelProductReducer,
	numberpart: NumberPartReducer,
	operatingsystem: OperatingSystemReducer,
	origin: OriginReducer,
	processor: ProcessorReducer,
	ram: RamReducer,
	rom: RomReducer,
	sample: SampleReducer,
	screenresolution: ScreenResolutionReducer,
	screen: ScreenReducer,
	season: SeasonReducer,
	skintype: SkinTypeReducer,
	stickerstyle: StickerStyleReducer,
	storagecapacity: StorageCapacityReducer,
	style: StyleReducer,
	typedevice: TypeDeviceReducer,
	typelock: TypeLockReducer,
	typeshell: TypeShellReducer,
	typewarranty: TypeWarranntyReducer,
	warrantyperiod: WarrantyPeriodReducer,
});

export default Reducers;
