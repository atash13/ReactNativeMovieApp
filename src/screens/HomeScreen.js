import React, {useEffect} from 'react';
import {View, Text, TouchableOpacity, ScrollView, Platform} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {styles} from '../theme';
import {useNavigation} from '@react-navigation/native';
import Loading from '../components/loading';
import TrendingMovies from '../components/trendingMovies';
import MovieList from '../components/movieList';
import {
  MagnifyingGlassIcon,
  LanguageIcon,
} from 'react-native-heroicons/outline';
import {
  fetchTopRatedMovies,
  fetchTrendingMovies,
  fetchUpComingMovies,
} from '../api/moviedb';

import useAppSettings from '../store/appSettings';
import useMovie from '../store/movie';

export default function HomeScreen() {
  const navigation = useNavigation();

  const {language, loading, setLanguage, setLoading} = useAppSettings(
    state => state,
  );

  const {trending, setTrending, upComing, setUpComing, topRated, setTopRated} =
    useMovie(state => state);

  const getTrendingMovies = async () => {
    const data = await fetchTrendingMovies();

    if (data?.results) {
      setTrending(data?.results);
    }
  };

  const getUpComingMovies = async () => {
    const data = await fetchUpComingMovies();

    if (data?.results) {
      setUpComing(data?.results);
    }
  };
  const getTopRatedMovies = async () => {
    const data = await fetchTopRatedMovies();

    if (data?.results) {
      setTopRated(data?.results);
    }
  };

  useEffect(() => {
    try {
      setLoading(true);
      getTrendingMovies();
      getUpComingMovies();
      getTopRatedMovies();
    } catch (error) {
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    try {
      setLoading(true);
      getTrendingMovies();
      getUpComingMovies();
      getTopRatedMovies();
    } catch (error) {
    } finally {
      setLoading(false);
    }
  }, [language]);

  

  return (
    <View className="flex bg-white">
      <SafeAreaView className={Platform.OS === 'ios' ? '-mb-2' : 'mb-3'}>
        <View className="flex-row justify-between items-center mx-4">
          <Text className="text-neutral-800 text-3xl font-bold">
            <Text style={styles.text}>U</Text>demig
          </Text>
          <View className="flex-row justify-between items-center">
            
            <TouchableOpacity onPress={() => navigation.navigate('Search')}>
              <MagnifyingGlassIcon size="30" strokeWidth={2} color={'black'} />
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
      {loading ? (
        <Loading />
      ) : (
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{paddingBottom: 150}}>
          <TrendingMovies data={trending} />

          <View className="ml-4">
            {upComing.length > 0 && (
              <MovieList title={'Upcoming'} data={upComing} />
            )}

            {/* top rated movies row */}
            {topRated.length > 0 && (
              <MovieList title={'Top Rated'} data={topRated} />
            )}
          </View>
        </ScrollView>
      )}
    </View>
  );
}