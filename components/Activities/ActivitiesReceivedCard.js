import { useState, useEffect, useContext } from 'react';
import { StyleSheet, View, Text, Pressable, TouchableWithoutFeedback } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { getFormattedDate } from '../../utils/date';
import { useNavigation, useIsFocused } from '@react-navigation/native';
import { fetchActivity } from '../../utils/http';
import { AuthContext } from '../../store/context/auth-context';
import ActivitiesReceivedList from './ActivitiesReceivedList';

function ActivitiesReceivedCard({ eventId, eventHost, eventType, eventName, eventStartTime, eventEndTime, sectorTags, gradeTags}) {
  const [isFetchingApplications, setIsFetchingApplications] = useState(true);
  const [loadedApplications, setLoadedApplications] = useState([]);
  const [isExpanded, setIsExpanded] = useState(false);

  // TO COMMENT OUT
  const { token } = useContext(AuthContext);
  // const token = 'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIxNmE5YTZmMy02YjZkLTQ4ZGYtOTk2OS1hZDYxYWQ3ZDlkOGEiLCJpYXQiOjE2OTE3NDU2MTYsImV4cCI6MjU1NTc0NTYxNn0.c1hFaFFIxbI0dl8xq7kCRSMP1HAUZDCmsLeIQ6HFlxMnniypZveeiv4aopwNbLcK6zvp3ofod5G1B4Pu8A7FGg';  
  
  const isFocused = useIsFocused();
  const navigation = useNavigation();

  useEffect(() => {
    async function getActivity() {
      setIsFetchingApplications(true);
      try {
        const activity = await fetchActivity(eventId, token);
        const applicants = activity.participants.filter((applicant) => {
          return applicant.participantState === 'REQUESTED'
        });
        if (applicants.length) {
          setLoadedApplications(applicants);
        }
      } catch (error) {
        console.log(error.response.data);
      };
      setIsFetchingApplications(false);
    };
    
    getActivity();
  }, [isFocused]);

  function cardToggleHandler() {
    setIsExpanded(!isExpanded);
  };

  function directToEventDetails() {
    navigation.navigate('EventDetail', {
      eventId: eventId,
      sectorTags: sectorTags,
      gradeTags: gradeTags,
      previousScreen: 'Received'
    });
  };

  return (
    <View>
      <Pressable onPress={cardToggleHandler}>
        <View style={styles.container}>
          <View>
            <Text style={styles.title}>{eventType === 'ONE_TO_ONE' ? 'Your One to One session' : eventName}</Text>
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

          <View style={styles.innerContainer}>
            {/* <View style={styles.numberContainer}>
              <Text style={styles.number}>1</Text>
            </View> */}
            <Feather name={isExpanded ? "chevron-up" : "chevron-down"} size={24} color="#6A6A6A" />
          </View>
        </View>
      </Pressable>

      {isExpanded && (
        <View>
          {loadedApplications && loadedApplications.length && !isFetchingApplications ? (
            <Text style={styles.note}>Here is a list of people who are keen to meet you at your proposed time slot!</Text>
          ) : null}
          <ActivitiesReceivedList 
            applications={loadedApplications} 
            isFetchingApplications={isFetchingApplications} 
            eventId={eventId}
            sectorTags={sectorTags} 
            gradeTags={gradeTags} 
          /> 
        </View>
      )}
    </View>
  )
}

export default ActivitiesReceivedCard;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    paddingVertical: 16,
    paddingRight: 8,
    paddingLeft: 4,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    shadowColor: '#0000001A',
    shadowOffset: {width: 4, height: 4},
    shadowOpacity: 0.8,
    shadowRadius: 10,
  },
  title: {
    color: '#1A1A1A',
    fontSize: 16,
    fontFamily: 'roboto-bold',
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
  innerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  numberContainer: {
    backgroundColor: '#EC2323',
    width: 24,
    height: 24,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 8
  },
  number: {
    color: '#FFFFFF',
    fontFamily: 'roboto-medium',
    fontSize: 15
  },
  note: {
    color: '#3B4852',
    fontFamily: 'roboto',
    fontSize: 15,
    lineHeight: 20,
    padding: 8
  }
});

