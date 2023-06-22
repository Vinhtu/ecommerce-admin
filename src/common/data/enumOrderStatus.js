import COLORS from './enumColors';

const EVENT_ORDER_STATUS = {
	PENDING: { name: 'Pending', color: COLORS.WARNING.name },
	ACCEPT: { name: 'Accept', color: COLORS.SUCCESS.name },
	CANCELED: { name: 'Canceled', color: COLORS.DANGER.name },
	RUNING: { name: 'Runing', color: COLORS.DARK.name },
	COMPLETE: { name: 'Complete', color: COLORS.SUCCESS.name },

};
export default EVENT_ORDER_STATUS;
