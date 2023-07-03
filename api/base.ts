import ky, { HTTPError } from 'ky';
import { baseUrl } from '../data/api';
import { ResponseOk, ResponseError } from '../types/api';

const api = ky.create({
  prefixUrl: baseUrl,
});

const fetchData = async (endPoint: string) => {
  try {
    const data = await api.get(endPoint, { searchParams: { phonetic: "間" } }).json();
    return { status: 200, data: data } as ResponseOk;
  } catch (e: unknown) {
    const error = e as HTTPError;
    return { status: 500, message: error.message } as ResponseError;
  }
};

export default fetchData;
