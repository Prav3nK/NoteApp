import React, { useState } from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import { TextInput, Button, Text } from 'react-native-paper';

const SignUpScreen = ({ navigation, styles: customStyles }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSignUp = () => {
    if (username === '' || password === '' || confirmPassword === '') {
      Alert.alert('Validation Error', 'Please fill all fields');
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert('Validation Error', 'Passwords do not match');
      return;
    }

    navigation.replace('Login');
  };

  return (
    <View style={[styles.container, customStyles]}>
      <Text style={[styles.title, customStyles]}>Sign Up</Text>
      <TextInput
        label="Username"
        value={username}
        onChangeText={setUsername}
        style={[styles.input, customStyles]}
      />
      <TextInput
        label="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={[styles.input, customStyles]}
      />
      <TextInput
        label="Confirm Password"
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        secureTextEntry
        style={[styles.input, customStyles]}
      />
      <Button mode="contained" onPress={handleSignUp} style={styles.button}>
        Sign Up
      </Button>
      <Button onPress={() => navigation.navigate('Login')} style={styles.button}>
        Login
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    marginBottom: 16,
  },
  input: {
    width: '100%',
    marginBottom: 16,
  },
  button: {
    marginTop: 16,
  },
});

export default SignUpScreen;