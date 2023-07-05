import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useEffect, useState } from "react";
import SearchHeader from "../../components/SearchHeader";
import { useUser } from "../../api/hooks";
import { useUserContext } from "../../context/hooks";
import { FlatList } from "react-native";
import { Avatar, Button, Card, IconButton, List } from "react-native-paper";
import colors from "../../utils/colors";
import routes from "../../navigation/routes";
import IconText from "../../components/display/IconText";
import * as Yup from "yup";
import {
  AppForm,
  AppFormField,
  AppFormSubmitButton,
} from "../../components/forms";
import Logo from "../../components/Logo";
import { Alert } from "react-native";

const validationSchemer = Yup.object().shape({
  ccc_number: Yup.string().label("CCC Number").required(),
  first_name: Yup.string().label("First Name").required(),
  upi_number: Yup.string().label("Unique Patient Number(Optional)"),
});
const initalValues = {
  ccc_number: "",
  first_name: "",
  upi_number: "",
};

const FindAccountScreen = ({ navigation }) => {
  const [loading, setLoading] = useState(false);
  const { findAccount, getUserInfo } = useUser();
  const { token } = useUserContext();
  const handleSubmit = async (values, { setFieldError }) => {
    setLoading(true);
    const response = await findAccount(token, {}, values);
    setLoading(false);
    if (response.ok) {
      console.log(response.data);
      navigation.navigate(routes.FORMS_NAVIGATION, {
        screen: routes.FORMS_ACCOUNT_VERIFICATION_FORM,
        params: response.data,
      });
    } else {
      if (response.status === 400) {
        for (const key in response.data) {
          const element = response.data[key];
          if (element instanceof Array) {
            setFieldError(key, element.join(";"));
          } else if (element instanceof Object) {
            for (const key1 in element) {
              const element1 = element[key1];
              setFieldError(key1, element1.join(";"));
            }
          }
        }
      } else if (response.status === 403) {
        Alert.alert("Failed!", response.data.detail);
      }
    }
  };

  return (
    <View style={styles.screen}>
      <Logo size={150} />
      <View style={styles.form}>
        <AppForm
          validationSchema={validationSchemer}
          initialValues={initalValues}
          onSubmit={handleSubmit}
        >
          <AppFormField
            icon="account"
            name="ccc_number"
            placeholder="Enter CCC number"
          />
          <AppFormField
            icon="account"
            name="upi_number"
            placeholder="Enter UPI No (Optional)"
          />
          <AppFormField
            icon="account"
            name="first_name"
            placeholder="Enter Your first name"
          />
          <AppFormSubmitButton
            style={{ flex: 1 }}
            title="Submit"
            loading={loading}
          />
        </AppForm>
      </View>
    </View>
  );
};

export default FindAccountScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: "center",
    paddingTop: 50,
  },
  form: {
    width: "90%",
    paddingTop: 20,
  },
});
