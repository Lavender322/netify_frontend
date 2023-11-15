import { useEffect, useState, useContext } from 'react';
import { StyleSheet, View, Pressable, Text, TextInput, ScrollView, KeyboardAvoidingView, Switch, Modal } from 'react-native';
import { AuthContext } from '../../store/context/auth-context';
import CreateEventItem from "./CreateEventItem";
import DatePicker from './DatePicker';
import { useNavigation, useRoute, useIsFocused } from '@react-navigation/native';
import LocationInput from './LocationInput';
import { Ionicons } from '@expo/vector-icons';
import TimePicker from './TimePicker';
import { createEvent, fetchTags } from '../../utils/http';
import LoadingOverlay from '../ui/LoadingOverlay';
import { getEventStartEndTime, roundUpTime } from '../../utils/date';

function CreateEventForm() {
  var initialTime = roundUpTime();
  
  const [flag, setFlag] = useState(false);
  const [isOneToOne, setIsOneToOne] = useState(true);
  const [showDateSelector, setShowDateSelector] = useState(true);
  const [showLocationInput, setShowLocationInput] = useState(false);
  const [showTimeSelector, setShowTimeSelector] = useState(false);
  const [sectorTagIds, setSectorTagIds] = useState([]);
  const [gradeTagIds, setGradeTagIds] = useState([]);
  const [allSectorTagIds, setAllSectorTagIds] = useState([]);
  const [allGradeTagIds, setAllGradeTagIds] = useState([]);
  const [meetingTitle, setMeetingTitle] = useState('');
  const [previewTime, setPreviewTime] = useState('Please Select');
  const [selectedStartTime, setSelectedStartTime] = useState(initialTime);
  const [selectedEndTime, setSelectedEndTime] = useState(initialTime);
  const [selectedDate, setSelectedDate] = useState();
  const [previewDate, setPreviewDate] = useState('Please Select');
  const [selectedIndex, setSelectedIndex] = useState();
  const [selectedCapacity, setSelectedCapacity] = useState('∞');
  const [selectedLocation, setSelectedLocation] = useState('');
  const [previewLocation, setPreviewLocation] = useState('Optional');
  const [notes, setNotes] = useState('');
  const [previewNotes, setPreviewNotes] = useState('Optional');
  const [visibility, setVisibility] = useState('All');
  const [previewVisibility, setPreviewVisibility] = useState('Visible to all');
  const [autoAccept, setAutoAccept] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  // TO COMMENT OUT
  const { token } = useContext(AuthContext);
  // const token = 'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIxNmE5YTZmMy02YjZkLTQ4ZGYtOTk2OS1hZDYxYWQ3ZDlkOGEiLCJpYXQiOjE2OTE3NDU2MTYsImV4cCI6MjU1NTc0NTYxNn0.c1hFaFFIxbI0dl8xq7kCRSMP1HAUZDCmsLeIQ6HFlxMnniypZveeiv4aopwNbLcK6zvp3ofod5G1B4Pu8A7FGg';

  function meetingTitleInputHandler(enteredText) {
    setMeetingTitle(enteredText);
  };

  const toggleSwitch = () => setAutoAccept(previousState => !previousState);

  const isFocused = useIsFocused();
  const navigation = useNavigation();
  const route = useRoute();

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

        const sectorTagIds = [];
        const gradeTagIds = [];

        fetchedSectorTags.map((tag) => {
          sectorTagIds.push(tag.tagId);
        })

        fetchedGradeTags.map((tag) => {
          gradeTagIds.push(tag.tagId);
        })

        setSectorTagIds(sectorTagIds);
        setGradeTagIds(gradeTagIds);

        setAllSectorTagIds(sectorTagIds);
        setAllGradeTagIds(gradeTagIds);
      } catch (error) {
        console.log('fetchTags', error);
        console.log(error.response.data);
      };
      // setIsFetching(false);
    };

    getTags();
  }, []);

  useEffect(() => {
    if (isFocused && route.params) {
      const activityCapacity = route.params.activityCapacity ? route.params.activityCapacity : '∞';
      const notes = route.params.notes ? route.params.notes : '';
      const previewNotes = route.params.previewNotes ? route.params.previewNotes : 'Optional';
      // const previewVisibility = route.params.previewVisibility ? route.params.previewVisibility : 'Visible to all';
      // const gradeVisibility = route.params.gradeVisibility && route.params.gradeVisibility;
      // const sectorVisibility = route.params.sectorVisibility && route.params.sectorVisibility;
      setSelectedCapacity(activityCapacity);
      setPreviewNotes(previewNotes);
      setNotes(notes);
      // if (gradeVisibility && sectorVisibility) {
      //   if (gradeVisibility === ['All']) {
      //     setGradeTagIds(allGradeTagIds);
      //   } else {
      //     setGradeTagIds(gradeVisibility);
      //   };
        
      //   if (sectorVisibility === ['All']) {
      //     setSectorTagIds(allSectorTagIds);
      //   } else {
      //     setSectorTagIds(sectorVisibility);
      //   };
      // };
      // setPreviewVisibility(previewVisibility);
    };
  }, [route, isFocused]);


  useEffect(() => {
    if (!showLocationInput && selectedLocation) {
      setPreviewLocation(selectedLocation);
    } else {
      setPreviewLocation('Optional');
    };
  }, [showLocationInput]);

  useEffect(() => {
    // console.log(meetingTitle, selectedDate, selectedStartTime, selectedEndTime, visibility, selectedCapacity);
    if (selectedDate && selectedStartTime && selectedEndTime && visibility) {
      if (!isOneToOne) {
        if (selectedCapacity && meetingTitle.length !== 0) {
          setFlag(true);
        } else {
          setFlag(false);
        };
      };
      setFlag(true);
    } else {
      setFlag(false);
    }
  }, [meetingTitle, selectedDate, selectedStartTime, selectedEndTime, selectedCapacity, selectedLocation, visibility, notes, autoAccept]);


  function oneToOneHandler() {
    setIsOneToOne(true);
  };

  function groupEventHandler() {
    setIsOneToOne(false);
  };

  async function createEventHandler(token, isOneToOne, meetingTitle, allSectorTagIds, allGradeTagIds, selectedCapacity, selectedDate, selectedStartTime, selectedEndTime, notes, selectedLocation, autoAccept) {
    if (flag) {
      let [eventStartTime, eventEndTime] = getEventStartEndTime(selectedDate, selectedStartTime, selectedEndTime);
      let body = {
        eventName: meetingTitle,
        // eventTeam: sectorTagIds,
        // eventGrade: gradeTagIds,
        eventTeam: allSectorTagIds,
        eventGrade: allGradeTagIds,
        eventType: isOneToOne ? 'ONE_TO_ONE' : 'GROUP_EVENT',
        allowedParticipantsNumber: isOneToOne ? 2 : (selectedCapacity === '∞') ? 10000 : Number(selectedCapacity),
        eventStartTime: eventStartTime,
        eventEndTime: eventEndTime,
        eventDescription: notes,
        eventLocation: isOneToOne ? ' ' : selectedLocation,
        autoAccept: isOneToOne ? autoAccept : false
      };

      // setModalVisible(!modalVisible);

      setIsSubmitting(true);
      try {
        await createEvent(body, token);
        navigation.goBack();
      } catch (error) {
        console.log('createEvent', error);
        console.log(error.response.data);
        setIsSubmitting(false);
      };  
    }
  };

  if (isSubmitting) {
    return <LoadingOverlay />;
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

  function selectTimeHandler() {
    if (!showTimeSelector) {
      setShowDateSelector(false);
      setShowLocationInput(false);
    };
    setShowTimeSelector(!showTimeSelector);
  };

  function selectActivityCapacityHandler() {
    navigation.navigate('ActivityCapacity');
  };

  function selectNotesHandler() {
    navigation.navigate('Notes', {
      notes: notes
    });
  };

  function selectVisibilityHandler() {
    navigation.navigate('Visibility', {
      selectedGrade: gradeTagIds,
      selectedIndustry: sectorTagIds,
      allGrade: allGradeTagIds,
      allIndustry: allSectorTagIds
    });
  };

  function onHideModal() {
    setModalVisible(!modalVisible);
    navigation.goBack();
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
              placeholder={isOneToOne ? "Optional" : "Please Enter"}
              placeholderTextColor="#6A6A6A"
              value={meetingTitle}
              onChangeText={meetingTitleInputHandler}
            />
          </View>
        
          <CreateEventItem icon='calendar' text='Date' placeholder={previewDate} onPress={selectDateHandler} expanded={showDateSelector} />
          {showDateSelector && (
            <DatePicker setSelectedDate={setSelectedDate} setPreviewDate={setPreviewDate} setSelectedIndex={setSelectedIndex} selectedIndex={selectedIndex} />
          )}

          <CreateEventItem icon='clock' text='Time' placeholder={previewTime} onPress={selectTimeHandler} expanded={showTimeSelector} />
          {showTimeSelector && (
            <TimePicker 
              startTime={selectedStartTime}
              setStartTime={setSelectedStartTime}
              endTime={selectedEndTime}
              setEndTime={setSelectedEndTime}
              setPreviewTime={setPreviewTime}
            />
          )}

          {!isOneToOne && (
            <CreateEventItem icon='users' text='Activity capacity' placeholder={selectedCapacity} onPress={selectActivityCapacityHandler} />
          )}

          {!isOneToOne && (
            <View>
              <CreateEventItem icon='map-pin' text='Location' placeholder={previewLocation} onPress={inputLocationHandler} expanded={showLocationInput} />
              {showLocationInput && (
                <LocationInput 
                  selectedLocation={selectedLocation}
                  setSelectedLocation={setSelectedLocation} 
                />
              )}
            </View> 
          )}

          {/* <CreateEventItem icon='eye' text='Visibility' placeholder={previewVisibility} onPress={selectVisibilityHandler}/> */}
          
          <CreateEventItem icon='file-text' text='Notes' placeholder={previewNotes} onPress={selectNotesHandler}/>
        </ScrollView>
      </KeyboardAvoidingView>

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
            <Pressable onPress={createEventHandler.bind(this, token, isOneToOne, meetingTitle, allSectorTagIds, allGradeTagIds, selectedCapacity, selectedDate, selectedStartTime, selectedEndTime, notes, selectedLocation, autoAccept)} style={({pressed}) => [pressed && flag && styles.pressed, styles.submitFormInnerContainer, styles.submitFormInnerRightContainer]}>
              <View style={[styles.submitFormBtnContainer, flag && styles.enabledContainer]}>
                <Text style={[styles.submitFormBtnText, flag && styles.enabledText]}>Create event</Text>
              </View>
            </Pressable>
          </View>
        ) : (
          <Pressable onPress={createEventHandler.bind(this, token, isOneToOne, meetingTitle, allSectorTagIds, allGradeTagIds, selectedCapacity, selectedDate, selectedStartTime, selectedEndTime, notes, selectedLocation, autoAccept)} style={({pressed}) => pressed && flag && styles.pressed}>
            <View style={[styles.submitFormBtnContainer, flag && styles.enabledContainer]}>
              <Text style={[styles.submitFormBtnText, flag && styles.enabledText]}>Create event</Text>
            </View>
          </Pressable>
        )}
      </View>

      <Modal
        animationType="fade"
        transparent={false}
        visible={modalVisible}
        // presentationStyle='pageSheet'
        onRequestClose={() => {
          // Alert.alert('Modal has been closed.');
          setModalVisible(!modalVisible);
        }}>
        <View style={styles.modalContent}>
          <View style={styles.modalView}>
            <Text style={styles.modalTitle}>Your event is now online!</Text>
            <Text style={styles.modalText} >Thank you for being part of this community! At the same time, we would like to suggest you that seize this opportunity to build a strong connection during the event and engage with the participants continuously.</Text>
            <Pressable onPress={onHideModal} style={({pressed}) => pressed && styles.pressed}>
              <View style={[styles.submitFormBtnContainer, styles.enabledContainer]}>
                <Text style={[styles.submitFormBtnText, styles.enabledText]}>Close</Text>
              </View>
            </Pressable>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default CreateEventForm;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  innerContainer: {
    justifyContent: 'space-between'
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
    justifyContent: 'flex-end',
    paddingHorizontal: 12,
    paddingTop: 16,
    paddingBottom: 50
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
  },
  modalContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#00000080',
    // opacity: '50%'
  },
  modalView: {
    height: '55%',
    width: '90%',
    backgroundColor: '#FCFCFC', 
    padding: 20,
    borderRadius: 18,
    // alignItems: 'center'
  },
  modalTitle: {
    fontSize: 24,
    color: '#1A4821',
    fontFamily: 'product-sans-bold',
    textAlign: 'center'
  },
  modalText: {
    color: '#1A4821',
    fontFamily: 'roboto',
    fontSize: 15,
    lineHeight: 20,
    marginTop: 36,
    marginBottom: 45,
    textAlign: 'center'
  }
});