import {SlashCommandBuilder} from "discord.js";
import {UpdateOrAddGuild, UpdateOrAddGuildServer} from "../storage/Db.js";
import {Server, ServerTypes} from "../gameServers/serverTypes.js";
import {GetServerChoices} from "./common.js";

export const DefaultServerCommand = new SlashCommandBuilder()
    .setName('default-server')
    .setDescription('Adds a new server url')
    .addStringOption(option =>
        option.setName('server')
            .setDescription('The server to set as default.')
            .setRequired(true)
            .setAutocomplete(true)

    )

export async function interactionDefaultServer(interaction) {
    if (interaction.isChatInputCommand() && interaction.commandName === 'default-server') {
        let server: Server = {URL: "", Type: ServerTypes.Minecraft}; //defining server just to make the compiler happy
        try {
           server = JSON.parse(interaction.options.getString('server'));
        }
        catch{
            return interaction.reply({content: `Please pick one of the options.`, ephemeral: true});
        }


        await UpdateOrAddGuild(interaction.guildId, server.URL);
        UpdateOrAddGuildServer(interaction.guildId, server)
            .then(statusMessgae => {
                return interaction.reply({content: `Added ${server.URL} as the default server`, ephemeral: true});
            })
            .catch(error => {
                console.error(error);
                return interaction.reply({content: `Could not add the default server, how did you get here???`, ephemeral: true})
            })
    }
    if (interaction.isAutocomplete() && interaction.commandName === 'default-server') {
        interaction.respond(await GetServerChoices(interaction.guildId))
    }
    else {
        return;
    }
}
