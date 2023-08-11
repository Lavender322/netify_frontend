import { useEffect, useState, useContext } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { AuthContext } from '../store/context/user-context';
import { fetchEventFilters } from '../utils/http';
import LoadingOverlay from './ui/LoadingOverlay';

function EventFilters() {
  const [isFetching, setIsFetching] = useState(true);

  const { token } = useContext(AuthContext);
  // const token = 'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIxNmE5YTZmMy02YjZkLTQ4ZGYtOTk2OS1hZDYxYWQ3ZDlkOGEiLCJpYXQiOjE2OTE3NDU2MTYsImV4cCI6MjU1NTc0NTYxNn0.c1hFaFFIxbI0dl8xq7kCRSMP1HAUZDCmsLeIQ6HFlxMnniypZveeiv4aopwNbLcK6zvp3ofod5G1B4Pu8A7FGg';
  
  useEffect(() => {
    async function getEventFilters() {
      setIsFetching(true);
      try {
        const eventFilters = await fetchEventFilters(token);
        console.log(eventFilters);
      } catch (error) {
        console.log(error.response.data);
      };
      setIsFetching(false);
    };

    getEventFilters();
  }, []);

  if (isFetching) {
    return <LoadingOverlay />
  };

  return (
    <View style={styles.container}>
      <View style={styles.dropdownContainer}>
        <Text style={styles.filterText}>Grade</Text>
        <Feather name="chevron-down" size={24} color="#1A1A1A" />
      </View>
      <View style={styles.dropdownContainer}>
        <Text style={styles.filterText}>Industry</Text>
        <Feather name="chevron-down" size={24} color="#1A1A1A" />
      </View>
      <View style={[styles.dropdownContainer, styles.colorContainer]}>
        <Text style={[styles.filterText, styles.colorText]}>One to One</Text>
        <Feather name="chevron-down" size={24} color="white" />
      </View>
    </View>
  )
}

export default EventFilters;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16
  },
  dropdownContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 8,
    marginTop: 16,
    marginRight: 8
  },
  colorContainer: {
    backgroundColor: '#3C8722'
  },
  filterText: {
    fontFamily: 'roboto-medium',
    color: '#1A1A1A',
    marginRight: 4
  },
  colorText: {
    color: 'white'
  }
});