import { useContext, useEffect, useState } from 'react';
import { StyleSheet, View, Image, Pressable, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { getFormattedDate } from '../utils/date';
import { AuthContext } from '../store/context/auth-context';

function EventItem({ id, eventHost, eventStartTime, eventEndTime, sectorTags, gradeTags, onPress}) {
  const [eventHostSectorTag, setEventHostSectorTag] = useState();
  const [eventHostGradeTag, setEventHostGradeTag] = useState();
  
  const navigation = useNavigation();

  function eventDetailHandler() {
    navigation.navigate('EventDetail', {
      eventId: id,
      sectorTags: sectorTags,
      gradeTags: gradeTags
    });
  };

  useEffect(() => {
    const eventHostGradeTag = gradeTags.filter((gradeTag) => {
      return eventHost.userTag.includes(gradeTag.id.toString());
    });
  
    const eventHostSectorTag = sectorTags.filter((sectorTag) => {
      return eventHost.userTag.includes(sectorTag.id.toString());
    });

    setEventHostGradeTag(eventHostGradeTag[0].tagName);
    setEventHostSectorTag(eventHostSectorTag[0].tagName);
  }, []);

  return (
    <View style={styles.container}>
      <Pressable onPress={eventDetailHandler} style={({pressed}) => [styles.leftContainer, pressed && styles.pressed]}>
        <Image source={{uri: eventHost.userImage[3]}} style={styles.avatar} />
        <View style={styles.infoOuterContainer}>
          <Text style={styles.name}>{eventHost.localizedfirstname + ' ' + eventHost.localizedlastname}</Text>
          <View style={styles.infoInnerContainer}>
            <Text style={styles.grade}>{eventHostGradeTag}</Text>
            <View style={styles.sectorContainer}>
              <Text style={styles.sector}>{eventHostSectorTag}</Text>
            </View>
          </View>
          <View style={styles.infoInnerContainer}>
            <Text style={styles.period}>{eventStartTime.substring(11,16) + ' - ' + eventEndTime.substring(11,16)}</Text>
            <Text style={styles.date}>{getFormattedDate(eventStartTime)}</Text>
          </View>
        </View>
      </Pressable>
      <Pressable onPress={() => {}}>
        <View style={styles.requestContainer}>
          <Text style={styles.requestText}>Request</Text>
        </View>
      </Pressable>
    </View>
  )
}

export default EventItem;

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
  requestContainer: {
    backgroundColor: '#1A4821',
    paddingVertical: 6,
    paddingHorizontal: 16,
    borderRadius: 23
  },
  requestText: {
    color: '#A6E291',
    fontSize: 16,
    fontFamily: 'roboto'
  },
  pressed: {
    opacity: 0.75
  }
});