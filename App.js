import 'react-native-gesture-handler';
import React, { useState, useMemo, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Provider as PaperProvider, MD3LightTheme as DefaultTheme, MD3DarkTheme as DarkTheme } from 'react-native-paper';
import SplashScreen from './src/screens/SplashScreen';
import LoginScreen from './src/screens/LoginScreen';
import SignUpScreen from './src/screens/SignUpScreen';
import HomeScreen from './src/screens/HomeScreen';
import NoteScreen from './src/screens/NoteScreen';
import NoteDetailScreen from './src/screens/NoteDetailScreen';
import UserSettingsScreen from './src/screens/UserSettingsScreen';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Stack = createStackNavigator();

const lightTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#6200ea',
    background: '#ffffff',
    surface: '#ffffff',
    text: '#000000',
  },
};

const darkTheme = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    primary: '#bb86fc',
    background: '#121212',
    surface: '#121212',
    text: '#ffffff',
  },
};

const App = () => {
  const [theme, setTheme] = useState(lightTheme);
  const [fontSize, setFontSize] = useState('medium');
  const [fontStyle, setFontStyle] = useState('normal');

  useEffect(() => {
    const loadSettings = async () => {
      const theme = await AsyncStorage.getItem('theme');
      const size = await AsyncStorage.getItem('fontSize');
      const style = await AsyncStorage.getItem('fontStyle');
      setTheme(theme === 'dark' ? darkTheme : lightTheme);
      setFontSize(size || 'medium');
      setFontStyle(style || 'normal');
    };
    loadSettings();
  }, []);

  const updateSettings = (settings) => {
    setTheme(settings.theme === 'dark' ? darkTheme : lightTheme);
    setFontSize(settings.fontSize);
    setFontStyle(settings.fontStyle);
  };

  const fontSizeStyles = useMemo(() => {
    switch (fontSize) {
      case 'small':
        return { fontSize: 12 };
      case 'large':
        return { fontSize: 20 };
      default:
        return { fontSize: 16 };
    }
  }, [fontSize]);

  const fontStyleStyles = useMemo(() => {
    switch (fontStyle) {
      case 'italic':
        return { fontStyle: 'italic' };
      case 'bold':
        return { fontWeight: 'bold' };
      default:
        return { fontStyle: 'normal' };
    }
  }, [fontStyle]);

  const combinedStyles = {
    ...fontSizeStyles,
    ...fontStyleStyles,
  };

  return (
    <PaperProvider theme={theme}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Splash">
          <Stack.Screen name="Splash" component={SplashScreen} options={{ headerShown: false }} />
          <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
          <Stack.Screen name="SignUp" component={SignUpScreen} options={{ headerShown: false }} />
          <Stack.Screen name="Home">
            {(props) => <HomeScreen {...props} styles={combinedStyles} />}
          </Stack.Screen>
          <Stack.Screen name="Note">
            {(props) => <NoteScreen {...props} styles={combinedStyles} />}
          </Stack.Screen>
          <Stack.Screen name="NoteDetail">
            {(props) => <NoteDetailScreen {...props} styles={combinedStyles} />}
          </Stack.Screen>
          <Stack.Screen name="UserSettings">
            {(props) => <UserSettingsScreen {...props} updateSettings={updateSettings} />}
          </Stack.Screen>
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
};

export default App;
