import { Box, Button, Checkbox, CheckboxGroup, Flex, Grid, Heading, Input, Select, Stack, Text } from '@chakra-ui/react';
import { useState } from 'react';
import './App.css';
import {fruits} from './fruits.js';
import { mergeSort } from './mergesort';

function App() {
  const [dietType, setDietType] = useState('');
  const [selectedFruits, setSelectedFruits] = useState([]);
  const [sortedFruits, setSortedFruits] = useState([]);

  function handleSetDietType(e){
    setDietType(e.target.value);
  }

  const handleChange = event => {
    const currentFruit = fruits.find(fruit => fruit.name === event.target.value);
    if (event.target.checked) {
      console.log('✅ Checkbox is checked');
      setSelectedFruits(selectedFruits => [...selectedFruits, currentFruit]);
    } else {
      console.log('⛔️ Checkbox is NOT checked');
      const newFruits = selectedFruits.filter(selectedFruits => selectedFruits.name !== event.target.value);
      setSelectedFruits(newFruits);
    }
  };

  const gerarSequencia = () => {
    if(dietType === '' || selectedFruits.length <= 0){
      console.log(selectedFruits, dietType);
      return;
    }

    const thisFruits = mergeSort(selectedFruits);
    
    if(dietType === 'lowCarb'){
      setSortedFruits(thisFruits);
    } else {
      setSortedFruits(thisFruits.reverse());
    }
  }

  
  return (
    <Flex bg={"#"} justifyContent={"center"} alignItems={"center"} flexDirection={"column"} h='calc(100vh)'>
      {sortedFruits.length > 0 ? (
        <>
          <Grid templateColumns='6fr 1fr 6fr 1fr 6fr 1fr' gap={6}>
            {sortedFruits.map((fruit, index) => (
              index < sortedFruits.length - 1 ? (
                <>
                  {index == 4 ? (
                    <>
                      <Box width={'100%'} paddingX={'30px'} paddingy={'30px'} key={fruit.name}>
                        <Flex><Text as='h4' fontWeight={'bold'}>Fruta:</Text>&nbsp;{fruit.name}</Flex>
                        <Flex><Text as='h4' fontWeight={'bold'}>Carboidratos:</Text>&nbsp;{fruit.carbohydrates}</Flex>
                      </Box>
                    </>
                  ) : (
                    <Box paddingX={'30px'} paddingy={'30px'} key={fruit.name}>
                      <Flex><Text as='h4' fontWeight={'bold'}>Fruta:</Text>&nbsp;{fruit.name}</Flex>
                      <Flex><Text as='h4' fontWeight={'bold'}>Carboidratos:</Text>&nbsp;{fruit.carbohydrates}</Flex>
                    </Box>
                  )}
                  <span> -> </span>
                </>
              ) : (
                <Box paddingX={'30px'} key={fruit.name}>
                  <Flex><Text as='h4' fontWeight={'bold'}>Fruta:</Text>&nbsp;{fruit.name}</Flex>
                  <Flex><Text as='h4' fontWeight={'bold'}>Carboidratos:</Text>&nbsp;{fruit.carbohydrates}</Flex>
                </Box>
              )
            )) }
          </Grid>
          <Button marginTop={'30px'} onClick={() => setSortedFruits([])}>Voltar</Button>
        </>
        )
        : 
        <>
          <Select w={'300px'} marginBottom={'50px'} onChange={(e) => handleSetDietType(e)} defaultValue="">
            <option value="" disabled>Escolha o tipo de dieta</option>
            <option value="lowCarb">Low Carb</option>
            <option value="highCarb">High Carb</option>
          </Select>
          <CheckboxGroup colorScheme='green' defaultValue={['naruto', 'kakashi']}>
            <Stack spacing={[1, 2]} direction={['column', 'row']}>
              {fruits?.map(fruit => (
                <Checkbox 
                  value={fruit.name}
                  onChange={handleChange}
                >
                  {fruit.name}
                </Checkbox>
              ))}
            </Stack>
          </CheckboxGroup>
          <Button disabled={dietType === '' || selectedFruits.length <= 0} marginTop={'50px'} onClick={() => gerarSequencia()}>Gerar ordem de frutas</Button>
        </>
      }
      
    </Flex>
  )
}

export default App;