import React, { useState } from 'react';
import {
  StyleSheet,
  TextInput,
  View,
  Alert,
  TouchableOpacity,
  Text,
  Image,
} from 'react-native';
import {
  CognitoUserAttribute,
  CognitoUserPool,
} from 'amazon-cognito-identity-js';
import userPoolConfig from '../../cognitoConfig';
import logo from '../../assets/app/logo_full.png'; // Assuming the logo is the same

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
      <Image source={logo} style={styles.logo} resizeMode='contain' />

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
      <TouchableOpacity onPress={handleSignup} style={styles.signupButton}>
        <Text style={styles.signupButtonText}>Sign Up</Text>
      </TouchableOpacity>

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
    backgroundColor: '#ffffff',
  },
  logo: {
    width: 250,
    alignSelf: 'center',
    marginBottom: 10,
  },
  input: {
    height: 50,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#198eca',
    marginBottom: 15,
    paddingHorizontal: 10,
    borderRadius: 25,
    color: '#198eca',
    fontSize: 16,
  },
  linkText: {
    marginTop: 15,
    color: '#198eca',
    textAlign: 'center',
  },
  signupButton: {
    height: 50,
    backgroundColor: '#198eca',
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  signupButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default SignupPage;
