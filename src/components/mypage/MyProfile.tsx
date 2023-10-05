import { useState } from "react";
import Badge from "../common/Badge";
import { darkmodeState, memberState } from "../../recoil/atoms/common";
import { useRecoilValue } from "recoil";
import { Button, Modal } from "antd";
import { Toast } from "../common/Toast";
import styled from "styled-components";

interface member {
  memberId: number;
  remainCredit: number;
  classId: number;
}

interface parameter {
  isdark: string;
}

const ModalComponent = styled.div<parameter>`
  .ant-modal-content {
    background-color: red;
  }
  .test {
    background-color: red;
  }
  .test1 {
    background-color: ${(props: parameter) =>
      props.isdark === "true" ? "white" : "red"};
  }
`;
export default function MyProfile() {
  const memberInfo = useRecoilValue<member>(memberState);
  const isDark = useRecoilValue<boolean>(darkmodeState);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
    const modalContent = document.querySelector("ant-modal-content");
    console.log(modalContent);
  };
  const handleOk = () => {
    setIsModalOpen(false);
    Toast.fire({
      iconHtml:
        '<a><img style="width: 80px" src="https://i.ibb.co/Y3dNf6N/success.png" alt="success"></a>',
      title: "수정되었습니다",
      background: isDark ? "#4D4D4D" : "#FFFFFF",
      color: isDark ? "#FFFFFF" : "#212B36",
    });
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleProfileImage = () => {
    console.log("프로필 이미지 수정");
  };
  return (
    <>
      <div className="flex flex-row w-full">
        <div className="w-1/2 flex flex-row flex-wrap gap-20">
          <div className="flex flex-row gap-5">
            <div className="w-20 h-20 bg-black rounded-full"></div>
            <div className="flex flex-col">
              <div className="flex flex-row gap-4 mt-3">
                <Badge />
                <div className="mt-1">사용자 이름</div>
              </div>
              <div className="text-grayscale5 mt-1">사용자 이메일</div>
            </div>
          </div>
          <div className="mt-5 text-2xl">
            <span className="text-primary7 dark:primary4">
              {memberInfo.remainCredit}
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
      <ModalComponent isdark={isDark.toString()}>
        <div className="test1">bb</div>
        <Modal
          title={<p>회원정보 수정</p>}
          open={isModalOpen}
          onCancel={handleCancel}
          maskClosable={false}
          footer={[
            <Button
              key="cancel"
              className="w-[150px] h-[40px] text-lg font-regular bg-grayscale4 text-grayscale1 border-none hover:text-grayscale1 hover:opacity-80"
              onClick={handleCancel}
            >
              취소
            </Button>,
            <Button
              key="save"
              className="w-[150px] h-[40px] text-lg font-regular bg-secondary1 text-grayscale1 border-none hover:text-grayscale1 hover:opacity-80"
              onClick={handleOk}
            >
              저장
            </Button>,
          ]}
        >
          <div
            className="m-auto w-32 h-32 bg-black rounded-full"
            onClick={handleProfileImage}
          >
            <img
              className="w-full h-full rounded-full"
              src=""
              alt="프로필 이미지"
            />
          </div>
          <input
            className="ml-[28%] mb-10 mt-5 text-center outline-none text-lg"
            type="text"
            placeholder="기존 닉네임"
          />
        </Modal>
      </ModalComponent>
    </>
  );
}
