import React from 'react';
import {
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import mockData from '../../mock/product';

const { width } = Dimensions.get('window');

const ShopScreen = () => {
  const { images, videos, name, description, price } = mockData;

  const handleBuyNow = () => {
    // Handle the buy now action
    console.log('Buy Now clicked');
  };

  return (
    <ScrollView style={styles.container}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {images.map((image, index) => (
          <View key={index} style={styles.imageContainer}>
            <Image
              source={image.url}
              style={styles.image}
              resizeMode='contain'
            />
          </View>
        ))}
      </ScrollView>
      <Text style={styles.title}>{name}</Text>
      <Text style={styles.description}>{description}</Text>
      <Text style={styles.price}>${price}</Text>

      {/* Buy Now Button */}
      <TouchableOpacity style={styles.buyButton} onPress={handleBuyNow}>
        <Text style={styles.buyButtonText}>Buy Now</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    marginBottom: 10,
  },
  price: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  imageContainer: {
    width: width - 20,
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  image: {
    width: width,
    height: 200,
  },
  videoContainer: {
    width: width - 20,
    height: 200,
    marginRight: 10,
    alignItems: 'center',
  },
  video: {
    width: '100%',
    height: '100%',
  },
  buyButton: {
    backgroundColor: '#007bff', // Example color
    padding: 15,
    borderRadius: 5,
    marginTop: 20,
    alignItems: 'center',
  },
  buyButtonText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default ShopScreen;
