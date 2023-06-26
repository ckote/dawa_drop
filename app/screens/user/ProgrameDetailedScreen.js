import {
  ScrollView,
  StyleSheet,
  View,
  Image,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { Avatar, Button, Card, List, Text } from "react-native-paper";
import React, { useEffect, useState } from "react";
import { useUserContext } from "../../context/hooks";
import { useHospital, useUser } from "../../api/hooks";
import colors from "../../utils/colors";
import IconText from "../../components/display/IconText";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import routes from "../../navigation/routes";

const ProgrameDetailedScreen = ({ navigation }) => {
  const { token } = useUserContext();
  const { getAwardPrograms, getFAQs } = useHospital();
  const { getMyPoints } = useUser();
  const [programs, setPrograms] = useState([]);
  const [faqs, setFaqs] = useState([]);
  const [myPoints, setMypoints] = useState();

  const handleFetch = async () => {
    let response = await getAwardPrograms({ ordering: "entry_points" });
    if (response.ok) {
      setPrograms(response.data.results);
    } else {
      console.log(
        "Programe detailed screen award programes fetch",
        response.problem,
        response.data
      );
    }
    response = await getMyPoints(token);
    if (response.ok) {
      setMypoints(response.data);
    } else {
      console.log(
        "Programe detailed screen points info fetch",
        response.problem,
        response.data
      );
    }
    response = await getFAQs();
    if (response.ok) {
      setFaqs(response.data.results);
    } else {
      console.log(
        "Programe detailed screen points faq fetch",
        response.problem,
        response.data
      );
    }
  };
  useEffect(() => {
    handleFetch();
  }, []);
  return (
    <ScrollView style={styles.screen}>
      {myPoints && (
        <View style={styles.currProgrameRow}>
          <Image
            source={{ uri: myPoints.current_program_enrolment.program.image }}
            style={styles.image}
            resizeMode="contain"
          />
          <View style={styles.currContent}>
            <Text style={{ color: colors.primary }}>
              Your are current enrolled in
            </Text>
            <Text variant="headlineLarge" style={{ color: colors.gold }}>
              {myPoints.current_program_enrolment.program.name} program
            </Text>
            <IconText
              text="Points history"
              icon="chevron-right"
              left={false}
              size={25}
              onPress={() =>
                navigation.navigate(routes.USER_NAVIGATION, {
                  screen: routes.USER_POINTS_HISTORY_SCREEN,
                })
              }
            />
          </View>
        </View>
      )}
      <FlatList
        data={programs}
        contentContainerStyle={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
        horizontal
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[
              styles.programCard,
              { justifyContent: "center", alignItems: "center" },
            ]}
            onPress={() => {
              navigation.navigate(routes.USER_NAVIGATION, {
                screen: routes.PROGRAM_DETAIL_SCREEN,
                params: item,
              });
            }}
          >
            <View style={styles.programeImageContainer}>
              <Image
                source={{ uri: item.image }}
                style={styles.programImage}
                resizeMode="contain"
              />
            </View>
            <Text variant="bodyLarge">{item.name}</Text>
            <Text
              variant="bodySmall"
              style={{ color: colors.medium, fontWeight: "bold" }}
            >
              {item.entry_points} PTS
            </Text>
            {myPoints && (
              <MaterialCommunityIcons
                name={
                  myPoints.total >= item.entry_points
                    ? "check-circle"
                    : "close-circle"
                }
                color={
                  myPoints.total >= item.entry_points
                    ? colors.success
                    : colors.medium
                }
              />
            )}
          </TouchableOpacity>
        )}
      />
      <Text
        style={{
          color: colors.medium,
          fontWeight: "bold",
          textAlign: "center",
          padding: 10,
        }}
      >
        Redeeming points won't affect your progress to the next level
      </Text>
      <Card style={styles.workingCard}>
        <Card.Title title="How it works" titleVariant="headlineMedium" />
        <Card.Title
          left={(props) => (
            <Avatar.Icon
              {...props}
              icon="star"
              color={colors.primary}
              style={styles.icon}
            />
          )}
          subtitle="You earn points for every successfull order and delivery of medicine"
          subtitleNumberOfLines={3}
          subtitleStyle={styles.subTitle}
        />
        <Card.Title
          left={(props) => (
            <Avatar.Icon
              {...props}
              icon="gift"
              color={colors.primary}
              style={styles.icon}
            />
          )}
          subtitle="Use your points to redeeme exciting deals and promotions"
          subtitleNumberOfLines={3}
          subtitleStyle={styles.subTitle}
        />
        <Card.Title
          left={(props) => (
            <Avatar.Icon
              {...props}
              icon="crown"
              color={colors.primary}
              style={styles.icon}
            />
          )}
          subtitle="Earn enough points and level up to unlock exclusive benefits"
          subtitleNumberOfLines={3}
          subtitleStyle={styles.subTitle}
        />
      </Card>
      <Card style={styles.workingCard}>
        <Card.Title title="FAQ" titleVariant="headlineMedium" />
        <List.AccordionGroup>
          {faqs.map(({ question, answer, id }) => (
            <List.Accordion title={question} id={id} key={id}>
              <List.Item description={answer} descriptionNumberOfLines={100} />
            </List.Accordion>
          ))}
        </List.AccordionGroup>
      </Card>
    </ScrollView>
  );
};

export default ProgrameDetailedScreen;

const styles = StyleSheet.create({
  screen: {
    backgroundColor: colors.light2,
  },
  currProgrameRow: {
    flexDirection: "row",
    padding: 10,
    margin: 10,
  },
  currContent: {
    justifyContent: "center",
    padding: 10,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 3,
    borderColor: colors.white,
    backgroundColor: colors.white,
  },
  programCard: {
    padding: 5,
  },
  programImage: {
    width: "80%",
    height: "80%",
  },
  programeImageContainer: {
    backgroundColor: colors.white,
    width: 80,
    height: 80,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
  },
  workingCard: {
    margin: 15,
    borderRadius: 5,
  },
  subTitle: {
    color: colors.medium,
  },
  icon: {
    backgroundColor: colors.medium,
  },
});
