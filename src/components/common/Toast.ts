import Swal from "sweetalert2";

export const Toast = Swal.mixin({
  toast: true, // 토스트 형식
  position: "bottom-start", // 알림 위치
  showConfirmButton: false, // 확인버튼 생성 유무
  timer: 3000, // 지속 시간
  timerProgressBar: true, // 지속시간바 생성 여부
  didOpen: (toast) => {
    // 이벤트에 따른 토스트 알림 설정
    toast.addEventListener("mouseenter", Swal.stopTimer); // 마우스를 올리고 있으면 지속시간 중단
    toast.addEventListener("mouseleave", Swal.resumeTimer); // 마우스를 내리면 지속시간 지속
  },
});
