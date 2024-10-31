import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import InputBox from '../atom/InputBox';
import TextButton from '../atom/TextButton';
import Alink from '../atom/Alink';
import signup, { getEmailCheckCode, getValidCheck } from '../../apis/signup';

function SignupPage() {
  const navigate = useNavigate();
  const [signupData, setSignupData] = useState({
    email: '',
    username: '',
    password: '',
  });
  const notify = (message) => {
    toast.error(message);
  };
  const [validCode, setValidCode] = useState('');
  const [checkPassword, setCheckPassword] = useState('');
  const [emailVailCheck, setEmailValidCheck] = useState(false);
  const [vailCheck, setValidCheck] = useState(false);
  const [inputErrorData, setInputErrorData] = useState({
    username: '',
    email: '',
    password: '',
    passwordAgain: '',
  });

  useEffect(() => {
    if (signupData.username === '') {
      setInputErrorData((prev) => ({
        ...prev,
        username: '',
      }));
    } else {
      // 이름 형식을 검증하는 정규 표현식
      const nameRegex = /^[가-힣]{2,}$|^[a-zA-Z]+(?: [a-zA-Z]+)*$/;
      if (!nameRegex.test(signupData.username)) {
        setInputErrorData((prev) => ({
          ...prev,
          username: '이름을 입력해주세요.',
        }));
      } else {
        setInputErrorData((prev) => ({
          ...prev,
          username: '',
        }));
      }
    }
  }, [signupData.username]);

  useEffect(() => {
    if (signupData.email === '') {
      setInputErrorData((prev) => ({
        ...prev,
        email: '',
      }));
    } else {
      // 이메일 형식을 검증하는 정규 표현식
      const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      if (!emailRegex.test(signupData.email)) {
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
  }, [signupData.email]);

  useEffect(() => {
    if (signupData.password === '') {
      setInputErrorData((prev) => ({
        ...prev,
        password: '',
      }));
    } else {
      // 영어 대소문자, 숫자, 특수문자가 각각 최소 1개 이상 포함되며 7자 이상 15자 이하인지 검증하는 정규 표현식
      const passwordRegex =
        /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*])[a-zA-Z\d!@#$%^&*]{7,15}$/;
      if (!passwordRegex.test(signupData.password)) {
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
  }, [signupData.password]);

  useEffect(() => {
    if (checkPassword === '') {
      setInputErrorData((prev) => ({
        ...prev,
        passwordAgain: '',
      }));
    } else if (signupData.password !== checkPassword) {
      setInputErrorData((prev) => ({
        ...prev,
        passwordAgain: '비밀번호가 일치하지 않습니다.',
      }));
    } else {
      setInputErrorData((prev) => ({
        ...prev,
        passwordAgain: '',
      }));
    }
  }, [checkPassword]);

  return (
    <div className="flex flex-col items-center">
      <ToastContainer
        position="top-center" // 알람 위치 지정
        autoClose={3000} // 자동 off 시간
        hideProgressBar={false} // 진행시간바 숨김
        closeOnClick // 클릭으로 알람 닫기
        rtl={false} // 알림 좌우 반전
        pauseOnFocusLoss // 화면을 벗어나면 알람 정지
        draggable // 드래그 가능
        pauseOnHover // 마우스를 올리면 알람 정지
        theme="dark"
        // limit={1} // 알람 개수 제한
      />
      <h1 className="font-bold text-4xl drop-shadow-lg mt-16 mb-12">Sign up</h1>
      <InputBox
        type="text"
        placeholder="Your Name *(실명)"
        isError={inputErrorData.username !== ''}
        errorMessage={inputErrorData.username}
        moreStyle="w-[500px] h-[70px] mb-8"
        onChange={(e) => {
          setSignupData((prev) => ({
            ...prev,
            username: e.target.value,
          }));
        }}
      />
      <div className="relative">
        <InputBox
          type="email"
          placeholder="Your Email *(이메일)"
          isError={inputErrorData.email !== ''}
          errorMessage={inputErrorData.email}
          moreStyle="w-[500px] h-[70px] mb-8"
          disabled={emailVailCheck}
          onChange={(e) => {
            setSignupData((prev) => ({
              ...prev,
              email: e.target.value,
            }));
          }}
        />
        <div className="absolute top-3 right-4">
          <TextButton
            color="dark"
            moreStyle="w-[100px]  leading-[25px] rounded-xl text-sm"
            handleClick={async () => {
              try {
                const { data } = await getEmailCheckCode(signupData);
                setEmailValidCheck(true);
              } catch (e) {
                console.log(e);
              }
            }}
            disabled={emailVailCheck}
          >
            중복 확인
          </TextButton>
        </div>
      </div>{' '}
      {emailVailCheck && (
        <div className="relative">
          <InputBox
            type="text"
            placeholder="인증번호 *"
            moreStyle="w-[500px] h-[70px] mb-8"
            disabled={vailCheck}
            onChange={(e) => {
              setValidCode(e.target.value);
            }}
          />
          <div className="absolute top-5 right-4 ">
            <TextButton
              color="dark"
              moreStyle="w-[100px] h-[25px] leading-[25px] rounded-xl text-sm"
              handleClick={async () => {
                try {
                  await getValidCheck({
                    code: validCode,
                  });
                  setValidCheck(true);
                } catch (e) {
                  console.log(e);
                }
              }}
              disabled={vailCheck}
            >
              인증 확인
            </TextButton>
          </div>
          {/* <div className="absolute top-9 right-4 ">
            <TextButton
              color="dark"
              moreStyle="w-[100px] h-[25px] leading-[25px] rounded-xl text-sm"
              onClick={() => {
                console.log('인증 번호 전송');
              }}
              disabled={vailCheck}
            >
              인증 번호 전송
            </TextButton>
          </div> */}
        </div>
      )}
      <InputBox
        type="password"
        placeholder="Your Password *"
        isError={inputErrorData.password !== ''}
        errorMessage={inputErrorData.password}
        moreStyle="w-[500px] h-[70px] mb-8"
        onChange={(e) => {
          setSignupData((prev) => ({
            ...prev,
            password: e.target.value,
          }));
        }}
      />
      <InputBox
        type="password"
        isError={inputErrorData.passwordAgain !== ''}
        errorMessage={inputErrorData.passwordAgain}
        placeholder="Your Password Again *"
        moreStyle="w-[500px] h-[70px] mb-8"
        onChange={(e) => {
          setCheckPassword(() => e.target.value);
        }}
      />
      <TextButton
        color="light"
        moreStyle="w-[500px] h-[55px] leading-[55px] mb-6"
        handleClick={async () => {
          try {
            if (emailVailCheck === false) {
              notify('이메일 인증을 해주세요.');
            }
            await signup(signupData);
            navigate('/login');
          } catch (e) {
            console.log(e);
          }
        }}
      >
        Sign up
      </TextButton>
      <Alink href="/">Back to Home</Alink>
    </div>
  );
}

export default SignupPage;
