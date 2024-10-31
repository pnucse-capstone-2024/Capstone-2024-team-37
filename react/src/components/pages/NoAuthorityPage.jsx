import React from 'react';
import { useNavigate } from 'react-router-dom';

function NoAuthorityPage() {
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate('/'); // 홈 경로로 이동
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-3xl font-bold mb-4">권한이 없습니다</h1>
      <p className="text-lg mb-6">
        이 페이지에 접근할 수 있는 권한이 없습니다.
      </p>
      <button
        onClick={handleGoHome}
        className="px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 focus:outline-none"
        type="button"
      >
        홈으로 돌아가기
      </button>
    </div>
  );
}

export default NoAuthorityPage;
