import './GaugesLayout.scss';
import useSpectrumStatusStore from '@/store/spectrumStatusStore';
import GaugeGraph from '@/components/GaugeGraph/GaugeGraph';
import AltitudeChange from '@/components/AltitudeChange/AltitudeChange';

export default function GaugesLayout() {
  const { storeData } = useSpectrumStatusStore();

  return (
    <div className="GaugesLayout">
      <GaugeGraph
        title="Velocity"
        value={storeData.velocity}
        units="m/s"
        limitValue={storeData.limitVelocity}
      />
      <GaugeGraph
        title="Altitude"
        value={storeData.altitude}
        units="feet"
        limitValue={storeData.limitAltitude}
      />
      <GaugeGraph
        title="Temperature"
        value={storeData.temperature}
        units="&deg;C"
        limitValue={storeData.limitTemperature}
      />
      <AltitudeChange isAscending={storeData.isAscending} />
    </div>
  );
}
