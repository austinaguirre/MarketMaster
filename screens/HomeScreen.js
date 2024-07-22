// HomeScreen.js
import React from 'react';
import { View, Text, Button } from 'react-native';
import { GlobalStyles } from '../styles/GlobalStyles';

function HomeScreen() {
  return (
    <View style={GlobalStyles.container}>
      <Text style={GlobalStyles.text}>Home Screen</Text>
    </View>
  );
}

export default HomeScreen;
