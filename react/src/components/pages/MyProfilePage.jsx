import React from 'react';
import InputBox from '../atom/InputBox';
import TextButton from '../atom/TextButton';
import Alink from '../atom/Alink';

function MyProfilePage() {
  return (
    <div className="flex flex-col items-center">
      <h1 className="font-bold text-4xl drop-shadow-lg mt-16 mb-12">
        내 정보 수정
      </h1>
      <InputBox
        type="text"
        placeholder="Your Name *(실명)"
        isError={false}
        moreStyle="w-[500px] h-[70px] mb-8"
        onChange={() => {
          console.log('이름변경');
        }}
      />

      <InputBox
        type="email"
        placeholder="Your Email *(이메일)"
        isError={false}
        moreStyle="w-[500px] h-[70px] mb-8"
        onChange={() => {
          console.log('이메일 변경');
        }}
        disabled
      />

      <InputBox
        type="password"
        placeholder="Your Password *"
        isError={false}
        moreStyle="w-[500px] h-[70px] mb-8"
        onChange={() => {
          console.log('비밀번호 변경');
        }}
      />
      <InputBox
        type="password"
        placeholder="Your Password Again *"
        isError={false}
        moreStyle="w-[500px] h-[70px] mb-8"
        onChange={() => {
          console.log('비밀번호 재 확인');
        }}
      />
      <TextButton
        color="light"
        moreStyle="w-[500px] h-[55px] leading-[55px] mb-6"
        handleClick={() => {
          console.log('내 정보 수정');
        }}
      >
        Save
      </TextButton>

      <Alink href="/">Back to Home</Alink>
    </div>
  );
}

export default MyProfilePage;
