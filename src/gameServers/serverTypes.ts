import {EmbedBuilder, InteractionReplyOptions} from "discord.js";
import {getReply as mcGetEmbed} from "./MinecraftServer.js";
import {getEmbed as terrGetEmbed} from "./TerrariaServer.js";
interface FunctionMap {
    [key: string]: (serverUrl: string) => Promise<InteractionReplyOptions>;
}
export enum ServerTypes {
    Terraria = "Terraria",
    Minecraft = "Minecraft",
}
export interface Server {
    URL: string,
    Type: ServerTypes,
    Alias?: string | null
}
export const functionMap: FunctionMap = {
    [ServerTypes.Terraria]: (serverUrl) => terrGetEmbed(serverUrl),
    [ServerTypes.Minecraft]: (serverUrl) => mcGetEmbed(serverUrl),
};

