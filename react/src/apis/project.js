import instance from './instance';

const checkDuplicatedDomain = (domain) =>
  instance.post(`/project/check-valid-domain`, {
    domain,
  });

export default checkDuplicatedDomain;

export const createProjectOneStep = (groupId, payload) =>
  instance.post(`/project/submit-project-overview?groupId=${groupId}`, payload);

export const getProjectDataById = (projectId) =>
  instance.get(`/project/get-project-overview?id=${projectId}`);

export const deleteProejctById = (projectId) =>
  instance.delete(`/project?projectId=${projectId}`);
