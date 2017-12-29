// import { combineReducers } from 'redux'
import axios from 'axios'

const initialState = {
	activeUser: {},
	locations: [],
	orders: [],
	saved: [],
	inbox: [],
	validBooking: false,
	conflictingOrders: []
}

const GOT_LOCATIONS = 'GOT_LOCATIONS'
const VALID_BOOKING = 'VALID_BOOKING'
const INVALID_BOOKING = 'INVALID_BOOKING'

export const gotLocations = (locations) => ({
	type: GOT_LOCATIONS,
	locations
})

export const validBooking = () => ({
	type: VALID_BOOKING
})

export const invalidBooking = (orders) => ({
	type: INVALID_BOOKING,
	orders
})

export const checkBooking = (dates) => {
	return function(dispatch) {
		return axios({
			url: 'http://localhost:3000/api/orders/1',
			method: 'post',
			data: dates
		})
			.then(res => res.data)
			.then(orders => {
				if(orders === null || orders.length === 0) {
					//if no orders where found from query, time is available
					const action = validBooking()
					dispatch(action)
				} else {
					const action = invalidBooking(orders)
					dispatch(action)
				}
			})
			.catch(err => console.log(err))
	}
}

export const fetchLocations = () => {
	return function(dispatch) {
		return axios.get('http://localhost:3000/api/locations')
			.then(res => res.data)
			.then(locations => {
				const action = gotLocations(locations)
				dispatch(action)
			})
			.catch(err => console.log(err))
	}
}

const rootReducer = (state = initialState, action) => {
	switch(action.type) {
	case GOT_LOCATIONS:
		return { ...state, locations: action.locations }
	case INVALID_BOOKING:
		return {...state, validBooking: false, conflictingOrders: action.orders }
	case VALID_BOOKING:
		return {...state, validBooking: true }
	default:
		return { ...state }
	}
}
export default rootReducer
