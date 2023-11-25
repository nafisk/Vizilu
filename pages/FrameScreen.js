import { Ionicons } from '@expo/vector-icons';
import * as ScreenOrientation from 'expo-screen-orientation';
import { Accelerometer } from 'expo-sensors';
import { throttle } from 'lodash';
import React, { memo, useEffect, useState } from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import Frame1080p from '../assets/Frame1080p';
import Frame480p from '../assets/Frame480p';
import Frame720p from '../assets/Frame720p';
import styles from './styles/FrameScreenStyles';

const UPDATE_IN_MS = 10;
const THROTTLE_INTERVAL = 5;

const FrameScreen = memo(() => {
  const [selectedResolution, setSelectedResolution] = useState('480p');
  const [currentFrame, setCurrentFrame] = useState(null);
  const [orientation, setOrientation] = useState(
    ScreenOrientation.Orientation.PORTRAIT_UP
  );
  const isPortrait = orientation === ScreenOrientation.Orientation.PORTRAIT_UP;

  useEffect(() => {
    Accelerometer.setUpdateInterval(UPDATE_IN_MS);

    const throttledSetFrame = throttle(data => {
      const frameSet =
        selectedResolution === '720p'
          ? Frame720p
          : selectedResolution === '1080p'
          ? Frame1080p
          : Frame480p;
      const frameKeys = Object.keys(frameSet).sort(
        (a, b) => parseInt(a) - parseInt(b)
      );
      const frameIndex = mapTiltToFrameIndex(
        isPortrait ? data.x : data.y,
        frameKeys.length
      );
      setCurrentFrame(frameSet[frameKeys[frameIndex]]);
    }, THROTTLE_INTERVAL);

    const subscription = Accelerometer.addListener(throttledSetFrame);

    return () => {
      subscription.remove();
      throttledSetFrame.cancel();
    };
  }, [orientation, selectedResolution]);

  const mapTiltToFrameIndex = (tilt, length) => {
    const sensitivity = 2;
    const maxTilt = 1;
    const tiltRatio = (tilt * sensitivity + maxTilt) / (2 * maxTilt);
    return Math.min(
      Math.max(Math.round((length - 1) * tiltRatio), 0),
      length - 1
    );
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
          <View style={styles.pickerContainer}>
            <RNPickerSelect
              onValueChange={value => setSelectedResolution(value)}
              items={[
                { label: '480p', value: '480p' },
                { label: '720p', value: '720p' },
                { label: '1080p', value: '1080p' },
              ]}
              style={styles.pickerSelectStyles}
              value={selectedResolution}
            />
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
