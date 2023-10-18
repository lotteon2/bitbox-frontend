import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import NotFound from "../pages/NotFound";
import MainPage from "../pages/MainPage";
import LoginLayout from "../layouts/LoginLayout";
import LoginPage from "../pages/LoginPage";
import MyPage from "../pages/MyPage";
import PaymentPage from "../pages/PaymentPage";
import PaymentListPage from "../pages/PaymentListPage";
import DevLogPage from "../pages/DevLogPage";
import CommunityPage from "../pages/CommunityPage";
import ReviewPage from "../pages/ReviewPage";
import AlumniPage from "../pages/AlumniPage";
import BoardRegister from "../components/board/BoardRegister";
import OAuthKakaoRedirect from "../components/auth/OAuthKakaoRedirect";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <NotFound />,
    children: [{ index: true, path: "", element: <MainPage /> }],
  },
  {
    path: "/login",
    element: <LoginLayout />,
    errorElement: <NotFound />,
    children: [{ index: true, path: "", element: <LoginPage /> }],
  },
  {
    path: "/mypage",
    element: <MainLayout />,
    errorElement: <NotFound />,
    children: [{ index: true, path: "", element: <MyPage /> }],
  },
  {
    path: "/payment",
    element: <MainLayout />,
    errorElement: <NotFound />,
    children: [{ index: true, path: "", element: <PaymentPage /> }],
  },
  {
    path: "/paymentList",
    element: <MainLayout />,
    errorElement: <NotFound />,
    children: [{ index: true, path: "", element: <PaymentListPage /> }],
  },
  {
    path: "/board",
    element: <MainLayout />,
    errorElement: <NotFound />,
    children: [
      { path: "devlog", element: <DevLogPage /> },
      { path: "community", element: <CommunityPage /> },
      { path: "review", element: <ReviewPage /> },
      { path: "alumni", element: <AlumniPage /> },
      { path: "register", element: <BoardRegister /> },
    ],
  },
  {
    path: "/oauth",
    element: <LoginLayout />,
    errorElement: <NotFound />,
    children: [
      { index: true, path: "callback/kakao", element: <OAuthKakaoRedirect /> },
    ],
  },
]);

export default router;
