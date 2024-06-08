import React, { ReactNode } from "react";
import { StyleSheet, Text, type TextStyle } from "react-native";

type Props = {
  typo?: "title" | "t" | "subtitle" | "s" | "body1" | "b1" | "body2" | "b2";
  children: ReactNode;
};

function Typo({ typo = "b1", children }: Props) {
  return <Text style={styles[typo]}>{children}</Text>;
}

export default Typo;

const title: TextStyle = {
  fontSize: 36,
  fontWeight: "bold",
};

const subtitle: TextStyle = {
  fontSize: 30,
  fontWeight: "bold",
};

const body1: TextStyle = {
  fontSize: 24,
};

const body2: TextStyle = {
  fontSize: 16,
};

const styles = StyleSheet.create({
  title,
  t: title,
  subtitle,
  s: subtitle,
  body1,
  b1: body1,
  body2,
  b2: body2,
});
