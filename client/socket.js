import io from 'socket.io-client'

// const socket = io(window.location.origin)
const socket = io.connect('http://localhost:8080');
socket.on('connect', () => {
  console.log('Connected!')
})

export default socket
