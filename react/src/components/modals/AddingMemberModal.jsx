import ReactModal from 'react-modal';
import { useEffect, useState } from 'react';
import InputBox from '../atom/InputBox';
import TextButton from '../atom/TextButton';
import { getGroupById, inviteGroupMember } from '../../apis/group';

function AddingMemberModal({
  modalOpen,
  setModalOpen,
  groupId,
  setMemberData,
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
      width: '360px',
      height: '230px',
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

  const [email, setEmail] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    setErrorMessage('');
  }, []);
  return (
    <ReactModal
      isOpen={modalOpen}
      onRequestClose={() => setModalOpen(false)}
      style={customModalStyles}
      ariaHideApp={false}
      contentLabel="Pop up Message"
      shouldCloseOnOverlayClick={false}
    >
      <div className="flex flex-col items-center justify-start">
        <span className="font-bold text-lg mb-4">멤버 초대</span>
        <div className="flex items-center">
          <span className="font-bold text-md leading-[30px] mr-4">Email</span>
          <InputBox
            type="email"
            placeholder="이메일 *"
            isError={errorMessage !== ''}
            errorMessage={errorMessage}
            moreStyle="w-[220px] leading-[30px]"
            onChange={(e) => {
              setEmail(e.target.value);
              if (e.target.value === '') setErrorMessage('');
            }}
          />
        </div>
        <div className="flex justify-center mt-8">
          <TextButton
            moreStyle="w-[100px] h-[25px] leading-[25px] rounded-xl mr-2"
            color="dark"
            handleClick={async () => {
              try {
                await inviteGroupMember(groupId, email); // 비동기 작업이 완료될 때까지 대기
                const { data } = await getGroupById(groupId);
                setMemberData(data.data.groupParticipants);
                setModalOpen(false); // 작업이 완료된 후 모달 닫기
              } catch (e) {
                setErrorMessage('초대에 실패하였습니다');
                console.log(e); // 오류 처리
              }
            }}
          >
            초대
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
export default AddingMemberModal;
