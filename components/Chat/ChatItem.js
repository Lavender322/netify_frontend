import { useContext, useEffect, useState } from 'react';
import { StyleSheet, View, Image, Pressable, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { getFormattedDate } from '../utils/date';
import { joinEvent } from '../utils/http';
import { AuthContext } from '../store/context/auth-context';
import LoadingOverlay from './ui/LoadingOverlay';

function ChatItem({ eventId, eventHost, myStateInTheEvent, eventStartTime, eventEndTime, sectorTags, gradeTags, onPress}) {
  const [eventHostSectorTag, setEventHostSectorTag] = useState();
  const [eventHostGradeTag, setEventHostGradeTag] = useState();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [eventStatus, setEventStatus] = useState(myStateInTheEvent);
  
  const navigation = useNavigation();

  function eventDetailHandler() {
    navigation.navigate('EventDetail', {
      eventId: eventId,
      sectorTags: sectorTags,
      gradeTags: gradeTags
    });
  };
 
  // TO COMMENT OUT
  const { token } = useContext(AuthContext);
  // const token = 'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIxNmE5YTZmMy02YjZkLTQ4ZGYtOTk2OS1hZDYxYWQ3ZDlkOGEiLCJpYXQiOjE2OTE3NDU2MTYsImV4cCI6MjU1NTc0NTYxNn0.c1hFaFFIxbI0dl8xq7kCRSMP1HAUZDCmsLeIQ6HFlxMnniypZveeiv4aopwNbLcK6zvp3ofod5G1B4Pu8A7FGg';

  useEffect(() => {
    if (eventHost && eventHost.userTag) {
      const eventHostGradeTag = gradeTags.filter((gradeTag) => {
        return eventHost.userTag.includes(gradeTag.tagId.toString());
      });
    
      const eventHostSectorTag = sectorTags.filter((sectorTag) => {
        return eventHost.userTag.includes(sectorTag.tagId.toString());
      });
  
      setEventHostGradeTag(eventHostGradeTag[0] && eventHostGradeTag[0].tagName);
      setEventHostSectorTag(eventHostSectorTag[0] && eventHostSectorTag[0].tagName);
    };
  }, [eventHost]);

  async function requestToJoinEventHandler(token, eventId) {
    setIsSubmitting(true);
    try {
      await joinEvent(token, eventId);
      setEventStatus('REQUESTED');
    } catch (error) {
      console.log("error", error);
      // setError('Could not save data - please try again later!');
    };
    setIsSubmitting(false);
  };

  return (
    <View style={styles.container}>
      <Pressable onPress={eventDetailHandler} style={({pressed}) => [styles.leftContainer, pressed && styles.pressed]}>
        <Image source={{uri: eventHost.userImage[3]}} style={styles.avatar} />
        <View style={styles.infoOuterContainer}>
          <Text style={styles.name}>{eventHost.localizedfirstname + ' ' + eventHost.localizedlastname}</Text>
          <View style={styles.infoInnerContainer}>
            <Text style={styles.grade}>{eventHostGradeTag ? eventHostGradeTag : '--'}</Text>
            <View style={styles.sectorContainer}>
              <Text style={styles.sector}>{eventHostSectorTag ? eventHostSectorTag : '--'}</Text>
            </View>
          </View>
          <View style={styles.infoInnerContainer}>
            <Text style={styles.period}>{eventStartTime.substring(11,16) + ' - ' + eventEndTime.substring(11,16)}</Text>
            <Text style={styles.date}>{getFormattedDate(eventStartTime)}</Text>
          </View>
        </View>
      </Pressable>
      <Pressable onPress={requestToJoinEventHandler.bind(this, token, eventId)} style={({pressed}) => pressed && styles.pressed}>
        {eventStatus === "REQUESTED" ? (
          <View style={[styles.statusContainer, styles.pendingContainer]}>
            <Text style={[styles.text, styles.pendingText]}>Pending</Text>
          </View>
        ) : (
          <View style={[styles.statusContainer, styles.requestContainer]}>
            <Text style={[styles.text, styles.requestText]}>Request</Text>
          </View>
        )}
      </Pressable>
    </View>
  )
}

export default ChatItem;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingVertical: 20,
    marginRight: 8,
    borderBottomColor: '#E0E0E0',
    borderBottomWidth: 1, 
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  leftContainer: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  avatar: {
    width: 60,
    height: 60,
    marginRight: 10,
    borderRadius: 30
  },
  infoOuterContainer: {
    padding: 4,
    marginRight: 30,
    justifyContent: 'space-between',
  },  
  name: {
    fontFamily: 'roboto-bold',
    fontSize: 16,
    color: '#1A1A1A',
  },
  infoInnerContainer: {
    flexDirection: 'row',
    alignItems: 'baseline',
    marginVertical: 1
  },
  grade: {
    color: '#3B4852',
    marginRight: 10,
    fontFamily: 'roboto-medium',
    fontSize: 12
  },
  sectorContainer: {
    backgroundColor: '#E9E9E9',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 2
  },
  sector: {
    color: '#3B4852',
    fontFamily: 'roboto-medium',
    fontSize: 12
  },
  period: {
    color: '#3C8722',
    fontSize: 16,
    fontFamily: 'roboto-medium',
    marginRight: 5
  },
  date: {
    color: '#3B4852',
    fontFamily: 'roboto-medium'
  },
  statusContainer: {
    paddingVertical: 6,
    paddingHorizontal: 16,
    borderRadius: 23
  },
  requestContainer: {
    backgroundColor: '#1A4821'
  },
  pendingContainer: {
    backgroundColor: '#6AA173'
  },
  text: {
    fontSize: 16,
    fontFamily: 'roboto'
  },
  requestText: {
    color: '#A6E291'
  },
  pendingText: {
    color: '#1A4821'
  },
  pressed: {
    opacity: 0.75
  }
});