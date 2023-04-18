import { storageService } from './storage.service'

export const userService = {
	getUser,
	signup,
	addMove,
	saveUser,
	transferCoins,
}

const USER_KEY = 'key_user'
const users = [
	{
		name: 'Ochoa Hyde',
		coins: 100,
		moves: [],
	},
]

async function getUser() {
	return new Promise((resolve, reject) => {
		let user = storageService.load(USER_KEY)
		// if (!user) {
		// 	console.log('user not found')
		// 	storageService.store(USER_KEY, users[0])
		// }

		// const user = users[0] //users.find((user) => user._id === userId)
		// user ? resolve(user) : reject(`user id  not found!`) //reject(`user id ${id} not found!`)
		resolve(user)
	})
}

async function addMove(contact, amount) {
	const move = {
		toId: contact._id,
		to: contact.name,
		at: Date.now(),
		amount,
	}
	const loggedInUser = storageService.load(USER_KEY)
	loggedInUser.moves.unshift(move)
	storageService.store(USER_KEY, loggedInUser)
}

async function saveUser(user) {
	storageService.store(USER_KEY, user)
}

function signup(name) {
	const loggedInUser = storageService.load(USER_KEY)
	if (loggedInUser) return
	const user = {
		name,
		coins: 100,
		moves: [],
	}
	storageService.store(USER_KEY, user)
	return Promise.resolve(user)
}

function transferCoins(amount, contact) {
	const loggedInUser = storageService.load(USER_KEY)
	const newMove = _createMove(contact, amount)
	loggedInUser.moves.unshift(newMove)
	loggedInUser.coins -= amount
	saveUser(loggedInUser)
	return loggedInUser
}

function _createMove(contact, amount) {
	const newMove = {
		toId: contact._id,
		to: contact.name,
		at: Date.now(),
		amount,
	}
	return newMove
}
