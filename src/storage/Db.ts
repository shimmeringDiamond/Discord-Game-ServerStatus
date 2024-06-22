import * as sqlite3 from 'sqlite3';
import {ServerTypes} from "../gameServers/serverTypes";
//TODO: add db integration
const db = new sqlite3.Database('database.sqlite');

export async function UpdateOrAddGuild(guildId: string, defaultURL: string = ""): Promise<void> {
    return new Promise((resolve, reject) => {
        db.serialize(() => {
            // Check if the guild already exists
            db.get(`SELECT *
                    FROM Guilds
                    WHERE Id = ?`, [guildId], (err, row) => {
                if (err) {
                    return reject(`Error retrieving guild: ${err.message}`);
                }

                if (row) {
                    // Guild exists, update the defaultURL
                    db.run(`UPDATE Guilds
                            SET defaultServer = ?
                            WHERE Id = ?`, [defaultURL, guildId], (err) => {
                        if (err) {
                            return reject(`Error updating guild: ${err.message}`);
                        }
                        resolve();
                    });
                } else {
                    // Guild does not exist, insert a new record
                    db.run(`INSERT INTO Guilds (Id, defaultServer)
                            VALUES (?, ?)`, [guildId, defaultURL], (err) => {
                        if (err) {
                            return reject(`Error adding new guild: ${err.message}`);
                        }
                        resolve();
                    });
                }
            });
        });
    });
}
export async function UpdateOrAddServer(guildId: string, URL: string, type: ServerTypes): Promise<void> {
    return new Promise((resolve, reject) => {
        db.serialize(() => {
            // Check if the guild already exists
            db.get(`SELECT *
                    FROM GuildServer
                    WHERE GuildId = ?`, [guildId], (err, row) => {
                if (err) {
                    return reject(`Error retrieving guild: ${err.message}`);
                }

                if (row) {
                    // Guild exists, update the defaultURL
                    db.run(`UPDATE Servers
                            SET URL = ?
                            WHERE Type = ?`, [URL, guildId], (err) => {
                        if (err) {
                            return reject(`Error updating guild: ${err.message}`);
                        }
                        resolve();
                    });
                } else {
                    // Guild does not exist, insert a new record
                    db.run(`INSERT INTO Guilds (Id, defaultServer)
                            VALUES (?, ?)`, [guildId, defaultURL], (err) => {
                        if (err) {
                            return reject(`Error adding new guild: ${err.message}`);
                        }
                        resolve();
                    });
                }
            });
        });
    });
}