import {EmbedBuilder} from "discord.js";

export async function getEmbed(serverUrl: string): Promise<EmbedBuilder> {
    const serverInfo = await fetch(`https://api.mcsrvstat.us/3/${serverUrl}`);
    const serverData = await serverInfo.json();

    const embed = new EmbedBuilder()
        .setTitle(`Info for Minecraft Server: ${serverUrl}`);

    if (!serverData.online) {
        embed.setDescription(`Server url invalid or server is offline`);
    }
    else {
        try{
            embed
                .setColor(0x0099FF)
                .setTitle(`Info for Minecraft Server: ${serverUrl}`)
                .addFields([
                    {name: 'Server Name', value: serverData.hostname},
                    { name: '\u200B', value: '\u200B' },
                    {name: 'Online Players', value: `${serverData.players.online}`, inline: true},
                    {name: 'Max Players', value: `${serverData.players.max}`, inline: true},
                    {name: 'Version', value: `${serverData.version}`},
                    {name: 'Motd', value: `${serverData.motd.clean[0]}`}
                ]);
        }
        catch {
            embed
                .setDescription(`Getting info failed :(`)
        }

    }
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