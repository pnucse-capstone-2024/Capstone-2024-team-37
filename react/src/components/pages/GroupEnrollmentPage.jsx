import { BsFillInboxesFill } from 'react-icons/bs';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import { useQueryClient } from '@tanstack/react-query';
import InputBox from '../atom/InputBox';
import TextButton from '../atom/TextButton';
import enrollGroup from '../../apis/group';

const groupId = 1;

function GroupEnrollmentPage() {
  const [groupData, setGroupData] = useState({
    title: '',
    desc: '',
  });
  const notify = (message) => {
    toast.info(message);
  };

  const navigate = useNavigate();
  const queryClient = useQueryClient();

  return (
    <div className="flex flex-col w-[1280px] h-[850px] mx-auto relative">
      <ToastContainer
        position="top-center" // 알람 위치 지정
        autoClose={3000} // 자동 off 시간
        hideProgressBar={false} // 진행시간바 숨김
        closeOnClick // 클릭으로 알람 닫기
        rtl={false} // 알림 좌우 반전
        pauseOnFocusLoss // 화면을 벗어나면 알람 정지
        draggable // 드래그 가능
        pauseOnHover // 마우스를 올리면 알람 정지
        theme="dark"
        // limit={1} // 알람 개수 제한
      />
      <div className="flex items-center justify-between mt-36">
        <div className="flex items-center ml-12">
          <BsFillInboxesFill size="1.3rem" className="leading-[1.3rem] mr-3" />
          <InputBox
            type="text"
            placeholder="그룹 명 *"
            isError={false}
            moreStyle="w-[400px] h-[40px]"
            onChange={(e) => {
              setGroupData((prev) => ({
                ...prev,
                title: e.target.value,
              }));
            }}
          />
        </div>
      </div>
      <hr className="w-[1136px] mx-auto mr-24 h-[3px] bg-pcLightBlack mt-6" />
      <div className="flex items-center ml-12 mt-8">
        <span className="font-bold text-xl mr-2">그룹 설명</span>
      </div>
      <textarea
        type="text"
        placeholder="그룹 설명을 적어주세요"
        className="block px-4 py-3 outline-none rounded-lg w-[900px] h-[250px] ml-12 mt-2 text-xl font-medium border-pcGray border-solid border-[2px]"
        onChange={(e) => {
          setGroupData((prev) => ({
            ...prev,
            desc: e.target.value,
          }));
        }}
      />

      <TextButton
        color="light"
        moreStyle="w-[250px] h-[45px] leading-[45px] text-lg mb-6 absolute bottom-4 right-24"
        handleClick={async () => {
          try {
            if (groupData.title === '') {
              notify('그룹 이름을 입력하세요,');
              return;
            }
            const response = await enrollGroup({
              title: groupData.title,
              desc: groupData.desc,
            });

            await queryClient.invalidateQueries(['navList']);
            notify('그룹이 생성 되었습니다.');
            navigate('/home');
            // navigate(`/group/${groupId}`);
          } catch (e) {
            console.log(e);
          }
        }}
      >
        저장
      </TextButton>
    </div>
  );
}

export default GroupEnrollmentPage;
