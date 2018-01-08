import React, { Component } from 'react'
import { View, ScrollView, StyleSheet, Image } from 'react-native'
import { Calendar } from 'react-native-calendars'
import datesBetween from 'dates-between'

class TripDetails extends Component {
	constructor(props) {
		super(props)
		this.state = {

		}
	}

	getDates() {
		let start = this.props.navigation.state.params.order.start_date.substring(0, 10)
		let end = this.props.navigation.state.params.order.end_date.substring(0, 10)
		let list = Array.from(datesBetween(new Date(start), new Date(end)))
		let dates = {}
		list.map(date => {
			let key = date.toISOString().substring(0, 10)
			dates[key] = { selected: true, color: '#fe5b61' }
		})
		dates[start] = { selected: true, color: '#fe5b61', startingDay: true }
		dates[end] = { selected: true, color: '#fe5b61', endingDay: true }
		console.log(dates)
		return dates
	}

	render() {

		return (
			<ScrollView contentContainerStyle={styles.container}>
				{/* later handle changing/updating order while it is still active */}
				<Image
					source={{ uri: 'https://image.architonic.com/imgTre/09_11/plastik-Vertex-KarimRashid-14-b.jpg' }}
					style={styles.image}
				/>
				<View style={{ flex: 1 }}>
					<Calendar
						current={this.props.navigation.state.params.order.start_date}
						selectedDayBackgroundColor={'#fe5b61'}
						markedDates={this.getDates()}
						markingType="period"
						theme={{monthTextColor: '#fe5b61'}}
					/>
				</View>
			</ScrollView>
		)
	}
}
export default TripDetails

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	image: {
		height: 200,
		borderWidth: 0.16
	}
})
