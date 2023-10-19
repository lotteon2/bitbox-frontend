import { ApexOptions } from "apexcharts";
import Chart from "react-apexcharts";
import { darkmodeState } from "../../recoil/atoms/common";
import { useRecoilValue } from "recoil";
import { getMyGrades } from "../../apis/member/member";
import { useQuery } from "react-query";

export default function MyScoreGraph() {
  const isDark = useRecoilValue<boolean>(darkmodeState);

  const { data, isLoading } = useQuery({
    queryKey: ["getMyGrades"],
    queryFn: () => getMyGrades(),
  });

  if (isLoading || data === undefined) return null;

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
      categories: [
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
      ],
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
    },
  };
  const series = [
    {
      name: "내 성적",
      data: [44, 55, 57, 56, 61, 58, 63, 60, 66],
    },
    {
      name: "반 평균 성적",
      data: [76, 85, 101, 98, 87, 105, 91, 114, 94],
    },
  ];
  return (
    <div>
      <p className="text-2xl pb-5">성적 관리</p>
      <Chart options={options} series={series} type="bar" height={500} />
    </div>
  );
}
