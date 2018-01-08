import React, { Component } from 'react'
import { GiftedChat } from 'react-native-gifted-chat'
import { connect } from 'react-redux'
import { fetchMessages, createMessage } from '../reducers'
import store from '../store'
import { formatMessages } from '../helpers'
class Chat extends Component {

	constructor(props) {
		super(props)
		this.state = {

		}
	}

	componentWillMount() {
		console.log('mounting messages')
	}

	componentWillReceiveProps(newProps) {
		console.log('got new props on inbox update..')
	}

	onSend(messages = []) {

		let message = {
			text: messages[0].text,
			sent_from: 'user', //change later to activeUser.profileType
			hostId: this.props.navigation.state.params.messages[0].hostId,
			userId: this.props.navigation.state.params.messages[0].userId,
			createdAt: messages[0].created
		}
		const thunk = createMessage(message)
		store.dispatch(thunk)
	}

	render() {
		return (
			<GiftedChat
				messages={formatMessages(this.props.navigation.state.params.messages)}
				onSend={(messages) => this.onSend(messages)}
				user={{
					_id: 1,
				}}
				isAnimated={true}
			/>
		)
	}

}

export default Chat
