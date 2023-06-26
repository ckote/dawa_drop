import { FlatList, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { useUserContext } from "../../context/hooks";
import { useUser } from "../../api/hooks";
import { List } from "react-native-paper";
import moment from "moment";
import colors from "../../utils/colors";

const PointsHistory = ({ navigation }) => {
  const { token } = useUserContext();
  const { getMyPointsHistory } = useUser();
  const [pointsHistory, setPointsHistory] = useState([]);

  const fetchHistory = async () => {
    const response = await getMyPointsHistory(token);
    if (response.ok) {
      setPointsHistory(response.data.results);
    } else {
      console.log(
        "Points History screen fetch history",
        response.problem,
        response.data
      );
    }
  };

  useEffect(() => {
    fetchHistory();
  }, []);
  console.log(pointsHistory);
  return (
    <View>
      <FlatList
        data={pointsHistory}
        renderItem={({ item, index }) => (
          <List.Item
            style={styles.item}
            key={index}
            title={item.order.id}
            titleStyle={styles.title}
            descriptionStyle={styles.description}
            description={moment(item.created_at).format("ddd Do MMM YYYY")}
            right={(props) => (
              <View style={styles.textContainer}>
                <Text style={styles.text}>{item.points_awarded} PTS</Text>
              </View>
            )}
            left={(props) => (
              <List.Image
                {...props}
                source={require("./../../assets/trophy.png")}
              />
            )}
          />
        )}
      />
    </View>
  );
};

export default PointsHistory;

const styles = StyleSheet.create({
  title: {},
  description: {
    color: colors.medium,
  },
  item: {
    marginVertical: 5,
    backgroundColor: colors.white,
  },
  text: {
    backgroundColor: colors.primary,
    verticalAlign: "middle",
    borderRadius: 10,
    padding: 5,
    fontWeight: "bold",
    color: colors.white,
  },
  textContainer: {
    justifyContent: "center",
  },
});
