import React, { Component } from 'react'
import { Text, View, TouchableHighlight, StyleSheet, Image } from 'react-native'
import { connect } from 'react-redux'
import Search from './Search'
import Icon from 'react-native-vector-icons/Ionicons'

const LocationCard = (props) => {

	const goDetails = () => {
		props.navigation.navigate('Details', { location: props.location })
	}
	return (
		<TouchableHighlight  onPress={() => goDetails()} style={styles.container}>
			<View style={{flex: 1}}>
				<Image style={styles.thumbImg}
					source={{uri: 'https://image.architonic.com/imgTre/09_11/plastik-Vertex-KarimRashid-14-b.jpg'}}
				/>
				<View style={styles.thumbText}>
					<Text style={{ fontWeight: 'bold', fontSize: 20, fontFamily: 'verdana' }}>{props.location.chair}</Text>
					<Text>${props.location.rate} per night</Text>
					<View style={styles.rating}>
						<Icon name="ios-star" color="#077D8B"/>
						<Icon name="ios-star" color="#077D8B"/>
						<Icon name="ios-star" color="#077D8B"/>
						<Icon name="ios-star" color="#077D8B"/>
						<Icon name="ios-star" color="#077D8B"/>
					</View>
				</View>
			</View>
		</TouchableHighlight>
	)
}
const styles = StyleSheet.create({
	container: {
		width: '40%',
		height: '45%',
		backgroundColor: 'snow',
		marginTop: 10,
		marginLeft: '5%',
		marginRight: '5%',
	},rating: {
		flexDirection: 'row',
	},
	thumbImg: {
		flex: 5,
		borderRadius: 5,
		borderWidth: 1,
	},
	thumbText: {
		flex: 5,
		justifyContent: 'space-between',
	}
})


export default LocationCard
