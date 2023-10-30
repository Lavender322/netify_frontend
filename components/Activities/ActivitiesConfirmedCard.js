import { useState, useEffect, useContext } from 'react';
import { StyleSheet, View, Text, Pressable, TouchableWithoutFeedback, Image } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { getFormattedDate } from '../../utils/date';
import { useNavigation } from '@react-navigation/native';
import { fetchActivity, fetchEvent } from '../../utils/http';
import { AuthContext } from '../../store/context/auth-context';
import GroupProfilePictures from '../GroupProfilePictures';

function ActivitiesConfirmedCard({ eventId, eventHost, eventType, eventName, eventStartTime, eventEndTime, sectorTags, gradeTags}) {
  const [isFetchingActivity, setIsFetchingActivity] = useState(false);
  const [eventParticipants, setEventParticipants] = useState([]);
  const [eventDetails, setEventDetails] = useState();
  
  // TO COMMENT OUT
  const { token, userInfo } = useContext(AuthContext);
  // const token = 'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIxNmE5YTZmMy02YjZkLTQ4ZGYtOTk2OS1hZDYxYWQ3ZDlkOGEiLCJpYXQiOjE2OTE3NDU2MTYsImV4cCI6MjU1NTc0NTYxNn0.c1hFaFFIxbI0dl8xq7kCRSMP1HAUZDCmsLeIQ6HFlxMnniypZveeiv4aopwNbLcK6zvp3ofod5G1B4Pu8A7FGg';
  
  const navigation = useNavigation();

  function directToEventDetails() {
    navigation.navigate('EventDetail', {
      eventId: eventId,
      sectorTags: sectorTags,
      gradeTags: gradeTags,
      eventParticipants: eventParticipants,
      previousScreen: 'Confirmed'
    });
  };

  useEffect(() => {
    async function getActivity() {
      setIsFetchingActivity(true);
      try {
        const activity = await fetchActivity(eventId, token);
        setEventParticipants(activity.participants);
      } catch (error) {
        console.log('fetchActivity', error);
        console.log(error.response.data);
      };
      setIsFetchingActivity(false);
    };
    
    if (userInfo.userId === eventHost.userId || eventType !== 'ONE_TO_ONE') {
      getActivity();
    };
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.avatarContainer}>
        {!isFetchingActivity && eventType === 'ONE_TO_ONE' && (
          <Image source={{uri: eventParticipants && eventParticipants[0] ? eventParticipants[0].user.userImage[3] : eventHost.userImage[3]}} style={styles.avatar} />
        )}
        {!isFetchingActivity && eventType === 'GROUP_EVENT' && (
          <GroupProfilePictures host={eventHost} participants={eventParticipants} isSeparate={true} />
        )}
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.title}>{eventType === 'ONE_TO_ONE' ? 'Your One to One session with ' : eventName}
          {!isFetchingActivity && eventType === 'ONE_TO_ONE' && (
            <Text style={styles.match}>{eventParticipants && eventParticipants[0] ? eventParticipants[0].user.localizedfirstname + ' ' + eventParticipants[0].user.localizedlastname :
            eventHost.localizedfirstname + ' ' + eventHost.localizedlastname}</Text>
          )}
        </Text>
        <View style={styles.detailInnerContainer}>
          <Feather name="calendar" size={18} color="#3C8722" />
          <Text style={styles.period}>{eventStartTime.substring(11,16) + ' - ' + eventEndTime.substring(11,16)}</Text>
          <Text style={styles.date}>{getFormattedDate(eventStartTime, true)}</Text>
        </View>
        
        <View style={styles.detailInnerContainer}>
          <TouchableWithoutFeedback>
            <Pressable onPress={directToEventDetails}>
              <Text style={styles.details}>Details</Text>
            </Pressable>
          </TouchableWithoutFeedback>
          <Feather name="chevron-right" size={24} color="#6A6A6A" />
        </View>
      </View> 
    </View>
  )
}

export default ActivitiesConfirmedCard;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    paddingVertical: 16,
    paddingHorizontal: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    shadowColor: '#0000001A',
    shadowOffset: {width: 4, height: 4},
    shadowOpacity: 0.8,
    shadowRadius: 10,
  },
  avatarContainer: {
    width: 60,
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30
  },
  textContainer: {
    flex: 1,
    padding: 4,
    marginLeft: 10,
  },
  title: {
    color: '#1A1A1A',
    fontSize: 16,
    fontFamily: 'roboto-bold',
    lineHeight: 21.8
  },
  match: {
    color: '#3C8722'
  },
  detailInnerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4
  }, 
  period: {
    color: '#3C8722',
    fontFamily: 'roboto-medium',
    fontSize: 16,
    marginHorizontal: 8
  },
  date: {
    color: '#3C8722',
    fontFamily: 'roboto-medium',
    fontSize: 16
  },
  details: {
    fontFamily: 'roboto',
    fontSize: 15,
    lineHeight: 18.2,
    color: '#6A6A6A',
    marginRight: 4,
    textDecorationLine: 'underline'
  },
});

