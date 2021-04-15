import React from 'react'
import { useRoute } from '@react-navigation/native'
import { Appbar } from 'react-native-paper';

const AppBar = (props) => {
  const { navigation, title } = props
  const route = useRoute();
  
  const _openNav = () => navigation.toggleDrawer()
  const _goBack = () => navigation.goBack()
  //const MORE_ICON = Platform.OS === 'ios' ? 'dots-horizontal' : 'dots-vertical';

  return (
    <Appbar.Header>
      <Appbar.BackAction onPress={_goBack} disabled={navigation.canGoBack() ? false : true} />
      <Appbar.Content title={!!title ? title : route.name} subtitle="Mobile Flashcards" />
      {/* <Appbar.Action icon={MORE_ICON} onPress={() => {}} /> */}
      <Appbar.Action icon="menu" onPress={_openNav} />
    </Appbar.Header>
  )
}

export default AppBar