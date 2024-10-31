import React from 'react';
import background from '../../assets/background.webp';
import './styles.css'; // 애니메이션을 위한 CSS 파일을 import

function MainPage() {
  return (
    <div
      className="flex flex-col justify-center items-center h-screen bg-gray-100"
      style={{ backgroundImage: `url(${background})` }}
    >
      <h1 className="text-5xl font-extrabold mb-4 text-blue-700 drop-shadow-lg animate-fade-in">
        PNU CLOUD web page
      </h1>
      <p className="text-lg text-gray-600 italic text-center max-w-md px-4 animate-fade-in">
        이 웹 애플리케이션은 학생들이 비용 부담 없이 프로젝트를 배포하고 운영할
        수 있는 플랫폼을 제공합니다.
      </p>
    </div>
  );
}

export default MainPage;
