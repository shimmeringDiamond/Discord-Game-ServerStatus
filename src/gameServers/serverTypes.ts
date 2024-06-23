import {EmbedBuilder} from "discord.js";
import {getEmbed as mcGetEmbed} from "./MinecraftServer.js";
import {getEmbed as terrGetEmbed} from "./TerrariaServer.js";
interface FunctionMap {
    [key: string]: (serverUrl: string) => Promise<EmbedBuilder>;
}
export enum ServerTypes {
    Terraria = "Terraria",
    Minecraft = "Minecraft",
}
export interface Server {
    URL: string,
    Type: ServerTypes,
}
export const functionMap: FunctionMap = {
    [ServerTypes.Terraria]: (serverUrl) => terrGetEmbed(serverUrl),
    [ServerTypes.Minecraft]: (serverUrl) => mcGetEmbed(serverUrl),
};

