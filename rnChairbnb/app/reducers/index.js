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
const GOT_ORDERS = 'GOT_ORDERS'
const CREATED_ORDER = 'CREATED_ORDER'
const CREATED_FAV = 'CREATED_FAV'
const DELETED_FAV = 'DELETED_FAV'
const GOT_FAVS = 'GOT_FAVS'
const GOT_MESSSAGES = 'GOT_MESSSAGES'

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

export const createdOrder = (order) => ({
	type: CREATED_ORDER,
	order
})

export const gotOrders = (orders) => ({
	type: GOT_ORDERS,
	orders
})

export const createdFav = (location) => ({
	type: CREATED_FAV,
	location
})
export const deletedFav = (location) => ({
	type: DELETED_FAV,
	location
})

export const gotFavorites = (favs) => ({
	type: GOT_FAVS,
	saved: favs
})

export const createFav = (loc) => {
	return function(dispatch) {
		return axios({
			url: `http://localhost:3000/api/favorites/${loc.id}`,
			method: 'post',
			data: {id: 1}
		})
			.then(results => results.data)
			.then(data => {
				const action = createdFav(loc)
				dispatch(action)
			})
	}
}

export const deleteFav = (loc, user) => {
	return function(dispatch) {
		return axios({
			url: `http://localhost:3000/api/favorites/${loc.id}/${user.id}`,
			method: 'delete',
			params: {id: 1}
		})
			.then(results => results.data)
			.then(deleteCnt => {
				if(deleteCnt > 0) {
					const action = fetchFavorites({id: 1})
					dispatch(action)
				}
			})
			.catch(err => console.log(err))
	}
}

export const fetchFavorites = (user) => {
	return function(dispatch) {
		return axios(`http://localhost:3000/api/favorites/${user.id}`)
			.then(results => results.data)
			.then(data => {
				const action = gotFavorites(data)
				dispatch(action)
			})
	}
}

export const gotMessages = (messages) => ({
	type: GOT_MESSSAGES,
	messages
})
//change to post for security later
export const fetchOrders = (user) => {
	return function(dispatch) {
		return axios.get(`http://localhost:3000/api/orders/all/${user.id}`)
			.then(res => res.data)
			.then(results => {
				if(results.count > 0) {
					//if no orders where found from query, time is available
					const action = gotOrders(results.rows)
					dispatch(action)
				} else {
					const action = gotOrders([])
					dispatch(action)
				}
			})
			.catch(err => console.log(err))
	}
}

export const checkBooking = (dates, loc) => {
	return function(dispatch) {
		return axios({
			url: `http://localhost:3000/api/orders/${loc.id}`,
			method: 'post',
			data: dates
		})
			.then(res => res.data)
			.then(results => {
				if(results.count < 1) {
					//if no orders where found from query, time is available
					const action = validBooking()
					dispatch(action)
				} else {
					const action = invalidBooking(results.rows)
					dispatch(action)
				}
			})
			.catch(err => console.log(err))
	}
}

export const createOrder = (location, dates) => {
	return function(dispatch) {
		return axios({
			url: 'http://localhost:3000/api/orders/',
			method: 'post',
			data: {
				location,
				dates
			}
		})
			.then(results => results.data)
			.then(data => {
				console.log(data)
				// const action = gotOrders(orders)
				// dispatch(action)

				if(data.created) {
					//if no orders where found from query, time is available
					const action = createdOrder(data.orders[0])
					dispatch(action)
				} else {
					const action = invalidBooking(data.orders)
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

export const fetchMessages = (user) => {
	return function(dispatch) {
		return axios.get(`http://localhost:3000/api/messages/${user.id}`)
			.then(res => res.data)
			.then(chats => {

				const action = gotMessages(chats)
				dispatch(action)
			})
			.catch(err => console.log(err))
	}
}

export const createMessage = (message) => {
	return function(dispatch) {
		return axios({
			url: 'http://localhost:3000/api/messages/',
			method: 'post',
			data: message
		})
			.then(res => {
				return res.data
			})
			.then(chats => {
				console.log('create message response..', chats)
				const action = fetchMessages()
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
	case GOT_ORDERS:
		return {...state, orders: action.orders }
	case CREATED_ORDER:
		return {...state, orders: [...state.orders, action.order]}
	case CREATED_FAV:
		return {...state, saved: [...state.saved, action.location ]}
	case GOT_MESSSAGES:
		return {...state, inbox: action.messages}
	case GOT_FAVS:
		return {...state, saved: action.saved }
	default:
		return { ...state }
	}
}
export default rootReducer
