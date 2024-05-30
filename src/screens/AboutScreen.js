import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, Card, useTheme } from 'react-native-paper';

const AboutScreen = ({ styles: customStyles }) => {
  const theme = useTheme();

  return (
    <View style={[styles.container, customStyles, { backgroundColor: theme.colors.background }]}>
      <Card style={[styles.card, customStyles]}>
        <Card.Title title="About This App" titleStyle={customStyles} />
        <Card.Content>
          <Text style={customStyles}>This is a simple note-taking app built with React Native.</Text>
          <Text style={customStyles}>Version: 1.0.0</Text>
          <Text style={customStyles}>Developer: Praveen Kumar</Text>
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
});

export default AboutScreen;