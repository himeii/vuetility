import io from "socket.io-client";

const socket = io.connect("http://localhost:3001", { reconnection: true, reconnectionAttempts: 10, reconnectionDelay: 50 });
socket.connect();

export default socket;
