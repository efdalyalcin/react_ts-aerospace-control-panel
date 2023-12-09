import { SpectrumStatusT } from '@/types/SpectrumStatus.type';
import { BASE_URL } from './baseUrl';

export const getSpectrumStatus = () => {
  return new Promise<SpectrumStatusT>((resolve, reject) => {
    fetch(`${BASE_URL}/SpectrumStatus`)
      .then((res) => res.json())
      .then((data) => resolve(data))
      .catch((error) => reject(error));
  });
};
