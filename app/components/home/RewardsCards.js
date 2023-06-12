import { StyleSheet, TouchableOpacity, View } from "react-native";
import React from "react";
import { FlatList } from "react-native";
import { Text } from "react-native-paper";
import { screenWidth } from "../../utils/contants";
import colors from "../../utils/colors";
import { Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import routes from "../../navigation/routes";
const RewardsCards = ({ rewards, backgroundColor = colors.light }) => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <Text style={styles.header} variant="titleMedium">
        Programs Rewards to win
      </Text>
      <FlatList
        data={rewards}
        contentContainerStyle={styles.programesContainer}
        keyExtractor={({ url }) => url}
        showsHorizontalScrollIndicator={false}
        horizontal
        renderItem={({ item }) => {
          const {
            name,
            unit_point,
            image,
            description,
            point_value,
            members_count,
            program: { name: programe_name },
            is_default,
          } = item;
          return (
            <TouchableOpacity
              onPress={() =>
                navigation.navigate(routes.USER_NAVIGATION, {
                  screen: routes.REWARD_DETAIL_SCREEN,
                  params: item,
                })
              }
            >
              <View style={[styles.programeCard, { backgroundColor }]}>
                <Image
                  style={styles.programImage}
                  resizeMode="contain"
                  source={{ uri: image }}
                />
                {/* <View style={styles.devidor} /> */}
                <View>
                  <Text
                    variant="titleSmall"
                    style={styles.title}
                    numberOfLines={1}
                  >
                    {name}
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
};

export default RewardsCards;

const styles = StyleSheet.create({
  programImage: {
    height: screenWidth * 0.15,
  },
  programesContainer: {
    // padding: 10,
  },
  programeCard: {
    // height: screenWidth * 0.35,
    width: screenWidth * 0.2,
    margin: 5,

    borderRadius: 20,
    padding: 5,
  },
  devidor: {
    borderWidth: 1,
    margin: 2,
    borderColor: colors.medium,
  },
  title: {
    color: colors.medium,
    textAlign: "center",
    // fontWeight: "bold",
  },
  text: {
    color: colors.medium,
    fontSize: 12,
  },
  header: {
    paddingHorizontal: 20,
    fontWeight: "bold",
    paddingTop: 5,
    color: colors.white,
  },
  container: {
    backgroundColor: colors.primary,
    borderRadius: 40,
    marginHorizontal: 10,
    marginBottom: 10,
    padding: 10,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  bold: {
    fontWeight: "bold",
  },
});
