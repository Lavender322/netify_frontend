
import { useContext, useEffect, useState } from 'react';
import { StyleSheet, Text, View, Image, Pressable } from 'react-native';
import { AuthContext } from '../store/context/auth-context';
import IconButton from '../components/ui/IconButton';
import { fetchTags } from '../utils/http';

function ProfileScreen({ navigation }) {
  const [sectorTags, setSectorTags] = useState([]);
  const [gradeTags, setGradeTags] = useState([]);
  const [userGradeTag, setUserGradeTag] = useState();
  const [userSectorTag, setUserSectorTag] = useState();

  const { userInfo } = useContext(AuthContext);

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
    if (userInfo && userInfo.userTag && gradeTags.length && sectorTags.length) {
      const userGradeTag = gradeTags.filter((gradeTag) => {
        return userInfo.userTag.includes(gradeTag.tagId);
      });
    
      const userSectorTag = sectorTags.filter((sectorTag) => {
        return userInfo.userTag.includes(sectorTag.tagId);
      });
  
      setUserGradeTag(userGradeTag[0] && userGradeTag[0].tagName);
      setUserSectorTag(userSectorTag[0] && userSectorTag[0].tagName);
    };
  }, [userInfo, gradeTags, sectorTags]);

  function directToSettingsHandler() {
    navigation.navigate('Settings');
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>{userInfo.localizedfirstname}</Text>
        <IconButton icon="settings" size={24} color="#3B4852" style={styles.settingsButton} onPress={directToSettingsHandler}/>
      </View>
      <View style={styles.mainContainer}>
        <Image source={{uri: userInfo.userImage[3]}} style={styles.avatar} />
        <Text style={styles.name}>{userInfo.localizedfirstname + ' ' + userInfo.localizedlastname}</Text>
        <View style={styles.roleContainer}>
          <Text style={styles.grade}>{userGradeTag ? userGradeTag : '--'}</Text> 
          <View style={styles.sectorContainer}>
            <Text style={styles.sector}>{userSectorTag ? userSectorTag : '--'}</Text>
          </View>
        </View>
        <View style={styles.activities}>

        </View>
      </View>
    </View>
    // <Pressable  onPress={logoutHandler}>
    //   <Text>logout</Text>
    // </Pressable>
  )
}

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 16,
    paddingHorizontal: 7
  },
  headerContainer: {
    flexDirection: 'row',
    marginTop: 58,
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  headerText: {
    fontFamily: 'roboto-bold',
    fontSize: 24,
    color: '#000000E5',
    marginLeft: 13,
  },
  settingsButton: {
    marginRight: 13
  },
  mainContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatar: {
    width: 120,
    height: 120,
    marginTop: 24,
    borderRadius: 66,
    overflow: 'hidden',
    borderWidth: 3,
    borderColor: '#ffffff'
  },
  name: {
    color: '#000000E5',
    fontFamily: 'roboto-bold',
    fontSize: 21,
    marginTop: 24,
    marginBottom: 12
  },
  roleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24
  },
  grade: {
    fontFamily: 'roboto-medium',
    fontSize: 17,
    color: '#000000E5',
    marginRight: 12
  },
  sectorContainer: {
    borderRadius: 6,
    paddingVertical: 4,
    paddingHorizontal: 16,
    backgroundColor: '#E6E6E6'
  },
  sector: {
    color: '#3B4852',
    fontFamily: 'roboto-medium',
    fontSize: 15
  },
  activities: {
    backgroundColor: '#ffffff',
    
  }
});