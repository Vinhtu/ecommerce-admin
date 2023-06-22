import { combineReducers } from "redux";
import AccountReducer from "./accounts";
import NotificationReducer from "./notifications";
import TeamReducer from "./teams";
import PositionReducer from "./positions";
import CategoryReducer from "./categorys";
import BrandReducer from "./brands";
import ColorReducer from "./colors";
import SizeReducer from "./sizes";
import AffilateshopReducer from "./affilateshops";
import ProductReducer from "./products";
import VoucherReducer from './vouchers'
import CartReducer from "./carts";
import BannerReducer from "./banners";
import EventReducer from "./events";
import OrderReducer from "./orders";
import ConversationReducer from "./conversations";
import MessageReducer from "./messages";
import UtilsReducer from "./utils";
import CommentReducer from "./comments";
import ColoradminReducer from "./coloradmins";
import SizeadminReducer from "./sizeadmins";

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
    sizeadmin: SizeadminReducer
});

export default Reducers;