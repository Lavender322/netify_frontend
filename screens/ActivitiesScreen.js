import { useState, useEffect, useContext } from 'react';
import { StyleSheet, View, Text, ScrollView, Pressable } from 'react-native';
import { useIsFocused } from '@react-navigation/native';
import ActivitiesReceivedCards from '../components/Activities/ActivitiesReceivedCards.js';
import { fetchActivities, fetchTags } from '../utils/http';
import { AuthContext } from '../store/context/auth-context';
import UpcomingActivity from '../components/Activities/UpcomingActivity.js';

function ActivitiesScreen({ navigation }) {
  const [isFetchingActivities, setIsFetchingActivities] = useState(true);
  const [loadedActivities, setLoadedActivities] = useState([]);
  const [sectorTags, setSectorTags] = useState([]);
  const [gradeTags, setGradeTags] = useState([]);

  // TO COMMENT OUT
  const { token } = useContext(AuthContext);
  // const token = 'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIxNmE5YTZmMy02YjZkLTQ4ZGYtOTk2OS1hZDYxYWQ3ZDlkOGEiLCJpYXQiOjE2OTE3NDU2MTYsImV4cCI6MjU1NTc0NTYxNn0.c1hFaFFIxbI0dl8xq7kCRSMP1HAUZDCmsLeIQ6HFlxMnniypZveeiv4aopwNbLcK6zvp3ofod5G1B4Pu8A7FGg';

  const isFocused = useIsFocused();

  useEffect(() => {
    async function getActivityList() {
      setIsFetchingActivities(true);
      try {
        const activitiesList = await fetchActivities('received', token);
        const displayedActivitiesList = activitiesList.filter(activity => 
          activity.eventType !== 'GROUP_EVENT'
        );
        setLoadedActivities(displayedActivitiesList);
        // console.log("activitiesList", displayedActivitiesList);
      } catch (error) {
        console.log('fetchActivities', error);
        console.log(error.response.data);
      };
      setIsFetchingActivities(false);
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
      <View style={styles.header}>
        {/* <ScrollView horizontal>
          <Pressable>
            <View style={[styles.categoryItemContainer, styles.categoryItemActiveContainer]}>
              <Text style={[styles.categoryText, styles.categoryActiveText]}>Received</Text>
            </View>
          </Pressable>
          <Pressable onPress={directToSentHandler}>
            <View style={[styles.categoryItemContainer, styles.categoryItemInactiveContainer]}>
              <Text style={[styles.categoryText, styles.categoryInactiveText]}>Sent</Text>
            </View>
          </Pressable>
          <Pressable onPress={directToConfirmedHandler}>
            <View style={[styles.categoryItemContainer, styles.categoryItemInactiveContainer]}>
              <Text style={[styles.categoryText, styles.categoryInactiveText]}>Confirmed</Text>
            </View>
          </Pressable>
        </ScrollView> */}
        <View style={styles.innerContainer}>
          <Text style={styles.title}>Upcoming activities</Text>
          <ScrollView horizontal style={styles.upcomingActivity}>
            <UpcomingActivity />
            <UpcomingActivity isGroupEvent />
            <UpcomingActivity />
          </ScrollView>
        </View>

        <View style={styles.innerContainer}>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>Received requests</Text>
          </View>
          <ActivitiesReceivedCards 
            activities={loadedActivities} 
            isFetchingActivities={isFetchingActivities} 
            sectorTags={sectorTags} 
            gradeTags={gradeTags} 
          />
        </View>

        <View style={styles.innerContainer}>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>Sent requests</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default ActivitiesScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 16,
  },
  header: {
    // height: 48,
  },
  headerText: {
    fontSize: 24,
    fontFamily: 'roboto-bold',
    marginTop: 58,
    marginLeft: 20,
    marginBottom: 16,
    color: '#000000E5'
  },
  categoryItemContainer: {
    height: 48,
    paddingHorizontal: 16,
    borderBottomWidth: 2,
    justifyContent: 'center'
  },
  categoryItemActiveContainer: {
    borderBottomColor: '#3C8722'
  },
  categoryItemInactiveContainer: {
    borderBottomColor: '#C6C6C6'
  },
  categoryText: {
    fontFamily: 'roboto-medium',
    fontSize: 15,
    lineHeight: 21
  },
  categoryInactiveText: {
    color: '#6A6A6A'
  },
  categoryActiveText: {
    color: '#3C8722'
  },
  // mainContainer: {
  //   flex: 1,
  // },
  title: {
    fontFamily: 'roboto-bold',
    color: '#1A1A1A',
    fontSize: 17,
    marginBottom: 16,
    paddingHorizontal: 8,
  },
  titleContainer: {
    borderBottomColor: '#E9E9E9',
    borderBottomWidth: 1
  },
  innerContainer: {
    borderRadius: 8,
    backgroundColor: '#fff',
    paddingTop: 16,
    paddingBottom: 24,
    shadowColor: '#0000001A',
    shadowOffset: {width: 4, height: 4},
    shadowOpacity: 0.8,
    shadowRadius: 10,
    marginBottom: 36
  },
  upcomingActivity: {
    paddingHorizontal: 8,
  }
});