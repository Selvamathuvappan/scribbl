const io = require("socket.io")(4000, {
    cors : {
        origin : [
            "http://127.0.0.1:5500",
        ]
    }
})

io.on('connection', socket => {
    console.log(socket.id);
    socket.on('next-strokes', points => {
        console.log(points)
        socket.broadcast.emit('draw-strokes', points)
    })
})