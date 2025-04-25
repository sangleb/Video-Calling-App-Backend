import { Socket } from "socket.io";
import { v4 as uuidv4 } from 'uuid';

const roomHandler = (socket : Socket) => {
    const createRoom = () => {
        const roomId = uuidv4(); // this will create a unique room id
        socket.join(roomId); // make a socket connection to the room
        socket.emit('room-created', { roomId }); // will emmit an event
        // from sever side that socket connection has been added to room
        console.log("Room created with id : ", roomId);
    };

    const joinedRoom = ({roomId, peerId} : {roomId: string, peerId: string}) => {
        console.log("new user has joined the room", roomId, "with peerId as: ", peerId);
    };


    // when to call the above functions ?

    // we will call above two functions when two client will emits event to
    // create room and join roomCreated

    socket.on("create-room", createRoom);
    socket.on("joined-room", joinedRoom);
};
export default roomHandler;