import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  TextInput,
  StatusBar,
  SafeAreaView,
  ScrollView,
  Modal,
  Button,
} from "react-native";
import axios from "axios";
import PokemonHome from "./src/components/PokemonHome";
import Profile from "./src/pages/Profile.jsx";
import ImagensIcon from "./src/utils/Imagens.js";
import styles from "./src/styles/homeStyles.js";
import Slider from "@react-native-community/slider";

const App = () => {
  const [list, setList] = useState([]);
  const [displayedList, setDisplayedList] = useState([]);
  const [search, setSearch] = useState("");
  const [nextUrl, setNextUrl] = useState(
    "https://pokeapi.co/api/v2/pokemon?limit=20"
  );
  const [selectedPokemon, setSelectedPokemon] = useState(null);
  const [activeSortButton, setActiveSortButton] = useState(null);
  const [rangeValue, setRangeValue] = useState(50);

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

        const uniquePokemons = newPokemons.filter(
          (newPokemon) =>
            !list.some((existing) => existing.id === newPokemon.id)
        );

        setList((prevList) => {
          const updatedList = [...prevList, ...uniquePokemons];
          setDisplayedList(updatedList);
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

  const [modalGenerationsOpen, setModalGenerationsOpen] = useState(false);
  const [modalSortOpen, setModalSortOpen] = useState(false);
  const [modalFilterOpen, setModalFilterOpen] = useState(false);

  const openGenerationsModal = () => {
    setModalGenerationsOpen(true);
    setModalFilterOpen(false);
    setModalSortOpen(false);
  };

  const openSortModal = () => {
    setModalSortOpen(true);
    setModalFilterOpen(false);
    setModalGenerationsOpen(false);
  };

  const openFilterModal = () => {
    setModalFilterOpen(true);
    setModalSortOpen(false);
    setModalGenerationsOpen(false);
  };

  const closeGenerations = () => {
    setModalGenerationsOpen(false);
  };

  const closeSort = () => {
    setModalSortOpen(false);
  };

  const closeFilter = () => {
    setModalFilterOpen(false);
  };

  const filteredList = displayedList.filter((pokemon) =>
    pokemon.name.toLowerCase().includes(search.toLowerCase())
  );

  const generationsI = () => {
    const filteredGenerationsI = list.filter(
      (pokemon) => pokemon.id >= 1 && pokemon.id <= 151
    );
    setDisplayedList(filteredGenerationsI);
  };

  const generationsII = () => {
    const filteredGenerationsII = list.filter(
      (pokemon) => pokemon.id >= 152 && pokemon.id <= 251
    );
    setDisplayedList(filteredGenerationsII);
  };

  const generationsIII = () => {
    const filteredGenerationsIII = list.filter(
      (pokemon) => pokemon.id >= 252 && pokemon.id <= 386
    );
    setDisplayedList(filteredGenerationsIII);
  };

  const generationsIV = () => {
    const filteredgenerationsIV = list.filter(
      (pokemon) => pokemon.id >= 387 && pokemon.id <= 494
    );
    setDisplayedList(filteredgenerationsIV);
  };

  const generationsV = () => {
    const filteredGenerationsV = list.filter(
      (pokemon) => pokemon.id >= 495 && pokemon.id <= 649
    );
    setDisplayedList(filteredGenerationsV);
  };

  const generationsVI = () => {
    const filteredGenerationsVI = list.filter(
      (pokemon) => pokemon.id >= 650 && pokemon.id <= 721
    );
    setDisplayedList(filteredGenerationsVI);
  };

  const generationsVII = () => {
    const filteredgenerationsVII = list.filter(
      (pokemon) => pokemon.id >= 722 && pokemon.id <= 809
    );
    setDisplayedList(filteredgenerationsVII);
  };

  const generationsVIII = () => {
    const filteredgenerationsVIII = list.filter(
      (pokemon) => pokemon.id >= 810 && pokemon.id <= 816
    );
    setDisplayedList(filteredgenerationsVIII);
  };

  const renderItem = ({ item }) => (
    <PokemonHome item={item} onSelect={showPokemonProfile} />
  );

  const handleSortButtonPress = (button) => {
    setActiveSortButton(activeSortButton === button ? null : button);
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

  const tipode = () => {
    console.log("Lista de Pokémon:", list); // Verifique a lista antes do filtro
    const agua = list.filter((pokemon) => {
      console.log("Verificando Pokémon:", pokemon); // Verifique cada Pokémon
      return (
        Array.isArray(pokemon.types) &&
        pokemon.types.some((type) => type.type.name === "water")
      );
    });
    console.log("Pokémon do tipo Água:", agua); // Veja o resultado do filtro
    setDisplayedList(agua);
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
            <TouchableOpacity onPress={openGenerationsModal}>
              <Image source={ImagensIcon.icons.geracao} style={styles.icon} />
            </TouchableOpacity>
            <TouchableOpacity onPress={openSortModal}>
              <Image source={ImagensIcon.icons.organizar} style={styles.icon} />
            </TouchableOpacity>
            <TouchableOpacity onPress={openFilterModal}>
              <Image source={ImagensIcon.icons.filtro} style={styles.icon} />
            </TouchableOpacity>
          </View>

          <Text style={styles.titulo}>Pokédex</Text>
          <Text style={styles.subtitulo}>
            Search for Pokémon by name or using the National Pokédex number.
          </Text>

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

          {/* Modal Generetions */}
          <Modal
            visible={modalGenerationsOpen}
            animationType="slide"
            transparent={true}
          >
            <View style={styles.borrao}>
              <TouchableOpacity
                style={styles.closebtn}
                onPress={closeGenerations}
              ></TouchableOpacity>
              <View style={styles.barra}></View>
              <ScrollView>
                <View style={styles.containerFiltro}>
                  <Text style={styles.filtroText1}>Generations</Text>
                  <Text style={styles.filtroText2}>
                    Use search for generations to explore your Pokémon!
                  </Text>

                  <View style={styles.paitaon}>
                    <TouchableOpacity
                      style={[
                        styles.containerGenerations,
                        activeSortButton === "geno" && {
                          backgroundColor: "#EA5D60",
                        },
                      ]}
                      onPress={() => {
                        generationsI();
                        handleSortButtonPress("geno");
                      }}
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
                      <Text
                        style={[
                          styles.filtroText2,
                          activeSortButton === "geno" && { color: "#fff" },
                        ]}
                      >
                        Generation I
                      </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                      style={[
                        styles.containerGenerations,
                        activeSortButton === "genoII" && {
                          backgroundColor: "#EA5D60",
                        },
                      ]}
                      onPress={() => {
                        generationsII();
                        handleSortButtonPress("genoII");
                      }}
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
                      <Text
                        style={[
                          styles.filtroText2,
                          activeSortButton === "genoII" && { color: "#fff" },
                        ]}
                      >
                        Generation II
                      </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                      style={[
                        styles.containerGenerations,
                        activeSortButton === "genoIII" && {
                          backgroundColor: "#EA5D60",
                        },
                      ]}
                      onPress={() => {
                        generationsIII();
                        handleSortButtonPress("genoIII");
                      }}
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
                      <Text
                        style={[
                          styles.filtroText2,
                          activeSortButton === "genoIII" && { color: "#fff" },
                        ]}
                      >
                        Generation III
                      </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                      style={[
                        styles.containerGenerations,
                        activeSortButton === "genoIV" && {
                          backgroundColor: "#EA5D60",
                        },
                      ]}
                      onPress={() => {
                        generationsIV();
                        handleSortButtonPress("genoIV");
                      }}
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
                      <Text
                        style={[
                          styles.filtroText2,
                          activeSortButton === "genoIV" && { color: "#fff" },
                        ]}
                      >
                        Generation IV
                      </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                      style={[
                        styles.containerGenerations,
                        activeSortButton === "genoV" && {
                          backgroundColor: "#EA5D60",
                        },
                      ]}
                      onPress={() => {
                        generationsV();
                        handleSortButtonPress("genoV");
                      }}
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
                      <Text
                        style={[
                          styles.filtroText2,
                          activeSortButton === "genoV" && { color: "#fff" },
                        ]}
                      >
                        Generation V
                      </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                      style={[
                        styles.containerGenerations,
                        activeSortButton === "genoVI" && {
                          backgroundColor: "#EA5D60",
                        },
                      ]}
                      onPress={() => {
                        generationsVI();
                        handleSortButtonPress("genoVI");
                      }}
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
                      <Text
                        style={[
                          styles.filtroText2,
                          activeSortButton === "genoVI" && { color: "#fff" },
                        ]}
                      >
                        Generation VI
                      </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                      style={[
                        styles.containerGenerations,
                        activeSortButton === "genoVII" && {
                          backgroundColor: "#EA5D60",
                        },
                      ]}
                      onPress={() => {
                        generationsVII();
                        handleSortButtonPress("genoVII");
                      }}
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
                      <Text
                        style={[
                          styles.filtroText2,
                          activeSortButton === "genoVII" && { color: "#fff" },
                        ]}
                      >
                        Generation VII
                      </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                      style={[
                        styles.containerGenerations,
                        activeSortButton === "genoVIII" && {
                          backgroundColor: "#EA5D60",
                        },
                      ]}
                      onPress={() => {
                        generationsVIII();
                        handleSortButtonPress("genoVIII");
                      }}
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
                      <Text
                        style={[
                          styles.filtroText2,
                          activeSortButton === "genoVIII" && { color: "#fff" },
                        ]}
                      >
                        Generation VIII
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </ScrollView>
            </View>
          </Modal>

          {/* Modal Sort*/}
          <Modal
            visible={modalSortOpen}
            animationType="slide"
            transparent={true}
          >
            <View style={styles.borrao}>
              <TouchableOpacity
                style={styles.closebtn}
                onPress={closeSort}
              ></TouchableOpacity>

              <View style={styles.barra}></View>
              <ScrollView>
                <View style={styles.containerFiltro}>
                  <Text style={styles.filtroText1}>Sort</Text>
                  <Text style={styles.filtroText2}>
                    Sort Pokémons alphabetically or by National Pokédex number!
                  </Text>

                  <View style={styles.kkj}>
                    <TouchableOpacity
                      style={[
                        styles.btnSort,
                        activeSortButton === "asc" && {
                          backgroundColor: "#EA5D60",
                        },
                      ]}
                      onPress={() => {
                        sortByNumberAsc();
                        handleSortButtonPress("asc");
                      }}
                    >
                      <Text
                        style={[
                          styles.btnText,
                          activeSortButton === "asc" && { color: "#fff" },
                        ]}
                      >
                        Smallest number first
                      </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                      style={[
                        styles.btnSort,
                        activeSortButton === "desc" && {
                          backgroundColor: "#EA5D60",
                        },
                      ]}
                      onPress={() => {
                        sortByNumberDesc();
                        handleSortButtonPress("desc");
                      }}
                    >
                      <Text
                        style={[
                          styles.btnText,
                          activeSortButton === "desc" && { color: "#fff" },
                        ]}
                      >
                        Highest number first
                      </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                      style={[
                        styles.btnSort,
                        activeSortButton === "nameAsc" && {
                          backgroundColor: "#EA5D60",
                        },
                      ]}
                      onPress={() => {
                        sortByNameAsc();
                        handleSortButtonPress("nameAsc");
                      }}
                    >
                      <Text
                        style={[
                          styles.btnText,
                          activeSortButton === "nameAsc" && { color: "#fff" },
                        ]}
                      >
                        A-Z
                      </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                      style={[
                        styles.btnSort,
                        activeSortButton === "nameDesc" && {
                          backgroundColor: "#EA5D60",
                        },
                      ]}
                      onPress={() => {
                        sortByNameDesc();
                        handleSortButtonPress("nameDesc");
                      }}
                    >
                      <Text
                        style={[
                          styles.btnText,
                          activeSortButton === "nameDesc" && { color: "#fff" },
                        ]}
                      >
                        Z-A
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </ScrollView>
            </View>
          </Modal>

          {/* Modal Filter */}
          <Modal
            visible={modalFilterOpen}
            animationType="slide"
            transparent={true}
          >
            <View style={styles.borrao}>
              <TouchableOpacity
                style={styles.closebtn}
                onPress={closeFilter}
              ></TouchableOpacity>
              <View style={styles.barra}></View>
              <ScrollView>
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
                          activeSortButton === "filter1" && {
                            backgroundColor: "#8CB230",
                          },
                        ]}
                        onPress={() => {
                          tipode();
                          handleSortButtonPress("filter1");
                        }}
                      >
                        <Image
                          source={ImagensIcon.filtros.filtro1}
                          style={[
                            styles.imgFoda,
                            activeSortButton === "filter1" && {
                              tintColor: "#FFFFFF",
                            },
                          ]}
                        />
                      </TouchableOpacity>

                      <TouchableOpacity
                        style={[
                          styles.tipobotao,
                          activeSortButton === "filter2" && {
                            backgroundColor: "#58575F",
                          },
                        ]}
                        onPress={() => {
                          TypesPokemons();
                          handleSortButtonPress("filter2");
                        }}
                      >
                        <Image
                          source={ImagensIcon.filtros.filtro2}
                          style={[
                            styles.imgFoda,
                            activeSortButton === "filter2" && {
                              tintColor: "#FFFFFF",
                            },
                          ]}
                        />
                      </TouchableOpacity>

                      <TouchableOpacity
                        style={[
                          styles.tipobotao,
                          activeSortButton === "filter3" && {
                            backgroundColor: "#0F6AC0",
                          },
                        ]}
                        onPress={() => {
                          TypesPokemons();
                          handleSortButtonPress("filter3");
                        }}
                      >
                        <Image
                          source={ImagensIcon.filtros.filtro3}
                          style={[
                            styles.imgFoda,
                            activeSortButton === "filter3" && {
                              tintColor: "#FFFFFF",
                            },
                          ]}
                        />
                      </TouchableOpacity>

                      <TouchableOpacity
                        style={[
                          styles.tipobotao,
                          activeSortButton === "filter4" && {
                            backgroundColor: "#EED535",
                          },
                        ]}
                        onPress={() => {
                          TypesPokemons();
                          handleSortButtonPress("filter4");
                        }}
                      >
                        <Image
                          source={ImagensIcon.filtros.filtro4}
                          style={[
                            styles.imgFoda,
                            activeSortButton === "filter4" && {
                              tintColor: "#FFFFFF",
                            },
                          ]}
                        />
                      </TouchableOpacity>

                      <TouchableOpacity
                        style={[
                          styles.tipobotao,
                          activeSortButton === "filter5" && {
                            backgroundColor: "#ED6EC7",
                          },
                        ]}
                        onPress={() => {
                          TypesPokemons();
                          handleSortButtonPress("filter5");
                        }}
                      >
                        <Image
                          source={ImagensIcon.filtros.filtro5}
                          style={[
                            styles.imgFoda,
                            activeSortButton === "filter5" && {
                              tintColor: "#FFFFFF",
                            },
                          ]}
                        />
                      </TouchableOpacity>

                      <TouchableOpacity
                        style={[
                          styles.tipobotao,
                          activeSortButton === "filter6" && {
                            backgroundColor: "#D04164",
                          },
                        ]}
                        onPress={() => {
                          TypesPokemons();
                          handleSortButtonPress("filter6");
                        }}
                      >
                        <Image
                          source={ImagensIcon.filtros.filtro6}
                          style={[
                            styles.imgFoda,
                            activeSortButton === "filter6" && {
                              tintColor: "#FFFFFF",
                            },
                          ]}
                        />
                      </TouchableOpacity>

                      <TouchableOpacity
                        style={[
                          styles.tipobotao,
                          activeSortButton === "filter7" && {
                            backgroundColor: "#FD7D24",
                          },
                        ]}
                        onPress={() => {
                          TypesPokemons();
                          handleSortButtonPress("filter7");
                        }}
                      >
                        <Image
                          source={ImagensIcon.filtros.filtro7}
                          style={[
                            styles.imgFoda,
                            activeSortButton === "filter7" && {
                              tintColor: "#FFFFFF",
                            },
                          ]}
                        />
                      </TouchableOpacity>

                      <TouchableOpacity
                        style={[
                          styles.tipobotao,
                          activeSortButton === "filter8" && {
                            backgroundColor: "#748FC9",
                          },
                        ]}
                        onPress={() => {
                          TypesPokemons();
                          handleSortButtonPress("filter8");
                        }}
                      >
                        <Image
                          source={ImagensIcon.filtros.filtro8}
                          style={[
                            styles.imgFoda,
                            activeSortButton === "filter8" && {
                              tintColor: "#FFFFFF",
                            },
                          ]}
                        />
                      </TouchableOpacity>

                      <TouchableOpacity
                        style={[
                          styles.tipobotao,
                          activeSortButton === "filter9" && {
                            backgroundColor: "#556AAE",
                          },
                        ]}
                        onPress={() => {
                          TypesPokemons();
                          handleSortButtonPress("filter9");
                        }}
                      >
                        <Image
                          source={ImagensIcon.filtros.filtro9}
                          style={[
                            styles.imgFoda,
                            activeSortButton === "filter9" && {
                              tintColor: "#FFFFFF",
                            },
                          ]}
                        />
                      </TouchableOpacity>

                      <TouchableOpacity
                        style={[
                          styles.tipobotao,
                          activeSortButton === "filter10" && {
                            backgroundColor: "#62B957",
                          },
                        ]}
                        onPress={() => {
                          TypesPokemons();
                          handleSortButtonPress("filter10");
                        }}
                      >
                        <Image
                          source={ImagensIcon.filtros.filtro10}
                          style={[
                            styles.imgFoda,
                            activeSortButton === "filter10" && {
                              tintColor: "#FFFFFF",
                            },
                          ]}
                        />
                      </TouchableOpacity>

                      <TouchableOpacity
                        style={[
                          styles.tipobotao,
                          activeSortButton === "filter11" && {
                            backgroundColor: "#DD7748",
                          },
                        ]}
                        onPress={() => {
                          TypesPokemons();
                          handleSortButtonPress("filter11");
                        }}
                      >
                        <Image
                          source={ImagensIcon.filtros.filtro11}
                          style={[
                            styles.imgFoda,
                            activeSortButton === "filter11" && {
                              tintColor: "#FFFFFF",
                            },
                          ]}
                        />
                      </TouchableOpacity>

                      <TouchableOpacity
                        style={[
                          styles.tipobotao,
                          activeSortButton === "filter12" && {
                            backgroundColor: "#61CEC0",
                          },
                        ]}
                        onPress={() => {
                          TypesPokemons();
                          handleSortButtonPress("filter12");
                        }}
                      >
                        <Image
                          source={ImagensIcon.filtros.filtro12}
                          style={[
                            styles.imgFoda,
                            activeSortButton === "filter12" && {
                              tintColor: "#FFFFFF",
                            },
                          ]}
                        />
                      </TouchableOpacity>

                      <TouchableOpacity
                        style={[
                          styles.tipobotao,
                          activeSortButton === "filter13" && {
                            backgroundColor: "#9DA0AA",
                          },
                        ]}
                        onPress={() => {
                          TypesPokemons();
                          handleSortButtonPress("filter13");
                        }}
                      >
                        <Image
                          source={ImagensIcon.filtros.filtro13}
                          style={[
                            styles.imgFoda,
                            activeSortButton === "filter13" && {
                              tintColor: "#FFFFFF",
                            },
                          ]}
                        />
                      </TouchableOpacity>

                      <TouchableOpacity
                        style={[
                          styles.tipobotao,
                          activeSortButton === "filter14" && {
                            backgroundColor: "#A552CC",
                          },
                        ]}
                        onPress={() => {
                          TypesPokemons();
                          handleSortButtonPress("filter14");
                        }}
                      >
                        <Image
                          source={ImagensIcon.filtros.filtro14}
                          style={[
                            styles.imgFoda,
                            activeSortButton === "filter14" && {
                              tintColor: "#FFFFFF",
                            },
                          ]}
                        />
                      </TouchableOpacity>

                      <TouchableOpacity
                        style={[
                          styles.tipobotao,
                          activeSortButton === "filter15" && {
                            backgroundColor: "#EA5D60",
                          },
                        ]}
                        onPress={() => {
                          TypesPokemons();
                          handleSortButtonPress("filter15");
                        }}
                      >
                        <Image
                          source={ImagensIcon.filtros.filtro15}
                          style={[
                            styles.imgFoda,
                            activeSortButton === "filter15" && {
                              tintColor: "#FFFFFF",
                            },
                          ]}
                        />
                      </TouchableOpacity>

                      <TouchableOpacity
                        style={[
                          styles.tipobotao,
                          activeSortButton === "filter16" && {
                            backgroundColor: "#BAAB82",
                          },
                        ]}
                        onPress={() => {
                          TypesPokemons();
                          handleSortButtonPress("filter16");
                        }}
                      >
                        <Image
                          source={ImagensIcon.filtros.filtro16}
                          style={[
                            styles.imgFoda,
                            activeSortButton === "filter16" && {
                              tintColor: "#FFFFFF",
                            },
                          ]}
                        />
                      </TouchableOpacity>

                      <TouchableOpacity
                        style={[
                          styles.tipobotao,
                          activeSortButton === "filter17" && {
                            backgroundColor: "#417D9A",
                          },
                        ]}
                        onPress={() => {
                          TypesPokemons();
                          handleSortButtonPress("filter17");
                        }}
                      >
                        <Image
                          source={ImagensIcon.filtros.filtro17}
                          style={[
                            styles.imgFoda,
                            activeSortButton === "filter17" && {
                              tintColor: "#FFFFFF",
                            },
                          ]}
                        />
                      </TouchableOpacity>

                      <TouchableOpacity
                        style={[
                          styles.tipobotao,
                          activeSortButton === "filter18" && {
                            backgroundColor: "#4A90DA",
                          },
                        ]}
                        onPress={() => {
                          TypesPokemons();
                          handleSortButtonPress("filter18");
                        }}
                      >
                        <Image
                          source={ImagensIcon.filtros.filtro18}
                          style={[
                            styles.imgFoda,
                            activeSortButton === "filter18" && {
                              tintColor: "#FFFFFF",
                            },
                          ]}
                        />
                      </TouchableOpacity>
                    </View>

                    <Text style={styles.filtroText1}>Weaknesses</Text>
                    <View style={styles.nem}>
                      <TouchableOpacity
                        style={[
                          styles.tipobotao,
                          activeSortButton === "filter19" && {
                            backgroundColor: "#8CB230",
                          },
                        ]}
                        onPress={() => {
                          TypesPokemons();
                          handleSortButtonPress("filter19");
                        }}
                      >
                        <Image
                          source={ImagensIcon.filtros.filtro1}
                          style={[
                            styles.imgFoda,
                            activeSortButton === "filter19" && {
                              tintColor: "#FFFFFF",
                            },
                          ]}
                        />
                      </TouchableOpacity>

                      <TouchableOpacity
                        style={[
                          styles.tipobotao,
                          activeSortButton === "filter20" && {
                            backgroundColor: "#58575F",
                          },
                        ]}
                        onPress={() => {
                          TypesPokemons();
                          handleSortButtonPress("filter20");
                        }}
                      >
                        <Image
                          source={ImagensIcon.filtros.filtro2}
                          style={[
                            styles.imgFoda,
                            activeSortButton === "filter20" && {
                              tintColor: "#FFFFFF",
                            },
                          ]}
                        />
                      </TouchableOpacity>

                      <TouchableOpacity
                        style={[
                          styles.tipobotao,
                          activeSortButton === "filter21" && {
                            backgroundColor: "#0F6AC0",
                          },
                        ]}
                        onPress={() => {
                          TypesPokemons();
                          handleSortButtonPress("filter21");
                        }}
                      >
                        <Image
                          source={ImagensIcon.filtros.filtro3}
                          style={[
                            styles.imgFoda,
                            activeSortButton === "filter21" && {
                              tintColor: "#FFFFFF",
                            },
                          ]}
                        />
                      </TouchableOpacity>

                      <TouchableOpacity
                        style={[
                          styles.tipobotao,
                          activeSortButton === "filter22" && {
                            backgroundColor: "#EED535",
                          },
                        ]}
                        onPress={() => {
                          TypesPokemons();
                          handleSortButtonPress("filter22");
                        }}
                      >
                        <Image
                          source={ImagensIcon.filtros.filtro4}
                          style={[
                            styles.imgFoda,
                            activeSortButton === "filter22" && {
                              tintColor: "#FFFFFF",
                            },
                          ]}
                        />
                      </TouchableOpacity>

                      <TouchableOpacity
                        style={[
                          styles.tipobotao,
                          activeSortButton === "filter23" && {
                            backgroundColor: "#ED6EC7",
                          },
                        ]}
                        onPress={() => {
                          TypesPokemons();
                          handleSortButtonPress("filter23");
                        }}
                      >
                        <Image
                          source={ImagensIcon.filtros.filtro5}
                          style={[
                            styles.imgFoda,
                            activeSortButton === "filter23" && {
                              tintColor: "#FFFFFF",
                            },
                          ]}
                        />
                      </TouchableOpacity>

                      <TouchableOpacity
                        style={[
                          styles.tipobotao,
                          activeSortButton === "filter24" && {
                            backgroundColor: "#D04164",
                          },
                        ]}
                        onPress={() => {
                          TypesPokemons();
                          handleSortButtonPress("filter24");
                        }}
                      >
                        <Image
                          source={ImagensIcon.filtros.filtro6}
                          style={[
                            styles.imgFoda,
                            activeSortButton === "filter24" && {
                              tintColor: "#FFFFFF",
                            },
                          ]}
                        />
                      </TouchableOpacity>

                      <TouchableOpacity
                        style={[
                          styles.tipobotao,
                          activeSortButton === "filter25" && {
                            backgroundColor: "#FD7D24",
                          },
                        ]}
                        onPress={() => {
                          TypesPokemons();
                          handleSortButtonPress("filter25");
                        }}
                      >
                        <Image
                          source={ImagensIcon.filtros.filtro7}
                          style={[
                            styles.imgFoda,
                            activeSortButton === "filter25" && {
                              tintColor: "#FFFFFF",
                            },
                          ]}
                        />
                      </TouchableOpacity>

                      <TouchableOpacity
                        style={[
                          styles.tipobotao,
                          activeSortButton === "filter26" && {
                            backgroundColor: "#748FC9",
                          },
                        ]}
                        onPress={() => {
                          TypesPokemons();
                          handleSortButtonPress("filter26");
                        }}
                      >
                        <Image
                          source={ImagensIcon.filtros.filtro8}
                          style={[
                            styles.imgFoda,
                            activeSortButton === "filter26" && {
                              tintColor: "#FFFFFF",
                            },
                          ]}
                        />
                      </TouchableOpacity>

                      <TouchableOpacity
                        style={[
                          styles.tipobotao,
                          activeSortButton === "filter27" && {
                            backgroundColor: "#556AAE",
                          },
                        ]}
                        onPress={() => {
                          TypesPokemons();
                          handleSortButtonPress("filter27");
                        }}
                      >
                        <Image
                          source={ImagensIcon.filtros.filtro9}
                          style={[
                            styles.imgFoda,
                            activeSortButton === "filter27" && {
                              tintColor: "#FFFFFF",
                            },
                          ]}
                        />
                      </TouchableOpacity>

                      <TouchableOpacity
                        style={[
                          styles.tipobotao,
                          activeSortButton === "filter28" && {
                            backgroundColor: "#62B957",
                          },
                        ]}
                        onPress={() => {
                          TypesPokemons();
                          handleSortButtonPress("filter28");
                        }}
                      >
                        <Image
                          source={ImagensIcon.filtros.filtro10}
                          style={[
                            styles.imgFoda,
                            activeSortButton === "filter28" && {
                              tintColor: "#FFFFFF",
                            },
                          ]}
                        />
                      </TouchableOpacity>

                      <TouchableOpacity
                        style={[
                          styles.tipobotao,
                          activeSortButton === "filter29" && {
                            backgroundColor: "#DD7748",
                          },
                        ]}
                        onPress={() => {
                          TypesPokemons();
                          handleSortButtonPress("filter29");
                        }}
                      >
                        <Image
                          source={ImagensIcon.filtros.filtro11}
                          style={[
                            styles.imgFoda,
                            activeSortButton === "filter29" && {
                              tintColor: "#FFFFFF",
                            },
                          ]}
                        />
                      </TouchableOpacity>

                      <TouchableOpacity
                        style={[
                          styles.tipobotao,
                          activeSortButton === "filter30" && {
                            backgroundColor: "#61CEC0",
                          },
                        ]}
                        onPress={() => {
                          TypesPokemons();
                          handleSortButtonPress("filter30");
                        }}
                      >
                        <Image
                          source={ImagensIcon.filtros.filtro12}
                          style={[
                            styles.imgFoda,
                            activeSortButton === "filter30" && {
                              tintColor: "#FFFFFF",
                            },
                          ]}
                        />
                      </TouchableOpacity>

                      <TouchableOpacity
                        style={[
                          styles.tipobotao,
                          activeSortButton === "filter31" && {
                            backgroundColor: "#9DA0AA",
                          },
                        ]}
                        onPress={() => {
                          TypesPokemons();
                          handleSortButtonPress("filter31");
                        }}
                      >
                        <Image
                          source={ImagensIcon.filtros.filtro13}
                          style={[
                            styles.imgFoda,
                            activeSortButton === "filter31" && {
                              tintColor: "#FFFFFF",
                            },
                          ]}
                        />
                      </TouchableOpacity>

                      <TouchableOpacity
                        style={[
                          styles.tipobotao,
                          activeSortButton === "filter32" && {
                            backgroundColor: "#A552CC",
                          },
                        ]}
                        onPress={() => {
                          TypesPokemons();
                          handleSortButtonPress("filter32");
                        }}
                      >
                        <Image
                          source={ImagensIcon.filtros.filtro14}
                          style={[
                            styles.imgFoda,
                            activeSortButton === "filter32" && {
                              tintColor: "#FFFFFF",
                            },
                          ]}
                        />
                      </TouchableOpacity>

                      <TouchableOpacity
                        style={[
                          styles.tipobotao,
                          activeSortButton === "filter33" && {
                            backgroundColor: "#EA5D60",
                          },
                        ]}
                        onPress={() => {
                          TypesPokemons();
                          handleSortButtonPress("filter33");
                        }}
                      >
                        <Image
                          source={ImagensIcon.filtros.filtro15}
                          style={[
                            styles.imgFoda,
                            activeSortButton === "filter33" && {
                              tintColor: "#FFFFFF",
                            },
                          ]}
                        />
                      </TouchableOpacity>

                      <TouchableOpacity
                        style={[
                          styles.tipobotao,
                          activeSortButton === "filter34" && {
                            backgroundColor: "#BAAB82",
                          },
                        ]}
                        onPress={() => {
                          TypesPokemons();
                          handleSortButtonPress("filter34");
                        }}
                      >
                        <Image
                          source={ImagensIcon.filtros.filtro16}
                          style={[
                            styles.imgFoda,
                            activeSortButton === "filter34" && {
                              tintColor: "#FFFFFF",
                            },
                          ]}
                        />
                      </TouchableOpacity>

                      <TouchableOpacity
                        style={[
                          styles.tipobotao,
                          activeSortButton === "filter35" && {
                            backgroundColor: "#417D9A",
                          },
                        ]}
                        onPress={() => {
                          TypesPokemons();
                          handleSortButtonPress("filter35");
                        }}
                      >
                        <Image
                          source={ImagensIcon.filtros.filtro17}
                          style={[
                            styles.imgFoda,
                            activeSortButton === "filter35" && {
                              tintColor: "#FFFFFF",
                            },
                          ]}
                        />
                      </TouchableOpacity>

                      <TouchableOpacity
                        style={[
                          styles.tipobotao,
                          activeSortButton === "filter36" && {
                            backgroundColor: "#4A90DA",
                          },
                        ]}
                        onPress={() => {
                          TypesPokemons();
                          handleSortButtonPress("filter36");
                        }}
                      >
                        <Image
                          source={ImagensIcon.filtros.filtro18}
                          style={[
                            styles.imgFoda,
                            activeSortButton === "filter36" && {
                              tintColor: "#FFFFFF",
                            },
                          ]}
                        />
                      </TouchableOpacity>
                    </View>

                    <Text style={styles.filtroText1}>Heights</Text>
                    <View style={styles.nem}>
                      <TouchableOpacity
                        style={[
                          styles.tipobotao,
                          activeSortButton === "filter37" && {
                            backgroundColor: "#FFC5E6",
                          },
                        ]}
                        onPress={() => {
                          TypesPokemons();
                          handleSortButtonPress("filter37");
                        }}
                      >
                        <Image
                          source={ImagensIcon.filtros.filtro19}
                          style={[
                            styles.imgFoda,
                            activeSortButton === "filter37" && {
                              tintColor: "#FFFFFF",
                            },
                          ]}
                        />
                      </TouchableOpacity>

                      <TouchableOpacity
                        style={[
                          styles.tipobotao,
                          activeSortButton === "filter38" && {
                            backgroundColor: "#AEBFD7",
                          },
                        ]}
                        onPress={() => {
                          TypesPokemons();
                          handleSortButtonPress("filter38");
                        }}
                      >
                        <Image
                          source={ImagensIcon.filtros.filtro20}
                          style={[
                            styles.imgFoda,
                            activeSortButton === "filter38" && {
                              tintColor: "#FFFFFF",
                            },
                          ]}
                        />
                      </TouchableOpacity>

                      <TouchableOpacity
                        style={[
                          styles.tipobotao,
                          activeSortButton === "filter39" && {
                            backgroundColor: "#AAACB8",
                          },
                        ]}
                        onPress={() => {
                          TypesPokemons();
                          handleSortButtonPress("filter39");
                        }}
                      >
                        <Image
                          source={ImagensIcon.filtros.filtro21}
                          style={[
                            styles.imgFoda,
                            activeSortButton === "filter39" && {
                              tintColor: "#FFFFFF",
                            },
                          ]}
                        />
                      </TouchableOpacity>
                    </View>

                    <Text style={styles.filtroText1}>Weights</Text>
                    <View style={styles.nem}>
                      <TouchableOpacity
                        style={[
                          styles.tipobotao,
                          activeSortButton === "filter40" && {
                            backgroundColor: "#99CD7C",
                          },
                        ]}
                        onPress={() => {
                          TypesPokemons();
                          handleSortButtonPress("filter40");
                        }}
                      >
                        <Image
                          source={ImagensIcon.filtros.filtro22}
                          style={[
                            styles.imgFoda,
                            activeSortButton === "filter40" && {
                              tintColor: "#FFFFFF",
                            },
                          ]}
                        />
                      </TouchableOpacity>

                      <TouchableOpacity
                        style={[
                          styles.tipobotao,
                          activeSortButton === "filter41" && {
                            backgroundColor: "#57B2DC",
                          },
                        ]}
                        onPress={() => {
                          TypesPokemons();
                          handleSortButtonPress("filter41");
                        }}
                      >
                        <Image
                          source={ImagensIcon.filtros.filtro23}
                          style={[
                            styles.imgFoda,
                            activeSortButton === "filter41" && {
                              tintColor: "#FFFFFF",
                            },
                          ]}
                        />
                      </TouchableOpacity>

                      <TouchableOpacity
                        style={[
                          styles.tipobotao,
                          activeSortButton === "filter42" && {
                            backgroundColor: "#5A92A5",
                          },
                        ]}
                        onPress={() => {
                          TypesPokemons();
                          handleSortButtonPress("filter42");
                        }}
                      >
                        <Image
                          source={ImagensIcon.filtros.filtro24}
                          style={[
                            styles.imgFoda,
                            activeSortButton === "filter42" && {
                              tintColor: "#FFFFFF",
                            },
                          ]}
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
                      <TouchableOpacity
                        style={[
                          styles.btnFilters,
                          activeSortButton === "reseti" && {
                            backgroundColor: "#EA5D60",
                          },
                        ]}
                        onPress={() => {
                          Reset();
                          handleSortButtonPress("reseti");
                        }}
                      >
                        <Text
                          style={[
                            styles.textSs,
                            activeSortButton === "reseti" && {
                              color: "white",
                            },
                          ]}
                        >
                          Reset
                        </Text>
                      </TouchableOpacity>

                      <TouchableOpacity
                        style={[
                          styles.btnFilters,
                          activeSortButton === "apli" && {
                            backgroundColor: "#EA5D60",
                          },
                        ]}
                        onPress={() => {
                          Apply();
                          handleSortButtonPress("apli");
                        }}
                      >
                        <Text
                          style={[
                            styles.textSs,
                            activeSortButton === "apli" && {
                              color: "white",
                            },
                          ]}
                        >
                          Apply
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              </ScrollView>
            </View>
          </Modal>

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
