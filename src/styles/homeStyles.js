import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  nsei: {
    backgroundColor: "#fff",
    padding: 20,
  },
  iconPokeboll: {
    width: "100%",
    height: 200,
    resizeMode: "contain",
    position: "absolute",
    left: 20,
  },
  icons: {
    flexDirection: "row",
    justifyContent: "flex-end",
    paddingTop: 40,
  },
  icon: {
    width: 25,
    height: 25,
    marginLeft: 20,
  },
  titulo: {
    color: "#17171B",
    fontSize: 32,
    fontWeight: "bold",
  },
  subtitulo: {
    color: "#747476",
    fontSize: 16,
    marginBottom: 20,
  },
  pesquisar: {
    flexDirection: "row",
    backgroundColor: "#F2F2F2",
    borderRadius: 10,
    height: 60,
    width: "100%",
    paddingHorizontal: 19,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
  },
  iconPesquisa: {
    width: 25,
    height: 25,
  },
  textoPesquisar: {
    flex: 1,
    fontSize: 16,
    paddingHorizontal: 10,
  },

  filtroText1: {
    color: "#17171B",
    fontSize: 18,
    fontWeight: "bold",
  },
  filtroText2: {
    color: "#747476",
    fontSize: 16,
  },
  borrao: {
    width: "100%",
    height: "100%",
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    position: "absolute",
    zIndex: 1,
    justifyContent: "center",
  },
  closebtn: {
    width: "100%",
    height: "95%",
  },
  containerFiltro: {
    padding: 20,
    width: "100%",
    height: "100%",
    borderRadius: 40,
    backgroundColor: "#FFFFFF",
  },
  paitaon: {
    width: "100%",
    height: "100%",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-around",
  },
  containerGenerations: {
    width: "45%",
    height: 150,
    backgroundColor: "#F2F2F2",
    marginTop: 20,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
  },
  slaman: {
    flexDirection: "row",
  },
  imgGenerations: {
    width: 50,
    height: 50,
  },
  fds: {
    top: 20,
  },
  ResetApply: {
    width: "100%",
    height: "100%",
    flexDirection: "row",
    justifyContent: "space-around",
  },
  btnSort: {
    width: "100%",
    height: 65,
    backgroundColor: "#F2F2F2",
    alignItems: "center",
    marginTop: 20,
    padding: 20,
    borderRadius: 10,
  },
  btnFilters: {
    width: "45%",
    height: 65,
    backgroundColor: "#F2F2F2",
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 20,
    padding: 20,
    borderRadius: 10,
  },
  textSs: {
    color: "#747476",
  },
  kkj: {
    justifyContent: "center",
    alignItems: "center",
  },
  nem: {
    display: "flex",
    flexDirection: "row",
  },
  imgFoda: {
    width: 25,
    height: 25,
  },
  valueContainer: {
    top: -10,
  },
  valueText: {
    color: "#747476",
  },
});

export default styles;
