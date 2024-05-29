import 'react-native-gesture-handler';
import { useState, useEffect, useMemo } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Provider as PaperProvider, } from 'react-native-paper';

import { DefaultTheme, DarkTheme } from 'react-native-paper/src/index';
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
  },
};

const darkTheme = {
  ...DarkTheme,
  colors: {
    ...DarkTheme,
  },
};

const App = () => {
  const [isDarkTheme, setIsDarkTheme] = useState(false);
  const [fontSize, setFontSize] = useState('medium');
  const [fontStyle, setFontStyle] = useState('normal');

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

  const theme = useMemo(() => (isDarkTheme ? darkTheme : lightTheme), [isDarkTheme]);

  const updateSettings = async (newSettings) => {
    if (newSettings.hasOwnProperty('theme')) {
      setIsDarkTheme(newSettings.theme === 'dark');
      await AsyncStorage.setItem('theme', newSettings.theme);
    }
    if (newSettings.hasOwnProperty('fontSize')) {
      setFontSize(newSettings.fontSize);
      await AsyncStorage.setItem('fontSize', newSettings.fontSize);
    }
    if (newSettings.hasOwnProperty('fontStyle')) {
      setFontStyle(newSettings.fontStyle);
      await AsyncStorage.setItem('fontStyle', newSettings.fontStyle);
    }
  };

  return (
    <PaperProvider theme={theme}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Splash">
          <Stack.Screen name="Splash" component={SplashScreen} options={{ headerShown: false }} />
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="SignUp" component={SignUpScreen} />
          <Stack.Screen name="Home">
            {props => <HomeScreen {...props} fontSize={fontSize} fontStyle={fontStyle} />}
          </Stack.Screen>
          <Stack.Screen name="Note" component={NoteScreen} />
          <Stack.Screen name="NoteDetail" component={NoteDetailScreen} />
          <Stack.Screen name="UserSettings">
            {props => <UserSettingsScreen {...props} updateSettings={updateSettings} />}
          </Stack.Screen>
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
};

export default App;
