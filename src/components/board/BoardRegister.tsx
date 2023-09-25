import React, { useState, useRef } from "react";
import ReactQuill, { Quill } from "react-quill";
import "../../css/quill.snow.css";
import {ImageResize} from "quill-image-resize-module-ts";
import {darkmodeState} from "../../recoil/atoms/common";
import {useRecoilValue} from "recoil";
Quill.register("modules/imageResize", ImageResize);

export default function BoardRegister() {
    const quillRef = useRef<any>();
    const [value, setValue] = useState<string>('');
    const isDark = useRecoilValue(darkmodeState);
    const formats = [
        'header',
        'font',
        'size',
        'bold',
        'italic',
        'underline',
        'strike',
        'blockquote',
        'list',
        'bullet',
        'indent',
        'link',
        'image',
        'video'
    ];
    
    const modules = {
        toolbar: {
            container: [
                [{ header: '1' }, { header: '2' }, { font: [] }],
                [{ size: [] }],
                ['bold', 'italic', 'underline', 'strike', 'blockquote'],
                [
                    { list: 'ordered' },
                    { list: 'bullet' },
                    { indent: '-1' },
                    { indent: '+1' }
                ],
                ['link', 'image', 'video'],
                ['clean']
            ],
            // handlers: {
            //     // 이미지 처리는 우리가 직접 imageHandler라는 함수로 처리할 것이다.
            //     image: handleImageUpload,
            // },
        },
        clipboard: {
            // toggle to add extra line breaks when pasting HTML:
            matchVisual: false
        },
        imageResize: {
            parchment: Quill.import('parchment'),
            modules: ['Resize', 'DisplaySize']
        },
    
    };
    
    // TODO: 여기에 이미지 업로드 처리 후 src 갈아끼우기
    // const handleImageUpload = () => {
    // }

    return <div className="mx-5 flex flex-col">
        <div className="relative">
            <span className="absolute left-0">
                카테고리 선택 박스
            </span>
            <span className="absolute right-0">수정/삭제 버튼</span>
        </div>
        <div className="mt-16">
            <input type="text" placeholder="제목을 입력해주세요" className="w-[90%] p-2 border-grayscale4 border-[1px] placeholder-grayscale4 dark:border-grayscale2 dark:bg-grayscale7 dark:text-grayscale1"/>
        </div>
        <br className="my-5 border-grayscale3"/>
        <div className="mt-2 w-[90%]">
            <ReactQuill
                theme='snow'
                onChange={setValue}
                value={value}
                modules={modules}
                formats={formats}
                bounds={'#root'}
                placeholder={'내용을 입력해주세요'}
                style={{height: '600px', color: isDark ? '#fff' : '#000'}}
                ref={quillRef}
            />
        </div>
    </div>
};