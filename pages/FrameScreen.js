import { Ionicons } from '@expo/vector-icons'; // Make sure you have @expo/vector-icons installed
import * as ScreenOrientation from 'expo-screen-orientation';
import { Accelerometer } from 'expo-sensors';
import { throttle } from 'lodash'; // Ensure lodash is installed
import React, { useEffect, useState } from 'react';
import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import frames from '../assets/Frames'; 

const { width, height } = Dimensions.get('window');
UPDATE_IN_MS = 30;

const FrameScreen = () => {
  const frameKeys = Object.keys(frames).sort();
  const middleIndex = Math.floor(frameKeys.length / 2);

  const [data, setData] = useState({ x: 0, y: 0, z: 0 });
  const [currentFrame, setCurrentFrame] = useState(
    frames[frameKeys[middleIndex]]
  );
  const [orientation, setOrientation] = useState(
    ScreenOrientation.Orientation.PORTRAIT_UP
  );
  const isPortrait = orientation === ScreenOrientation.Orientation.PORTRAIT_UP;

  // Preload images
  useEffect(() => {
    frameKeys.forEach(key => {
      Image.prefetch(frames[key]);
    });
  }, []);

  useEffect(() => {
    Accelerometer.setUpdateInterval(UPDATE_IN_MS);

    const throttledSetFrame = throttle(data => {
      const frameIndex = mapTiltToFrameIndex(
        orientation === ScreenOrientation.Orientation.PORTRAIT_UP
          ? data.x
          : data.y
      );
      setCurrentFrame(frames[frameKeys[frameIndex]]);
    }, 200); // Throttle updates to every 200ms

    const subscription = Accelerometer.addListener(accelerometerData => {
      setData(accelerometerData);
      throttledSetFrame(accelerometerData);
    });

    return () => {
      subscription.remove();
      throttledSetFrame.cancel();
    };
  }, [orientation]);

  const mapTiltToFrameIndex = tilt => {
    const sensitivity = 2;
    const maxTilt = 1;
    const tiltRatio = (tilt * sensitivity + maxTilt) / (2 * maxTilt);
    const frameIndex = Math.min(
      Math.max(Math.round((frameKeys.length - 1) * tiltRatio), 0),
      frameKeys.length - 1
    );
    return frameIndex;
  };

  const toggleOrientation = async () => {
    const currentOrientation = await ScreenOrientation.getOrientationAsync();
    if (currentOrientation === ScreenOrientation.Orientation.PORTRAIT_UP) {
      await ScreenOrientation.lockAsync(
        ScreenOrientation.OrientationLock.LANDSCAPE_LEFT
      );
      setOrientation(ScreenOrientation.Orientation.LANDSCAPE_LEFT);
    } else {
      await ScreenOrientation.lockAsync(
        ScreenOrientation.OrientationLock.PORTRAIT_UP
      );
      setOrientation(ScreenOrientation.Orientation.PORTRAIT_UP);
    }
  };

  return (
    <View style={styles.container}>
      <Image
        source={currentFrame}
        style={isPortrait ? styles.frameImage : styles.frameImageLandscape}
      />
      {isPortrait ? (
        <>
          <Text style={styles.text}>Tilt the device to change the frame</Text>
          <TouchableOpacity
            onPress={toggleOrientation}
            style={styles.orientationButton}
          >
            <Text style={styles.orientationButtonText}>Toggle Orientation</Text>
          </TouchableOpacity>
          <View style={styles.sensorDataContainer}>
            <Text style={styles.sensorDataText}>X: {data.x.toFixed(3)}</Text>
            <Text style={styles.sensorDataText}>Y: {data.y.toFixed(3)}</Text>
            <Text style={styles.sensorDataText}>Z: {data.z.toFixed(3)}</Text>
          </View>
        </>
      ) : (
        <TouchableOpacity
          onPress={toggleOrientation}
          style={styles.returnButton}
        >
          <Ionicons name='md-return-up-back' size={30} color='white' />
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  frameImageLandscape: {
    width: height,
    height: width,
    resizeMode: 'contain',
  },
  returnButton: {
    position: 'absolute',
    top: 20,
    left: 20,
    backgroundColor: 'rgba(0,0,0,0.7)',
    padding: 10,
    borderRadius: 5,
    zIndex: 10,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  frameImage: {
    width: '100%', // Use the full width of the screen
    height: height * 0.5625, // Adjust the height according to the aspect ratio of the image
    resizeMode: 'contain', // Ensure the entire image is visible within the frame
    marginBottom: 20,
  },
  text: {
    fontSize: 18,
    marginBottom: 10,
  },
  sensorDataContainer: {
    flexDirection: 'row', // Align items in a row
    justifyContent: 'space-around', // Distribute space evenly around items
    width: '100%', // Take the full width of the container
    marginBottom: 20, // Add some margin at the bottom
  },
  sensorDataText: {
    fontSize: 16,
    color: 'gray',
  },
  orientationButton: {
    backgroundColor: 'rgba(0,0,0,0.7)',
    padding: 10,
    borderRadius: 5,
    zIndex: 10,
    marginBottom: 20,
  },
  orientationButtonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default FrameScreen;
