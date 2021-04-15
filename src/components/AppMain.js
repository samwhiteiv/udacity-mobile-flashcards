import * as React from 'react';
import { useEffect } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { connect } from 'react-redux'
import { handleInitialData } from '../store/actions'
import AppBar from './AppBar'

const AppMain = (props) => {
  const { initilizeData, children, navigation, title } = props

  useEffect(() => {
    initilizeData()
  }, [])

  return (
    <>
      <AppBar navigation={navigation} title={title} />
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center', width: '100%'}}>
        {children}
      </View> 
    </>
  )
}

function mapDispatchToProps(dispatch) {
  return {
    initilizeData: () => {
      dispatch(handleInitialData());
    }
  };
}

export default connect(null, mapDispatchToProps)(AppMain)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
