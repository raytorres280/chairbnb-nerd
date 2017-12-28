import React, { Component } from 'react'
import { connect } from 'react-redux'
import { View, Text, TabBarIOS, SafeAreaView, StyleSheet } from 'react-native'
import { Main } from './Main'
//TODO: LOGIN screen CONDITIONAL comp
export default class Root extends Component {
  render() {
    return(
      <View style={styles.container}>
        {/* login screen if store state does not have active user */}
        <Main />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex:1,

  }
})
