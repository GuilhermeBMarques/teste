import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Image,
  TouchableOpacity,
  TextInput,
  StatusBar,
  SafeAreaView,
  ScrollView,
} from "react-native";
import axios from "axios";
import PokemonHome from "./src/components/PokemonHome";
import Profile from "./src/pages/Profile.jsx";
import ImagensIcon from "./src/utils/Imagens.js";
import styles from "./src/styles/homeStyles.js";
import Slider from "@react-native-community/slider";
import { FiltroCor } from "./src/utils/FiltroCor.js";

const App = () => {
  const [list, setList] = useState([]);
  const [displayedList, setDisplayedList] = useState([]);
  const [search, setSearch] = useState("");
  const [nextUrl, setNextUrl] = useState(
    "https://pokeapi.co/api/v2/pokemon?limit=20"
  );
  const [selectedPokemon, setSelectedPokemon] = useState(null);
  const [activeButton, setActiveButton] = useState();
  const [rangeValue, setRangeValue] = useState(50); // Valor inicial do slider

  useEffect(() => {
    fetchPokemon();
  }, []);

  const fetchPokemon = () => {
    axios
      .get(nextUrl)
      .then((response) => {
        const newPokemons = response.data.results.map((pokemon, index) => ({
          ...pokemon,
          id: index + 1,
        }));

        // Filtra para garantir que não há duplicatas
        const uniquePokemons = newPokemons.filter(
          (newPokemon) =>
            !list.some((existing) => existing.id === newPokemon.id)
        );

        setList((prevList) => {
          const updatedList = [...prevList, ...uniquePokemons];
          setDisplayedList(updatedList); // Atualiza a lista exibida
          return updatedList;
        });
        setNextUrl(response.data.next);
      })
      .catch((error) => console.error(error));
  };

  const showPokemonProfile = async (pokemon) => {
    try {
      const response = await axios.get(
        `https://pokeapi.co/api/v2/pokemon/${pokemon.name}`
      );
      const speciesResponse = await axios.get(response.data.species.url);
      const evolutionChainUrl = speciesResponse.data.evolution_chain.url;
      const evolutionChainResponse = await axios.get(evolutionChainUrl);

      const evolutions = [];
      let currentEvolution = evolutionChainResponse.data.chain;

      while (currentEvolution) {
        const evolutionName = currentEvolution.species.name;
        const evolutionData = await axios.get(
          `https://pokeapi.co/api/v2/pokemon/${evolutionName}`
        );
        evolutions.push({
          name: evolutionName,
          image: evolutionData.data.sprites.front_default,
        });
        currentEvolution = currentEvolution.evolves_to[0];
      }

      setSelectedPokemon({ ...response.data, evolutions });
    } catch (error) {
      console.error("Erro na requisição:", error);
    }
  };

  const goBack = () => {
    setSelectedPokemon(null);
  };

  const filteredList = displayedList.filter((pokemon) =>
    pokemon.name.toLowerCase().includes(search.toLowerCase())
  );

  const renderItem = ({ item }) => (
    <PokemonHome item={item} onSelect={showPokemonProfile} />
  );

  const handleButtonPress = (button) => {
    setActiveButton(activeButton === button ? null : button);
  };

  const generationsI = () => {
    const filteredGenerationsI = list.filter(
      (pokemon) => pokemon.id >= 1 && pokemon.id <= 151
    );
    setDisplayedList(filteredGenerationsI); // Atualiza a lista exibida
  };

  const generationsII = () => {
    const filteredGenerationsII = list.filter(
      (pokemon) => pokemon.id >= 152 && pokemon.id <= 251
    );
    setDisplayedList(filteredGenerationsII); // Atualiza a lista exibida
  };

  const generationsIII = () => {
    const filteredGenerationsIII = list.filter(
      (pokemon) => pokemon.id >= 252 && pokemon.id <= 386
    );
    setDisplayedList(filteredGenerationsIII); // Atualiza a lista exibida
  };

  const generationsIV = () => {
    const filteredgenerationsIV = list.filter(
      (pokemon) => pokemon.id >= 387 && pokemon.id <= 494
    );
    setDisplayedList(filteredgenerationsIV); // Atualiza a lista exibida
  };

  const generationsV = () => {
    const filteredGenerationsV = list.filter(
      (pokemon) => pokemon.id >= 495 && pokemon.id <= 649
    );
    setDisplayedList(filteredGenerationsV); // Atualiza a lista exibida
  };

  const generationsVI = () => {
    const filteredGenerationsVI = list.filter(
      (pokemon) => pokemon.id >= 650 && pokemon.id <= 721
    );
    setDisplayedList(filteredGenerationsVI); // Atualiza a lista exibida
  };

  const generationsVII = () => {
    const filteredgenerationsVII = list.filter(
      (pokemon) => pokemon.id >= 722 && pokemon.id <= 809
    );
    setDisplayedList(filteredgenerationsVII); // Atualiza a lista exibida
  };

  const generationsVIII = () => {
    const filteredgenerationsVIII = list.filter(
      (pokemon) => pokemon.id >= 810 && pokemon.id <= 816
    );
    setDisplayedList(filteredgenerationsVIII); // Atualiza a lista exibida
  };

  const sortByNumberAsc = () => {
    const NumberAsc = [...displayedList].sort((a, b) => a.id - b.id);
    setDisplayedList(NumberAsc);
  };

  const sortByNumberDesc = () => {
    const NumberDesc = [...displayedList].sort((a, b) => b.id - a.id);
    setDisplayedList(NumberDesc);
  };

  const sortByNameAsc = () => {
    const NameAsc = [...displayedList].sort((a, b) =>
      a.name.localeCompare(b.name)
    );
    setDisplayedList(NameAsc);
  };

  const sortByNameDesc = () => {
    const NameDesc = [...displayedList].sort((a, b) =>
      b.name.localeCompare(a.name)
    );
    setDisplayedList(NameDesc);
  };

  const TypesPokemons = () => {};

  const botoesTipos = () => {};

  const Reset = () => {};

  const Apply = () => {};

  return (
    <SafeAreaView>
      {selectedPokemon ? (
        <Profile pokemon={selectedPokemon} onBack={goBack} />
      ) : (
        <View style={styles.nsei}>
          <StatusBar style="auto" />
          <Image
            source={ImagensIcon.icons.pokeball}
            style={styles.iconPokeboll}
          />

          {/* Icons */}
          <View style={styles.icons}>
            <TouchableOpacity
              onPress={() => handleButtonPress("geracaoFiltro")}
            >
              <Image source={ImagensIcon.icons.geracao} style={styles.icon} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleButtonPress("sortFiltro")}>
              <Image source={ImagensIcon.icons.organizar} style={styles.icon} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleButtonPress("filtroFiltro")}>
              <Image source={ImagensIcon.icons.filtro} style={styles.icon} />
            </TouchableOpacity>
          </View>

          {/* Titulo da Pagina */}
          <Text style={styles.titulo}>Pokédex</Text>

          {/* Subtitulo da Pagina */}
          <Text style={styles.subtitulo}>
            Search for Pokémon by name or using the National Pokédex number.
          </Text>

          {/* Campo de pesquisa */}
          <View style={styles.pesquisar}>
            <Image
              source={ImagensIcon.icons.pesquisa}
              style={styles.iconPesquisa}
            />
            <TextInput
              style={styles.textoPesquisar}
              value={search}
              onChangeText={setSearch}
              placeholder="What Pokémon are you looking for?"
              placeholderTextColor="#747476"
            />
          </View>

          {activeButton === "geracaoFiltro" && (
            <View style={styles.borrao}>
              <View style={styles.containerFiltro}>
                <ScrollView>
                  <Text style={styles.filtroText1}>Generations</Text>
                  <Text style={styles.filtroText2}>
                    Use search for generations to explore your Pokémon!
                  </Text>

                  <View style={styles.paitaon}>
                    <TouchableOpacity
                      style={styles.containerGenerations}
                      onPress={generationsI}
                    >
                      <View style={styles.slaman}>
                        <Image
                          source={ImagensIcon.pokemons.bulbasaur}
                          style={styles.imgGenerations}
                        />
                        <Image
                          source={ImagensIcon.pokemons.charmander}
                          style={styles.imgGenerations}
                        />
                        <Image
                          source={ImagensIcon.pokemons.squirtle}
                          style={styles.imgGenerations}
                        />
                      </View>
                      <Text style={styles.filtroText2}>Generation I</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                      style={styles.containerGenerations}
                      onPress={generationsII}
                    >
                      <View style={styles.slaman}>
                        <Image
                          source={ImagensIcon.pokemons.chikorita}
                          style={styles.imgGenerations}
                        />
                        <Image
                          source={ImagensIcon.pokemons.cyndaquil}
                          style={styles.imgGenerations}
                        />
                        <Image
                          source={ImagensIcon.pokemons.totodile}
                          style={styles.imgGenerations}
                        />
                      </View>
                      <Text style={styles.filtroText2}>Generation II</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                      style={styles.containerGenerations}
                      onPress={generationsIII}
                    >
                      <View style={styles.slaman}>
                        <Image
                          source={ImagensIcon.pokemons.treecko}
                          style={styles.imgGenerations}
                        />
                        <Image
                          source={ImagensIcon.pokemons.torchic}
                          style={styles.imgGenerations}
                        />
                        <Image
                          source={ImagensIcon.pokemons.mudkip}
                          style={styles.imgGenerations}
                        />
                      </View>
                      <Text style={styles.filtroText2}>Generation III</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                      style={styles.containerGenerations}
                      onPress={generationsIV}
                    >
                      <View style={styles.slaman}>
                        <Image
                          source={ImagensIcon.pokemons.turtwig}
                          style={styles.imgGenerations}
                        />
                        <Image
                          source={ImagensIcon.pokemons.chimchar}
                          style={styles.imgGenerations}
                        />
                        <Image
                          source={ImagensIcon.pokemons.piplup}
                          style={styles.imgGenerations}
                        />
                      </View>
                      <Text style={styles.filtroText2}>Generation IV</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                      style={styles.containerGenerations}
                      onPress={generationsV}
                    >
                      <View style={styles.slaman}>
                        <Image
                          source={ImagensIcon.pokemons.snivy}
                          style={styles.imgGenerations}
                        />
                        <Image
                          source={ImagensIcon.pokemons.tepig}
                          style={styles.imgGenerations}
                        />
                        <Image
                          source={ImagensIcon.pokemons.oshawott}
                          style={styles.imgGenerations}
                        />
                      </View>
                      <Text style={styles.filtroText2}>Generation I</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                      style={styles.containerGenerations}
                      onPress={generationsVI}
                    >
                      <View style={styles.slaman}>
                        <Image
                          source={ImagensIcon.pokemons.chespin}
                          style={styles.imgGenerations}
                        />
                        <Image
                          source={ImagensIcon.pokemons.fennekin}
                          style={styles.imgGenerations}
                        />
                        <Image
                          source={ImagensIcon.pokemons.froakie}
                          style={styles.imgGenerations}
                        />
                      </View>
                      <Text style={styles.filtroText2}>Generation I</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                      style={styles.containerGenerations}
                      onPress={generationsVII}
                    >
                      <View style={styles.slaman}>
                        <Image
                          source={ImagensIcon.pokemons.froakie}
                          style={styles.imgGenerations}
                        />
                        <Image
                          source={ImagensIcon.pokemons.rowlet}
                          style={styles.imgGenerations}
                        />
                        <Image
                          source={ImagensIcon.pokemons.litten}
                          style={styles.imgGenerations}
                        />
                      </View>
                      <Text style={styles.filtroText2}>Generation I</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                      style={styles.containerGenerations}
                      onPress={generationsVIII}
                    >
                      <View style={styles.slaman}>
                        <Image
                          source={ImagensIcon.pokemons.popplio}
                          style={styles.imgGenerations}
                        />
                        <Image
                          source={ImagensIcon.pokemons.sobble}
                          style={styles.imgGenerations}
                        />
                        <Image
                          source={ImagensIcon.pokemons.scorbunny}
                          style={styles.imgGenerations}
                        />
                      </View>
                      <Text style={styles.filtroText2}>Generation I</Text>
                    </TouchableOpacity>
                  </View>
                </ScrollView>
              </View>
            </View>
          )}

          {activeButton === "sortFiltro" && (
            <View style={styles.borrao}>
              <View style={styles.containerFiltro}>
                <Text style={styles.filtroText1}>Sort</Text>
                <Text style={styles.filtroText2}>
                  Sort Pokémons alphabetically or by National Pokédex number!
                </Text>
                <View style={styles.kkj}>
                  <TouchableOpacity
                    style={styles.btnSort}
                    onPress={sortByNumberAsc}
                  >
                    <Text style={styles.btnText}>Smallest number first</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={styles.btnSort}
                    onPress={sortByNumberDesc}
                  >
                    <Text style={styles.btnText}>Highest number first</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.btnSort}
                    onPress={sortByNameAsc}
                  >
                    <Text style={styles.btnText}>A-Z</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.btnSort}
                    onPress={sortByNameDesc}
                  >
                    <Text style={styles.btnText}>Z-A</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          )}

{activeButton === "filtroFiltro" && (
            <View style={styles.borrao}>
              <View style={styles.containerFiltro}>
                <Text style={styles.filtroText1}>Filters</Text>
                <Text style={styles.filtroText2}>
                  Use advanced search to explore Pokémon by type, weakness,
                  height and more!
                </Text>
                <View style={styles.fds}>
                  <Text style={styles.filtroText1}>Types</Text>
                  <View style={styles.nem}>
                    <TouchableOpacity
                      style={[
                        styles.tipobotao,
                        { backgroundColor: FiltroCor("filtro1") },
                      ]}
                      onPress={TypesPokemons}
                    >
                      <Image
                        source={ImagensIcon.filtros.filtro1}
                        style={styles.imgFoda}
                      />
                    </TouchableOpacity>

                    <TouchableOpacity
                      style={[
                        styles.tipobotao,
                        { backgroundColor: FiltroCor("filtro2") },
                      ]}
                      onPress={TypesPokemons}
                    >
                      <Image
                        source={ImagensIcon.filtros.filtro2}
                        style={styles.imgFoda}
                      />
                    </TouchableOpacity>

                    <TouchableOpacity
                      style={[
                        styles.tipobotao,
                        { backgroundColor: FiltroCor("filtro3") },
                      ]}
                      onPress={TypesPokemons}
                    >
                      <Image
                        source={ImagensIcon.filtros.filtro3}
                        style={styles.imgFoda}
                      />
                    </TouchableOpacity>

                    <TouchableOpacity
                      style={[
                        styles.tipobotao,
                        { backgroundColor: FiltroCor("filtro4") },
                      ]}
                      onPress={TypesPokemons}
                    >
                      <Image
                        source={ImagensIcon.filtros.filtro4}
                        style={styles.imgFoda}
                      />
                    </TouchableOpacity>

                    <TouchableOpacity
                      style={[
                        styles.tipobotao,
                        { backgroundColor: FiltroCor("filtro5") },
                      ]}
                      onPress={TypesPokemons}
                    >
                      <Image
                        source={ImagensIcon.filtros.filtro5}
                        style={styles.imgFoda}
                      />
                    </TouchableOpacity>

                    <TouchableOpacity
                      style={[
                        styles.tipobotao,
                        { backgroundColor: FiltroCor("filtro6") },
                      ]}
                      onPress={TypesPokemons}
                    >
                      <Image
                        source={ImagensIcon.filtros.filtro6}
                        style={styles.imgFoda}
                      />
                    </TouchableOpacity>

                    <TouchableOpacity
                      style={[
                        styles.tipobotao,
                        { backgroundColor: FiltroCor("filtro7") },
                      ]}
                      onPress={TypesPokemons}
                    >
                      <Image
                        source={ImagensIcon.filtros.filtro7}
                        style={styles.imgFoda}
                      />
                    </TouchableOpacity>

                    <TouchableOpacity
                      style={[
                        styles.tipobotao,
                        { backgroundColor: FiltroCor("filtro8") },
                      ]}
                      onPress={TypesPokemons}
                    >
                      <Image
                        source={ImagensIcon.filtros.filtro8}
                        style={styles.imgFoda}
                      />
                    </TouchableOpacity>

                    <TouchableOpacity
                      style={[
                        styles.tipobotao,
                        { backgroundColor: FiltroCor("filtro9") },
                      ]}
                      onPress={TypesPokemons}
                    >
                      <Image
                        source={ImagensIcon.filtros.filtro9}
                        style={styles.imgFoda}
                      />
                    </TouchableOpacity>

                    <TouchableOpacity
                      style={[
                        styles.tipobotao,
                        { backgroundColor: FiltroCor("filtro10") },
                      ]}
                      onPress={TypesPokemons}
                    >
                      <Image
                        source={ImagensIcon.filtros.filtro10}
                        style={styles.imgFoda}
                      />
                    </TouchableOpacity>

                    <TouchableOpacity
                      style={[
                        styles.tipobotao,
                        { backgroundColor: FiltroCor("filtro11") },
                      ]}
                      onPress={TypesPokemons}
                    >
                      <Image
                        source={ImagensIcon.filtros.filtro11}
                        style={styles.imgFoda}
                      />
                    </TouchableOpacity>

                    <TouchableOpacity
                      style={[
                        styles.tipobotao,
                        { backgroundColor: FiltroCor("filtro12") },
                      ]}
                      onPress={TypesPokemons}
                    >
                      <Image
                        source={ImagensIcon.filtros.filtro12}
                        style={styles.imgFoda}
                      />
                    </TouchableOpacity>

                    <TouchableOpacity
                      style={[
                        styles.tipobotao,
                        { backgroundColor: FiltroCor("filtro13") },
                      ]}
                      onPress={TypesPokemons}
                    >
                      <Image
                        source={ImagensIcon.filtros.filtro13}
                        style={styles.imgFoda}
                      />
                    </TouchableOpacity>

                    <TouchableOpacity
                      style={[
                        styles.tipobotao,
                        { backgroundColor: FiltroCor("filtro14") },
                      ]}
                      onPress={TypesPokemons}
                    >
                      <Image
                        source={ImagensIcon.filtros.filtro14}
                        style={styles.imgFoda}
                      />
                    </TouchableOpacity>

                    <TouchableOpacity
                      style={[
                        styles.tipobotao,
                        { backgroundColor: FiltroCor("filtro15") },
                      ]}
                      onPress={TypesPokemons}
                    >
                      <Image
                        source={ImagensIcon.filtros.filtro15}
                        style={styles.imgFoda}
                      />
                    </TouchableOpacity>

                    <TouchableOpacity
                      style={[
                        styles.tipobotao,
                        { backgroundColor: FiltroCor("filtro16") },
                      ]}
                      onPress={TypesPokemons}
                    >
                      <Image
                        source={ImagensIcon.filtros.filtro16}
                        style={styles.imgFoda}
                      />
                    </TouchableOpacity>

                    <TouchableOpacity
                      style={[
                        styles.tipobotao,
                        { backgroundColor: FiltroCor("filtro17") },
                      ]}
                      onPress={TypesPokemons}
                    >
                      <Image
                        source={ImagensIcon.filtros.filtro17}
                        style={styles.imgFoda}
                      />
                    </TouchableOpacity>

                    <TouchableOpacity
                      style={[
                        styles.tipobotao,
                        { backgroundColor: FiltroCor("filtro18") },
                      ]}
                      onPress={TypesPokemons}
                    >
                      <Image
                        source={ImagensIcon.filtros.filtro18}
                        style={styles.imgFoda}
                      />
                    </TouchableOpacity>
                  </View>

                  <Text style={styles.filtroText1}>Weaknesses</Text>
                  <View style={styles.nem}>
                    <TouchableOpacity
                      style={[
                        styles.tipobotao,
                        { backgroundColor: FiltroCor("filtro1") },
                      ]}
                      onPress={botoesTipos}
                    >
                      <Image
                        source={ImagensIcon.filtros.filtro1}
                        style={styles.imgFoda}
                      />
                    </TouchableOpacity>

                    <TouchableOpacity
                      style={[
                        styles.tipobotao,
                        { backgroundColor: FiltroCor("filtro2") },
                      ]}
                      onPress={botoesTipos}
                    >
                      <Image
                        source={ImagensIcon.filtros.filtro2}
                        style={styles.imgFoda}
                      />
                    </TouchableOpacity>

                    <TouchableOpacity
                      style={[
                        styles.tipobotao,
                        { backgroundColor: FiltroCor("filtro3") },
                      ]}
                      onPress={botoesTipos}
                    >
                      <Image
                        source={ImagensIcon.filtros.filtro3}
                        style={styles.imgFoda}
                      />
                    </TouchableOpacity>

                    <TouchableOpacity
                      style={[
                        styles.tipobotao,
                        { backgroundColor: FiltroCor("filtro4") },
                      ]}
                      onPress={botoesTipos}
                    >
                      <Image
                        source={ImagensIcon.filtros.filtro4}
                        style={styles.imgFoda}
                      />
                    </TouchableOpacity>

                    <TouchableOpacity
                      style={[
                        styles.tipobotao,
                        { backgroundColor: FiltroCor("filtro5") },
                      ]}
                      onPress={botoesTipos}
                    >
                      <Image
                        source={ImagensIcon.filtros.filtro5}
                        style={styles.imgFoda}
                      />
                    </TouchableOpacity>

                    <TouchableOpacity
                      style={[
                        styles.tipobotao,
                        { backgroundColor: FiltroCor("filtro6") },
                      ]}
                      onPress={botoesTipos}
                    >
                      <Image
                        source={ImagensIcon.filtros.filtro6}
                        style={styles.imgFoda}
                      />
                    </TouchableOpacity>

                    <TouchableOpacity
                      style={[
                        styles.tipobotao,
                        { backgroundColor: FiltroCor("filtro7") },
                      ]}
                      onPress={botoesTipos}
                    >
                      <Image
                        source={ImagensIcon.filtros.filtro7}
                        style={styles.imgFoda}
                      />
                    </TouchableOpacity>

                    <TouchableOpacity
                      style={[
                        styles.tipobotao,
                        { backgroundColor: FiltroCor("filtro8") },
                      ]}
                      onPress={botoesTipos}
                    >
                      <Image
                        source={ImagensIcon.filtros.filtro8}
                        style={styles.imgFoda}
                      />
                    </TouchableOpacity>

                    <TouchableOpacity
                      style={[
                        styles.tipobotao,
                        { backgroundColor: FiltroCor("filtro9") },
                      ]}
                      onPress={botoesTipos}
                    >
                      <Image
                        source={ImagensIcon.filtros.filtro9}
                        style={styles.imgFoda}
                      />
                    </TouchableOpacity>

                    <TouchableOpacity
                      style={[
                        styles.tipobotao,
                        { backgroundColor: FiltroCor("filtro10") },
                      ]}
                      onPress={botoesTipos}
                    >
                      <Image
                        source={ImagensIcon.filtros.filtro10}
                        style={styles.imgFoda}
                      />
                    </TouchableOpacity>

                    <TouchableOpacity
                      style={[
                        styles.tipobotao,
                        { backgroundColor: FiltroCor("filtro11") },
                      ]}
                      onPress={botoesTipos}
                    >
                      <Image
                        source={ImagensIcon.filtros.filtro11}
                        style={styles.imgFoda}
                      />
                    </TouchableOpacity>

                    <TouchableOpacity
                      style={[
                        styles.tipobotao,
                        { backgroundColor: FiltroCor("filtro12") },
                      ]}
                      onPress={botoesTipos}
                    >
                      <Image
                        source={ImagensIcon.filtros.filtro12}
                        style={styles.imgFoda}
                      />
                    </TouchableOpacity>

                    <TouchableOpacity
                      style={[
                        styles.tipobotao,
                        { backgroundColor: FiltroCor("filtro13") },
                      ]}
                      onPress={botoesTipos}
                    >
                      <Image
                        source={ImagensIcon.filtros.filtro13}
                        style={styles.imgFoda}
                      />
                    </TouchableOpacity>

                    <TouchableOpacity
                      style={[
                        styles.tipobotao,
                        { backgroundColor: FiltroCor("filtro14") },
                      ]}
                      onPress={botoesTipos}
                    >
                      <Image
                        source={ImagensIcon.filtros.filtro14}
                        style={styles.imgFoda}
                      />
                    </TouchableOpacity>

                    <TouchableOpacity
                      style={[
                        styles.tipobotao,
                        { backgroundColor: FiltroCor("filtro15") },
                      ]}
                      onPress={botoesTipos}
                    >
                      <Image
                        source={ImagensIcon.filtros.filtro15}
                        style={styles.imgFoda}
                      />
                    </TouchableOpacity>

                    <TouchableOpacity
                      style={[
                        styles.tipobotao,
                        { backgroundColor: FiltroCor("filtro16") },
                      ]}
                      onPress={botoesTipos}
                    >
                      <Image
                        source={ImagensIcon.filtros.filtro16}
                        style={styles.imgFoda}
                      />
                    </TouchableOpacity>

                    <TouchableOpacity
                      style={[
                        styles.tipobotao,
                        { backgroundColor: FiltroCor("filtro17") },
                      ]}
                      onPress={botoesTipos}
                    >
                      <Image
                        source={ImagensIcon.filtros.filtro17}
                        style={styles.imgFoda}
                      />
                    </TouchableOpacity>

                    <TouchableOpacity
                      style={[
                        styles.tipobotao,
                        { backgroundColor: FiltroCor("filtro18") },
                      ]}
                      onPress={botoesTipos}
                    >
                      <Image
                        source={ImagensIcon.filtros.filtro18}
                        style={styles.imgFoda}
                      />
                    </TouchableOpacity>
                  </View>

                  <Text style={styles.filtroText1}>Heights</Text>
                  <View style={styles.nem}>
                    <TouchableOpacity
                      style={[
                        styles.tipobotao,
                        { backgroundColor: FiltroCor("filtro19") },
                      ]}
                      onPress={botoesTipos}
                    >
                      <Image
                        source={ImagensIcon.filtros.filtro19}
                        style={styles.imgFoda}
                      />
                    </TouchableOpacity>

                    <TouchableOpacity
                      style={[
                        styles.tipobotao,
                        { backgroundColor: FiltroCor("filtro20") },
                      ]}
                      onPress={botoesTipos}
                    >
                      <Image
                        source={ImagensIcon.filtros.filtro20}
                        style={styles.imgFoda}
                      />
                    </TouchableOpacity>

                    <TouchableOpacity
                      style={[
                        styles.tipobotao,
                        { backgroundColor: FiltroCor("filtro21") },
                      ]}
                      onPress={botoesTipos}
                    >
                      <Image
                        source={ImagensIcon.filtros.filtro21}
                        style={styles.imgFoda}
                      />
                    </TouchableOpacity>
                  </View>

                  <Text style={styles.filtroText1}>Weights</Text>
                  <View style={styles.nem}>
                    <TouchableOpacity
                      style={[
                        styles.tipobotao,
                        { backgroundColor: FiltroCor("filtro22") },
                      ]}
                      onPress={botoesTipos}
                    >
                      <Image
                        source={ImagensIcon.filtros.filtro22}
                        style={styles.imgFoda}
                      />
                    </TouchableOpacity>

                    <TouchableOpacity
                      style={[
                        styles.tipobotao,
                        { backgroundColor: FiltroCor("filtro23") },
                      ]}
                      onPress={botoesTipos}
                    >
                      <Image
                        source={ImagensIcon.filtros.filtro23}
                        style={styles.imgFoda}
                      />
                    </TouchableOpacity>

                    <TouchableOpacity
                      style={[
                        styles.tipobotao,
                        { backgroundColor: FiltroCor("filtro24") },
                      ]}
                      onPress={botoesTipos}
                    >
                      <Image
                        source={ImagensIcon.filtros.filtro24}
                        style={styles.imgFoda}
                      />
                    </TouchableOpacity>
                  </View>

                  <Text style={styles.filtroText1}>Number Range</Text>
                  <Slider
                    style={{ width: "100%", height: 40 }}
                    minimumValue={0}
                    maximumValue={1000}
                    step={1}
                    value={rangeValue}
                    onValueChange={(value) => setRangeValue(value)}
                    minimumTrackTintColor="#EA5D60"
                    maximumTrackTintColor="#fff"
                    thumbTintColor="#EA5D60"
                  />
                  <View
                    style={[
                      styles.valueContainer,
                      { left: `${(rangeValue / 1000) * 95}%` },
                    ]}
                  >
                    <Text style={styles.valueText}>{rangeValue}</Text>
                  </View>
                  <View style={styles.ResetApply}>
                    <TouchableOpacity style={styles.btnFilters} onPress={Reset}>
                      <Text style={styles.textSs}>Reset</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.btnFilters} onPress={Apply}>
                      <Text style={styles.textSs}>Apply</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </View>
          )}

          <FlatList
            data={filteredList}
            renderItem={renderItem}
            keyExtractor={(item) => item.name}
            onEndReached={fetchPokemon}
            onEndReachedThreshold={0.5}
          />
        </View>
      )}
    </SafeAreaView>
  );
};

export default App;
