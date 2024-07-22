//SignUpScree.js
import React, { useState, useContext } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { API_URL } from '@env';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import authStorage from '../authStorage';
import AuthContext from '../AuthContext';
import { GlobalStyles } from '../styles/GlobalStyles';

const SignUpScreen = () => {
  const { authenticate } = useContext(AuthContext);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation();

  const registerUser = async () => {
    try {
      const response = await axios.post(`${API_URL}/users/register`, {
        username,
        email,
        password
      });
      const { token, refreshToken } = response.data;

      await authStorage.clearTokens()
      // Store the tokens
      await authStorage.setToken(token);
      await authStorage.setRefreshToken(refreshToken);

      authenticate(true);

      setUsername('')
      setEmail('')
      setPassword('')

      // replace to the Home Screen
      // navigation.replace('Home');
      navigation.reset({
        index: 0,
        routes: [{ name: 'Home' }],
      });
    } catch (error) {
      console.error(error);
      Alert.alert("Registration Failed", "Unable to register user. Please try again.");
    }
  };

  return (
    // <View style={styles.container}>
    //   <Text>Sign Up Screen</Text>
    //   <TextInput
    //     style={styles.input}
    //     placeholder="Username"
    //     value={username}
    //     onChangeText={setUsername}
    //   />
    //   <TextInput
    //     style={styles.input}
    //     placeholder="Email"
    //     value={email}
    //     onChangeText={setEmail}
    //     keyboardType="email-address"
    //   />
    //   <TextInput
    //     style={styles.input}
    //     placeholder="Password"
    //     value={password}
    //     onChangeText={setPassword}
    //     secureTextEntry={true}
    //   />
    //   <Button title="Register" onPress={registerUser} />
    // </View>
    <View style={GlobalStyles.container}>
      <Text style={GlobalStyles.text}>Sign Up Screen</Text>
      <TextInput style={GlobalStyles.input} placeholder="Username" value={username} onChangeText={setUsername} />
      <TextInput style={GlobalStyles.input} placeholder="Email" value={email} onChangeText={setEmail} keyboardType="email-address" />
      <TextInput style={GlobalStyles.input} placeholder="Password" value={password} onChangeText={setPassword} secureTextEntry={true} />
      <Button title="Register" onPress={registerUser} color={GlobalStyles.button.backgroundColor} />
    </View>

  );
};

export default SignUpScreen;
