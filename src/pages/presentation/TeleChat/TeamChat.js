import React, { useContext, useState, useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { io } from 'socket.io-client';
import SubHeader, { SubHeaderLeft, SubHeaderRight } from '../../../layout/SubHeader/SubHeader';
import Button from '../../../components/bootstrap/Button';
import Page from '../../../layout/Page/Page';
import Card, {
	CardActions,
	CardBody,
	CardFooter,
	CardFooterLeft,
	CardHeader,
	CardLabel,
	CardSubTitle,
	CardTitle,
} from '../../../components/bootstrap/Card';
import PageWrapper from '../../../layout/PageWrapper/PageWrapper';
import { ChatAvatar } from '../../../components/Chat';
import InputGroup from '../../../components/bootstrap/forms/InputGroup';
import Textarea from '../../../components/bootstrap/forms/Textarea';
import Icon from '../../../components/icon/Icon';
import ThemeContext from '../../../contexts/themeContext';
import { demoPages } from '../../../menu';
import CommonChatStatus from '../../common/CommonChatStatus';
import { GetConversation } from '../../../redux/actions/conversations';
import Conversation from './Conversation';
import { GetAccount } from '../../../redux/actions/accounts';
import Message from './Message';

const TeamChat = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();

	// const [conversations, setConversation] = React.useState([]);
	const [currentChat, setCurrentChat] = React.useState();
	const [message, setMessage] = React.useState([]);
	const [newMessage, setNewMessage] = React.useState();
	const [arrivalMessage, setArrivalMessage] = React.useState(null);
	const [userSocket, setUserSocket] = React.useState([]);
	const socket = useRef();
	const [customor, setCustomor] = React.useState();
	// const [socket, setSocket] = React.useState(null);
	// console.log(socket, 'socket');

	const { conversationDetail } = useSelector((state) => state.conversation);

	const { accountDetail } = useSelector((state) => state.account);

		const accountInfo = localStorage.getItem('accountinfo');
		const accessToken = localStorage.getItem('accessToken');
		// const refreshToken = localStorage.getItem('refreshToken');
		const accountId = JSON.parse(accountInfo);
		const token = JSON.parse(accessToken);
		// const refreshtoken = JSON.parse(refreshToken);
	  
	// const accountInfo = localStorage.getItem('accountinfo');
	// const account = JSON.parse(accountInfo);

	useEffect(() => {
		// console.log('vo socker');
		socket.current = io('ws://localhost:8900');
		socket.current.on('getMessage', (data) => {
			setArrivalMessage({
				sender: data.sender,
				text: data.text,
				createdAt: Date.now(),
			});
		});
	}, []);



	useEffect(() => {
		console.log("vo trong")

		if (arrivalMessage) {
			console.log(arrivalMessage, " tono tai arrivalMessage");
			console.log(currentChat?.members?.includes(arrivalMessage.sender?._id),'Dieu kien');
			
		// 	if (currentChat?.members?.includes(arrivalMessage.sender?._id)) {
		// 		console.log("vo dieu kien")
		// 		setMessage((prev) => [...prev, arrivalMessage]);
		// 	}
		}
	}, [arrivalMessage, currentChat])

	useEffect(() => {
		if (accountId) {
			socket.current.emit('addUser', accountId);
			socket.current.on('getUsers', (users) => {
				setUserSocket([]);
				for (let i = 0; i < users.length; i += 1) {
					setUserSocket((current) => [...current, users[i].userId]);
				}
			});
		}
	}, [accountId]);

	// useEffect(() => {
	// 	setSocket(io('ws://localhost:8900'));
	// }, []);

	// useEffect(() => {
	// 	socket?.on('Welcome', messageSocket => {
	// 		console.log(messageSocket, 'messageSocket');
	// 	});
	// }, [socket]);

	const { mobileDesign } = useContext(ThemeContext);
	const [listShow, setListShow] = useState(true);

	const scrollRef = useRef();

	useEffect(() => {
		dispatch(GetConversation(accountId));
		dispatch(GetAccount(accountId, token));
	}, [dispatch, accountId, token]);

	useEffect(() => {
		console.log(currentChat, 'currenchat');
		const getMessage = async () => {
			const res = await axios.get(`http://localhost:8080/api/message/${currentChat?._id}`);
			setMessage(res.data);
		};
		getMessage();
	}, [currentChat]);

	const sendMessage = async (e) => {
		e.preventDefault();

		const messages = {
			sender: accountDetail,
			text: newMessage,
			conversationId: currentChat._id,
		};

		const receiverId = currentChat.members.find((member) => member !== accountId);

		socket.current.emit('sendMessage', {
			sender: accountDetail,
			receiverId,
			text: newMessage,
		});
		const res = await axios.post(`http://localhost:8080/api/message`, messages);
		setMessage([...message, res.data]);
	};

	useEffect(() => {
		scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
	}, [message]);

	useEffect(() => {
		if (currentChat) {
			// console.log(currentChat, 'currentChat');
			const receiverId = currentChat.members.find((member) => member !== accountId);

			const getCurrentChat = async () => {
				const res = await axios.get(`http://localhost:8080/api/account/${receiverId} `, {
					headers: {
						'Content-Type': 'application/json',
						Accept: 'application/json',
						Authorization: `Bearer ${token}`,
					},
				});
				// console.log(res.data, 'customor');
				setCustomor(res.data);
			};
			getCurrentChat();
		}
	}, [currentChat, accountId, token]);

	console.log(accountDetail, 'accountDetail')
	console.log(conversationDetail, 'conversationDetail')

	// console.log(currentChat, 'currentChat');

	// console.log(accountLogin, 'account login');
	// console.log(conversationDetail, 'conversation ban dau');
	// console.log(message,'mes/sage /ssoket')

	// console.log(message,'message')

	
	return (
		<PageWrapper title={demoPages.chat.subMenu.withListChat.text}>
			<SubHeader>
				<SubHeaderLeft>
					<span>
						<Icon icon='Info' className='me-2' size='2x' color='danger' />
						<span className='text-muted'>
							You have <Icon icon='Chat5' color='danger' className='mx-1' size='lg' />{' '}
							14 unread messages.
						</span>
					</span>
				</SubHeaderLeft>
				<SubHeaderRight>
					<CommonChatStatus />
					{!listShow && (
						<Button
							color='info'
							isLight
							icon='ChevronLeft'
							onClick={() => {
								setListShow(true);
							}}>
							Back to List
						</Button>
					)}
				</SubHeaderRight>
			</SubHeader>
			<Page>
				<div className='row h-100'>
					{(listShow || !mobileDesign) && (
						<div className='col-lg-4 col-md-6'>
							<Card stretch className='overflow-hidden'>
								<CardBody isScrollable className='p-0'>
									<Card shadow='none' className='mb-0'>
										<CardHeader className='sticky-top'>
											<CardLabel icon='AccountCircle' iconColor='success'>
												<CardTitle>Online</CardTitle>
												<CardSubTitle>3 users</CardSubTitle>
											</CardLabel>
										</CardHeader>
										<CardBody className='border-bottom border-light'>
											<div className='row'>
												{conversationDetail &&
													conversationDetail.map((item) => {
														if (userSocket.includes(item.members[1])) {
															return (
																<div
																	role='button'
																	tabIndex={0}
																	onClick={() =>
																		setCurrentChat(item)
																	}
																	onKeyDown={() =>
																		setCurrentChat(item)
																	}>
																	<Conversation
																		data={item}
																		currentUser={
																			accountId
																		}
																	/>
																</div>
															);
														}
														return null;
													})}
											</div>
										</CardBody>
									</Card>
									<Card shadow='none' className='mb-0'>
										<CardHeader className='sticky-top'>
											<CardLabel icon='AccountCircle' iconColor='danger'>
												<CardTitle>Offline</CardTitle>
												<CardSubTitle>3 users</CardSubTitle>
											</CardLabel>
										</CardHeader>
										<CardBody>
											<div className='row'>
												{conversationDetail &&
													conversationDetail.map((item) => {
														if (!userSocket.includes(item.members[1])) {
															return (
																<div
																	role='button'
																	tabIndex={0}
																	onClick={() =>
																		setCurrentChat(item)
																	}
																	onKeyDown={() =>
																		setCurrentChat(item)
																	}>
																	<Conversation
																		data={item}
																		currentUser={
																			accountId
																		}
																	/>
																</div>
															);
														}
														return null;
													})}
											</div>
										</CardBody>
									</Card>
								</CardBody>
								<CardFooter>
									<CardFooterLeft className='w-100'>
										<Button
											icon='Logout'
											color='danger'
											isLight
											className='w-100 p-3'
											// onClick={() => navigate(`../${demoPages.login.path}`)}
											>
											Logout
										</Button>
									</CardFooterLeft>
								</CardFooter>
							</Card>
						</div>
					)}
					{(!listShow || !mobileDesign) && (
						<div className='col-lg-8 col-md-6'>
							{currentChat ? (
								<Card stretch>
									<CardHeader>
										<CardActions>
											<div className='d-flex align-items-center'>
												<ChatAvatar
													// eslint-disable-next-line react/jsx-props-no-spreading
													src={customor && customor.avatar}
													className='me-3'
												/>
												<div className='fw-bold'>
													{customor && customor.username} -{' '}
													{customor && customor.fullname}
												</div>
											</div>
										</CardActions>
									</CardHeader>
									<CardBody isScrollable>
										{message.map((msg) => {
											return (
												<div ref={scrollRef}>
													<Message
														message={msg}
														owner={msg.sender === accountId}
													/>
												</div>
											);
										})}
									</CardBody>

									<CardFooter className='d-block'>
										<InputGroup>
											<Textarea
												value={newMessage}
												onChange={(e) => setNewMessage(e.target.value)}
											/>
											<Button color='info' icon='Send' onClick={sendMessage}>
												SEND
											</Button>
										</InputGroup>
									</CardFooter>
								</Card>
							) : (
								<div>No message</div>
							)}
						</div>
					)}
				</div>
			</Page>
		</PageWrapper>
	);
};

export default TeamChat;
