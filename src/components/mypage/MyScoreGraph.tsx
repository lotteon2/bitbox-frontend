import { ApexOptions } from "apexcharts";
import Chart from "react-apexcharts";
import { darkmodeState } from "../../recoil/atoms/common";
import { useRecoilValue } from "recoil";
import { getMyGrades } from "../../apis/member/member";
import { useQuery } from "react-query";
import { useEffect, useState } from "react";

interface scoreData {
  examId: number;
  examName: string;
  perfectScore: number;
  score: number;
  gradeId: number;
  avgScore: number;
}

export default function MyScoreGraph() {
  const isDark = useRecoilValue<boolean>(darkmodeState);
  const [categories, setCategories] = useState<string[]>();
  const [myScore, setMyScore] = useState<number[]>();
  const [avgScore, setAvgScore] = useState<number[]>();

  const { data, isLoading } = useQuery({
    queryKey: ["getMyGrades"],
    queryFn: () => getMyGrades(),
  });

  const options: ApexOptions = {
    chart: {
      type: "bar",
      height: 350,
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: "55%",
      },
    },
    dataLabels: {
      enabled: false,
    },
    legend: {
      labels: {
        colors: `${isDark ? "#FFFFFF" : "#000000"}`,
      },
    },
    stroke: {
      show: true,
      width: 2,
      colors: ["transparent"],
    },
    xaxis: {
      categories: categories === undefined ? [] : categories,
      labels: {
        style: {
          colors: `${isDark ? "#FFFFFF" : "#000000"}`,
        },
      },
    },
    yaxis: {
      labels: {
        style: {
          colors: `${isDark ? "#FFFFFF" : "#000000"}`,
        },
      },
    },
    fill: {
      opacity: 1,
      colors: ["#FF6B6B", "#FFBCBC"],
    },
    colors: ["#FF6B6B", "#FFBCBC"],
  };
  const series = [
    {
      name: "내 성적",
      data: myScore === undefined ? [] : myScore,
    },
    {
      name: "반 평균 성적",
      data: avgScore === undefined ? [] : avgScore,
    },
  ];

  useEffect(() => {
    if (data !== undefined) {
      const categoryData: string[] = [];
      const myScoreData: number[] = [];
      const avgScoreData: number[] = [];

      data.forEach(function (item: scoreData) {
        categoryData.push(item.examName);
        myScoreData.push(item.score);
        avgScoreData.push(item.avgScore);
      });

      setCategories(categoryData);
      setMyScore(myScoreData);
      setAvgScore(avgScoreData);
    }
  }, [data]);

  if (isLoading || data === undefined) return null;

  return (
    <div>
      <p className="text-2xl pb-5">성적 관리</p>
      <Chart options={options} series={series} type="bar" height={500} />
    </div>
  );
}
