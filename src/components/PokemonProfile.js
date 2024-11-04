import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Modal,
} from 'react-native';
import { TextCor } from '../utils/TextCor';
import { CardCor } from '../utils/CardCor';
import { DistintivoCor } from '../utils/DistintivoCor';
import styles from '../styles/profileStyles';
import ImagensIcon from '../utils/Imagens.js';

const PokemonProfile = ({ pokemon, onBack }) => {
  const height = pokemon.height / 10;
  const weight = pokemon.weight / 10;
  const polegadas = (pokemon.height / 10) * 39.37;
  const pes = Math.floor(polegadas / 12);
  const polegadasRestantes = Math.round(polegadas % 12);
  const ibs = weight * 2.20462;
  const total = pokemon.stats.reduce((acc, stat) => acc + stat.base_stat, 0);

  const [activeButton, setActiveButton] = useState('about');

  const handleButtonPress = (button) => {
    setActiveButton(activeButton === button ? null : button);
  };

  const IconCor = (type) => {
    switch (type) {
      case 'bug':
        return ImagensIcon.elementos.bug;
      case 'dark':
        return ImagensIcon.elementos.dark;
      case 'dragon':
        return ImagensIcon.elementos.dragon;
      case 'electric':
        return ImagensIcon.elementos.electric;
      case 'fairy':
        return ImagensIcon.elementos.fairy;
      case 'fighting':
        return ImagensIcon.elementos.fighting;
      case 'fire':
        return ImagensIcon.elementos.fire;
      case 'flying':
        return ImagensIcon.elementos.flying;
      case 'ghost':
        return ImagensIcon.elementos.ghost;
      case 'grass':
        return ImagensIcon.elementos.grass;
      case 'ground':
        return ImagensIcon.elementos.ground;
      case 'ice':
        return ImagensIcon.elementos.ice;
      case 'normal':
        return ImagensIcon.elementos.normal;
      case 'poison':
        return ImagensIcon.elementos.poison;
      case 'psychic':
        return ImagensIcon.elementos.psychic;
      case 'rock':
        return ImagensIcon.elementos.rock;
      case 'steel':
        return ImagensIcon.elementos.steel;
      case 'water':
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
    setModalEvolution(false); // Fecha o outro modal
    setModalStats(false); // Fecha o outro modal
  };

  const openStats = () => {
    setModalStats(true);
    setModalEvolution(false); // Fecha o outro modal
    setModalAbout(false); // Fecha o outro modal
  };

  const openEvolution = () => {
    setModalEvolution(true);
    setModalStats(false); // Fecha o outro modal
    setModalAbout(false); // Fecha o outro modal
  };

  const closeGenerations = () => {
    setModalAbout(false);
  };

  const closeSort = () => {
    setModalStats(false);
  };

  const closeFilter = () => {
    setModalEvolution(false);
  };

  return (
    <View
      style={[
        styles.card,
        { backgroundColor: CardCor(pokemon.types[0].type.name) },
      ]}>
      <View style={styles.containerPai}>
        <View style={styles.containerImg}>
          <Image
            source={{ uri: pokemon.sprites.front_default }}
            style={styles.pokemonImagem}
          />
        </View>

        <View style={styles.containerText}>
          <Text style={styles.pokemonId}>
            #{pokemon.id.toString().padStart(3, '0')}
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
                ]}>
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
        
           <View
      style={[
        styles.card,
        { backgroundColor: CardCor(pokemon.types[0].type.name) },
      ]}>
        <Modal visible={modalAbout} animationType="slide" transparent={true}>
          <View style={styles.ww}>
            <View style={styles.btnVoltar}>
              <TouchableOpacity onPress={onBack}>
                <Image
                  source={ImagensIcon.icons.exit}
                  style={styles.exitImage}
                />
              </TouchableOpacity>
            </View>
          </View>
       
            <View style={styles.btnContainer}>
           
              {/* About */}
              
              <TouchableOpacity style={styles.button} onPress={openAbout}>
                <Text style={styles.btnText}>About</Text>
                  <Image
                  source={ImagensIcon.icons.sla}
                  style={styles.pokeboll}
                />
              </TouchableOpacity>

              {/* Stats */}
              <TouchableOpacity style={styles.button} onPress={openStats}>
                <Text style={styles.btnText}>Stats</Text>
              </TouchableOpacity>

              {/* Evolution */}
              <TouchableOpacity style={styles.button} onPress={openEvolution}>
                <Text style={styles.btnText}>Evolution</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.borrao}>
              <Text style={styles.textInfo1}>
                Descrição do pokemon não é parte do código{' '}
              </Text>
              <Text
                style={[
                  styles.textInfo1,
                  { color: TextCor(pokemon.types[0].type.name) },
                ]}>
                Pokédex Data
              </Text>
              <Text style={styles.textInfo1}>Species: </Text>
              <Text style={styles.textInfo1}>
                Height:{' '}
                <Text style={styles.textInfo2}>
                  {height.toFixed(1)} m{' '}
                  <Text style={styles.smallText}>
                    ({pes}′{polegadasRestantes}″)
                  </Text>
                </Text>
              </Text>
              <Text style={styles.textInfo1}>
                Weight:{' '}
                <Text style={styles.textInfo2}>
                  {weight.toFixed(1)} kg{' '}
                  <Text style={styles.smallText}>({ibs.toFixed(1)} lbs) </Text>{' '}
                </Text>
              </Text>
              <View style={styles.mesmaLinha}>
                <Text style={styles.textInfo1}>Abilities: </Text>
                <View style={styles.abilitiesContainer}>
                  {pokemon.abilities.map((ability, index) => (
                    <Text key={ability.ability.name} style={styles.textInfo2}>
                      {`${
                        ability.ability.name.charAt(0).toUpperCase() +
                        ability.ability.name.slice(1)
                      }${ability.is_hidden ? ' (hidden ability)' : ''}`}
                      {index === 0 && <Text>{', '}</Text>}
                    </Text>
                  ))}
                </View>
              </View>

              <Text style={styles.textInfo1}>Weaknesses:</Text>
              <Text
                style={[
                  styles.textInfo1,
                  { color: TextCor(pokemon.types[0].type.name) },
                ]}>
                Training
              </Text>
              <Text style={styles.textInfo1}>EV Yield: </Text>
              <Text style={styles.textInfo1}>
                Catch Rate:{' '}
                <Text style={styles.textInfo2}>
                  45{' '}
                  <Text style={styles.smallText}>
                    (5.9% with PokéBall, full HP)
                  </Text>
                </Text>
              </Text>
              <Text style={styles.textInfo1}>
                Base Friendship: <Text style={styles.textInfo2}>70 </Text>
                <Text style={styles.smallText}>(normal)</Text>
              </Text>
              <Text style={styles.textInfo1}>
                Base Exp:{' '}
                <Text style={styles.textInfo2}>{pokemon.base_experience}</Text>
              </Text>
              <Text style={styles.textInfo1}>
                Growth Rate: <Text style={styles.textInfo2}>Medium Slow </Text>
              </Text>
              <Text
                style={[
                  styles.textInfo1,
                  { color: TextCor(pokemon.types[0].type.name) },
                ]}>
                Breeding
              </Text>
              <Text style={styles.textInfo1}>Gender: </Text>
              <Text style={styles.textInfo1}>Egg Groups: </Text>
              <Text style={styles.textInfo1}>Egg Cycles: </Text>
              <Text
                style={[
                  styles.textInfo1,
                  { color: TextCor(pokemon.types[0].type.name) },
                ]}>
                Location
              </Text>
            </View>
       
        </Modal>

        <Modal visible={modalStats} animationType="slide" transparent={true}>
          <View style={styles.ww}>
            <View style={styles.btnVoltar}>
              <TouchableOpacity onPress={onBack}>
                <Image
                  source={ImagensIcon.icons.exit}
                  style={styles.exitImage}
                />
              </TouchableOpacity>
            </View>
          </View>

            <View style={styles.btnContainer}>
              {/* About */}
              <TouchableOpacity style={styles.button} onPress={openAbout}>
                <Text style={styles.btnText}>About</Text>
              </TouchableOpacity>

              {/* Stats */}
              <TouchableOpacity style={styles.button} onPress={openStats}>
                  <Image
                  source={ImagensIcon.icons.sla}
                  style={styles.pokeboll}
                />
                <Text style={styles.btnText}>Stats</Text>
              </TouchableOpacity>

              {/* Evolution */}
              <TouchableOpacity style={styles.button} onPress={openEvolution}>
                <Text style={styles.btnText}>Evolution</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.borrao}>
              <Text
                style={[
                  styles.textInfo1,
                  { color: TextCor(pokemon.types[0].type.name) },
                ]}>
                Base Stats
              </Text>
              {pokemon.stats.map((statInfo) => (
                <Text style={styles.textInfo1} key={statInfo.stat.name}>
                  {`${
                    statInfo.stat.name.charAt(0).toUpperCase() +
                    statInfo.stat.name.slice(1)
                  }: ${statInfo.base_stat}`}
                </Text>
              ))}
              <Text
                style={[
                  styles.textInfo1,
                  { color: TextCor(pokemon.types[0].type.name) },
                ]}>
                Type Defenses
              </Text>
              <Text style={styles.textInfo1}>
                The effectiveness of each type on{' '}
                {pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}.
              </Text>
            </View>
        </Modal>

        <Modal
          visible={modalEvolution}
          animationType="slide"
          transparent={true}>
          <View style={styles.ww}>
            <View style={styles.btnVoltar}>
              <TouchableOpacity onPress={onBack}>
                <Image
                  source={ImagensIcon.icons.exit}
                  style={styles.exitImage}
                />
              </TouchableOpacity>
            </View>
          </View>
            <View style={styles.btnContainer}>
              {/* About */}
              <TouchableOpacity style={styles.button} onPress={openAbout}>
                <Text style={styles.btnText}>About</Text>
              </TouchableOpacity>

              {/* Stats */}
              <TouchableOpacity style={styles.button} onPress={openStats}>
                <Text style={styles.btnText}>Stats</Text>
              </TouchableOpacity>

              {/* Evolution */}
              <TouchableOpacity style={styles.button} onPress={openEvolution}>
                  <Image
                  source={ImagensIcon.icons.sla}
                  style={styles.pokeboll}
                />
                <Text style={styles.btnText}>Evolution</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.borrao}>
              <Text
                style={[
                  styles.textInfo1,
                  { color: TextCor(pokemon.types[0].type.name) },
                ]}>
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

                        <Text style={styles.evolutionText}>
                          {evolution.name}
                        </Text>
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
    </View>
  );
};

export default PokemonProfile;
