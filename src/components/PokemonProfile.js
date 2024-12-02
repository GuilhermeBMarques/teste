import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Modal,
} from "react-native";
import { TextCor } from "../utils/TextCor";
import { CardCor } from "../utils/CardCor";
import { DistintivoCor } from "../utils/DistintivoCor";
import styles from "../styles/profileStyles";
import ImagensIcon from "../utils/Imagens.js";

const PokemonProfile = ({ pokemon, onBack }) => {
  const height = pokemon.height / 10;
  const weight = pokemon.weight / 10;
  const polegadas = (pokemon.height / 10) * 39.37;
  const pes = Math.floor(polegadas / 12);
  const polegadasRestantes = Math.round(polegadas % 12);
  const ibs = weight * 2.20462;
  const [catchRate, setCatchRate] = useState(null);
  const [weaknesses, setWeaknesses] = useState([]);
  const [genderRatio, setGenderRatio] = useState({ male: 0, female: 0 });
  const [eggGroups, setEggGroups] = useState([]);
  const [eggCycles, setEggCycles] = useState(null);
  const [hatchSteps, setHatchSteps] = useState("");
  const [activeButton, setActiveButton] = useState("about");
  const [genus, setGenus] = useState("");
  const [stats, setStats] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch species data once, to avoid multiple calls to the same URL
        const speciesResponse = await fetch(pokemon.species.url);
        const speciesData = await speciesResponse.json();

        // Genus
        const genusEntry = speciesData.genera.find(
          (entry) => entry.language.name === "en"
        );
        setGenus(genusEntry.genus);

        // Catch Rate
        setCatchRate(speciesData.capture_rate);

        // Breeding Info (Gender Ratio, Egg Groups, Egg Cycles)
        const genderMale =
          speciesData.gender_rate >= 0
            ? (speciesData.gender_rate / 8) * 100
            : 0;
        const genderFemale = 100 - genderMale;
        setGenderRatio({ male: genderMale, female: genderFemale });
        setEggGroups(speciesData.egg_groups.map((group) => group.name));
        setEggCycles(speciesData.hatch_counter);

        // Egg Steps
        const hatchCounter = speciesData.hatch_counter;
        const stepsMin = hatchCounter * 245 - 16;
        const stepsMax = (hatchCounter + 1) * 245 - 5;
        setHatchSteps(
          `${stepsMin.toLocaleString()} - ${stepsMax.toLocaleString()} steps`
        );

        // Weaknesses (types)
        const weaknessesSet = new Set();
        for (const typeInfo of pokemon.types) {
          const typeResponse = await fetch(typeInfo.type.url);
          const typeData = await typeResponse.json();
          typeData.damage_relations.double_damage_from.forEach((weakType) => {
            weaknessesSet.add(weakType.name);
          });
        }
        setWeaknesses([...weaknessesSet]);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [pokemon.species.url, pokemon.types]);

  const handleButtonPress = (button) => {
    setActiveButton(activeButton === button ? null : button);
  };

  useEffect(() => {
    const fetchStats = () => {
      const statsData = pokemon.stats.map((stat) => ({
        name: stat.stat.name,
        base: stat.base_stat,
      }));
      setStats(statsData);
    };

    fetchStats();
  }, [pokemon]);

  const calculateStatRange = (baseStat, statName) => {
    const normal = {
      hp: baseStat,
      attack: baseStat,
      defense: baseStat,
      "special-attack": baseStat,
      "special-defense": baseStat,
      speed: baseStat,
    };

    const min = {
      hp: baseStat + 155,
      attack: baseStat + 43,
      defense: baseStat + 43,
      "special-attack": baseStat + 56,
      "special-defense": baseStat + 56,
      speed: baseStat + 40,
    };

    const max = {
      hp: baseStat + 249,
      attack: baseStat + 167,
      defense: baseStat + 167,
      "special-attack": baseStat + 186,
      "special-defense": baseStat + 186,
      speed: baseStat + 162,
    };
    return [normal[statName], min[statName], max[statName]];
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

  const [modalAbout, setModalAbout] = useState(true);
  const [modalStats, setModalStats] = useState(false);
  const [modalEvolution, setModalEvolution] = useState(false);

  const openAbout = () => {
    setModalAbout(true);
    setModalEvolution(false);
    setModalStats(false);
  };

  const openStats = () => {
    setModalStats(true);
    setModalEvolution(false);
    setModalAbout(false);
  };

  const openEvolution = () => {
    setModalEvolution(true);
    setModalStats(false);
    setModalAbout(false);
  };

  return (
    <View
      style={[
        styles.card,
        { backgroundColor: CardCor(pokemon.types[0].type.name) },
      ]}
    >
      <View style={styles.containerPai}>
        <View style={styles.containerImg}>
          <Image
            source={{ uri: pokemon.sprites.front_default }}
            style={styles.pokemonImagem}
          />
        </View>

        <View style={styles.containerText}>
          <Text style={styles.pokemonId}>
            #{pokemon.id.toString().padStart(3, "0")}
          </Text>

          <Text style={styles.pokemonNome}>
            {pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}
          </Text>

          <View style={styles.ContainerTipos}>
            {pokemon.types.map((typeInfo) => (
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
      </View>

      {/* Modal About */}
      <Modal visible={modalAbout} animationType="slide" transparent={true}>
        <View style={styles.ww}>
          <View style={styles.btnVoltar}>
            <TouchableOpacity onPress={onBack}>
              <Image source={ImagensIcon.icons.exit} style={styles.exitImage} />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.btnContainer}>
          {/* About */}

          <TouchableOpacity style={styles.button} onPress={openAbout}>
            <Text style={styles.btnText}>About</Text>
            <Image source={ImagensIcon.icons.sla} style={styles.pokeboll} />
          </TouchableOpacity>

          {/* Stats */}
          <TouchableOpacity style={styles.button} onPress={openStats}>
            <Text style={styles.btnText}>Stats</Text>
            <Image source={ImagensIcon.icons.sla} style={styles.pokebollInvi} />
          </TouchableOpacity>

          {/* Evolution */}
          <TouchableOpacity style={styles.button} onPress={openEvolution}>
            <Text style={styles.btnText}>Evolution</Text>
            <Image source={ImagensIcon.icons.sla} style={styles.pokebollInvi} />
          </TouchableOpacity>
        </View>

        <View style={styles.descricaoPokemon}>
          {/* Pokédex Data */}
          <Text
            style={[
              styles.textVerde,
              { color: TextCor(pokemon.types[0].type.name) },
            ]}
          >
            Pokédex Data
          </Text>

          {/* Species */}
          <Text style={styles.textInfo1}>
            Species <Text style={styles.textInfo2}>{genus}</Text>
          </Text>

          {/* Height */}
          <Text style={styles.textInfo1}>
            Height{" "}
            <Text style={styles.textInfo2}>
              {height.toFixed(1)}m{" "}
              <Text style={styles.smallText}>
                ({pes}′{polegadasRestantes}″)
              </Text>
            </Text>
          </Text>

          {/* Weight */}
          <Text style={styles.textInfo1}>
            Weight{" "}
            <Text style={styles.textInfo2}>
              {weight.toFixed(1)}kg{" "}
              <Text style={styles.smallText}>({ibs.toFixed(1)} lbs) </Text>{" "}
            </Text>
          </Text>

          {/* Abilities */}
          <View style={styles.mesmaLinha}>
            <Text style={styles.textInfo1}>
              Abilities <Text style={styles.textInfo2}>1.</Text>
            </Text>
            <View style={styles.abilitiesContainer}>
              {pokemon.abilities.map((ability, index) => (
                <Text key={ability.ability.name} style={styles.textInfo2}>
                  {`${
                    ability.ability.name.charAt(0).toUpperCase() +
                    ability.ability.name.slice(1)
                  }${ability.is_hidden ? " (hidden ability)" : ""}`}
                  {index === 0 && <Text>{", "}</Text>}
                </Text>
              ))}
            </View>
          </View>

          {/* Weaknesses */}
          <View style={[styles.mesmaLinha, { alignItems: "center" }]}>
            <Text style={styles.textInfo1}>Weaknesses </Text>
            {weaknesses.length > 0 ? (
              <View style={styles.weaknessesContainer}>
                {weaknesses.map((weakType) => (
                  <View
                    key={weakType}
                    style={[
                      styles.pokemonTipoooo,
                      { backgroundColor: DistintivoCor(weakType) },
                    ]}
                  >
                    <Image
                      source={IconCor(weakType)}
                      style={styles.pokemonTipoIcone}
                    />
                  </View>
                ))}
              </View>
            ) : (
              <Text style={styles.textInfo2}>Loading...</Text>
            )}
          </View>

          {/* Training */}
          <Text
            style={[
              styles.textVerde,
              { color: TextCor(pokemon.types[0].type.name) },
            ]}
          >
            Training
          </Text>

          {/* EV Yield */}
          <Text style={styles.textInfo1}>
            EV Yield <Text style={styles.textInfo2}>{}No EV Yield Data</Text>
          </Text>

          {/* Catch Rate */}
          <Text style={styles.textInfo1}>
            Catch Rate{" "}
            <Text style={styles.textInfo2}>
              {catchRate}{" "}
              <Text style={styles.smallText}>
                {catchRate !== null
                  ? `(${((catchRate / 760) * 100).toFixed(
                      1
                    )}% with PokéBall, full HP)`
                  : ""}
              </Text>
            </Text>
          </Text>

          {/* Base Friendship */}
          <Text style={styles.textInfo1}>
            Base Friendship{" "}
            <Text style={styles.textInfo2}>
              70 <Text style={styles.smallText}>(normal)</Text>
            </Text>
          </Text>

          {/* Base Exp */}
          <Text style={styles.textInfo1}>
            Base Exp{" "}
            <Text style={styles.textInfo2}>{pokemon.base_experience}</Text>
          </Text>

          {/* Growth Rate */}
          <Text style={styles.textInfo1}>
            Growth Rate <Text style={styles.textInfo2}>Medium Slow </Text>
          </Text>

          {/* Breeding */}
          <Text
            style={[
              styles.textVerde,
              { color: TextCor(pokemon.types[0].type.name) },
            ]}
          >
            Breeding
          </Text>

          {/* Gender */}
          <Text style={styles.textInfo1}>
            Gender{" "}
            <Text style={styles.textInfo2}>
              <Text style={{ color: "#588fd8" }}>♂ {genderRatio.male}%</Text>,{" "}
              <Text style={{ color: "#ed6ec7" }}>♀ {genderRatio.female}%</Text>
            </Text>
          </Text>

          {/* Egg Groups */}
          <Text style={styles.textInfo1}>
            Egg Groups{" "}
            <Text style={styles.textInfo2}>{eggGroups.join(", ")}</Text>
          </Text>

          {/* Egg Cycles */}
          <Text style={styles.textInfo1}>
            Egg Cycles{" "}
            <Text
              style={styles.textInfo2}
            >{`${eggCycles} (${hatchSteps})`}</Text>
          </Text>

          {/* Location */}
          <Text
            style={[
              styles.textVerde,
              { color: TextCor(pokemon.types[0].type.name) },
            ]}
          >
            Location
          </Text>

          {/* Red/Blue/Yellow */}
          <Text style={styles.textInfo1}>
            {pokemon.id.toString().padStart(3, "0")}{" "}
            <Text style={styles.textInfo2}>(Red/Blue/Yellow)</Text>
          </Text>

          {/* Gold/Silver/Crystal */}
          <Text style={styles.textInfo1}>
            {`${pokemon.id + 225}`}{" "}
            <Text style={styles.textInfo2}>{`(Gold/Silver/Crystal)`} </Text>
          </Text>

          {/* FireRed/LeafGreen */}
          <Text style={styles.textInfo1}>
            {pokemon.id.toString().padStart(3, "0")}{" "}
            <Text style={styles.textInfo2}>(FireRed/LeafGreen)</Text>
          </Text>

          {/* HeartGold/SoulSilver */}
          <Text style={styles.textInfo1}>
            {`${pokemon.id + 230}`}{" "}
            <Text style={styles.textInfo2}>(HeartGold/SoulSilver)</Text>
          </Text>

          {/* X/Y - Central Kalos */}
          <Text style={styles.textInfo1}>
            {`${(pokemon.id + 79).toString().padStart(3, "0")}`}{" "}
            <Text style={styles.textInfo2}>{`(X/Y - Central Kalos)`} </Text>
          </Text>

          {/* Let's Go Pikachu/Let's Go Eevee */}
          <Text style={styles.textInfo1}>
            {pokemon.id.toString().padStart(3, "0")}{" "}
            <Text style={styles.textInfo2}>
              (Let's Go Pikachu/Let's Go Eevee)
            </Text>
          </Text>
        </View>
      </Modal>

      {/* Modal Stats */}
      <Modal visible={modalStats} animationType="slide" transparent={true}>
        <View style={styles.ww}>
          <View style={styles.btnVoltar}>
            <TouchableOpacity onPress={onBack}>
              <Image source={ImagensIcon.icons.exit} style={styles.exitImage} />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.btnContainer}>
          {/* About */}

          <TouchableOpacity style={styles.button} onPress={openAbout}>
            <Text style={styles.btnText}>About</Text>
            <Image source={ImagensIcon.icons.sla} style={styles.pokebollInvi} />
          </TouchableOpacity>

          {/* Stats */}
          <TouchableOpacity style={styles.button} onPress={openStats}>
            <Text style={styles.btnText}>Stats</Text>
            <Image source={ImagensIcon.icons.sla} style={styles.pokeboll} />
          </TouchableOpacity>

          {/* Evolution */}
          <TouchableOpacity style={styles.button} onPress={openEvolution}>
            <Text style={styles.btnText}>Evolution</Text>
            <Image source={ImagensIcon.icons.sla} style={styles.pokebollInvi} />
          </TouchableOpacity>
        </View>

        <View style={styles.descricaoPokemon}>
          {/* Base Stats */}
          <Text
            style={[
              styles.textVerde,
              { color: TextCor(pokemon.types[0].type.name) },
            ]}
          >
            Base Stats
          </Text>

          {/* Hp */}
          <View
            style={[
              styles.statSection,
              { flexDirection: "row", alignItems: "center" },
            ]}
          >
            <Text style={styles.textInfo1}>Hp{"              "}</Text>
            {stats
              .filter((stat) => stat.name === "hp") // Filtra para pegar apenas o HP
              .map((stat, index) => {
                const [normal, min, max] = calculateStatRange(
                  stat.base,
                  stat.name
                );

                // Calcula a largura da barra com base no valor normal em relação ao valor máximo
                const barWidth = (normal / max) * 200;

                return (
                  <View key={index} style={styles.statBarContainer}>
                    <Text style={styles.textInfo2}>
                      {normal}
                      {"         "}
                    </Text>
                    <View style={styles.statBar}>
                      <View
                        style={[styles.statBarFill, {width: `${barWidth}%`}, { backgroundColor: CardCor(pokemon.types[0].type.name) }]}
                      />
                    </View>
                    <Text style={styles.textInfo2}>
                    {"         "}
                    {min} {"         "} {max}
                    </Text>
                  </View>
                );
              })}
          </View>

          {/* Attack */}
          <View
            style={[
              styles.statSection,
              { flexDirection: "row", alignItems: "center" },
            ]}
          >
            <Text style={styles.textInfo1}>Attack{"        "}</Text>
            {stats
              .filter((stat) => stat.name === "attack") // Filtra para pegar apenas o HP
              .map((stat, index) => {
                const [normal, min, max] = calculateStatRange(
                  stat.base,
                  stat.name
                );

                // Calcula a largura da barra com base no valor normal em relação ao valor máximo
                const barWidth = (normal / max) * 200;

                return (
                  <View key={index} style={styles.statBarContainer}>
                    <Text style={styles.textInfo2}>
                      {normal}
                      {"         "}
                    </Text>
                    <View style={styles.statBar}>
                      <View
                        style={[styles.statBarFill, {width: `${barWidth}%`}, { backgroundColor: CardCor(pokemon.types[0].type.name) }]}
                      />
                    </View>
                    <Text style={styles.textInfo2}>
                    {"           "}
                    {min} {"         "} {max}
                    </Text>
                  </View>
                );
              })}
          </View>

          {/* Defense */}
          <View
            style={[
              styles.statSection,
              { flexDirection: "row", alignItems: "center" },
            ]}
          >
            <Text style={styles.textInfo1}>Defense{"     "}</Text>
            {stats
              .filter((stat) => stat.name === "defense") // Filtra para pegar apenas o HP
              .map((stat, index) => {
                const [normal, min, max] = calculateStatRange(
                  stat.base,
                  stat.name
                );

                // Calcula a largura da barra com base no valor normal em relação ao valor máximo
                const barWidth = (normal / max) * 200;

                return (
                  <View key={index} style={styles.statBarContainer}>
                    <Text style={styles.textInfo2}>
                      {normal}
                      {"         "}
                    </Text>
                    <View style={styles.statBar}>
                      <View
                        style={[styles.statBarFill, {width: `${barWidth}%`}, { backgroundColor: CardCor(pokemon.types[0].type.name) }]}
                      />
                    </View>
                    <Text style={styles.textInfo2}>
                    {"           "}
                    {min} {"         "} {max}
                    </Text>
                  </View>
                );
              })}
          </View>

          {/* Sp. Attack */}
          <View
            style={[
              styles.statSection,
              { flexDirection: "row", alignItems: "center" },
            ]}
          >
            <Text style={styles.textInfo1}>Sp. atk{"        "}</Text>
            {stats
              .filter((stat) => stat.name === "special-attack") // Filtra para pegar apenas o HP
              .map((stat, index) => {
                const [normal, min, max] = calculateStatRange(
                  stat.base,
                  stat.name
                );

                // Calcula a largura da barra com base no valor normal em relação ao valor máximo
                const barWidth = (normal / max) * 200;

                return (
                  <View key={index} style={styles.statBarContainer}>
                    <Text style={styles.textInfo2}>
                      {normal}
                      {"         "}
                    </Text>
                    <View style={styles.statBar}>
                      <View
                        style={[styles.statBarFill, {width: `${barWidth}%`}, { backgroundColor: CardCor(pokemon.types[0].type.name) }]}
                      />
                    </View>
                    <Text style={styles.textInfo2}>
                    {"         "}
                    {min} {"         "} {max}
                    </Text>
                  </View>
                );
              })}
          </View>

          {/* Sp. Defense */}
          <View
            style={[
              styles.statSection,
              { flexDirection: "row", alignItems: "center" },
            ]}
          >
            <Text style={styles.textInfo1}>Sp. Def{"        "}</Text>
            {stats
              .filter((stat) => stat.name === "special-defense") // Filtra para pegar apenas o HP
              .map((stat, index) => {
                const [normal, min, max] = calculateStatRange(
                  stat.base,
                  stat.name
                );

                // Calcula a largura da barra com base no valor normal em relação ao valor máximo
                const barWidth = (normal / max) * 200;

                return (
                  <View key={index} style={styles.statBarContainer}>
                    <Text style={styles.textInfo2}>
                      {normal}
                      {"         "}
                    </Text>
                    <View style={styles.statBar}>
                      <View
                        style={[styles.statBarFill, {width: `${barWidth}%`}, { backgroundColor: CardCor(pokemon.types[0].type.name) }]}
                      />
                    </View>
                    <Text style={styles.textInfo2}>
                    {"         "}
                    {min} {"         "} {max}
                    </Text>
                  </View>
                );
              })}
          </View>

          {/* Speed */}
          <View
            style={[
              styles.statSection,
              { flexDirection: "row", alignItems: "center" },
            ]}
          >
            <Text style={styles.textInfo1}>Speed{"          "}</Text>
            {stats
              .filter((stat) => stat.name === "speed") // Filtra para pegar apenas o HP
              .map((stat, index) => {
                const [normal, min, max] = calculateStatRange(
                  stat.base,
                  stat.name
                );

                // Calcula a largura da barra com base no valor normal em relação ao valor máximo
                const barWidth = (normal / max) * 200;

                return (
                  <View key={index} style={styles.statBarContainer}>
                    <Text style={styles.textInfo2}>
                      {normal}
                      {"         "}
                    </Text>
                    <View style={styles.statBar}>
                      <View
                        style={[styles.statBarFill, {width: `${barWidth}%`}, { backgroundColor: CardCor(pokemon.types[0].type.name) }]}
                      />
                    </View>
                    <Text style={styles.textInfo2}>
                    {"           "}
                    {min} {"         "} {max}
                    </Text>
                  </View>
                );
              })}
          </View>

          {/* Total */}
          <View
            style={[
              styles.statSection,
              { flexDirection: "row", alignItems: "center" },
            ]}
          >
            <Text style={styles.textInfo1}>Total{"            "}</Text>
            <Text style={styles.textInfo2}>
              {stats.reduce((total, stat) => {
                const [normal] = calculateStatRange(stat.base, stat.name);
                return total + normal;
              }, 0)}
              <Text>
                {"                                                   "}Min
                {"         "} Max
              </Text>
            </Text>
          </View>

          <Text style={styles.textInfo2}>
            The ranges shown on the right are for a level 200 Pokémon. Maximum
            values are based on a beneficial nature, 252 EVs, 31 IVs; minimum
            values are based on a hindering nature, 0 EVs, 0 IVs.
          </Text>

          <Text
            style={[
              styles.textVerde,
              { color: TextCor(pokemon.types[0].type.name) },
            ]}
          >
            Type Defenses
          </Text>
          <Text style={styles.textInfo1}>
            The effectiveness of each type on{" "}
            {pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}.
          </Text>
        </View>
      </Modal>

      {/* Modal Evolution */}
      <Modal visible={modalEvolution} animationType="slide" transparent={true}>
        <View style={styles.ww}>
          <View style={styles.btnVoltar}>
            <TouchableOpacity onPress={onBack}>
              <Image source={ImagensIcon.icons.exit} style={styles.exitImage} />
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.btnContainer}>
          {/* About */}

          <TouchableOpacity style={styles.button} onPress={openAbout}>
            <Text style={styles.btnText}>About</Text>
            <Image source={ImagensIcon.icons.sla} style={styles.pokebollInvi} />
          </TouchableOpacity>

          {/* Stats */}
          <TouchableOpacity style={styles.button} onPress={openStats}>
            <Text style={styles.btnText}>Stats</Text>
            <Image source={ImagensIcon.icons.sla} style={styles.pokebollInvi} />
          </TouchableOpacity>

          {/* Evolution */}
          <TouchableOpacity style={styles.button} onPress={openEvolution}>
            <Text style={styles.btnText}>Evolution</Text>
            <Image source={ImagensIcon.icons.sla} style={styles.pokeboll} />
          </TouchableOpacity>
        </View>
        <View style={styles.descricaoPokemon}>
          <Text
            style={[
              styles.textVerde,
              { color: TextCor(pokemon.types[0].type.name) },
            ]}
          >
            Evolution Chart
          </Text>
          <View style={styles.evolutionsContainer}>
            {pokemon.evolutions && pokemon.evolutions.length > 0 ? (
              <View style={styles.evolutionList}>
                {pokemon.evolutions.map((evolution, index) => (
                  <View key={index} style={styles.evolutionItem}>
                    <View style={styles.evolutionImageContainer}>
                      <Image
                        source={{ uri: evolution.image }}
                        style={styles.evolutionImage}
                      />
                    </View>

                    <Text style={styles.evolutionText}>{evolution.name}</Text>
                  </View>
                ))}
              </View>
            ) : (
              <Text style={styles.evolutionText}>
                Nenhuma evolução disponível
              </Text>
            )}
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default PokemonProfile;
