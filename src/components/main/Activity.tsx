import React, { useEffect, useState } from "react";
import Activity01 from "../../assets/images/main/Activity01.jpg";
import Activity02 from "../../assets/images/main/Activity02.jpg";
import Activity03 from "../../assets/images/main/Activity03.jpg";
import Activity04 from "../../assets/images/main/Activity04.jpg";
import ActivityFrame from "../../assets/images/main/ActivityFrame.png";
import ActivityFrameDark from "../../assets/images/main/ActivityFrameDark.png";
import { darkmodeState } from "../../recoil/atoms/common";
import { useRecoilValue } from "recoil";
import AOS from "aos";

export default function Activity() {
  const [imgNum, setImgNum] = useState<number>(1);
  const isDark = useRecoilValue(darkmodeState);

  useEffect(() => {
    AOS.init();
  }, []);

  return (
    <div className="mt-10 dark:text-grayscale1">
      <p className="text-3xl mb-5">활동 소개</p>

      <div className="flex flex-row flex-wrap gap-32">
        <div
          className="flex flex-col w-[650px] m-auto"
          data-aos="fade-right"
          data-aos-duration="1000"
          data-aos-offset="700"
        >
          <br />
          <br />
          <p className="text-xl">
            롯데e커머스 교육은 한 기수당 6개월동안 진행됩니다.
          </p>
          <br />
          <br />
          <table>
            <tbody>
              <tr
                className="border-t-2 border-b-2 border-primary7 text-xl dark:border-primary4"
                onClick={() => setImgNum(1)}
              >
                <td>
                  <button
                    className={
                      imgNum === 1
                        ? "p-5 w-full h-full text-3xl mr-2 text-left bg-gradient-to-r from-primary2 to-primary1 dark:bg-primary4 dark:bg-gradient-to-r dark:from-primary4 dark:to-primary1"
                        : "p-5 w-full h-full text-3xl mr-2 text-left"
                    }
                  >
                    🧑🏻‍🏫 이론 교육
                  </button>
                </td>
              </tr>
              <tr
                className="border-b-2 text-xl border-primary7 dark:border-primary4"
                onClick={() => setImgNum(2)}
              >
                <td>
                  <button
                    className={
                      imgNum === 2
                        ? "p-5 w-full h-full text-3xl mr-2 text-left bg-gradient-to-r from-primary2 to-primary1 dark:bg-primary4 dark:bg-gradient-to-r dark:from-primary4 dark:to-primary1"
                        : "p-5 w-full h-full text-3xl mr-2 text-left"
                    }
                  >
                    💯 테스트
                  </button>
                </td>
              </tr>
              <tr
                className="border-b-2 text-xl border-primary7 dark:border-primary4"
                onClick={() => setImgNum(3)}
              >
                <td>
                  <button
                    className={
                      imgNum === 3
                        ? "p-5 w-full h-full text-3xl mr-2 text-left bg-gradient-to-r from-primary2 to-primary1 dark:bg-primary4 dark:bg-gradient-to-r dark:from-primary4 dark:to-primary1"
                        : "p-5 w-full h-full text-3xl mr-2 text-left"
                    }
                  >
                    👩🏻‍💻 단기 프로젝트
                  </button>
                </td>
              </tr>
              <tr
                className="border-b-2 text-xl border-primary7 dark:border-primary4"
                onClick={() => setImgNum(4)}
              >
                <td>
                  <button
                    className={
                      imgNum === 4
                        ? "p-5 w-full h-full text-3xl mr-2 text-left bg-gradient-to-r from-primary2 to-primary1 dark:bg-primary4 dark:bg-gradient-to-r dark:from-primary4 dark:to-primary1"
                        : "p-5 w-full h-full text-3xl mr-2 text-left"
                    }
                  >
                    🖧 장기 프로젝트
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
          <br />
          <br />
          <div className="text-xl">
            <p>
              교육이 진행되면 초반 3개월은 Spring, React, Vue, DataBase, Docker
              등 프로그래밍 교육이 이루어지며, 각 과목이 종료될 때 마다 간단한
              테스트 또는 팀을 꾸린 후 단기 실습 프로젝트가 진행됩니다.
            </p>
            <br />
            <p>
              후반 3개월은 조별 장기 실습 프로젝트가 진행되는데 교육생들의 관심
              주제와 지원 분야, 기술 스택 등을 고려하여 다양한 프로젝트를
              진행하게 됩니다.
            </p>
          </div>
        </div>
        <div
          className="w-[520px] h-[698px] relative m-auto"
          data-aos="fade-left"
          data-aos-duration="1000"
          data-aos-offset="700"
        >
          <img
            className="absolute z-10"
            src={isDark ? ActivityFrameDark : ActivityFrame}
            alt="ActivityFrame"
          />
          <img
            className="absolute z-0"
            src={
              imgNum === 1
                ? Activity01
                : imgNum === 2
                ? Activity02
                : imgNum === 3
                ? Activity03
                : Activity04
            }
            alt="Activity01"
          />
        </div>
      </div>
    </div>
  );
}
