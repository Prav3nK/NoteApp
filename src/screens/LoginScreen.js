import React, { useState } from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import { TextInput, Button, Text, useTheme } from 'react-native-paper';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LoginScreen = ({ navigation, styles: customStyles }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const theme = useTheme();
  const baseURL = 'http://172.20.10.3:3000'; // Replace with your actual IP address

  const handleLogin = async () => {
    if (username === '' || password === '') {
      Alert.alert('Validation Error', 'Please fill all fields');
      return;
    }

    try {
      const response = await axios.post(`${baseURL}/auth/login`, { username, password });
      if (response.status === 200) {
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
      Alert.alert('Login Error', error?.response?.data?.error || 'Something went wrong');
    }
  };

  return (
    <View style={{ overflow: 'hidden', height: '50%', width: '100%', backgroundColor: theme.colors.background }}>
      <View style={[styles.container, customStyles]}>
        <Text style={[styles.title, customStyles, { color: theme.colors.text }]}>Login</Text>
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
        <Button mode="contained" onPress={handleLogin} style={styles.button}>
          Login
        </Button>
        <Button onPress={() => navigation.navigate('SignUp')} style={styles.button}>
          Sign Up
        </Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    margin: 10,
    shadowColor: '#000',
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  title: {
    fontSize: 28,
    marginBottom: 16,
    fontWeight: "700",
  },
  input: {
    width: 300,
    marginBottom: 16,
    borderRadius: 5,
  },
  button: {
    marginTop: 16,
  },
});

export default LoginScreen;