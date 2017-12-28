import React, { Component } from 'react'
import { Text, View, TouchableHighlight, StyleSheet, Image } from 'react-native'
import { connect } from 'react-redux'
import Search from './Search'

const LocationCard = (props) => {
	console.log(props)

	return (
		<TouchableHighlight  onPress={() => props.navigate('Details', { location: props.location, navigate: props.handleClick })}>
			<View style={styles.container}>
				<Image style={{ flex: .5}}
					source={{uri: 'https://image.architonic.com/imgTre/09_11/plastik-Vertex-KarimRashid-14-b.jpg'}}
				/>
				<Text style={{ fontWeight: 'bold', fontSize: 20, fontFamily: 'verdana' }}>{props.location.chair}</Text>
			</View>
		</TouchableHighlight>
	)
}
const styles = StyleSheet.create({
	container: {
		height: 200,
		width:150,
		backgroundColor: 'aqua',
		marginTop: 10,
		marginLeft: 12,
		marginRight: 12
	}
})


export default LocationCard
