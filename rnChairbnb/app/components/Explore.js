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
		console.log(this.props)
		const thunk = fetchLocations()
		store.dispatch(thunk)
	}
	render() {
		let list
		if(this.props.locations.length > 0) {
			list = this.props.locations.map(loc => <LocationCard navigate={this.props.navigation.navigate} key={loc.id} location={loc}/>)
		}
		return(
			<View style={styles.container}>
				<Search />
				<ScrollView contentContainerStyle={styles.location}>
					{
						list
					}
				</ScrollView>
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
		justifyContent: 'space-around',
		backgroundColor: 'orange'
	},
	search: {
	}
})
