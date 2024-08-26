// Create WebSocket connection.
const socket = new WebSocket("ws://localhost:3000");

// Connection opened
socket.addEventListener("open", (event) => {
    console.log('Connected to websocket')
});

// Listen for messages
socket.addEventListener("message", (event) => {
    console.log("Message from server ");

    console.log(JSON.parse(event.data));
});

const sendMgs = () => {
    var keyword = $('#keyword').val();
    socket.send(keyword)
}