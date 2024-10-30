import { useEffect, useState } from 'react';
import { BsFillInboxesFill } from 'react-icons/bs';
import { useNavigate, useParams } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import { useQueryClient } from '@tanstack/react-query';
import InputBox from '../atom/InputBox';
import TextButton from '../atom/TextButton';
import checkDuplicatedDomain, {
  createProjectOneStep,
} from '../../apis/project';
import { getGroupById } from '../../apis/group';

function ProjectEnrollmentPage() {
  const { groupId } = useParams();
  const navigate = useNavigate();
  const [groupName, setGroupName] = useState('');
  const [proejctData, setProjectData] = useState({
    title: '',
    desc: '',
    domainName: '',
    projectType: 'PUBLIC',
  });
  const [isDuplicateCheck, setIsDuplicateCheck] = useState(false);
  const queryClient = useQueryClient();
  const notify = (message) => {
    toast.error(message);
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await getGroupById(groupId);
        setGroupName(data.data.groupName);
      } catch (e) {
        console.log(e);
      }
    };

    fetchData();
  }, [groupId]);

  return (
    <div className="flex flex-col justify-start w-[1280px] mx-auto relative h-full">
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
          <span className="font-bold text-2xl mr-2">{groupName}</span>
        </div>
      </div>
      <hr className="w-[1136px] mx-auto mr-24 h-[3px] bg-pcLightBlack mt-2" />
      <div className="flex flex-col items-center mt-16">
        <div className="w-[700px]">
          <span className="font-bold text-2xl">프로젝트명 *</span>
          <InputBox
            type="text"
            placeholder="프로젝트명 *"
            isError={false}
            moreStyle="w-[400px] leading-[30px] mr-2 mt-2"
            onChange={(e) => {
              setProjectData((prev) => ({
                ...prev,
                title: e.target.value,
              }));
            }}
          />
        </div>

        <div className="w-[700px] mt-10">
          <span className="font-bold text-2xl">프로젝트 설명</span>
          <textarea
            type="text"
            placeholder="프로젝트 설명을 적어주세요"
            className="block px-4 py-3 outline-none rounded-lg w-[700px] h-[150px] mt-2 text-xl font-medium border-pcGray border-solid border-[2px]"
            onChange={(e) => {
              setProjectData((prev) => ({
                ...prev,
                desc: e.target.value,
              }));
            }}
          />
        </div>

        <div className="w-[700px] mt-8">
          <span className="font-bold text-2xl">도메인명 *</span>
          <div className="flex items-end relative mt-2">
            <InputBox
              type="text"
              placeholder="도메인 주소*"
              isError={false}
              moreStyle="w-[400px] leading-[30px] mr-2"
              textMoreStyle="pr-32"
              disabled={isDuplicateCheck}
              onChange={(e) => {
                setProjectData((prev) => ({
                  ...prev,
                  domainName: e.target.value,
                }));
              }}
            />
            <span className="font-bold text-xl">.pun.app</span>
            <div className="absolute right-[310px] top-[14px]">
              <TextButton
                color="dark"
                moreStyle="w-[100px]  leading-[25px] rounded-xl text-sm"
                handleClick={async () => {
                  try {
                    await checkDuplicatedDomain(proejctData.domainName);
                    setIsDuplicateCheck(true);
                  } catch (e) {
                    console.log(e);
                  }
                }}
                disabled={isDuplicateCheck}
              >
                중복 확인
              </TextButton>
            </div>
          </div>
        </div>

        <div className="w-[700px] mt-8">
          <span className="font-bold text-2xl">프로젝트 권한 설정</span>
          <div className="mt-2">
            <label className="inline-flex items-center">
              <input
                type="checkbox"
                className="appearance-none w-[20px] h-[20px] bg-gray-400/50 rounded-md checked:bg-blue-500 checked:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                checked={proejctData.projectType === 'PUBLIC'}
                onChange={() => {
                  setProjectData((prev) => ({
                    ...prev,
                    projectType: 'PUBLIC',
                  }));
                }}
              />
              <span className="ml-2 text-gray-700">Public</span>
            </label>
            <label className="inline-flex items-center">
              <input
                type="checkbox"
                className="appearance-none w-[20px] h-[20px] bg-gray-400/50 rounded-md checked:bg-blue-500 checked:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ml-4"
                checked={proejctData.projectType === 'PRIVATE'}
                onChange={() => {
                  setProjectData((prev) => ({
                    ...prev,
                    projectType: 'PRIVATE',
                  }));
                }}
              />
              <span className="ml-2 text-gray-700">Private</span>
            </label>
          </div>
        </div>
      </div>

      <TextButton
        color="light"
        moreStyle="w-[250px] h-[45px] leading-[45px] text-lg mb-6 absolute bottom-4 right-24"
        handleClick={async () => {
          try {
            if (proejctData.title === '') {
              notify('프로젝트 이름은 필수입니다');
              return;
            }
            const { data } = await createProjectOneStep(groupId, {
              domain: proejctData.domainName,
              projectName: proejctData.title,
              projectDescription: proejctData.desc,
              projectType: proejctData.projectType,
            });
            await queryClient.invalidateQueries(['navList']);
            navigate(`/group/${groupId}/project/${data.data.projectId}`);
          } catch (e) {
            console.log(e);
          }
        }}
        disabled={!isDuplicateCheck}
      >
        다음
      </TextButton>
    </div>
  );
}

export default ProjectEnrollmentPage;
