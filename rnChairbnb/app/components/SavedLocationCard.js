import React, { Component } from 'react'
import { Text, ScrollView, View, StyleSheet, TouchableHighlight, Image } from 'react-native'
import { connect } from 'react-redux'
import Search from './Search'
import LocationCard from './LocationCard'
import { fetchLocations } from '../reducers'
import store from '../store'
import Swipeout from 'react-native-swipeout'

class SavedLocationCard extends Component {
	constructor(props) {
		super(props)
		this.state = {

		}
	}

	goDetails() {
		console.log(this.props)
		this.props.navigation.navigate('Details', { location: this.props.fav })
	}

	render() {
		return (
			<TouchableHighlight onPress={() => this.goDetails()} style={styles.container}>
				<View
					style={{
						flex: 1,
						backgroundColor: '#eee',
					}}
				>
					<View
						style={{
							position: 'absolute',
							top: 0,
							left: 0,
							width: '100%',
							height: '100%',
						}}
					>
						<Image
							style={{
								flex: 1,
								resizeMode: 'center',
							}}
							source={{ uri: 'https://image.architonic.com/imgTre/09_11/plastik-Vertex-KarimRashid-14-b.jpg' }}
						/>
					</View>
					<View
						style={{
							flex: 1,
							width: '100%',
							backgroundColor: '#eee',
							opacity: .9,
							justifyContent: 'flex-start'
						}}
					>
						{/* title of order  */}
						<Text>{this.props.fav.chair}</Text>
					</View>
				</View>
			</TouchableHighlight>
		)
	}
}
const styles = StyleSheet.create({
	container: {
		flex: .25,
		justifyContent: 'flex-start',
		backgroundColor: 'green',
		borderRadius: 5,
		borderWidth: .15,
		marginTop: 10,
		marginBottom: 10,
		marginRight: 5,
		marginLeft: 5,
	}
})

export default SavedLocationCard
