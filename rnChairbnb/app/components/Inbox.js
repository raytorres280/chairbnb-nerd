import React, { Component } from 'react'
import { ScrollView, StyleSheet, Text, RefreshControl } from 'react-native'
import { connect } from 'react-redux'
import { fetchMessages } from '../reducers'
import store from '../store'
import ChatListItem from './ChatListItem'

class Inbox extends Component {

	constructor(props) {
		super(props)
		this.state = {
			refreshing: false
		}
	}

	componentWillMount() {
		const thunk = fetchMessages({id: 1})
		store.dispatch(thunk)
	}

	componentWillReceiveProps(newProps) {
		// if(this.state.refreshing) {
		// 	this.setState({ refreshing: false })
		// }
	}

	shouldComponentUpdate(nextProps) {
		//force update in case props(store state) doesnt change
		//so that refresh indicator can update accordingly
		if(nextProps.chats !== this.props.chats || this.state.refreshing)
			return true
		else
			return false
	}
	componentWillUpdate(nextProps) {

		if(nextProps.chats === this.props.chats && this.state.refreshing) {
			this.setState({ refreshing: false })
		}
	}

	_onRefresh() {
		this.setState({ refreshing: true })
		const thunk = fetchMessages({id: 1})
		store.dispatch(thunk)
	}
	onSend(messages = []) {
		this.setState((previousState) => ({
			messages: GiftedChat.append(previousState.messages, messages),
		}))
	}

	render() {
		let chats = this.props.chats
			.map(chat => (
				<ChatListItem
					navigate={this.props.navigation.navigate.bind(this)}
					messages={chat}
					key={chat[0].hostId}
					chatKey={chat[0].hostId}
				/>)
			)
		return (
			<ScrollView
				contentContainerStyle={styles.container}
				refreshControl={
					<RefreshControl
						refreshing={this.state.refreshing}
						onRefresh={this._onRefresh.bind(this)}
					/>
				}>
				{
					chats
				}
				<ChatListItem
					navigate={this.props.navigation.navigate.bind(this)}
					key={10}
					messages={[]}
				/>
				<ChatListItem
					navigate={this.props.navigation.navigate.bind(this)}
					messages={[]}
					key={11}
				/>
			</ScrollView>
		)
	}

}

const mapState = (state) => {
	return {
		chats: state.inbox
	}
}
export default connect(mapState)(Inbox)

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: 'green',
		// marginTop: 20,
	}
})
