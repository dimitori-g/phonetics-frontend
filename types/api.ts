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
