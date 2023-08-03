import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import * as Linking from 'expo-linking';
import UserContextProvider from './store/context/user-context';
import AppNavigator from './navigation/AppNavigator';
import { useFonts } from 'expo-font';
// import AppLoading from 'expo-app-loading';

export default function App() {
  const config = {
    screens: {
      Landing: 'landing',
      Login: 'login',
      UserInfo: 'userinfo',
      UserTags: 'usertags',
      UserOverview: {
        screens: {
          Home: 'home',
          Activities: 'activities',
          CreateEvent: 'createevent',
          Chat: 'chat',
          Profile: 'profile',
        }
      },
      EventDetail: 'eventdetail'
    },
  };

  const linking = {
    prefixes: [Linking.createURL('/'), 'https://netify.iqust.top'],
    config,
  };

  const [fontLoaded] = useFonts({
    'roboto': require('./assets/fonts/Roboto-Regular.ttf'),
    'roboto-medium': require('./assets/fonts/Roboto-Medium.ttf'),
    'roboto-bold': require('./assets/fonts/Roboto-Bold.ttf'),
    'inter-semibold': require('./assets/fonts/Inter-SemiBold.ttf'),
  });
  
  // if (!fontLoaded) {
  //   return <AppLoading />;
  // };

  return (
    <>
      <StatusBar style='dark' />
      <UserContextProvider>
        <NavigationContainer linking={linking} fallback={<Text>Loading...</Text>}>
          <AppNavigator />
        </NavigationContainer>
      </UserContextProvider>
    </>
  );
}

const styles = StyleSheet.create({
});
