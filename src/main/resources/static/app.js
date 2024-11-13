const stompClient = new StompJs.Client({
    brokerURL: 'ws://' + window.location.host + '/livechat-web'
});

stompClient.onConnect = (frame) => {
    setConnected(true);
    console.log('Connected: ' + frame);
    stompClient.subscribe('/topics/livechat', (message) => {
        updateLiveChat(message.body);  // Acessa diretamente o body da mensagem
    });
};

stompClient.onWebSocketError = (error) => {
    console.error('Error with websocket', error);
};

stompClient.onStompError = (frame) => {
    console.error('Broker reported error: ' + frame.headers['message']);
    console.error('Additional details: ' + frame.body);
};

function setConnected(connected) {
    $("#connect").prop("disabled", connected);
    $("#disconnect").prop("disabled", !connected);
    if (connected) {
        $("#conversation").show();
    } else {
        $("#conversation").hide();
    }
}

function connect() {
    stompClient.activate();
}

function disconnect() {
    stompClient.deactivate();
    setConnected(false);
    console.log("Disconnected");
}

function sendMessage() {
    stompClient.publish({
        destination: "/app/new-message",
        body: JSON.stringify({'user': $("#user").val(), 'message': $("#message").val()})
    });
    $("#message").val("");  // Limpa o campo de mensagem após envio
}

function updateLiveChat(message) {
    // Parse o JSON para acessar a propriedade "message"
    const msgObject = JSON.parse(message);  // Converte o JSON em um objeto JavaScript
    const messageContent = msgObject.message;  // Acessa o conteúdo da propriedade "message"

    // Adiciona o espaço após ":"
    const formattedMessage = messageContent.replace(":", ": ");

    $("#livechat").append("<tr><td>" + formattedMessage + "</td></tr>");
}

$(function () {
    $("form").on('submit', (e) => e.preventDefault());
    $("#connect").click(() => connect());
    $("#disconnect").click(() => disconnect());
    $("#send").click(() => sendMessage());

    // Envia a mensagem ao pressionar Enter
    $("#message").keypress((e) => {
        if (e.which === 13) {  // 13 é o código da tecla Enter
            sendMessage();
            e.preventDefault();  // Impede a quebra de linha
        }
    });
});
