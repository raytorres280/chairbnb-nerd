import React, { Component } from 'react'
import { GiftedChat } from 'react-native-gifted-chat'
import { connect } from 'react-redux'
import { fetchMessages } from '../reducers'
import store from '../store'

class Inbox extends Component {

	constructor(props) {
		super(props)
		this.state = {

		}
	}

	componentWillMount() {
		const thunk = fetchMessages({id: 1})
		store.dispatch(thunk)
	}

	onSend(messages = []) {
		this.setState((previousState) => ({
			messages: GiftedChat.append(previousState.messages, messages),
		}))
	}

	render() {
		return (
			<GiftedChat
				messages={this.props.messages}
				onSend={(messages) => this.onSend(messages)}
				user={{
					_id: 1,
				}}
				isAnimated={true}
			/>
		)
	}

}

const mapState = (state) => {
	return {
		messages: state.inbox
	}
}
export default connect(mapState)(Inbox)
