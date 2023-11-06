import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const HomeScreen = () => {
  return (
    <View style={styles.center}>
      <Text style={styles.text}>Featured Frames</Text>
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

export default HomeScreen;
