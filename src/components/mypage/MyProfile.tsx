import { useState, useRef, useCallback, useEffect } from "react";
import Badge from "../common/Badge";
import { darkmodeState, memberState } from "../../recoil/atoms/common";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { Button, Modal } from "antd";
import { Toast } from "../common/Toast";
import { useMutation, useQuery } from "react-query";
import { getMyInfo } from "../../apis/member/member";
import { updateMemberInfo } from "../../apis/member/member";

interface memberInfoUpdateDto {
  memberNickname: string | null;
  memberProfileImg: string | null;
}

export default function MyProfile() {
  const [changeToggle, setChangeToggle] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [profileImage, setProfileImage] = useState<string>("");
  const [nickName, setNickname] = useState<string>("");
  const setMemberInfo = useSetRecoilState(memberState);
  const isDark = useRecoilValue<boolean>(darkmodeState);
  const inputRef = useRef<HTMLInputElement | null>(null);

  // 내 정보 조회
  const { data, isLoading } = useQuery({
    queryKey: ["getMyInfo", changeToggle],
    queryFn: () => getMyInfo(),
  });

  // Profile Modify Modal Show
  const showModal = () => {
    setIsModalOpen(true);
  };

  // Click 저장
  const handleOk = () => {
    setIsModalOpen(false);

    const updateInfo = {
      memberNickname: nickName,
      memberProfileImg: profileImage,
    };

    // 내 정보 수정 API
    updateMutation.mutate(updateInfo);

    setChangeToggle((cur) => !cur);
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
      formData.append("file", event.target.files[0]);
      const imgsrc = URL.createObjectURL(event.target.files[0]);

      // TODO: 여기에 이미지 업로드 처리 api 붙이기
      setProfileImage(imgsrc);
    }
  };

  // 닉네임 변경정보 저장
  const handleUpdateNickname = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNickname(e.target.value);
  };

  // 내 정보 수정 API 처리
  const updateMutation = useMutation(
    ["updateMemberInfo"],
    (updateInfo: memberInfoUpdateDto) => updateMemberInfo(updateInfo),
    {
      onSuccess: (res) => {
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

  // 회원 전역 변수 저장
  useEffect(() => {
    if (data != null) {
      setMemberInfo({
        memberId: data.memberId,
        remainCredit: data.memberCredit,
        classId: data.classId,
      });
      setProfileImage(data.memberProfileImg);
    }
  }, [data]);

  if (isLoading || data === undefined) return null;

  return (
    <>
      <div className="flex flex-row w-full">
        <div className="w-1/2 flex flex-row flex-wrap gap-20">
          <div className="flex flex-row gap-5">
            <img
              src={data.memberProfileImg}
              alt="프로필 이미지"
              className="w-20 h-20 rounded-full"
            />
            <div className="flex flex-col">
              <div className="flex flex-row gap-4 mt-3">
                <Badge />
                <div className="mt-1">{data.memberNickname}</div>
              </div>
              <div className="text-grayscale5 mt-1">{data.memberEmail}</div>
            </div>
          </div>
          <div className="mt-5 text-2xl">
            <span className="text-primary7 dark:primary4">
              {data.memberCredit}
            </span>{" "}
            크레딧
          </div>
        </div>
        <div className="w-1/2 flex flex-row gap-10 justify-end">
          <button
            className="w-30 h-10 mt-5 bg-grayscale2 hover:bg-grayscale3 px-4 py-2 rounded-lg dark:bg-grayscale6 dark:hover:bg-grayscale5"
            onClick={showModal}
          >
            정보수정
          </button>
          <button className=" w-30 h-10 mt-5 bg-grayscale2 hover:bg-grayscale3 px-4 py-2 rounded-lg dark:bg-grayscale6 dark:hover:bg-grayscale5">
            로그아웃
          </button>
        </div>
      </div>
      <Modal
        className={isDark ? "dark" : "light"}
        title={
          <p className="dark:bg-grayscale7 dark:text-grayscale1">
            회원정보 수정
          </p>
        }
        open={isModalOpen}
        onCancel={handleCancel}
        maskClosable={false}
        footer={[
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
        ]}
      >
        <div className="m-auto w-32 h-32 rounded-full" onClick={uploadImgBtn}>
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
        <input
          className="ml-[28%] mb-10 mt-5 text-center outline-none text-lg dark:bg-grayscale7 dark:text-white"
          type="text"
          placeholder={data.memberNickname}
          value={nickName}
          onChange={handleUpdateNickname}
        />
      </Modal>
    </>
  );
}
