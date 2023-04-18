export const SET_USER = 'SET_USER'
export const SPEND_BALANCE = 'SPEND_BALANCE'

const INITIAL_STATE = {
	loggedInUser: null,
}

export function userReducer(state = INITIAL_STATE, action = {}) {
	switch (action.type) {
		case SET_USER: {
			return { ...state, loggedInUser: action.loggedInUser }
		}

		case SPEND_BALANCE:
			const { loggedInUser } = state
			return {
				...state,
				loggedInUser: { ...loggedInUser, balance: loggedInUser.balance - action.amount },
			}
		default:
			return state
	}
}
