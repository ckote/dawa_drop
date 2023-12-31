import {
  FlatList,
  StyleSheet,
  TouchableOpacity,
  View,
  Image,
  ScrollView,
} from "react-native";
import React, { useEffect, useState } from "react";
import AppSafeArea from "../../components/AppSafeArea";
import { useHospital, useUser } from "../../api/hooks";
import { Avatar, IconButton, List, Text } from "react-native-paper";
import { useUserContext } from "../../context/hooks";
import colors from "../../utils/colors";
import routes from "../../navigation/routes";
import { screenWidth } from "../../utils/contants";
import RewardsCards from "../../components/home/RewardsCards";
import { Modal } from "react-native";
import NearHopitals from "../../components/home/NearHopitals";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import LoyaltyPointsCard from "../../components/home/LoyaltyPointsCard";

const HomeScreen = ({ navigation }) => {
  const { user } = useUserContext();
  const { getUser } = useUser();
  const { getAwardPrograms, getAwardRewards, getClinics } = useHospital();
  const [awardPrograms, setAwardProgrames] = useState([]);
  const [awardRewards, setAwardRewards] = useState([]);
  const [clinics, setClinics] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showCreateProfile, setShowCreateProfile] = useState(true);
  const [currentEnrollment, setCurrentnrollment] = useState(null);
  const [loyaltyPoints, setLoyaltyPoints] = useState(null);

  const handleFetch = async () => {
    const programeResponse = await getAwardPrograms();
    const rewardsResponse = await getAwardRewards();
    const clinicsResponse = await getClinics();
    if (!programeResponse.ok) {
      return console.log(
        "HOME SCREEN",
        programeResponse.problem,
        programeResponse.data
      );
    } else {
      setAwardProgrames(programeResponse.data.results);
    }
    if (!rewardsResponse.ok) {
      return console.log(
        "HOME SCREEN",
        rewardsResponse.problem,
        rewardsResponse.data
      );
    } else {
      setAwardRewards(rewardsResponse.data.results);
    }
    if (!clinicsResponse.ok) {
      return console.log(
        "HOME SCREEN",
        clinicsResponse.problem,
        clinicsResponse.data
      );
    } else {
      setClinics(clinicsResponse.data.results);
    }
  };

  useEffect(() => {
    if (!user) {
      getUser();
    } else {
      const {
        user_type_information: { patient },
      } = user;
      if (patient) {
        const {
          loyalty_points: {
            current_program_enrolment,
            total,
            total_redeemed_points,
            redeemable_points,
          },
        } = patient;
        setLoyaltyPoints({
          total,
          total_redeemed_points,
          redeemable_points,
        });
        if (patient) {
          setShowCreateProfile(false);
        }
        if (current_program_enrolment) {
          setCurrentnrollment(current_program_enrolment);
        }
      }
    }
    handleFetch();
  }, [user]);
  return (
    <AppSafeArea>
      <View style={styles.screen}>
        <View style={styles.headecontainer}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              paddingTop: 10,
              paddingHorizontal: 10,
            }}
          >
            <TouchableOpacity
              onPress={() =>
                navigation.navigate(routes.USER_NAVIGATION, {
                  screen: routes.PROFILE_VIEW_SCREEN,
                  params: user,
                })
              }
            >
              {user && user.profile_information.image ? (
                <Avatar.Image
                  source={{ uri: user.profile_information.image }}
                  size={45}
                  style={styles.avatar}
                />
              ) : (
                <Avatar.Icon icon="account" size={45} style={styles.avatar} />
              )}
            </TouchableOpacity>
            {user && (
              <Text
                variant="titleLarge"
                style={[styles.greeting, { paddingBottom: 0 }]}
              >
                Welcome {user.account_information.username}
              </Text>
            )}
            <IconButton
              icon="bell"
              mode="outlined"
              size={30}
              iconColor={colors.primary}
              style={{
                backgroundColor: colors.light1,
                margin: 0,
              }}
            />
          </View>

          <Image
            style={styles.image}
            resizeMode="contain"
            source={require("../../assets/drugs.png")}
          />
          <Text
            variant="bodyLarge"
            style={[styles.greeting, { paddingTop: 10, textAlign: "center" }]}
          >
            Dawa Drop, delivering medicine to your door step.
          </Text>
        </View>
        {loyaltyPoints && currentEnrollment && (
          <LoyaltyPointsCard
            points={loyaltyPoints.redeemable_points}
            tip={currentEnrollment.tip}
            level={currentEnrollment.program.name}
          />
        )}

        <View style={styles.middleContainer}>
          <List.Item
            onPress={() => setShowModal(true)}
            style={styles.listItem}
            title="View Near by Clinics"
            titleStyle={styles.listTitle}
            left={(props) => (
              <List.Icon
                icon="hospital-building"
                {...props}
                color={colors.primary}
              />
            )}
            right={(props) => (
              <List.Icon
                icon="chevron-right"
                {...props}
                color={colors.primary}
              />
            )}
          />
        </View>
        <RewardsCards rewards={awardRewards} backgroundColor={colors.light2} />

        <View style={styles.order}>
          <TouchableOpacity
            style={styles.orderBtn}
            onPress={() => {
              if (showCreateProfile) {
                navigation.navigate(routes.USER_NAVIGATION, {
                  screen: routes.USER_FIND_ACCOUNT_SCREEN,
                });
              } else {
                navigation.navigate(routes.ORDER_NAVIGATION, {
                  screen: routes.ORDER_SCREEN,
                });
              }
            }}
          >
            <MaterialCommunityIcons
              name={showCreateProfile ? "magnify" : "plus"}
              size={40}
              color={colors.primary}
            />
          </TouchableOpacity>
          <Text variant="headlineLarge" style={styles.orderText}>
            {showCreateProfile ? "Create profile" : "New Order"}
          </Text>
        </View>
        <Modal visible={showModal} animationType="slide">
          <NearHopitals hospitals={clinics} setVisible={setShowModal} />
        </Modal>
      </View>
    </AppSafeArea>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  image: {
    height: 110,
    width: screenWidth * 0.9,
  },
  orderBtn: {
    backgroundColor: colors.white,
    borderRadius: 40,
    padding: 20,
  },
  orderText: {
    color: colors.white,
    opacity: 0.5,
    padding: 10,
  },
  order: {
    backgroundColor: colors.primary,
    borderRadius: 40,
    flexDirection: "row-reverse",
    // justifyContent: "space-between",
    alignItems: "center",
    marginHorizontal: 10,
    marginBottom: 10,
    // alignSelf: "flex-end",
    position: "absolute",
    right: 0,
    bottom: 0,
  },
  greeting: {
    padding: 20,
    color: colors.light1,
  },
  screen: {
    backgroundColor: colors.light2,
    flex: 1,
  },
  headecontainer: {
    backgroundColor: colors.primary,
    // flex: 1,
    borderRadius: 20,
    marginHorizontal: 10,
    marginBottom: 10,
    padding: 10,
  },
  middleContainer: {
    backgroundColor: colors.white,
    marginHorizontal: 10,
    marginBottom: 10,
    padding: 10,
    borderRadius: 20,
  },
  listTitle: {
    color: colors.primary,
    fontWeight: "bold",
  },
  avatar: { backgroundColor: colors.light },
  bodycontainer: {
    backgroundColor: colors.light1,
    flex: 2,
  },
  title: {
    fontWeight: "bold",
  },
  listItem: {
    justifyContent: "center",
  },
  scroll: {
    marginTop: 20,
    borderTopRightRadius: 40,
    overflow: "hidden",
  },
});
