import SockJS from "sockjs-client";
import Stomp from "stompjs";

let socket = new SockJS(
  "http://localhost:8000/chatting-service/chattings?sessionToken=" +
    localStorage.getItem("sessionToken")
);

export var stompClient = Stomp.over(socket);
