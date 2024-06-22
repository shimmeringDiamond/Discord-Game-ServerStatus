import {ApplicationCommand, ApplicationCommandManager, REST, Routes} from 'discord.js';
import { Client, Events, GatewayIntentBits } from 'discord.js';
import {EmbedBuilder} from "discord.js";

import {McStatusCommand, executeMcStatus} from "./commands/ServerStatus";
import {AddServerCommand, executeAddServer} from "./commands/AddServer";

const commands= [AddServerCommand, McStatusCommand];

const rest = new REST({ version: '10' }).setToken(process.env.DISCORD_TOKEN);

try {
    console.log('Started refreshing application (/) commands.');
    await rest.put(Routes.applicationCommands(process.env.CLIENT_ID), { body: commands });
    console.log('Successfully reloaded application (/) commands.');
} catch (error) {
    console.error(error);
}

const client = new Client({ intents: [GatewayIntentBits.Guilds] });

client.on(Events.ClientReady, () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

client.on(Events.InteractionCreate, executeMcStatus);
client.on(Events.InteractionCreate, executeAddServer);


client.login(process.env.DISCORD_TOKEN);