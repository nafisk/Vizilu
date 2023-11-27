import React from 'react';
import { StyleSheet, Switch, Text, TouchableOpacity, View } from 'react-native';

const SettingsScreen = () => {
  const [isEnabled, setIsEnabled] = React.useState(false);
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);

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

      {/* Logout */}
      <TouchableOpacity style={styles.logoutButton}>
        <Text style={styles.logoutButtonText}>Logout</Text>
      </TouchableOpacity>
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
  logoutButtonText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default SettingsScreen;
