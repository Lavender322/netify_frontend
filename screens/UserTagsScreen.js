import { useEffect, useState, useContext } from 'react';
import { StyleSheet, Text, View, Pressable } from 'react-native';
import { AuthContext } from '../store/context/auth-context';
import { fetchTags, setTags } from '../utils/http';
import TagItem from '../components/TagItem';
import IconButton from '../components/ui/IconButton';
import LoadingOverlay from '../components/ui/LoadingOverlay';

function UserTagsScreen({ navigation }) {
  const [isFetching, setIsFetching] = useState(true);
  const [isSelectedSector, setIsSelectedSector] = useState([false, false, false, false, false, false, false]);
  const [isSelectedGrade, setIsSelectedGrade] = useState([false, false, false, false, false, false]);
  const [sector, setSector] = useState(null);
  const [grade, setGrade] = useState(null);
  const [flag, setFlag] = useState(false);

// TO COMMENT OUT
  const { token, authenticate, sectorTags, setSectorTags, gradeTags, setGradeTags } = useContext(AuthContext);
  // const { authenticate, sectorTags, setSectorTags, gradeTags, setGradeTags } = useContext(AuthContext);
  // const token = 'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIxNmE5YTZmMy02YjZkLTQ4ZGYtOTk2OS1hZDYxYWQ3ZDlkOGEiLCJpYXQiOjE2OTE3NDU2MTYsImV4cCI6MjU1NTc0NTYxNn0.c1hFaFFIxbI0dl8xq7kCRSMP1HAUZDCmsLeIQ6HFlxMnniypZveeiv4aopwNbLcK6zvp3ofod5G1B4Pu8A7FGg';

  useEffect(() => {
    async function getTags() {
      setIsFetching(true);
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
      setIsFetching(false);
    };

    getTags();
  }, []);

  useEffect(() => {
    if (sector && grade) {
      setFlag(true);
    } else {
      setFlag(false);
    };
  }, [sector, grade]);

  function handleSelectSectorTag(idx) {
    const updatedArray = [...isSelectedSector];
    updatedArray[idx] = !isSelectedSector[idx];
    updatedArray.map((sector, i) => {
      i !== idx && (updatedArray[i] = false);
    });
    setIsSelectedSector(updatedArray);
    if (updatedArray[idx]) {
      setSector(sectorTags[idx]);
    } else {
      setSector(null);
    };
  };

  function handleSelectGradeTag(idx) {
    const updatedArray = [...isSelectedGrade];
    updatedArray[idx] = !isSelectedGrade[idx];
    updatedArray.map((grade, i) => {
      i !== idx && (updatedArray[i] = false);
    });
    setIsSelectedGrade(updatedArray);
    if (updatedArray[idx]) {
      setGrade(gradeTags[idx]);
    } else {
      setGrade(null);
    };
  };

  function previousStepHandler() {
    navigation.navigate('UserInfo');
  };

  async function nextStepHandler() {
    if (flag) {
      setIsFetching(true);
      try {
        await setTags([sector.id.toString(), grade.id.toString()], token);
        authenticate(token);
      } catch (error) {
        console.log(error.response.data);
        setIsFetching(false);
      };    
    };
  };

  if (isFetching) {
    return <LoadingOverlay />
  };

  return (
    <View style={styles.container}>
      <IconButton icon="arrow-left" size={24} color="black" style={styles.goBackButton} onPress={previousStepHandler}/>
      <View style={styles.mainContainer}>
        <Text style={styles.headerText}>Tell us about yourself</Text>
        <Text style={styles.sectorTagTitle}>Select Your Sector Team</Text>
        <View style={styles.sectorTagsContainer}>
          {sectorTags.map((tag, idx) => (
            <Pressable onPress={handleSelectSectorTag.bind(this, idx)} key={tag.id}>
              <TagItem tagText={tag.tagName} isSelected={isSelectedSector[idx]} />
            </Pressable>
          ))}
        </View>
        <Text style={styles.gradeTagTitle}>Select Your Grade</Text>
        <View style={styles.gradeTagsContainer}>
          {gradeTags.map((tag, idx) => (
            <Pressable onPress={handleSelectGradeTag.bind(this, idx)} key={tag.id}>
              <TagItem tagText={tag.tagName} isSelected={isSelectedGrade[idx]} />
            </Pressable>
          ))}
        </View>        
      </View>
      <View style={styles.submitFormContainer}>
        <Text style={styles.submitFormText}>Let's become more connected</Text>
        <Pressable onPress={nextStepHandler} style={({pressed}) => pressed && styles.pressed}>
          <View style={[styles.submitFormBtnContainer, flag && styles.enabledContainer]}>
            <Text style={[styles.submitFormBtnText, flag && styles.enabledText]}>Start Chatting</Text>
          </View>
        </Pressable>
      </View>
    </View>
  )
}

export default UserTagsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  goBackButton: {
    marginTop: 56,
    marginLeft: 16
  },
  mainContainer: {
    padding: 16,
    flex: 1,
    marginHorizontal: 16,
    marginBottom: 20,
  },
  headerText: {
    marginTop: 38,
    marginBottom: 55,
    fontSize: 28,
    fontFamily: 'roboto-bold'
  },
  sectorTagTitle: {
    marginBottom: 8,
    fontFamily: 'roboto',
    color: '#4F4F4F'
  },
  sectorTagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap'
  },
  gradeTagTitle: {
    marginTop: 24,
    marginBottom: 8,
    fontFamily: 'roboto',
    color: '#4F4F4F'
  },
  gradeTagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap'
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