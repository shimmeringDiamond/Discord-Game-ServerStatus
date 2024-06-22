import {InteractionType, SlashCommandBuilder} from "discord.js";
import {ServerTypes} from "../gameServers/serverTypes.js";
import {UpdateOrAddGuild, UpdateOrAddGuildServer} from "../storage/Db.js";

type Option = {
    name: string;
    value: string;
};


const choices: Option[] = [];
Object.values(ServerTypes).forEach((serverType) => {
    choices.push({name: serverType, value: serverType})
})
export const AddServerCommand = new SlashCommandBuilder()
    .setName('add-server')
    .setDescription('Adds a new server url')
    .addStringOption(option =>
        option.setName('host')
            .setDescription('The URL or hostname of the game server.')
            .setRequired(true)
    )
    .addStringOption(option =>
        option.setName('game')
            .setDescription('The game that this server hosts.')
            .setRequired(true)
            .addChoices(choices)

    )

export async function interactionAddServer(interaction) {
    await UpdateOrAddGuild(interaction.guildId);
    UpdateOrAddGuildServer(interaction.guildId, interaction.options.getString('host'), interaction.options.getString('game'))
        .then(statusMessgae => {
            return interaction.reply({content: `Added `, empheral: true});
        })
        .catch(error => {
            console.error(error);
            return interaction.reply({})
        })

}


