import React, { Component } from 'react'
import { View, Text } from 'react-native'
import { Calendar } from 'react-native-calendars'
import { Button, ActivityIndicator, StyleSheet } from 'react-native'
import { checkBooking } from '../reducers'
import store from '../store'

class CalendarBooking extends Component {
	constructor(props) {
		super(props)
		this.state = {
			loading: false,
			startDate: null,
			endDate: null,
			dates: {}
		}
	}
	navigate() {
		console.log('btn press')
		this.setState({ loading: true })
		// this.props.navigation.naviate('Details')
	}
	handleDateselection(day) {
		//if you selected a startDate
		if(this.state.startDate) {
			if(Date.parse(day.dateString) > this.state.startDate) {
				//if second selection is greater than first, select all dates in b/t
				this.getDates(this.state.startDate, Date(day.dateString))
			}
			let dates = {}
			dates = {...this.state.dates}

			dates[day.dateString] = { selected: true }
			this.setState({
				dates,
				endDate: day.dateString
			})
		}
		//if you selected a startDate and endDate
		else if(this.state.startDate && this.state.endDate) {
			console.log('both selected')
		}
		//if you didnt select anything
		else {
			let dates = {}
			dates[day.dateString] = { selected: true }
			this.setState({
				dates,
				startDate: day.dateString
			})
		}
	}
	getDates(startDate, stopDate) {
		var dateArray = new Array();
		var currentDate = startDate;
		while (currentDate <= stopDate) {
			dateArray.push(new Date (currentDate));
			currentDate = currentDate.addDays(1);
		}
		return dateArray
	}
	render() {
		let screen
		if(this.state.loading)
			screen = (<View style={styles.loading}><ActivityIndicator size="large" color="#fe5b61" /></View>)

		else screen = (
			<View style={styles.calendar}>
				<Calendar
					onDayPress={(day) => this.handleDateselection(day)}
					markedDates={this.state.dates}
				/>
			</View>
		)
		return (
			screen
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
	}
})

export default CalendarBooking
