import { useState } from 'react';
import TextButton from '../atom/TextButton';
import AddingMemberModal from '../modals/AddingMemberModal';
import Member from '../molecules/Member';

function MemberManagement({ type, memberData, groupId, setMemberData }) {
  const [modalOpen, setModalOpen] = useState(false);

  if (type === 'project')
    return (
      <div className="w-[530px] h-[370px] border-solid border-[2px] border-pcDarkGray rounded-xl relative">
        <AddingMemberModal
          modalOpen={modalOpen}
          setModalOpen={setModalOpen}
          groupId={groupId}
          setMemberData={setMemberData}
        />
        <div className="flex flex-col w-[530px] h-[300px] overflow-y-auto">
          <div className="w-full h-[30px] leading-[30px] flex">
            <span className="font-bold text-md w-[100px] ml-[20px] text-center">
              이름
            </span>
            <span className="font-bold text-md w-[280px] text-center">
              이메일
            </span>
            <span className="font-bold text-md w-[110px] text-center">
              권한
            </span>
          </div>
          <hr className="w-[450px] mx-auto  h-[1.5px] bg-pcGray my-1" />
          {memberData.map((member, index) => (
            <Member
              key={member.id}
              type={type}
              member={member}
              memberIndex={index}
              setMemberData={setMemberData}
              groupId={groupId}
            />
          ))}
        </div>
      </div>
    );

  return (
    <div className="w-[680px] h-[370px] border-solid border-[2px] border-pcDarkGray rounded-xl relative">
      <AddingMemberModal
        modalOpen={modalOpen}
        setModalOpen={setModalOpen}
        groupId={groupId}
        setMemberData={setMemberData}
      />
      <div className="flex flex-col w-[680px] h-[300px] overflow-y-auto">
        <div className="w-full h-[30px] leading-[30px] flex">
          <span className="font-bold text-md w-[100px] ml-[20px] text-center">
            이름
          </span>
          <span className="font-bold text-md w-[280px] text-center">
            이메일
          </span>
          <span className="font-bold text-md w-[110px] text-center">권한</span>
          <span className="font-bold text-md w-[140px] text-center">삭제</span>
        </div>
        <hr className="w-[550px] mx-auto  h-[1.5px] bg-pcGray my-1" />
        {memberData.map((member, index) => (
          <Member
            key={member.participantId}
            type={type}
            member={member}
            memberIndex={index}
            setMemberData={setMemberData}
            groupId={groupId}
          />
        ))}
      </div>
      {type === 'group' && (
        <TextButton
          moreStyle="w-[120px] h-[30px] leading-[30px] rounded-xl absolute bottom-4 left-[260px]"
          color="dark"
          handleClick={() => {
            setModalOpen(true);
          }}
        >
          <span className="text-white text-sm">멤버 추가</span>
        </TextButton>
      )}
    </div>
  );
}

export default MemberManagement;
