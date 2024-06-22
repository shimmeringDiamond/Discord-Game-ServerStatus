import sqlite3 from 'sqlite3';
const { Database } = sqlite3;import {ServerTypes} from "../gameServers/serverTypes.js";

const db = new Database('storage/database.sqlite');

export async function UpdateOrAddGuild(guildId: string, defaultURL: string = ""): Promise<void> {
    return new Promise((resolve, reject) => {
        db.serialize(() => {
            db.get(`SELECT *
                    FROM Guilds
                    WHERE Id = ?`, [guildId], (err, row) => {
                if (err) {
                    return reject(`Error retrieving guild: ${err.message}`);
                }

                if (row) {
                    db.run(`UPDATE Guilds
                            SET defaultServer = ?
                            WHERE Id = ?`, [defaultURL, guildId], (err) => {
                        if (err) {
                            return reject(`Error updating guild: ${err.message}`);
                        }
                        resolve();
                    });
                } else {
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
export async function UpdateOrAddGuildServer(guildId: string, URL: string, type: ServerTypes): Promise<void> {
    return new Promise((resolve, reject) => {
        db.serialize(() => {
            db.get(`SELECT *
                    FROM GuildServer
                    WHERE GuildId = ? AND URL = ?`, [guildId, URL], (err, row) => {
                if (err) {
                    return reject(`Error retrieving guild: ${err.message}`);
                }

                if (row) {
                    db.run(`UPDATE GuildServer
                            SET Typpe = ?
                            WHERE GuildId = ? AND URL = ?`, [type, guildId, URL], (err) => {
                        if (err) {
                            return reject(`Error updating guild: ${err.message}`);
                        }
                        resolve();
                    });
                } else {
                    db.run(`INSERT INTO GuildServer (GuildId, URL, Type)
                            VALUES (?, ?, ?)`, [guildId, URL, type], (err) => {
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