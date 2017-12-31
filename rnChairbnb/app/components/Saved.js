import React, { Component } from 'react'
import { TouchableHighlight, ScrollView, View, Text, StyleSheet } from 'react-native'
import SavedLocationCard from './SavedLocationCard'

class Saved extends Component {
	constructor(props) {
		super(props)
		this.state = {

		}
	}

	render() {
		return (
			<View style={styles.container}>
				<View style={styles.header}>
					<Text>Saved trips</Text>
				</View>
				<ScrollView contentContainerStyle={styles.item}>

				</ScrollView>
			</View>
		)
	}
}

const styles = StyleSheet.create({
	item: {
		flex: 1,
		justifyContent: 'flex-end',
		backgroundColor: 'blue'
	},
	container: {
		flex: 1,
		justifyContent: 'flex-end',
		backgroundColor: 'red'
	},
	header:{
		flex: 0.1,
		flexDirection: 'row',
		backgroundColor: 'aqua',
		justifyContent: 'center',
		alignItems: 'center'

	}
})

export default Saved
