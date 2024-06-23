import {
    ActionRowBuilder,
    ComponentType, EmbedBuilder,
    SlashCommandBuilder,
    StringSelectMenuBuilder,
    StringSelectMenuOptionBuilder,
} from "discord.js";
import {functionMap, Server, ServerTypes} from "../gameServers/serverTypes.js";
import {GetDefaultServer, GetServers, UpdateOrAddGuild, UpdateOrAddGuildServer} from "../storage/Db.js";
import {AddServerSelectMenu, GetServerChoices} from "./common.js";

export const McStatusCommand = new SlashCommandBuilder()
    .setName('server-status')
    .setDescription('Provides information about a particular Minecraft Server')
    .addStringOption(option =>
        option.setName('server')
            .setDescription('The server to get the status for.')
            .setRequired(false)
            .setAutocomplete(true)
    );

export async function interactionMcStatus(interaction) {
    if (interaction.commandName === 'server-status' && interaction.isChatInputCommand()) {

        const select = new StringSelectMenuBuilder()
            .setCustomId('select-server')
            .setPlaceholder('Select a server')
        await AddServerSelectMenu(interaction.guildId, select);

        const row = new ActionRowBuilder()
            .addComponents(select);

        let embed: EmbedBuilder = new EmbedBuilder();
        let server: Server = {URL: "", Type: ServerTypes.Minecraft}; //defining server just to make the compiler happy

        try {
            const defaultServer = await GetDefaultServer(interaction.guildId)
            embed = await functionMap[defaultServer.Type](defaultServer.URL)
        }
        catch {
            embed = new EmbedBuilder()
                .setDescription('Could not find default server, Did you set one?');
        }
        if (interaction.options.getString('server')) {
            try {
                server =JSON.parse(interaction.options.getString('server'))
                embed = await functionMap[server.Type](server.URL)
            }
            catch {}
        }


        const response = await interaction.reply({
            embeds: [embed],
            components: [row],
        });

        const collector = response.createMessageComponentCollector({componentType: ComponentType.StringSelect , time: 3_600_000});

        collector.on('collect', async i => {
            const server: Server = JSON.parse(i.values[0])
            await i.update({embeds: [await functionMap[server.Type](server.URL)]});
        });
    }
    else if (interaction.commandName === 'server-status' && interaction.isAutocomplete()) {
        interaction.respond(await GetServerChoices(interaction.guildId))
    }
}


