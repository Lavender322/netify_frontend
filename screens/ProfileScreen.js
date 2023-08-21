
import { useContext } from 'react';
import { StyleSheet, Text, View, Pressable } from 'react-native';
import { AuthContext } from '../store/context/auth-context';

function ProfileScreen() {
  const { logout } = useContext(AuthContext);

  function logoutHandler() {
    logout();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Profile</Text>
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
  // headerText: {
  //   fontSize: 24,
  //   fontFamily: 'roboto-bold',
  //   marginTop: 58,
  //   marginLeft: 13,
  //   color: '#000000E5'
  // },

  headerText: {
    fontFamily: 'roboto-bold',
    fontSize: 24,
    color: '#000000E5',
    marginTop: 58,
    marginLeft: 13,
  },
});