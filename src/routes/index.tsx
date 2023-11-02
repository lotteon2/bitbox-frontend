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
import PaySuccess from "../components/payment/PaySuccess";
import PayFail from "../components/payment/PayFail";
import DevLogRegister from "../components/board/devlog/DevLogRegister";
import DevLogModify from "../components/board/devlog/DevLogModify";
import ReviewItem from "../components/board/review/ReviewItem";
import AlumniItem from "../components/board/alumni/AlumniItem";
import CommunityItem from "../components/board/community/CommunityItem";
import BoardModify from "../components/board/BoardModify";

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
    children: [
      { index: true, path: "", element: <PaymentPage /> },
      { path: "success", element: <PaySuccess /> },
      { path: "fail", element: <PayFail /> },
      {
        path: "paymentList",
        element: <PaymentListPage />,
      },
    ],
  },
  {
    path: "/board",
    element: <MainLayout />,
    errorElement: <NotFound />,
    children: [
      { path: "devlog", element: <DevLogPage /> },
      { path: "devlog/register", element: <DevLogRegister /> },
      { path: "devlog/modify/:boardId", element: <DevLogModify /> },
      { path: "community", element: <CommunityPage /> },
      { path: "community/detail/:boardId", element: <CommunityItem /> },
      { path: "senior", element: <ReviewPage /> },
      { path: "senior/detail/:boardId", element: <ReviewItem /> },
      { path: "alumni", element: <AlumniPage /> },
      { path: "alumni/detail/:boardId", element: <AlumniItem /> },
      { path: "register/:boardId", element: <BoardRegister /> },
      {
        path: "modify/:masterBoardId/detail/:boardId",
        element: <BoardModify />,
      },
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
