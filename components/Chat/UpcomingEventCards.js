import { useEffect, useState, useContext, useRef } from 'react';
import { FlatList, SafeAreaView } from 'react-native';
import { fetchEvent } from '../../utils/http';
import UpcomingEventCard from './UpcomingEventCard';
import { AuthContext } from '../../store/context/auth-context';
import MessageList from './MessageList';

function renderEventCard(itemData) {
  return (
    <UpcomingEventCard {...itemData.item} />
  );
};

function UpcomingEventCards({ closestEventId, chatMessages, setIsInputOnFocus, isInputOnFocus }) {
  let listViewRef;
  // const listViewRef = useRef();

  const [isFetching, setIsFetching] = useState(true);
  const [upcomingEvents, setUpcomingEvents] = useState([]);

  const { token } = useContext(AuthContext);

  useEffect(() => {
    setIsFetching(true);
    if (closestEventId) {
      closestEventId.map(eventId => {
        async function getEventDetails() {
          try {
            const eventDetails = await fetchEvent(token, eventId);
            setUpcomingEvents(currentUpcomingEvents => [...currentUpcomingEvents, eventDetails]);
          } catch (error) {
            console.log('fetchEvent', error);
            console.log(error.response.data);
          };
        };
    
        getEventDetails();
      });
    };
    
    setIsFetching(false);
  }, []);

  useEffect(() => {
    if (isInputOnFocus) {
      // console.log('scroll');
      listViewRef.scrollToEnd({animated: true});
      setIsInputOnFocus(false);
    };
  }, [isInputOnFocus]);

  const renderItem = (item) => renderEventCard(item);
  const listFooterComponent = <MessageList chatMessages={chatMessages} isFetchingMessages={isFetching} upcomingEvents={upcomingEvents} />;
  
  return (
    <SafeAreaView style={{flex: 1}}>
      <FlatList 
        data={upcomingEvents} 
        renderItem={renderItem} 
        keyExtractor={(item) => item.id}
        ListFooterComponent={listFooterComponent}
        ref={(ref) => {
          listViewRef = ref;
        }}
        onContentSizeChange={() => { 
          listViewRef.scrollToEnd({animated: true});
        }}
      />
    </SafeAreaView>
  );
};

export default UpcomingEventCards;