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
import { screenWidth } from "../../utils/contants";

const FindAccountScreen = ({ navigation }) => {
  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState("");
  const { findAccount, getUserInfo } = useUser();
  const { token } = useUserContext();
  const handleSearch = async () => {
    const response = await findAccount(token, {}, { search });
    if (response.ok) {
      setSearchResults(response.data.results);
    }
  };
  const handleInitVerification = async (url) => {
    const response = await getUserInfo({ url, token, params: {} });
    if (response.ok) {
      navigation.navigate(routes.FORMS_NAVIGATION, {
        screen: routes.FORMS_ACCOUNT_VERIFICATION_FORM,
        params: response.data,
      });
    }
  };
  useEffect(() => {
    handleSearch();
  }, [search]);
  return (
    <View style={styles.screen}>
      <SearchHeader
        text={search}
        onTextChange={setSearch}
        onSearch={handleSearch}
      />
      <Text style={styles.title}>Search Results</Text>
      <View style={styles.results}>
        <FlatList
          data={searchResults}
          renderItem={({ item, index }) => {
            const {
              identifiers,
              phone_number,
              request_verification_url,
              has_account,
            } = item;
            return (
              <Card style={styles.listItem} elevation={0} key={index}>
                <Card.Title
                  left={(props) => (
                    <Avatar.Icon
                      icon="account"
                      {...props}
                      color={colors.primary}
                      style={styles.icon}
                    />
                  )}
                  title="Patient Information"
                />
                <Card.Content>
                  <View style={styles.info}>
                    {identifiers.map(({ id_type, id_value }, id_index) => (
                      <List.Item
                        key={id_index}
                        title={id_type}
                        description={id_value}
                        style={styles.idItem}
                      />
                    ))}
                    <List.Item
                      title="Phone Number"
                      description={phone_number ? phone_number : "None"}
                      style={styles.idItem}
                    />
                  </View>
                </Card.Content>
                <Card.Actions>
                  <Button
                    icon="check-decagram"
                    onPress={async () =>
                      await handleInitVerification(request_verification_url)
                    }
                    disabled={has_account === true}
                    buttonColor={colors.white}
                    textColor={has_account ? colors.medium : colors.primary}
                  >
                    {"Verify yourself now"}
                  </Button>
                </Card.Actions>
              </Card>
            );
          }}
        />
      </View>
    </View>
  );
};

export default FindAccountScreen;

const styles = StyleSheet.create({
  listItem: {
    backgroundColor: colors.white,
    marginBottom: 5,
    padding: 5,
    borderRadius: 0,
    elevation: 0,
  },
  icon: {
    backgroundColor: colors.light,
  },
  title: {
    fontWeight: "bold",
    padding: 10,
  },
  screen: {
    flex: 1,
  },
  results: {
    flex: 1,
    marginVertical: 10,
  },
  info: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
  },
  idItem: {
    width: screenWidth * 0.4,
    margin: 2,
    backgroundColor: colors.light2,
  },
});
