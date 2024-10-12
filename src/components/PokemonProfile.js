import React, { useState } from "react";
import { View, Text, Image, TouchableOpacity, ScrollView } from "react-native";
import { TextCor } from "../utils/TextCor";
import { CardCor } from "../utils/CardCor";
import { DistintivoCor } from "../utils/DistintivoCor";
import ImagensIcon from "../utils/Imagens.js";
import styles from "../styles/profileStyles.js";

const PokemonProfile = ({ pokemon, onBack }) => {
  const height = pokemon.height / 10;
  const weight = pokemon.weight / 10;
  const polegadas = (pokemon.height / 10) * 39.37;
  const pes = Math.floor(polegadas / 12);
  const polegadasRestantes = Math.round(polegadas % 12);
  const ibs = weight * 2.20462;

  const [activeButton, setActiveButton] = useState("about");

  const handleButtonPress = (button) => {
    setActiveButton(activeButton === button ? null : button);
  };

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
    <View
      style={[
        styles.profileCard,
        { backgroundColor: CardCor(pokemon.types[0].type.name) },
      ]}
    >
      <View style={styles.backButtonContainer}>
        <TouchableOpacity onPress={onBack}>
          <Image
            source={ImagensIcon.icons.exit}
            style={styles.backButtonImage}
          />
        </TouchableOpacity>
      </View>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.mainContainer}>
          <View style={styles.imageContainer}>
            <Image
              source={{ uri: pokemon.sprites.front_default }}
              style={styles.pokemonImage}
            />
          </View>

          <View style={styles.textContainer}>
            <Text style={styles.pokemonIdText}>
              #{pokemon.id.toString().padStart(3, "0")}
            </Text>

            <Text style={styles.pokemonNameText}>
              {pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}
            </Text>

            <View style={styles.typeContainer}>
              {pokemon.types.map((typeInfo) => (
                <View
                  key={typeInfo.type.name}
                  style={[
                    styles.typeBadge,
                    { backgroundColor: DistintivoCor(typeInfo.type.name) },
                  ]}
                >
                  <Image
                    source={IconCor(typeInfo.type.name)}
                    style={styles.typeIcon}
                  />
                  <Text style={styles.typeText}>{typeInfo.type.name}</Text>
                </View>
              ))}
            </View>
          </View>
        </View>

        <View style={styles.buttonGroupContainer}>
          <TouchableOpacity
            onPress={() => handleButtonPress("about")}
            style={styles.actionButton}
          >
            <Text style={styles.actionButtonText}>About</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => handleButtonPress("stats")}
            style={styles.actionButton}
          >
            <Text style={styles.actionButtonText}>Stats</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => handleButtonPress("evolution")}
            style={styles.actionButton}
          >
            <Text style={styles.actionButtonText}>Evolution</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.detailsContainer}>
          {activeButton === "about" && (
            <>
              <Text style={styles.infoText}>
                Descrição do pokemon não é parte do código
              </Text>
              <Text
                style={[
                  styles.infoText,
                  { color: TextCor(pokemon.types[0].type.name) },
                ]}
              >
                Pokédex Data
              </Text>
              <Text style={styles.infoText}>Species: </Text>
              <Text style={styles.infoText}>
                Height:{" "}
                <Text style={styles.subtleText}>
                  {height.toFixed(1)} m{" "}
                  <Text style={styles.smallText}>
                    ({pes}′{polegadasRestantes}″)
                  </Text>
                </Text>
              </Text>
              <Text style={styles.infoText}>
                Weight:{" "}
                <Text style={styles.subtleText}>
                  {weight.toFixed(1)} kg{" "}
                  <Text style={styles.smallText}>({ibs.toFixed(1)} lbs)</Text>
                </Text>
              </Text>
              <View style={styles.rowLayout}>
                <Text style={styles.infoText}>Abilities: </Text>
                <View style={styles.abilitiesRow}>
                  {pokemon.abilities.map((ability, index) => (
                    <Text key={ability.ability.name} style={styles.subtleText}>
                      {`${
                        ability.ability.name.charAt(0).toUpperCase() +
                        ability.ability.name.slice(1)
                      }${ability.is_hidden ? " (hidden ability)" : ""}`}
                      {index === 0 && <Text>{", "}</Text>}
                    </Text>
                  ))}
                </View>
              </View>

              <Text style={styles.infoText}>Weaknesses:</Text>
              <Text
                style={[
                  styles.infoText,
                  { color: TextCor(pokemon.types[0].type.name) },
                ]}
              >
                Training
              </Text>
              <Text style={styles.infoText}>EV Yield: </Text>
              <Text style={styles.infoText}>
                Catch Rate:{" "}
                <Text style={styles.subtleText}>
                  45{" "}
                  <Text style={styles.smallText}>
                    (5.9% with PokéBall, full HP)
                  </Text>
                </Text>
              </Text>
              <Text style={styles.infoText}>
                Base Friendship: <Text style={styles.subtleText}>70 </Text>
                <Text style={styles.smallText}>(normal)</Text>
              </Text>
              <Text style={styles.infoText}>
                Base Exp:{" "}
                <Text style={styles.subtleText}>{pokemon.base_experience}</Text>
              </Text>
              <Text style={styles.infoText}>
                Growth Rate: <Text style={styles.subtleText}>Medium Slow </Text>
              </Text>
              <Text
                style={[
                  styles.infoText,
                  { color: TextCor(pokemon.types[0].type.name) },
                ]}
              >
                Breeding
              </Text>
              <Text style={styles.infoText}>Gender: </Text>
              <Text style={styles.infoText}>Egg Groups: </Text>
              <Text style={styles.infoText}>Egg Cycles: </Text>
              <Text
                style={[
                  styles.infoText,
                  { color: TextCor(pokemon.types[0].type.name) },
                ]}
              >
                Location
              </Text>
            </>
          )}

          {activeButton === "stats" && (
            <>
              <Text
                style={[
                  styles.infoText,
                  { color: TextCor(pokemon.types[0].type.name) },
                ]}
              >
                Base Stats
              </Text>
              {pokemon.stats.map((statInfo) => (
                <Text style={styles.infoText} key={statInfo.stat.name}>
                  {`${
                    statInfo.stat.name.charAt(0).toUpperCase() +
                    statInfo.stat.name.slice(1)
                  }: ${statInfo.base_stat}`}
                </Text>
              ))}
              <Text
                style={[
                  styles.infoText,
                  { color: TextCor(pokemon.types[0].type.name) },
                ]}
              >
                Type Defenses
              </Text>
              <Text style={styles.infoText}>
                The effectiveness of each type on{" "}
                {pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}.
              </Text>
            </>
          )}

          {activeButton === "evolution" && (
            <>
              <Text
                style={[
                  styles.infoText,
                  { color: TextCor(pokemon.types[0].type.name) },
                ]}
              >
                Evolution Chart
              </Text>
              <View style={styles.evolutionSection}>
                {pokemon.evolutions && pokemon.evolutions.length > 0 ? (
                  <View style={styles.evolutionList}>
                    {pokemon.evolutions.map((evolution, index) => (
                      <View key={index} style={styles.evolutionItemContainer}>
                        <Image
                          source={{ uri: evolution.image }}
                          style={styles.evolutionImage}
                        />
                        <Text style={styles.evolutionNameText}>
                          {evolution.name}
                        </Text>
                      </View>
                    ))}
                  </View>
                ) : (
                  <Text style={styles.evolutionNameText}>
                    Nenhuma evolução disponível
                  </Text>
                )}
              </View>
            </>
          )}
        </View>
      </ScrollView>
    </View>
  );
};

export default PokemonProfile;
