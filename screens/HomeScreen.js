import { useEffect, useState, useContext } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { AuthContext } from '../store/context/auth-context';
import { fetchOverallEventStatus, fetchEventList, fetchTags } from '../utils/http';
import EventsList from '../components/EventsList';
import EventFilters from '../components/EventFilters';
import LoadingOverlay from '../components/ui/LoadingOverlay';

function HomeScreen() {
  const [isFetching, setIsFetching] = useState(true);
  const [isFetchingEvents, setIsFetchingEvents] = useState(true);
  const [confirmedEvents, setConfirmedEvents] = useState(null);
  const [pendingRequests, setPendingRequests] = useState(null);
  const [receivedInvitations, setReceivedInvitations] = useState(null);
  const [loadedEvents, setLoadedEvents] = useState([]);
  const [sectorTags, setSectorTags] = useState([]);
  const [gradeTags, setGradeTags] = useState([]);
  const [selectedGrade, setSelectedGrade] = useState([]);
  const [selectedIndustry, setSelectedIndustry] = useState([]);
  const [selectedGroup, setSelectedGroup] = useState([]);
  const [updateEventList, setUpdateEventList] = useState(false);

  // TO COMMENT OUT
  const { token, firstName } = useContext(AuthContext);
  // const { firstName } = useContext(AuthContext);
  // const token = 'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIxNmE5YTZmMy02YjZkLTQ4ZGYtOTk2OS1hZDYxYWQ3ZDlkOGEiLCJpYXQiOjE2OTE3NDU2MTYsImV4cCI6MjU1NTc0NTYxNn0.c1hFaFFIxbI0dl8xq7kCRSMP1HAUZDCmsLeIQ6HFlxMnniypZveeiv4aopwNbLcK6zvp3ofod5G1B4Pu8A7FGg';

  useEffect(() => {
    async function getOverallEventStatus() {
      setIsFetching(true);
      try {
        const eventStatus = await fetchOverallEventStatus(token);
        setConfirmedEvents(eventStatus.confirmedEvents);
        setPendingRequests(eventStatus.pendingEventRequests);
        setReceivedInvitations(eventStatus.invitationsReceived);
      } catch (error) {
        console.log(error.response.data);
      };
      setIsFetching(false);
    };

    getOverallEventStatus();
  }, []);

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

  useEffect(() => {
    async function getEventList() {
      setIsFetchingEvents(true);
      try {
        const eventList = await fetchEventList(selectedGrade, selectedIndustry, selectedGroup, token);
        setLoadedEvents(eventList);
      } catch (error) {
        console.log(error.response.data);
      };
      setIsFetchingEvents(false);
    };
    
    getEventList();
  }, []);

  useEffect(() => {
    if (updateEventList) {
      async function getEventList() {
        setIsFetchingEvents(true);
        try {
          const eventList = await fetchEventList(selectedGrade, selectedIndustry, selectedGroup, token);
          setLoadedEvents(eventList);
        } catch (error) {
          console.log(error.response.data);
        };
        setIsFetchingEvents(false);
      };
      
      getEventList();
      setUpdateEventList(false);
    };
  }, [updateEventList]);

  if (isFetching) {
    return <LoadingOverlay />
  };

  return (
    <>
      <View style={styles.container}>
        <Text style={styles.headerText}>Hi, {firstName}</Text>
        <View style={styles.outerPanelContainer}>
          <View style={[styles.innerPanelContainer, styles.innerPanel]}>
            <Text style={styles.panelNumber}>{confirmedEvents}</Text> 
            <Text style={styles.panelText}>Confirmed Meeting</Text> 
          </View>
          <View style={[styles.innerPanelContainer, styles.innerPanel]}>
            <Text style={styles.panelNumber}>{pendingRequests}</Text> 
            <Text style={styles.panelText}>Pending Request</Text> 
          </View>
          <View style={styles.innerPanelContainer}>
            <Text style={styles.panelNumber}>{receivedInvitations}</Text> 
            <Text style={styles.panelText}>Invitations Received</Text> 
          </View>
        </View>

        <EventFilters 
          style={styles.eventFilters} 
          setSelectedGrade={setSelectedGrade} 
          setSelectedIndustry={setSelectedIndustry}
          setSelectedGroup={setSelectedGroup}
          selectedGroup={selectedGroup}
          setUpdateEventList={setUpdateEventList} 
        />
        
        <EventsList 
          events={loadedEvents} 
          isFetchingEvents={isFetchingEvents} 
          sectorTags={sectorTags} 
          gradeTags={gradeTags} 
        />
      </View>
   </>
  )
}

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 16,
    paddingHorizontal: 7
  },
  headerText: {
    fontSize: 24,
    fontFamily: 'roboto-bold',
    marginTop: 58,
    marginLeft: 13,
    color: '#000000E5'
  },
  outerPanelContainer: {
    flexDirection: 'row',
    width: '100%',
    backgroundColor: '#fff',
    borderRadius: 15,
    marginTop: 16,
    paddingVertical: 16
  },
  innerPanelContainer: {
    flex: 1,
    paddingHorizontal: 16
  },
  innerPanel: {
    borderRightColor: '#D9D9D9',
    borderRightWidth: 1,
  },
  panelNumber: {
    fontSize: 24,
    fontFamily: 'roboto-bold',
    color: '#1A1A1A',
    marginBottom: 8
  },
  panelText: {
    color: '#6F8698',
    fontSize: 13,
    fontFamily: 'roboto-medium'
  },
  eventFilters: {
    zIndex: 100,
  }
});