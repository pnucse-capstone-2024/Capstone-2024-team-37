import React, { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { BiFace, BiSolidBookmarkStar, BiSearchAlt2 } from 'react-icons/bi';
import { useNavigate } from 'react-router-dom';
import { AiOutlineAntCloud } from 'react-icons/ai';
import ProjectCard from '../atom/ProjectCard';
import GroupCard from '../atom/GroupCard';
import TextButton from '../atom/TextButton';
import instance from '../../apis/instance';
import { getMyGroupsAndProjects } from '../../apis/group';

function Navigation() {
  const navigate = useNavigate();
  const [isAuthReady, setIsAuthReady] = useState(false);

  const { data, isError } = useQuery({
    queryKey: ['navList'],
    queryFn: getMyGroupsAndProjects,
    enabled: !!isAuthReady, // Only run the query if jwt exists
    throwOnError: () => {
      // 요청이 실패했을 때 /login으로 리다이렉션
      alert('로그인을 해주세요');
      navigate('/login');
    },
  });

  useEffect(() => {
    if (localStorage.getItem('jwt')) {
      instance.defaults.headers.common.Authorization =
        localStorage.getItem('jwt');
      setIsAuthReady(true);
    }
    console.log(instance.defaults.headers.common.Authorization);
    if (
      !instance.defaults.headers.common.Authorization ||
      instance.defaults.headers.common.Authorization === 'null'
    ) {
      alert('로그인 페이지로 이동합니다.');
      navigate('/login');
    }
  }, []);

  if (!isError)
    return (
      <div className="fixed top-0 h-full">
        <div className="w-[330px] h-full bg-pcLightBlue rounded-r-3xl shadow-md overflow-y-auto relative">
          <div className="flex flex-col">
            {/* Sticky 헤더 */}
            <div className="flex items-center bg-pcLightBlue z-10">
              <AiOutlineAntCloud size="2.5rem" className="mx-4 my-8" />
              <div className="flex flex-col">
                <span className="font-bold text-xl">PNU CLOUD</span>
              </div>
            </div>

            {/* 그룹 검색 영역 */}
            <div className="flex items-center mt-8 mb-2 sticky top-[80px] bg-pcLightBlue z-10">
              <BiSolidBookmarkStar size="1.3rem" className="mr-1 ml-8" />
              <span className="font-bold mr-2">그룹</span>
              <div className="relative w-[200px] shadow-[0_2px_2px_-1px_rgba(0,0,0,0.9)] rounded-xl">
                <input
                  type="text"
                  placeholder="그룹 이름"
                  className="py-1 w-[200px] bg-white pl-3 outline-none rounded-xl"
                />
                <button type="button" aria-label="그룹명 검색">
                  <div className="absolute top-[6px] right-3">
                    <BiSearchAlt2 size="1.3rem" />
                  </div>
                </button>
              </div>
            </div>

            {/* 그룹 리스트 */}
            <div>
              {data &&
                data.data.data.userGroupInfoList.map((group) => (
                  <GroupCard
                    key={group.id}
                    groupName={group.groupName}
                    groupId={group.id}
                    groupAuthority={group.authority}
                  >
                    {group.projects.map((project) => (
                      <ProjectCard
                        key={project.id}
                        projectName={project.projectName}
                        groupId={group.id}
                        projectId={project.id}
                      />
                    ))}
                  </GroupCard>
                ))}
            </div>

            {/* 그룹 추가 버튼 */}
            <TextButton
              moreStyle="w-[140px] h-[35px] fixed absolute bottom-24 left-24"
              color="dark"
              handleClick={() => {
                navigate('/group');
              }}
            >
              <span className="text-white text-md leading-[35px]">
                그룹 추가 +
              </span>
            </TextButton>
          </div>
        </div>
      </div>
    );
  return (
    <div className="fixed top-0 h-full">
      <div className="w-[330px] h-full bg-pcLightBlue rounded-r-3xl shadow-md overflow-y-auto relative">
        <div className="flex flex-col">
          {/* Sticky 헤더 */}
          <div className="flex items-center bg-pcLightBlue z-10">
            <BiFace size="2.5rem" className="mx-4 my-8" />
            <div className="flex flex-col">
              <span className="font-bold text-xl">PNU CLOUD</span>
              <span className="text-sm">Forbidden Proxy Attendance</span>
            </div>
          </div>

          {/* 그룹 검색 영역 */}
          <div className="flex items-center mt-8 mb-2 sticky top-[80px] bg-pcLightBlue z-10">
            <BiSolidBookmarkStar size="1.3rem" className="mr-1 ml-8" />
            <span className="font-bold mr-2">그룹</span>
            <div className="relative w-[200px] shadow-[0_2px_2px_-1px_rgba(0,0,0,0.9)] rounded-xl">
              <input
                type="text"
                placeholder="그룹 이름"
                className="py-1 w-[200px] bg-white pl-3 outline-none rounded-xl"
              />
              <button type="button" aria-label="그룹명 검색">
                <div className="absolute top-[6px] right-3">
                  <BiSearchAlt2 size="1.3rem" />
                </div>
              </button>
            </div>
          </div>

          {/* 그룹 리스트 */}
          <div>데이터 없음</div>

          {/* 그룹 추가 버튼 */}
          <TextButton
            moreStyle="w-[140px] h-[35px] fixed absolute bottom-24 left-24"
            color="dark"
            handleClick={() => {
              navigate('/group');
            }}
          >
            <span className="text-white text-md leading-[35px]">
              그룹 추가 +
            </span>
          </TextButton>
        </div>
      </div>
    </div>
  );
}

export default Navigation;
