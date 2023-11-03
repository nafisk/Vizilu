import * as ScreenOrientation from 'expo-screen-orientation';
import { Accelerometer } from 'expo-sensors';
import React, { useEffect, useState } from 'react';
import { Image, StyleSheet, View } from 'react-native';
import frames from './components/frames';

export default function App() {
  const frameKeys = Object.keys(frames); // Get the keys of the frames hashmap
  const [frameIndex, setFrameIndex] = useState(
    frameKeys[Math.floor(frameKeys.length / 2)]
  );

  useEffect(() => {
    async function changeScreenOrientation() {
      await ScreenOrientation.lockAsync(
        ScreenOrientation.OrientationLock.LANDSCAPE_LEFT
      );
    }
    changeScreenOrientation();

    const UPDATE_INTERVAL = 5;

    Accelerometer.setUpdateInterval(UPDATE_INTERVAL);
    const subscription = Accelerometer.addListener(accelerometerData => {
      const { y } = accelerometerData;
      const newIndex =
        frameKeys[Math.round(((y + 1) * (frameKeys.length - 1)) / 2)];

      setFrameIndex(newIndex);
    });

    return () => {
      subscription && subscription.remove();
    };
  }, []);

  return (
    <View style={styles.container}>
      <Image
        source={frames[frameIndex]}
        style={styles.image}
        resizeMode='contain'
      />
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
});
