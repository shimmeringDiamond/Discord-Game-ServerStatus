import {GetServers} from "../storage/Db.js";
import {SelectMenuBuilder, StringSelectMenuOptionBuilder} from "discord.js";
import {Server, ServerTypes} from "../gameServers/serverTypes.js";


export type ChoiceOption = {
    name: string;
    value: string;
};
export async function AddServerSelectMenu(guildId: string, selectMenuBuilder: SelectMenuBuilder) {
    const options = await GetServers(guildId);
    options.forEach((server) => {
        selectMenuBuilder.addOptions(
            new StringSelectMenuOptionBuilder()
                .setLabel(server.URL)
                .setValue(JSON.stringify(server))
                .setDescription(`${server.Type} server`)
        )
    })
}
export async function GetServerChoices(guildId: string): Promise<ChoiceOption[]> {
    const option: ChoiceOption[] = [];
    const servers = await GetServers(guildId);
    servers.forEach((server) => {
        option.push({name: `${server.Alias?? ''}, ${server.URL}, ${server.Type}`, value: JSON.stringify(server)});
    })
    return option;
}

export function TryGetServer(interaction): {server: Server, result: boolean} {
    let server: Server = {URL: "", Type: ServerTypes.Minecraft}; //defining server just to make the compiler happy
    try {
        server = JSON.parse(interaction.options.getString('server'));
        return {server: server, result: true};
    }
    catch{
        interaction.reply({content: `Please pick one of the options.`, ephemeral: true});
        return {server: server, result: false};
    }

}