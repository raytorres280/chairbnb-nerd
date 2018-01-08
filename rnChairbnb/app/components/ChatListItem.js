import React from 'react'
import { Text, TouchableHighlight, StyleSheet, Image, View } from 'react-native'
class ChatListitem extends React.Component {
	constructor(props) {
		super(props)
		this.state = {

		}
	}

	componentWillReceiveProps(newProps) {
		console.log('a chat received new props')
	}

	handlePress() {
		this.props.navigate('Chat', { messages: this.props.messages, chatKey: this.props.chatKey })
	}

	render() {
		return (
			<TouchableHighlight underlayColor="black" activeOpacity={0.9} style={styles.container} onPress={() => this.handlePress()}>
				<View style={styles.item}>
					<Image
						style={styles.thumbnail}
						source={{uri: 'https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png'}}
					/>
					<Text style={styles.text}>
						Item
					</Text>
				</View>
			</TouchableHighlight>
		)
	}
}

export default ChatListitem

const styles = StyleSheet.create({
	container: {
		height: 150,
		width: '100%',
		justifyContent: 'center',
		borderWidth: 0.5,
		borderRadius: 1,

	},
	item: {
		flex: 1,
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		backgroundColor: '#fdfdfd',
	},
	text: {
		marginRight: 50,
	},
	thumbnail: {
		marginLeft: 10,
		height: 48,
		width: 48,
		borderRadius: 25
	}
})
