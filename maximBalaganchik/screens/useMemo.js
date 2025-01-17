import React, { useEffect, useState, useMemo, useCallback } from "react";
import { View, Text, ActivityIndicator, FlatList, StyleSheet, TouchableOpacity } from "react-native";
import { useTheme } from '../ThemeContext'; 

const Lab3 = () => {
    const { isDarkMode } = useTheme(); 
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [useMemoEnabled, setUseMemoEnabled] = useState(true);
    const [timerEnabled, setTimerEnabled] = useState(true);
    const [fetchTime, setFetchTime] = useState(null);
    const [memoTime, setMemoTime] = useState(null);

    const fetchData = useCallback(async () => {
        setLoading(true);
        const startTime = timerEnabled ? performance.now() : null;

        try {
            const response = await fetch("https://api.coindesk.com/v1/bpi/currentprice.json");
            if (!response.ok) {
                throw new Error(`Network response was not ok, status: ${response.status}`);
            }
            const result = await response.json();
            setData(result);
            setError(null);
            if (timerEnabled && startTime) {
                const endTime = performance.now();
                setFetchTime(endTime - startTime);
            }
        } catch (err) {
            setError(err);
            setData(null);
            setFetchTime(null);
        } finally {
            setLoading(false);
        }
    }, [timerEnabled]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    const processedData = useMemo(() => {
        const startTime = timerEnabled ? performance.now() : null;
        let result;
        if (!data || !useMemoEnabled) {
            let processed = data ? { updated: data?.time?.updated, rates: data?.bpi } : null
            if (processed) {
                for (let i = 0; i < 10000; i++) {
                    let _ = Math.random();
                }
            }
            result = processed;
        } else {
            result = { updated: data.time?.updated, rates: data.bpi };
        }
        if (timerEnabled && startTime) {
            const endTime = performance.now();
            setMemoTime(endTime - startTime);
        }
        return result;
    }, [data, useMemoEnabled, timerEnabled]);

    const toggleUseMemo = () => {
        setUseMemoEnabled(!useMemoEnabled);
    };
    const toggleTimer = () => {
        setTimerEnabled(!timerEnabled);
    };

    const themeStyles = isDarkMode ? styles.dark : styles.light; 

    if (loading)
        return (
            <View style={[styles.loaderContainer, themeStyles]}>
                <ActivityIndicator size="large" color="#00ff00" />
            </View>
        );
    if (error)
        return (
            <View style={[styles.errorContainer, themeStyles]}>
                <Text style={[styles.errorText, { color: isDarkMode ? '#fff' : '#000' }]}>Error: {error?.message}</Text>
            </View>
        );

    if (!processedData) {
        return (
            <View style={[styles.container, themeStyles]}>
                <Text style={[styles.title, { color: isDarkMode ? '#fff' : '#000' }]}>Lab 3</Text>
                <Text style={[styles.subtitle, { color: isDarkMode ? '#fff' : '#000' }]}>Loading data...</Text>
            </View>
        );
    }

    return (
        <View style={[styles.container, themeStyles]}>
            <Text style={[styles.title, { color: isDarkMode ? '#fff' : '#000' }]}>Lab 3</Text>
            <Text style={[styles.subtitle, { color: isDarkMode ? '#fff' : '#000' }]}>Current Bitcoin Prices</Text>
            <Text style={[styles.updatedText, { color: isDarkMode ? '#fff' : '#000' }]}>Last updated: {processedData?.updated}</Text>
            {timerEnabled && (
                <Text style={[styles.timerText, { color: isDarkMode ? '#fff' : '#000' }]}>
                    Fetch Time: {fetchTime !== null ? `${fetchTime.toFixed(2)} ms` : 'Loading...'}
                </Text>
            )}
            {timerEnabled && (
                <Text style={[styles.timerText, { color: isDarkMode ? '#fff' : '#000' }]}>
                    Memo Time (UseMemo {useMemoEnabled ? "On" : "Off"}): {memoTime !== null ? `${memoTime.toFixed(2)} ms` : 'Loading...'}
                </Text>
            )}
            <View style={styles.buttonsContainer}>
                <TouchableOpacity style={styles.button} onPress={fetchData}>
                    <Text style={styles.buttonText}>Обновить</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={toggleUseMemo}>
                    <Text style={styles.buttonText}>
                        {useMemoEnabled ? "Выключить useMemo" : "Включить useMemo"}
                    </Text>
                </TouchableOpacity>
            </View>
            <FlatList
                data={Object.entries(processedData.rates)}
                keyExtractor={([currency]) => currency}
                renderItem={({ item }) => {
                    const [currency, info] = item;
                    return (
                        <View style={[styles.rateContainer, themeStyles]}>
                            <Text style={[styles.rateText, { color: isDarkMode ? '#fff' : '#000' }]}>
                                {info.code}: {info.rate}
                            </Text>
                        </View>
                    );
                }}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    loaderContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#f5f5f5",
    },
    errorContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 20,
        backgroundColor: "#ffe6e6",
    },
    errorText: {
        fontSize: 18,
        color: "#d9534f",
        textAlign: "center",
    },
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: "#f9f9f9",
    },
    title: {
        fontSize: 32,
        fontWeight: "bold",
        color: "#333",
        textAlign: "center",
        marginBottom: 10,
    },
    subtitle: {
        fontSize: 18,
        color: "#666",
        textAlign: "center",
        marginBottom: 20,
    },
    updatedText: {
        fontSize: 16,
        color: "#333",
        textAlign: "center",
        marginBottom: 10,
    },
    rateContainer: {
        padding: 15,
        backgroundColor: "#ffffff",
        borderRadius: 10,
        marginVertical: 8,
        shadowColor: "#000",
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 3,
        alignSelf: "stretch",
        borderColor: "#e0e0e0",
        borderWidth: 1,
    },
    rateText: {
        fontSize: 16,
        color: "#333",
        textAlign: "center",
        fontWeight: "500",
    },
    buttonsContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 20,
    },
    button: {
        backgroundColor: '#ccaa40',
        flex: 1,
        paddingVertical: 15,
        marginHorizontal: 5,
        borderRadius: 8,
        alignItems: "center",
        justifyContent: "center",
        shadowColor: "#000",
        shadowOpacity: 0.2,
        shadowRadius: 5,
        elevation: 3,
    },
    buttonText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "600",
    },
    timerText: {
        fontSize: 14,
        color: "#555",
        textAlign: "center",
        marginBottom: 5,
    },
    light: {
        backgroundColor: "#f9f9f9",
        color: "#000",
    },
    dark: {
        backgroundColor: "#333",
        color: "#fff",
    },
});

export default Lab3;