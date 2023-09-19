import { useEffect, useState, useContext } from 'react';
import { FlatList, Text, StyleSheet, View, SafeAreaView } from 'react-native';
import { fetchEvent } from '../../utils/http';
import UpcomingEventCard from './UpcomingEventCard';
import { AuthContext } from '../../store/context/auth-context';
import MessageList from './MessageList';

function renderEventCard(itemData) {
  return (
    <UpcomingEventCard {...itemData.item} />
  );
};

function UpcomingEventCards({ closestEventId, chatMessages }) {
  const [isFetching, setIsFetching] = useState(true);
  const [upcomingEvents, setUpcomingEvents] = useState([]);

  const { token } = useContext(AuthContext);

  useEffect(() => {
    setIsFetching(true);
    closestEventId.map(eventId => {
      async function getEventDetails() {
        try {
          const eventDetails = await fetchEvent(token, eventId);
          setUpcomingEvents(currentUpcomingEvents => [...currentUpcomingEvents, eventDetails]);
        } catch (error) {
          console.log(error.response.data);
        };
      };
  
      getEventDetails();
    });
    setIsFetching(false);
  }, []);
  
  if (upcomingEvents && upcomingEvents.length && !isFetching) {
    return (
      <SafeAreaView style={{flex: 1}}>
        <FlatList 
          data={upcomingEvents} 
          renderItem={(item) => renderEventCard(item)} 
          keyExtractor={(item) => item.id}
          ListFooterComponent={<MessageList chatMessages={chatMessages} />}
        />
      </SafeAreaView>
    )
  };
};

export default UpcomingEventCards;