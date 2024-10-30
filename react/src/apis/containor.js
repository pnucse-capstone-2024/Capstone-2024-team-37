import instance from './instance';

const postContainor = (formdata) =>
  instance.post('/project/submit-project-detail', formdata, {
    // headers: {
    //   'Content-Type': 'multipart/form-data',
    // },
  });
export default postContainor;

export const getProjectContainerData = (projectId) =>
  instance
    .get(`/project?projectId=${projectId}`)
    .then((response) => {
      // 성공 시 처리할 로직

      // 중간 로직 추가
      const processedData = response.data.data.containers.map((container) => {
        let defaultSubDomain = false;
        if (container.containerDomain.split('.')[0] === '')
          defaultSubDomain = true;
        return {
          containerId: container.containerId,
          templateTitle: container.containerTemplateName,
          containorStack: container.containerStack,
          savedSubdomain: container.containerDomain.split('.')[0],
          envVars: container.containerEnvs.map((env) => ({
            key: env.key,
            value: '',
            id: env.id,
          })),
          containorFile: null,
          defaultSubDomain,
        };
      }); // 가공된 데이터

      // console.log(processedData);
      return processedData; // 결과 반환
    })
    .catch((error) => {
      // 실패 시 처리할 로직
      console.error('API 요청 실패:', error);

      // 에러 처리 로직 추가
      throw new Error('프로젝트 데이터를 가져오는 데 실패했습니다.');
    });

export const deleteContainerById = (containerId) =>
  instance.delete(`/project/delete-container?containerId=${containerId}`);

export const deleteEnvById = (envId) =>
  instance.delete(`/project/delete-container-env?containerEnvId=${envId}`);
