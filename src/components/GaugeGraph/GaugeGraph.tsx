import { GaugeTitleT } from '@/types/GaugeTitle.type';
import { Doughnut } from 'react-chartjs-2';
import { Chart, ArcElement, Tooltip, Legend } from 'chart.js';
import { useEffect, useState } from 'react';
import './GaugeGraph.scss';

Chart.register(ArcElement, Tooltip, Legend);

// chart is a ChartJS object, which I couldn't import the type so I used any although it is a bad practice
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const getGradient = (chart: any, value: number) => {
  const {
    ctx,
    chartArea: { left, right },
  } = chart;
  const gradientSegment = ctx.createLinearGradient(left, 0, right, 0);
  if (value >= 0) {
    gradientSegment.addColorStop(0, 'green');
    gradientSegment.addColorStop(0.5, 'orange');
    gradientSegment.addColorStop(1, 'red');
  } else {
    gradientSegment.addColorStop(0, 'red');
    gradientSegment.addColorStop(0.5, 'orange');
    gradientSegment.addColorStop(1, 'green');
  }
  return gradientSegment;
};

const createData = (value: number, limitValue: number) => {
  const calculatedPercentToLimit =
    value === limitValue ? value : limitValue - value;

  return {
    datasets: [
      {
        data: [value, calculatedPercentToLimit],
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        backgroundColor: (context: any) => {
          const chart = context.chart;
          const { chartArea } = chart;
          if (!chartArea) return null;
          const gradient =
            context.dataIndex === 0 ? getGradient(chart, value) : '#bdc4cd';

          return gradient;
        },
        borderWidth: 0,
        circumference: 180,
        rotation: value >= 0 ? 270 : 90,
        hoverOffset: 2,
      },
    ],
  };
};

type Props = {
  title: GaugeTitleT;
  value: number;
  units?: string;
  limitValue?: number;
};

export default function GaugeGraph({
  title,
  value,
  units,
  limitValue = value,
}: Props) {
  const [data, setData] = useState(createData(value, limitValue));

  useEffect(() => {
    setData(createData(value, limitValue));
  }, [value, limitValue]);

  return (
    <div className="GaugeGraph">
      <h3 className="GaugeGraph__title">{title}</h3>
      <div className="GaugeGraph__graph">
        <Doughnut data={data} />
      </div>
      <p className="GaugeGraph__info">{`${value} ${units ? units : ''}`}</p>
    </div>
  );
}
