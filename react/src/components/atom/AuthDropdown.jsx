import { useEffect, useState } from 'react';
import { BsCaretDownFill } from 'react-icons/bs';
import { changeGroupMemberAuth } from '../../apis/group';

function AuthDropdown({
  type,
  member,
  auth,
  memberIndex,
  setMemberData,
  groupId,
}) {
  const [isOpen, setIsOpen] = useState(false);
  const groupList = ['소유자', '멤버'];
  const projectList = ['EDIT', 'VIEW'];
  const [selectedIndex, setSelectedIndex] = useState(() => {
    if (type === 'group') {
      if (auth === 'OWNER' || auth === 'ADMIN') return 0;
      return 1;
    }

    if (auth === 'EDIT') return 0;
    if (auth === 'VIEW') return 1;
    return 1;
  });

  useEffect(() => {
    setSelectedIndex(() => {
      if (type === 'group') {
        if (auth === 'OWNER' || auth === 'ADMIN') return 0;
        return 1;
      }

      if (auth === 'EDIT') return 0;
      if (auth === 'VIEW') return 1;
      return 1;
    });
  }, [auth]);
  if (type === 'group')
    return (
      <div className="relative w-[100px] leading-[30px] border-solid border-[2px] border-pcDarkGray rounded-xl text-left">
        <span className="font-bold pl-4">{groupList[selectedIndex]}</span>
        <button
          type="button"
          aria-label="권한 수정"
          onClick={() => {
            setIsOpen((prev) => !prev);
          }}
        >
          <BsCaretDownFill
            className={`absolute right-2 top-[7px] ${
              isOpen ? 'rotate-0' : 'rotate-[-90deg]'
            }`}
          />
        </button>
        <div className="absolute">
          {isOpen &&
            groupList.map((groupAuth, index) => {
              if (index !== selectedIndex)
                return (
                  <button
                    type="button"
                    aria-label="멤버"
                    onClick={async () => {
                      try {
                        let changeAuth = 'MEMBER';
                        if (index === 0) {
                          changeAuth = 'ADMIN';
                        } else changeAuth = 'MEMBER';
                        await changeGroupMemberAuth(
                          groupId,
                          member.participantName,
                          changeAuth,
                        );
                        setSelectedIndex(index);
                        setIsOpen(false);
                        setMemberData((prev) => {
                          const tempMemberData = [...prev];
                          tempMemberData[memberIndex].auth = groupList[index];
                          return tempMemberData;
                        });
                      } catch (e) {
                        console.log(e);
                      }
                    }}
                    className="relative z-10"
                  >
                    <div className="w-[100px] leading-[30px] border-solid border-[2px] border-pcDarkGray rounded-xl text-left bg-pcLightBlack">
                      <span className="font-bold pl-4 text-white">
                        {groupAuth}
                      </span>
                    </div>
                  </button>
                );
              return '';
            })}
        </div>
      </div>
    );

  if (type === 'project')
    return (
      <div className="relative w-[100px] leading-[30px] border-solid border-[2px] border-pcDarkGray rounded-xl text-left">
        <span className="pl-4">{projectList[selectedIndex]}</span>
        <button
          type="button"
          aria-label="권한 수정"
          onClick={() => {
            setIsOpen((prev) => !prev);
          }}
        >
          <BsCaretDownFill
            className={`absolute right-2 top-[7px] ${
              isOpen ? 'rotate-0' : 'rotate-[-90deg]'
            }`}
          />
        </button>
        <div className="absolute">
          {isOpen &&
            projectList.map((projectAuth, index) => {
              if (index !== selectedIndex)
                return (
                  <button
                    type="button"
                    aria-label="멤버"
                    onClick={() => {
                      setSelectedIndex(index);
                      setIsOpen(false);
                      setMemberData((prev) => {
                        const tempMemberData = [...prev];
                        tempMemberData[memberIndex].auth = projectList[index];
                        return tempMemberData;
                      });
                    }}
                    className="relative z-10"
                  >
                    <div className="w-[100px] leading-[30px] border-solid border-[2px] border-pcDarkGray rounded-xl text-left bg-pcLightBlack">
                      <span className="font-bold pl-4 text-white">
                        {projectAuth}
                      </span>
                    </div>
                  </button>
                );
              return '';
            })}
        </div>
      </div>
    );
}

export default AuthDropdown;
