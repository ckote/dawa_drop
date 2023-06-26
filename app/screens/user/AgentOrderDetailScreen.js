import { StyleSheet, Text, View } from "react-native";
import React from "react";

const AgentOrderDetailScreen = ({ naigation, route }) => {
  const order = route.params;

  return (
    <View>
      <Text>AgentOrderDetailScreen</Text>
    </View>
  );
};

export default AgentOrderDetailScreen;

const styles = StyleSheet.create({});
