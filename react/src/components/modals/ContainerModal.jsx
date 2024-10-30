import React from 'react';
import ReactModal from 'react-modal';

function ContainerModal({ modalOpen, setModalOpen, message }) {
  const customModalStyles = {
    overlay: {
      backgroundColor: 'rgba(0, 0, 0, 0.4)',
      width: '100%',
      height: '100vh',
      zIndex: '10',
      position: 'fixed',
      top: '0',
      left: '0',
    },
    content: {
      width: '500px',
      height: '200px',
      zIndex: '150',
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      borderRadius: '25px',
      boxShadow: '2px 2px 8px rgba(0, 0, 0, 0.25)',
      backgroundColor: 'white',
      overflow: 'hidden',
      padding: '20px', // 내부 여백 추가
    },
  };

  return (
    <ReactModal
      isOpen={modalOpen}
      onRequestClose={() => {
        setModalOpen(false);
      }}
      style={customModalStyles}
      ariaHideApp={false}
      contentLabel="Pop up Message"
      shouldCloseOnOverlayClick
    >
      <div className="flex flex-col items-center justify-center h-full space-y-4">
        <h2 className="text-2xl font-semibold text-gray-800">알림</h2>
        <p className="text-gray-600 text-center">{message}</p>

        <button
          onClick={() => {
            setModalOpen(false);
          }}
          className="px-4 py-2 bg-blue-500 text-white font-semibold rounded-md shadow hover:bg-blue-600 transition-colors duration-200"
          type="button"
        >
          닫기
        </button>
      </div>
    </ReactModal>
  );
}

export default ContainerModal;
