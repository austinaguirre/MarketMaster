// AuthLoadingScreen.js
import React from 'react';
import { View, ActivityIndicator, Text } from 'react-native';
import { GlobalStyles } from '../styles/GlobalStyles';

function AuthLoadingScreen() {
  return (
    <View style={GlobalStyles.container}>
      <ActivityIndicator size="large" />
      <Text style={GlobalStyles.text}>Checking authentication...</Text>
    </View>
  );
}

export default AuthLoadingScreen;
