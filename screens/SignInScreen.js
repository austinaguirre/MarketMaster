import React, { useState, useContext } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { API_URL } from '@env';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import authStorage from '../authStorage';
import AuthContext from '../AuthContext';
import { GlobalStyles } from '../styles/GlobalStyles';

const SignInScreen = () => {
  const { authenticate } = useContext(AuthContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation();

  const signInUser = async () => {
    try {
      const response = await axios.post(`${API_URL}/users/signin`, {
        email,
        password
      });
      const { token, refreshToken } = response.data;

      await authStorage.clearTokens()
      // Store the tokens
      await authStorage.setToken(token);
      await authStorage.setRefreshToken(refreshToken);

      // Update authentication state
      authenticate(true);

      // Reset navigation to Home Screen
      navigation.reset({
        index: 0,
        routes: [{ name: 'Home' }],
      });
    } catch (error) {
      console.error(error);
      Alert.alert("Sign In Failed", "Incorrect username or password.");
    }
  };

  return (
    <View style={GlobalStyles.container}>
      <Text style={GlobalStyles.text}> Sign In Screen</Text>
      <TextInput
        style={GlobalStyles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        style={GlobalStyles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry={true}
        autoCapitalize="none"
      />
      <Button color={GlobalStyles.button.backgroundColor} title="Sign In" onPress={signInUser} />
    </View>
  );
};

export default SignInScreen;
