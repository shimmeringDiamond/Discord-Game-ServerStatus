import {InteractionType, PermissionFlagsBits, SlashCommandBuilder} from "discord.js";
import {Server, ServerTypes} from "../gameServers/serverTypes.js";
import {UpdateOrAddGuild, UpdateOrAddGuildServer} from "../storage/Db.js";
import {ChoiceOption} from "./common";



const choices: ChoiceOption[] = [];
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
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)

export async function interactionAddServer(interaction) {
    if (!interaction.isChatInputCommand()) return;
    if (interaction.commandName === 'add-server') {
        const server: Server = {
            URL: interaction.options.getString('host'),
            Type: interaction.options.getString('game')
        };
        UpdateOrAddGuildServer(interaction.guildId, server)
            .then(() => {
                return interaction.reply({content: `Added ${server.URL}`, ephemeral: true});
            })
            .catch(error => {
                console.error(error);
            })
    }
}


