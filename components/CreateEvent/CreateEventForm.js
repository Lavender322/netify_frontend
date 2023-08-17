import { useEffect, useState } from 'react';
import { StyleSheet, View, Pressable, Text, TextInput, ScrollView, KeyboardAvoidingView, Switch } from 'react-native';
import CreateEventItem from "./CreateEventItem";
import DatePicker from './DatePicker';
import { useNavigation, useRoute, useIsFocused } from '@react-navigation/native';
import LocationInput from './LocationInput';
import { Ionicons } from '@expo/vector-icons';
import TimePicker from './TimePicker';

function CreateEventForm() {
  const [flag, setFlag] = useState(false);
  const [isOneToOne, setIsOneToOne] = useState(true);
  const [showDateSelector, setShowDateSelector] = useState(false);
  const [showLocationInput, setShowLocationInput] = useState(false);
  const [showTimeSelector, setShowTimeSelector] = useState(false);
  const [meetingTitle, setMeetingTitle] = useState('');
  const [selectedCapacity, setSelectedCapacity] = useState('∞');
  const [selectedLocation, setSelectedLocation] = useState();
  const [previewLocation, setPreviewLocation] = useState('Optional');
  const [notes, setNotes] = useState('');
  const [previewNotes, setPreviewNotes] = useState('Optional');
  const [autoAccept, setAutoAccept] = useState(false);

  function meetingTitleInputHandler(enteredText) {
    setMeetingTitle(enteredText);
  };


  const toggleSwitch = () => setAutoAccept(previousState => !previousState);

  const isFocused = useIsFocused();
  const navigation = useNavigation();
  const route = useRoute();

  useEffect(() => {
    if (isFocused && route.params) {
      const activityCapacity = route.params?.activityCapacity;
      const notes = route.params?.notes;
      const previewNotes = route.params?.previewNotes;
      setSelectedCapacity(activityCapacity);
      setPreviewNotes(previewNotes);
      setNotes(notes);
    };
  }, [route, isFocused]);

  useEffect(() => {
    if (!showLocationInput && selectedLocation) {
      setPreviewLocation(selectedLocation);
    } else {
      setPreviewLocation('Optional');
    };
  }, [showLocationInput]);


  function oneToOneHandler() {
    setIsOneToOne(true);
  };

  function groupEventHandler() {
    setIsOneToOne(false);
  };

  function nextStepHandler() {
    
  };

  function selectDateHandler() {
    if (!showDateSelector) {
      setShowLocationInput(false);
      setShowTimeSelector(false);
    };
    setShowDateSelector(!showDateSelector);
  };

  function inputLocationHandler() {
    if (!showLocationInput) {
      setShowDateSelector(false);
      setShowTimeSelector(false);
    };
    setShowLocationInput(!showLocationInput);
  };

  function selectActivityCapacityHandler() {
    navigation.navigate('ActivityCapacity');
  };

  function selectNotesHandler() {
    navigation.navigate('Notes');
  };
  function selectVisibilityHandler() {
    navigation.navigate('Visibility');
  };

  return (
    <View style={styles.container}>
      <KeyboardAvoidingView style={styles.container} behavior='position'>
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
              value={meetingTitle}
              onChangeText={meetingTitleInputHandler}
            />
          </View>
        
          <CreateEventItem icon='calendar' text='Date' placeholder='Please Select' onPress={selectDateHandler} expanded={showDateSelector} />
          {showDateSelector && (
            <DatePicker />
          )}

          <CreateEventItem icon='clock' text='Time' placeholder='Please Select' />
          {showTimeSelector && (
            <TimePicker />
          )}

          {!isOneToOne && (
            <CreateEventItem icon='users' text='Activity capacity' placeholder={selectedCapacity} onPress={selectActivityCapacityHandler} />
          )}

          {!isOneToOne && (
            <View>
              <CreateEventItem icon='map-pin' text='Location' placeholder={previewLocation} onPress={inputLocationHandler} expanded={showLocationInput} />
              {showLocationInput && (
                <LocationInput setSelectedLocation={setSelectedLocation} />
              )}
            </View>
          )}

          <CreateEventItem icon='eye' text='Visibility' placeholder='Visible to all' onPress={selectVisibilityHandler}/>
          
          <CreateEventItem icon='file-text' text='Notes' placeholder={previewNotes} onPress={selectNotesHandler}/>
        </ScrollView>

        <View style={styles.submitFormContainer}>
          {isOneToOne ? (
            <View style={styles.submitFormOuterContainer}>
              <View style={[styles.submitFormInnerContainer, styles.submitFormInnerLeftContainer]}>
                <Switch
                  trackColor={{false: '#919191', true: '#3C8722'}}
                  thumbColor={autoAccept ? '#FFFFFF' : '#FFFFFF'}
                  ios_backgroundColor="#919191"
                  onValueChange={toggleSwitch}
                  value={autoAccept}
                />
                <Text style={styles.switchText}>Auto accept the first applicant's request.</Text>
              </View>
              <Pressable onPress={nextStepHandler} style={({pressed}) => [pressed && styles.pressed, styles.submitFormInnerContainer, styles.submitFormInnerRightContainer]}>
                <View style={[styles.submitFormBtnContainer, flag && styles.enabledContainer]}>
                  <Text style={[styles.submitFormBtnText, flag && styles.enabledText]}>Create event</Text>
                </View>
              </Pressable>
            </View>
          ) : (
            <Pressable onPress={nextStepHandler} style={({pressed}) => pressed && styles.pressed}>
              <View style={[styles.submitFormBtnContainer, flag && styles.enabledContainer]}>
                <Text style={[styles.submitFormBtnText, flag && styles.enabledText]}>Create event</Text>
              </View>
            </Pressable>
          )}
        </View>
      </KeyboardAvoidingView>
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
    // backgroundColor: 'blue',
    // flex: 1, 
    justifyContent: 'flex-end',
    // marginBottom: 96,
    paddingHorizontal: 12,
    paddingTop: 16
  },
  submitFormOuterContainer: {
    flexDirection: 'row'
  },
  submitFormInnerContainer: {
    flex: 1
  },  
  submitFormInnerLeftContainer: {
    flexDirection: 'row',
    marginRight: 8,
    alignItems: 'center'
  },  
  switchText: {
    fontFamily: 'roboto',
    fontSize: 15,
    lineHeight: 20,
    color: '#000000E5',
    marginLeft: 8,
    maxWidth: '75%'
  },  
  submitFormInnerRightContainer: {
    marginLeft: 8,
  },  
  submitFormText: {
    fontSize: 16,
    color: '#000000E5',
    marginBottom: 10,
    textAlign: 'center',
    fontFamily: 'roboto',
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