import { createStackNavigator } from "@react-navigation/stack";
import ProfileScreen from "../screens/user/ProfileScreen";
import routes from "./routes";
import ProfileViewScreen from "../screens/user/ProfileViewScreen";
import ProgrameDetailScreen from "../screens/user/ProgrameDetailScreen";
import RewardDetailScreen from "../screens/user/RewardDetailScreen";
import LoyaltyPointsScreen from "../screens/user/LoyaltyPointsScreen";
import UserTransferRequestsScreen from "../screens/user/UserTransferRequestsScreen";
import TransferDetailScreen from "../screens/user/TransferDetailScreen";
import FindAccountScreen from "../screens/user/FindAccountScreen";
import AppointMentsScreen from "../screens/user/AppointMentsScreen";
import PrescriptionsScreen from "../screens/user/PrescriptionsScreen";
import SettingsScreen from "../screens/user/SettingsScreen";

const Stack = createStackNavigator();

const Navigator = Stack.Navigator;
const Screen = Stack.Screen;

const UserNavigation = () => {
  return (
    <Navigator>
      <Screen
        name={routes.PROFILE_SCREEN}
        component={ProfileScreen}
        options={{ title: "Profile" }}
      />
      <Screen
        name={routes.PROFILE_VIEW_SCREEN}
        component={ProfileViewScreen}
        options={{ title: "Information Center" }}
      />
      <Screen
        name={routes.PROGRAM_DETAIL_SCREEN}
        component={ProgrameDetailScreen}
        options={({ route }) => ({
          title: route.params.name,
        })}
      />
      <Screen
        name={routes.REWARD_DETAIL_SCREEN}
        component={RewardDetailScreen}
        options={({ route }) => ({
          title: route.params.name,
        })}
      />
      <Screen
        name={routes.LOYALTY_POINTS_SCREEN}
        component={LoyaltyPointsScreen}
        options={({ route }) => ({
          title: "",
        })}
      />
      <Screen
        name={routes.USER_TRANSFER_REQUESTS_SCREEN}
        component={UserTransferRequestsScreen}
        options={({ route }) => ({
          title: "Facility Transfer Requests",
        })}
      />
      <Screen
        name={routes.TRANSFER_DETAIL_SCREEN}
        component={TransferDetailScreen}
        options={({ route }) => ({
          title: "",
        })}
      />
      <Screen
        name={routes.USER_FIND_ACCOUNT_SCREEN}
        component={FindAccountScreen}
        options={({ route }) => ({
          title: "Enter CCC number",
        })}
      />
      <Screen
        name={routes.USER_APPOINTMENTS_SCREEN}
        component={AppointMentsScreen}
        options={({ route }) => ({
          title: "My appointments",
        })}
      />
      <Screen
        name={routes.USER_PRESCRIPTIONS_SCREEN}
        component={PrescriptionsScreen}
        options={({ route }) => ({
          title: "My Prescriptions",
        })}
      />
      <Screen
        name={routes.USER_SETTINGS_SCREEN}
        component={SettingsScreen}
        options={({ route }) => ({
          title: "Settings",
        })}
      />
    </Navigator>
  );
};

export default UserNavigation;
