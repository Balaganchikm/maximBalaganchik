import React, { useState, useContext } from 'react';
import { View, Text, Button, StyleSheet, TouchableOpacity } from 'react-native';
import {  useTheme } from '../ThemeContext'; 


const AppContent = () => {
    const { isDarkMode } = useTheme();
    const [ count, setCount ] = useState(0); 

   
    const increment = () => {
        setCount(count + 1);
    };

    
    const themeStyles = isDarkMode ? styles.dark : styles.light;

    return (
        <View style={[styles.container, themeStyles]}>
            <Text style={[styles.text, {color: isDarkMode ? '#fff': '#000'}]}>Счетчик: {count}</Text>
            <TouchableOpacity style={styles.button} onPress={increment} >
                <Text style={styles.buttonText}>Увеличить</Text>
            </TouchableOpacity>
        </View>
    );
};


const App = () => {
    return (
        
            <AppContent />
        
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    light: {
        backgroundColor: '#f5fcff', 
    },
    dark: {
        backgroundColor: '#333', 
    },
    text: {
        fontSize: 20,
        marginBottom: 20,
    },
    button: {
        backgroundColor: '#ccaa40',
        color: 'white',
        paddingVertical: 10,
        paddingHorizontal: 20,
        elevation: 3,
    },
    buttonText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "600",
    },
});

export default App;