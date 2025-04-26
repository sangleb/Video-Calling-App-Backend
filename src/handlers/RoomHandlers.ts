import { Socket } from "socket.io";
import IRoomParams from '../interfaces/IRoomParams';
import { v4 as UUIDV4 } from 'uuid';

const roomHandler = (socket : Socket) => {

    // the below map stores for a room what all peers have joined
    const rooms : Record<string, string[]> = {};
    const createRoom = () => {
        console.log("function called");
        const roomId = UUIDV4(); // this will create a unique room id

        socket.join(roomId); // will make a socket connection to the room

        rooms[roomId] = []; // create a new entry for room

        socket.emit('room-created', { roomId }); // will emmit an event
        // from sever side that socket connection has been added to room
        console.log("Room created with id : ", roomId);

        // below event is for logging purpose
        socket.emit("get-users", {
            roomId,
            participants: rooms[roomId]
        });

    };


    /**
     *
     * The below function is executed everytime a user(creator/joinee)
     * joins a new room
     */
    const joinedRoom = ({roomId, peerId} : IRoomParams) => {
        console.log("joined room called");
        if (rooms[roomId]){
            // if the given roomId exist in the memory db
            console.log("new user has joined the room", roomId, "with peerId as: ", peerId);
            // the moment new user joins, add the peerId to the key of roomId
            rooms[roomId].push(peerId);
            socket.join(roomId); // make the user join the socket room
        }

    };


    // when to call the above functions ?

    // we will call above two functions when two client will emits event to
    // create room and join roomCreated

    socket.on("create-room", createRoom);
    socket.on("joined-room", joinedRoom);
};
export default roomHandler;