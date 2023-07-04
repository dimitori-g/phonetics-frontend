import { useState } from 'react';
import fetchData from '../api/base';
import { Glyph } from '../types/glyph';
import { apiEndPoints } from '../data/api';

import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
} from '@chakra-ui/react';

import {
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
} from '@chakra-ui/react';

import { Button } from '@chakra-ui/react';

import { Input } from '@chakra-ui/react';

const Glyph = () => {
  const [glyphs, setGlyphs] = useState<Glyph[] | null>(null);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [phonetic, setPhonetic] = useState('');

  const fetchGlyph = async () => {
    if (!phonetic) {
      setError('Need at last one parameter.');
      return;
    }
    setGlyphs(null);
    setIsLoading(true);
    setError('');
    const glyphResponse = await fetchData(apiEndPoints.glyph, {
      phonetic: phonetic,
    });
    if (glyphResponse.status === 200) {
      setGlyphs(glyphResponse.data);
    } else {
      setError(glyphResponse.message);
    }
    setIsLoading(false);
  };

  return (
    <>
      <div>Glyphs</div>
      <Input
        value={phonetic}
        onChange={(e) => setPhonetic(e.target.value)}
        placeholder="Phonetic"
        width="auto"
      />
      <Button isLoading={isLoading} isActive={!isLoading} onClick={fetchGlyph}>
        Search
      </Button>
      {glyphs && glyphs.length > 0 && (
        <TableContainer padding={10}>
          <Table variant="striped" colorScheme="gray">
            <TableCaption>Glyph Table</TableCaption>
            <Thead>
              <Tr>
                <Th>Glyph</Th>
                <Th>Phonetic</Th>
                <Th>Cantonese</Th>
                <Th>Pinyin</Th>
                <Th>Korean</Th>
                <Th>Onyomi</Th>
              </Tr>
            </Thead>
            <Tbody>
              {glyphs?.map((glyph) => (
                <Tr key={glyph.id}>
                  <Td>{glyph.glyph}</Td>
                  <Td>{glyph.phonetic}</Td>
                  <Td>{glyph.cantonese}</Td>
                  <Td>{glyph.pinyin}</Td>
                  <Td>{glyph.korean}</Td>
                  <Td>{glyph.on}</Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </TableContainer>
      )}
      {glyphs?.length === 0 && (
        <Alert status="info">
          <AlertIcon />
          <AlertTitle>Info</AlertTitle>
          <AlertDescription>Data not found</AlertDescription>
        </Alert>
      )}
      {error && (
        <Alert status="error">
          <AlertIcon />
          <AlertTitle>Error!</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
    </>
  );
};

export default Glyph;
