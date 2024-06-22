import {InteractionType, SlashCommandBuilder} from "discord.js";
import {ServerTypes} from "../gameServers/serverTypes";
import {UpdateOrAddGuild} from "../storage/Db";

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
        option.setName('Host')
            .setDescription('The URL or hostname of the game server.')
            .setRequired(true)
    )
    .addStringOption(option =>
        option.setName('Game')
            .setDescription('The game that this server hosts.')
            .setRequired(true)
            .addChoices(choices)

    )

export async function executeAddServer(interaction) {
    UpdateOrAddGuild(interaction.guildId)
        .then(statusMessgae => {
            return interaction.reply({content: `Added `, empheral: true});
        })
        .catch(error => {
            console.error(error);
            return interaction.reply({})
        })

}


