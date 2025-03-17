import { StyleSheet } from "react-native";

export const shadowStyles = StyleSheet.create({
  textWithShadow: {
    textShadowOffset: { width: 0, height: 4 },
    textShadowRadius: 4,
    textShadowColor: "#00000059",
  },
  dropShadow: {
    shadowColor: "#000", // shadow color
    shadowOffset: { width: 0, height: 8 }, // shadow offset
    shadowOpacity: 0.4, // shadow opacity
    shadowRadius: 4, // shadow radius
    elevation: 5, // elevation for Android
    borderRadius: 24,
  },
  boxShadow: {
    shadowColor: "#000", // shadow color
    shadowOffset: { width: 0, height: 8 }, // shadow offset
    shadowOpacity: 0.2, // shadow opacity
    shadowRadius: 4, // shadow radius
    elevation: 5,
  },
  boxShadow1: {
    shadowColor: "#000", // shadow color
    shadowOffset: { width: 0, height: 2 }, // shadow offset
    shadowOpacity: 0.2, // shadow opacity
    shadowRadius: 4, // shadow radius
    elevation: 5,
  },
  roundedBox: {
    width: 72,
    height: 72,
    backgroundColor: '#FEE094',
    borderRadius: 36, // For rounded shape
  },
  touchableContainer: {
    shadowColor: '#FEE094', // Shadow color
    shadowOffset: { width: 0, height: 4 }, // X: 0, Y: 2 for shadow offset
    shadowOpacity: 0.4, // Shadow transparency
    shadowRadius: 4, // Shadow blur
    elevation: 4, // Android shadow
  },
});
