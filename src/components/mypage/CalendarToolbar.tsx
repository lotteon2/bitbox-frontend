import React from "react";

interface test {
  onNavigate: any;
  date: Date;
}

function Toolbar({ onNavigate, date }: test) {
  const navigate = (action: any) => {
    onNavigate(action);
  };

  return (
    <div className="rbc-toolbar">
      <span className="rbc-btn-group">
        <button
          onClick={navigate.bind(null, "PREV")}
          className="bg-grayscale1 dark:bg-grayscale7 dark:text-grayscale1"
        >
          이전
        </button>
        <span className="rbc-toolbar-label">{`${date.getFullYear()}년 ${
          date.getMonth() + 1
        }월`}</span>
        <button
          onClick={navigate.bind(null, "NEXT")}
          className="bg-grayscale1 dark:bg-grayscale7 dark:text-grayscale1"
        >
          다음
        </button>
      </span>
    </div>
  );
}

export default React.memo(Toolbar);
