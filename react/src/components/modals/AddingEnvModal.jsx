import ReactModal from 'react-modal';
import { useState } from 'react';
import InputBox from '../atom/InputBox';
import TextButton from '../atom/TextButton';

function AddingEnvModal({
  modalOpen,
  setModalOpen,
  savedEnvs,
  setContainorsData,
  containorIndex,
}) {
  /* overlay는 모달 창 바깥 부분을 처리하는 부분이고,
  content는 모달 창부분이라고 생각하면 쉬울 것이다 */
  const customModalStyles = {
    overlay: {
      backgroundColor: ' rgba(0, 0, 0, 0.4)',
      width: '100%',
      height: '100vh',
      zIndex: '10',
      position: 'fixed',
      top: '0',
      left: '0',
    },
    content: {
      width: '500px',
      height: '350px',
      zIndex: '150',
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      borderRadius: '25px',
      boxShadow: '2px 2px 2px rgba(0, 0, 0, 0.25)',
      backgroundColor: 'white',
      justifyContent: 'center',
      overflow: 'auto',
    },
  };

  const [envData, setEnvData] = useState({
    name: '',
    key: '',
  });
  return (
    <ReactModal
      isOpen={modalOpen}
      onRequestClose={() => setModalOpen(false)}
      style={customModalStyles}
      ariaHideApp={false}
      contentLabel="Pop up Message"
      shouldCloseOnOverlayClick={false}
    >
      <div className="w-full">
        <span className="font-bold text-lg mb-4 text-center w-[458px] block">
          환경 변수 추가
        </span>
        <div className="flex flex-col items-start justify-start ml-4">
          <span className="font-bold text-lg leading-[30px] mr-4">이름 *</span>
          <InputBox
            type="text"
            placeholder="이름 *"
            isError={false}
            moreStyle="w-[400px] h-[30px]"
            onChange={(e) => {
              setEnvData((prev) => ({
                ...prev,
                name: e.target.value,
              }));
            }}
          />
          <span className="font-bold text-lg leading-[30px] mr-4 mt-4">
            환경변수 *
          </span>

          <textarea
            type="password"
            placeholder="환경변수 *"
            className="block px-4 py-3 outline-none rounded-lg w-[400px] h-[100px] text-xl font-medium border-pcGray border-solid border-[2px]"
            onChange={(e) => {
              setEnvData((prev) => ({
                ...prev,
                key: e.target.value,
              }));
            }}
          />
        </div>
        <div className="flex justify-center mt-8">
          <TextButton
            moreStyle="w-[100px] h-[25px] leading-[25px] rounded-xl mr-2"
            color="dark"
            handleClick={(e) => {
              // 서버에 데이터 전달 성공하면 상태 값 반영
              setContainorsData((prev) => {
                const tempContainorData = prev.map(
                  (
                    {
                      templateTitle,
                      containorStack,
                      subdomain,
                      envVars,
                      containorFile,
                      defaultSubDomain,
                    },
                    tempIndex,
                  ) => ({
                    templateTitle,
                    containorStack,
                    subdomain,
                    envVars: envVars.map((item) => ({ ...item })), // 배열 깊은 복사
                    containorFile,
                    defaultSubDomain,
                  }),
                );
                tempContainorData[containorIndex].envVars.push(envData.name);
                return tempContainorData;
              });
              setModalOpen(false);
            }}
          >
            저장
          </TextButton>
          <TextButton
            moreStyle="w-[100px] h-[25px] leading-[25px] rounded-xl ml-2"
            color="dark"
            handleClick={() => {
              setModalOpen(false);
            }}
          >
            취소
          </TextButton>
        </div>
      </div>
    </ReactModal>
  );
}
export default AddingEnvModal;
