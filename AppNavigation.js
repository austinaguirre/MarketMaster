// AppNavigation.js
import React, { useContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AuthLoadingScreen from './screens/AuthLoadingScreen';
import HomeScreen from './screens/HomeScreen';
import AuthDecisionScreen from './screens/AuthDecisionScreen';
import SignInScreen from './screens/SignInScreen';
import SignUpScreen from './screens/SignUpScreen';
import AuthContext from './AuthContext';
import SignOutButton from './components/SignOutButton';

const Stack = createNativeStackNavigator();

const AppNavigation = () => {
    const { isAuthenticated } = useContext(AuthContext);

    return (
        <NavigationContainer>
            <Stack.Navigator>
                {isAuthenticated === null ? (
                    <Stack.Screen name="AuthLoading" component={AuthLoadingScreen} options={{ headerShown: false }} />
                ) : isAuthenticated ? (
                    <Stack.Screen name="Home" component={HomeScreen} options={{
                        headerRight: () => (
                            <SignOutButton />
                        )
                    }} />
                ) : (
                    <Stack.Screen name="AuthDecision" component={AuthDecisionScreen} options={{ headerShown: false }} />
                )}
                <Stack.Screen name="SignIn" component={SignInScreen} />
                <Stack.Screen name="SignUp" component={SignUpScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default AppNavigation;
