import React from 'react';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import Lab1 from "./screens/use-state";
import Lab2 from "./screens/use-effect";
import Lab3 from "./screens/use-memo";
import { View, Text, Button, StyleSheet, useColorScheme, TouchableOpacity } from 'react-native';
import { ThemeProvider, useTheme } from './ThemeContext';

const Tab = createBottomTabNavigator();

function AppContent() {
    const { isDarkMode, toggleTheme } = useTheme();

    const themeStyles = isDarkMode ? styles.dark : styles.light;

    return (
        <NavigationContainer>
            <Tab.Navigator>
                <Tab.Screen name="Lab1" component={Lab1} />
                <Tab.Screen name="Lab2" component={Lab2} />
                <Tab.Screen name="Lab3" component={Lab3} />
            </Tab.Navigator>
            <View>
                <TouchableOpacity style={styles.button} onPress={toggleTheme} >
                    <Text style={styles.buttonText}>Toggle Theme</Text>
                </TouchableOpacity>
            </View>
        </NavigationContainer>
    );
}

export default function App() {
    return (
        <ThemeProvider>
            <AppContent />
        </ThemeProvider>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    button: {
        backgroundColor: '#ccaa40',
        color: 'white',
        paddingVertical: 10,
        paddingHorizontal: 20,
        elevation: 3,
    },
    light: {
        backgroundColor: 'white',
        color: 'black',
    },
    dark: {
        backgroundColor: '#333',
        color: 'white',
    },
    text: {
        fontSize: 18,
        marginBottom: 20,
        left: '33%'
    },
    buttonText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "600",
        left: '37%'
    },
});