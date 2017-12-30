import React, { Component } from 'react'
import { connect } from 'react-redux'
import { TabBarIOS, Text, View, StyleSheet } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'
import { StackNavigator, TabNavigator } from 'react-navigation'

import store from '../store'
import Explore from './Explore'
import Saved from './Saved'
import Trips from './Trips'
import Inbox from './Inbox'
import Profile from './Profile'
import LocationDetails from './LocationDetails'
import Settings from './Settings'
import CalendarBooking from './CalendarBooking'
import BuyScreen from './BuyScreen'
//TODO: LOGIN screen CONDITIONAL comp

export const ExploreStack = StackNavigator({
	Explore: {
		screen: Explore,
		navigationOptions: {
			title: '',
			headerStyle: {
				height: 0,
			}
		},
	},
	Details: {
		screen: LocationDetails,
		navigationOptions: {
			tabBarVisible: false,
			headerStyle: {
				height: 25,
			}
		}
	},
	Booking: {
		screen: CalendarBooking,
		navigationOptions: () => ({
			title: 'Select your days',
			mode: 'modal',
			tabBarVisible: false
		})
	}
}, {
	animationEnabled: false,
})

export const Tabs = TabNavigator({
	Explore: {
		screen: ExploreStack,
		navigationOptions: {
			tabBarLabel: 'Explossre',
			tabBarIcon: ({ tintColor }) => <Icon name="ios-search" size={35} color={tintColor} />,
		},
	},
	Saved: {
		screen: Saved,
		navigationOptions: {
			tabBarLabel: 'Saved',
			tabBarIcon: ({ tintColor }) => <Icon name="ios-heart-outline" size={35} color={tintColor} />
		},
	},
	Trips: {
		screen: Trips,
		navigationOptions: {
			tabBarLabel: 'Me',
			tabBarIcon: ({ tintColor }) => <Icon name="ios-jet-outline" size={35} color={tintColor} />
		},
	},
	Inbox: {
		screen: Inbox,
		navigationOptions: {
			tabBarLabel: 'Me',
			tabBarIcon: ({ tintColor }) => <Icon name="ios-chatbubbles-outline" size={35} color={tintColor} />
		},
	},
	Profile: {
		screen: Profile,
		navigationOptions: {
			tabBarLabel: 'Me',
			tabBarIcon: ({ tintColor }) => <Icon name="ios-person-outline" size={35} color={tintColor} />
		},
	}

}, {
	animationEnabled: false,
	tabBarOptions: {
		activeTintColor: '#fe5b61',
	},
})


export const Main = StackNavigator({
	Tabs: {
		screen: Tabs,
	},
	Settings: {
		screen: Settings,
	},
}, {
	mode: 'modal',
	headerMode: 'none',
})
