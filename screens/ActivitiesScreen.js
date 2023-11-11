import { useState, useEffect, useContext } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { useIsFocused } from '@react-navigation/native';
import { fetchActivities, fetchTags } from '../utils/http';
import { AuthContext } from '../store/context/auth-context';
import ActivitiesReceivedCards from '../components/Activities/ActivitiesReceivedCards.js';

function ActivitiesScreen() {
  const [isFetchingReceivedActivities, setIsFetchingReceivedActivities] = useState(true);
  const [isFetchingConfirmedActivities, setIsFetchingConfirmedActivities] = useState(true);
  const [isFetchingSentActivities, setIsFetchingSentActivities] = useState(true);
  const [loadedReceivedActivities, setLoadedReceivedActivities] = useState([]);
  const [loadedConfirmedActivities, setLoadedConfirmedActivities] = useState([]);
  const [loadedSentActivities, setLoadedSentActivities] = useState([]);
  const [sectorTags, setSectorTags] = useState([]);
  const [gradeTags, setGradeTags] = useState([]);

  // TO COMMENT OUT
  const { token } = useContext(AuthContext);
  // const token = 'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIxNmE5YTZmMy02YjZkLTQ4ZGYtOTk2OS1hZDYxYWQ3ZDlkOGEiLCJpYXQiOjE2OTE3NDU2MTYsImV4cCI6MjU1NTc0NTYxNn0.c1hFaFFIxbI0dl8xq7kCRSMP1HAUZDCmsLeIQ6HFlxMnniypZveeiv4aopwNbLcK6zvp3ofod5G1B4Pu8A7FGg';

  const isFocused = useIsFocused();

  useEffect(() => {
    async function getActivityList() {
      setIsFetchingReceivedActivities(true);
      try {
        const activitiesList = await fetchActivities('received', token);
        const displayedActivitiesList = activitiesList.filter(activity => 
          activity.eventType !== 'GROUP_EVENT'
        );
        setLoadedReceivedActivities(displayedActivitiesList);
        // console.log("activitiesList", displayedActivitiesList);
      } catch (error) {
        console.log('fetchActivities', error);
        console.log(error.response.data);
      };
      setIsFetchingReceivedActivities(false);
    };
    
    getActivityList();
  }, [isFocused]);

  useEffect(() => {
    async function getActivityList() {
      setIsFetchingConfirmedActivities(true);
      try {
        const activitiesList = await fetchActivities('confirmed', token);
        setLoadedConfirmedActivities(activitiesList);
      } catch (error) {
        console.log('fetchActivities', error);
        console.log(error.response.data);
      };
      setIsFetchingConfirmedActivities(false);
    };
    
    getActivityList();
  }, [isFocused]);

  useEffect(() => {
    async function getActivityList() {
      setIsFetchingSentActivities(true);
      try {
        const activitiesList = await fetchActivities('sent', token);
        const displayedActivitiesList = activitiesList.filter(activity =>
          activity.eventType === "ONE_TO_ONE"
        );
        setLoadedSentActivities(displayedActivitiesList);
      } catch (error) {
        console.log('fetchActivities', error);
        console.log(error.response.data);
      };
      setIsFetchingSentActivities(false);
    };
    
    getActivityList();
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

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Activities</Text>
      <ActivitiesReceivedCards 
        activities={loadedReceivedActivities} 
        isFetchingActivities={isFetchingReceivedActivities} 
        loadedConfirmedActivities={loadedConfirmedActivities}
        isFetchingConfirmedActivities={isFetchingConfirmedActivities}
        loadedSentActivities={loadedSentActivities} 
        isFetchingSentActivities={isFetchingSentActivities}
        sectorTags={sectorTags} 
        gradeTags={gradeTags} 
      />
    </View>
  );
};

export default ActivitiesScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 16,
  },
  headerText: {
    fontSize: 24,
    fontFamily: 'roboto-bold',
    marginTop: 58,
    marginLeft: 20,
    marginBottom: 16,
    color: '#000000E5'
  }
});