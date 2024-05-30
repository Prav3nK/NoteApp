import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, Card } from 'react-native-paper';

const AboutScreen = ({ styles: customStyles }) => {
  return (
    <View style={[styles.container, customStyles]}>
      <Card style={[styles.card, customStyles]}>
        <Card.Title title="About This App" />
        <Card.Content>
          <Text>This is a simple note-taking app built with React Native.</Text>
          <Text>Version: 1.0.0</Text>
          <Text>Developer: Praveen Kumar</Text>
        </Card.Content>
      </Card>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  card: {
    padding: 16,
  },
});

export default AboutScreen;