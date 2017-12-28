// import { combineReducers } from 'redux'
import axios from 'axios'

const initialState = {
	activeUser: {},
	locations: [],
	orders: [],
	saved: [],
	inbox: []
}

const GOT_LOCATIONS = 'GOT_LOCATIONS'

export const gotLocations = (locations) => ({
	type: GOT_LOCATIONS,
	locations
})

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
	default:
		return { ...state }
	}
}
export default rootReducer
