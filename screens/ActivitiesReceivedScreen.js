import { useState, useEffect, useContext } from 'react';
import { StyleSheet, View, Text, ScrollView, Pressable } from 'react-native';
import ActivitiesReceivedCards from '../components/Activities/ActivitiesReceivedCards.js';
import ActivitiesReceivedList from '../components/Activities/ActivitiesReceivedList';
import { fetchActivities, fetchTags } from '../utils/http';
import { AuthContext } from '../store/context/auth-context';

function ActivitiesReceivedScreen({ navigation }) {
  const [isFetchingActivities, setIsFetchingActivities] = useState(true);
  const [loadedActivities, setLoadedActivities] = useState([]);
  const [sectorTags, setSectorTags] = useState([]);
  const [gradeTags, setGradeTags] = useState([]);

  // TO COMMENT OUT
  const { token } = useContext(AuthContext);
  // const token = 'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIxNmE5YTZmMy02YjZkLTQ4ZGYtOTk2OS1hZDYxYWQ3ZDlkOGEiLCJpYXQiOjE2OTE3NDU2MTYsImV4cCI6MjU1NTc0NTYxNn0.c1hFaFFIxbI0dl8xq7kCRSMP1HAUZDCmsLeIQ6HFlxMnniypZveeiv4aopwNbLcK6zvp3ofod5G1B4Pu8A7FGg';

  useEffect(() => {
    async function getActivityList() {
      setIsFetchingActivities(true);
      try {
        const activitiesList = await fetchActivities('received', token);
        setLoadedActivities(activitiesList);
        // console.log("activitiesList", activitiesList);
      } catch (error) {
        console.log(error.response.data);
      };
      setIsFetchingActivities(false);
    };
    
    getActivityList();
  }, []);

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
        console.log(error.response.data);
      };
      // setIsFetching(false);
    };

    getTags();
  }, []);

  function directToSentHandler() {
    navigation.navigate('ActivitiesSent');
  };

  function directToConfirmedHandler() {
    navigation.navigate('ActivitiesConfirmed');
  };

  function directToPastHandler() {
    navigation.navigate('ActivitiesPast');
  };

  function directToCancelledHandler() {
    navigation.navigate('ActivitiesCancelled');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Activities</Text>
      <View style={styles.header}>
        <ScrollView horizontal>
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
          <Pressable onPress={directToPastHandler}>
            <View style={[styles.categoryItemContainer, styles.categoryItemInactiveContainer]}>
              <Text style={[styles.categoryText, styles.categoryInactiveText]}>Past</Text>
            </View>
          </Pressable>
          <Pressable onPress={directToCancelledHandler}>
            <View style={[styles.categoryItemContainer, styles.categoryItemInactiveContainer]}>
              <Text style={[styles.categoryText, styles.categoryInactiveText]}>Cancelled</Text>
            </View>
          </Pressable>
        </ScrollView>
      </View>
      <View style={styles.mainContainer}>
        <ActivitiesReceivedCards 
          activities={loadedActivities} 
          isFetchingActivities={isFetchingActivities} 
          sectorTags={sectorTags} 
          gradeTags={gradeTags} 
        />
        {/* <Text style={styles.note}>Here is a list of people who are keen to meet you at your proposed time slot!</Text>
        <ActivitiesReceivedList 
          activities={loadedActivities} 
          isFetchingActivities={isFetchingActivities} 
          sectorTags={sectorTags} 
          gradeTags={gradeTags} 
        /> */}
      </View>
    </View>
  )
}

export default ActivitiesReceivedScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 16,
  },
  header: {
    height: 48,
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
  mainContainer: {
    flex: 1,
  },
  note: {
    color: '#3B4852',
    fontFamily: 'roboto',
    fontSize: 15,
    lineHeight: 20,
    padding: 8
  }
});