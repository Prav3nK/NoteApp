const AboutScreen = () => {
    return (
      <View style={styles.container}>
        <Card style={styles.card}>
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
  