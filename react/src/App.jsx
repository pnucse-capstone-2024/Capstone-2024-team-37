import './App.css';
import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import MainLayout from './components/layouts/MainLayout';
import GroupEnrollmentPage from './components/pages/GroupEnrollmentPage';
import SignupPage from './components/pages/SignupPage';
import LoginPage from './components/pages/LoginPage';
import MyProfilePage from './components/pages/MyProfilePage';
import GroupPage from './components/pages/GroupPage';
import ProjectPage from './components/pages/ProjectPage';
import ProjectEnrollmentPage from './components/pages/ProjectEnrollmentPage';
import 'react-toastify/dist/ReactToastify.css';
import MainPage from './components/pages/MainPage';
import AdminPage from './components/pages/AdminPage';
import NoAuthorityPage from './components/pages/NoAuthorityPage';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          {/* 공통 레이아웃 */}
          <Route path="/" element={<MainLayout />}>
            <Route path="/home" element={<MainPage />} />
            <Route path="/group" element={<GroupEnrollmentPage />} />
            <Route path="/group/:groupId" element={<GroupPage />} />
            <Route
              path="/group/:groupId/project"
              element={<ProjectEnrollmentPage />}
            />
            <Route
              path="/group/:groupId/project/:projectId"
              element={<ProjectPage />}
            />
          </Route>

          {/* 단독 레이아웃 */}
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/my-profile" element={<MyProfilePage />} />
          <Route path="/admin" element={<AdminPage />} />
          <Route path="/no-authority" element={<NoAuthorityPage />} />
          {/* <Route path="/test" element={<Test />} /> */}
          {/* <Route path="*" element={<NonFoundClientError />} /> */}
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
