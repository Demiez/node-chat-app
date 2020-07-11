const socket = io()

socket.on('message', (message) => {
    console.log(message);
})

document.querySelector('#chat_form').addEventListener('submit', (e) => {
    e.preventDefault()

    const input = e.target.elements.message

    socket.emit('sendMessage', input.value)
})

document.querySelector("#share_location").addEventListener('click', () => {
    if (!navigator.geolocation) {
        return alert('Geolocation is not supported by your browser')
    }

    navigator.geolocation.getCurrentPosition((position) => {
        socket.emit('sendLocation', {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
        })
    })
})