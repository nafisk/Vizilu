import * as ScreenOrientation from 'expo-screen-orientation';
import { Accelerometer } from 'expo-sensors';
import React, { useEffect, useState } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import frames from './components/frames';

export default function App() {
  const [frameIndex, setFrameIndex] = useState(Math.floor(frames.length / 2));
  const [mode, setMode] = useState('laid down');

  useEffect(() => {
    async function changeScreenOrientation() {
      await ScreenOrientation.lockAsync(
        ScreenOrientation.OrientationLock.LANDSCAPE_LEFT
      );
    }
    changeScreenOrientation();

    UPDATE_INTERVAL = 0;
    Accelerometer.setUpdateInterval(UPDATE_INTERVAL);
    const subscription = Accelerometer.addListener(accelerometerData => {
      const { x, y } = accelerometerData;
      const tilt = mode === 'laid down' ? y : x * 2; // Increase sensitivity for upright position
      console.log(mode, '| x: ', x, '\t\ty: ', y);
      const newIndex = Math.round(((tilt + 1) * (frames.length - 1)) / 2);
      setFrameIndex(newIndex);
    });

    return () => {
      subscription && subscription.remove();
    };
  }, [mode]);

  const toggleMode = () => {
    setMode(prevMode => (prevMode === 'laid down' ? 'held up' : 'laid down'));
  };

  return (
    <View style={styles.container}>
      <Image
        source={frames[frameIndex]}
        style={styles.image}
        resizeMode='contain'
      />
      <View style={styles.buttonsContainer}>
        <TouchableOpacity style={styles.button} onPress={toggleMode}>
          <Text style={styles.buttonText}>Toggle Mode</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  image: {
    width: 500,
    height: 300,
  },
  buttonsContainer: {
    flexDirection: 'row',
    marginTop: 20,
  },
  button: {
    backgroundColor: '#007bff',
    padding: 10,
    borderRadius: 5,
    marginHorizontal: 10,
  },
  buttonText: {
    color: '#ffffff',
  },
});
