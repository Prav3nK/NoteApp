import 'react-native-gesture-handler';
import React, { useState, useMemo, useEffect } from 'react';
import { NavigationContainer, DefaultTheme as NavigationDefaultTheme, DarkTheme as NavigationDarkTheme } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Provider as PaperProvider, MD3LightTheme, MD3DarkTheme } from 'react-native-paper';
import SplashScreen from './src/screens/SplashScreen';
import LoginScreen from './src/screens/LoginScreen';
import SignUpScreen from './src/screens/SignUpScreen';
import HomeScreen from './src/screens/HomeScreen';
import NoteScreen from './src/screens/NoteScreen';
import NoteDetailScreen from './src/screens/NoteDetailScreen';
import UserSettingsScreen from './src/screens/UserSettingsScreen';
import AboutScreen from './src/screens/AboutScreen';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Stack = createStackNavigator();

const CombinedDefaultTheme = {
  ...NavigationDefaultTheme,
  ...MD3LightTheme,
  colors: {
    ...NavigationDefaultTheme.colors,
    ...MD3LightTheme.colors,
    background: '#ffffff',
    text: '#000000',
  },
};

const CombinedDarkTheme = {
  ...NavigationDarkTheme,
  ...MD3DarkTheme,
  colors: {
    ...NavigationDarkTheme.colors,
    ...MD3DarkTheme.colors,
    background: '#121212',
    text: '#ffffff',
  },
};

const App = () => {
  const [isDarkTheme, setIsDarkTheme] = useState(false);
  const [fontSize, setFontSize] = useState('medium');
  const [fontStyle, setFontStyle] = useState('normal');

  const theme = isDarkTheme ? CombinedDarkTheme : CombinedDefaultTheme;

  useEffect(() => {
    const loadSettings = async () => {
      const storedTheme = await AsyncStorage.getItem('theme');
      const size = await AsyncStorage.getItem('fontSize');
      const style = await AsyncStorage.getItem('fontStyle');
      setIsDarkTheme(storedTheme === 'dark');
      setFontSize(size || 'medium');
      setFontStyle(style || 'normal');
    };
    loadSettings();
  }, []);

  const updateSettings = (settings) => {
    setIsDarkTheme(settings.theme === 'dark');
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
      <NavigationContainer theme={theme}>
        <Stack.Navigator initialRouteName="Splash">
          <Stack.Screen name="Splash" component={SplashScreen} options={{ headerShown: false }} />
          <Stack.Screen name="Login">
            {(props) => <LoginScreen {...props} styles={combinedStyles} />}
          </Stack.Screen>
          <Stack.Screen name="SignUp">
            {(props) => <SignUpScreen {...props} styles={combinedStyles} />}
          </Stack.Screen>
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
            {(props) => <UserSettingsScreen {...props} updateSettings={updateSettings} styles={combinedStyles} />}
          </Stack.Screen>
          <Stack.Screen name="A">
            {(props) => <AboutScreen {...props} styles={combinedStyles} />}
          </Stack.Screen>
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
};

export default App;