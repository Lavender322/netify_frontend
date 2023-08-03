import { StyleSheet, Text } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Feather } from '@expo/vector-icons';
import LandingScreen from '../screens/LandingScreen';
import UserInfoScreen from '../screens/UserInfoScreen';
import UserTagsScreen from '../screens/UserTagsScreen';
import HomeScreen from '../screens/HomeScreen';
import ActivitiesScreen from '../screens/ActivitiesScreen';
import ProfileScreen from '../screens/ProfileScreen';
import ChatScreen from '../screens/ChatScreen';
import EventDetailScreen from '../screens/EventDetailScreen';
import LoginScreen from '../screens/LoginScreen';
import CreateEventScreen from '../screens/CreateEventScreen';
import IconButton from '../components/ui/IconButton';

const Stack = createNativeStackNavigator();
const BottomTabs = createBottomTabNavigator();

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

function AppNavigator() {
  return (
    <Stack.Navigator 
      screenOptions={{
        headerShown: false
      }}
    >
      <Stack.Screen 
        name="Landing" 
        component={LandingScreen}
        options={{
        }} 
      />
      <Stack.Screen 
        name="Login" 
        component={LoginScreen}
        options={{
        }} 
      /> 
      <Stack.Screen 
        name="UserInfo" 
        component={UserInfoScreen}
        options={{
        }} 
      />
      <Stack.Screen 
        name="UserTags" 
        component={UserTagsScreen}
        options={{
        }} 
      />
      <Stack.Screen 
        name="UserOverview" 
        component={UserOverview}
        options={{
        }} 
      />
      <Stack.Screen 
        name="EventDetail" 
        component={EventDetailScreen}
        options={{
        }} 
      />
      <Stack.Screen 
        name="CreateEvent" 
        component={CreateEventScreen}
        options={{
          presentation: 'modal'
        }} 
      />
    </Stack.Navigator>
  )
}

export default AppNavigator;

const styles = StyleSheet.create({
  createEventBtn: {
    backgroundColor: '#1A4821',
    height: 58,
    width: 58,
    borderRadius: 29,
    justifyContent: 'center',
    alignItems: 'center'
  }
});