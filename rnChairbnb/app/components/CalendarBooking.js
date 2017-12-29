import React, { Component } from 'react'
import { View, Text } from 'react-native'
import { Calendar } from 'react-native-calendars'
import { Button, ActivityIndicator, StyleSheet } from 'react-native'
import datesBetween from 'dates-between'
import { checkBooking, invalidBooking } from '../reducers'
import store from '../store'
import { connect } from 'react-redux'
import BuyScreen from './BuyScreen'

class CalendarBooking extends Component {
	constructor(props) {
		super(props)
		this.state = {
			loading: false,
			startDate: null,
			endDate: null,
			dates: {},
			didUpdate: false,
			showBuyModal: false
		}
	}

	loading() {
		this.setState({ loading: true })
		this.props.bookTrip(this.state.dates)
	}
	componentWillReceiveProps(newProps) {
		console.log('this might work')
		console.log(newProps)
			//if booking came back invalid, select new dates...
			console.log('this happened...')
			this.setState({
				loading: false,
				didUpdate: true
			})
	}
	handleDateselection(day) {
		//if you selected a startDate
		if(this.state.startDate && this.state.endDate) {
			console.log('both selected')

			this.setState({
				dates: {},
				startDate: null,
				endDate: null
			})

		}
		//if you selected a startDate and endDate
		else if(this.state.startDate) {
			console.log('end date')
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
			console.log('start date')
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
		if(this.state.didUpdate && !this.state.validBooking) {
			warning = <Text>some days you selected are not available</Text>
		}
		return (
			<View style={styles.calendar}>
				<Calendar
					selectedDayBackgroundColor={''}
					onDayPress={(day) => this.handleDateselection(day)}
					markedDates={this.state.dates}
					markingType="period"
					displayLoadingIndicator={this.state.loading}
				/>
				{
					warning
				}
				<Button
					title="push me"
					onPress={() => this.loading()}
				/>
				<BuyScreen
					show={this.props.validBooking}
					animationType="slide"
				/>
			</View>
		)
	}
}

const styles = StyleSheet.create({
	calendar: {
		flex: 1,
		justifyContent:'center'
	},
	loading: {
		flex: 1,
		justifyContent: 'center'
	},
	modal: {
		marginTop: 22,
		flex: 1,
		justifyContent: 'center'
	}
})

const mapStateToProps = (state) => {
	return {
		validBooking: state.validBooking
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
