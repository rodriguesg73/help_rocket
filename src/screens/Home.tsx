import { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { HStack, IconButton, VStack, useTheme, Text, Heading, FlatList, Center } from 'native-base';
import { ChatTeardropText} from 'phosphor-react-native'
import { SignOut} from 'phosphor-react-native'

import Logo from '../assets/logo_secondary.svg';

import { Filter } from '../components/Filter';
import { Order, OrderProps } from '../components/Order';
import { Button } from '../components/Button';

export function Home() {
  const {colors} = useTheme();
  const [orders, setOrders] = useState<OrderProps[]>([
    {
      id: '123',
      patrimony: '55686',
      when: '18/07/2022 às 14:00',
      status: 'open'
    }
  ])
  const [statusSelected, setStatusSelected] = useState<'open' | 'closed'>('open');
  const navigation = useNavigation();

  const handleOpenNewOrder = () => {
    navigation.navigate('new')
  }

  const handleOpenDetails = (orderId: string) => {
    navigation.navigate('details', { orderId })
  }
  
  return (
    <VStack flex={1} pb={6} bg="gray.700">
      <HStack 
        w="full"
        justifyContent="space-between"
        alignItems="center"
        bg="gray.600"
        pt={12}
        pb={5}
        px={6}
      >
        <Logo />
        <IconButton 
          icon={<SignOut size={26} color={colors.gray[300]}/>}
        />
      </HStack>
      <VStack flex={1} px={6}>
        <HStack w="full" mt={8} mb={4} justifyContent="space-between" alignItems="center">
          <Heading color="gray.100">Solicitações</Heading>
          <Text color="gray.200">{orders.length}</Text>
        </HStack>
        <HStack space={3} mb={8}>
        <Filter 
          title="Em andamento"
          type="open"
          onPress={() => setStatusSelected('open')}
          isActive={statusSelected === 'open'}
        />
        <Filter 
          title="Finalizados"
          type="closed"
          onPress={() => setStatusSelected('closed')}
          isActive={statusSelected === 'closed'}
        />
      </HStack>
      <FlatList 
        data={orders} 
        keyExtractor={order => order.id} 
        renderItem={({item}) => <Order data={item} onPress={() => handleOpenDetails(item.id)}/>}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{paddingBottom: 100}}
        ListEmptyComponent={() => (
          <Center>
            <ChatTeardropText color={colors.gray[300]} size={40} />
            <Text color="gray.300" fontSize="xl" textAlign="center">
              Você ainda não possui {'\n'}
              solicitações {statusSelected === 'open' ? 'em andamento' : 'finalizados'}
            </Text>
          </Center>
        )}
      />
      <Button title='Nova Solicitação' onPress={handleOpenNewOrder}/>
      </VStack>
    </VStack>
  );
}