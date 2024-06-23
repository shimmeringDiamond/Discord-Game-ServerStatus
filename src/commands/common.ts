import {GetServers} from "../storage/Db.js";
import {SelectMenuBuilder, SlashCommandBuilder, StringSelectMenuOptionBuilder} from "discord.js";


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
        option.push({name: `${server.URL}, ${server.Type}`, value: JSON.stringify(server)});
    })
    return option;
}