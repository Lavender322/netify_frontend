import { useEffect, useState, useContext } from 'react';
import { StyleSheet, View, Pressable, KeyboardAvoidingView, TextInput, Text, Image, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import { getFormattedDate } from '../utils/date';

function CancelEventScreen({ navigation, route }) {
  const [eventParticipantGradeTag, setEventParticipantGradeTag] = useState();
  const [eventParticipantSectorTag, setEventParticipantSectorTag] = useState();
  const [enteredText, setEnteredText] = useState('');

  const eventId = route.params?.eventId;
  const sectorTags = route.params?.sectorTags;
  const gradeTags = route.params?.gradeTags;
  const eventParticipants = route.params?.eventParticipants;
  const eventDetails = route.params?.eventDetails;


  useEffect(() => {
    if (eventParticipants && eventParticipants[0].user.userTag && gradeTags.length && sectorTags.length) {
      const eventParticipantGradeTag = gradeTags.filter((gradeTag) => {
        return eventParticipants[0].user.userTag.includes(gradeTag.tagId);
      });
    
      const eventParticipantSectorTag = sectorTags.filter((sectorTag) => {
        return eventParticipants[0].user.userTag.includes(sectorTag.tagId);
      });
  
      setEventParticipantGradeTag(eventParticipantGradeTag[0] && eventParticipantGradeTag[0].tagName);
      setEventParticipantSectorTag(eventParticipantSectorTag[0] && eventParticipantSectorTag[0].tagName);
    };
  }, [eventParticipants, gradeTags, sectorTags]);

  function textInputHandler(enteredText) {
    setEnteredText(enteredText);
  };

  function previousStepHandler() {
    navigation.goBack();
  };

  function comfirmCancellationHandler() {

  };



  return (
    <View style={styles.container}>
      <KeyboardAvoidingView style={styles.container} behavior='padding'>
        <View style={styles.headerContainer}>
          <Pressable onPress={previousStepHandler} style={({pressed}) => [pressed && styles.pressed, styles.placeholder, styles.closeBtnContainer]}>
            <View style={styles.closeBtn}>
              <Ionicons name="close" size={24} color="black" />
            </View>
          </Pressable>
        </View>

        <View style={styles.mainContainer}>
          <View style={styles.infoContainer}>
            <Text style={styles.title}>Cancel this session?</Text>
            <Image source={{uri: eventParticipants[0].user.userImage[3]}} style={styles.avatar} />
            <Text style={styles.name}>{eventParticipants[0].user.localizedfirstname + ' ' + eventParticipants[0].user.localizedlastname}</Text>
            <View style={[styles.detailInnerContainer, styles.roleContainer]}>
              <View style={styles.gradeContainer}>
                <Text style={styles.grade}>{eventParticipantGradeTag ? eventParticipantGradeTag : '--'}</Text> 
              </View>
              <View style={styles.sectorContainer}>
                <Text style={styles.sector}>{eventParticipantSectorTag ? eventParticipantSectorTag : '--'}</Text>
              </View>
            </View>
            <View style={[styles.detailInnerContainer, styles.timeContainer]}>
              <Feather name="calendar" size={18} color="#3C8722" />
              <Text style={styles.period}>{eventDetails.eventStartTime.substring(11,16) + ' - ' + eventDetails.eventEndTime.substring(11,16)}</Text>
              <Text style={styles.date}>{getFormattedDate(eventDetails.eventStartTime, true)}</Text>
            </View>
            {eventDetails.eventLocation && eventDetails.eventLocation !== '' && (
              <View style={[styles.detailInnerContainer, styles.locationContainer]}>
                <Feather name="map-pin" size={18} color="black" />
                <Text style={styles.location}>{eventDetails.eventLocation}</Text>
              </View>
            )}
          </View>

          <View style={styles.textInputOuterContainer}>
            <Text style={styles.note}>To Kevin Liang:</Text>
            <View style={styles.textInputContainer}>
              <TextInput 
                multiline={true}
                style={styles.textInput} 
                placeholder="Optional message"
                placeholderTextColor="#6A6A6A"
                maxLength={2500}
                onChangeText={textInputHandler}
                value={enteredText}
              />
            </View>
          </View>
        </View>

        <View style={styles.submitFormContainer}>
          <Pressable onPress={(comfirmCancellationHandler)} style={({pressed}) => pressed && styles.pressed}>
            <View style={styles.submitFormBtnContainer}>
              <Text style={[styles.submitFormBtnText, styles.enabledText]}>Yes, Cancel it</Text>
            </View>
          </Pressable>
        </View>
      </KeyboardAvoidingView>
    </View>
  )
}

export default CancelEventScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },  
  headerContainer: {
    flexDirection: 'row',
    marginTop: 15,
    marginBottom: 26,
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingHorizontal: 20,
  },
  closeBtnContainer: {
    alignItems: 'flex-end'
  },
  closeBtn: {
    width: 40,
    height: 40,
    backgroundColor: '#E6E6E6',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 23
  },
  title: {
    fontFamily: 'product-sans-bold',
    fontSize: 24,
    color: '#1A4821',
    textAlign: 'center'
  },
  pressed: {
    opacity: 0.75
  },
  textInput: {
    color: '#191919',
    fontSize: 15,
    fontFamily: 'roboto',
    lineHeight: 20,
    height: 100,
    textAlignVertical: 'top',
    borderColor: '#0000001A',
    borderWidth: 1,
    borderRadius: 6,
    padding: 8,
  },
  note: {
    color: '#1A1A1A',
    fontFamily: 'roboto-bold',
    lineHeight: 16,
    fontSize: 16,
    marginBottom: 24
  },
  capacityContainer: {
    alignItems: 'center',
    marginTop: 36
  },
  number: {
    fontFamily: 'roboto-bold',
    fontSize: 48,
    color: '#1A1A1A'
  },
  capacityText: {
    fontFamily: 'roboto',
    color: '#4F4F4F',
    lineHeight: 20
  },
  infoContainer: {
    alignItems: 'center'
  },
  submitFormContainer: {
    marginBottom: 80,
    paddingTop: 16,
    paddingHorizontal: 12,
    backgroundColor: 'white'
  },
  submitFormText: {
    fontSize: 16,
    color: '#000000E5',
    marginBottom: 10,
    textAlign: 'center',
    fontFamily: 'roboto'
  },
  submitFormBtnContainer: {
    backgroundColor: '#1A4821',
    borderRadius: 8,
    paddingVertical: 13,
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
  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 12,
    marginTop: 36
  },
  switchText: {
    color: '#000000E5',
    fontFamily: 'roboto-medium',
    fontSize: 16,
    marginLeft: 8
  },
  accordionContainer: {
    marginTop: 50,
    marginHorizontal: 12
  },
  accordionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#F1F1F1',
    padding: 8,
    borderRadius: 6,
    zIndex: 2
  },
  accordionHeaderTitle: {
    color: '#1A1A1A',
    fontFamily: 'roboto-medium',
    fontSize: 15,
    lineHeight: 22
  },
  hide: {
    display: 'none'
  },
  filters: {
    zIndex: 100
  },
  filtersContainer: {
    position: 'absolute',
    width: '100%'
  },
  mainContainer: {
    flex: 1,
  },
  avatar: {
    width: 120,
    height: 120,
    marginVertical: 36,
    borderRadius: 66,
    overflow: 'hidden',
    borderWidth: 3,
    borderColor: '#ffffff',
  },
  detailInnerContainer: {
    flexDirection: 'row',
    alignItems: 'center'
  },  
  timeContainer: {
    marginTop: 16
  },
  period: {
    color: '#3C8722',
    fontFamily: 'roboto-medium',
    fontSize: 16,
    marginHorizontal: 8
  },
  date: {
    color: '#3C8722',
    fontFamily: 'roboto-medium',
    fontSize: 16
  },
  locationContainer: {
    marginTop: 8
  },
  location: {
    fontFamily: 'roboto-medium',
    fontSize: 16,
    color: '#191919',
    marginLeft: 4
  },
  name: {
    fontFamily: 'roboto-bold',
    fontSize: 16,
    color: '#1A1A1A',
  },
  roleContainer: {
    marginTop: 4,
  },
  grade: {
    fontFamily: 'roboto-medium',
    fontSize: 12,
    lineHeight: 14,
    color: '#3B4852',
    
  },
  sectorContainer: {
    borderRadius: 2,
    paddingVertical: 2,
    paddingHorizontal: 6,
    backgroundColor: '#E9E9E9'
  },
  gradeContainer: {
    borderRadius: 2,
    paddingVertical: 2,
    paddingRight: 6,
    backgroundColor: '#F8F8F8',
    marginRight: 4
  },
  sector: {
    color: '#3B4852',
    fontFamily: 'roboto-medium',
    fontSize: 12,
    lineHeight: 14
  },
  textInputOuterContainer: {
    marginHorizontal: 40,
    marginTop: 40,
  }
});