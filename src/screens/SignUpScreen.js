import React, { useState } from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import { TextInput, Button, Text, useTheme } from 'react-native-paper';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SignUpScreen = ({ navigation, styles: customStyles }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const theme = useTheme();
  const baseURL = 'http://172.20.10.3:3000'; // Replace with your actual IP address

  const handleSignUp = async () => {
    if (username === '' || password === '' || confirmPassword === '') {
      Alert.alert('Validation Error', 'Please fill all fields');
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert('Validation Error', 'Passwords do not match');
      return;
    }

    try {
      const response = await axios.post(`${baseURL}/auth/register`, { username, password });
      if (response.status === 201) {
        await AsyncStorage.setItem('token', response.data.token);
        navigation.replace('Home', { userId: response.data.userId });
      }
    } catch (error) {
      console.log('Network Error:', error);
      if (error.response) {
        console.log('Response Data:', error.response.data);
      } else if (error.request) {
        console.log('Request Data:', error.request);
      } else {
        console.log('Error Message:', error.message);
      }
      Alert.alert('Sign Up Error', error?.response?.data?.error || 'Something went wrong');
    }
  };

  return (
    <View style={[styles.container, customStyles, { backgroundColor: theme.colors.background }]}>
      <Text style={[styles.title, customStyles, { color: theme.colors.text }]}>Sign Up</Text>
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