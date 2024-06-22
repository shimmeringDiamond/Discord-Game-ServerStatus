import {EmbedBuilder} from "discord.js";
import {getEmbed as mcGetEmbed} from "./MinecraftServer";
import {getEmbed as terrGetEmbed} from "./TerrariaServer";
interface FunctionMap {
    [key: string]: (serverUrl: string) => EmbedBuilder;
}
export enum ServerTypes {
    Terraria = "Terraria",
    Minecraft = "Minecraft",
}

export const functionMap: FunctionMap = {
    [ServerTypes.Terraria]: (serverUrl) => terrGetEmbed(serverUrl),
    [ServerTypes.Minecraft]: (serverUrl) => mcGetEmbed(serverUrl),
};

