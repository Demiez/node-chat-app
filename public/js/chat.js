const socket = io()

const $form = document.querySelector('#chat_form')
const $formInput = $form.querySelector('input')
const $formButton = $form.querySelector('button')
const $shareButton = document.querySelector('#share_location')


socket.on('message', (message) => {
    console.log(message);
})

$form.addEventListener('submit', (e) => {
    e.preventDefault()

    $formButton.setAttribute('disabled', 'disabled')

    const message = e.target.elements.message

    socket.emit('sendMessage', message.value, (error) => {
        $formButton.removeAttribute('disabled')
        $formInput.value = ''
        $formInput.focus()

        if (error) {
            return console.log(error)
        }

        console.log('Message delivered')
    })
})

$shareButton.addEventListener('click', () => {
    if (!navigator.geolocation) {
        return alert('Geolocation is not supported by your browser')
    }
    $shareButton.setAttribute('disabled', 'disabled')

    navigator.geolocation.getCurrentPosition((position) => {
        socket.emit('sendLocation', {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
        }, (message) => {
            $shareButton.removeAttribute('disabled')

            console.log(message)
        })
    },)
})