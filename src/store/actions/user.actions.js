import { SPEND_BALANCE, SET_USER } from '../reducers/user.reducer'
import { userService } from '../../services/user.services'

export function spendBalance(amount) {
	return async (dispatch, getState) => {
		try {
			dispatch({ type: SPEND_BALANCE, amount })
		} catch (error) {
			console.log('error:', error)
		}
	}
}

export function loadUser(loggedUser) {
	return async (dispatch, getState) => {
		try {
			const loggedInUser = loggedUser || (await userService.getUser())
			const action = {
				type: SET_USER,
				loggedInUser,
			}
			dispatch(action)
		} catch (error) {
			console.log('error:', error)
		}
	}
}

export function signup(name) {
	return async (dispatch) => {
		try {
			const loggedInUser = await userService.signup(name)
			const action = {
				type: SET_USER,
				loggedInUser,
			}
			dispatch(action)
		} catch (error) {
			console.log('error:', error)
		}
	}
}

export function transferCoins(amount, contact) {
	return async (dispatch, getState) => {
		try {
			const loggedInUser = userService.transferCoins(amount, contact)
			const action = {
				type: SET_USER,
				loggedInUser,
			}
			dispatch(action)
		} catch (error) {
			console.log('error:', error)
		}
	}
}
