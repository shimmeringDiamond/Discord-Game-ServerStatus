import {EmbedBuilder, InteractionReplyOptions} from "discord.js";

export async function getEmbed(serverUrl: string): Promise<InteractionReplyOptions> {

    const embed = new EmbedBuilder()
    embed.setTitle("Terraria is not supported yet")

    return {embeds: [embed]};
}
