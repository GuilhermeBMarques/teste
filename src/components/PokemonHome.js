import React, { useEffect, useState } from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import axios from "axios";
import { CardCor } from "../utils/CardCor";
import { DistintivoCor } from "../utils/DistintivoCor";
import styles from "../styles/pokemonCardStyles.js";
import ImagensIcon from "../utils/Imagens.js";

const PokemonHome = ({ item, onSelect }) => {
  const [details, setDetails] = useState(null);
  const [list, setList] = useState([]);
  const [nextUrl, setNextUrl] = useState(
    "https://pokeapi.co/api/v2/pokemon?limit=20"
  );
  const [selectedPokemon, setSelectedPokemon] = useState(null);

  useEffect(() => {
    fetchPokemon();
  }, []);

  const fetchPokemon = () => {
    axios
      .get(nextUrl)
      .then((response) => {
        setList((prevList) => [...prevList, ...response.data.results]);
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

  useEffect(() => {
    axios
      .get(item.url)
      .then((response) => setDetails(response.data))
      .catch((error) => console.error(error));
  }, [item.url]);

  if (!details) {
    return <Text>Carregando...</Text>;
  }

  const IconCor = (type) => {
    switch (type) {
      case "bug":
        return ImagensIcon.elementos.bug;
      case "dark":
        return ImagensIcon.elementos.dark;
      case "dragon":
        return ImagensIcon.elementos.dragon;
      case "electric":
        return ImagensIcon.elementos.electric;
      case "fairy":
        return ImagensIcon.elementos.fairy;
      case "fighting":
        return ImagensIcon.elementos.fighting;
      case "fire":
        return ImagensIcon.elementos.fire;
      case "flying":
        return ImagensIcon.elementos.flying;
      case "ghost":
        return ImagensIcon.elementos.ghost;
      case "grass":
        return ImagensIcon.elementos.grass;
      case "ground":
        return ImagensIcon.elementos.ground;
      case "ice":
        return ImagensIcon.elementos.ice;
      case "normal":
        return ImagensIcon.elementos.normal;
      case "poison":
        return ImagensIcon.elementos.poison;
      case "psychic":
        return ImagensIcon.elementos.psychic;
      case "rock":
        return ImagensIcon.elementos.rock;
      case "steel":
        return ImagensIcon.elementos.steel;
      case "water":
        return ImagensIcon.elementos.water;
      default:
        return null;
    }
  };

  return (
    <TouchableOpacity
      onPress={() => onSelect(details)}
      style={[
        styles.card,
        { backgroundColor: CardCor(details.types[0].type.name) },
      ]}
    >
      <View style={styles.cardContent}>
        <Text style={styles.pokemonId}>
          #{details.id.toString().padStart(3, "0")}
        </Text>
        <Text style={styles.pokemonNome}>
          {details.name.charAt(0).toUpperCase() + details.name.slice(1)}
        </Text>

        <View style={styles.ContainerTipos}>
          {details.types.map((typeInfo) => (
            <View
              key={typeInfo.type.name}
              style={[
                styles.pokemonTipo,
                { backgroundColor: DistintivoCor(typeInfo.type.name) },
              ]}
            >
              <Image
                source={IconCor(typeInfo.type.name)}
                style={styles.pokemonTipoIcone}
              />
              <Text style={styles.pokemonTexto}>{typeInfo.type.name}</Text>
            </View>
          ))}
        </View>
      </View>

      <Image
        source={{ uri: details.sprites.front_default }}
        style={styles.pokemonImagem}
      />
      <Image source={ImagensIcon.icons.pattern} style={styles.iconPattern} />
      <Image source={ImagensIcon.icons.pokeboll} style={styles.iconPokeball} />
    </TouchableOpacity>
  );
};

export default PokemonHome;
