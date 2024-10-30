import { useEffect, useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import { BsCaretDownFill } from 'react-icons/bs';
import { BiCloud } from 'react-icons/bi';
import { AiFillPushpin } from 'react-icons/ai';
import { useParams } from 'react-router-dom';
import { useQueryClient } from '@tanstack/react-query';
import InputBox from '../atom/InputBox';
import EnvBox from '../atom/EnvBox';
import UploadBox from '../atom/UploadBox';
import TextButton from '../atom/TextButton';
import { deleteContainerById } from '../../apis/containor';
import ContainerModal from '../modals/ContainerModal';

function ContainorDetailBox({
  containorData,
  setContainorsData,
  containorIndex,
  defaultDomain,
  hasDefaultSubDomain,
  setHasDefaultSubDomain,
  isExistContainer,
}) {
  const queryClient = useQueryClient();
  const { projectId } = useParams();
  const notify = (message) => {
    toast.error(message);
  };

  const [isOpenContainerDescModal, setIsOpenContainerDescModal] =
    useState(false);

  const [containerMessage, setContainerMessage] = useState('');

  useEffect(() => {
    if (
      containorData?.containorStack === 'FastAPI' ||
      containorData?.containorStack === 'MYSQL' ||
      containorData?.containorStack === 'PostgreSQL' ||
      containorData?.containorStack === 'MongoDB' ||
      containorData?.containorStack === 'SQLite'
    )
      setContainerMessage(
        'DB 관련 컨테이너에는 파일 업로드가 필요하지 않습니다. 필수 환경 변수를 입력해 주세요.',
      );
    else setContainerMessage('파일과 사용하실 환경 변수를 입력해 주세요.');
  }, []);

  const [versions] = useState(() => {
    if (containorData?.containorStack === null) return [];
    if (containorData?.containorStack.includes('React')) {
      return ['React 18.0.2', 'React 18.0', 'React 16.0.2'];
    }
    if (containorData.containorStack.includes('Vue')) {
      return ['Vue2'];
    }
    if (containorData.containorStack.includes('HTML')) {
      return ['HTML5'];
    }
    if (containorData.containorStack.includes('Angular')) {
      return ['Angular17'];
    }
    if (containorData.containorStack.includes('Next.js')) {
      return ['Next.js14'];
    }

    if (containorData.containorStack.includes('Node.js')) {
      return ['Node.js20'];
    }
    if (containorData.containorStack.includes('Spring Boot')) {
      return ['Spring Boot 6.0'];
    }
    if (containorData.containorStack.includes('PHP')) {
      return ['PHP7.0'];
    }
    if (containorData.containorStack.includes('Flask')) {
      return ['Flask3.6'];
    }
    if (containorData.containorStack.includes('FastAPI')) {
      return ['FastAPI'];
    }

    if (containorData.containorStack.includes('MYSQL')) {
      return ['MYSQL'];
    }
    if (containorData.containorStack.includes('PostgreSQL')) {
      return ['PostgreSQL'];
    }
    if (containorData.containorStack.includes('MongoDB')) {
      return ['MongoDB'];
    }
    if (containorData.containorStack.includes('SQLite')) {
      return ['SQLite'];
    }

    if (containorData.containorStack.includes('Console')) {
      return ['Console'];
    }
    return [];
  });
  const [selectedIndex, setSelectedIndex] = useState(() => {
    if (containorData?.containorStack === null) return 0;
    if (containorData.containorStack.includes('React')) {
      if (containorData.containorStack === 'React 18.0.2') return 0;
      if (containorData.containorStack === 'React 18.0') return 1;
      if (containorData.containorStack === 'React 16.0.2') return 2;
      return 0;
    }
    if (containorData.containorStack.includes('Vue')) {
      if (containorData.containorStack === 'Vue2') return 0;
      return 0;
    }
    if (containorData.containorStack.includes('HTML')) {
      if (containorData.containorStack === 'HTML5') return 0;
      return 0;
    }
    if (containorData.containorStack.includes('Angular')) {
      if (containorData.containorStack === 'Angular17') return 0;
      return 0;
    }
    if (containorData.containorStack.includes('Next.js')) {
      if (containorData.containorStack === 'Next.js14') return 0;
      return 0;
    }

    if (containorData.containorStack.includes('Node.js')) {
      if (containorData.containorStack === 'Node.js20') return 0;
      return 0;
    }
    if (containorData.containorStack.includes('Spring Boot')) {
      if (containorData.containorStack === 'Spring Boot 6.0') return 0;
      return 0;
    }
    if (containorData.containorStack.includes('PHP')) {
      if (containorData.containorStack === 'PHP7.0') return 0;
      return 0;
    }
    if (containorData.containorStack.includes('Flask')) {
      if (containorData.containorStack === 'Flask3.6') return 0;
      return 0;
    }
    if (containorData.containorStack.includes('FastAPI')) {
      if (containorData.containorStack === 'FastAPI') return 0;
      return 0;
    }

    if (containorData.containorStack.includes('MYSQL')) {
      if (containorData.containorStack === 'MYSQL') return 0;
      return 0;
    }
    if (containorData.containorStack.includes('PostgreSQL')) {
      if (containorData.containorStack === 'PostgreSQL') return 0;
      return 0;
    }
    if (containorData.containorStack.includes('MongoDB')) {
      if (containorData.containorStack === 'MongoDB') return 0;
      return 0;
    }
    if (containorData.containorStack.includes('SQLite')) {
      if (containorData.containorStack === 'SQLite') return 0;
      return 0;
    }

    if (containorData.containorStack.includes('Console')) {
      if (containorData.containorStack === 'Console') return 0;
      return 0;
    }
    return 0;
  });
  const [isOpen, setIsOpen] = useState(false);
  const [isVersionOpen, setIsVersionOpen] = useState(false);
  const [files, setFiles] = useState({
    staticFiles: [],
    staticFilesName: [],
  });
  const [modalOpen, setModalOpen] = useState(false);

  if (isExistContainer === true)
    return (
      <div
        className={`w-[1100px] border-solid border-[2px] border-pcDarkGray rounded-3xl mb-6 `}
      >
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
        {/* <AddingEnvModal
          modalOpen={modalOpen}
          setModalOpen={setModalOpen}
          savedEnvs={containorData.envVars}
          setContainorsData={setContainorsData}
          containorIndex={containorIndex}
        /> */}
        <div className="">
          <div className="flex items-center justify-between h-[80px]">
            <div className="flex items-center ml-8">
              <button
                type="button"
                aria-label="권한 수정"
                onClick={() => {
                  setIsOpen((prev) => !prev);
                  if (isOpen === true) {
                    setIsVersionOpen(false);
                  }
                }}
              >
                <BsCaretDownFill
                  className={` ${isOpen ? 'rotate-0' : 'rotate-[-90deg]'}`}
                  size="1.5rem"
                />
              </button>
              <InputBox
                type="text"
                placeholder="제목을 입력해주세요 *"
                value={containorData.templateTitle}
                isError={false}
                moreStyle="w-[600px] mx-2 font-bold text-lg"
                disabled
              />
            </div>
            <div className="flex flex-col relative mr-8">
              <div className="flex my-3 items-center">
                <span className="text-pcLightBlack font-bold text-md mr-1 w-[120px] text-center">
                  {versions[selectedIndex]}
                </span>
                <button type="button" aria-label="버전 수정" disabled>
                  <BsCaretDownFill
                    className={`${isVersionOpen ? 'rotate-0' : 'rotate-[-90deg]'}`}
                  />
                </button>
                <TextButton
                  moreStyle="w-[100px] leading-[30px] rounded-xl ml-4"
                  color="dark"
                  handleClick={async () => {
                    try {
                      // 삭제 API 연결
                      await deleteContainerById(containorData.containerId);
                      queryClient.invalidateQueries([
                        'containerData',
                        projectId,
                      ]);
                    } catch (e) {
                      console.log(e);
                    }
                  }}
                >
                  <span className="text-white text-md">삭제</span>
                </TextButton>
              </div>
              <div className="absolute top-10">
                {isVersionOpen &&
                  versions.map((version, index) => {
                    if (index !== selectedIndex)
                      return (
                        <button
                          type="button"
                          aria-label="버전 관리"
                          className="relative z-10"
                        >
                          <div className="w-[130px]  leading-[30px] border-solid border-[2px] border-pcDarkGray rounded-xl text-left bg-pcLightBlack">
                            <span className="font-bold pl-4 text-white">
                              {version}
                            </span>
                          </div>
                        </button>
                      );
                    return '';
                  })}
              </div>
            </div>
          </div>
          <div className="flex items-center justify-center space-y-4 mb-2">
            <a
              href={`https://${containorData.savedSubdomain}.${defaultDomain}.pnu.app`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-2 bg-[#EA991F] hover:bg-[#EA991F]/80 text-white font-semibold rounded-lg shadow transition duration-300"
            >
              사이트로 이동
            </a>
          </div>
        </div>

        {isOpen && (
          <div className="flex flex-col ml-8">
            <div className="flex items-center my-2">
              <BiCloud className="ml-4 mr-1 mb-[3px]" size="1.6rem" />
              <span className="font-bold text-lg">서브 도메인</span>
              <InputBox
                type="text"
                placeholder="서브도메인 *"
                isError={false}
                moreStyle="w-[250px] mr-2 pl-6 font-bold text-md"
                value={containorData.savedSubdomain}
                disabled
              />
              <span className="font-bold text-md">
                .{defaultDomain}.pnu.app
              </span>
              <label className="inline-flex items-center">
                <input
                  type="checkbox"
                  checked={containorData.defaultSubDomain}
                  className="appearance-none w-[20px] h-[20px] bg-gray-400/50 rounded-md checked:bg-blue-500 checked:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ml-4"
                  disabled
                />
                <span className="ml-2 text-gray-700">Default Domain</span>
              </label>
            </div>
            <div className="mt-4">
              <UploadBox
                containorData={containorData}
                savedFiles={containorData.containorFiles}
                containorIndex={containorIndex}
                isExistContainer={isExistContainer}
              />
            </div>
            <div className="mt-4 flex items-center">
              <AiFillPushpin size="1.7rem" className="mr-2" />
              <span className="font-bold text-xl">ENV</span>
            </div>
            <div className="my-4 mt-2">
              <EnvBox
                setModalOpen={setModalOpen}
                savedEnvs={containorData.envVars}
                containorIndex={containorIndex}
                isExistContainer={isExistContainer}
              />
            </div>
          </div>
        )}
      </div>
    );

  return (
    <div
      className={`w-[1100px] border-solid border-[2px] border-pcDarkGray rounded-3xl mb-6 `}
    >
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
      <ContainerModal
        modalOpen={isOpenContainerDescModal}
        setModalOpen={setIsOpenContainerDescModal}
        message={containerMessage}
      />
      {/* <AddingEnvModal
        modalOpen={modalOpen}
        setModalOpen={setModalOpen}
        savedEnvs={containorData.envVars}
        setContainorsData={setContainorsData}
        containorIndex={containorIndex}
      /> */}
      <div className="flex items-center justify-between h-[80px]">
        <div className="flex items-center ml-8">
          <button
            type="button"
            aria-label="권한 수정"
            onClick={() => {
              setIsOpen((prev) => !prev);
              if (isOpen === true) {
                setIsVersionOpen(false);
              }
            }}
          >
            <BsCaretDownFill
              className={` ${isOpen ? 'rotate-0' : 'rotate-[-90deg]'}`}
              size="1.5rem"
            />
          </button>
          <InputBox
            type="text"
            placeholder="제목을 입력해주세요 *"
            defaultValue={containorData.templateTitle}
            isError={false}
            moreStyle="w-[600px] mx-2 font-bold text-lg"
            onChange={(e) => {
              setContainorsData((prev) => {
                const tempContainorData = prev.map(
                  ({
                    templateTitle,
                    containorStack,
                    subdomain,
                    envVars,
                    containorFile,
                    defaultSubDomain,
                  }) => ({
                    templateTitle,
                    containorStack,
                    subdomain,
                    envVars: envVars.map((item) => ({ ...item })), // 배열 깊은 복사
                    containorFile,
                    defaultSubDomain,
                  }),
                );

                tempContainorData[containorIndex].templateTitle =
                  e.target.value;

                return tempContainorData;
              });
            }}
          />
        </div>
        <div className="flex flex-col relative mr-8">
          <div className="flex my-3 items-center">
            <span className="text-pcLightBlack font-bold text-md mr-1 w-[120px] text-center">
              {versions[selectedIndex]}
            </span>
            <button
              type="button"
              aria-label="버전 수정"
              onClick={() => {
                setIsVersionOpen((prev) => !prev);
              }}
            >
              <BsCaretDownFill
                className={`${isVersionOpen ? 'rotate-0' : 'rotate-[-90deg]'}`}
              />
            </button>
            <TextButton
              moreStyle="w-[100px] leading-[30px] rounded-xl ml-4"
              color="dark"
              handleClick={() => {
                setContainorsData((prev) => {
                  const tempContainorData = prev.map(
                    ({
                      templateTitle,
                      containorStack,
                      subdomain,
                      envVars,
                      containorFile,
                      defaultSubDomain,
                    }) => ({
                      templateTitle,
                      containorStack,
                      subdomain,
                      envVars: envVars.map((item) => ({ ...item })), // 배열 깊은 복사
                      containorFile, // 배열 깊은 복사
                      defaultSubDomain,
                    }),
                  );
                  console.log(tempContainorData);
                  tempContainorData.splice(containorIndex, 1);
                  console.log(tempContainorData);

                  return tempContainorData;
                });
              }}
            >
              <span className="text-white text-md">삭제</span>
            </TextButton>
          </div>
          <div className="absolute top-10">
            {isVersionOpen &&
              versions.map((version, index) => {
                if (index !== selectedIndex)
                  return (
                    <button
                      type="button"
                      aria-label="버전 관리"
                      onClick={() => {
                        setSelectedIndex(index);
                        setIsVersionOpen(false);
                        setContainorsData((prev) => {
                          const tempContainorData = prev.map(
                            ({
                              templateTitle,
                              containorStack,
                              subdomain,
                              envVars,
                              containorFile,
                              defaultSubDomain,
                            }) => ({
                              templateTitle,
                              containorStack,
                              subdomain,
                              envVars: envVars.map((item) => ({ ...item })), // 배열 깊은 복사
                              containorFile,
                              defaultSubDomain,
                            }),
                          );

                          tempContainorData[containorIndex].containorStack =
                            versions[index];

                          return tempContainorData;
                        });
                      }}
                      className="relative z-10"
                    >
                      <div className="w-[130px]  leading-[30px] border-solid border-[2px] border-pcDarkGray rounded-xl text-left bg-pcLightBlack">
                        <span className="font-bold pl-4 text-white">
                          {version}
                        </span>
                      </div>
                    </button>
                  );
                return '';
              })}
          </div>
        </div>
      </div>
      {isOpen && (
        <div className="flex flex-col ml-8">
          <div className="flex items-center my-2">
            <BiCloud className="ml-4 mr-1 mb-[3px]" size="1.6rem" />
            <span className="font-bold text-lg">서브 도메인</span>
            <InputBox
              type="text"
              placeholder="서브도메인 *"
              isError={false}
              moreStyle="w-[250px] mr-2 pl-6 font-bold text-md"
              value={containorData?.subdomain}
              disabled={containorData.defaultSubDomain}
              onChange={(e) => {
                setContainorsData((prev) => {
                  const tempContainorData = prev.map(
                    ({
                      templateTitle,
                      containorStack,
                      subdomain,
                      envVars,
                      containorFile,
                      defaultSubDomain,
                    }) => ({
                      templateTitle,
                      containorStack,
                      subdomain,
                      envVars: envVars.map((item) => ({ ...item })), // 배열 깊은 복사
                      containorFile,
                      defaultSubDomain,
                    }),
                  );

                  tempContainorData[containorIndex].subdomain = e.target.value;

                  return tempContainorData;
                });
              }}
            />
            <span className="font-bold text-md">.{defaultDomain}.pnu.app</span>
            <label className="inline-flex items-center">
              <input
                type="checkbox"
                checked={containorData.defaultSubDomain}
                className="appearance-none w-[20px] h-[20px] bg-gray-400/50 rounded-md checked:bg-blue-500 checked:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ml-4"
                onChange={(e) => {
                  if (
                    hasDefaultSubDomain === true &&
                    containorData.defaultSubDomain === false
                  ) {
                    notify('Default Sub Domain은 이미 존재합니다');
                    return;
                  }
                  setContainorsData((prev) => {
                    const tempContainorData = prev.map(
                      ({
                        templateTitle,
                        containorStack,
                        subdomain,
                        envVars,
                        containorFile,
                        defaultSubDomain,
                      }) => ({
                        templateTitle,
                        containorStack,
                        subdomain,
                        envVars: envVars.map((item) => ({ ...item })), // 배열 깊은 복사
                        containorFile,
                        defaultSubDomain,
                      }),
                    );
                    if (
                      tempContainorData[containorIndex].defaultSubDomain ===
                      false
                    ) {
                      setHasDefaultSubDomain(true);
                      tempContainorData[containorIndex].subdomain = '';
                    } else setHasDefaultSubDomain(false);

                    tempContainorData[containorIndex].defaultSubDomain =
                      !tempContainorData[containorIndex].defaultSubDomain;
                    console.log(tempContainorData);
                    return tempContainorData;
                  });
                }}
              />
              <span className="ml-2 text-gray-700">Default Domain</span>
            </label>
          </div>
          <div className="mt-4">
            <UploadBox
              containorData={containorData}
              savedFiles={containorData.containorFiles}
              setContainorsData={setContainorsData}
              containorIndex={containorIndex}
            />
          </div>
          <div className="mt-4 flex items-center">
            <AiFillPushpin size="1.7rem" className="mr-2" />
            <span className="font-bold text-xl">ENV</span>
          </div>
          <div className="my-4 mt-2 flex items-end">
            <EnvBox
              setModalOpen={setModalOpen}
              savedEnvs={containorData.envVars}
              setContainorsData={setContainorsData}
              containorIndex={containorIndex}
            />
            <button
              type="button"
              className="px-6 py-3  text-white font-semibold rounded-lg shadow-md  bg-[#EA991F] hover:bg-[#EA991F]/80 focus:outline-none  transition duration-300"
              onClick={() => {
                setIsOpenContainerDescModal(true);
              }}
            >
              컨테이너 설명서 열기
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default ContainorDetailBox;
