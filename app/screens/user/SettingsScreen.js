import { Alert, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { List, Switch } from "react-native-paper";
import colors from "../../utils/colors";
import { useSettinsContext } from "../../context/hooks";
import PinForm from "../../components/user/forms/PinForm";
import Dialog from "../../components/dialog/Dialog";
import { screenWidth } from "../../utils/contants";
import AlertDialog from "../../components/dialog/AlertDialog";
import * as LocalAuthentication from "expo-local-authentication";
import useLocalAuth from "../../hooks/useLocalAuth";

const steps = ["Create security pin", "Confirm Pin", "Please retry"];

const SettingsScreen = () => {
  const {
    enablePin,
    disablePin,
    privacyEnabled,
    pin,
    enableFingerprint,
    useFingerprint,
  } = useSettinsContext();
  const handleToggleEnablePrivacy = () => {
    if (privacyEnabled) {
      disablePin(1234);
    } else {
      enablePin(1234);
    }
  };
  const [currentStep, setCurrentStep] = useState(0);
  const [showDialog, setShowDialog] = useState(false);
  const [error, setError] = useState(null);
  const { compatible, enabled, authenticate, fingerPrintOk } = useLocalAuth();
  const handeSetPin = () => {
    if (privacyEnabled) {
      Alert.alert("Confirm!", "Are you suire you wanna disable privacy", [
        {
          text: "yes",
          onPress: () => {
            disablePin(pin);
          },
        },
        { text: "no" },
      ]);
    } else {
      setShowDialog(true);
    }
  };

  useEffect(() => {
    if (currentStep === 2) {
      console.log("Gere");
      if (pins[0] !== pins[1]) {
        setError("Provide pins must be same");
        setCurrentStep(0);
        setPins([]);
      } else {
        enablePin(pins[0]);
        setCurrentStep(0);
        setPins([]);
        setShowDialog(false);
      }
    }
  }, [currentStep]);
  const [pins, setPins] = useState([]);
  return (
    <View>
      <List.Section title="Privacy Settings">
        <List.Accordion
          title="Enable advanced privacy features"
          left={(props) => <List.Icon {...props} icon="shield-key-outline" />}
          right={(props) => (
            <Switch value={privacyEnabled} color={colors.primary} />
          )}
          expanded={privacyEnabled}
          onPress={handeSetPin}
        >
          {console.log(useFingerprint)}
          {fingerPrintOk ? (
            <List.Item
              title="Enable fingerprint Unlock"
              right={(props) => (
                <Switch
                  value={Boolean(useFingerprint)}
                  color={colors.primary}
                  onValueChange={async (value) => {
                    if (await authenticate()) {
                      enableFingerprint(value);
                    }
                  }}
                />
              )}
            />
          ) : null}
        </List.Accordion>
      </List.Section>
      <Dialog visible={showDialog} title={steps[currentStep]}>
        <PinForm
          style={styles.form}
          onValueChanged={(value) => {
            setError(null);
          }}
          onPinComplete={(value) => {
            setPins([...pins, parseInt(value)]);
            setCurrentStep(currentStep + 1);
          }}
          length={4}
          error={error}
        />
      </Dialog>
    </View>
  );
};

export default SettingsScreen;

const styles = StyleSheet.create({
  listItem: {
    backgroundColor: colors.white,
    marginTop: 5,
    elevation: 0,
    borderRadius: 0,
  },
  title: {
    textTransform: "capitalize",
    padding: 10,
    fontWeight: "bold",
  },
  form: {
    width: screenWidth * 0.85,
  },
});
