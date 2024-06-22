import {
    ActionRowBuilder,
    EmbedBuilder,
    SlashCommandBuilder,
    StringSelectMenuBuilder,
    StringSelectMenuOptionBuilder,
} from "discord.js";
import {ComponentType} from "discord.js"

export const McStatusCommand = new SlashCommandBuilder()
    .setName('mc-status')
    .setDescription('Provides information about a particular Minecraft Server');

export async function executeMcStatus(interaction) {
    if (!interaction.isChatInputCommand()) return;

    if (interaction.commandName === 'mc-status') {

        const select = new StringSelectMenuBuilder()
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
            embeds: [await getEmbed('hypixel.net')],
            components: [row],
        });

        const collector = response.createMessageComponentCollector({componentType: ComponentType.StringSelect , time: 3_600_000});

        collector.on('collect', async interaction => {
            await interaction.update({embeds: [await getEmbed('join.insanitycraft.net')]});
        });


    }
}
async function getEmbed(serverUrl) {
    const serverInfo = await fetch(`https://api.mcsrvstat.us/3/${serverUrl}`);
    const serverData = await serverInfo.json();

    const embed = new EmbedBuilder()
        .setTitle(`Minecraft Server Info: `)
        .addFields([
            {name: 'Server Name', value: serverData.hostname},
            {name: 'Online Players', value: `${serverData.players.online}`},
            {name: 'Max Players', value: `${serverData.players.max}`},
        ])
    //.setImage(getLogoUrl());
    return embed;
}
function getLogoUrl(iconString) {
    var img = new Image();
    /*const base64Data = serverData.icon.split(",")[1];
        const mimeType = serverData.icon.split(":")[1].split(";")[0];
        const blob = new Blob([atob(base64Data)], {type: mimeType})

        const formData = new FormData();
        formData.append('file', new File([atob(base64Data)], 'test.png', {type : mimeType}));
        //formData.append('expires', new Date(new Date().getTime() +60000).toISOString());
        //formData.append('autoDelete', true);

        const url = await fetch('https://file.io/', {
            method: 'POST',
            body: formData
        })
            .then(response => response.json())
            .then(data => console.log(data));*/
    return ""
}
