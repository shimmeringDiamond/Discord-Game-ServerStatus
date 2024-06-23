import {
    ActionRowBuilder,
    ComponentType, EmbedBuilder,
    SlashCommandBuilder,
    StringSelectMenuBuilder,
    StringSelectMenuOptionBuilder,
} from "discord.js";
import {functionMap, Server, ServerTypes} from "../gameServers/serverTypes.js";
import {GetDefaultServer, GetServers, UpdateOrAddGuild, UpdateOrAddGuildServer} from "../storage/Db.js";
import {AddServerSelectMenu} from "./common.js";

export const McStatusCommand = new SlashCommandBuilder()
    .setName('server-status')
    .setDescription('Provides information about a particular Minecraft Server');

export async function interactionMcStatus(interaction) {
    if (!interaction.isChatInputCommand()) return;
    if (interaction.commandName === 'server-status') {

        const select = new StringSelectMenuBuilder()
            .setCustomId('select-server')
            .setPlaceholder('Select a server')
        await AddServerSelectMenu(interaction.guildId, select);

        const row = new ActionRowBuilder()
            .addComponents(select);

        let embed: EmbedBuilder = new EmbedBuilder();
        try {
            const defaultServer = await GetDefaultServer(interaction.guildId)

            embed = await functionMap[defaultServer.Type](defaultServer.URL)
        }
        catch {
            embed = new EmbedBuilder()
                .setDescription('Could not find default server, Did you set one?');
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
}


