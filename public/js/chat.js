const socket = io()

socket.on('message', (message) => {
    console.log(message);
})

document.querySelector('#chat_form').addEventListener('submit', (e) => {
    e.preventDefault()

    const input = e.target.elements.message

    socket.emit('sendMessage', input.value)
})