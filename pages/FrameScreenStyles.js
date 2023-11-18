import { Dimensions, StyleSheet } from 'react-native';

const { height, width } = Dimensions.get('window');

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
    width: '100%',
    height: height * 0.5625,
    resizeMode: 'contain',
    marginBottom: 20,
  },
  text: {
    fontSize: 18,
    marginBottom: 10,
  },
  sensorDataContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginBottom: 20,
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

export default styles;
