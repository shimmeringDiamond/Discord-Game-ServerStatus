import {ApplicationCommand, ApplicationCommandManager, REST, Routes} from 'discord.js';
import { Client, Events, GatewayIntentBits } from 'discord.js';
import {EmbedBuilder} from "discord.js";

import {McStatusCommand, interactionMcStatus} from "./commands/ServerStatus.js";
import {AddServerCommand, interactionAddServer} from "./commands/AddServer.js";
import {DefaultServerCommand, interactionDefaultServer} from "./commands/DefaultServer.js";
import {DeleteServerCommand, interactionDeleteServer} from "./commands/DeleteServer.js";

import {UpdateOrAddGuild} from "./storage/Db.js";

const commands= [AddServerCommand, McStatusCommand, DefaultServerCommand, DeleteServerCommand];

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

client.on(Events.InteractionCreate, async (interaction) => {
    await UpdateOrAddGuild(interaction.guildId);
});
client.on(Events.InteractionCreate, interactionMcStatus);
client.on(Events.InteractionCreate, interactionAddServer);
client.on(Events.InteractionCreate, interactionDefaultServer);
client.on(Events.InteractionCreate, interactionDeleteServer);

client.login(process.env.DISCORD_TOKEN);
