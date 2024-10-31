import React, { useEffect, useState } from 'react';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { BsFillInboxesFill } from 'react-icons/bs';
import { BiSolidPencil } from 'react-icons/bi';
import TextButton from '../atom/TextButton';
import InputBox from '../atom/InputBox';
import MemberManagement from '../organisms/MemberManagement';
import { getGroupById } from '../../apis/group';

function GroupPage() {
  const { groupId } = useParams();
  const [searchParams] = useSearchParams();
  const [isGroupOwner, setIsGroupOwner] = useState(
    searchParams.get('isOwner') === 'true',
  );
  const navigate = useNavigate();
  const [titleEdit, setTitleEdit] = useState(false);
  const [descEdit, setDescEdit] = useState(false);
  const [groupData, setGroupData] = useState({
    title: '',
    desc: '',
  });
  const [memberData, setMemberData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await getGroupById(groupId);
        setGroupData({
          title: data.data.groupName,
          desc: data.data.groupDescription,
        });
        setMemberData(data.data.groupParticipants);
        setIsGroupOwner(searchParams.get('isOwner') === 'true');
      } catch (e) {
        console.log(e);
      }
    };

    fetchData();
  }, [groupId]);

  return (
    <div className="flex flex-col w-[1280px] h-[850px] mx-auto relative">
      <div className="flex items-center justify-between mt-24">
        <div className="flex items-center ml-12">
          <BsFillInboxesFill size="1.3rem" className="leading-[1.3rem] mr-3" />
          {titleEdit ? (
            <InputBox
              type="text"
              placeholder="그룹 명 *"
              isError={false}
              moreStyle="w-[400px] laeding-[40px] mr-2 font-bold"
              textMoreStyle="py-[2px]"
              onChange={(e) => {
                setGroupData((prev) => ({
                  ...prev,
                  title: e.target.value,
                }));
              }}
              defaultValue={groupData.title}
            />
          ) : (
            <span className="font-bold text-2xl mr-2">{groupData.title}</span>
          )}
          {titleEdit || !isGroupOwner || (
            <button
              type="button"
              aria-label="그룹 제목 수정"
              onClick={() => {
                setTitleEdit(true);
              }}
            >
              <BiSolidPencil size="1.3rem" className="leading-[1.3rem] mr-6" />
            </button>
          )}
          {titleEdit && (
            <TextButton
              moreStyle="w-[100px] h-[35px] leading-[35px] rounded-xl"
              color="dark"
              handleClick={() => {
                setTitleEdit(false);
              }}
            >
              <span className="text-white text-md">저장</span>
            </TextButton>
          )}
        </div>

        <TextButton
          moreStyle="w-[140px] h-[35px] rounded-xl mr-24"
          color="dark"
          handleClick={() => {
            navigate(`/group/${groupId}/project`);
          }}
        >
          <span className="text-white text-md leading-[35px]">
            프로젝트 추가 +
          </span>
        </TextButton>
      </div>
      <hr className="w-[1136px] mx-auto mr-24 h-[3px] bg-pcLightBlack mt-2" />
      <div className="flex items-center ml-12 mt-8">
        <span className="font-bold text-xl mr-2">그룹 설명</span>
        {descEdit || !isGroupOwner || (
          <button
            type="button"
            aria-label="그룹 설명 수정"
            onClick={() => {
              setDescEdit(true);
            }}
          >
            <BiSolidPencil size="1.3rem" className="leading-[1.3rem] mr-6" />
          </button>
        )}

        {descEdit && (
          <TextButton
            moreStyle="w-[100px] h-[35px] rounded-xl"
            color="dark"
            handleClick={() => {
              console.log('저장');
              setDescEdit(false);
            }}
          >
            <span className="text-white text-md leading-[35px]">저장</span>
          </TextButton>
        )}
      </div>
      {descEdit ? (
        <textarea
          type="text"
          placeholder="그룹 설명을 적어주세요"
          className="block px-4 py-3 outline-none rounded-lg w-[900px] h-[250px] ml-12 mt-2 text-xl font-medium border-pcGray border-solid border-[2px]"
          onChange={(e) => {
            setGroupData((prev) => ({
              ...prev,
              desc: e.target.value,
            }));
          }}
          defaultValue={groupData.desc}
        />
      ) : (
        <span className="w-[900px] ml-12 mt-2 text-xl font-medium">
          {groupData.desc}
        </span>
      )}

      <span className="font-bold text-xl ml-12 mt-12">그룹 멤버</span>
      <div className="ml-12 mt-1">
        <MemberManagement
          type="group"
          memberData={memberData}
          groupId={groupId}
          setMemberData={setMemberData}
        />
      </div>
    </div>
  );
}

export default GroupPage;
