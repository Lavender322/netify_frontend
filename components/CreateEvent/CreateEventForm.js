import { useEffect, useState } from 'react';
import { StyleSheet, View, Pressable, Text, TextInput, ScrollView } from 'react-native';
import CreateEventItem from "./CreateEventItem";
import DatePicker from './DatePicker';
import { useNavigation, useRoute, useIsFocused } from '@react-navigation/native';

function CreateEventForm() {
  const [flag, setFlag] = useState(false);
  const [isOneToOne, setIsOneToOne] = useState(true);
  const [showDateSelector, setShowDateSelector] = useState(false);
  const [selectedCapacity, setSelectedCapacity] = useState('∞');

  const isFocused = useIsFocused();
  const navigation = useNavigation();
  const route = useRoute();

  useEffect(() => {
    if (isFocused && route.params) {
      const activityCapacity = route.params?.activityCapacity;
      setSelectedCapacity(activityCapacity);
    };
  }, [route, isFocused]);


  function oneToOneHandler() {
    setIsOneToOne(true);
  };

  function groupEventHandler() {
    setIsOneToOne(false);
  };

  function nextStepHandler() {
    
  };

  function selectDateHandler() {
    setShowDateSelector(!showDateSelector);
  };

  function selectActivityCapacityHandler() {
    navigation.navigate('ActivityCapacity', {
      isOneToOne: isOneToOne
    });
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.meetingTypes}>
          <Pressable 
            style={({pressed}) => [styles.meetingType, styles.meetingTypeLeft, isOneToOne ? styles.selectedMeetingType : styles.unselectedMeetingType, pressed && styles.pressed]}
            onPress={oneToOneHandler}
          >
            <Text style={[styles.meetingTypeText, isOneToOne ? styles.selectedMeetingTypeText : styles.unselectedMeetingTypeText]}>One to One</Text>
          </Pressable>
          <Pressable 
            style={({pressed}) => [styles.meetingType, styles.meetingTypeRight, isOneToOne ? styles.unselectedMeetingType : styles.selectedMeetingType, pressed && styles.pressed]}
            onPress={groupEventHandler}
          >
              <Text style={[styles.meetingTypeText, isOneToOne ? styles.unselectedMeetingTypeText : styles.selectedMeetingTypeText]}>Group event</Text>
          </Pressable>
        </View>
        <View style={styles.meetingTitleContainer}>
          <Text style={styles.meetingTitle}>Meeting Title</Text>
          <TextInput 
            style={styles.textInput} 
            maxLength={30}
            placeholder="Please Enter"
            placeholderTextColor="#6A6A6A"
          />
        </View>
      
        <CreateEventItem icon='calendar' text='Date' placeholder='Please Select' onPress={selectDateHandler} />
        <DatePicker show={showDateSelector} />
        <CreateEventItem icon='clock' text='Time' placeholder='Please Select'/>
        <CreateEventItem icon='users' text='Activity capacity' placeholder={selectedCapacity} onPress={selectActivityCapacityHandler} />
        <CreateEventItem icon='map-pin' text='Location' placeholder='Optional'/>
        <CreateEventItem icon='eye' text='Visibility' placeholder='Visible to all'/>
        <CreateEventItem icon='file-text' text='Notes' placeholder='Optional'/>
      </ScrollView>
      <View style={styles.submitFormContainer}>
        <Pressable onPress={nextStepHandler} style={({pressed}) => pressed && styles.pressed}>
          <View style={[styles.submitFormBtnContainer, flag && styles.enabledContainer]}>
            <Text style={[styles.submitFormBtnText, flag && styles.enabledText]}>Create event</Text>
          </View>
        </Pressable>
      </View>
    </View>
  )
}

export default CreateEventForm;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  meetingTypes: {
    flexDirection: 'row',
    marginBottom: 16,
    marginHorizontal: 12
  }, 
  meetingType: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10
  }, 
  meetingTypeLeft: {
    borderTopLeftRadius: 8,
    borderBottomLeftRadius: 8
  },
  meetingTypeRight: {
    borderTopRightRadius: 8,
    borderBottomRightRadius: 8
  },
  selectedMeetingType: {
    backgroundColor: '#1A4821',
  },
  unselectedMeetingType: {
    backgroundColor: '#E6E6E6',
  },
  meetingTypeText: {
    fontFamily: 'roboto-medium',
    fontSize: 16
  },
  selectedMeetingTypeText: {
    color: '#FFFFFF'
  },
  unselectedMeetingTypeText: {
    color: '#6A6A6A'
  },
  meetingTitleContainer: {
    padding: 12,
  },
  meetingTitle: {
    fontSize: 17,
    color: '#000000E5',
    marginBottom: 4,
    fontFamily: 'roboto-medium'
  },
  textInput: {
    borderColor: '#0000001A',
    borderWidth: 1,
    borderRadius: 6,
    padding: 9,
    color: '#1A1A1A',
    fontSize: 15,
    fontFamily: 'roboto'
  },
  submitFormContainer: {
    marginBottom: 80,
    paddingHorizontal: 12
  },
  submitFormText: {
    fontSize: 16,
    color: '#000000E5',
    marginBottom: 10,
    textAlign: 'center',
    fontFamily: 'roboto'
  },
  submitFormBtnContainer: {
    backgroundColor: '#E6E6E6',
    borderRadius: 8,
    paddingVertical: 13,
  },
  enabledContainer: {
    backgroundColor: '#1A4821'
  },
  submitFormBtnText: {
    color: '#6A6A6A',
    fontSize: 16,
    fontFamily: 'roboto-medium',
    textAlign: 'center'
  },
  enabledText: {
    color: 'white'
  },
  pressed: {
    opacity: 0.75
  }
});