import { useState, useEffect, useContext } from 'react';
import { StyleSheet, View, Text, Pressable, Image } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { getFormattedDate } from '../../utils/date';
import { useNavigation } from '@react-navigation/native';
import { fetchActivity } from '../../utils/http';
import { AuthContext } from '../../store/context/auth-context';

function ActivitiesConfirmedCard({ eventId, eventHost, eventType, alreadyParticipatedNumber, eventName, eventStartTime, eventEndTime, sectorTags, gradeTags}) {
  const [isFetchingActivity, setIsFetchingActivity] = useState(false);
  const [eventParticipants, setEventParticipants] = useState([]);
  
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
    <Pressable onPress={directToEventDetails} style={({pressed}) => pressed && styles.pressed}>
      <View style={eventType === 'GROUP_EVENT' ? styles.groupContainer : styles.container}>
        {!isFetchingActivity && eventType === 'GROUP_EVENT' ? (
          <View style={styles.titleContainer}>
            <Text style={styles.title} numberOfLines={2}>{eventName}</Text>
          </View>
        ) :  null}
        {!isFetchingActivity && eventType === 'ONE_TO_ONE' ? (
          <Image source={{uri: eventParticipants && eventParticipants[0] ? eventParticipants[0].user.userImage[3] : eventHost.userImage[3]}} style={styles.avatar} />
        ) : null}
        <Text style={styles.time}>{eventStartTime.substring(11,16) + ' - ' + eventEndTime.substring(11,16)}</Text>
        <View style={styles.dateContainer}>
          <Text style={styles.date}>{getFormattedDate(eventStartTime, true)}</Text>
          {!isFetchingActivity && eventType === 'GROUP_EVENT' ? (
            <View style={styles.numContainer}>
              <Feather name="user" size={13} color="#FFAE10" />
              <Text style={styles.num}>{alreadyParticipatedNumber}</Text>
            </View>
          ) : null}
        </View>
      </View>
    </Pressable>
  );
};

export default ActivitiesConfirmedCard;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F1F5EF',
    alignItems: 'center',
    borderRadius: 8,
    marginHorizontal: 8,
    height: 113,
    width: 120
  },
  groupContainer: {
    backgroundColor: '#F1F5EF',
    alignItems: 'center',
    borderRadius: 8,
    marginHorizontal: 8,
    height: 113,
    width: 164
  },
  avatar: {
    width: 48,
    height: 48,
    marginVertical: 8,
    borderRadius: 42
  },
  time: {
    fontFamily: 'roboto-medium',
    color: '#3C8722',
    fontSize: 16
  },
  date: {
    color: '#3C8722',
    fontFamily: 'roboto-medium',
    fontSize: 13,
  },
  titleContainer: {
    height: 64,
    justifyContent: 'center'
  },
  title: {
    fontSize: 17,
    fontFamily: 'roboto-bold',
    color: '#1A1A1A',
    paddingHorizontal: 16,
  },
  dateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
    marginBottom: 8
  },
  numContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 8
  },
  num: {
    fontFamily: 'roboto',
    fontSize: 13,
    color: '#000000'
  },
  pressed: {
    opacity: 0.75
  }
});

