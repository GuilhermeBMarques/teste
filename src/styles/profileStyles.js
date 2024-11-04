import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  card: {
    width: "100%",
    height: "100%",
  },
  btnVoltar: {
    display: "flex",
    alignItems: "start",
    justifyContent: "center",
    marginVertical: 20,
    marginHorizontal: 20,
    position: "absolute",
    zIndex: 1,
  },
  exitImage: {
    width: 20,
    height: 20,
  },
  containerPai: {
    display: "flex",
    flexDirection: "row",
    width: "100%",
    height: 200,
    top: 50,
  },
  containerImg: {
    width: "50%",
    justifyContent: "center",
    alignItems: "center",
  },
  containerText: {
    width: "50%",
    justifyContent: "center",
    alignItems: "start",
  },
  pokemonImagem: {
    width: 150,
    height: 150,
  },
  pokemonId: {
    color: "#17171B99",
    fontSize: 18,
    fontWeight: "bold",
  },
  pokemonNome: {
    color: "white",
    fontWeight: "bold",
    fontSize: 32,
  },
  ContainerTipos: {
    flexDirection: "row",
    marginTop: 5,
  },
  pokemonTipo: {
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
  btnText: {
    color: "#FFFFFF",
    textAlign: "center",
    fontSize: 16,
  },
  textInfo1: {
    marginVertical: 10,
    fontSize: 16,
    color: "#17171B",
  },
  textInfo2: {
    color: "#747476",
    fontSize: 16,
    marginVertical: 10,
  },
  abilitiesContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  mesmaLinha: {
    flexDirection: "row",
  },
  smallText: {
    fontSize: 12,
    color: "#747476",
  },
  evolutionsContainer: {
    width: "100%",
    height: "100%",
  },
  evolutionList: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
  },
  evolutionItem: {
    alignItems: "center",
  },
  evolutionImage: {
    width: 150,
    height: 150,
  },
  evolutionText: {
    fontSize: 16,
    color: "#17171B",
    marginTop: -20,
  },
  borrao: {
    height: "100%",
    padding: 35,
    backgroundColor: "white",
    borderRadius: 50,
    top: 165,
  },
  btnContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
    marginVertical: 20,
    top: 180,
  },
  button: {
    flex: 1,
    padding: 10,
    borderRadius: 5,
    marginHorizontal: 5,
  },
  ww: {
    width: "100%",
    height: 50,
  },
  pokeboll: {
    alignItems: "center",
    marginHorizontal: 25,
    width: 100,
    height: 100,
    position: "absolute",
  },
  foda: {
  width: "100%",
    top: 160,
    marginLeft: "95%",
    position: "absolute",
  },
  gg: {
    width: 65,
    height: 65,
  },
  nomegrande: {
    width: "100%",
    position: "absolute",
    justifyContent: "center",
    alignItems: "center",
  },
nome: {
   fontSize: 85,
},
});

export default styles;
