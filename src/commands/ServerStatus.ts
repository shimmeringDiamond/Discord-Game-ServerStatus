// @ts-ignore
// @ts-ignore
import {
    ActionRowBuilder,
    ComponentType,
    EmbedBuilder,
    SlashCommandBuilder,
    StringSelectMenuBuilder,
    StringSelectMenuOptionBuilder,
} from "discord.js";
import {functionMap, ServerTypes} from "../gameServers/serverTypes.js";

export const McStatusCommand = new SlashCommandBuilder()
    .setName('server-status')
    .setDescription('Provides information about a particular Minecraft Server');

export async function interactionMcStatus(interaction) {
    if (!interaction.isChatInputCommand()) return;

    if (interaction.commandName === 'server-status') {

        //get default url and servertype from db
        const select = new StringSelectMenuBuilder()// populate with db
            .setCustomId('select-server')
            .addOptions(
                new StringSelectMenuOptionBuilder()
                    .setLabel('Option')
                    .setValue('option')
                    .setDescription('A selectable option')
                    .setDefault(true),
                new StringSelectMenuOptionBuilder()
                    .setLabel('OBption')
                    .setValue('boption')
                    .setDescription('A selectable option')
            );
        const row = new ActionRowBuilder()
            .addComponents(select);

        const response = await interaction.reply({
            embeds: ["functionmap it"], //get default
            components: [row],
        });

        const collector = response.createMessageComponentCollector({componentType: ComponentType.StringSelect , time: 3_600_000});

        collector.on('collect', async i => {
            await i.update({embeds: [await functionMap["get whether it is mc or not from db"](i.value)]});
        });


    }
}


