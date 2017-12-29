import React, { Component } from 'react'
import { View, Text, StyleSheet, Button } from 'react-native'
import { Calendar } from 'react-native-calendars'
import datesBetween from 'dates-between'
import { checkBooking, invalidBooking } from '../reducers'
import store from '../store'
import { connect } from 'react-redux'
import BuyScreen from './BuyScreen'

class CalendarBooking extends Component {
	constructor(props) {
		console.log(props)
		super(props)
		this.state = {
			loading: false,
			startDate: null,
			endDate: null,
			dates: {},
			didUpdate: false,
		}

		this.toggleModal = this.toggleModal.bind(this)
	}

	loading() {
		this.setState({ loading: true })
		this.props.bookTrip(this.state.dates)
	}

	toggleModal() {
		const action = invalidBooking([])
		store.dispatch(action)

	}
	componentWillReceiveProps(newProps) {
		console.log(newProps)
		//if it was loading didUpdate is true whether its valid or not.
		if(this.state.loading && !newProps.validBooking && newProps.conflictingOrders.length > 0) {
			this.setState({
				didUpdate: true,
				loading: false
			})
		}
	}
	handleDateselection(day) {
		//if you selected a startDate
		if(this.state.startDate && this.state.endDate) {
			this.setState({
				dates: {},
				startDate: null,
				endDate: null
			})

		}
		//if you selected a startDate and endDate
		else if(this.state.startDate) {
			let end = {}

			let startDate = this.state.startDate
			let endDate = day.dateString
			let arr = Array.from(datesBetween(new Date(startDate), new Date(endDate)))

			arr = arr.map(item => item.toISOString().substring(0, 10))
			arr.map(item => {
				end[item] = { selected: true, color: '#fe5b61' }
			})
			end[this.state.startDate] = { startingDay: true, selected: true, color: '#fe5b61' }
			end[day.dateString] = { endingDay: true, selected: true, color: '#fe5b61' }
			this.setState({
				dates: end,
				endDate: day.dateString
			})
		}
		//if you didnt select anything
		else {
			let dates = {}
			dates[day.dateString] = { selected: true, startingDay: true, color: '#fe5b61' }
			this.setState({
				dates,
				startDate: day.dateString
			})
		}
	}

	render() {
		let warning
		if(this.state.didUpdate && !this.props.validBooking && !this.state.loading) {
			warning = <Text style={styles.warning}>some days you selected are not available</Text>
		}
		return (
			<View style={styles.container}>
				<View style={{ flex: .75 }}>
					<Calendar
						selectedDayBackgroundColor={'#fe5b61'}
						onDayPress={(day) => this.handleDateselection(day)}
						markedDates={this.state.dates}
						markingType="period"
						displayLoadingIndicator={this.state.loading}
						theme={{monthTextColor: '#fe5b61'}}
					/>
				</View>
				{
					warning
				}
				<View style={styles.checkBtn}>
					<Button
						title="Check Availability"
						onPress={() => this.loading()}
						color={'white'}

					/>
				</View>
				<BuyScreen
					toggle={this.toggleModal}
					show={this.props.validBooking}
					animationType="slide"
				/>
			</View>
		)
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent:'space-between',
		backgroundColor: 'white'
	},
	loading: {
		flex: 1,
		justifyContent: 'center'
	},
	modal: {
		marginTop: 22,
		flex: 1,
		justifyContent: 'center'
	},
	warning: {
		color: 'red',
		fontSize: 22,
		fontWeight: 'bold',
		alignSelf: 'center',
	},
	checkBtn: {
		marginTop: 25,
		marginBottom: 50,
		paddingLeft: 20,
		paddingRight: 20,
		borderRadius: 10,
		backgroundColor: '#fe5b61',
		alignSelf: 'center'
	}
})

const mapStateToProps = (state) => {
	return {
		validBooking: state.validBooking,
		conflictingOrders: state.conflictingOrders
	}
}
const mapDispatchToProps = (dispatch) => {
	return {
		bookTrip: (dates) => {
			console.log('btn press')
			const thunk = checkBooking(Object.keys(dates))
			dispatch(thunk)

			// this.props.navigation.naviate('Details')

		}
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(CalendarBooking)
