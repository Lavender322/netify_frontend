import { FlatList } from 'react-native';
import EventItem from './EventItem';

function renderEventItem(itemData) {
  return (
    <EventItem {...itemData.item} />
  );
};

function EventsList({ events }) {
  return (
    <FlatList 
      data={events} 
      renderItem={renderEventItem} 
      keyExtractor={(item) => item.id}
    />
  )
}

export default EventsList;