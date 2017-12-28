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

//TODO: LOGIN screen CONDITIONAL comp

export const ExploreStack = StackNavigator({
  Explore: {
    screen: Explore,
    navigationOptions: {
      title: 'Explore',
    },
  },
  Details: {
    screen: LocationDetails,
    // navigationOptions: ({ navigation }) => ({
    //   title: `${navigation.state.params.name.first.toUpperCase()} ${navigation.state.params.name.last.toUpperCase()}`,
    // }),
  },
  Booking: {
    screen: CalendarBooking,

  }
})

export const Tabs = TabNavigator({
  Explore: {
    screen: ExploreStack,
    navigationOptions: {
      tabBarLabel: 'Explore',
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
