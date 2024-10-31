import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { BsBox } from 'react-icons/bs';
import { BiSolidPencil } from 'react-icons/bi';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { toast, ToastContainer } from 'react-toastify';
import TextButton from '../atom/TextButton';
import InputBox from '../atom/InputBox';
import MemberManagement from '../organisms/MemberManagement';
import { deleteProejctById, getProjectDataById } from '../../apis/project';
import ContainorBox from '../molecules/ContainorBox';
import ContainorDetailBox from '../molecules/ContainorDetailBox';

import ReactImg from '../../assets/ReactImg.png';
import angular from '../../assets/angular.png';
import html from '../../assets/html.png';
import nextjs from '../../assets/nextjs.png';
import vue from '../../assets/vue.png';

import nodejs from '../../assets/nodejs.png';
import springboot from '../../assets/springboot.png';
import php from '../../assets/php.png';
import flask from '../../assets/flask.png';
import fastapi from '../../assets/fastapi.png';

import mysql from '../../assets/mysql.png';
import postgresql from '../../assets/postgresql.png';
import mongodb from '../../assets/mongodb.png';
import sqlite from '../../assets/sqlite.png';

import consoleImg from '../../assets/consoleImg.png';
import postContainor, { getProjectContainerData } from '../../apis/containor';
import { getGroupById } from '../../apis/group';

function ProjectPage() {
  const queryClient = useQueryClient();
  const notify = (message) => {
    toast.error(message);
  };

  const { groupId } = useParams();
  const { projectId } = useParams();

  const navigate = useNavigate();
  const { data, isError, isLoading, refetch } = useQuery({
    queryKey: ['containerData', projectId], // projectId를 queryKey에 포함
    queryFn: ({ queryKey }) => {
      const [, tempProjectId] = queryKey; // queryKey에서 projectId 추출
      return getProjectContainerData(tempProjectId); // 추출된 projectId를 함수에 전달
    },
  });

  const [groupData, setGroupData] = useState({
    title: '',
    desc: '',
  });
  const [defaultDomain, setDefaultDomain] = useState('');
  const [titleEdit, setTitleEdit] = useState(false);
  const [descEdit, setDescEdit] = useState(false);
  const [memberData, setMemberData] = useState([]);

  const [projectData, setProjectData] = useState({
    title: '',
    desc: ``,
  });

  const [selectedContainorTypeIndex, setSelectedContainorTypeIndex] =
    useState(0);
  const [hasDefaultSubDomain, setHasDefaultSubDomain] = useState(false);
  const [containorsData, setContainorsData] = useState([]);
  const [isExistContainer, setIsExistContaier] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const response = await getProjectDataById(projectId);

      const groupResponse = await getGroupById(groupId);
      setGroupData({
        title: groupResponse.data.data.groupName,
        desc: groupResponse.data.data.groupDescription,
      });

      setProjectData({
        title: response.data.data.projectName,
        desc: response.data.data.projectDescription,
      });
      setMemberData(response.data.data.participants);
      setDefaultDomain(response.data.data.projectDefaultDomain);
      setTitleEdit(false);
      setDescEdit(false);
      setSelectedContainorTypeIndex(0);
      setHasDefaultSubDomain(false);
      setContainorsData([]);
    };
    fetchData();
  }, [projectId]);

  useEffect(() => {
    if (!isLoading) {
      console.log(data);
      setIsExistContaier(data.length !== 0);
    }
  }, [data, isLoading, projectId]);

  useEffect(() => {
    refetch();
  }, [projectId]);

  console.log(data);
  return (
    <div className="flex flex-col w-[1280px]  mx-auto relative">
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

      <div className="flex items-center justify-between mt-24 w-[1280px]">
        <div className="flex items-center justify-between  ml-12 w-full">
          <div className="flex items-center ">
            <BsBox size="1.3rem" className="leading-[1.3rem] mr-3" />
            <span className="font-bold text-2xl">{groupData.title}/</span>
            {titleEdit ? (
              <InputBox
                type="text"
                placeholder="프로젝트 명 *"
                isError={false}
                moreStyle="w-[400px] laeding-[40px] mr-2 font-bold"
                textMoreStyle="py-[2px]"
                onChange={() => {
                  console.log('프로젝트 명');
                }}
                defaultValue={projectData.title}
              />
            ) : (
              <span className="font-bold text-2xl mr-2">
                {projectData.title}
              </span>
            )}
            {titleEdit || (
              <button
                type="button"
                aria-label="프로젝트 제목 수정"
                onClick={() => {
                  setTitleEdit(true);
                }}
              >
                <BiSolidPencil
                  size="1.3rem"
                  className="leading-[1.3rem] mr-6"
                />
              </button>
            )}
            {titleEdit && (
              <TextButton
                moreStyle="w-[100px] h-[35px] leading-[35px] rounded-xl"
                color="dark"
                handleClick={() => {
                  setTitleEdit(false);
                }}
              >
                <span className="text-white text-md">저장</span>
              </TextButton>
            )}
          </div>
          <TextButton
            moreStyle="w-[150px] h-[35px] leading-[35px] rounded-xl mr-24"
            color="dark"
            handleClick={async () => {
              try {
                await deleteProejctById(projectId);
                navigate(`/group/${groupId}`);
                queryClient.invalidateQueries('navList');
              } catch (e) {
                console.log(e);
              }
            }}
          >
            <span className="text-white text-md">프로젝트 삭제</span>
          </TextButton>
        </div>
      </div>
      <hr className="w-[1136px] mx-auto mr-24 h-[3px] bg-pcLightBlack mt-2" />
      <div className="flex items-center ml-12 mt-8">
        <span className="font-bold text-xl mr-2">프로젝트 설명</span>
        {descEdit || (
          <button
            type="button"
            aria-label="프로젝트 설명"
            onClick={() => {
              setDescEdit(true);
            }}
          >
            <BiSolidPencil size="1.3rem" className="leading-[1.3rem] mr-6" />
          </button>
        )}

        {descEdit && (
          <TextButton
            moreStyle="w-[100px] h-[35px] rounded-xl"
            color="dark"
            handleClick={() => {
              console.log('저장');
              setDescEdit(false);
            }}
          >
            <span className="text-white text-md leading-[35px]">저장</span>
          </TextButton>
        )}
      </div>
      {descEdit ? (
        <div>
          <textarea
            type="text"
            placeholder="프로젝트 설명을 적어주세요"
            className="block px-4 py-3 outline-none rounded-lg w-[900px] h-[250px] ml-12 mt-2 text-xl font-medium border-pcGray border-solid border-[2px]"
            onChange={() => {
              console.log('프로젝트 설명을 적어주세요');
            }}
            defaultValue={projectData.desc}
          />
        </div>
      ) : (
        <span className="w-[900px] ml-12 mt-2 text-xl font-medium">
          {projectData.desc}
        </span>
      )}

      <span className="font-bold text-xl ml-12 mt-12">프로젝트 멤버</span>
      <div className="ml-12 mt-1">
        <MemberManagement
          type="project"
          memberData={memberData}
          groupId={groupId}
          setMemberData={setMemberData}
        />
      </div>

      <div className="mt-4 w-[1000px] mb-4">
        <div className="flex flex-col w-[1280px] mx-auto relative">
          <hr className="w-[1136px] mx-auto mr-24 h-[3px] bg-pcLightBlack my-2" />

          <div className="flex items-center">
            <span className="font-bold text-xl ml-12">컨테이너 관리</span>
            {!isExistContainer && (
              <TextButton
                moreStyle="w-[100px] h-[35px] leading-[35px] rounded-xl ml-4"
                color="dark"
                handleClick={async () => {
                  // 예외 처리 해야 함

                  const templateTitleIndex = containorsData.findIndex(
                    (container) => container.templateTitle === '',
                  );

                  if (templateTitleIndex !== -1) {
                    notify('모든 컨테이너의 제목을 작성해주세요');
                    return;
                  }

                  const fileIndex = containorsData.findIndex(
                    (container) =>
                      container.containorFile === null &&
                      container.containorStack !== 'PostgreSQL' &&
                      container.containorStack !== 'FastAPI' &&
                      container.containorStack !== 'MYSQL' &&
                      container.containorStack !== 'SQLite' &&
                      container.containorStack !== 'MongoDB',
                  );

                  if (fileIndex !== -1) {
                    notify('모든 컨테이너에 필수 파일을 업로드 해주세요');
                    return;
                  }
                  // formdata 형성
                  const formdata = new FormData();
                  const jsonData = {
                    projectId,
                    templates: containorsData.map((container) => ({
                      templateTitle: container.templateTitle,
                      subdomain: `${container.subdomain}.${defaultDomain}`,
                      envVars: container.envVars.reduce((acc, item) => {
                        acc[item.key] = item.value;
                        return acc;
                      }, {}),
                      containerStack: container.containorStack,
                    })),
                  };

                  formdata.append(
                    'projectData',
                    new Blob([JSON.stringify(jsonData)], {
                      type: 'application/json',
                    }),
                  );
                  const files = {};

                  for (let i = 0; i < containorsData.length; i += 1) {
                    const { subdomain } = containorsData[i];
                    const { containorFile } = containorsData[i];
                    formdata.append(
                      `${subdomain}.${defaultDomain}`,
                      containorFile,
                    );
                  }

                  await postContainor(formdata);

                  await refetch();
                }}
              >
                <span className="text-white text-md">저장</span>
              </TextButton>
            )}
          </div>
          {isLoading ? (
            <div>Loading</div>
          ) : (
            <div>
              <div className="flex ml-14 mt-6">
                <button
                  type="button"
                  onClick={() => {
                    setSelectedContainorTypeIndex(0);
                  }}
                >
                  <span
                    className={`text-md font-bold mr-6 ${selectedContainorTypeIndex === 0 && 'underline underline-offset-4 decoration-blue-300 text-blue-500'}`}
                  >
                    프론트엔드
                  </span>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setSelectedContainorTypeIndex(1);
                  }}
                >
                  <span
                    className={`text-md font-bold mr-6 ${selectedContainorTypeIndex === 1 && 'underline underline-offset-4 decoration-blue-300 text-blue-500'}`}
                  >
                    백엔드
                  </span>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setSelectedContainorTypeIndex(2);
                  }}
                >
                  <span
                    className={`text-md font-bold mr-6  ${selectedContainorTypeIndex === 2 && 'underline underline-offset-4 decoration-blue-300 text-blue-500'}`}
                  >
                    데이터베이스
                  </span>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setSelectedContainorTypeIndex(3);
                  }}
                >
                  <span
                    className={`text-md font-bold mr-6   ${selectedContainorTypeIndex === 3 && 'underline underline-offset-4 decoration-blue-300 text-blue-500'}`}
                  >
                    ETC
                  </span>
                </button>
              </div>

              <div>
                {selectedContainorTypeIndex === 0 && (
                  <div className="grid grid-cols-3 gap-x-24 gap-y-4 ml-12 mt-4 w-[1000px]">
                    <ContainorBox
                      setContainorsData={setContainorsData}
                      stackImg={html}
                      stackName="HTML5"
                      isExistContainer={isExistContainer}
                    />
                    <ContainorBox
                      setContainorsData={setContainorsData}
                      stackImg={ReactImg}
                      stackName="React"
                      isExistContainer={isExistContainer}
                    />
                    <ContainorBox
                      setContainorsData={setContainorsData}
                      stackImg={vue}
                      stackName="Vue.js"
                      isExistContainer={isExistContainer}
                    />
                    <ContainorBox
                      setContainorsData={setContainorsData}
                      stackImg={angular}
                      stackName="Angular"
                      isExistContainer={isExistContainer}
                    />
                    <ContainorBox
                      setContainorsData={setContainorsData}
                      stackImg={nextjs}
                      stackName="Next.js"
                      isExistContainer={isExistContainer}
                    />
                  </div>
                )}
                {selectedContainorTypeIndex === 1 && (
                  <div className="grid grid-cols-3 gap-x-24 gap-y-4 ml-12 mt-4 w-[1000px]">
                    <ContainorBox
                      setContainorsData={setContainorsData}
                      stackImg={nodejs}
                      stackName="Node.js"
                      isExistContainer={isExistContainer}
                    />
                    <ContainorBox
                      setContainorsData={setContainorsData}
                      stackImg={springboot}
                      stackName="Spring Boot"
                      isExistContainer={isExistContainer}
                    />
                    <ContainorBox
                      setContainorsData={setContainorsData}
                      stackImg={php}
                      stackName="PHP"
                      isExistContainer={isExistContainer}
                    />
                    <ContainorBox
                      setContainorsData={setContainorsData}
                      stackImg={flask}
                      stackName="Flask"
                      isExistContainer={isExistContainer}
                    />
                    <ContainorBox
                      setContainorsData={setContainorsData}
                      stackImg={fastapi}
                      stackName="FastAPI"
                      isExistContainer={isExistContainer}
                    />
                  </div>
                )}
                {selectedContainorTypeIndex === 2 && (
                  <div className="grid grid-cols-3 gap-x-24 gap-y-4 ml-12 mt-4 w-[1000px]">
                    <ContainorBox
                      setContainorsData={setContainorsData}
                      stackImg={mysql}
                      stackName="MYSQL"
                      isExistContainer={isExistContainer}
                    />
                    <ContainorBox
                      setContainorsData={setContainorsData}
                      stackImg={postgresql}
                      stackName="PostgreSQL"
                      isExistContainer={isExistContainer}
                    />
                    <ContainorBox
                      setContainorsData={setContainorsData}
                      stackImg={mongodb}
                      stackName="MongoDB"
                      isExistContainer={isExistContainer}
                    />
                    <ContainorBox
                      setContainorsData={setContainorsData}
                      stackImg={sqlite}
                      stackName="SQLite"
                      isExistContainer={isExistContainer}
                    />
                  </div>
                )}
                {selectedContainorTypeIndex === 3 && (
                  <div className="grid grid-cols-3 gap-x-24 gap-y-4 ml-12 mt-4 w-[1000px]">
                    <ContainorBox
                      setContainorsData={setContainorsData}
                      stackImg={consoleImg}
                      stackName="Console"
                      isExistContainer={isExistContainer}
                    />
                  </div>
                )}
                {/* 추가 ContainorBox 컴포넌트들 */}
              </div>
              <hr className="w-[1100px] ml-12 bg-pcGray mb-3 mt-5" />
              <div className="ml-12">
                {data.length !== 0 &&
                  data.map((containorData, index) => (
                    <ContainorDetailBox
                      key={containorData.containorStack}
                      containorData={containorData}
                      containorIndex={index}
                      defaultDomain={defaultDomain}
                      hasDefaultSubDomain={hasDefaultSubDomain}
                      setHasDefaultSubDomain={setHasDefaultSubDomain}
                      isExistContainer={isExistContainer}
                    />
                  ))}
                {data.length === 0 &&
                  containorsData.map((containorData, index) => (
                    <ContainorDetailBox
                      key={containorData.containorStack}
                      containorData={containorData}
                      setContainorsData={setContainorsData}
                      containorIndex={index}
                      defaultDomain={defaultDomain}
                      hasDefaultSubDomain={hasDefaultSubDomain}
                      setHasDefaultSubDomain={setHasDefaultSubDomain}
                      isExistContainer={isExistContainer}
                    />
                  ))}

                {/* <ContainorDetailBox /> */}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ProjectPage;
