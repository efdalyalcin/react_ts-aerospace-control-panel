import React, { useCallback, useEffect, useState } from 'react';
import './ActionAlert.scss';
import { createPortal } from 'react-dom';
import ModalContent from '@/components/ModalContent/ModalContent';
import { getActOnSpectrum } from '@/services/getActOnSpectrum';

type Props = {
  isRequired: boolean;
};

const ActionAlert = React.memo(({ isRequired }: Props) => {
  const [isCloseClicked, setIsCloseClicked] = useState(false);
  const [showModal, setShowModal] = useState(isRequired);
  const [timesPostponed, setTimesPostponed] = useState(0);

  // this is for the close button without action, it brings back the modal after 3s
  // opens directly in the first error
  useEffect(() => {
    if (timesPostponed === 0 && isRequired) {
      setShowModal(true);
    }

    if (isRequired && isCloseClicked) {
      const timeout = setTimeout(() => {
        setIsCloseClicked(false);
        setShowModal(true);
        // since it is an async operation previous state is important
        setTimesPostponed((prev) => prev + 1);
      }, 3000);

      return () => clearTimeout(timeout);
    }
    // timesPostponed only triggers with the closeClick so it is not in the dependency
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isCloseClicked, isRequired]);

  const postponeWarning = useCallback(() => {
    if (timesPostponed <= 5) {
      setIsCloseClicked(true);
      setShowModal(false);
    }
  }, [timesPostponed]);

  const closeModalWithAction = useCallback(async () => {
    const postRequest = await getActOnSpectrum();
    console.log('Action taken ===> ', postRequest);
    setShowModal(false);
    setTimesPostponed(0);
  }, []);

  return (
    <>
      {showModal
        ? createPortal(
            <ModalContent
              onPostpone={postponeWarning}
              closeModalWithAction={closeModalWithAction}
            />,
            document.getElementById('modal')!
          )
        : null}
    </>
  );
});

export default ActionAlert;
