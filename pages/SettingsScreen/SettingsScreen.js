import React, { useEffect, useState, useLayoutEffect } from 'react';
import {
  StyleSheet,
  Switch,
  Text,
  TouchableOpacity,
  View,
  Alert,
  Image,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { CommonActions } from '@react-navigation/native';
import { CognitoUserPool } from 'amazon-cognito-identity-js'; // Import CognitoUserPool
import logo from '../../assets/app/logo.webp';

import userPoolConfig from '../../cognitoConfig'; // Assuming this is your Cognito config
const userPool = new CognitoUserPool(userPoolConfig);

const SettingsScreen = ({ navigation }) => {
  const [isEnabled, setIsEnabled] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: () => (
        <View style={styles.headerContainer}>
          <Image source={logo} style={styles.logo} resizeMode='contain' />
          <Text style={styles.headerTitle}>Settings</Text>
        </View>
      ),
    });
  }, [navigation]);

  useEffect(() => {
    checkUserAuthentication();
  }, []);

  const checkUserAuthentication = () => {
    const currentUser = userPool.getCurrentUser();
    if (currentUser) {
      currentUser.getSession((err, session) => {
        if (err || !session.isValid()) {
          setIsLoggedIn(false);
        } else {
          setIsLoggedIn(true);
        }
      });
    } else {
      setIsLoggedIn(false);
    }
  };

  const toggleSwitch = () => setIsEnabled(previousState => !previousState);

  const handleLogout = async () => {
    const currentUser = userPool.getCurrentUser();
    if (currentUser) {
      currentUser.signOut();
    }
    await AsyncStorage.clear();
    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{ name: 'LoginPage' }],
      })
    );
  };

  const handleLogin = () => {
    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{ name: 'LoginPage' }],
      })
    );
  };

  return (
    <View style={styles.container}>
      {/* User Profile */}
      <View style={styles.settingItem}>
        <Text style={styles.settingText}>User Profile</Text>
        {/* Add navigation or action */}
      </View>

      {/* Notifications */}
      <View style={styles.settingItem}>
        <Text style={styles.settingText}>Notifications</Text>
        <Switch
          trackColor={{ false: '#767577', true: '#81b0ff' }}
          thumbColor={isEnabled ? '#f5dd4b' : '#f4f3f4'}
          ios_backgroundColor='#3e3e3e'
          onValueChange={toggleSwitch}
          value={isEnabled}
        />
      </View>

      {/* Theme */}
      <View style={styles.settingItem}>
        <Text style={styles.settingText}>Dark Mode</Text>
        {/* Implement theme change logic */}
      </View>

      {/* About */}
      <View style={styles.settingItem}>
        <Text style={styles.settingText}>About</Text>
        {/* Display app version or other info */}
      </View>

      {/* Conditional Rendering for Login/Logout */}
      {isLoggedIn ? (
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Text style={styles.logoutButtonText}>Logout</Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
          <Text style={styles.loginButtonText}>Log In</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  settingText: {
    fontSize: 18,
  },
  logoutButton: {
    marginTop: 20,
    backgroundColor: 'blue',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  loginButton: {
    marginTop: 20,
    backgroundColor: 'green',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  loginButtonText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  logoutButtonText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logo: {
    width: 30, // Adjust the size as needed
    marginRight: 10,
  },
  headerTitle: {
    fontSize: 18,
  },
});

export default SettingsScreen;
