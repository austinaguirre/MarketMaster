// GlobalStyles.js
import { StyleSheet } from 'react-native';

export const colors = {
    primary: '#4a148c',
    accent: '#ff6f00',
    background: '#f4f4f4'
};

export const GlobalStyles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
        backgroundColor: colors.background,
    },
    input: {
        width: '100%',
        margin: 10,
        padding: 10,
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 5,
    },
    text: {
        color: colors.primary,
    },
    button: {
        backgroundColor: colors.accent,
        padding: 10,
        borderRadius: 5,
    }
});
