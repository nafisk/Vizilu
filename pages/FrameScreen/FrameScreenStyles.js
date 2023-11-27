import { Dimensions, StyleSheet } from 'react-native';

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#ffffff',
  },
  frameImage: {
    width: '100%',
    height: '56.25%', // 16:9 aspect ratio
    resizeMode: 'contain',
    marginBottom: 20,
  },
  frameImageLandscape: {
    width: '90%',
    height: '90%',
    // center
    marginLeft: '5%',

    resizeMode: 'contain',
  },
  text: {
    fontSize: 18,
    // center the text
    textAlign: 'center',
  },
  orientationButton: {
    backgroundColor: '#007bff',
    padding: 15,
    borderRadius: 5,
    marginTop: 20,
    alignItems: 'center',
  },
  orientationButtonText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  pickerContainer: {
    // alignItems: 'center',
    // justifyContent: 'center',
    // padding: 10,
    paddingVertical: 10,
    // backgroundColor: 'rgba(0,0,0,0.7)',
    // borderRadius: ,
    // marginBottom: 20,
  },
  pickerSelectStyles: {
    inputIOS: {
      fontSize: 16,
      paddingVertical: 12,
      paddingHorizontal: 10,
      borderWidth: 1,
      borderColor: 'gray',
      borderRadius: 4,
      color: 'black',
      // paddingRight: 30,
    },
    inputAndroid: {
      fontSize: 16,
      paddingHorizontal: 10,
      paddingVertical: 8,
      borderWidth: 0.5,
      borderColor: 'purple',
      borderRadius: 8,
      color: 'black',
      paddingRight: 30,
    },
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logo: {
    width: 30,
    marginRight: 10,
  },
  headerTitle: {
    fontSize: 18,
  },
  resolutionText: {
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  landscapeContainer: {
    flex: 1,
    flexDirection: 'row', // Change to row for horizontal layout
    alignItems: 'center',
    backgroundColor: '#fff', // or any other background color
  },
  backToPortraitButton: {
    backgroundColor: '#007bff', // Example color
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    // Position the button on the left side
    position: 'absolute',
    left: 10, // Adjust as needed for spacing from the left edge
    top: '50%', // Center vertically in the container
    transform: [{ translateY: -75 }], // Adjust based on the height of the button for vertical centering
  },
  backToPortraitButtonText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default styles;
