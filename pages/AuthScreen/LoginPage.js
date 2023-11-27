import React, { useState } from 'react';
import {
  Button,
  StyleSheet,
  TextInput,
  View,
  Alert,
  TouchableOpacity,
  Text, // Import Text
} from 'react-native';
import {
  AuthenticationDetails,
  CognitoUser,
  CognitoUserPool,
} from 'amazon-cognito-identity-js';
import userPoolConfig from '../../cognitoConfig';

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
      <TextInput
        style={styles.input}
        placeholder='Email'
        onChangeText={setEmail}
        value={email}
      />
      <TextInput
        style={styles.input}
        placeholder='Password'
        onChangeText={setPassword}
        value={password}
        secureTextEntry
      />
      <Button title='Login' onPress={handleLogin} />
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
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    padding: 10,
  },
  linkText: {
    marginTop: 15,
    color: 'blue',
    textAlign: 'center',
  },
});

export default LoginPage;
