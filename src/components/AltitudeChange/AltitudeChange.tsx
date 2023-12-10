import React from 'react';
import './AltitudeChange.scss';

type Props = {
  isAscending: boolean;
};

const getSlidingClassName = (isTrue: boolean) => {
  return isTrue
    ? 'AltitudeChange__arrowSlidingUp'
    : 'AltitudeChange__arrowSlidingDown';
};

const AltitudeChange = React.memo(({ isAscending }: Props) => {
  return (
    <div className="AltitudeChange">
      <div className={getSlidingClassName(isAscending)}>
        <div
          className={`AltitudeChange__arrow ${
            isAscending ? '' : 'AltitudeChange__arrow--down'
          }`}
        />
      </div>
      <div
        className={getSlidingClassName(isAscending) + ' AltitudeChange__delay1'}
      >
        <div
          className={`AltitudeChange__arrow ${
            isAscending ? '' : 'AltitudeChange__arrow--down'
          }`}
        />
      </div>
      <div
        className={getSlidingClassName(isAscending) + ' AltitudeChange__delay2'}
      >
        <div
          className={`AltitudeChange__arrow ${
            isAscending ? '' : 'AltitudeChange__arrow--down'
          }`}
        />
      </div>
      <div
        className={getSlidingClassName(isAscending) + ' AltitudeChange__delay3'}
      >
        <div
          className={`AltitudeChange__arrow ${
            isAscending ? '' : 'AltitudeChange__arrow--down'
          }`}
        />
      </div>
      <p className="AltitudeChange__info">
        {isAscending ? 'Ascending' : 'Descending'}
      </p>
    </div>
  );
});

export default AltitudeChange;
