import React, { Component } from 'react'
import { TouchableHighlight, ScrollView, View, Text, StyleSheet } from 'react-native'
import SavedLocationCard from './SavedLocationCard'
import { connect } from 'react-redux'

class Saved extends Component {
	constructor(props) {
		super(props)
		this.state = {

		}
	}

	render() {
		let items = this.props.saved.map(fav => <SavedLocationCard key={fav.id} fav={fav}/>)
		return (
			<View style={styles.container}>
				<View style={styles.header}>
					<Text>Saved trips</Text>
				</View>
				<ScrollView contentContainerStyle={styles.list}>
					{items}
				</ScrollView>
			</View>
		)
	}
}

const mapState = (state) => {
	return {
		saved: state.saved
	}
}

export default connect(mapState)(Saved)

const styles = StyleSheet.create({
	list: {
		flex: 1,
		justifyContent: 'flex-start',
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
