import { GetServers } from "../storage/Db.js";
import { StringSelectMenuOptionBuilder } from "discord.js";
import { ServerTypes } from "../gameServers/serverTypes.js";
export async function AddServerSelectMenu(guildId, selectMenuBuilder) {
    const options = await GetServers(guildId);
    options.forEach((server) => {
        selectMenuBuilder.addOptions(new StringSelectMenuOptionBuilder()
            .setLabel(server.Alias ?? server.URL)
            .setValue(JSON.stringify(server))
            .setDescription(`${server.Type} server`));
    });
}
export async function GetServerChoices(guildId) {
    const option = [];
    const servers = await GetServers(guildId);
    servers.forEach((server) => {
        option.push({ name: `${server.Alias ? server.Alias + ',' : ''} ${server.URL}, ${server.Type}`, value: JSON.stringify(server) });
    });
    return option;
}
export function TryGetServer(interaction) {
    let server = { URL: "", Type: ServerTypes.Minecraft }; //defining server just to make the compiler happy
    try {
        server = JSON.parse(interaction.options.getString('server'));
        return { server: server, result: true };
    }
    catch {
        interaction.reply({ content: `Please pick one of the options.`, ephemeral: true });
        return { server: server, result: false };
    }
}
//# sourceMappingURL=common.js.map