import Positive from '@/assets/positive.png';
import Negative from '@/assets/negative.png';
import './Legend.scss';

export default function Legend() {
  return (
    <div className="Legend">
      <img
        className="Legend__item"
        src={Positive}
        alt="positive numbers legend"
      />
      <img
        className="Legend__item"
        src={Negative}
        alt="negative numbers legend"
      />
    </div>
  );
}
