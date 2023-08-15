import { useEffect, useState, useContext } from 'react';
import { StyleSheet, Text, View, Image, Pressable, ScrollView } from 'react-native';
import { Feather } from '@expo/vector-icons';
import IconButton from '../components/ui/IconButton';
import { fetchEvent } from '../utils/http';
import { AuthContext } from '../store/context/auth-context';
import LoadingOverlay from '../components/ui/LoadingOverlay';
import { getFormattedDate } from '../utils/date';

function EventDetailScreen({ navigation, route }) {
  const [isFetching, setIsFetching] = useState(true);
  const [eventDetails, setEventDetails] = useState();
  const [eventHostSectorTag, setEventHostSectorTag] = useState();
  const [eventHostGradeTag, setEventHostGradeTag] = useState();

  function previousStepHandler() {
    navigation.goBack();
  };

  const eventId = route.params?.eventId;
  const sectorTags = route.params?.sectorTags;
  const gradeTags = route.params?.gradeTags;

  // const { token } = useContext(AuthContext);
  const token = 'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIxNmE5YTZmMy02YjZkLTQ4ZGYtOTk2OS1hZDYxYWQ3ZDlkOGEiLCJpYXQiOjE2OTE3NDU2MTYsImV4cCI6MjU1NTc0NTYxNn0.c1hFaFFIxbI0dl8xq7kCRSMP1HAUZDCmsLeIQ6HFlxMnniypZveeiv4aopwNbLcK6zvp3ofod5G1B4Pu8A7FGg';

  useEffect(() => {
    async function getEventDetails() {
      setIsFetching(true);
      try {
        const eventDetails = await fetchEvent(token, eventId);
        setEventDetails(eventDetails);
      } catch (error) {
        console.log(error.response.data);
      };
      setIsFetching(false);
    };

    getEventDetails();
  }, [eventId]);

  useEffect(() => {
    if (eventDetails && gradeTags.length && sectorTags.length) {
      const eventHostGradeTag = gradeTags.filter((gradeTag) => {
        return eventDetails.eventHost.userTag.includes(gradeTag.id.toString());
      });
    
      const eventHostSectorTag = sectorTags.filter((sectorTag) => {
        return eventDetails.eventHost.userTag.includes(sectorTag.id.toString());
      });
  
      setEventHostGradeTag(eventHostGradeTag[0].tagName);
      setEventHostSectorTag(eventHostSectorTag[0].tagName);
    };
  }, [eventDetails, gradeTags, sectorTags]);

  if (isFetching) {
    return <LoadingOverlay />;
  };

  return (
    <View style={styles.container}>
      <IconButton icon="arrow-left" size={24} color="black" style={styles.goBackButton} onPress={previousStepHandler}/>
      <ScrollView style={styles.mainContainer}>
        <Text style={styles.headerText}>{eventDetails.eventName}</Text> 
        <Image source={{uri: eventDetails.eventHost.userImage[3]}} style={styles.avatar} />
        <Text style={styles.name}>{eventDetails.eventHost.localizedfirstname + ' ' + eventDetails.eventHost.localizedlastname}</Text>
        <View style={[styles.detailInnerContainer, styles.roleContainer]}>
          <Text style={styles.grade}>{eventHostGradeTag}</Text>
          <View style={styles.sectorContainer}>
            <Text style={styles.sector}>{eventHostSectorTag}</Text>
          </View>
        </View>
        <View style={styles.detailInnerContainer}>
          <Feather name="calendar" size={18} color="#3C8722" />
          <Text style={styles.period}>{eventDetails.eventStartTime.substring(11,16) + ' - ' + eventDetails.eventEndTime.substring(11,16)}</Text>
          <Text style={styles.date}>{getFormattedDate(eventDetails.eventStartTime, true)}</Text>
        </View>
        <View style={[styles.detailInnerContainer, styles.locationContainer]}>
          <Feather name="map-pin" size={18} color="black" />
          <Text style={styles.location}>London</Text>
        </View>
        <Text style={styles.detail}>{eventDetails.eventDescription}</Text>      
      </ScrollView>
      <View style={styles.submitFormContainer}>
        <Pressable onPress={() => {}} style={({pressed}) => pressed && styles.pressed}>
          <View style={styles.submitBtnContainer}>
            <Text style={styles.submitBtnText}>Book this session</Text>
          </View>
        </Pressable>
      </View>
    </View>
  )
}

export default EventDetailScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // padding: 16,
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
    marginTop: 32,
    fontSize: 28,
    fontFamily: 'roboto-bold'
  },
  avatar: {
    width: 120,
    height: 120,
    marginVertical: 36,
    borderRadius: 66
  },
  name: {
    fontFamily: 'roboto-bold',
    fontSize: 20,
    color: '#000000E5'
  },
  detailInnerContainer: {
    flexDirection: 'row',
    alignItems: 'center'
  },  
  roleContainer: {
    marginTop: 12,
    marginBottom: 16
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
    marginTop: 8,
    marginBottom: 16
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
    fontSize: 15
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