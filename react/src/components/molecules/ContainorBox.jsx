import { useState, useEffect } from 'react';
import ContainerModal from '../modals/ContainerModal';

function ContainorBox({
  setContainorsData,
  stackName,
  stackImg,
  isExistContainer,
}) {
  const [representVersions] = useState(() => {
    if (stackName === 'React') {
      return 'React 18.0.2';
    }
    if (stackName === 'Vue.js') {
      return 'Vue2';
    }
    if (stackName === 'HTML5') {
      return 'HTML5';
    }
    if (stackName === 'Angular') {
      return 'Angular17';
    }
    if (stackName === 'Next.js') {
      return 'Next.js14';
    }

    if (stackName === 'Node.js') {
      return 'Node.js20';
    }
    if (stackName === 'Spring Boot') {
      return 'Spring Boot6.0';
    }
    if (stackName === 'PHP') {
      return 'PHP7.0';
    }
    if (stackName === 'Flask') {
      return 'Flask3.6';
    }
    if (stackName === 'FastAPI') {
      return 'FastAPI';
    }

    if (stackName === 'MYSQL') {
      return 'MYSQL';
    }
    if (stackName === 'PostgreSQL') {
      return 'PostgreSQL';
    }
    if (stackName === 'MongoDB') {
      return 'MongoDB';
    }
    if (stackName === 'SQLite') {
      return 'SQLite';
    }

    if (stackName === 'Console') {
      return 'Console';
    }
    return '';
  });

  const [isOpenContainerDescModal, setIsOpenContainerDescModal] =
    useState(false);

  const [containerMessage, setContainerMessage] = useState('');

  useEffect(() => {
    if (
      stackName === 'FastAPI' ||
      stackName === 'MYSQL' ||
      stackName === 'PostgreSQL' ||
      stackName === 'MongoDB' ||
      stackName === 'SQLite'
    )
      setContainerMessage(
        'DB 관련 컨테이너에는 파일 업로드가 필요하지 않습니다. 필수 환경 변수를 입력해 주세요.',
      );
    else setContainerMessage('파일과 사용하실 환경 변수를 입력해 주세요.');
  }, []);

  return (
    <div>
      <ContainerModal
        modalOpen={isOpenContainerDescModal}
        setModalOpen={setIsOpenContainerDescModal}
        message={containerMessage}
      />
      <button
        type="button"
        onClick={() => {
          setIsOpenContainerDescModal(true);

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

            let id = Math.max(
              ...tempContainorData.map((container) => container.containerId),
            );

            if (id === -Infinity) id = 1;

            if (stackName === 'PostgreSQL') {
              tempContainorData.push({
                containerId: id * -1,
                templateTitle: '',
                containorStack: representVersions,
                subdomain: '',
                envVars: [
                  {
                    id: -1,
                    key: 'POSTGRES_DB',
                    value: '',
                  },
                  {
                    id: -2,
                    key: 'POSTGRES_USER',
                    value: '',
                  },
                  {
                    id: -3,
                    key: 'POSTGRES_PASSWORD',
                    value: '',
                  },
                ],
                containorFile: null,
                defaultSubDomain: false,
              });
            } else if (stackName === 'MYSQL') {
              tempContainorData.push({
                containerId: id * -1,
                templateTitle: '',
                containorStack: representVersions,
                subdomain: '',
                envVars: [
                  {
                    id: -1,
                    key: 'MYSQL_USER',
                    value: '',
                  },
                  {
                    id: -2,
                    key: 'MYSQL_PASSWORD',
                    value: '',
                  },
                  {
                    id: -3,
                    key: 'MYSQL_ROOT_PASSWORD',
                    value: '',
                  },
                  {
                    id: -4,
                    key: 'MYSQL_DATABASE',
                    value: '',
                  },
                ],
                containorFile: null,
                defaultSubDomain: false,
              });
            } else if (stackName === 'MongoDB') {
              tempContainorData.push({
                containerId: id * -1,
                templateTitle: '',
                containorStack: representVersions,
                subdomain: '',
                envVars: [
                  {
                    id: -1,
                    key: 'MongoDB_USER',
                    value: '',
                  },
                  {
                    id: -2,
                    key: 'MongoDB_PASSWORD',
                    value: '',
                  },
                  {
                    id: -3,
                    key: 'MongoDB_ROOT_PASSWORD',
                    value: '',
                  },
                  {
                    id: -4,
                    key: 'MongoDB_DATABASE',
                    value: '',
                  },
                ],
                containorFile: null,
                defaultSubDomain: false,
              });
            } else if (stackName === 'SQLite') {
              tempContainorData.push({
                containerId: id * -1,
                templateTitle: '',
                containorStack: representVersions,
                subdomain: '',
                envVars: [
                  {
                    id: -1,
                    key: 'SQLite_USER',
                    value: '',
                  },
                  {
                    id: -2,
                    key: 'SQLite_PASSWORD',
                    value: '',
                  },
                  {
                    id: -3,
                    key: 'SQLite_ROOT_PASSWORD',
                    value: '',
                  },
                  {
                    id: -4,
                    key: 'SQLite_DATABASE',
                    value: '',
                  },
                ],
                containorFile: null,
                defaultSubDomain: false,
              });
            } else
              tempContainorData.push({
                containerId: id * -1,
                templateTitle: '',
                containorStack: representVersions,
                subdomain: '',
                envVars: [],
                containorFile: null,
                defaultSubDomain: false,
              });

            return tempContainorData;
          });
        }}
        disabled={isExistContainer}
      >
        <div
          className={`w-[350px] h-[120px] border-solid border-[1.5px] border-pcDarkGray rounded-xl ${isExistContainer ? '' : 'hover:border-blue-300'}`}
        >
          <div className="flex flex-col items-center">
            <img
              src={stackImg}
              alt="대표이미지"
              className="mt-1 w-[59px] min-h-[59px]"
            />
            <span className="font-bold text-md">{stackName}</span>
            <hr className="w-[300px] mx-auto bg-pcDarkGray mt-1" />
            {/* <div className="flex my-3">
            <span className="text-pcDarkGray text-md mr-1">
              {versions[selectedIndex]}
            </span>
            <button
              type="button"
              aria-label="버전 수정"
              onClick={() => {
                setIsOpen((prev) => !prev);
              }}
            >
              <BsCaretDownFill
                className={`${isOpen ? 'rotate-0' : 'rotate-[-90deg]'}`}
              />
            </button>
          </div>
          {isOpen &&
            versions.map((group, index) => {
              if (index !== selectedIndex)
                return (
                  <button
                    type="button"
                    aria-label="멤버"
                    onClick={() => {
                      setSelectedIndex(index);
                      setIsOpen(false);
                    }}
                    className="relative z-10"
                  >
                    <div className="w-[130px] h-[30px] leading-[30px] border-solid border-[2px] border-pcDarkGray rounded-xl text-left bg-pcLightBlack">
                      <span className="font-bold pl-4 text-white">{group}</span>
                    </div>
                  </button>
                );
              return '';
            })} */}
          </div>
        </div>
      </button>
    </div>
  );
}

export default ContainorBox;
