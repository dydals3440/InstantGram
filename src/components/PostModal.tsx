import CloseIcon from './ui/icons/CloseIcon';

type Props = {
  children: React.ReactNode;
  onClose: () => void;
};

export default function PostModal({ onClose, children }: Props) {
  return (
    <section
      className='fixed top-0 left-0 flex flex-col justify-center items-center z-50 w-full h-full bg-neutral-900/70'
      onClick={(event) => {
        // 외부 섹션태그 클릭했을 떄
        if (event.target === event.currentTarget) {
          onClose();
        }
      }}
    >
      <button
        className='fixed top-0 right-0 p-8 text-white'
        onClick={() => onClose()}
      >
        <CloseIcon />
      </button>
      <div className='bg-white w-4/5 h-3/5 max-w-7xl'>{children}</div>
    </section>
  );
}
