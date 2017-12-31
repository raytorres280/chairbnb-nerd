import React, { Component } from 'react'
import { Text, ScrollView, View, StyleSheet, TouchableHighlight, Image } from 'react-native'
import { connect } from 'react-redux'
import Search from './Search'
import LocationCard from './LocationCard'
import { fetchLocations } from '../reducers'
import store from '../store'

class SavedLocationCard extends Component {
	constructor(props) {
		super(props)
	}

	render() {
		return (
			<View style={styles.card}>
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
						<View style={styles.toasts}>
							<TouchableHighlight
								style={styles.edit}
								onPress={() => this.props.navigation
									.navigate('TripDetails', { order: this.props.order })}
							>
								<Text style={{textAlign: 'center'}}>Edit</Text>
							</TouchableHighlight>
						</View>
						{/* title of order  */}
						<Text style={styles.title}>{this.props.location.chair}</Text>
					</View>
				</View>
			</View>
		)
	}
}
const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: 'purple'
	}
})

export default SavedLocationCard
