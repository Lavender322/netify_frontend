import { StyleSheet, View, Text, ScrollView, Pressable, TouchableWithoutFeedback } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { getFormattedDate } from '../../utils/date';
import { useNavigation } from '@react-navigation/native';

function ActivitiesCard({ eventId, eventHost, eventType, eventName, eventStartTime, eventEndTime, sectorTags, gradeTags}) {
  
  
  const navigation = useNavigation();

  function cardToggleHandler() {

  };

  function directToEventDetails() {
    navigation.navigate('EventDetail', {
      eventId: eventId,
      sectorTags: sectorTags,
      gradeTags: gradeTags
    });
  };

  return (
    <Pressable onPress={cardToggleHandler}>
      <View style={styles.container}>
        <View>
          <Text style={styles.title}>{eventType === 'ONE_TO_ONE' ? 'Your One to One session' : eventName}</Text>
          <View style={styles.detailInnerContainer}>
            <Feather name="calendar" size={18} color="#3C8722" />
            <Text style={styles.period}>{eventStartTime.substring(11,16) + ' - ' + eventEndTime.substring(11,16)}</Text>
            <Text style={styles.date}>{getFormattedDate(eventStartTime)}</Text>
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
          <View style={styles.numberContainer}>
            <Text style={styles.number}>1</Text>
          </View>
          <Feather name="chevron-up" size={24} color="#6A6A6A" />
        </View>
      </View>
    </Pressable>
  )
}

export default ActivitiesCard;

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
  }
});

