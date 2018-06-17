let socket = io.connect("https://piggydocs-server.glitch.me");
let messageSending = false;

function sendMessage() {
    if(messageSending) return false;
    let username = document.getElementById("usernameInput").value;
    let message = document.getElementById("messageInput").value;
    document.getElementById("messageInput").disabled = true;
    messageSending = true;
    socket.emit("messageSent", {"username": username, "message": message});
}

socket.on("messageError", function(data){
    alertify.alert("Error", data.error);
    document.getElementById("messageInput").disabled = false;
    messageSending = false;
});

socket.on("messageSuccess", function(data){
    alertify.alert("Success", "Message sent!");
    document.getElementById("usernameInput").value = "";
    document.getElementById("messageInput").value = "";
    document.getElementById("messageInput").disabled = false;
    messageSending = false;
});