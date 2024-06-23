import {EmbedBuilder} from "discord.js";

export async function getEmbed(serverUrl: string): Promise<EmbedBuilder> {

    return new EmbedBuilder()
        .setDescription("Whoops: Terraria servers aren't implemented yet.");
}