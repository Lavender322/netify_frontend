import { StyleSheet, View, Text, ScrollView, Pressable } from 'react-native';

function ActivitiesSentScreen({ navigation }) {
  function directToReceivedHandler() {
    navigation.navigate('ActivitiesReceived');
  };

  function directToConfirmedHandler() {
    navigation.navigate('ActivitiesConfirmed');
  };

  function directToPastHandler() {
    navigation.navigate('ActivitiesPast');
  };

  function directToCancelledHandler() {
    navigation.navigate('ActivitiesCancelled');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Activities</Text>
      <ScrollView horizontal>
        <Pressable onPress={directToReceivedHandler}>
          <View style={[styles.categoryItemContainer, styles.categoryItemInactiveContainer]}>
            <Text style={[styles.categoryText, styles.categoryInactiveText]}>Received</Text>
          </View>
        </Pressable>
        <Pressable>
          <View style={[styles.categoryItemContainer, styles.categoryItemActiveContainer]}>
            <Text style={[styles.categoryText, styles.categoryActiveText]}>Sent</Text>
          </View>
        </Pressable>
        <Pressable onPress={directToConfirmedHandler}>
          <View style={[styles.categoryItemContainer, styles.categoryItemInactiveContainer]}>
            <Text style={[styles.categoryText, styles.categoryInactiveText]}>Confirmed</Text>
          </View>
        </Pressable>
        <Pressable onPress={directToPastHandler}>
          <View style={[styles.categoryItemContainer, styles.categoryItemInactiveContainer]}>
            <Text style={[styles.categoryText, styles.categoryInactiveText]}>Past</Text>
          </View>
        </Pressable>
        <Pressable onPress={directToCancelledHandler}>
          <View style={[styles.categoryItemContainer, styles.categoryItemInactiveContainer]}>
            <Text style={[styles.categoryText, styles.categoryInactiveText]}>Cancelled</Text>
          </View>
        </Pressable>
      </ScrollView>
      <View style={styles.mainContainer}>
      </View>
    </View>
  )
}

export default ActivitiesSentScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 16
  },
  headerText: {
    fontSize: 24,
    fontFamily: 'roboto-bold',
    marginTop: 58,
    marginLeft: 20,
    marginBottom: 16,
    color: '#000000E5'
  },
  categoryItemContainer: {
    height: 48,
    paddingHorizontal: 16,
    borderBottomWidth: 2,
    justifyContent: 'center'
  },
  categoryItemActiveContainer: {
    borderBottomColor: '#3C8722'
  },
  categoryItemInactiveContainer: {
    borderBottomColor: '#C6C6C6'
  },
  categoryText: {
    fontFamily: 'roboto-medium',
    fontSize: 15,
    lineHeight: 21
  },
  categoryInactiveText: {
    color: '#6A6A6A'
  },
  categoryActiveText: {
    color: '#3C8722'
  },
  mainContainer: {
    // flex: 1
  }
});