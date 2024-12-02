import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  card: {
    width: "100%",
    height: "100%",
  },
  // Parte da cabeça
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
  pokemonImagem: {
    width: 150,
    height: 150,
  },
  containerText: {
    width: "50%",
    justifyContent: "center",
    alignItems: "start",
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
    width: 90,
    height: 25,
    borderRadius: 5,
    paddingHorizontal: 5,
    paddingVertical: 5,
    marginRight: 5,
    flexDirection: "row",
    alignItems: "center",
    elevation: 2, 
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

  // Modal
  ww: {
    width: "100%",
    height: 50,
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
  pokemonTipoooo: {
    width: 25,
    height: 25,
    borderRadius: 5,
    paddingHorizontal: 5,
    paddingVertical: 5,
    elevation: 2, 
  },

  weaknessesContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    marginLeft: 10, 
  },

  btnContainer: {
    flexDirection: "row",
    justifyContent: "center",  
    alignItems: "center", 
    width: "100%",
    marginVertical: 20,
    top: 180,
  },
  btnText: {
    color: "#FFFFFF",
    textAlign: "center",
    fontSize: 16,
  },
  pokeboll: {
    textAlign: "center",
    width: 100,
    height: 100,
    position: "absolute",
    marginLeft: 20,
  },
  pokebollInvi: {
    textAlign: "center",
    width: 100,
    height: 100,
    opacity: 0,
    position: "absolute",
    marginLeft: 20,
  },


  textVerde: {
    marginVertical: 10,
    fontSize: 18,
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
  descricaoPokemon: {
    height: "100%",
    padding: 35,
    backgroundColor: "white",
    borderRadius: 50,
    top: 165,
  },

  button: {
    flex: 1,
    padding: 10,
    borderRadius: 5,
    marginHorizontal: 5,
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

statBarContainer: {
  flexDirection: "row",
  alignItems: "center",
  marginVertical: 5,
},
statBar: {
  height: 8,
  flex: 1,
  backgroundColor: "#F2F2F2",  
  borderRadius: 4,
  overflow: "hidden",
  maxWidth: "40%",
  elevation: 2, 
},
statBarFill: {
  height: "100%",
  borderRadius: 4,
},

});

export default styles;
