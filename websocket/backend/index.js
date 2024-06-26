import express from 'express';
import http from 'http';
import ip from 'ip';
import { Server } from 'socket.io';
import cors from 'cors';
const app = express();
const server = http.createServer(app);
const PORT = 3000;
const io = new Server(server, {
    cors: {
        origin: '*',
        }
})



const apiurl = "https://opentdb.com/api.php?amount=10&category=15&difficulty=easy&type=multiple";
const scores = new Map();

// let dicoscrore ={
//     "&evgf": 0,
// }
app.use(cors())
app.get('/', (req, res) => {
    res.json('ip address: http://' + ip.address()+':'+PORT);    
});

io.on('connection', (socket) => {

    console.log('a user connected');

    const userId = socket.id;
    console.log('User ID:', userId);

    socket.broadcast.emit('user connected');
    socket.on('disconnect', () => {
        console.log('user disconnected');
        socket.broadcast.emit('user disconnected');
    });
    
    socket.on('message', (msg) => {
        console.log('message: ' + msg);
        io.emit('message', msg);
    });

    // socket.on('getScore', (msg) => {
    //     let idsocket = socket.id;
    //     if (dicoscrore[idsocket] == undefined){
    //         dicoscrore[idsocket] = 0;
    //     }
    //     data = dicoscrore[idsocket];
    //     socket.emit('score', data);

    // })
    
    // socket.on('room', (room, msg) => {
    //     console.log('room: ' + room + ' message: ' + msg);
    //     socket.join(room);
    // });

    socket.on('join', (room) => {
        console.log('join room: ' + room);
        socket.join(room);
        scores.set(socket.id, 0)
    });
    socket.on('leave', (room) => {
        console.log('leave room: ' + room);
        socket.leave(room);
        io.to(room).emit('leave', room);
    });

    socket.on('putScore', (score) =>{
        scores.set(socket.id, score);
    })

    socket.on('getScores', async (room)=>{
        // console.log(io.in(room).allSockets());
        let scoresToSend = [];
        const socketInRoom = await io.in(room).allSockets().then((value) => {return value});
        if(socketInRoom){
        scores.forEach((value, key) =>{
            if(socketInRoom.has(key)){
                scoresToSend.push({key, value});
            }
        })

        io.to(room).emit('scores', scoresToSend);
    }
    })

    socket.on('start', async (room) =>{
        console.log('starting game in room: ' + room);
        const response = await fetch(apiurl);
        const data = await response.json();
        io.to(room).emit('apiData', data);
    })
})


server.listen(PORT, () => {
    console.log('Server ip : http://' +ip.address() +":" + PORT);
})

