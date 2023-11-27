import { useStripe } from '@stripe/stripe-react-native';
import React, { useState } from 'react';
import {
  Alert,
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import mockData from '../../mock/product';
import { PAYMENT_ENDPOINT } from '../../utils/constants';

const { width } = Dimensions.get('window');

const ShopScreen = () => {
  const { images, name, description, price } = mockData;
  const { initPaymentSheet, presentPaymentSheet } = useStripe();
  const [loading, setLoading] = useState(false);
  const [paymentIntentClientSecret, setPaymentIntentClientSecret] =
    useState(null);

  const fetchPaymentSheetParams = async () => {
    try {
      const response = await fetch(PAYMENT_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount: price * 100, // Assuming price is in dollars, Stripe requires amount in cents
        }),
      });

      const { clientSecret } = await response.json();
      console.log('Payment Sheet Params:', clientSecret); // Log the client secret
      return clientSecret;
    } catch (error) {
      console.error('Error fetching payment sheet params:', error);
      Alert.alert('Error', 'Failed to fetch payment sheet parameters');
    }
  };

  const initializePaymentSheet = async () => {
    setLoading(true);
    const clientSecret = await fetchPaymentSheetParams();

    if (!clientSecret) {
      Alert.alert('Error', 'Payment Intent Client Secret is not available');
      setLoading(false);
      return;
    }

    setPaymentIntentClientSecret(clientSecret);

    const { error } = await initPaymentSheet({
      paymentIntentClientSecret: clientSecret,
    });

    if (!error) {
      setLoading(false);
    } else {
      console.error('Error initializing payment sheet:', error);
      Alert.alert('Error', 'Unable to initialize payment sheet');
      setLoading(false);
    }
  };

  const handleBuyNow = async () => {
    console.log('Buy Now clicked');
    await initializePaymentSheet();

    if (paymentIntentClientSecret) {
      const { error } = await presentPaymentSheet({
        clientSecret: paymentIntentClientSecret,
      });

      if (error) {
        console.error(`Error code: ${error.code}`, error.message);
        Alert.alert('Payment Failed', error.message);
      } else {
        console.log('Success');
        Alert.alert('Payment Successful', 'Your payment was successful!');
        // Handle successful payment here
      }
    } else {
      Alert.alert('Error', 'Payment Intent Client Secret is not available');
    }
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
      <TouchableOpacity
        style={styles.buyButton}
        onPress={handleBuyNow}
        disabled={loading}
      >
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
  buyButton: {
    backgroundColor: '#007bff',
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
