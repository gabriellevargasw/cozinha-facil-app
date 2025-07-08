import { Text, StyleSheet, ImageBackground } from 'react-native';
import { useEffect } from 'react';

export default function Splash({ navigation }) {
  useEffect(() => {
    setTimeout(() => {
      navigation.replace('Login');
    }, 2000);
  }, []);

  return (
    <ImageBackground
      source={require('./assets/cozinhafacilfundo.png')}
      style={styles.container}
      resizeMode="cover"
    >
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
});
