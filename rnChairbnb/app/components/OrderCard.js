import React, { Component } from 'react'
import { StyleSheet, TouchableHighlight, Text, View, Image } from 'react-native'

class OrderCard extends Component {

	constructor(props) {
		super(props)
		this.state = {

		}
	}

	_onView() {
		this.props.navigation
			.navigate('TripDetails', { order: this.props.order })
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
							<View style={styles.isActive}>
								<Text style={{textAlign: 'center'}}>{ this.props.order.is_active ? 'Active' : 'Closed' }</Text>
							</View>
							<TouchableHighlight
								style={styles.edit}
								onPress={() => this._onView()}
							>
								<Text style={{textAlign: 'center'}}>View</Text>
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

export default OrderCard

const styles = StyleSheet.create({
	card: {
		flex: .25,
		justifyContent: 'center',
		backgroundColor: 'green',
		borderRadius: 5,
		borderWidth: .15,
		marginTop: 10,
		marginBottom: 10,
		marginRight: 5,
		marginLeft: 5,
	},
	toasts: {
		flex: 1,
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
	},
	isActive: {
		backgroundColor: '#fe5b61',
		opacity: 1,
		flex:1,
		justifyContent: 'center',
		paddingTop: 5,
		paddingBottom: 5,
		paddingRight: 10,
		paddingLeft: 10,
		borderRadius: 15,
		marginLeft: 20,
		marginRight: 80,
	},
	edit: {
		backgroundColor: 'transparent',
		flex:1,
		justifyContent: 'center',
		paddingTop: 7,
		paddingBottom: 7,
		paddingRight: 20,
		paddingLeft: 20,
		borderRadius: 20,
		borderColor: '#fe5b61',
		borderWidth: 5,
		marginRight: 20,
		marginLeft: 80,
	},
	title: {
		flex:1 ,
		fontFamily: 'Avenir-Medium',
		fontSize: 35,
		fontWeight: 'bold',
		textAlign: 'center',
		alignSelf: 'center',
		paddingBottom: 20,
	}
})
