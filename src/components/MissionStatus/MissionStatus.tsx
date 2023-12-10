import './MissionStatus.scss';

type Props = {
  info: string;
};

export default function MissionStatus({ info }: Props) {
  return <div className="MissionStatus">{info}</div>;
}
