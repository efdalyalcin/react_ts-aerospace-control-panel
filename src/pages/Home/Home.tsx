import GaugeGraph from '@/components/GaugeGraph/GaugeGraph';
import { roundNumbers } from '@/helpers/roundNumbers';
import { getSpectrumStatus } from '@/services/getSpectrumStatus';
import { useQuery } from 'react-query';
import './Home.scss';
import { useState } from 'react';
import NavBar from '@/components/NavBar/NavBar';
import AltitudeChange from '@/components/AltitudeChange/AltitudeChange';
import MissionStatus from '@/components/MissionStatus/MissionStatus';
import ActionAlert from '@/components/ActionAlert/ActionAlert';

// I don't know why but the API giving around -35000 all the time, so I limited the bar to -50000
// To create more meaningful logic I need more information about this data
const altitudeLimit = -50000;

export default function Home() {
  const [usefulData, setUsefulData] = useState({
    velocity: 0,
    altitude: 0,
    temperature: 0,
    limitVelocity: 100,
    limitTemperature: 100,
    isActionRequired: false,
    statusMessage: '',
  });

  const { isLoading, isError, data, error, refetch } = useQuery({
    queryKey: [`spectrum-status`],
    queryFn: () => getSpectrumStatus(),
    onSuccess(data) {
      const useful = {
        velocity: roundNumbers(data.velocity || 0),
        altitude: roundNumbers(data.altitude || 0),
        temperature: roundNumbers(data.temperature || 0),
        limitVelocity: (data.velocity || 0) >= 0 ? 100 : -100,
        limitTemperature: (data.temperature || 0) >= 0 ? 100 : -100,
        isActionRequired: data.isActionRequired,
        statusMessage: data.statusMessage,
      };
      setUsefulData(useful);
    },
  });

  if (isError) return <div>{`Error on the server: ${error}`}</div>;
  if (isLoading) {
    return (
      <div className="loading">
        <h1>Loading...</h1>
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
        <ActionAlert isRequired={usefulData.isActionRequired} />

        <div className="Home__gauges">
          <GaugeGraph
            title="Velocity"
            value={usefulData.velocity}
            units="m/s"
            limitValue={usefulData.limitVelocity}
          />
          <GaugeGraph
            title="Altitude"
            value={usefulData.altitude}
            units="feet"
            limitValue={altitudeLimit}
          />
          <GaugeGraph
            title="Temperature"
            value={usefulData.temperature}
            units="&deg;C"
            limitValue={usefulData.limitTemperature}
          />
          <AltitudeChange isAscending={data!.isAscending} />
        </div>

        <button className="Home__button" type="button" onClick={handleClick}>
          Update Data
        </button>

        <MissionStatus info={usefulData.statusMessage} />
      </section>
    </>
  );
}
