import React from 'react';
import { BsBox } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';

function ProjectCard({ projectName, groupId, projectId }) {
  const navigate = useNavigate();

  return (
    <button
      type="button"
      className="mx-auto block my-1"
      onClick={() => {
        navigate(`/group/${groupId}/project/${projectId}`);
      }}
    >
      <div className="w-[280px] h-[45px] rounded-xl bg-[#F6F6F6] flex items-center mx-auto">
        <BsBox size="1.2rem" className="ml-6" />
        <span className="font-bold text-sm ml-2">{projectName}</span>
      </div>
    </button>
  );
}

export default ProjectCard;
