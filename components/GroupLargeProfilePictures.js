import { StyleSheet, View, Image, Text } from 'react-native';

function GroupLargeProfilePictures({ host, participants, isSeparate }) {
  if (!participants) {
    return (
      <>
        {host ? (
          <Image source={{uri: host.userImage[3]}} style={styles.avatar} />
        ) : null}
      </>
    )
  };

  if (((participants.length === 1) && host) || ((participants.length === 2) && !host)) {
    return (
      <View style={styles.container}>
        <View style={styles.twoImages}>
          {host ? (
            <>
              <Image source={{uri: host.userImage[3]}} style={styles.smallAvatar} />
              {isSeparate ? (
                <Image source={{uri: participants[0].user.userImage[3]}} style={styles.smallAvatar} />
              ) : (
                <Image source={{uri: participants[0].userImage[3]}} style={styles.smallAvatar} />
              )}
            </>
          ) : (
            <>
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
            </>
          )}
        </View>
      </View>
    )
  };

  if (((participants.length === 2) && host) || ((participants.length === 3) && !host)) {
    return (
      <View style={styles.container}>
        <View style={styles.threeImages}>
          {host ? (
            <>
              <Image source={{uri: host.userImage[3]}} style={styles.smallAvatar} />
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
            </>
          ) : (
            <>
              {isSeparate ? (
                <>
                  <Image source={{uri: participants[0].user.userImage[3]}} style={styles.smallAvatar} />
                  <Image source={{uri: participants[1].user.userImage[3]}} style={styles.smallAvatar} />
                  <Image source={{uri: participants[2].user.userImage[3]}} style={styles.smallAvatar} />
                </>
              ) : (
                <>
                  <Image source={{uri: participants[0].userImage[3]}} style={styles.smallAvatar} />
                  <Image source={{uri: participants[1].userImage[3]}} style={styles.smallAvatar} />
                  <Image source={{uri: participants[2].userImage[3]}} style={styles.smallAvatar} />
                </>
              )}
            </>
          )}
        </View>
      </View>
    )
  };

  if (((participants.length === 3) && host) || ((participants.length === 4) && !host)) {
    return (
      <View style={styles.container}>
        <View style={styles.fourImages}>
          {host ? (
            <>
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
            </>
          ) : (
            <>
              {isSeparate ? (
                <>
                  <Image source={{uri: participants[0].user.userImage[3]}} style={[styles.smallAvatar, styles.verticalGap]} />
                  <Image source={{uri: participants[1].user.userImage[3]}} style={[styles.smallAvatar, styles.verticalGap]} />
                  <Image source={{uri: participants[2].user.userImage[3]}} style={styles.smallAvatar} />
                  <Image source={{uri: participants[3].user.userImage[3]}} style={styles.smallAvatar} />
                </>
              ) : (
                <>
                  <Image source={{uri: participants[0].userImage[3]}} style={[styles.smallAvatar, styles.verticalGap]} />
                  <Image source={{uri: participants[1].userImage[3]}} style={[styles.smallAvatar, styles.verticalGap]} />
                  <Image source={{uri: participants[2].userImage[3]}} style={styles.smallAvatar} />
                  <Image source={{uri: participants[3].userImage[3]}} style={styles.smallAvatar} />
                </>
              )}
            </>
          )}
          
        </View>
      </View>
    )
  };

  if (((participants.length >= 4) && host) || ((participants.length >=5) && !host)) {
    return (
      <View style={styles.container}>
        <View style={styles.fiveImages}>
          {host ? (
            <>
              <Image source={{uri: host.userImage[3]}} style={[styles.smallAvatar, styles.verticalGap]} />
              {isSeparate ? (
                <>
                  <Image source={{uri: participants[0].user.userImage[3]}} style={[styles.smallAvatar, styles.verticalGap]} />
                  <Image source={{uri: participants[1].user.userImage[3]}} style={[styles.smallAvatar, styles.verticalGap]} />
                  <View style={styles.bottomAvatarContainer}>
                    <Image source={{uri: participants[2].user.userImage[3]}} style={[styles.smallAvatar, styles.bottomLeftAvatar]} />
                    <View style={[styles.smallAvatar, styles.plusContainer]}>
                      <Text style={styles.plusText}>+{participants.length - 3}</Text>
                    </View>
                  </View>
                </>
              ) : (
                <>
                  <Image source={{uri: participants[0].userImage[3]}} style={[styles.smallAvatar, styles.verticalGap]} />
                  <Image source={{uri: participants[1].userImage[3]}} style={[styles.smallAvatar, styles.verticalGap]} />
                  <View style={styles.bottomAvatarContainer}>
                    <Image source={{uri: participants[2].userImage[3]}} style={[styles.smallAvatar, styles.bottomLeftAvatar]} />
                    <View style={[styles.smallAvatar, styles.plusContainer]}>
                      <Text style={styles.plusText}>+{participants.length - 3}</Text>
                    </View>
                  </View>
                </>
              )}
            </>
          ) : (
            <>
              {isSeparate ? (
                <>
                  <Image source={{uri: participants[0].user.userImage[3]}} style={[styles.smallAvatar, styles.verticalGap]} />
                  <Image source={{uri: participants[1].user.userImage[3]}} style={[styles.smallAvatar, styles.verticalGap]} />
                  <Image source={{uri: participants[2].user.userImage[3]}} style={[styles.smallAvatar, styles.verticalGap]} />
                  <View style={styles.bottomAvatarContainer}>
                    <Image source={{uri: participants[3].user.userImage[3]}} style={[styles.smallAvatar, styles.bottomLeftAvatar]} />
                    <View style={[styles.smallAvatar, styles.plusContainer]}>
                      <Text style={styles.plusText}>+{participants.length - 4}</Text>
                    </View>
                  </View>
                </>
              ) : (
                <>
                  <Image source={{uri: participants[0].userImage[3]}} style={[styles.smallAvatar, styles.verticalGap]} />
                  <Image source={{uri: participants[1].userImage[3]}} style={[styles.smallAvatar, styles.verticalGap]} />
                  <Image source={{uri: participants[2].userImage[3]}} style={[styles.smallAvatar, styles.verticalGap]} />
                  <View style={styles.bottomAvatarContainer}>
                    <Image source={{uri: participants[3].userImage[3]}} style={[styles.smallAvatar, styles.bottomLeftAvatar]} />
                    <View style={[styles.smallAvatar, styles.plusContainer]}>
                      <Text style={styles.plusText}>+{participants.length - 4}</Text>
                    </View>
                  </View>
                </>
              )}
            </>
          )}
        </View>
      </View>
    )
  };
}

export default GroupLargeProfilePictures;

const styles = StyleSheet.create({
  twoImages: {
    width: 128,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  threeImages: {
    width: 196,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexWrap: 'wrap'
  },
  fourImages: {
    width: 128,
    flexDirection: 'row',
    alignItems: 'stretch',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
  },
  fiveImages: {
    width: 196,
    flexDirection: 'row',
    alignItems: 'stretch',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
  },
  smallAvatar: {
    width: 60,
    height: 60,
    borderRadius: 42
  },
  plusContainer: {
    backgroundColor: '#CEF8D0',
    alignItems: 'center',
    justifyContent: 'center'
  },
  plusText: {
    color: '#000000',
    fontFamily: 'roboto-bold',
    fontSize: 24
  },
  verticalGap: {
    marginBottom: 8
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30
  },
  container: {
    position: 'relative'
  },
  bottomAvatarContainer: {
    flexDirection: 'row',
    marginHorizontal: 34,
  },
  bottomLeftAvatar: {
    marginRight: 8
  }
});