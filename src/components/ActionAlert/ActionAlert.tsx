import React, { useEffect, useState } from 'react';
import './ActionAlert.scss';

type Props = {
  isRequired: boolean;
};

const ActionAlert = React.memo(({ isRequired }: Props) => {
  const [isClosed, setIsClosed] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsClosed(false);
    }, 3000);

    return () => clearTimeout(timeout);
  }, [isClosed]);

  if (!isRequired) return null;
  return (
    <>
      {isClosed ? null : (
        <div className="ActionAlert">
          <button
            className="ActionAlert__close"
            onClick={() => setIsClosed(true)}
          >
            x
          </button>
          <p>Immediate Action Required!!!</p>
        </div>
      )}
    </>
  );
});

export default ActionAlert;
