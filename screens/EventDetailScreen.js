import { useEffect, useState, useContext } from 'react';
import { StyleSheet, Text, View, Image, Pressable, ScrollView } from 'react-native';
import { Feather } from '@expo/vector-icons';
import IconButton from '../components/ui/IconButton';
import { fetchEvent, joinEvent } from '../utils/http';
import { AuthContext } from '../store/context/auth-context';
import LoadingOverlay from '../components/ui/LoadingOverlay';
import { getFormattedDate } from '../utils/date';

function EventDetailScreen({ navigation, route }) {
  const [isFetching, setIsFetching] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [eventDetails, setEventDetails] = useState();
  const [eventHostSectorTag, setEventHostSectorTag] = useState();
  const [eventHostGradeTag, setEventHostGradeTag] = useState();

  function previousStepHandler() {
    navigation.goBack();
  };

  const eventId = route.params?.eventId;
  const sectorTags = route.params?.sectorTags;
  const gradeTags = route.params?.gradeTags;
  const previousScreen = route.params?.previousScreen;
  const showRequest = route.params?.showRequest;
  const eventParticipants = route.params?.eventParticipants;

  // TO COMMENT OUT
  const { token } = useContext(AuthContext);
  // const token = 'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIxNmE5YTZmMy02YjZkLTQ4ZGYtOTk2OS1hZDYxYWQ3ZDlkOGEiLCJpYXQiOjE2OTE3NDU2MTYsImV4cCI6MjU1NTc0NTYxNn0.c1hFaFFIxbI0dl8xq7kCRSMP1HAUZDCmsLeIQ6HFlxMnniypZveeiv4aopwNbLcK6zvp3ofod5G1B4Pu8A7FGg';

  useEffect(() => {
    async function getEventDetails() {
      setIsFetching(true);
      try {
        const eventDetails = await fetchEvent(token, eventId);
        setEventDetails(eventDetails);
        // console.log("eventDetails", eventDetails);
      } catch (error) {
        console.log(error.response.data);
      };
      setIsFetching(false);
    };

    getEventDetails();
  }, [eventId]);

  useEffect(() => {
    if (eventDetails && eventDetails.eventHost.userTag && gradeTags.length && sectorTags.length) {
      const eventHostGradeTag = gradeTags.filter((gradeTag) => {
        return eventDetails.eventHost.userTag.includes(gradeTag.tagId);
      });
    
      const eventHostSectorTag = sectorTags.filter((sectorTag) => {
        return eventDetails.eventHost.userTag.includes(sectorTag.tagId);
      });
  
      setEventHostGradeTag(eventHostGradeTag[0] && eventHostGradeTag[0].tagName);
      setEventHostSectorTag(eventHostSectorTag[0] && eventHostSectorTag[0].tagName);
    };
  }, [eventDetails, gradeTags, sectorTags]);

  async function requestToJoinEventHandler(token, eventId) {
    setIsSubmitting(true);
    try {
      await joinEvent(token, eventId);
      navigation.goBack();
    } catch (error) {
      // setError('Could not save data - please try again later!');
      console.log("error", error);
      setIsSubmitting(false);
    };
  };

  function cancelEventHandler() {
    navigation.navigate('CancelEvent', {
      eventId: eventId,
      sectorTags: sectorTags,
      gradeTags: gradeTags,
      eventParticipants: eventParticipants,
      eventDetails: eventDetails
    });
  };

  function directToMessageHandler() {

  };

  if (isFetching || isSubmitting) {
    return <LoadingOverlay />;
  };

  return (
    <View style={styles.container}>
      <IconButton icon="arrow-left" size={24} color="black" style={styles.goBackButton} onPress={previousStepHandler}/>
      <ScrollView style={styles.mainContainer}>
        <Text style={styles.headerText}>{eventDetails.eventName}</Text> 
        {/* two images for confirmed 121 */}
        
        {previousScreen === 'Confirmed' && eventDetails.eventType === 'ONE_TO_ONE' ? (
          <View style={styles.avatarsContainer}>
            <Image source={{uri: eventDetails.eventHost.userImage[3]}} style={styles.avatar} />
            <Image source={{uri: eventParticipants[0].user.userImage[3]}} style={[styles.avatar, styles.avatarRight]} />
          </View>
        ) : (
          <Image source={{uri: eventDetails.eventHost.userImage[3]}} style={styles.avatar} />
        )}
        {previousScreen === 'Confirmed' && eventDetails.eventType === 'ONE_TO_ONE' && eventParticipants.length ? (
          <Text style={styles.name}>Your One to One session with 
            <Text style={styles.match}>{' ' + eventParticipants[0].user.localizedfirstname + ' ' + eventParticipants[0].user.localizedlastname}</Text>
            <Text> is booked in</Text>
          </Text>
        ) : (
          <Text style={styles.name}>{eventDetails.eventHost.localizedfirstname + ' ' + eventDetails.eventHost.localizedlastname}</Text>
        )}
        {!(previousScreen === 'Confirmed' && eventDetails.eventType === 'ONE_TO_ONE') && (
          <View style={[styles.detailInnerContainer, styles.roleContainer]}>
            <Text style={styles.grade}>{eventHostGradeTag ? eventHostGradeTag : '--'}</Text> 
            <View style={styles.sectorContainer}>
              <Text style={styles.sector}>{eventHostSectorTag ? eventHostSectorTag : '--'}</Text>
            </View>
          </View>
        )}
        <View style={[styles.detailInnerContainer, styles.timeContainer]}>
          <Feather name="calendar" size={18} color="#3C8722" />
          <Text style={styles.period}>{eventDetails.eventStartTime.substring(11,16) + ' - ' + eventDetails.eventEndTime.substring(11,16)}</Text>
          <Text style={styles.date}>{getFormattedDate(eventDetails.eventStartTime, true)}</Text>
        </View>
        {eventDetails.eventLocation && eventDetails.eventLocation !== '' && (
          <View style={[styles.detailInnerContainer, styles.locationContainer]}>
            <Feather name="map-pin" size={18} color="black" />
            <Text style={styles.location}>{eventDetails.eventLocation}</Text>
          </View>
        )}
        {eventDetails.eventDescription && (
          <Text style={styles.detail}>{eventDetails.eventDescription}</Text>      
        )}
        {previousScreen === 'Confirmed' && (
          <Pressable onPress={cancelEventHandler}>
            <Text style={styles.cancel}>Cancel</Text>
          </Pressable>
        )}
        {previousScreen === 'Sent' && (
          <Pressable onPress={cancelEventHandler}>
            <Text style={styles.cancel}>Withdraw</Text>
          </Pressable>
        )}
      </ScrollView>
      {previousScreen === 'Home' && showRequest && (
        <View style={styles.submitFormContainer}>
          <Pressable onPress={requestToJoinEventHandler.bind(this, token, eventId)} style={({pressed}) => pressed && styles.pressed}>
            <View style={styles.submitBtnContainer}>
              <Text style={styles.submitBtnText}>Request</Text>
            </View>
          </Pressable>
        </View>
      )}
      {previousScreen === 'Confirmed' && (
        <View style={styles.submitFormContainer}>
          <Pressable onPress={directToMessageHandler} style={({pressed}) => pressed && styles.pressed}>
            <View style={styles.submitBtnContainer}>
              <Text style={styles.submitBtnText}>Message</Text>
            </View>
          </Pressable>
        </View>
      )}
    </View>
  )
}

export default EventDetailScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  goBackButton: {
    marginTop: 56,
    marginLeft: 16
  },
  mainContainer: {
    padding: 16,
    flex: 1,
    marginHorizontal: 16,
    marginBottom: 20,
  },
  headerText: {
    marginTop: 24,
    fontSize: 28,
    fontFamily: 'roboto-bold'
  },
  avatarsContainer: {
    flexDirection: 'row'
  },  
  avatar: {
    width: 120,
    height: 120,
    marginVertical: 36,
    borderRadius: 66,
    overflow: 'hidden',
    borderWidth: 3,
    borderColor: '#ffffff'
  },
  avatarRight: {
    zIndex: 9,
    marginLeft: -40
  },
  match: {
    color: '#3C8722'
  },
  name: {
    fontFamily: 'roboto-bold',
    fontSize: 20,
    lineHeight: 26,
    color: '#000000E5',
  },
  detailInnerContainer: {
    flexDirection: 'row',
    alignItems: 'center'
  },  
  roleContainer: {
    marginTop: 12,
  },
  timeContainer: {
    marginTop: 16
  },
  grade: {
    fontFamily: 'roboto-medium',
    fontSize: 16,
    color: '#000000E5',
    marginRight: 12
  },
  sectorContainer: {
    borderRadius: 6,
    paddingVertical: 4,
    paddingHorizontal: 16,
    backgroundColor: '#E6E6E6'
  },
  sector: {
    color: '#3B4852',
    fontFamily: 'roboto-medium'
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
  locationContainer: {
    marginTop: 8
  },
  location: {
    fontFamily: 'roboto-medium',
    fontSize: 16,
    color: '#191919',
    marginLeft: 4
  },
  detail: {
    color: '#4F4F4F',
    fontFamily: 'roboto',
    lineHeight: 22,
    fontSize: 15,
    marginTop: 16
  },
  cancel: {
    color: '#1A4821',
    fontFamily: 'roboto',
    fontSize: 16,
    textDecorationLine: 'underline',
    marginTop: 36
  }, 
  submitFormContainer: {
    paddingBottom: 80,
    paddingTop: 16,
    paddingHorizontal: 12,
    backgroundColor: 'white'
  },
  submitFormText: {
    fontSize: 16,
    color: '#000000E5',
    marginBottom: 10,
    textAlign: 'center',
    fontFamily: 'roboto'
  },
  submitBtnContainer: {
    backgroundColor: '#1A4821',
    borderRadius: 8,
    paddingVertical: 13,
  },
  submitBtnText: {
    color: 'white',
    fontSize: 16,
    fontFamily: 'roboto-medium',
    textAlign: 'center'
  },
  pressed: {
    opacity: 0.75
  }
});