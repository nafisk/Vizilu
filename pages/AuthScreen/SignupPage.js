import {
  CognitoUserAttribute,
  CognitoUserPool,
} from 'amazon-cognito-identity-js';
import React, { useState } from 'react';
import {
  Button,
  StyleSheet,
  TextInput,
  View,
  Alert,
  Text,
  TouchableOpacity,
} from 'react-native';
import userPoolConfig from '../../cognitoConfig';

const SignupPage = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [familyName, setFamilyName] = useState('');
  const [birthdate, setBirthdate] = useState('');
  const [address, setAddress] = useState('');

  const handleSignup = () => {
    const userPool = new CognitoUserPool(userPoolConfig);
    const attributeList = [
      new CognitoUserAttribute({ Name: 'email', Value: email }),
      new CognitoUserAttribute({ Name: 'family_name', Value: familyName }),
      new CognitoUserAttribute({ Name: 'birthdate', Value: birthdate }),
      new CognitoUserAttribute({ Name: 'address', Value: address }),
    ];
    console.log('attributeList', attributeList);
    userPool.signUp(email, password, attributeList, null, (err, result) => {
      if (err) {
        Alert.alert('Signup failed', err.message);
        return;
      }
      Alert.alert('Signup Success');
      // Reset the navigation stack
      navigation.reset({
        index: 0,
        routes: [{ name: 'BottomTabNavigator' }],
      });
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
      <TextInput
        style={styles.input}
        placeholder='Family Name'
        onChangeText={setFamilyName}
        value={familyName}
      />
      <TextInput
        style={styles.input}
        placeholder='Birthdate (YYYY-MM-DD)'
        onChangeText={setBirthdate}
        value={birthdate}
      />
      <TextInput
        style={styles.input}
        placeholder='Address'
        onChangeText={setAddress}
        value={address}
      />
      <Button title='Sign Up' onPress={handleSignup} />
      <TouchableOpacity onPress={() => navigation.navigate('LoginPage')}>
        <Text style={styles.linkText}>Already have an account? Log in</Text>
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

export default SignupPage;
