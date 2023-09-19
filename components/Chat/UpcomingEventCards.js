import { FlatList, Text, StyleSheet, View } from 'react-native';
import UpcomingEventCard from './UpcomingEventCard';

function renderEventCard(itemData) {
  return (
    <UpcomingEventCard {...itemData.item} />
  );
};

function UpcomingEventCards({ events, isFetchingEvents }) {
  console.log('events', events);
  // if ((!events || events.length === 0) && !isFetchingEvents) {
  //   return (
  //     <View style={styles.fallbackContainer}>
  //       <Text>
  //         <Text style={styles.fallback}>You don't have any existing chat.</Text>
  //       </Text>
  //     </View>
  //   )
  // };

  if (events && events.length && !isFetchingEvents) {
    return (
      <FlatList 
        data={events} 
        renderItem={(item) => renderEventCard(item)} 
        // keyExtractor={(item) => item.chatRoomId}
      />
    )
  };
};

export default UpcomingEventCards;