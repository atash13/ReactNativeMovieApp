import {View, Text, Button} from 'react-native';
import React, {useState} from 'react';
import {useMutation, useQuery, useQueryClient} from 'react-query';
import axios from 'axios';
import Loading from '../components/loading';

export default function LoginScreen() {
  const queryClient = useQueryClient();
  const [users, setUsers] = useState([]);
  const [userName, setUserName] = useState('');

  const {
    isLoading,
    isFetching,
    error,
    data: todoData,
  } = useQuery({
    queryKey: ['unicorns'],
    queryFn: () =>
      axios
        .get('https://jsonplaceholder.typicode.com/todos')
        .then(res => res.data?.data),
    //refetchInterval: 1000,
    cacheTime: 100000,
    scaleTime: 1000,
  });

  const updateUserMutation = useMutation(
    user_name =>
      axios.put('https://jsonplaceholder.typicode.com/todos/1', {
        name: user_name,
        age: 28,
        colour: 'yellow',
      }),
    {
      onSuccess: context => {
        queryClient.invalidateQueries(['unicorns']);

        queryClient.setQueriesData(['unicorns', 3]);

        return 'Successfully updated';
      },
      onError: errorMessage => {
        console.warn('err', errorMessage);
      },
      onMutate: variables => {
        return {hi: 'Welcome Furkan'};
      },
    },
  );

  return (
    <View className="flex-1 items-center justify-center">
      <Text className="my-5 font-bold"> Welcome To {userName}</Text>
      {isLoading && <Loading />}
      {error && <Text>An error has occurred: {error.message}</Text>}
      {isFetching && <Text>isFetching {String(isFetching)}</Text>}
      {/* {data && <Text>{JSON.stringify(data)}</Text>} */}
      <Button
        title="Güncelle "
        onPress={async () => {
          updateUserMutation.mutate('Ali Türkyılmaz');
        }}
      />
    </View>
  );
}