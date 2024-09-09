import { getReply as mcGetEmbed } from "./MinecraftServer.js";
import { getEmbed as terrGetEmbed } from "./TerrariaServer.js";
export var ServerTypes;
(function (ServerTypes) {
    ServerTypes["Terraria"] = "Terraria";
    ServerTypes["Minecraft"] = "Minecraft";
})(ServerTypes || (ServerTypes = {}));
export const functionMap = {
    [ServerTypes.Terraria]: (serverUrl) => terrGetEmbed(serverUrl),
    [ServerTypes.Minecraft]: (serverUrl) => mcGetEmbed(serverUrl),
};
//# sourceMappingURL=serverTypes.js.map