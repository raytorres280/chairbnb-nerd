import React, { Component } from 'react'
import { View, Text, Modal, Button, StyleSheet } from 'react-native'

class BuyScreen extends Component {
	constructor(props) {
		super(props)
		this.state = {

		}
	}
	componentWillUnMount() {
		console.log('this will work')
	}

	render(props) {
		console.log(this.props.show)
		return (
			<Modal visible={this.props.show}>
				<View style={styles.modal}>
					<Button
						title="close"
						onPress={this.props.toggle}
					/>
					<Text>Buy Screen</Text>
					<Button
						title="buy"
						onPress={() => console.log('buy')}
					/>
				</View>
			</Modal>
		)
	}
}

const styles = StyleSheet.create({
	modal: {
		marginTop: 0,
		flex: 1,
		justifyContent: 'space-around',
		alignItems: 'center'
	}
})

export default BuyScreen
