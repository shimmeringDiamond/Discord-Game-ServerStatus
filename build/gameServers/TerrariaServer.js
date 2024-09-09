import { EmbedBuilder } from "discord.js";
export async function getEmbed(serverUrl) {
    const embed = new EmbedBuilder();
    embed.setTitle("Terraria is not supported yet");
    return { embeds: [embed] };
}
//# sourceMappingURL=TerrariaServer.js.map