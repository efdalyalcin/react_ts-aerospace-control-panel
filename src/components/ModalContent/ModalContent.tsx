import './ModalContent.scss';

type Props = {
  onPostpone: () => void;
  closeModalWithAction: () => void;
};

export default function ModalContent({
  onPostpone,
  closeModalWithAction,
}: Props) {
  return (
    <div className="ModalContent__wrapper" onClick={onPostpone}>
      <div className="ModalContent" onClick={(e) => e.stopPropagation()}>
        <button className="ModalContent__close" onClick={onPostpone}>
          X
        </button>
        <p className="ModalContent__text">Immediate Action Required!!!</p>
        <div className="ModalContent__buttons">
          <button
            type="button"
            className="ModalContent__button ModalContent__postpone-button"
            onClick={onPostpone}
          >
            Postpone
          </button>
          <button
            type="button"
            className="ModalContent__button ModalContent__action-button"
            onClick={closeModalWithAction}
          >
            Take Action
          </button>
        </div>
      </div>
    </div>
  );
}
