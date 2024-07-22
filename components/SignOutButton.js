// Example of a SignOut button component or function
import React, { useContext } from 'react';
import { Button } from 'react-native';
import authStorage from '../authStorage';
import AuthContext from '../AuthContext';
import { useNavigation } from '@react-navigation/native';

const SignOutButton = () => {
    const { authenticate } = useContext(AuthContext);
    const navigation = useNavigation();

    const handleSignOut = async () => {
        await authStorage.clearTokens(); // Clear the stored tokens
        authenticate(false); // Update authentication state to false
        navigation.navigate('AuthDecision');
    };

    return <Button title="Sign Out" onPress={handleSignOut} />;
};

export default SignOutButton;
