import sqlite3 from 'sqlite3';
import {Server} from '../gameServers/serverTypes'

const { Database } = sqlite3;

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

                if (row && defaultURL != "") {
                    db.run(`UPDATE Guilds
                            SET defaultServer = ?
                            WHERE Id = ?`, [defaultURL, guildId], (err) => {
                        if (err) {
                            return reject(`Error updating guild: ${err.message}`);
                        }
                        resolve();
                    });
                } else if (!row) {
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
export async function UpdateOrAddGuildServer(guildId: string, server: Server): Promise<void> {
    return new Promise((resolve, reject) => {
        db.serialize(() => {
            db.get(`SELECT *
                    FROM GuildServer
                    WHERE GuildId = ? AND URL = ?`, [guildId, server.URL], (err, row) => {
                if (err) {
                    return reject(`Error retrieving guildServer: ${err.message}`);
                }

                if (row) {
                    db.run(`UPDATE GuildServer
                            SET Type = ?, Alias = ?
                            WHERE GuildId = ? AND URL = ?`, [server.Type, server.Alias?? null,guildId, server.URL], (err) => {
                        if (err) {
                            return reject(`Error updating guildServer: ${err.message}`);
                        }
                        resolve();
                    });
                } else {
                    db.run(`INSERT INTO GuildServer (GuildId, URL, Type, Alias)
                            VALUES (?, ?, ?, ?)`, [guildId, server.URL, server.Type, server.Alias?? null], (err) => {
                        if (err) {
                            return reject(`Error adding new guildServer: ${err.message}`);
                        }
                        resolve();
                    });
                }
            });
        });
    });
}
export async function GetServers(guildId: string): Promise<Server[]> {
    const servers: Server[] = [];
    return new Promise((resolve, reject) => {
        db.serialize(() => {
            db.all(`SELECT *
                FROM GuildServer
                WHERE GuildId = ?`, [guildId], (err, rows) => {
            if (err) {
                return reject(`Error retrieving guildServer: ${err.message}`)
            }
            if (rows) {
                rows.forEach((row) => {
                    const server: Server = {
                        URL: row["URL"],
                        Type: row["Type"],
                        Alias: row["Alias"]?? null
                    };
                    servers.push(server);
                });
            }
            resolve(servers);
            })
        })
    })
}
export async function GetDefaultServer(guildId: string): Promise<Server> {
    return new Promise((resolve, reject) => {
        db.serialize(() => {
            db.get(`SELECT *
                FROM Guilds
                WHERE Id = ?`, [guildId], (err, row) => {
            if (err) {
                return reject(`Error retrieving guild defaultServer: ${err.message}`);
            }
            if (row) {
                db.get(`SELECT *
                    FROM GuildServer
                    WHERE GuildId = ? AND URL = ?`, [guildId, row["defaultServer"]], (err, serverRow) => {
                if (err) {
                    return reject(`Error getting info for defaultServer: ${err.message}`);
                }
                if (serverRow) {
                    const server: Server = {
                        URL: serverRow["URL"],
                        Type: serverRow["Type"]
                    };
                    resolve(server);
                }
                else {
                    return reject(`Default Server: ${row["defaultServer"]} does not have an entry in GuildServer table`)
                }
                })
            }
            else {
                return reject(`Guild does not exist in Guilds table`)
            }
            })
        })
    })
}
export async function RemoveServer(guildId: string, server: Server): Promise<void> {
    return new Promise((resolve, reject) => {
        db.serialize(() => {
            db.get(`SELECT *
                FROM Guilds
                WHERE Id = ?`, [guildId], (err, row) => {
            if (err) {
                return reject(`Error selecting from Guilds`);
            }
            if (row && row["defaultServer"] == server.URL) {
                db.run(`UPDATE Guilds
                    SET defaultServer = ?
                    WHERE GuildId = ?`, ["", guildId], (err) => {
                if (err) {
                    return reject('Error resetting defaultServer');
                }
                });
            }
            });
            db.run(`DELETE
                FROM GuildServer
                WHERE GuildId = ? AND URL = ?`, [guildId, server.URL], (err) => {
            if (err) {
                return reject(`Error deleting row for guildId: ${guildId}, URL: ${server.URL}`)
            }
            resolve();
            })
        })
    })

}