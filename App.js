import {NavigationContainer} from '@react-navigation/native';
import React from 'react'
import Router from './src/Navigation/Router';
import { navigationRef } from './src/Components/Utilities/Functions/NavigationUtil';

const App = () => {
  return (
    <NavigationContainer ref={navigationRef}>
    <Router />
  </NavigationContainer>
  )
}

export default App