import { StyleSheet, View } from "react-native";
import { Text } from "react-native-paper";
import React from "react";

const AgentOrderDetailScreen = ({ naigation, route }) => {
  const delivery = route.params;
  const { delivery_id } = delivery;
  return (
    <View>
      <Text variant="headlineLarge" style={styles.title}>
        {delivery_id}
      </Text>
      
    </View>
  );
};

export default AgentOrderDetailScreen;

const styles = StyleSheet.create({
  screen: {},
  title: {
    textAlign: "center",
    padding: 10,
  },
});
