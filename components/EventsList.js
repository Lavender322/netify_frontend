import { FlatList, Text, StyleSheet, View } from 'react-native';
import EventItem from './EventItem';

function renderEventItem(itemData, sectorTags, gradeTags) {
  return (
    <EventItem {...itemData.item} sectorTags={sectorTags} gradeTags={gradeTags} />
  );
};

function EventsList({ events, isFetchingEvents, sectorTags, gradeTags }) {
  if (events.length === 0 && !isFetchingEvents) {
    return (
      <View style={styles.fallbackContainer}>
        <Text>
          <Text style={styles.fallback}>There are no upcoming events around you. </Text>
          <Text style={styles.fallbackHighlight}>Host one!</Text>
        </Text>
      </View>
    )
  };

  return (
    <FlatList 
      data={events} 
      renderItem={(item) => renderEventItem(item, sectorTags, gradeTags)} 
      keyExtractor={(item) => item.id}
    />
  )
}

export default EventsList;

const styles = StyleSheet.create({
  fallbackContainer: {
    marginHorizontal: 40,
    marginTop: 35
  },
  fallback: {
    color: '#3B4852',
    textAlign: 'center',
    fontSize: 16,
    fontFamily: 'roboto',
    lineHeight: 20
  },
  fallbackHighlight: {
    fontFamily: 'roboto-bold',
    fontSize: 16,
    color: '#3C8722',
    textDecorationLine: 'underline',
    lineHeight: 20
  }
});