const io = require('socket.io')(8900, {
	cors: {
		origin: 'http://localhost:3001',
	},
});

let users = [];

const addUser = (userId, socketId) => {
	!users.some((user) => user.userId === userId) && users.push({ userId, socketId });
};

const removeUser = (socketId) => {
	users = users.filter((user) => user.socketId !== socketId);
};

const getUser = (userId) => {
	return users.find((user) => (user.userId = userId));
};
io.on('connection', (socket) => {
	// io.emit("Welcome", "Hello this is socket server")
	socket.on('addUser', (userId) => {
		addUser(userId, socket.id);
		io.emit('getUsers', users);
	});
	//send get message
	socket.on('sendMessage', ({ sender, receiverId, text }) => {
		io.to(user.socketId).emit('getMessage', {
			sender,
			text,
		});
	});

	socket.on('disconnect', () => {
		removeUser(socket.id);
		io.emit('getUsers', users);
	});
});
