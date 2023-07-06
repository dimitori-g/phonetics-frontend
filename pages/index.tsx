import { useState } from 'react';
import fetchData from '../api/base';
import { Glyph } from '../types/glyph';
import { apiEndPoints } from '../data/api';
import {
  SearchParams,
  SearchParamsKey,
  defaultSearchParams,
} from '../types/api';

import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Stack,
  InputGroup,
  InputLeftAddon,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  Button,
  Input,
  Card,
  CardFooter,
  CardHeader,
  Heading,
  CardBody,
} from '@chakra-ui/react';

const Glyph = () => {
  const [glyphs, setGlyphs] = useState<Glyph[] | null>(null);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [searchParams, setSearchParams] =
    useState<SearchParams>(defaultSearchParams);

  const cleanParams = (params: SearchParams): SearchParams =>
    Object.entries(params)
      .filter(([, value]) => value !== '')
      .reduce((obj: SearchParamsKey, [key, value]) => {
        obj[key] = value;
        return obj;
      }, {});

  const fetchGlyph = async () => {
    setGlyphs(null);
    setIsLoading(true);
    setError('');
    const filters = cleanParams(searchParams);
    if (Object.keys(filters).length === 0) {
      setError('Need at least one parameter.');
      setIsLoading(false);
      return;
    }
    const glyphResponse = await fetchData(apiEndPoints.glyph, filters);
    if (glyphResponse.status === 200) {
      setGlyphs(glyphResponse.data);
    } else {
      setError(glyphResponse.message);
    }
    setIsLoading(false);
  };

  const placeholders = ['漢', '𦰩', 'hon3', 'hàn', '한', 'KAN', 'KARA', 'hán'];

  return (
    <Stack margin={5}>
      <Card variant="outline" size="sm" align="center">
        <CardHeader>
          <Heading>Glyphs</Heading>
        </CardHeader>
        <CardBody padding={5}>
          <Stack>
            {Object.entries(searchParams).map(([param, value], key) => (
              <InputGroup key={key}>
                <InputLeftAddon width="120px">{param}</InputLeftAddon>
                <Input
                  value={value}
                  onChange={(e) =>
                    setSearchParams({
                      ...searchParams,
                      [param]: e.target.value,
                    })
                  }
                  placeholder={placeholders[key]}
                  width="auto"
                />
              </InputGroup>
            ))}
          </Stack>
        </CardBody>
        <CardFooter>
          <Stack direction="row" spacing={4} align="center">
            <Button isLoading={isLoading} onClick={fetchGlyph}>
              Search
            </Button>
            <Button onClick={() => setSearchParams(defaultSearchParams)}>
              Clear
            </Button>
          </Stack>
        </CardFooter>
      </Card>

      {glyphs && glyphs.length > 0 && (
        <Card size="sm" variant="outline">
          <TableContainer>
            <Table variant="striped" colorScheme="gray" size="sm">
              <Thead>
                <Tr>
                  <Th>Glyph</Th>
                  <Th>Phonetic</Th>
                  <Th>Cantonese</Th>
                  <Th>Pinyin</Th>
                  <Th>Korean</Th>
                  <Th>Onyomi</Th>
                  <Th>Kunyomi</Th>
                  <Th>Vietnamese</Th>
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
                    <Td>{glyph.kun}</Td>
                    <Td>{glyph.vietnamese}</Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </TableContainer>
        </Card>
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
    </Stack>
  );
};

export default Glyph;
