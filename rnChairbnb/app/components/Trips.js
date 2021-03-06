import React, { Component } from 'react'
import { View, Text, StyleSheet, ScrollView } from 'react-native'
import { fetchOrders } from '../reducers'
import { connect } from 'react-redux'
import store from '../store'

import OrderCard from './OrderCard'

class Trips extends Component {

	constructor(props) {
		super(props)
		this.state = { }
	}
	componentWillMount() {
		const thunk = fetchOrders({id: 1})
		store.dispatch(thunk)
	}
	componentWillReceiveProps() {
	}

	render() {
		let items = this.props.orders.map(order => (<OrderCard key={order.id} order={order} location ={order.location} navigation={this.props.navigation}/>))

		return (
			<ScrollView contentContainerStyle={styles.container}>
				{
					items
				}
			</ScrollView>
		)
	}
}

const mapState = (state) => {
	return {
		orders: state.orders
	}
}
export default connect(mapState)(Trips)

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
	}
})
