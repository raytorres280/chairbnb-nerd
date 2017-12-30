import React, { Component } from 'react'
import { View, ScrollView, Text, Image, StyleSheet, TouchableHighlight } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'

export default class LocationDetails extends Component {
	constructor(props) {
		super(props)
		console.log(props)
		this.state = {
			map: null //something to do with map that isnt there yet.
		}
	}

	handleCheckBtnPress() {
		console.log(this.props)
		// this.props.nav.navigate('Booking')
		this.props.navigation.navigate('Booking', {
			location: this.props.navigation.state.params.location,

		})
	}

	render() {
		return(
			<View style={{ flex: 1, backgroundColor: 'snow' }}>
				<ScrollView style={styles.scrollContainer}>
					<Image
						source={{ uri: 'https://image.architonic.com/imgTre/09_11/plastik-Vertex-KarimRashid-14-b.jpg' }}
						style={styles.image}
					/>
					<Text style={styles.title}>Hipster Chair</Text>

					<View style={styles.hostContainer}>
						<Text>Hosted by: Hipster</Text>
						<Image
							source={{ uri: 'https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png'}}
							style={styles.thumbnail}
						/>
					</View>

					<View style={styles.stats}>
						<Text>weight limit and seating limit. dumbell and group icon.</Text>
					</View>

					<View style={styles.description}>
						<Text>This is a nice chair, it is extremely uncomfortable</Text>
					</View>

					<Text>1 day minimum</Text>

					<View style={styles.amenities}>
						<Icon name="ios-wifi-outline" size={40} />
						<Icon name="ios-pizza-outline" size={40} />
						<Icon name="ios-beer-outline" size={40} />
					</View>
					{/* map */}
					<Text>check in 9am, checkout: 3pm</Text>
					{/* reviews */}
				</ScrollView>
				<View style={styles.floatingCheckButton}>
					<Text>Check availability</Text>
					<TouchableHighlight style={styles.checkBtn} onPress={() => this.handleCheckBtnPress()}><Text>Check</Text></TouchableHighlight>
				</View>
			</View>
		)
	}
}
const styles = StyleSheet.create({
	image: {
		height: 200,
		borderWidth: 0.16
	},
	hostContainer: {
		flexDirection: 'row',
		justifyContent: 'space-around',
		alignItems: 'center',
		borderBottomWidth: .30,
		paddingBottom: 10
	},
	title: {
		fontSize: 30,
		fontWeight: 'bold',

	},
	thumbnail: {
		height: 48,
		width: 48,
		borderRadius: 25
	},
	stats: {
		flex: 1,
		flexDirection: 'row',
		justifyContent: 'space-around',
		borderBottomWidth: .30,
		paddingTop: 15,
		paddingBottom: 15
	},
	description: {
		borderBottomWidth: .30,
		paddingBottom: 15,
		paddingTop: 15
	},
	amenities: {
		flex: 1,
		flexDirection: 'row',
		justifyContent: 'space-around',
		borderBottomWidth: .30,
		paddingTop: 15,
		paddingBottom: 15
	},
	scrollContainer: {
		flex:1,
	},
	floatingCheckButton: {
		flex: .12,
		backgroundColor: 'floralwhite',
		flexDirection: 'row',
		justifyContent: 'space-around',
		alignItems: 'center',
		shadowOpacity: 0.75,
		shadowRadius: 3,
		shadowColor: 'black',
		shadowOffset: { height: 0, width: 0 },
	},
	checkBtn: {
		borderRadius: 5,
		padding: 10,
		paddingLeft: 40,
		paddingRight: 40,
		backgroundColor: '#fe5b61'
	}
})
