import {SlashCommandBuilder} from "discord.js";

export const AddServerCommand = new SlashCommandBuilder()
    .setName('add-server')
    .setDescription('Adds a new server url for minecraft or Terraria')
    /*.addStringOption(option =>
        option.setName('category')
            .setDescription('The URL or hostname of the Minecraft server')
            .setRequired(true)
            .addChoices(
                {name: 'lingabing', value: 'shing'},
            )

    );*/
export async function executeAddServer(interaction) {

}


