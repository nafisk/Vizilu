import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const ShopScreen = () => {
  return (
    <View style={styles.center}>
      <Text style={styles.text}>Shop</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  text: {
    fontSize: 24,
  },
});

export default ShopScreen;
