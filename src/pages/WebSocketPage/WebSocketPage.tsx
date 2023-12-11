import ActionAlert from '@/components/ActionAlert/ActionAlert';
import GaugesLayout from '@/components/GaugesLayout/GaugesLayout';
import Legend from '@/components/Legend/Legend';
import MissionStatus from '@/components/MissionStatus/MissionStatus';
import NavBar from '@/components/NavBar/NavBar';
import { roundNumbers } from '@/helpers/roundNumbers';
import useSpectrumStatusStore, {
  altitudeLimit,
} from '@/store/spectrumStatusStore';

import { useEffect } from 'react';
import './WebSocketPage.scss';
import { WSSpectrumStatusT } from '@/types/WSSpectrumStatus.type';

export default function WebSocketPage() {
  const { storeData, setSpectrumStatusStore } = useSpectrumStatusStore();

  useEffect(() => {
    const websocket = new WebSocket(
      'wss://webfrontendassignment-isaraerospace.azurewebsites.net/api/SpectrumWS'
    );

    websocket.onmessage = (event) => {
      const data: WSSpectrumStatusT = JSON.parse(event.data);

      // in the websocket data every key starts with a capital letter
      // It took a lot of time to figure out the bug.
      const useful = {
        velocity: roundNumbers(data?.Velocity || 0),
        altitude: roundNumbers(data?.Altitude || 0),
        temperature: roundNumbers(data?.Temperature || 0),
        limitVelocity: (data?.Velocity || 0) >= 0 ? 100 : -100,
        limitTemperature: (data?.Temperature || 0) >= 0 ? 100 : -100,
        limitAltitude: altitudeLimit,
        isAscending: data?.IsAscending || false,
        isActionRequired: data?.IsActionRequired || false,
        statusMessage: data?.StatusMessage || '',
      };
      setSpectrumStatusStore(useful);
    };

    // Cleanup function to close the WebSocket when the component unmounts
    return () => {
      websocket.close();
    };
  }, [setSpectrumStatusStore]);

  return (
    <div className="WebSocketPage">
      <NavBar />
      <section className="Home">
        <ActionAlert isRequired={storeData?.isActionRequired} />

        <GaugesLayout />

        <MissionStatus info={storeData?.statusMessage} />
      </section>
      <Legend />
    </div>
  );
}
