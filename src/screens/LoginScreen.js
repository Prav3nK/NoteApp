import React, { useState } from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import { TextInput, Button, Text, Card } from 'react-native-paper';


const LoginScreen = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    if (username === '' || password === '') {
      Alert.alert('Validation Error', 'Please fill all fields');
      return;
    }

    navigation.replace('Home');
  };

  return (
    
    <View  style={{overflow:'hidden',height: '50%', width:'100%'}}>
       <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <TextInput
        label="Username"
        value={username}
        onChangeText={setUsername}
        style={styles.input}
      />
      <TextInput
        label="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={styles.input}
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
    margin : 10,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity:  0.2,
    shadowRadius: 3,
 
    

    
  },
  title: {
    fontSize: 28,
    marginBottom: 16,
    fontWeight:"700",
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
