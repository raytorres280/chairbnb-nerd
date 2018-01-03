import React, { Component } from 'react'
import { ScrollView, View, Text, StyleSheet } from 'react-native'
import SavedLocationCard from './SavedLocationCard'
import { connect } from 'react-redux'
import store from '../store'
import { fetchFavorites } from '../reducers'

class Saved extends Component {
	

	componentWillMount() {
		const thunk = fetchFavorites({id: 1})
		store.dispatch(thunk)
	}

	render() {
		let items
		if(this.props.saved.length > 0)
			items = this.props.saved
				.map(fav =>
					<SavedLocationCard
						key={fav.id}
						fav={fav}
						navigation={this.props.navigation}
					/>
				)
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
