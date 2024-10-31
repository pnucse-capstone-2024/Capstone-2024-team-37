import { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import InputBox from '../atom/InputBox';
import Alink from '../atom/Alink';
import TextButton from '../atom/TextButton';
import login from '../../apis/login';
import instance from '../../apis/instance';

function LoginPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const redirectUrl = searchParams.get('redirectUrl');

  const [loginData, setLoginData] = useState({
    email: '',
    password: '',
  });
  const [inputErrorData, setInputErrorData] = useState({
    email: '',
    password: '',
  });

  useEffect(() => {
    if (loginData.email === '') {
      setInputErrorData((prev) => ({
        ...prev,
        email: '',
      }));
    } else {
      // 이메일 형식을 검증하는 정규 표현식
      const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      if (!emailRegex.test(loginData.email)) {
        setInputErrorData((prev) => ({
          ...prev,
          email: '이메일 형식으로 입력해주세요.',
        }));
      } else {
        setInputErrorData((prev) => ({
          ...prev,
          email: '',
        }));
      }
    }
  }, [loginData.email]);

  useEffect(() => {
    if (loginData.password === '') {
      setInputErrorData((prev) => ({
        ...prev,
        password: '',
      }));
    } else {
      // 영어 대소문자, 숫자, 특수문자가 각각 최소 1개 이상 포함되며 7자 이상 15자 이하인지 검증하는 정규 표현식
      const passwordRegex =
        /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*])[a-zA-Z\d!@#$%^&*]{7,15}$/;
      if (!passwordRegex.test(loginData.password)) {
        setInputErrorData((prev) => ({
          ...prev,
          password:
            '영어, 숫자, 특수문자가 각각 최소 1개 이상 포함되며 7자 이상 15자 이하로 입력해주세요.',
        }));
      } else {
        setInputErrorData((prev) => ({
          ...prev,
          password: '',
        }));
      }
    }
  }, [loginData.password]);

  return (
    <div className="flex flex-col items-center">
      <h1 className="font-bold text-4xl drop-shadow-lg mt-48 mb-12">Sign in</h1>
      <InputBox
        type="email"
        placeholder="Your Email *(이메일)"
        isError={inputErrorData.email !== ''}
        errorMessage={inputErrorData.email}
        moreStyle="w-[500px] h-[70px] mb-8"
        onChange={(e) => {
          setLoginData((prev) => ({
            ...prev,
            email: e.target.value,
          }));
        }}
      />
      <InputBox
        type="password"
        placeholder="Your Password *"
        isError={inputErrorData.password !== ''}
        errorMessage={inputErrorData.password}
        moreStyle="w-[500px] h-[70px] mb-8"
        onChange={(e) => {
          setLoginData((prev) => ({
            ...prev,
            password: e.target.value,
          }));
        }}
      />
      <TextButton
        color="light"
        moreStyle="w-[500px] h-[55px] leading-[55px] mb-6"
        handleClick={async () => {
          try {
            const { data } = await login(loginData);
            instance.defaults.headers.common.Authorization = data.data.jwt;
            localStorage.setItem('jwt', data.data.jwt);
            document.cookie = `jwt=${data.data.jwt || ''}; path=/`; // path를 '/'로 설정하여 전체 도메인에서 접근 가능
            console.log(redirectUrl);
            if (redirectUrl === null || redirectUrl === undefined) {
              navigate('/home');
              return;
            }

            window.location.href = `${redirectUrl}`;
          } catch (e) {
            console.log(e);
          }
        }}
        disabled={
          inputErrorData.email !== '' ||
          inputErrorData.password !== '' ||
          loginData.email === '' ||
          loginData.password === ''
        }
      >
        Login
      </TextButton>

      <Alink href="/">Back to Home</Alink>
    </div>
  );
}

export default LoginPage;
