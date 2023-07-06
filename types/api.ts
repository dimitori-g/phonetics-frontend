import { Glyph } from './glyph';

export type ResponseOk = {
  status: 200;
  message: 'ok';
  data: Glyph[];
};

export type ResponseError = {
  status: 500;
  message: 'error';
  data: null;
};

export type SearchParams = {
  glyph?: string;
  phonetic?: string;
  cantonese?: string;
  pinyin?: string;
  korean?: string;
  on?: string;
  kun?: string;
  vietnamese?: string;
};

export type SearchParamsKey = {
  [key: string]: unknown;
};

export const defaultSearchParams = {
  glyph: '',
  phonetic: '',
  cantonese: '',
  pinyin: '',
  korean: '',
  on: '',
  kun: '',
  vietnamese: '',
};
