import React, { useState } from 'react';
import { View, StyleSheet} from 'react-native';
import { Picker } from '@react-native-picker/picker';

import { Text, Switch, Button, RadioButton } from 'react-native-paper';

const UserSettingsScreen = ({ updateSettings }) => {
  const [isDarkTheme, setIsDarkTheme] = useState(false);
  const [fontSize, setFontSize] = useState('medium');
  const [fontStyle, setFontStyle] = useState('normal');

  const handleSaveSettings = () => {
    updateSettings({
      theme: isDarkTheme ? 'dark' : 'light',
      fontSize,
      fontStyle,
    });
  };

  return (
    <View style={styles.container}>
      <Text>Dark Theme</Text>
      <Switch value={isDarkTheme} onValueChange={setIsDarkTheme} />

      <Text>Font Size</Text>
      <Picker
        selectedValue={fontSize}
        style={styles.picker}
        onValueChange={(itemValue) => setFontSize(itemValue)}
      >
        <Picker.Item label="Small" value="small" />
        <Picker.Item label="Medium" value="medium" />
        <Picker.Item label="Large" value="large" />
      </Picker>

      <Text>Font Style</Text>
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

      <Button mode="contained" onPress={handleSaveSettings}>
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
});

export default UserSettingsScreen;
