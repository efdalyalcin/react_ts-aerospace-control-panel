import './Home.scss';
import { roundNumbers } from '@/helpers/roundNumbers';
import { getSpectrumStatus } from '@/services/getSpectrumStatus';
import { useQuery } from 'react-query';
import NavBar from '@/components/NavBar/NavBar';
import MissionStatus from '@/components/MissionStatus/MissionStatus';
import ActionAlert from '@/components/ActionAlert/ActionAlert';
import Legend from '@/components/Legend/Legend';
import useSpectrumStatusStore, {
  altitudeLimit,
} from '@/store/spectrumStatusStore';
import GaugesLayout from '@/components/GaugesLayout/GaugesLayout';

export default function Home() {
  const { storeData, setSpectrumStatusStore } = useSpectrumStatusStore();

  const { isLoading, isError, error, refetch } = useQuery({
    queryKey: [`spectrum-status`],
    queryFn: () => getSpectrumStatus(),
    onSuccess(data) {
      const useful = {
        velocity: roundNumbers(data.velocity || 0),
        altitude: roundNumbers(data.altitude || 0),
        temperature: roundNumbers(data.temperature || 0),
        limitVelocity: (data.velocity || 0) >= 0 ? 100 : -100,
        limitTemperature: (data.temperature || 0) >= 0 ? 100 : -100,
        limitAltitude: altitudeLimit,
        isAscending: data.isAscending,
        isActionRequired: data.isActionRequired,
        statusMessage: data.statusMessage,
      };
      setSpectrumStatusStore(useful);
    },
  });

  if (isError) return <div>{`Error on the server: ${error}`}</div>;
  if (isLoading) {
    return (
      <div className="loading">
        <h1 className="loading__text">Loading...</h1>
      </div>
    );
  }

  // there is no need to wrap this to useCallback,
  // since it is not passed to child, memoizing may reduce performance
  const handleClick = () => {
    refetch();
  };

  return (
    <>
      <NavBar />
      <section className="Home">
        <ActionAlert isRequired={storeData.isActionRequired} />

        <GaugesLayout />

        <button className="Home__button" type="button" onClick={handleClick}>
          Update Data
        </button>

        <MissionStatus info={storeData.statusMessage} />
      </section>
      <Legend />
    </>
  );
}
