import React from "react";
import { StyleSheet, Text, Platform, View } from "react-native";
import CheckBox from '@react-native-community/checkbox';
import defaultStyles from "../config/styles";

const AppCheckBox = ({ title, onPress, color = "primary" }) => {
  return (
    <View style={styles.container}>
    <CheckBox tintColors={defaultStyles.colors.light} tintColor={defaultStyles.colors.light} style={styles.checkbox} />
  <Text style={styles.text}>{title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  checkbox: {
    color: defaultStyles.colors.white
  },
  container: {
    flexDirection: "row",
    alignItems: 'center'
  },
  text: {
    color: defaultStyles.colors.light,
    fontFamily: Platform.OS === "android" ? "Roboto" : "Avenir",
    fontSize: 16,
    letterSpacing: 1,
  },
});

export default AppCheckBox;
