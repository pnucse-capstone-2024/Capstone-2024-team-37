import TextButton from '../atom/TextButton';
import AuthDropdown from '../atom/AuthDropdown';
import { deleteGroupMember } from '../../apis/group';

function Member({ type, member, memberIndex, setMemberData, groupId }) {
  if (type === 'project')
    return (
      <div>
        <div className="w-full h-[30px] leading-[30px] flex items-center">
          <span className="font-bold text-md  w-[100px] ml-[20px] text-center">
            {member.name}
          </span>
          <span className="font-bold text-md w-[280px] text-center">
            ttcoristory@naver.com
          </span>
          <span className="font-bold text-md w-[110px] text-center">
            <AuthDropdown
              type={type}
              member={member}
              auth={member.permission}
              memberIndex={memberIndex}
              setMemberData={setMemberData}
              groupId={groupId}
            />
          </span>
        </div>
        <hr className="w-[450px] mx-auto  h-[1.5px] bg-pcGray my-1" />
      </div>
    );

  return (
    <div>
      <div className="w-full h-[30px] leading-[30px] flex items-center">
        <span className="font-bold text-md  w-[100px] ml-[20px] text-center">
          {member.participantName}
        </span>
        <span className="font-bold text-md w-[280px] text-center">
          {member.participantEmail}
        </span>
        <span className="font-bold text-md w-[110px] text-center">
          <AuthDropdown
            type={type}
            member={member}
            auth={member.participantAuthority}
            memberIndex={memberIndex}
            setMemberData={setMemberData}
            groupId={groupId}
          />
        </span>
        <span className="font-bold text-md w-[140px] text-center">
          <TextButton
            moreStyle="w-[100px] h-[25px]  leading-[25px] rounded-xl"
            color="dark"
            handleClick={async () => {
              try {
                await deleteGroupMember(groupId, member.participantName);
                setMemberData((prev) => {
                  const tempMemberData = [...prev];

                  // memberIndex에 해당하는 요소를 제거
                  tempMemberData.splice(memberIndex, 1);

                  return tempMemberData;
                });
              } catch (e) {
                console.log(e);
              }
            }}
          >
            <span className="text-white text-sm">멤버 삭제</span>
          </TextButton>
        </span>
      </div>
      <hr className="w-[550px] mx-auto  h-[1.5px] bg-pcGray my-1" />
    </div>
  );
}

export default Member;
