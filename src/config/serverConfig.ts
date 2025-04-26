import dotenv from 'dotenv';

dotenv.config();

export default {
    PORT: process.env.PORT || 5000,
};

/**
 * To start the peer js server use cmd `peerjs --port 9000 --key peerjs --path /myapp`
 */