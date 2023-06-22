import React from // useMemo
'react'; // useMemo
import PropTypes from 'prop-types';
import { format } from 'timeago.js';
// import axios from 'axios';

const Message = (props) => {
	const { message, owner } = props;

	// console.log(message, owner, 'props message');
	// const [user, setUser] = React.useState();

	// console.log(user, 'user');

	// const friendId = message?.members.find((f) => f !== currentUser);
	// useMemo(() => {
	// 	axios.get(`http://localhost:8080/api/account/${currentUser._id}`).then((res) => setUser(res.data));
	// }, [currentUser]);

	console.log(message, 'messgae')
	return (
		<div style={{ display: 'flex', flexDirection: 'row' }}>
			{/* {owner && ( */}
			<img
				src={message.sender.avatar}
				alt='alt'
				style={{ width: 50, height: 50, borderRadius: 50 }}
			/>
			{/* )} */}
			{owner ? <div>Chu</div> : <div>khach</div>}
			<div style={{ width: '100%' }}>{message.text}</div>
			<div style={{ width: '100%' }}>{format(message.createdAt)}</div>
		</div>
	);
};

export default Message;

Message.propTypes = {
	message: PropTypes.string.isRequired,
	owner: PropTypes.string.isRequired,
};
