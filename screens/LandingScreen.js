import { useEffect, useContext, useState } from 'react';
import { StyleSheet, Text, View, ImageBackground, Pressable } from 'react-native';
import { AuthContext } from '../store/context/auth-context';
import LoginButton from '../components/LoginButton';
import LoadingOverlay from '../components/ui/LoadingOverlay';
import { authenticateUser } from '../utils/http';

function LandingScreen({ navigation, route }) {
  const state = route.params?.state;
  const code = route.params?.code;

  const [isFetching, setIsFetching] = useState(false);

  const { setTempToken } = useContext(AuthContext);

  useEffect(() => {
    if (state && code) {
      async function login() {
        setIsFetching(true);
        try {
          const token = await authenticateUser(state, code);
          // authenticate(token);
          setTempToken(token);
          navigation.navigate('UserInfo');
        } catch (error) {
          console.log('authenticateUser', error);
          console.log(error.response.data);
          setIsFetching(false);
        }
      };

      login();
    };
  }, [state, code]);

  function openTermsHandler() {
    navigation.navigate('TermsAndConditions');
  };

  function openPrivacyHandler() {
    navigation.navigate('PrivacyPolicy');
  };

  if (isFetching) {
    return (
      <LoadingOverlay />
    )
  };

  return (
    <View style={styles.container}>
      <ImageBackground source={require('../assets/images/splash.png')} resizeMode="cover" style={styles.image}>
        <View style={styles.signInContainer}>
          <Text style={styles.signInText}>Sign in or sign up</Text>
          <Text style={styles.termsText}>By using our services you are agreeing to our <Pressable onPress={openTermsHandler}>
            <Text style={styles.link}>Terms</Text> 
            </Pressable> and <Pressable onPress={openPrivacyHandler}>
              <Text style={styles.link}>Privacy Statement</Text>
            </Pressable>
            .
          </Text>
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
  },
  link: {
    textDecorationLine: 'underline'
  }
});