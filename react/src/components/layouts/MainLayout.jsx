import { AiOutlineSetting } from 'react-icons/ai';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { useState } from 'react';
import Navigation from './Navigation';
import instance from '../../apis/instance';
import background from '../../assets/background.webp';
import '../pages/styles.css'; // 애니메이션을 위한 CSS 파일을 import

function MainLayout() {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  console.log(
    localStorage.getItem('jwt'),
    localStorage.getItem('jwt') === null ||
      localStorage.getItem('jwt') === undefined,
  );
  // '/' 경로인 경우 다른 컴포넌트를 반환
  if (location.pathname === '/') {
    return (
      <div
        className="flex flex-col justify-center items-center h-screen bg-gray-100"
        style={{ backgroundImage: `url(${background})` }}
      >
        <header className="absolute top-0 left-0 w-full bg-white shadow-md p-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-blue-700">PNU CLOUD</h1>
          <div className="flex space-x-4">
            {localStorage.getItem('jwt') === 'null' ||
            localStorage.getItem('jwt') === undefined ? (
              <button
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
                type="button"
                onClick={() => {
                  navigate('/login');
                }}
              >
                로그인
              </button>
            ) : null}
            <button
              className="bg-gray-200 text-gray-800 px-4 py-2 rounded hover:bg-gray-300 transition"
              type="button"
              onClick={() => {
                navigate('/signup');
              }}
            >
              회원가입
            </button>
          </div>
        </header>
        <h1 className="text-5xl font-extrabold mb-4 text-blue-700 drop-shadow-lg animate-fade-in mt-20">
          PNU CLOUD web page
        </h1>
        <p className="text-lg text-gray-600 italic text-center max-w-md px-4 animate-fade-in">
          이 웹 애플리케이션은 학생들이 비용 부담 없이 프로젝트를 배포하고
          운영할 수 있는 플랫폼을 제공합니다.
        </p>
        {localStorage.getItem('jwt') === 'null' ||
        localStorage.getItem('jwt') === undefined ? null : (
          <button
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
            type="button"
            onClick={() => {
              navigate('/home');
            }}
          >
            시작하기
          </button>
        )}
      </div>
    );
  }

  return (
    <div className="h-[100vh] relative">
      <div className="absolute flex top-4 right-24 items-center">
        <span className="font-bold mr-1">내 계정</span>
        <button
          type="button"
          className="relative z-10"
          aria-label="상단 메뉴바 열기"
          onClick={() => {
            setIsOpen((prev) => !prev);
          }}
        >
          <AiOutlineSetting size="1.5rem" />
        </button>
        {isOpen && (
          <div>
            <button
              type="button"
              className="absolute block w-[75px] leading-[25px] border-pcDarkGray border-solid border-[1px] rounded-lg top-7 right-0 z-10"
              onClick={async () => {
                navigate('/');
                localStorage.setItem('jwt', null);
                instance.defaults.headers.common.Authorization = null;
                window.location.reload();
              }}
            >
              로그아웃
            </button>
            <button
              type="button"
              className="absolute block w-[75px] leading-[25px] border-pcDarkGray border-solid border-[1px] rounded-lg top-14 right-0 z-10"
              onClick={() => {
                navigate('/my-profile');
              }}
            >
              내정보
            </button>
          </div>
        )}
      </div>
      <Navigation />
      <div className="ml-[330px] h-full">
        <div className="mx-auto h-full">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default MainLayout;
