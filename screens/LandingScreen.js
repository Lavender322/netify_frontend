import { StyleSheet, Text, View, ImageBackground } from 'react-native';
import LoginButton from '../components/LoginButton';

function LandingScreen() {
  return (
    <View style={styles.container}>
      <ImageBackground source={require('../assets/splash.png')} resizeMode="cover" style={styles.image}>
        <View style={styles.signInContainer}>
          <Text style={styles.signInText}>Sign in or sign up</Text>
          <Text style={styles.termsText}>By using our services you are agreeing to our Terms and Privacy Statement.</Text>
          <LoginButton />
        </View>
      </ImageBackground>
    </View>
  )
}

export default LandingScreen

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  image: {
    flex: 1,
    justifyContent: 'flex-end'
  },
  signInContainer: {
    padding: 16,
    marginBottom: 80,
  },
  signInText: {
    fontSize: 21,
    fontFamily: 'roboto-bold',
    textAlign: 'center',
    color: '#000000E5'
  },
  termsText: {
    color: '#4F4F4F',
    marginTop: 8,
    marginBottom: 36,
    fontFamily: 'roboto',
    fontSize: 15,
    lineHeight: 22
  }
});