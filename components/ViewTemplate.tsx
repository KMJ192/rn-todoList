import React from 'react';
import {
  SafeAreaView,
  View,
  StyleSheet,
  Platform,
  type ViewStyle,
} from 'react-native';
import Contents from 'expo-constants';

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
  },
});

type Props = {
  children: React.ReactNode;
  style?: ViewStyle;
};

function ViewTemplate({ children, style }: Props) {
  const padding = Platform.OS === 'ios' ? 16 : Contents.statusBarHeight + 16;

  return (
    <SafeAreaView>
      <View
        style={{
          ...styles.container,
          paddingTop: padding,
          ...style,
        }}
      >
        {children}
      </View>
    </SafeAreaView>
  );
}

export default ViewTemplate;
