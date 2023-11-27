import { useStripe } from '@stripe/stripe-react-native';
import React, { useLayoutEffect, useState } from 'react';
import {
  Alert,
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  SafeAreaView,
} from 'react-native';
import { CognitoUserPool } from 'amazon-cognito-identity-js';
import userPoolConfig from '../../cognitoConfig';
import logo from '../../assets/app/logo.webp';

import mockData from '../../mock/product';
import { PAYMENT_ENDPOINT } from '../../utils/constants';

const { width } = Dimensions.get('window');

const ShopScreen = ({ navigation }) => {
  const { images, name, description, price, additionalInfo } = mockData;
  const itemDetails = additionalInfo.itemDetails;

  const { initPaymentSheet, presentPaymentSheet } = useStripe();
  const [loading, setLoading] = useState(false);
  const [paymentIntentClientSecret, setPaymentIntentClientSecret] =
    useState(null);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: () => (
        <View style={styles.headerContainer}>
          <Image source={logo} style={styles.logo} resizeMode='contain' />
          <Text style={styles.headerTitle}>Shop</Text>
        </View>
      ),
    });
  }, [navigation]);

  const fetchPaymentSheetParams = async () => {
    const userInfo = await getCurrentUserInfo(); // Get user info
    console.log('User Info:', userInfo);
    try {
      const response = await fetch(PAYMENT_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount: price * 100, // Assuming price is in dollars, Stripe requires amount in cents
          user: userInfo,
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
      // Alert.alert('Error', 'Payment Intent Client Secret is not available');
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
      }
    } else {
      Alert.alert('Error', 'Payment Intent Client Secret is not available');
    }
  };

  const getCurrentUserInfo = () => {
    const userPool = new CognitoUserPool(userPoolConfig);
    const currentUser = userPool.getCurrentUser();

    if (currentUser != null) {
      return new Promise((resolve, reject) => {
        currentUser.getSession((err, session) => {
          if (err) {
            reject(err);
            return;
          }
          currentUser.getUserAttributes((err, attributes) => {
            if (err) {
              reject(err);
              return;
            }
            const userInfo = attributes.reduce((acc, attribute) => {
              acc[attribute.getName()] = attribute.getValue();
              return acc;
            }, {});
            resolve(userInfo);
          });
        });
      });
    } else {
      return Promise.reject('No current user');
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
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

        {/* Item Details */}
        <View style={styles.itemDetails}>
          <Text style={styles.detailsTitle}>Item Details:</Text>
          <Text style={styles.detailsText}>
            Dimensions:{' '}
            {`${itemDetails.dimensions.width} x ${itemDetails.dimensions.height} x ${itemDetails.dimensions.depth} inches`}
          </Text>
          <Text style={styles.detailsText}>{itemDetails.description}</Text>

          <Text style={styles.detailsTitle}>Key Features:</Text>
          {itemDetails.keyFeatures.map((feature, index) => (
            <Text key={index} style={styles.detailsText}>
              - {feature}
            </Text>
          ))}
          <Text style={styles.detailsTitle}>Installation:</Text>
          <Text style={styles.detailsText}>{itemDetails.installation}</Text>

          <Text style={styles.detailsTitle}>Gift Idea:</Text>

          <Text style={styles.detailsText}>{itemDetails.giftIdea}</Text>
        </View>
      </ScrollView>

      {/* Buy Now Button */}
      <TouchableOpacity
        style={styles.buyButton}
        onPress={handleBuyNow}
        disabled={loading}
      >
        <Text style={styles.buyButtonText}>Buy Now</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
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
  itemDetails: {
    marginVertical: 10,
  },
  detailsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom: 5,
  },
  detailsText: {
    fontSize: 16,
    marginBottom: 10,
  },
  buyButton: {
    backgroundColor: '#007bff',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  buyButtonText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logo: {
    width: 40, // Adjust the size as needed
    marginRight: 10,
  },
  headerTitle: {
    fontSize: 18,
  },
});

export default ShopScreen;
