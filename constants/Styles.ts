import { Colors } from '@/constants/Colors';
import { FontSize } from '@/constants/Fonts';
import { StyleSheet } from 'react-native';

const getDefaults = (theme: 'light' | 'dark') => {
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: Colors[theme].background,
    },
    text: {
      fontSize: FontSize.base,
      color: Colors[theme].text,
    },
  });
};

export const DefaultStyles = {
  light: getDefaults('light'),
  dark: getDefaults('dark'),
};

const getUtils = (theme: 'light' | 'dark') => {
  return StyleSheet.create({
    centeredRow: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
    },
    slider: {
      height: 7,
      borderRadius: 16,
    },
    itemSeparator: {
      borderColor: Colors[theme].tint, // textMuted
      borderWidth: StyleSheet.hairlineWidth,
      opacity: 0.3,
    },
    emptyContentText: {
      ...DefaultStyles[theme].text,
      color: Colors[theme].tint, // textMuted
      textAlign: 'center',
      marginTop: 20,
    },
    emptyContentImage: {
      width: 200,
      height: 200,
      alignSelf: 'center',
      marginTop: 40,
      opacity: 0.3,
    },
  });
};

export const UtilStyles = {
  light: getUtils('light'),
  dark: getUtils('dark'),
};
