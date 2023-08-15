import { useState, useContext, useEffect, useCallback } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import * as SplashScreen from 'expo-splash-screen';
import { useFonts } from 'expo-font';
import * as Linking from 'expo-linking';
import { Feather } from '@expo/vector-icons';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AuthContextProvider, { AuthContext } from './store/context/auth-context';
import LandingScreen from './screens/LandingScreen';
import UserInfoScreen from './screens/UserInfoScreen';
import UserTagsScreen from './screens/UserTagsScreen';
import HomeScreen from './screens/HomeScreen';
import ActivitiesScreen from './screens/ActivitiesScreen';
import ProfileScreen from './screens/ProfileScreen';
import ChatScreen from './screens/ChatScreen';
import EventDetailScreen from './screens/EventDetailScreen';
import LoginScreen from './screens/LoginScreen';
import CreateEventScreen from './screens/CreateEventScreen';
import IconButton from './components/ui/IconButton';

const Stack = createNativeStackNavigator();
const BottomTabs = createBottomTabNavigator();

// Keep the splash screen visible while we fetch resources
SplashScreen.preventAutoHideAsync();

export function UserOverview() {
  return (
    <BottomTabs.Navigator screenOptions={{
      headerShown: false,
      tabBarInactiveTintColor: '#3B4852',
      tabBarActiveTintColor: '#3C8722',
      tabBarStyle: {paddingTop: 5, paddingBottom: 25},
      tabBarLabelStyle: {fontFamily: 'roboto-medium', fontSize: 11}
    }}>
      <BottomTabs.Screen 
        name='Home' 
        component={HomeScreen}
        options={{
          tabBarIcon: ({color, size}) => <Feather name='home' color={color} size={size} />,
          tabBarLabel: ({focused, color, size}) => focused ? <Text style={{color, fontFamily: 'roboto-medium', fontSize: 11}}>•</Text> : <Text style={{color, fontFamily: 'roboto-medium', fontSize: 11}}>Home</Text>
        }} 
      />
      <BottomTabs.Screen 
        name='Activities' 
        component={ActivitiesScreen} 
        options={{
          tabBarIcon: ({color, size}) => <Feather name='check-square' color={color} size={size} />
        }}
      />
      <BottomTabs.Screen 
        name='CreateEventTab' 
        component={CreateEventScreen} 
        options={({ navigation }) => ({
          tabBarButton: () => (
              <IconButton icon="plus" size={36} color="white" style={styles.createEventBtn} onPress={() => navigation.navigate('CreateEvent')} />
          ),
          tabPress: (e) => {
            e.preventDefault();
            navigation.navigate('CreateEvent');
        }
        })}
      />
      <BottomTabs.Screen 
        name='Chat' 
        component={ChatScreen} 
        options={{
          tabBarIcon: ({color, size}) => <Feather name='message-square' color={color} size={size} />
        }}
      />
      <BottomTabs.Screen 
        name='Profile' 
        component={ProfileScreen} 
        options={{
          tabBarIcon: ({color, size}) => <Feather name='user' color={color} size={size} />
        }}
      />
    </BottomTabs.Navigator> 
  )
};

function AuthStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false
      }}
    >
      {/* // TO COMMENT OUT */}
      <Stack.Screen name="Landing" component={LandingScreen} />
      <Stack.Screen name="Login" component={LoginScreen} /> 
      <Stack.Screen name="UserInfo" component={UserInfoScreen} />
      <Stack.Screen name="UserTags" component={UserTagsScreen} />
    </Stack.Navigator>
  );
}

function AuthenticatedStack() {
  const { logout } = useContext(AuthContext);
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false
      }}
    >
      {/* <Stack.Screen name="Welcome" component={WelcomeScreen} options={{
        headerRight: ({tintColor}) => <IconButton icon="exit" color={tintColor} size={24} onPress={logout} />
      }} /> */}
      <Stack.Screen name="UserOverview" component={UserOverview} />
      <Stack.Screen name="EventDetail" component={EventDetailScreen} />
      <Stack.Screen name="CreateEvent" component={CreateEventScreen} options={{
        presentation: 'modal'
      }} />
    </Stack.Navigator>
  );
}

function Navigation() {
  const { isAuthenticated } = useContext(AuthContext);

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

  return (
    <NavigationContainer linking={linking} fallback={<Text>Loading...</Text>}>
      {!isAuthenticated && <AuthStack />}
      {isAuthenticated && <AuthenticatedStack />}
    </NavigationContainer>
  );
};

function Root() {
  const [isTryingLogin, setIsTryingLogin] = useState(true);
  const { authenticate, setFirstName, logout } = useContext(AuthContext);

  useEffect(() => {
    async function fetchLocalStorage() {
      const storedToken = await AsyncStorage.getItem('token');
      const storedFirstName = await AsyncStorage.getItem('first-name');

      if (storedToken) {
        authenticate(storedToken);
        // logout();
      };

      if (storedFirstName) {
        setFirstName(storedFirstName);
      };

      setIsTryingLogin(false);
    };

    fetchLocalStorage();
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (!isTryingLogin) {
      // This tells the splash screen to hide immediately! If we call this after
      // `setAppIsReady`, then we may see a blank screen while the app is
      // loading its initial state and rendering its first pixels. So instead,
      // we hide the splash screen once we know the root view has already
      // performed layout.
      await SplashScreen.hideAsync();
    }
  }, [isTryingLogin]);

  if (isTryingLogin) {
    return null;
  };

  return (
    <View onLayout={onLayoutRootView} style={styles.container}>
      <Navigation />
    </View>
  );
};

export default function App() {
  const [fontLoaded] = useFonts({
    'roboto': require('./assets/fonts/Roboto-Regular.ttf'),
    'roboto-medium': require('./assets/fonts/Roboto-Medium.ttf'),
    'roboto-bold': require('./assets/fonts/Roboto-Bold.ttf'),
    'inter-semibold': require('./assets/fonts/Inter-SemiBold.ttf'),
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontLoaded) {
      // This tells the splash screen to hide immediately! If we call this after
      // `setAppIsReady`, then we may see a blank screen while the app is
      // loading its initial state and rendering its first pixels. So instead,
      // we hide the splash screen once we know the root view has already
      // performed layout.
      await SplashScreen.hideAsync();
    }
  }, [fontLoaded]);
  
  if (!fontLoaded) {
    return null;
  };

  return (
    <>
      <StatusBar style='dark' />
      <View onLayout={onLayoutRootView} style={styles.container}>
        <AuthContextProvider>
          <Root />
        </AuthContextProvider>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  createEventBtn: {
    backgroundColor: '#1A4821',
    height: 58,
    width: 58,
    borderRadius: 29,
    justifyContent: 'center',
    alignItems: 'center'
  },
  container: {
    flex: 1
  }
});