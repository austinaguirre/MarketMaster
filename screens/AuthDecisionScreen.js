// AuthDecisionScreen.js
import React from 'react';
import { View, Button } from 'react-native';
import { GlobalStyles } from '../styles/GlobalStyles';

function AuthDecisionScreen({ navigation }) {
  return (
    <View style={GlobalStyles.container}>
      <Button color={GlobalStyles.button.backgroundColor} title="Sign In" onPress={() => navigation.navigate('SignIn')} />
      <Button color={GlobalStyles.button.backgroundColor} title="Sign Up" onPress={() => navigation.navigate('SignUp')} />
    </View>
  );
}

export default AuthDecisionScreen;
