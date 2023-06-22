import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import axios from 'axios';
import { ChatListItem } from '../../../components/Chat';

const Conversation = (props) => {
	const { data, currentUser } = props;

	const [user, setUser] = React.useState();
		
	const accessToken = localStorage.getItem('accessToken');
	const token = JSON.parse(accessToken);

	const friendId = data.members.find((f) => f !== currentUser);
	console.log()
	useMemo(() => {
		axios.get(`http://localhost:8080/api/account/${friendId}`, {
			headers: {
				'Content-Type': 'application/json',
				Accept: 'application/json',
				Authorization: `Bearer ${token}`,
			},
		}).then((res) => setUser(res.data));
	}, [friendId, token]);


	return (
		<ChatListItem
			// onClick={() => getListShow(TABS.CHLOE)}
			// isActive={activeTab === TABS.CHLOE}
			src={user && user.avatar}
			srcSet={user && user.avatar}
			name={user && user.fullname}
			surname={user && user.username}
			// isOnline={USERS.CHLOE.isOnline}
			// color={USERS.CHLOE.color}
			lastSeenTime={moment().add(-1, 'week').fromNow()}
			latestMessage={"I think it's really starting to shine."}
		/>
	);
};

export default Conversation;

Conversation.propTypes = {
	data: PropTypes.string.isRequired,
	currentUser: PropTypes.string.isRequired,
};
