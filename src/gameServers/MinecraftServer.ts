import {EmbedBuilder} from "discord.js";

export async function getEmbed(serverUrl: string): Promise<EmbedBuilder> {
    const serverInfo = await fetch(`https://api.mcsrvstat.us/3/${serverUrl}`);
    const serverData = await serverInfo.json();

    //.setImage(getLogoUrl());
    return new EmbedBuilder()
        .setTitle(`Info for Minecraft Server: ${serverUrl}`)
        .addFields([
            {name: 'Server Name', value: serverData.hostname},
            {name: 'Online Players', value: `${serverData.players.online}`},
            {name: 'Max Players', value: `${serverData.players.max}`},
        ]);
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