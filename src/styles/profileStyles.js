import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  profileCard: {
    width: "100%",
    height: "100%",
  },
  backButtonContainer: {
    display: "flex",
    alignItems: "flex-start",
    justifyContent: "center",
    marginVertical: 20,
    marginHorizontal: 20,
    position: "absolute",
    zIndex: 1,
  },
  backButtonImage: {
    width: 20,
    height: 20,
  },
  mainContainer: {
    display: "flex",
    flexDirection: "row",
    width: "100%",
  },
  imageContainer: {
    width: "50%",
    justifyContent: "center",
    alignItems: "center",
  },
  textContainer: {
    width: "50%",
    justifyContent: "center",
    alignItems: "flex-start",
  },
  pokemonImage: {
    width: 200,
    height: 200,
  },
  pokemonIdText: {
    color: "#17171B99",
    fontSize: 18,
    fontWeight: "bold",
  },
  pokemonNameText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 32,
  },
  typeContainer: {
    flexDirection: "row",
    marginTop: 5,
  },
  typeBadge: {
    backgroundColor: "rgba(255, 255, 255, 0.3)",
    width: 90,
    height: 25,
    borderRadius: 5,
    paddingHorizontal: 5,
    paddingVertical: 5,
    marginRight: 5,
    flexDirection: "row",
    alignItems: "center",
  },
  typeIcon: {
    width: 15,
    height: 15,
    marginRight: 5,
  },
  typeText: {
    fontSize: 12,
    color: "#FFF",
    textTransform: "capitalize",
    fontWeight: "bold",
  },
  buttonGroupContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
    marginVertical: 20,
  },
  actionButton: {
    flex: 1,
    padding: 10,
    borderRadius: 5,
    marginHorizontal: 5,
  },
  actionButtonText: {
    color: "#FFFFFF",
    textAlign: "center",
    fontSize: 16,
  },
  detailsContainer: {
    width: "100%",
    height: "100%",
    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    padding: 50,
  },
  infoText: {
    marginVertical: 10,
    fontSize: 16,
    color: "#17171B",
  },
  subtleText: {
    color: "#747476",
    fontSize: 16,
    marginVertical: 10,
  },
  abilitiesRow: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  rowLayout: {
    flexDirection: "row",
  },
  smallText: {
    fontSize: 12,
    color: "#747476",
  },
  evolutionSection: {
    width: "100%",
    height: "100%",
  },
  evolutionList: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
  },
  evolutionItemContainer: {
    alignItems: "center",
  },
  evolutionImage: {
    width: 150,
    height: 150,
  },
  evolutionNameText: {
    fontSize: 16,
    color: "#17171B",
    marginTop: -20,
  },
});

export default styles;
