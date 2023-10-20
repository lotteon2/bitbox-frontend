import { useState, useRef, useCallback } from "react";
import ReactQuill, { Quill } from "react-quill";
import "../../../css/quill.snow.css";
import { ImageResize } from "quill-image-resize-module-ts";
import { darkmodeState } from "../../../recoil/atoms/common";
import { useRecoilValue } from "recoil";
import CollectionsIcon from "@mui/icons-material/Collections";
import { Toast } from "../../common/Toast";
import { registerBoard } from "../../../apis/community/community";
import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";

Quill.register("modules/imageResize", ImageResize);

interface boardRegisterDto {
  memberId: string;
  memberName: string;
  categoryId: number;
  boardTitle: string;
  boardContents: string;
}

export default function DevLogRegister() {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [thumbnail, setThumbnail] = useState<string>("");
  const [title, setTitle] = useState<string>("");
  const quillRef = useRef<any>();
  const [value, setValue] = useState<string>("");
  const isDark = useRecoilValue(darkmodeState);
  const navigate = useNavigate();

  const formats = [
    "header",
    "font",
    "size",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "indent",
    "link",
    "image",
    "video",
  ];

  const modules = {
    toolbar: {
      container: [
        [{ header: "1" }, { header: "2" }, { font: [] }],
        [{ size: [] }],
        ["bold", "italic", "underline", "strike", "blockquote"],
        [
          { list: "ordered" },
          { list: "bullet" },
          { indent: "-1" },
          { indent: "+1" },
        ],
        ["link"],
        ["clean"],
      ],
      // handlers: {
      //     // 이미지 처리는 우리가 직접 imageHandler라는 함수로 처리할 것이다.
      //     image: handleImageUpload,
      // },
    },
    clipboard: {
      // toggle to add extra line breaks when pasting HTML:
      matchVisual: false,
    },
    imageResize: {
      parchment: Quill.import("parchment"),
      modules: ["Resize", "DisplaySize"],
    },
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
      setThumbnail(imgsrc);
    }
  };

  const handleTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const handleSubmitBoard = () => {
    if (title === "") {
      Toast.fire({
        iconHtml:
          '<a><img style="width: 80px" src="https://i.ibb.co/gFW7m2H/danger.png" alt="danger"></a>',
        title: "제목을 입력해주세요",
        background: isDark ? "#4D4D4D" : "#FFFFFF",
        color: isDark ? "#FFFFFF" : "#212B36",
      });
    } else if (value === "") {
      Toast.fire({
        iconHtml:
          '<a><img style="width: 80px" src="https://i.ibb.co/gFW7m2H/danger.png" alt="danger"></a>',
        title: "내용을 입력해주세요",
        background: isDark ? "#4D4D4D" : "#FFFFFF",
        color: isDark ? "#FFFFFF" : "#212B36",
      });
    } else if (value === "") {
      Toast.fire({
        iconHtml:
          '<a><img style="width: 80px" src="https://i.ibb.co/gFW7m2H/danger.png" alt="danger"></a>',
        title: "썸네일을 등록해주세요",
        background: isDark ? "#4D4D4D" : "#FFFFFF",
        color: isDark ? "#FFFFFF" : "#212B36",
      });
    } else {
      const registerDto = {
        memberId: "",
        memberName: "",
        categoryId: 1, // 나중에 기수 선택박스에서 선택한 categoryId로 바꾸기
        boardTitle: title,
        boardContents: value,
      };

      registerMutation.mutate(registerDto);
    }
  };

  const registerMutation = useMutation(
    ["registerBoard"],
    (registerdto: boardRegisterDto) => registerBoard("데브로그", registerdto),
    {
      onSuccess: () => {
        Toast.fire({
          iconHtml:
            '<a><img style="width: 80px" src="https://i.ibb.co/Y3dNf6N/success.png" alt="success"></a>',
          title: "등록되었습니다.",
          background: isDark ? "#4D4D4D" : "#FFFFFF",
          color: isDark ? "#FFFFFF" : "#212B36",
        });
        navigate("/board/devlog");
      },
      onError: () => {
        alert("게시글 등록 중 오류가 발생했습니다.");
      },
    }
  );
  return (
    <div className="mx-5 flex flex-col">
      <div className="relative">
        <span className="absolute left-0">기수 선택 박스</span>
        <span className="absolute right-0">
          <button
            className="mx-3 bg-grayscale5 px-5 py-2 rounded-lg text-grayscale1 dark:bg-grayscale4"
            onClick={() => navigate("/board/devlog")}
          >
            취소
          </button>
          <button
            className="mx-3 bg-secondary1 px-5 py-2 rounded-lg text-grayscale1 dark:bg-secondary2"
            onClick={handleSubmitBoard}
          >
            등록
          </button>
        </span>
      </div>
      <div className="mt-16">
        <input
          type="text"
          placeholder="제목을 입력해주세요"
          className="w-[90%] p-2 border-grayscale4 border-[1px] placeholder-grayscale4 dark:border-grayscale2 dark:bg-grayscale7 dark:text-grayscale1"
          onChange={handleTitle}
          value={title}
        />
      </div>
      <div className="h-32 mt-4">
        <div className="w-32 h-32 rounded-lg" onClick={uploadImgBtn}>
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
          {thumbnail === "" ? (
            <div className="w-full h-full rounded-lg border-2 border-grayscale3 ">
              <div className="pl-[30%] pt-6">
                <CollectionsIcon sx={{ fontSize: 50 }} />
              </div>
              <p className="text-[0.8rem] text-center pt-3">썸네일 이미지</p>
            </div>
          ) : (
            <img
              className="w-full h-full rounded-lg"
              src={thumbnail}
              alt="썸네일 이미지"
            />
          )}
        </div>
      </div>
      <br className="my-5 border-grayscale3" />
      <div className="w-[90%]">
        <ReactQuill
          theme="snow"
          onChange={setValue}
          value={value}
          modules={modules}
          formats={formats}
          bounds={"#root"}
          placeholder={"내용을 입력해주세요"}
          style={{ height: "600px", color: isDark ? "#fff" : "#000" }}
          ref={quillRef}
        />
      </div>
    </div>
  );
}
