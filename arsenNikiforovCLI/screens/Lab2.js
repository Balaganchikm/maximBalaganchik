import React, { useState, useEffect, useContext } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  Dimensions,
  ActivityIndicator,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { ThemeContext } from '../ThemeContext';

const { width } = Dimensions.get('window');

const Lab2 = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const { colors } = useContext(ThemeContext);
  const [savedImages, setSavedImages] = useState([]);
  const [imageIndex, setImageIndex] = useState(0);

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        'https://api.nasa.gov/planetary/apod?api_key=ClspQNLxhvMh10IcVPSRUzwwQqwbcaoM4hiSKNQv'
      );
      const result = await response.json();
      setData(result);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [imageIndex]);

  const handleSavePicture = () => {
    if (data && !savedImages.includes(data.url)) {
      setSavedImages((prev) => [...prev, data.url]);
    }
  };

  const handleLoadNext = () => {
    setImageIndex((prev) => prev + 1);
  };

  return (
    <View style={[styles.container, { backgroundColor: '#000' }]}>
      <ScrollView contentContainerStyle={styles.content}>
        {loading ? (
          <ActivityIndicator size="large" color="#fff" />
        ) : (
          <>
            <TouchableOpacity
              style={[styles.button, styles.saveButton]}
              onPress={handleSavePicture}
            >
              <Text style={styles.buttonText}>Save Picture</Text>
            </TouchableOpacity>

            <Text style={styles.title}>{data.title}</Text>
            <Image source={{ uri: data.url }} style={styles.image} />
            <Text style={styles.description}>{data.explanation}</Text>

            <View style={styles.savedContainer}>
              <Text style={styles.savedText}>Saved Pictures:</Text>
              {savedImages.map((url, index) => (
                <Image key={index} source={{ uri: url }} style={styles.savedImage} />
              ))}
            </View>
          </>
        )}
      </ScrollView>

      <TouchableOpacity
        style={[styles.button, styles.loadButton]}
        onPress={handleLoadNext}
      >
        <Text style={styles.buttonText}>Load Next</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between', // Размещаем элементы по всему экрану
    paddingTop: 20,
  },
  content: {
    paddingHorizontal: 20,
    alignItems: 'center',
    paddingVertical: 20,
    flexGrow: 1, // Это заставляет ScrollView растягиваться
  },
  button: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginHorizontal: 10,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
  },
  saveButton: {
    backgroundColor: '#bbb',
    marginBottom: 20, // Отступ от других элементов
  },
  loadButton: {
    backgroundColor: '#bbb',
    marginBottom: 20, // Отступ от других элементов
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    lineHeight: 28,
    textAlign: 'center',
    marginBottom: 10,
    color: '#fff',
    fontFamily: 'Pixelify Sans, sans-serif',
  },
  image: {
    width: width - 40,
    height: 200,
    borderRadius: 10,
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    textAlign: 'center',
    color: '#fff',
    fontFamily: 'Pixelify Sans, sans-serif',
    marginBottom: 20,
  },
  savedContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  savedText: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 10,
    color: '#fff',
  },
  savedImage: {
    width: width - 60,
    height: 100,
    borderRadius: 10,
    marginBottom: 10,
  },
});

export default Lab2;
