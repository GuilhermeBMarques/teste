import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  card: {
    width: "100%",
    height: 115,
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 20,
    marginBottom: 15,
  },
  pokemonId: {
    fontSize: 12,
    fontWeight: "bold",
    color: "#17171B99",
  },
  pokemonNome: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#FFFFFF",
    textTransform: "capitalize",
  },
  iconPattern: {
    width: 100,
    height: 100,
    top: -20,
    resizeMode: "contain",
    position: "absolute",
    marginLeft: "26%",
  },
  iconPokeball: {
    width: 145,
    height: 125,
    resizeMode: "contain",
    position: "absolute",
    marginLeft: "75%",
  },
  ContainerTipos: {
    flexDirection: "row",
    marginTop: 5,
  },
  pokemonTipo: {
    backgroundColor: "rgba(255, 255, 255, 0.3)",
    width: 90,
    height: 25,
    borderRadius: 3,
    paddingHorizontal: 5,
    paddingVertical: 5,
    marginRight: 5,
    flexDirection: "row",
    alignItems: "center",
  },
  pokemonTipoIcone: {
    width: 15,
    height: 15,
    marginRight: 5,
  },
  pokemonTexto: {
    fontSize: 12,
    color: "#FFF",
    textTransform: "capitalize",
    fontWeight: "bold",
  },
  pokemonImagem: {
    width: 130,
    height: 130,
  },
});

export default styles;
