import { useEffect, useState, useContext, useRef } from 'react';
import { StyleSheet, View, Text, Pressable, TouchableWithoutFeedback } from 'react-native';
import { useIsFocused } from '@react-navigation/native';
import Constants from 'expo-constants';
import * as Device from 'expo-device'
import { AuthContext } from '../store/context/auth-context';
import { fetchOverallEventStatus, fetchEventList, fetchTags, addPushToken } from '../utils/http';
import EventsList from '../components/Home/EventsList';
import EventFilters from '../components/Home/EventFilters';
import LoadingOverlay from '../components/ui/LoadingOverlay';
import * as Notifications from 'expo-notifications';

async function registerForPushNotificationsAsync() {
  let token;

  if (Platform.OS === 'android') {
    Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.DEFAULT,
    });
  };

  if (Device.isDevice) {
    const { status } = await Notifications.getPermissionsAsync();
    let finalStatus = status;

    if (finalStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    };

    if (finalStatus !== 'granted') {
      Alert.alert(
        'Permission required',
        'Push notifications need the appropriate permissions.'
      );
      return;
    };

    // First time login call this
    token = await Notifications.getExpoPushTokenAsync({
      projectId: Constants.expoConfig.extra.eas.projectId,
    });
    // console.log('pushTokenData', token);

    return token.data;
  };
};

function HomeScreen({ navigation }) {
  const [isFetching, setIsFetching] = useState(true);
  const [isFetchingEvents, setIsFetchingEvents] = useState(true);
  const [confirmedEvents, setConfirmedEvents] = useState(null);
  const [pendingRequests, setPendingRequests] = useState(null);
  const [receivedInvitations, setReceivedInvitations] = useState(null);
  const [loadedEvents, setLoadedEvents] = useState([]);
  const [sectorTags, setSectorTags] = useState([]);
  const [gradeTags, setGradeTags] = useState([]);
  const [selectedGrade, setSelectedGrade] = useState([]);
  const [selectedIndustry, setSelectedIndustry] = useState([]);
  const [selectedGroup, setSelectedGroup] = useState([]);
  const [updateEventList, setUpdateEventList] = useState(false);
  const [count, setCount] = useState(0);
  const [expoPushToken, setExpoPushToken] = useState();
  const [notification, setNotification] = useState(false);
  const notificationListener = useRef();
  const responseListener = useRef();

  // TO COMMENT OUT
  const { token, userInfo, logout, setIsDevServer, isDevServer } = useContext(AuthContext);
  // const { userInfo } = useContext(AuthContext);
  // const token = 'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIxNmE5YTZmMy02YjZkLTQ4ZGYtOTk2OS1hZDYxYWQ3ZDlkOGEiLCJpYXQiOjE2OTE3NDU2MTYsImV4cCI6MjU1NTc0NTYxNn0.c1hFaFFIxbI0dl8xq7kCRSMP1HAUZDCmsLeIQ6HFlxMnniypZveeiv4aopwNbLcK6zvp3ofod5G1B4Pu8A7FGg';

  const isFocused = useIsFocused();

  useEffect(() => {
    registerForPushNotificationsAsync().then(token => setExpoPushToken(token));

    notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
      setNotification(notification);
    });

    responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
      console.log(response);
    });

    return () => {
      Notifications.removeNotificationSubscription(notificationListener.current);
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);

  useEffect(() => {
    if (expoPushToken) {
      async function addPushNotificationsToken() {
        try {
          await addPushToken(expoPushToken, token);
        } catch (error) {
          console.log('addPushToken', error);
          console.log(error.response.data);
        };
      };
      
      addPushNotificationsToken();
    };
  }, [expoPushToken])

  useEffect(() => {
    async function getOverallEventStatus() {
      setIsFetching(true);
      try {
        const eventStatus = await fetchOverallEventStatus(token);
        setConfirmedEvents(eventStatus.confirmedEvents);
        setPendingRequests(eventStatus.pendingEventRequests);
        setReceivedInvitations(eventStatus.invitationsReceived);
      } catch (error) {
        console.log('fetchOverallEventStatus', error);
        console.log(error.response.data);
      };
      setIsFetching(false);
    };

    getOverallEventStatus();
  }, [isFocused]);

  useEffect(() => {
    async function getTags() {
      // setIsFetching(true);
      try {
        const tags = await fetchTags();
        const fetchedSectorTags = tags.filter(
          tag => tag.tagType === 'team'
        );
        const fetchedGradeTags = tags.filter(
          tag => tag.tagType === 'grade'
        );
        setSectorTags(fetchedSectorTags);
        setGradeTags(fetchedGradeTags);
      } catch (error) {
        console.log('fetchTags', error);
        console.log(error.response.data);
      };
      // setIsFetching(false);
    };

    getTags();
  }, []);

  useEffect(() => {
    async function getEventList() {
      setIsFetchingEvents(true);
      try {
        const eventList = await fetchEventList(selectedGrade, selectedIndustry, selectedGroup, token);
        setLoadedEvents(eventList);
        // console.log("eventList", eventList)
      } catch (error) {
        console.log('fetchEventList', error);
        console.log(error.response.data);
      };
      setIsFetchingEvents(false);
    };
    
    getEventList();
  }, [isFocused]);

  useEffect(() => {
    if (updateEventList) {
      async function getEventList() {
        setIsFetchingEvents(true);
        try {
          const eventList = await fetchEventList(selectedGrade, selectedIndustry, selectedGroup, token);
          setLoadedEvents(eventList);
        } catch (error) {
          console.log('fetchEventList', error);
          console.log(error.response.data);
        };
        setIsFetchingEvents(false);
      };
      
      getEventList();
      setUpdateEventList(false);
    };
  }, [updateEventList]);

  // async function scheduleNotificationHandler() {
  //   Notifications.scheduleNotificationAsync({
  //     content: {
  //       title: 'My first local Notification', 
  //       body: 'This is the body of the notification.',
  //       data: { userName: 'Max' }
  //     },
  //     trigger: {
  //       seconds: 5
  //     }
  //   });
  // };

  function directToActivities() {
    navigation.navigate('Activities');
  };
  
  // function directToRequestedActivities() {
  //   navigation.navigate('Activities', {screen: 'ActivitiesSent'});
  // };
  
  // function directToReceivedActivities() {
  //   navigation.navigate('Activities', {screen: 'ActivitiesReceived'});
  // };

  function envChangeHandler() {
    setCount(count+1);
  };

  useEffect(() => {
    if (count === 10) {
      BACKEND_URL = 'https://netify.iqust.top';
      setIsDevServer(true);
      setCount(0);
      logout();
    };
  }, [count]);

  if (isFetching) {
    return <LoadingOverlay />
  };

  return (
    <View style={styles.container}>
      <TouchableWithoutFeedback onPress={envChangeHandler}>
        <Text style={[styles.headerText, isDevServer ? styles.devServer : styles.prodServer]}>Hi, {userInfo.localizedfirstname}</Text>
      </TouchableWithoutFeedback>
      {/* <Button title='Schedule' onPress={scheduleNotificationHandler} /> */}
      <View style={styles.outerPanelContainer}>
        <View style={[styles.innerPanelContainer, styles.innerPanel]}>
          <Pressable onPress={directToActivities}>
            <Text style={styles.panelNumber}>{confirmedEvents}</Text> 
          </Pressable>
          <Pressable onPress={directToActivities}>
            <Text style={styles.panelText}>{confirmedEvents === 1 ? "Upcoming Activity" : "Upcoming Activities"}</Text> 
          </Pressable>
        </View>
        <View style={[styles.innerPanelContainer, styles.innerPanel]}>
          <Pressable onPress={directToActivities}>
            <Text style={styles.panelNumber}>{pendingRequests}</Text> 
          </Pressable>
          <Pressable onPress={directToActivities}>
            <Text style={styles.panelText}>{pendingRequests === 1 ? "Sent Request" : "Sent Requests"}</Text> 
          </Pressable>
        </View>
        <View style={styles.innerPanelContainer}>
          <Pressable onPress={directToActivities}>
            <Text style={styles.panelNumber}>{receivedInvitations}</Text> 
          </Pressable>
          <Pressable onPress={directToActivities}>
            <Text style={styles.panelText}>{receivedInvitations === 1 ? "Received request" : "Received requests"}</Text> 
          </Pressable>
        </View>
      </View>

      <EventFilters 
        style={styles.eventFilters} 
        setSelectedGrade={setSelectedGrade} 
        setSelectedIndustry={setSelectedIndustry}
        setSelectedGroup={setSelectedGroup}
        selectedGroup={selectedGroup}
        setUpdateEventList={setUpdateEventList} 
      />
      
      <EventsList 
        events={loadedEvents} 
        isFetchingEvents={isFetchingEvents} 
        sectorTags={sectorTags} 
        gradeTags={gradeTags} 
      />
    </View>
  )
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 16,
    paddingHorizontal: 7
  },
  headerText: {
    fontSize: 24,
    fontFamily: 'roboto-bold',
    marginTop: 58,
    marginLeft: 13,
  },
  devServer: {
    color: '#587505'
  },
  prodServer: {
    color: '#000000E5'
  },
  outerPanelContainer: {
    flexDirection: 'row',
    width: '100%',
    backgroundColor: '#fff',
    borderRadius: 15,
    marginTop: 16,
    paddingVertical: 16
  },
  innerPanelContainer: {
    flex: 1,
    paddingHorizontal: 16
  },
  innerPanel: {
    borderRightColor: '#D9D9D9',
    borderRightWidth: 1,
  },
  panelNumber: {
    fontSize: 24,
    fontFamily: 'roboto-bold',
    color: '#1A1A1A',
    marginBottom: 8
  },
  panelText: {
    color: '#6F8698',
    fontSize: 13,
    fontFamily: 'roboto-medium'
  },
  eventFilters: {
    zIndex: 100,
  }
});