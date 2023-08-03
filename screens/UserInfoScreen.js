import { StyleSheet, Text, View, Image, Alert} from 'react-native';
import IconButton from '../components/ui/IconButton';
import { fetchUserInfo } from '../utils/http';
import { UserContext } from '../store/context/user-context';
import { useContext, useState, useEffect } from 'react';
import LoadingOverlay from '../components/ui/LoadingOverlay';

function UserInfoScreen({ navigation }) {
  const [isFetching, setIsFetching] = useState(true);
  const [name, setName] = useState(null);
  const [email, setEmail] = useState(null);
  const [avatarUrl, setAvatarUrl] = useState(null);

  const { token } = useContext(UserContext);

  useEffect(() => {
    if (token) {
      async function getUserInfo() {
        setIsFetching(true);
        try {
          const userInfo = await fetchUserInfo(token);
          setEmail(userInfo.email);
          setName(userInfo.localizedfirstname + ' ' + userInfo.localizedlastname);
          setAvatarUrl(userInfo.userImage[0]);
        } catch (error) {
          console.log(error.response.data);
        };
        setIsFetching(false);
      };

      getUserInfo();
    };
  }, [token]);

  function previousStepHandler() {
    navigation.navigate('Landing');
  };

  function nextStepHandler() {
    navigation.navigate('UserTags');
  };

  if (isFetching) {
    return <LoadingOverlay />
  };

  return (
    <View style={styles.container}>
      <IconButton icon="arrow-left" size={24} color="black" style={styles.goBackButton} onPress={previousStepHandler} />
      <View style={styles.mainContainer}>
        <View>
          <View style={styles.headerContainer}>
            <Text style={styles.headerText}>Is this you?</Text>
            <Image source={{uri: avatarUrl}} style={styles.avatar} />
          </View>
          <View style={styles.userInfoName}>
            <Text style={styles.userInfoTitle}>Name</Text>
            <Text style={styles.userInfoText}>{name}</Text>
          </View>
          <View style={styles.userInfoEmail}>
            <Text style={styles.userInfoTitle}>Email</Text>
            <Text style={styles.userInfoText}>{email}</Text>
          </View>
          <Text style={styles.userInfoNote}>To ensure the authenticity of the account, we temporarily do not support editing personal information.</Text>
        </View>
        <View style={styles.goForwardBtnContainer}>
          <IconButton icon="arrow-right" size={60} color="white" style={styles.goForwardBtn} onPress={nextStepHandler} />
        </View>
      </View>
    </View>
  )
}

export default UserInfoScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  goBackButton: {
    marginTop: 40,
  },
  mainContainer: {
    padding: 16,
    justifyContent: 'space-between',
    flex: 1,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 20,
  },
  headerText: {
    fontSize: 28,
    fontFamily: 'roboto-bold'
  },
  avatar: {
    width: 60,
    height: 60,
  },
  userInfoName: {
    marginTop: 42,
  },
  userInfoTitle: {
    marginBottom: 12,
    color: '#4F4F4F',
    fontFamily: 'roboto'
  },
  userInfoText: {
    fontSize: 16,
    fontFamily: 'roboto-medium',
    color: '#000000E5',
  },
  userInfoEmail: {
    marginTop: 20,
  },
  userInfoNote: {
    color: 'rgba(79, 79, 79, 1)',
    marginTop: 20,
    fontFamily: 'roboto'
  },
  goForwardBtnContainer: {
    alignItems: 'flex-end'
  },
  goForwardBtn: {
    backgroundColor: '#1A4821',
    borderRadius: 40,
    width: 80,
    height: 80,
    justifyContent: 'center',
    alignItems: 'center',
    bottom: 0
  }
});