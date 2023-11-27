import React, { useState } from 'react';
import {
  Button,
  StyleSheet,
  TextInput,
  View,
  Alert,
  TouchableOpacity,
  Text,
  Image,
} from 'react-native';
import {
  AuthenticationDetails,
  CognitoUser,
  CognitoUserPool,
} from 'amazon-cognito-identity-js';
import userPoolConfig from '../../cognitoConfig';
import logo from '../../assets/app/logo_full.png';

const LoginPage = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    const userPool = new CognitoUserPool(userPoolConfig);
    const userData = {
      Username: email,
      Pool: userPool,
    };
    const authenticationDetails = new AuthenticationDetails({
      Username: email,
      Password: password,
    });
    const cognitoUser = new CognitoUser(userData);
    cognitoUser.authenticateUser(authenticationDetails, {
      onSuccess: result => {
        Alert.alert('Login Success', 'You are successfully logged in!');
        // Reset the navigation stack
        navigation.reset({
          index: 0,
          routes: [{ name: 'BottomTabNavigator' }],
        });
      },
      onFailure: err => {
        Alert.alert('Login failed', err.message);
      },
    });
  };

  const handleContinueWithoutLogin = () => {
    navigation.reset({
      index: 0,
      routes: [{ name: 'BottomTabNavigator' }],
    });
  };

  return (
    <View style={styles.container}>
      <Image source={logo} style={styles.logo} resizeMode='contain' />
      <TextInput
        style={styles.input}
        placeholder='Email'
        placeholderTextColor='#a1d4e9'
        onChangeText={setEmail}
        value={email}
      />
      <TextInput
        style={styles.input}
        placeholder='Password'
        placeholderTextColor='#a1d4e9'
        onChangeText={setPassword}
        value={password}
        secureTextEntry
      />
      <TouchableOpacity onPress={handleLogin} style={styles.loginButton}>
        <Text style={styles.loginButtonText}>Login</Text>
      </TouchableOpacity>

      {/* Add TouchableOpacity for navigating to SignupPage */}
      <TouchableOpacity onPress={() => navigation.navigate('SignupPage')}>
        <Text style={styles.linkText}>Don't have an account? Sign up</Text>
      </TouchableOpacity>

      {/* Continue Without Logging In */}
      <TouchableOpacity onPress={handleContinueWithoutLogin}>
        <Text style={styles.linkText}>Continue without logging in</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#ffffff', // Optional: change background color if needed
  },
  logo: {
    width: 250,
    alignSelf: 'center',
    marginBottom: 10,
  },
  input: {
    height: 50,
    backgroundColor: '#fff', // Background color for input
    borderWidth: 1,
    borderColor: '#198eca',
    marginBottom: 15,
    paddingHorizontal: 10,
    borderRadius: 25, // Rounded corners for modern look
    color: '#198eca', // Text color
    fontSize: 16, // Adjust font size if needed
  },
  linkText: {
    marginTop: 15,
    color: '#198eca', // Link text color
    textAlign: 'center',
  },
  loginButton: {
    height: 50,
    backgroundColor: '#198eca', // Button background color
    borderRadius: 25, // Rounded corners
    justifyContent: 'center', // Center content vertically
    alignItems: 'center', // Center content horizontally
  },

  loginButtonText: {
    color: '#fff', // Text color
    fontSize: 16, // Text size
    fontWeight: 'bold', // Text weight
  },
});

export default LoginPage;
