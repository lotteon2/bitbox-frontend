import { useState, useRef, useEffect, useMemo } from "react";
import ReactQuill, { Quill } from "react-quill";
import "../../css/quill.snow.css";
import { ImageResize } from "quill-image-resize-module-ts";
import { darkmodeState } from "../../recoil/atoms/common";
import { useRecoilValue } from "recoil";
import { useNavigate, useParams } from "react-router";
import { useMutation, useQuery } from "react-query";
import {
  getBoardDetail,
  getCategoryList,
  modifyBoard,
  removeBoard,
} from "../../apis/community/community";
import Loading from "../../pages/Loading";
import { Select, ConfigProvider, theme } from "antd";
import { imageUpload } from "../../apis/common/common";
import { Toast } from "../common/Toast";
import LoadingGif from "../../assets/images/Loading.gif";
import Swal from "sweetalert2";

Quill.register("modules/imageResize", ImageResize);

interface categories {
  categoryId: number;
  categoryName: string;
}
interface antdSelect {
  value: number;
  label: string;
}
interface boardModifyRequestDto {
  boardId: number;
  categoryId: number;
  boardTitle: string;
  boardContents: string;
  thumbnail: string | null;
}
export default function BoardModify() {
  const masterBoardId = useParams().masterBoardId;
  const boardId = useParams().boardId;
  const [title, setTitle] = useState<string>("");
  const [allCategories, setAllCategories] = useState<antdSelect[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();
  const quillRef = useRef<any>();
  const [value, setValue] = useState<string>("");
  const isDark = useRecoilValue(darkmodeState);

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

  const { data, isLoading } = useQuery({
    queryKey: ["getCategoryList" + masterBoardId],
    queryFn: () => getCategoryList(Number(masterBoardId)),
  });

  const handleChange = (value: number) => {
    setSelectedCategory(value);
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
    } else {
      const updateDto = {
        boardId: Number(boardId),
        categoryId: selectedCategory,
        boardTitle: title,
        boardContents: value,
        thumbnail: null,
      };

      updateMutation.mutate(updateDto);
    }
  };

  const updateMutation = useMutation(
    ["modifyBoard"],
    (modifyboard: boardModifyRequestDto) => modifyBoard("devlog", modifyboard),
    {
      onSuccess: () => {
        setLoading(true);
        setTimeout(function () {
          Toast.fire({
            iconHtml:
              '<a><img style="width: 80px" src="https://i.ibb.co/Y3dNf6N/success.png" alt="success"></a>',
            title: "수정되었습니다.",
            background: isDark ? "#4D4D4D" : "#FFFFFF",
            color: isDark ? "#FFFFFF" : "#212B36",
          });
          navigate(
            masterBoardId === "2"
              ? "/board/alumni"
              : masterBoardId === "3"
              ? "/board/community"
              : "/board/review"
          );
        }, Math.floor(2000));
      },
      onError: () => {
        Toast.fire({
          iconHtml:
            '<a><img style="width: 80px" src="https://i.ibb.co/gFW7m2H/danger.png" alt="danger"></a>',
          title: "오류가 발생했습니다.",
          background: isDark ? "#4D4D4D" : "#FFFFFF",
          color: isDark ? "#FFFFFF" : "#212B36",
        });
      },
    }
  );

  const handleImageUpload = () => {
    const editor = quillRef.current.getEditor();
    const input = document.createElement("input");
    input.setAttribute("type", "file");
    input.setAttribute("accept", "image/*");
    input.click();
    input.onchange = async () => {
      if (input.files !== null) {
        const formData = new FormData();
        formData.append("image", input.files[0]);
        const range = editor.getSelection(true);
        editor.insertEmbed(
          range.index,
          "image",
          `../../assets/images/Loading.gif`
        );
        try {
          const url = await imageUpload(formData);

          editor.deleteText(range.index, 1);
          editor.insertEmbed(range.index, "image", url);
          editor.setSelection(range.index + 1);
        } catch (e) {
          editor.deleteText(range.index, 1);
        }
      }
    };
  };

  const handleTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const modules = useMemo(() => {
    return {
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
          ["link", "image", "video"],
          ["clean"],
        ],
        handlers: {
          image: handleImageUpload,
        },
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
  }, []);

  const detailMutation = useMutation(
    ["getBoardDetail"],
    () =>
      getBoardDetail(
        masterBoardId === "2"
          ? "alumni"
          : masterBoardId === "3"
          ? "community"
          : "senior",
        Number(boardId)
      ),
    {
      onSuccess: (data) => {
        setTitle(data.boardResponse.boardTitle);
        setValue(data.boardResponse.boardContents);
      },
      onError: () => {},
    }
  );

  const removeMutation = useMutation(
    ["removeBoards"],
    () =>
      removeBoard(
        masterBoardId === "2"
          ? "alumni"
          : masterBoardId === "3"
          ? "community"
          : "senior",
        Number(boardId)
      ),
    {
      onSuccess: () => {
        setLoading(true);
        setTimeout(function () {
          Toast.fire({
            iconHtml:
              '<a><img style="width: 80px" src="https://i.ibb.co/Y3dNf6N/success.png" alt="success"></a>',
            title: "삭제되었습니다.",
            background: isDark ? "#4D4D4D" : "#FFFFFF",
            color: isDark ? "#FFFFFF" : "#212B36",
          });
          navigate(
            masterBoardId === "2"
              ? "/board/alumni"
              : masterBoardId === "3"
              ? "/board/community"
              : "/board/review"
          );
        }, Math.floor(2000));
      },
      onError: () => {
        Toast.fire({
          iconHtml:
            '<a><img style="width: 80px" src="https://i.ibb.co/gFW7m2H/danger.png" alt="danger"></a>',
          title: "오류가 발생했습니다.",
          background: isDark ? "#4D4D4D" : "#FFFFFF",
          color: isDark ? "#FFFFFF" : "#212B36",
        });
      },
    }
  );

  const handleRemoveBoard = () => {
    Swal.fire({
      title: '<p style="text-align: center">정말로 삭제하시겠습니까?</p>',
      text: "삭제된 게시글은 다시 복구할 수 없습니다.",
      iconHtml:
        '<a><img src="https://i.ibb.co/gFW7m2H/danger.png" alt="danger"></a>',
      showCancelButton: true, // cancel버튼 보이기. 기본은 원래 없음
      confirmButtonColor: isDark ? "#FF8888" : "#DC2626", // confrim 버튼 색깔 지정
      cancelButtonColor: isDark ? "#C6C6C6" : "#808080", // cancel 버튼 색깔 지정
      confirmButtonText: "삭제하기", // confirm 버튼 텍스트 지정
      cancelButtonText: "취소", // cancel 버튼 텍스트 지정
      reverseButtons: true, // 버튼 순서 거꾸로
      background: isDark ? "#202027" : "#FFFFFF",
      color: isDark ? "#FFFFFF" : "#212B36",
    }).then((result) => {
      // 만약 Promise리턴을 받으면,
      if (result.isConfirmed) {
        // 모달창에서 confirm 버튼을 눌렀다면
        removeMutation.mutate();
      } else {
        // 모달창에서 cancel 버튼을 눌렀다면
      }
    });
  };

  useEffect(() => {
    if (data && selectedCategory === 0) {
      let categoryTmp: antdSelect[] = [];
      data.forEach((item: categories) => {
        const category = {
          value: item.categoryId,
          label: item.categoryName,
        };
        categoryTmp.push(category);
      });
      setAllCategories(categoryTmp);

      setAllCategories(categoryTmp);
      setSelectedCategory(data[0].categoryId);
      detailMutation.mutate();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);
  if (data === undefined || isLoading) return <Loading />;

  return (
    <div className="mx-5 flex flex-col">
      <div className="relative">
        <div className="absolute top-0">
          <ConfigProvider
            theme={{
              algorithm: isDark ? theme.darkAlgorithm : theme.defaultAlgorithm,
            }}
          >
            <Select
              defaultValue={data[0].categoryName}
              options={allCategories}
              style={{ width: 150 }}
              onChange={handleChange}
            />
          </ConfigProvider>
        </div>
        <span className="absolute right-0">
          <button
            className="mx-3 bg-grayscale5 px-5 py-2 rounded-lg text-grayscale1 dark:bg-grayscale4"
            onClick={() =>
              navigate(
                masterBoardId === "2"
                  ? "/board/alumni"
                  : masterBoardId === "3"
                  ? "/board/community"
                  : "/board/review"
              )
            }
          >
            취소
          </button>
          <button
            className="mx-3 bg-primary7 px-5 py-2 rounded-lg text-grayscale1 dark:bg-primary4"
            onClick={handleRemoveBoard}
          >
            삭제
          </button>
          <button
            className="mx-3 bg-secondary1 px-5 py-2 rounded-lg text-grayscale1 dark:bg-secondary2"
            onClick={handleSubmitBoard}
          >
            수정
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
      <br className="my-5 border-grayscale3" />
      <div className="mt-2 w-[90%]">
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
      <img
        src={LoadingGif}
        alt=""
        className={loading ? "absolute top-[25%] left-[40%]" : "hidden"}
      />
    </div>
  );
}
