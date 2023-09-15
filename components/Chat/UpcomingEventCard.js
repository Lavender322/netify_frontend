import { useEffect, useState, useContext } from 'react';
import { StyleSheet, Text, View, Image, Pressable, ScrollView } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { getFormattedDate } from '../../utils/date';
import { useNavigation } from '@react-navigation/native';
import { fetchTags } from '../../utils/http';

function UpcomingEventCard({ participantsName, hostName }) {
  const [sectorTags, setSectorTags] = useState([]);
  const [gradeTags, setGradeTags] = useState([]);

  const navigation = useNavigation();

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

  function directToEventDetails() {
    navigation.navigate('EventDetail', {
      eventId: eventId,
      sectorTags: sectorTags,
      gradeTags: gradeTags,
      eventParticipants: eventParticipants,
      previousScreen: 'Confirmed'
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Your upcoming session with 
        <Text style={styles.match}>
          {hostName ? ' ' + hostName : ' ' + participantsName}
        </Text>
      </Text>

      <View style={styles.detailInnerContainer}>
          <Feather name="calendar" size={18} color="#3C8722" />
          {/* <Text style={styles.period}>{eventStartTime.substring(11,16) + ' - ' + eventEndTime.substring(11,16)}</Text> */}
          <Text style={styles.period}>11:00 - 11:30</Text>
          {/* <Text style={styles.date}>{getFormattedDate(eventStartTime, true)}</Text> */}
          <Text style={styles.date}>Thu, Jul 13</Text>
        </View>

      <View style={styles.detailInnerContainer}>
        <Pressable onPress={directToEventDetails}>
          <Text style={styles.details}>Details</Text>
        </Pressable>
        <Feather name="chevron-right" size={24} color="#6A6A6A" />
      </View>
    </View>
  )
}

export default UpcomingEventCard;

const styles = StyleSheet.create({
  container: {
    marginTop: 16,
    marginHorizontal: 16,
    backgroundColor: 'white',
    padding: 24,
    borderRadius: 16,
    shadowColor: '#0000001A',
    shadowOffset: {width: 4, height: 4},
    shadowOpacity: 0.8,
    shadowRadius: 10,
    marginBottom: 24
  },
  title: {
    color: '#1A1A1A',
    fontSize: 17,
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
  details: {
    fontFamily: 'roboto',
    fontSize: 15,
    lineHeight: 18.2,
    color: '#6A6A6A',
    marginRight: 4,
    textDecorationLine: 'underline'
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
});