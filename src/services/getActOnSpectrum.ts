import { BASE_URL } from './baseUrl';

export const getActOnSpectrum = () => {
  // The api gives 200 from a get request but there is no data so I didn't know what to do with it
  return new Promise((resolve, reject) => {
    fetch(`${BASE_URL}/ActOnSpectrum`)
      // .then((res) => res.json())
      .then((data) => resolve(data))
      .catch((error) => reject(error));
  });
};
