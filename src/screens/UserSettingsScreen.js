import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, Alert } from 'react-native';
import { Switch, Button, RadioButton, Card, TextInput } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';

const UserSettingsScreen = ({ updateSettings, navigation }) => {
  const [isDarkTheme, setIsDarkTheme] = useState(false);
  const [fontSize, setFontSize] = useState('medium');
  const [fontStyle, setFontStyle] = useState('normal');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  useEffect(() => {
    const loadSettings = async () => {
      const theme = await AsyncStorage.getItem('theme');
      const size = await AsyncStorage.getItem('fontSize');
      const style = await AsyncStorage.getItem('fontStyle');
      setIsDarkTheme(theme === 'dark');
      setFontSize(size || 'medium');
      setFontStyle(style || 'normal');
    };
    loadSettings();
  }, []);

  const saveSettingsToStorage = async () => {
    try {
      await AsyncStorage.setItem('theme', isDarkTheme ? 'dark' : 'light');
      await AsyncStorage.setItem('fontSize', fontSize);
      await AsyncStorage.setItem('fontStyle', fontStyle);
    } catch (error) {
      console.error('Error saving settings:', error);
    }
  };

  const handleSaveSettings = () => {
    saveSettingsToStorage();
    updateSettings({
      theme: isDarkTheme ? 'dark' : 'light',
      fontSize,
      fontStyle,
    });
  };

  const handleLogout = () => {
    // Perform logout operations, e.g., clearing user data, navigating to login screen
    navigation.replace('Login');
  };

  const handleChangePassword = () => {
    if (!currentPassword || !newPassword || !confirmPassword) {
      Alert.alert('Validation Error', 'Please fill all fields');
      return;
    }
    if (newPassword !== confirmPassword) {
      Alert.alert('Validation Error', 'New passwords do not match');
      return;
    }
    // Perform password change operations here
    Alert.alert('Success', 'Password changed successfully');
  };

  return (
    <View style={styles.container}>
      <Card style={styles.card}>
        <Card.Title icon="cog" title="User Settings" />
        <Card.Content>
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Account Settings</Text>
            <View style={styles.setting}>
              <Text style={styles.text}>Change Password</Text>
            </View>
            <TextInput
              label="Current Password"
              value={currentPassword}
              onChangeText={setCurrentPassword}
              secureTextEntry
              style={styles.input}
            />
            <TextInput
              label="New Password"
              value={newPassword}
              onChangeText={setNewPassword}
              secureTextEntry
              style={styles.input}
            />
            <TextInput
              label="Confirm New Password"
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              secureTextEntry
              style={styles.input}
            />
            <Button mode="contained" onPress={handleChangePassword} style={styles.button}>
              Change Password
            </Button>
            <Button mode="contained" onPress={handleLogout} style={styles.button}>
              Logout
            </Button>
          </View>
          <View style={styles.underline} />
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Theme Settings</Text>
            <View style={styles.setting}>
              <Text style={styles.text}>Dark Theme</Text>
              <Switch
                value={isDarkTheme}
                onValueChange={setIsDarkTheme}
                style={styles.switch}
              />
            </View>
            <View style={styles.setting}>
              <Text style={styles.text}>Font Size</Text>
              <View style={{ flexDirection: 'row' }}>
                <RadioButton.Group
                  onValueChange={newValue => setFontSize(newValue)}
                  value={fontSize}
                >
                  <View style={styles.radioButton}>
                    <RadioButton value="small" />
                    <Text>Small</Text>
                  </View>
                  <View style={styles.radioButton}>
                    <RadioButton value="medium" />
                    <Text>Medium</Text>
                  </View>
                  <View style={styles.radioButton}>
                    <RadioButton value="large" />
                    <Text>Large</Text>
                  </View>
                </RadioButton.Group>
              </View>
            </View>
            <View style={styles.setting}>
              <Text style={styles.text}>Font Style</Text>
              <View style={{ flexDirection: 'row' }}>
                <RadioButton.Group
                  onValueChange={newValue => setFontStyle(newValue)}
                  value={fontStyle}
                >
                  <View style={styles.radioButton}>
                    <RadioButton value="normal" />
                    <Text>Normal</Text>
                  </View>
                  <View style={styles.radioButton}>
                    <RadioButton value="italic" />
                    <Text>Italic</Text>
                  </View>
                  <View style={styles.radioButton}>
                    <RadioButton value="bold" />
                    <Text>Bold</Text>
                  </View>
                </RadioButton.Group>
              </View>
            </View>
          </View>
          <View style={styles.underline} />
          <Button mode="contained" onPress={handleSaveSettings} style={styles.button}>
            Save Settings
          </Button>
        </Card.Content>
      </Card>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  card: {
    padding: 16,
  },
  section: {
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  setting: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  text: {
    fontSize: 18,
    marginLeft: 16,
  },
  radioButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
    marginRight: 16,
  },
  switch: {
    alignSelf: 'center',
  },
  input: {
    marginBottom: 16,
  },
  button: {
    marginTop: 16,
  },
  underline: {
    borderBottomWidth: 1,
    borderColor: '#ccc',
    marginBottom: 16,
  },
});

export default UserSettingsScreen;
