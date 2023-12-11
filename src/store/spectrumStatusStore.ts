// since zustand is lightweight and easier to setup I used it instead of Redux
import { roundNumbers } from '@/helpers/roundNumbers';
import { create } from 'zustand';

type SpectrumStatusT = {
  velocity: number;
  altitude: number;
  temperature: number;
  limitVelocity: number;
  limitTemperature: number;
  limitAltitude: number;
  isAscending: boolean;
  isActionRequired: boolean;
  statusMessage: string;
};

type StoreDataT = { storeData: SpectrumStatusT };

type SpectrumStatusSetterT = {
  setSpectrumStatusStore: (data: SpectrumStatusT) => void;
};

type SpectrumStatusStoreT = StoreDataT & SpectrumStatusSetterT;

// I don't know why but the API giving around -35000 all the time, so I limited the bar to -50000
// To create more meaningful logic I need more information about this data
export const altitudeLimit = -50000;

const useSpectrumStatusStore = create<SpectrumStatusStoreT>()((set) => ({
  storeData: {
    velocity: 0,
    altitude: 0,
    temperature: 0,
    limitVelocity: 0,
    limitTemperature: 0,
    limitAltitude: altitudeLimit,
    isAscending: false,
    isActionRequired: false,
    statusMessage: '',
  },

  setSpectrumStatusStore: (data) =>
    set(() => ({
      storeData: {
        velocity: roundNumbers(data.velocity || 0),
        altitude: roundNumbers(data.altitude || 0),
        temperature: roundNumbers(data.temperature || 0),
        limitVelocity: (data.velocity || 0) >= 0 ? 100 : -100,
        limitTemperature: (data.temperature || 0) >= 0 ? 100 : -100,
        // since everything is set again, from performance stand point; limitAltitude was also set instead of spreading
        limitAltitude: altitudeLimit,
        isAscending: data.isAscending,
        isActionRequired: data.isActionRequired,
        statusMessage: data.statusMessage,
      },
    })),
}));

export default useSpectrumStatusStore;
