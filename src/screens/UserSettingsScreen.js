import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, Switch, Button, RadioButton } from 'react-native-paper';
import { Picker } from '@react-native-picker/picker';
import AsyncStorage from '@react-native-async-storage/async-storage';

const UserSettingsScreen = ({ updateSettings }) => {
  const [isDarkTheme, setIsDarkTheme] = useState(false);
  const [fontSize, setFontSize] = useState('medium');
  const [fontStyle, setFontStyle] = useState('normal');

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

  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>Dark Theme</Text>
      <Switch value={isDarkTheme} onValueChange={setIsDarkTheme} />

      <Text style={styles.sectionTitle}>Font Size</Text>
      <Picker
        selectedValue={fontSize}
        style={styles.picker}
        onValueChange={(itemValue) => setFontSize(itemValue)}
      >
        <Picker.Item label="Small" value="small" />
        <Picker.Item label="Medium" value="medium" />
        <Picker.Item label="Large" value="large" />
      </Picker>

      <Text style={styles.sectionTitle}>Font Style</Text>
      <RadioButton.Group
        onValueChange={newValue => setFontStyle(newValue)}
        value={fontStyle}
      >
        <View style={styles.radioButton}>
          <RadioButton value="normal" />
          <Text style={styles.radioButtonText}>Normal</Text>
        </View>
        <View style={styles.radioButton}>
          <RadioButton value="italic" />
          <Text style={styles.radioButtonText}>Italic</Text>
        </View>
        <View style={styles.radioButton}>
          <RadioButton value="bold" />
          <Text style={styles.radioButtonText}>Bold</Text>
        </View>
      </RadioButton.Group>

      <Button mode="contained" onPress={handleSaveSettings} style={styles.saveButton}>
        Save Settings
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 16,
  },
  picker: {
    height: 50,
    width: 150,
    marginBottom: 16,
  },
  radioButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  radioButtonText: {
    marginLeft: 8,
    fontSize: 16,
    fontFamily: 'Roboto-Regular',
  },
  saveButton: {
    marginTop: 16,
  },
});

export default UserSettingsScreen;
