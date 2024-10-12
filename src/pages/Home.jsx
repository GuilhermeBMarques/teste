import React from 'react';
import { View, FlatList } from 'react-native';
import FiltroButton from '../components/FiltroButton';
import PokemonCard from '../components/PokemonCard';
import styles from '../styles/homeStyles';

const Home = () => {

  return (
    <View style={styles.nsei}>
      <FiltroButton />
      <FlatList
        data={filteredList}
        renderItem={PokemonCard}
        keyExtractor={(item) => item.name}
        onEndReached={fetchPokemon}
        onEndReachedThreshold={0.5}
      />
    </View>
  );
};

export default Home;
