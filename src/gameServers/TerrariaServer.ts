import {EmbedBuilder} from "discord.js";

export const getEmbed(serverUrl: string): EmbedBuilder {
    const serverInfo = await fetch(`https://api.mcsrvstat.us/3/${serverUrl}`);
    const serverData = await serverInfo.json();

    //.setImage(getLogoUrl());
    return new EmbedBuilder()
        .setTitle(`Minecraft Server Info: `)
        .addFields([
            {name: 'Server Name', value: serverData.hostname},
            {name: 'Online Players', value: `${serverData.players.online}`},
            {name: 'Max Players', value: `${serverData.players.max}`},
        ]);
}