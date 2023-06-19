import { Image, StyleSheet, View } from "react-native";
import React from "react";
import colors from "../../utils/colors";
import { Text } from "react-native-paper";
import IconText from "../display/IconText";

const LoyaltyPointsCard = ({ points = 0, level = "Gold" }) => {
  return (
    <View style={styles.container}>
      <View style={[styles.row, { justifyContent: "space-between" }]}>
        <Text variant="bodyLarge" style={[styles.levelText, styles.headerText]}>
          Loyalty balance
        </Text>
        <View style={styles.level}>
          <Text variant="bodyLarge" style={[styles.levelText]}>
            {level}
          </Text>
        </View>
      </View>
      <View style={styles.row}>
        <View>
          <Image
            source={require("../../assets/trophy.png")}
            style={styles.image}
            resizeMode="contain"
          />
        </View>
        <View style={styles.content}>
          <Text variant="headlineLarge" style={styles.pointsText}>
            {points} points
          </Text>
          <Text variant="bodyLarge" style={styles.text}>
            Earn {points} more points to reach gold platinum
          </Text>
        </View>
      </View>
    </View>
  );
};

export default LoyaltyPointsCard;

const styles = StyleSheet.create({
  level: {
    backgroundColor: colors.gold,
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 10,
  },
  levelText: {
    paddingHorizontal: 10,
    fontWeight: "bold",
  },
  container: {
    marginHorizontal: 10,
    backgroundColor: colors.white,
    borderRadius: 20,
    padding: 10,
    marginBottom: 10,
  },
  image: {
    width: 70,
    height: 70,
    borderRadius: 50,
    borderWidth: 3,
    borderColor: colors.gold,
  },
  row: {
    flexDirection: "row",
    marginVertical: 5,
  },
  content: {
    justifyContent: "center",
    padding: 10,
  },
  pointsText: {
    color: colors.gold,
  },
  headerText: {
    paddingHorizontal: 20,
    fontWeight: "bold",
    paddingTop: 5,
    color: colors.primary,
  },
  text: {
    color: colors.primary,
  },
});
