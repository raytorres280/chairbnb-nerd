import React, { Component } from 'react'
import { Text, ScrollView, View, StyleSheet } from 'react-native'
import { connect } from 'react-redux'
import Search from './Search'
import LocationCard from './LocationCard'
import { fetchLocations } from '../reducers'
import store from '../store'

class Explore extends Component {
	constructor(props) {
		super(props)

		//do something with navigator state here.
		this.state = {

		}
	}

	componentWillMount() {
		const thunk = fetchLocations()
		store.dispatch(thunk)
	}
	render() {
		let list
		if(this.props.locations.length > 0) {
			list = this.props.locations.map(loc => <LocationCard navigation={this.props.navigation} key={loc.id} location={loc}/>)
		}
		return(
			<View style={styles.container}>
				<Search />
				<View style={styles.scrollContainer}>
					<ScrollView contentContainerStyle={styles.location}>
						{
							list
						}
					</ScrollView>
				</View>
			</View>

		)
	}
}

const mapState = (state) => {
	return {
		locations: state.locations
	}
}

export default connect(mapState)(Explore)

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
	},
	location: {
		flex: 1,
		flexDirection: 'row',
		flexWrap: 'wrap',
		justifyContent: 'flex-start',
		backgroundColor: 'white'
	},
	scrollContainer: {
		flex: 9,
	}
})
