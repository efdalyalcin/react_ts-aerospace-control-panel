import GaugeGraph from '@/components/GaugeGraph/GaugeGraph';
import { roundNumbers } from '@/helpers/roundNumbers';
import { getSpectrumStatus } from '@/services/getSpectrumStatus';
import { useQuery } from 'react-query';

export default function Home() {
  const { isLoading, isError, data, error } = useQuery({
    queryKey: [`spectrum-status`],
    queryFn: () => getSpectrumStatus(),
  });

  if (isError) return <div>{`Error on the server: ${error}`}</div>;
  if (isLoading) {
    return (
      <div className="loading">
        <h1>Loading...</h1>
      </div>
    );
  }

  // this is a simple calc so memoizing or keeping in state will cost more resources
  const velocityLimitValue = data!.velocity > 0 ? 100 : -100;

  return (
    <div>
      <GaugeGraph
        title="Velocity"
        value={roundNumbers(data!.velocity)}
        units="m/s"
        limitValue={velocityLimitValue}
      />
    </div>
  );
}
