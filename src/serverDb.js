import mongoose form 'mongoose';

const minecraftServerSchema = new mongoose.Schema({
    serverId: { type: String, required: true },
    iPAddress: { type: String, required: true },
});

module.exports = mongoose.model('MinecraftServer', minecraftServerSchema);