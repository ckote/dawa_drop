import { Image, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { Button, IconButton } from "react-native-paper";
import useLocation from "../../hooks/useLocation";
import MapView, { Marker, Callout } from "react-native-maps";
import colors from "../../utils/colors";
import { screenWidth } from "../../utils/contants";

// {"latitude": -1.1018825, "longitude": 37.0060431}

const NearHopitals = ({ hospitals, setVisible }) => {
  const location = useLocation();
  return (
    <View style={styles.screen}>
      <IconButton
        style={styles.closeBtn}
        icon="close"
        mode="outlined"
        iconColor={colors.danger}
        onPress={() => setVisible(false)}
      />
      {location && (
        <View style={styles.mapContainer}>
          <MapView
            style={styles.map}
            initialRegion={{
              latitude: location.latitude,
              longitude: location.longitude,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }}
          >
            <Marker coordinate={location} title="Your current Location" />
            {hospitals.map(
              (
                {
                  name,
                  longitude,
                  latitude,
                  address,
                  type: { name: typeName },
                },
                index
              ) => (
                <Marker
                  coordinate={{
                    latitude: parseFloat(latitude),
                    longitude: parseFloat(longitude),
                  }}
                  key={index}
                >
                  <Image
                    source={require("../../assets/hospitalmarker.png")}
                    style={{ width: 60, height: 60 }}
                  />
                  <Callout style={styles.callOut} onPress={async () => {}}>
                    <View style={{ width: screenWidth * 0.5 }}>
                      <Text>Facility: {name}</Text>
                      <Text>Type: {typeName}</Text>
                      <Text>{`Address: ${address}`}</Text>
                    </View>
                  </Callout>
                </Marker>
              )
            )}
          </MapView>
        </View>
      )}
    </View>
  );
};

export default NearHopitals;

const styles = StyleSheet.create({
  mapContainer: {
    flex: 1,
  },
  map: {
    width: "100%",
    height: "100%",
  },
  screen: {
    flex: 1,
  },
  closeBtn: {
    position: "absolute",
    zIndex: 1,
    top: 20,
    right: 20,
  },
});
