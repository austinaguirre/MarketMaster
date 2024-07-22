// authStorage.js
import AsyncStorage from '@react-native-async-storage/async-storage';

const tokenKey = 'userToken';
const refreshTokenKey = 'refreshToken';

const setToken = async (token) => {
  await AsyncStorage.setItem(tokenKey, token);
};

const getToken = async () => {
  return await AsyncStorage.getItem(tokenKey);
};

const setRefreshToken = async (refreshToken) => {
  await AsyncStorage.setItem(refreshTokenKey, refreshToken);
};

const getRefreshToken = async () => {
  return await AsyncStorage.getItem(refreshTokenKey);
};

const clearTokens = async () => {
  await AsyncStorage.removeItem(tokenKey);
  await AsyncStorage.removeItem(refreshTokenKey);
};

export default {
  setToken,
  getToken,
  setRefreshToken,
  getRefreshToken,
  clearTokens
};
