import { useState, useRef, useEffect, useMemo } from "react";
import ReactQuill, { Quill } from "react-quill";
import "../../css/quill.snow.css";
import { ImageResize } from "quill-image-resize-module-ts";
import { darkmodeState } from "../../recoil/atoms/common";
import { useRecoilValue } from "recoil";
import { useNavigate, useParams } from "react-router";
import { useMutation, useQuery } from "react-query";
import { getCategoryList, registerBoard } from "../../apis/community/community";
import Loading from "../../pages/Loading";
import { Select, ConfigProvider, theme } from "antd";
import { imageUpload } from "../../apis/common/common";
import { Toast } from "../common/Toast";
import LoadingGif from "../../assets/images/Loading.gif";

Quill.register("modules/imageResize", ImageResize);

interface categories {
  categoryId: number;
  categoryName: string;
}
interface antdSelect {
  value: number;
  label: string;
}
interface boardRegisterDto {
  categoryId: number;
  boardTitle: string;
  boardContents: string;
  thumbnail: string | null;
}
export default function BoardRegister() {
  const masterBoardId = useParams().boardId;
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
      const registerDto = {
        categoryId: selectedCategory,
        boardTitle: title,
        boardContents: value,
        thumbnail: null,
      };

      registerMutation.mutate(registerDto);
    }
  };

  const registerMutation = useMutation(
    ["registerBoard" + masterBoardId],
    (registerdto: boardRegisterDto) =>
      registerBoard(
        masterBoardId === "2"
          ? "alumni"
          : masterBoardId === "3"
          ? "community"
          : "senior",
        registerdto
      ),
    {
      onSuccess: () => {
        setLoading(true);
        setTimeout(function () {
          setLoading(false);
          Toast.fire({
            iconHtml:
              '<a><img style="width: 80px" src="https://i.ibb.co/Y3dNf6N/success.png" alt="success"></a>',
            title: "등록되었습니다.",
            background: isDark ? "#4D4D4D" : "#FFFFFF",
            color: isDark ? "#FFFFFF" : "#212B36",
          });

          navigate(
            masterBoardId === "2"
              ? "/board/alumni"
              : masterBoardId === "3"
              ? "/board/community"
              : "/board/senior"
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
                  : "/board/senior"
              )
            }
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
