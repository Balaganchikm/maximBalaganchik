import React, { useState, useEffect } from "react";
import { View, Text, ActivityIndicator, FlatList, StyleSheet } from "react-native";
import { useTheme } from '../ThemeContext'; // Import ThemeContext

const FetchDataExample = () => {
    const { isDarkMode } = useTheme(); // Use the theme context to get current theme
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const response = await fetch("https://jsonplaceholder.typicode.com/posts");
                if (!response.ok) {
                    throw new Error(`Ошибка: ${response.status}`);
                }
                const result = await response.json();
                setData(result);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const themeStyles = isDarkMode ? styles.dark : styles.light;

    if (loading) {
        return (
            <View style={[styles.centered, themeStyles]}>
                <ActivityIndicator size="large" color="#0000ff" />
                <Text style={[styles.text, { color: isDarkMode ? '#fff' : '#000' }]}>Загрузка данных...</Text>
            </View>
        );
    }

    if (error) {
        return (
            <View style={[styles.centered, themeStyles]}>
                <Text style={[styles.errorText, { color: isDarkMode ? '#fff' : '#000' }]}>Ошибка: {error}</Text>
            </View>
        );
    }

    return (
        <View style={[styles.container, themeStyles]}>
            <Text style={[styles.title, { color: isDarkMode ? '#fff' : '#000' }]}>Список данных:</Text>
            <FlatList
                data={data}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <View style={[styles.item, themeStyles]}>
                        <Text style={[styles.itemTitle, { color: isDarkMode ? '#fff' : '#000' }]}>{item.title}</Text>
                        <Text style={[styles.itemBody, { color: isDarkMode ? '#fff' : '#000' }]}>{item.body}</Text>
                    </View>
                )}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
    },
    centered: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    title: {
        fontSize: 20,
        fontWeight: "bold",
        marginBottom: 16,
    },
    item: {
        padding: 16,
        marginVertical: 8,
        backgroundColor: "#ffffff",
        borderRadius: 8,
        shadowColor: "#000",
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
    },
    itemTitle: {
        fontSize: 16,
        fontWeight: "bold",
    },
    itemBody: {
        fontSize: 14,
        color: "#666",
    },
    errorText: {
        color: "red",
        fontSize: 16,
    },
    light: {
        backgroundColor: "#f5f5f5", 
        color: "#000", 
    },
    dark: {
        backgroundColor: "#333", 
        color: "#fff", 
    },
    text: {
        fontSize: 16,
    },
});

export default FetchDataExample;