import React from 'react';
import { AiFillDelete } from 'react-icons/ai';
import { useQueryClient } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import TextButton from './TextButton';
import InputBox from './InputBox';
import { deleteEnvById } from '../../apis/containor';

function EnvBox({
  savedEnvs,
  setContainorsData,
  containorIndex,
  isExistContainer,
}) {
  const queryClient = useQueryClient();
  const { projectId } = useParams();

  if (isExistContainer)
    return (
      <div className="w-[800px]">
        {savedEnvs.map((env, envIndex) => {
          const envValueValue = env.value;
          const envKeyValue = env.key;

          return (
            <div>
              <div className="flex justify-center h-[30px] items-center my-4">
                <InputBox
                  type="text"
                  placeholder="KEY *"
                  isError={false}
                  moreStyle="w-[300px] font-bold text-md"
                  textMoreStyle="py-[4px]"
                  value={envKeyValue}
                  disabled
                />
                <span className="mx-4 font-bold text-xl">:</span>
                <InputBox
                  type="password"
                  placeholder="VALUE"
                  isError={false}
                  moreStyle="w-[300px] font-bold text-md"
                  textMoreStyle="py-[4px]"
                  value={envValueValue}
                  disabled
                />
                <button
                  type="button"
                  className="ml-2"
                  aria-label="env 삭제"
                  onClick={async () => {
                    try {
                      // 삭제 API 연결
                      await deleteEnvById(env.id);
                      queryClient.invalidateQueries([
                        'containerData',
                        projectId,
                      ]);
                    } catch (e) {
                      console.log(e);
                    }
                  }}
                >
                  <AiFillDelete size="1.5rem" color="gray" />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    );

  return (
    <div className="w-[800px]">
      {savedEnvs.map((env, envIndex) => {
        const envValueValue = env.value;
        const envKeyValue = env.key;

        return (
          <div>
            <div className="flex justify-center h-[30px] items-center my-4">
              <InputBox
                type="text"
                placeholder="KEY *"
                isError={false}
                moreStyle="w-[300px] font-bold text-md"
                textMoreStyle="py-[4px]"
                defaultValue={envKeyValue}
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

                    tempContainorData[containorIndex].envVars[envIndex] = {
                      ...tempContainorData[containorIndex].envVars[envIndex],
                      key: e.target.value,
                    };

                    return tempContainorData;
                  });
                }}
              />
              <span className="mx-4 font-bold text-xl">:</span>
              <InputBox
                type="password"
                placeholder="VALUE"
                isError={false}
                moreStyle="w-[300px] font-bold text-md"
                textMoreStyle="py-[4px]"
                defaultValue={envValueValue}
                onChange={(e) => {
                  setContainorsData((prev) => {
                    console.log(prev);
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
                    tempContainorData[containorIndex].envVars[envIndex] = {
                      ...tempContainorData[containorIndex].envVars[envIndex],
                      value: e.target.value,
                    };

                    return tempContainorData;
                  });
                }}
              />
              <button
                type="button"
                className="ml-2"
                aria-label="env 삭제"
                onClick={(e) => {
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
                      ) => {
                        if (containorIndex === tempIndex)
                          envVars.splice(envIndex, 1); // 제거
                        return {
                          templateTitle,
                          containorStack,
                          subdomain,
                          envVars: envVars.map((item) => ({ ...item })), // 배열 깊은 복사
                          containorFile,
                          defaultSubDomain,
                        };
                      },
                    );

                    return tempContainorData;
                  });
                }}
              >
                <AiFillDelete size="1.5rem" color="gray" />
              </button>
            </div>
          </div>
        );
      })}

      <TextButton
        moreStyle="w-[130px] leading-[35px] rounded-xl mt-4"
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
            let id = Math.max(
              ...tempContainorData[containorIndex].envVars.map((env) => env.id),
            );

            if (id === -Infinity) id = 1;
            tempContainorData[containorIndex].envVars.push({
              id: id * -1,
              key: '',
              value: '',
            });
            return tempContainorData;
          });
        }}
      >
        <span className="text-white text-md">+ Add ENV</span>
      </TextButton>
    </div>
  );
}

export default EnvBox;
