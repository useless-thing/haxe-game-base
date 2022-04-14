const ws = new WebSocket('ws://localhost:30000');

ws.onmessage = (e) => {
  console.log(e.data)
  if (e.data === 'reload') {
    window.location.reload()
  }
}