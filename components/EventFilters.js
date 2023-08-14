import { useEffect, useState, useContext } from 'react';
import { StyleSheet, View, Text, Pressable } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { AuthContext } from '../store/context/auth-context';
import { fetchEventFilters, fetchEventList } from '../utils/http';
import EventFilter from './EventFilter';

function EventFilters({ style, updateEventList }) {
  const [isFetching, setIsFetching] = useState(true);
  const [gradeFilters, setGradeFilters] = useState([]);
  const [groupFilters, setGroupFilters] = useState([]);
  const [industryFilters, setIndustryFilters] = useState([]);
  const [showGrade, setShowGrade] = useState(false);
  const [showIndustry, setShowIndustry] = useState(false);
  const [showGroup, setShowGroup] = useState(false);
  const [gradeFilterApplied, setGradeFilterApplied] = useState(false);
  const [industryFilterApplied, setIndustryFilterApplied] = useState(false);
  const [groupFilterApplied, setGroupFilterApplied] = useState(false);

  const { token } = useContext(AuthContext);
  // const token = 'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIxNmE5YTZmMy02YjZkLTQ4ZGYtOTk2OS1hZDYxYWQ3ZDlkOGEiLCJpYXQiOjE2OTE3NDU2MTYsImV4cCI6MjU1NTc0NTYxNn0.c1hFaFFIxbI0dl8xq7kCRSMP1HAUZDCmsLeIQ6HFlxMnniypZveeiv4aopwNbLcK6zvp3ofod5G1B4Pu8A7FGg';
  
  useEffect(() => {
    async function getEventList() {
      setIsFetching(true);
      try {
        const eventList = await fetchEventList([], [], ["ONE_TO_ONE", "GROUP_EVENT"], token);
        updateEventList(eventList);
      } catch (error) {
        console.log(error.response.data);
      };
      setIsFetching(false);
    };
    
    getEventList();
  }, []);

  useEffect(() => {
    async function getEventFilters() {
      try {
        const eventFilters = await fetchEventFilters(token);
        console.log("eventFilters: ", eventFilters);
        setGradeFilters(eventFilters.experienceTypeList);
        setIndustryFilters(eventFilters.sectorTypeList);
        setGroupFilters(eventFilters.meetingTypeList);
      } catch (error) {
        console.log(error.response.data);
      };
    };

    getEventFilters();
  }, []);

  function onToggleGradeFilters() {
    setShowGrade(!showGrade);
    setShowIndustry(false);
    setShowGroup(false);
  };

  function onToggleIndustryFilters() {
    setShowIndustry(!showIndustry);
    setShowGrade(false);
    setShowGroup(false);
  };

  function onToggleGroupFilters() {
    setShowGroup(!showGroup);
    setShowGrade(false);
    setShowIndustry(false);
  };

  return (
    <View style={[styles.outerContainer, style]}>
      <View style={styles.container}>
        <Pressable onPress={onToggleGradeFilters} style={({pressed}) => pressed && styles.pressed}>
          <View style={[styles.dropdownContainer, gradeFilterApplied && styles.colorContainer]}>
            <Text style={[styles.filterText, gradeFilterApplied && styles.colorText]}>Grade</Text>
            <Feather name="chevron-down" size={24} color={gradeFilterApplied ? 'white' : '#1A1A1A'} />
          </View>
        </Pressable>
        <Pressable onPress={onToggleIndustryFilters} style={({pressed}) => pressed && styles.pressed}>
          <View style={[styles.dropdownContainer, industryFilterApplied && styles.colorContainer]}>
            <Text style={[styles.filterText, industryFilterApplied && styles.colorText]}>Industry</Text>
            <Feather name="chevron-down" size={24} color={industryFilterApplied ? 'white' : '#1A1A1A'} />
          </View>
        </Pressable>
        <Pressable onPress={onToggleGroupFilters} style={({pressed}) => pressed && styles.pressed}>
          <View style={[styles.dropdownContainer, groupFilterApplied && styles.colorContainer]}>
            <Text style={[styles.filterText, groupFilterApplied && styles.colorText]}>Meeting Type</Text>
            <Feather name="chevron-down" size={24} color={groupFilterApplied ? 'white' : '#1A1A1A'} />
          </View>
        </Pressable>
      </View>
      <View style={[!showGrade && styles.hide, styles.filtersContainer]}>
        <EventFilter filters={gradeFilters} />
      </View>
      <View style={[!showIndustry && styles.hide, styles.filtersContainer, styles.industryFiltersContainer]}>
        <EventFilter filters={industryFilters} />
      </View>
      <View style={[!showGroup && styles.hide, styles.filtersContainer, styles.groupFiltersContainer]}>
        <EventFilter filters={groupFilters} isGroupFilters={true} />
      </View>
    </View>
  )
}

export default EventFilters;

const styles = StyleSheet.create({
  outerContainer: {
    position: 'relative',
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    
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
  },
  filtersContainer: {
    position: 'absolute',
    top: 60
  },
  industryFiltersContainer: {
    left: 90
  },
  groupFiltersContainer: {
    left: 192
  },
  hide: {
    display: 'none'
  },
  pressed: {
    opacity: 0.75
  }
});