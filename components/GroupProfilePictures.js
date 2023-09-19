import { StyleSheet, View, Image } from 'react-native';

function GroupProfilePictures({ host, participants, isSeparate }) {
  if (!participants) {
    return (
      <Image source={{uri: host.userImage[3]}} style={styles.avatar} />
    )
  };

  if ((participants.length + 1) === 2) {
    return (
      <View style={styles.twoImages}>
        <Image source={{uri: host.userImage[3]}} style={styles.smallAvatar} />
        {isSeparate ? (
          <Image source={{uri: participants[0].user.userImage[3]}} style={styles.smallAvatar} />
        ) : (
          <Image source={{uri: participants[0].userImage[3]}} style={styles.smallAvatar} />
        )}
      </View>
    )
  };

  if ((participants.length + 1) === 3) {
    return (
      <View style={styles.threeImages}>
        <Image source={{uri: host.userImage[3]}} style={[styles.smallAvatar, styles.verticalGap, styles.topAvatar]} />
        {isSeparate ? (
          <>
            <Image source={{uri: participants[0].user.userImage[3]}} style={styles.smallAvatar} />
            <Image source={{uri: participants[1].user.userImage[3]}} style={styles.smallAvatar} />
          </>
        ) : (
          <>
            <Image source={{uri: participants[0].userImage[3]}} style={styles.smallAvatar} />
            <Image source={{uri: participants[1].userImage[3]}} style={styles.smallAvatar} />
          </>
        )}
      </View>
    )
  };

  if ((participants.length + 1) >= 4) {
    return (
      <View style={styles.fourImages}>
        <Image source={{uri: host.userImage[3]}} style={[styles.smallAvatar, styles.verticalGap]} />
        {isSeparate ? (
          <>
            <Image source={{uri: participants[0].user.userImage[3]}} style={[styles.smallAvatar, styles.verticalGap]} />
            <Image source={{uri: participants[1].user.userImage[3]}} style={styles.smallAvatar} />
            <Image source={{uri: participants[2].user.userImage[3]}} style={styles.smallAvatar} />
          </>
        ) : (
          <>
            <Image source={{uri: participants[0].userImage[3]}} style={[styles.smallAvatar, styles.verticalGap]} />
            <Image source={{uri: participants[1].userImage[3]}} style={styles.smallAvatar} />
            <Image source={{uri: participants[2].userImage[3]}} style={styles.smallAvatar} />
          </>
        )}
      </View>
    )
  }
}

export default GroupProfilePictures;

const styles = StyleSheet.create({
  twoImages: {
    width: 64,
    height: 64,
    marginRight: 6,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  threeImages: {
    width: 64,
    height: 64,
    marginRight: 6,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexWrap: 'wrap'
  },
  fourImages: {
    width: 64,
    height: 64,
    marginRight: 6,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexWrap: 'wrap'
  },
  smallAvatar: {
    width: 30,
    height: 30,
    borderRadius: 15
  },
  verticalGap: {
    marginBottom: 4
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30
  },
  topAvatar: {
    marginHorizontal: 17
  }
});