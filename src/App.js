import { Box, Button, Checkbox, CheckboxGroup, Flex, Grid, Heading, Input, ListItem, OrderedList, Select, Stack, Text, UnorderedList } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import './App.css';
import {fruits} from './fruits.js';
import { mergeSort } from './algorithms/mergesort';
import { knapsack } from './algorithms/knapsack';

function App() {
  const [dietType, setDietType] = useState('Default');
  const [sortedFruits, setSortedFruits] = useState([...fruits]);
  const [carbohydrates, setCarbohydrates] = useState();
  const [bestDiet, setBestDiet] = useState();

  function handleSetDietType(e){
    setDietType(e.target.value);
  }

  useEffect(() => {
    gerarSequencia();
  }, [dietType]);

  const gerarSequencia = () => {
    const thisFruits = mergeSort(sortedFruits);

    if(dietType === 'lowCarb'){
      console.log('Entrou')
      setSortedFruits(thisFruits);
    } else if(dietType === 'highCarb'){
      setSortedFruits(thisFruits.reverse());
    } else {
      setSortedFruits([...fruits]);
    }
  }

  return (
    <Flex bg={"#D3D3D3"} justifyContent={"center"} alignItems={"center"} flexDirection={"column"} h='calc(100vh)'> 
      <>
        {!bestDiet ? (
          <>
            <Text color={'purple'} fontSize='2xl' fontWeight={'bold'} mb={'10px'}>Ordenar:</Text>
            <Select color={'purple'} bg={'white'} h={'50px'} w={'300px'} fontSize='xl' marginBottom={'50px'} onChange={(e) => handleSetDietType(e)} defaultValue="Default">
              <option value="Default">Todos os produtos</option>
              <option value="lowCarb">Menos Carboidratos</option>
              <option value="highCarb">Mais Carboidratos</option>
            </Select>
            <Flex width='60%' justifyContent={'space-around'}>
              {dietType === 'Default' ? (
                <UnorderedList spacing={[1, 2]} direction={['column', 'row']}>
                  {sortedFruits?.map(fruit => (
                    <>
                      <ListItem color={'purple'} fontSize='xl'>Fruta: {fruit.name} - Carboidratos: {fruit.carbohydrates}</ListItem>
                    </>
                  ))}
                </UnorderedList>
                ) : (
                  <OrderedList spacing={[1, 2]} direction={['column', 'row']}>
                    {sortedFruits?.map(fruit => (
                      <>
                        <ListItem color={'purple'} fontSize='xl'>Fruta: {fruit.name} - Carboidratos: {fruit.carbohydrates}</ListItem>
                      </>
                    ))}
                  </OrderedList>
                )
              }
              <Box bgColor={'purple'} w={'400px'} h={'250px'} border={'1px solid purple'} borderRadius={'10px'}>
                <Text color={'white'} m={'30px'} fontSize='xl' fontWeight={'bold'} mb={'10px'}>
                  Até quantos carboidratos você pode comer em sua dieta?
                </Text>
                <Flex px={'20px'} justifyContent={'space-around'}>
                  <Input
                    bg={'white'} 
                    onChange={e => setCarbohydrates(e.target.value)} 
                    h={'50px'} 
                    w={'100px'} 
                    fontSize='xl' 
                    borderColor={'white'}
                    mt={'40px'}
                  />
                  <Button 
                    bg={'white'} 
                    h={'50px'} 
                    w={'150px'} 
                    fontSize='xl'
                    color={'purple'}
                    fontWeight={'bold'}
                    borderColor={'#D3D3D3'}
                    mt={'40px'}
                    verticalAlign={'baseline'}
                    disabled={!carbohydrates}
                    onClick={() => {
                      if (carbohydrates > 0) {
                        const response = knapsack(sortedFruits, carbohydrates);
                        setBestDiet(response);
                      }
                    }}
                  >
                    Confirmar
                  </Button>
                </Flex>
              </Box>
            </Flex>
          </>
        )
        : 
        (
          <Flex w={'100%'} h="60%" flexDirection={'column'} justify="space-around" align={'center'}>
            <Button 
              ml={'100px'} 
              alignSelf={'self-start'} 
              onClick={() => setBestDiet('')}
              bg={'white'} 
              h={'50px'} 
              w={'150px'} 
              fontSize='xl'
              color={'purple'}
              fontWeight={'bold'}
              borderColor={'#D3D3D3'}
            >
              Voltar
            </Button>
            <Text mb={"50px"} color={'purple'} fontSize='4xl' fontWeight={'bold'}>Total de carboidratos: {bestDiet.maxValue}</Text>
            <Box>
              <Text mb={"30px"} color={'purple'} fontSize='2xl' fontWeight={'bold'}>Lista de frutas para a dieta:</Text>
              <UnorderedList spacing={[1, 2]} direction={['column', 'row']}>
                {bestDiet?.subset?.map(fruit => (
                  <ListItem>
                    <Box borderTop={'1px solid purple'} paddingX={'30px'} paddingy={'30px'} key={fruit.name}>
                      <Flex>
                        <Text color={'purple'} fontSize='xl' fontWeight={'bold'}>
                          Fruta:
                        </Text >
                        <Text color={'purple'} fontSize='xl' fontWeight={'bold'}>
                          &nbsp;{fruit.name}
                        </Text>
                      </Flex>
                      <Flex>
                        <Text color={'purple'} fontSize='xl' fontWeight={'bold'}>
                          Carboidratos:
                        </Text>
                        <Text color={'purple'} fontSize='xl' fontWeight={'bold'}>
                          &nbsp;{fruit.carbohydrates}
                        </Text>
                      </Flex>
                    </Box>
                  </ListItem>
                ))}
              </UnorderedList>
            </Box>
          </Flex>
        )}
      </>      
    </Flex>
  )
}

export default App;