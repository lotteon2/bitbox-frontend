import { useState, useRef, useCallback, useEffect } from "react";
import Badge from "../common/Badge";
import {
  darkmodeState,
  memberState,
  accessToken,
  authorityState,
  loginState,
} from "../../recoil/atoms/common";
import { useRecoilValue, useResetRecoilState, useRecoilState } from "recoil";
import { Button, Modal } from "antd";
import { Toast } from "../common/Toast";
import { useMutation, useQuery } from "react-query";
import {
  getMyInfo,
  updateMemberName,
  getAdminInfo,
  updateAdminMemberInfo,
} from "../../apis/member/member";
import { updateMemberInfo, withdrawMember } from "../../apis/member/member";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { imageUpload } from "../../apis/common/common";

interface memberInfoUpdateDto {
  memberNickname: string | null;
  memberProfileImg: string | null;
}

interface adminInfoUpdateDto {
  adminProfileImg: string;
  adminName: null;
  adminPassword: null;
  isDeleted: null;
}

interface traineeInfo {
  name: string;
  classId: number;
}

interface memberInfo {
  memberId: string;
  remainCredit: number;
  classId: number;
}

export default function MyProfile() {
  const authority = useRecoilValue<string>(authorityState);
  const [changeToggle, setChangeToggle] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [profileImage, setProfileImage] = useState<string>("");
  const [nickName, setNickname] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [isSetName, setIsSetName] = useState<boolean>(false);
  const [memberInfo, setMemberInfo] = useRecoilState<memberInfo>(memberState);
  const isDark = useRecoilValue<boolean>(darkmodeState);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const resetAccessToken = useResetRecoilState(accessToken);
  const resetAuthorityState = useResetRecoilState(authorityState);
  const resetLoginState = useResetRecoilState(loginState);
  const resetMemberState = useResetRecoilState(memberState);
  const navigate = useNavigate();

  // 내 정보 조회
  const { data, isLoading } = useQuery({
    queryKey: [
      authority === "ADMIN" ||
      authority === "MANAGER" ||
      authority === "TEACHER"
        ? "getAdminInfo"
        : "getMyInfo",
      changeToggle,
    ],
    queryFn: () =>
      authority === "ADMIN" ||
      authority === "MANAGER" ||
      authority === "TEACHER"
        ? getAdminInfo()
        : getMyInfo(),
  });

  // Profile Modify Modal Show
  const showModal = (e: React.MouseEvent<HTMLElement>) => {
    setIsModalOpen(true);
    e.stopPropagation();
    setNickname("");
    setProfileImage(data.memberProfileImg);
  };

  // Click 저장
  const handleOk = () => {
    if (isSetName) {
      if (name === "") {
        Toast.fire({
          iconHtml:
            '<a><img style="width: 80px" src="https://i.ibb.co/gFW7m2H/danger.png" alt="danger"></a>',
          title: "본명을 입력해주세요",
          background: isDark ? "#4D4D4D" : "#FFFFFF",
          color: isDark ? "#FFFFFF" : "#212B36",
        });
      } else {
        const traineeInfo = {
          name: name,
          classId: memberInfo.classId,
        };
        updateNameMutation.mutate(traineeInfo);
      }
    } else {
      if (
        authority === "ADMIN" ||
        authority === "MANAGER" ||
        authority === "TEACHER"
      ) {
        const updateInfo = {
          adminProfileImg: profileImage,
          adminName: null,
          adminPassword: null,
          isDeleted: null,
        };
        updateAdminMutation.mutate(updateInfo);
      } else {
        setIsModalOpen(false);

        if (nickName === "") {
          const updateInfo = {
            memberNickname: data.memberNickname,
            memberProfileImg: profileImage,
          };

          // 내 정보 수정 API
          updateMutation.mutate(updateInfo);
        } else {
          const updateInfo = {
            memberNickname: nickName,
            memberProfileImg: profileImage,
          };

          // 내 정보 수정 API
          updateMutation.mutate(updateInfo);
        }

        setChangeToggle((cur) => !cur);
      }
    }
  };

  // Click 취소 - Setting Default
  const handleCancel = () => {
    setProfileImage(data.memberProfileImg);
    setNickname("");
    setIsModalOpen(false);
  };

  const uploadImgBtn = useCallback(() => {
    inputRef.current?.click();
  }, []);

  // 이미지 처리
  const handleChangeFile = (event: any) => {
    const sizeLimit = 300 * 10000;
    if (event.target.files[0].size > sizeLimit) {
      alert("사진 크기가 3MB를 넘을 수 없습니다.");
    } else {
      const formData = new FormData();
      formData.append("image", event.target.files[0]);
      imageMutation.mutate(formData);

      // const imgsrc = URL.createObjectURL(event.target.files[0]);
      // TODO: 여기에 이미지 업로드 처리 api 붙이기

      // setProfileImage(imgsrc);
    }
  };

  // 회원 탈퇴
  const handleWithdraw = () => {
    Swal.fire({
      title: '<p style="text-align: center">정말로 탈퇴하시겠습니까?</p>',
      html: '<p style="color: #637381; margin-bottom: 10px; font-size: 16px">탈퇴한 아이디는 본인과 타인 모두 재사용 및 복구가 불가하오니 신중하게 선택하시기 바랍니다. 탈퇴 후 회원정보 및 개인형 서비스 이용기록은 모두 삭제됩니다.</p>',
      iconHtml:
        '<a><img src="https://i.ibb.co/gFW7m2H/danger.png" alt="danger"></a>',
      showCancelButton: true, // cancel버튼 보이기. 기본은 원래 없음
      confirmButtonColor: isDark ? "#FF8888" : "#DC2626", // confrim 버튼 색깔 지정
      cancelButtonColor: isDark ? "#C6C6C6" : "#808080", // cancel 버튼 색깔 지정
      confirmButtonText: "탈퇴하기", // confirm 버튼 텍스트 지정
      cancelButtonText: "취소", // cancel 버튼 텍스트 지정
      reverseButtons: true, // 버튼 순서 거꾸로
      background: isDark ? "#202027" : "#FFFFFF",
      color: isDark ? "#FFFFFF" : "#212B36",
    }).then((result) => {
      // 만약 Promise리턴을 받으면,
      if (result.isConfirmed) {
        withdrawMutation.mutate();
      } else {
        // 모달창에서 cancel 버튼을 눌렀다면
      }
    });
  };
  // 닉네임 변경정보 저장
  const handleUpdateNickname = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNickname(e.target.value);
  };

  // 닉네임 변경정보 저장
  const handleUpdateName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  // 내 정보 수정 API 처리
  const imageMutation = useMutation(
    ["imageUpload"],
    (image: any) => imageUpload(image),
    {
      onSuccess: (data) => {
        setProfileImage(data);
      },
      onError: () => {
        Toast.fire({
          iconHtml:
            '<a><img style="width: 80px" src="https://i.ibb.co/gFW7m2H/danger.png" alt="danger"></a>',
          title: "이미지 업로드 실패",
          background: isDark ? "#4D4D4D" : "#FFFFFF",
          color: isDark ? "#FFFFFF" : "#212B36",
        });
      },
    }
  );

  // 내 정보 수정 API 처리
  const updateMutation = useMutation(
    ["updateMemberInfo"],
    (updateInfo: memberInfoUpdateDto) => updateMemberInfo(updateInfo),
    {
      onSuccess: () => {
        setChangeToggle((cur) => !cur);
        Toast.fire({
          iconHtml:
            '<a><img style="width: 80px" src="https://i.ibb.co/Y3dNf6N/success.png" alt="success"></a>',
          title: "수정되었습니다",
          background: isDark ? "#4D4D4D" : "#FFFFFF",
          color: isDark ? "#FFFFFF" : "#212B36",
        });
      },
      onError: () => {},
    }
  );

  // 내 정보 수정 API 처리(관리자)
  const updateAdminMutation = useMutation(
    ["updateAdminMemberInfo"],
    (updateInfo: adminInfoUpdateDto) => updateAdminMemberInfo(updateInfo),
    {
      onSuccess: () => {
        setChangeToggle((cur) => !cur);
        Toast.fire({
          iconHtml:
            '<a><img style="width: 80px" src="https://i.ibb.co/Y3dNf6N/success.png" alt="success"></a>',
          title: "수정되었습니다",
          background: isDark ? "#4D4D4D" : "#FFFFFF",
          color: isDark ? "#FFFFFF" : "#212B36",
        });
      },
      onError: () => {},
    }
  );

  // 교육생 초기 이름 등록
  const updateNameMutation = useMutation(
    ["updateMemberName"],
    (traineeInfo: traineeInfo) => updateMemberName(traineeInfo),
    {
      onSuccess: () => {
        setChangeToggle((cur) => !cur);
        Toast.fire({
          iconHtml:
            '<a><img style="width: 80px" src="https://i.ibb.co/Y3dNf6N/success.png" alt="success"></a>',
          title: "등록되었습니다",
          background: isDark ? "#4D4D4D" : "#FFFFFF",
          color: isDark ? "#FFFFFF" : "#212B36",
        });
        setIsSetName(false);
        setIsModalOpen(false);
      },
      onError: () => {},
    }
  );

  const withdrawMutation = useMutation(
    ["withdrawMember"],
    () => withdrawMember(),
    {
      onSuccess: () => {
        Toast.fire({
          iconHtml:
            '<a><img style="width: 80px" src="https://i.ibb.co/Y3dNf6N/success.png" alt="success"></a>',
          title: "이용해주셔서 감사합니다",
          background: isDark ? "#4D4D4D" : "#FFFFFF",
          color: isDark ? "#FFFFFF" : "#212B36",
        });
        localStorage.removeItem("accessToken");
        resetAccessToken();
        resetLoginState();
        resetAuthorityState();
        resetMemberState();

        navigate("/");
      },
      onError: () => {},
    }
  );
  // 회원 전역 변수 저장
  useEffect(() => {
    if (data != null) {
      if (
        authority === "ADMIN" ||
        authority === "MANAGER" ||
        authority === "TEACHER"
      ) {
        setProfileImage(data.adminProfileImg);
      } else {
        if (memberInfo.classId === -1) {
          setMemberInfo({
            memberId: data.memberId,
            remainCredit: data.memberCredit,
            classId: data.classId,
          });
        } else {
          setMemberInfo({
            memberId: data.memberId,
            remainCredit: data.memberCredit,
            classId: memberInfo.classId,
          });
        }

        setProfileImage(data.memberProfileImg);

        if (
          data.memberAuthority === "TRAINEE" &&
          (data.memberName === null || data.memberName === "")
        ) {
          setIsSetName(true);
          setIsModalOpen(true);
        }
      }
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, profileImage]);

  if (isLoading || data === undefined) return null;

  return (
    <>
      <div className="flex flex-row w-full">
        <div className="w-1/2 flex flex-row flex-wrap gap-20">
          <div className="flex flex-row gap-5">
            <img
              src={
                authority === "ADMIN" ||
                authority === "MANAGER" ||
                authority === "TEACHER"
                  ? data.adminProfileImg
                  : data.memberProfileImg
              }
              alt="프로필 이미지"
              className="w-20 h-20 rounded-full"
            />
            <div className="flex flex-col">
              <div className="flex flex-row gap-4 mt-3">
                <Badge
                  authority={
                    authority === "ADMIN" ||
                    authority === "MANAGER" ||
                    authority === "TEACHER"
                      ? data.adminAuthority
                      : data.memberAuthority
                  }
                />
                <div className="mt-1">
                  {authority === "ADMIN" ||
                  authority === "MANAGER" ||
                  authority === "TEACHER"
                    ? data.adminName
                    : data.memberNickname}
                </div>
              </div>
              <div className="text-grayscale5 mt-1">
                {authority === "ADMIN" ||
                authority === "MANAGER" ||
                authority === "TEACHER"
                  ? data.adminEmail
                  : data.memberEmail}
              </div>
            </div>
          </div>
          {authority === "ADMIN" ||
          authority === "MANAGER" ||
          authority === "TEACHER" ? (
            ""
          ) : (
            <div className="mt-5 text-2xl">
              <span className="text-primary7 dark:primary4">
                {data.memberCredit}
              </span>{" "}
              <span className="text-grayscale7 dark:text-grayscale1">
                크레딧
              </span>
              <button
                className="text-sm ml-3 bg-grayscale2 hover:bg-grayscale3 px-4 py-2 rounded-lg dark:bg-grayscale6 dark:hover:bg-grayscale5"
                onClick={() => navigate("/payment")}
              >
                충전하기
              </button>
            </div>
          )}
        </div>
        <div className="w-1/2 flex flex-row gap-10 justify-end">
          <button
            className="w-30 h-10 mt-5 bg-grayscale2 hover:bg-grayscale3 px-4 py-2 rounded-lg dark:bg-grayscale6 dark:hover:bg-grayscale5"
            onClick={showModal}
          >
            정보수정
          </button>
          {authority === "ADMIN" ||
          authority === "MANAGER" ||
          authority === "TEACHER" ? (
            ""
          ) : (
            <button
              className=" w-30 h-10 mt-5 bg-grayscale2 hover:bg-grayscale3 px-4 py-2 rounded-lg dark:bg-grayscale6 dark:hover:bg-grayscale5"
              onClick={handleWithdraw}
            >
              회원 탈퇴
            </button>
          )}
        </div>
      </div>
      <Modal
        className={isDark ? "dark" : "light"}
        title={
          <p className="dark:bg-grayscale7 dark:text-grayscale1">
            {isSetName ? "교육생 정보 추가 입력" : "회원정보 수정"}
          </p>
        }
        open={isModalOpen}
        onCancel={handleCancel}
        maskClosable={false}
        closeIcon={isSetName ? false : true}
        footer={
          isSetName
            ? [
                <Button
                  key="save"
                  className="w-[300px] h-[40px] text-lg font-regular bg-secondary1 text-grayscale1 border-none mr-[90px] dark:bg-secondary2 hover:text-grayscale1 hover:opacity-80"
                  onClick={handleOk}
                >
                  저장
                </Button>,
              ]
            : [
                <Button
                  key="cancel"
                  className="w-[150px] h-[40px] text-lg font-regular bg-grayscale4 text-grayscale1 border-none dark:bg-grayscale6 hover:text-grayscale1 hover:opacity-80"
                  onClick={handleCancel}
                >
                  취소
                </Button>,
                <Button
                  key="save"
                  className="w-[150px] h-[40px] text-lg font-regular bg-secondary1 text-grayscale1 border-none dark:bg-secondary2 hover:text-grayscale1 hover:opacity-80"
                  onClick={handleOk}
                >
                  저장
                </Button>,
              ]
        }
      >
        {isSetName ? (
          <input
            className="ml-[28%] mb-10 mt-5 text-center outline-none text-lg dark:bg-grayscale7 dark:text-white"
            type="text"
            placeholder="본명을 입력해주세요"
            value={name}
            onChange={handleUpdateName}
          />
        ) : (
          <>
            <div
              className="m-auto w-32 h-32 rounded-full"
              onClick={uploadImgBtn}
            >
              <input
                className="w-full h-full"
                type="file"
                name="imgFile"
                accept="image/*"
                ref={inputRef}
                id="imgFile"
                onChange={handleChangeFile}
                style={{ display: "none" }}
              />
              <img
                className="w-full h-full rounded-full"
                src={profileImage}
                alt="프로필 이미지"
              />
            </div>
            {authority === "ADMIN" ||
            authority === "MANAGER" ||
            authority === "TEACHER" ? (
              <div className="p-5"></div>
            ) : (
              <input
                className="ml-[28%] mb-10 mt-5 text-center outline-none text-lg dark:bg-grayscale7 dark:text-white"
                type="text"
                placeholder={
                  authority === "ADMIN" ||
                  authority === "MANAGER" ||
                  authority === "TEACHER"
                    ? data.adminName
                    : data.memberNickname
                }
                value={nickName}
                onChange={handleUpdateNickname}
              />
            )}
          </>
        )}
      </Modal>
    </>
  );
}
