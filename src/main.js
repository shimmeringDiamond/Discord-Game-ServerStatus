import { REST, Routes } from 'discord.js';
import { Client, GatewayIntentBits } from 'discord.js';
import {EmbedBuilder} from "discord.js";

const commands = [
    {
        name: 'Status',
        description: 'Obtains the status for one of the servers',
    },
    {
        name: 'Servers',
        description: 'Adds a new server url or lists the existing servers'
    }
];

const rest = new REST({ version: '10' }).setToken(process.env.DISCORD_TOKEN);

try {
    console.log('Started refreshing application (/) commands.');

    await rest.put(Routes.applicationCommands(process.env.CLIENT_ID), { body: commands });

    console.log('Successfully reloaded application (/) commands.');
} catch (error) {
    console.error(error);
}

const client = new Client({ intents: [GatewayIntentBits.Guilds] });

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

client.on('interactionCreate', async interaction => {
    if (!interaction.isChatInputCommand()) return;

    if (interaction.commandName === 'Status') {
        const serverInfo = await fetch('https://api.mcsrvstat.us/3/hypixel.net');
        const serverData = await serverInfo.json();

        const embed = new EmbedBuilder()
            .setTitle(`Minecraft Server Info: hallo`)
            .addFields([
                { name: 'Server Name', value: serverData.hostname },
                { name: 'Online Players', value: `${serverData.players.online}`},
                { name: 'Max Players', value: `${serverData.players.max}` },
            ])
            //.setImage(getLogoUrl());

        await interaction.reply({embeds: [embed]});
    }
});
const getLogoUrl = function(iconString) {
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
client.login(process.env.DISCORD_TOKEN);