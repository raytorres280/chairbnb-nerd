import React, { Component } from 'react'
import { View, Text, Modal, Button, StyleSheet } from 'react-native'
import { connect } from 'react-redux'
import { createOrder } from '../reducers'

class BuyScreen extends Component {
	constructor(props) {
		super(props)
		this.state = {

		}
	}

	componentWillReceiveProps(newProps) {
		if(newProps.orders.length > this.props.orders.length) {
			this.props.toggle()
			this.props.navigation.goBack(null)
		}
	}

	render(props) {
		console.log(this.props)
		return (
			<Modal visible={this.props.show}>
				<View style={styles.modal}>
					<Button
						title="CANCEL"
						onPress={this.props.toggle}
					/>
					<Text>Days are Available. Book your stay!</Text>
					<View style={styles.checkBtn}>
						<Button
							title="Book Stay"
							onPress={() => this.props.confirmBookStay(this.props.location, this.props.dates)}
							color={'white'}

						/>
					</View>
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
	},
	checkBtn: {
		marginTop: 25,
		marginBottom: 50,
		paddingLeft: 20,
		paddingRight: 20,
		borderRadius: 10,
		backgroundColor: '#fe5b61',
		alignSelf: 'center'
	}
})

const mapState = (state) => {
	return {
		orders: state.orders
	}
}

const mapDispatch = (dispatch) => {
	return {
		confirmBookStay: (location, dates) => {
			const thunk = createOrder(location, dates)
			dispatch(thunk)
		}
	}
}

export default connect(mapState, mapDispatch)(BuyScreen)
