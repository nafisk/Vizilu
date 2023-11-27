// LoginPage.js
// import {
//   AuthenticationDetails,
//   CognitoUser,
//   CognitoUserPool,
// } from 'amazon-cognito-identity-js';
import React, { useState } from 'react';
import { Button, StyleSheet, TextInput, View } from 'react-native';
// import cognitoConfig from '../../cognitoConfig';

const LoginPage = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    // const userPool = new CognitoUserPool(cognitoConfig);
    // const userData = {
    //   Username: email,
    //   Pool: userPool,
    // };
    // const authenticationDetails = new AuthenticationDetails({
    //   Username: email,
    //   Password: password,
    // });
    // const cognitoUser = new CognitoUser(userData);
    // cognitoUser.authenticateUser(authenticationDetails, {
    //   onSuccess: result => {
    //     Alert.alert('Login Success', 'You are successfully logged in!');
    //     navigation.navigate('Home');
    //   },
    //   onFailure: err => {
    //     Alert.alert('Login failed', err.message);
    //   },
    // });
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
});

export default LoginPage;
