
import React from 'react'
import Application from './src/navigation/Application'
import { AlertNotificationRoot } from 'react-native-alert-notification'

const App = () => {
  return (
    <AlertNotificationRoot>
      <Application/>
    </AlertNotificationRoot>
  )
}

export default App
