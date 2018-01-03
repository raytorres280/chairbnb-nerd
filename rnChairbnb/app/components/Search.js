import React, { Component } from 'react'
import { Text, ScrollView, View, StyleSheet, TextInput } from 'react-native'
import { connect } from 'react-redux'

class Search extends Component {
	constructor(props) {
		super(props)
		this.state = {
			textField: ''
		}
	}
	render() {
		return(
			<View style={styles.container}>
				<TextInput
					style={styles.inputField}
					onChangeText={(text) => this.setState({ textField: text })}
					value={this.state.textField}
				/>
				<View style={styles.filters}>
					{/* insert filters buttons here */}
				</View>
			</View>
		)
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	inputField: {
		backgroundColor: 'white',
		flex: 2,
		marginTop: 10,
		marginLeft: 10,
		marginRight: 10,
		borderRadius: 2,
		borderWidth: .5,
		shadowOffset: {width: 5, height: 5},
	},
	filters: {
		marginTop: 5,
		marginBottom: 5,
		marginLeft: 10,
		marginRight: 10,
		flex: 1,
		backgroundColor: 'blue'
	}
})

export default Search
