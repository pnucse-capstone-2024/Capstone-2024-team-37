import instance from './instance';

const enrollGroup = (payload) =>
  instance.post('/group', {
    groupName: payload.title,
    groupDescription: payload.desc,
  });
export default enrollGroup;

export const inviteGroupMember = (groupId, email) =>
  instance.post(`/group/invite-member`, {
    groupId,
    email,
  });

export const getGroupById = (groupId) =>
  instance.get(`/group/dashboard?groupId=${groupId}`);

export const getMyGroupsAndProjects = () =>
  instance.get(`/user/get-user-nav-list`);

export const changeGroupMemberAuth = (groupId, username, role) =>
  instance.post(`/group/change-member-role`, {
    groupId,
    username,
    role,
  });

export const deleteGroupMember = (groupId, username) =>
  instance.delete(
    `/group/delete-member?groupId=${groupId}&username=${username}`,
  );
