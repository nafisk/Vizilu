import { Ionicons } from '@expo/vector-icons';
import * as ScreenOrientation from 'expo-screen-orientation';
import { Accelerometer } from 'expo-sensors';
import { throttle } from 'lodash';
import React, { memo, useEffect, useState } from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import Frame480p from '../assets/Frame480p';
import Frame720p from '../assets/Frame720p';
import Frame1080p from '../assets/Frame1080p';
import styles from './FrameScreenStyles'; // Import styles for the component

const UPDATE_IN_MS = 10; // Time interval for accelerometer updates
const THROTTLE_INTERVAL = 5; // Interval to limit how often frame updates can occur

// FrameScreen component displays images based on device orientation
const FrameScreen = memo(() => {
  // Extract and sort keys from Frame480p object
  const frameKeys = Object.keys(Frame480p).sort(
    (a, b) => parseInt(a) - parseInt(b)
  );
  const middleIndex = Math.floor(frameKeys.length / 2);

  // State for the current frame and screen orientation
  const [currentFrame, setCurrentFrame] = useState(
    Frame480p[frameKeys[middleIndex]]
  );
  const [orientation, setOrientation] = useState(
    ScreenOrientation.Orientation.PORTRAIT_UP
  );
  const isPortrait = orientation === ScreenOrientation.Orientation.PORTRAIT_UP;

  useEffect(() => {
    // Setting the update interval for the accelerometer
    Accelerometer.setUpdateInterval(UPDATE_IN_MS);

    // Throttle frame updates to improve performance
    const throttledSetFrame = throttle(data => {
      const frameIndex = mapTiltToFrameIndex(isPortrait ? data.x : data.y);
      setCurrentFrame(Frame480p[frameKeys[frameIndex]]);
    }, THROTTLE_INTERVAL);

    // Add accelerometer listener
    const subscription = Accelerometer.addListener(throttledSetFrame);

    // Cleanup on unmount
    return () => {
      subscription.remove();
      throttledSetFrame.cancel();
    };
  }, [orientation]);

  // Maps device tilt to the appropriate frame index
  const mapTiltToFrameIndex = tilt => {
    const sensitivity = 2;
    const maxTilt = 1;
    const tiltRatio = (tilt * sensitivity + maxTilt) / (2 * maxTilt);
    return Math.min(
      Math.max(Math.round((frameKeys.length - 1) * tiltRatio), 0),
      frameKeys.length - 1
    );
  };

  // Toggle screen orientation between portrait and landscape
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
    // Render the current frame and controls for orientation
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
            <Text style={styles.sensorDataText}>
              Tilt the device to view different frames
            </Text>
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
});

export default FrameScreen;
