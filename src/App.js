import { Box, Button, Checkbox, CheckboxGroup, Flex, Grid, Heading, Input, ListItem, OrderedList, Select, Stack, Text, UnorderedList } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import './App.css';
import {fruits} from './fruits.js';
import { mergeSort } from './mergesort';

function App() {
  const [dietType, setDietType] = useState('Default');
  const [sortedFruits, setSortedFruits] = useState([...fruits]);

  function handleSetDietType(e){
    setDietType(e.target.value);
  }

  useEffect(() => {
    gerarSequencia();
  }, [dietType]);

  const gerarSequencia = () => {
    const thisFruits = mergeSort(sortedFruits);

    console.log(thisFruits);
    
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
    <Flex bg={"#"} justifyContent={"center"} alignItems={"center"} flexDirection={"column"} h='calc(100vh)'> 
      <>
        <Text fontSize='2xl' fontWeight={'bold'} mb={'10px'}>Ordenar:</Text>
        <Select h={'50px'} w={'300px'} fontSize='xl' marginBottom={'50px'} onChange={(e) => handleSetDietType(e)} defaultValue="Default">
          <option value="Default">Todos os produtos</option>
          <option value="lowCarb">Mais Carboidratos</option>
          <option value="highCarb">Menos Carboidratos</option>
        </Select>
        {dietType === 'Default' ? (
          <UnorderedList spacing={[1, 2]} direction={['column', 'row']}>
            {sortedFruits?.map(fruit => (
              <>
                <ListItem fontSize='xl'>Fruta: {fruit.name} - Carboidratos: {fruit.carbohydrates}</ListItem>
              </>
            ))}
          </UnorderedList>
          ) : (
            <OrderedList spacing={[1, 2]} direction={['column', 'row']}>
              {sortedFruits?.map(fruit => (
                <>
                  <ListItem fontSize='xl'>Fruta: {fruit.name} - Carboidratos: {fruit.carbohydrates}</ListItem>
                </>
              ))}
            </OrderedList>
          )
        }
        <Button fontSize='2xl' marginTop={'50px'} onClick={() => gerarSequencia()}>Gerar ordem de frutas</Button>
      </>      
    </Flex>
  )
}

export default App;