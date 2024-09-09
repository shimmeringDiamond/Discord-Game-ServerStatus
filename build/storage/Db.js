import sqlite3 from 'sqlite3';
const { Database } = sqlite3;
const db = new Database('storage/database.sqlite');
export async function UpdateOrAddGuild(guildId, defaultURL = "") {
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
                }
                else if (!row) {
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
export async function UpdateOrAddGuildServer(guildId, server) {
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
                            WHERE GuildId = ? AND URL = ?`, [server.Type, server.Alias ?? null, guildId, server.URL], (err) => {
                        if (err) {
                            return reject(`Error updating guildServer: ${err.message}`);
                        }
                        resolve();
                    });
                }
                else {
                    db.run(`INSERT INTO GuildServer (GuildId, URL, Type, Alias)
                            VALUES (?, ?, ?, ?)`, [guildId, server.URL, server.Type, server.Alias ?? null], (err) => {
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
export async function GetServers(guildId) {
    const servers = [];
    return new Promise((resolve, reject) => {
        db.serialize(() => {
            db.all(`SELECT *
                FROM GuildServer
                WHERE GuildId = ?`, [guildId], (err, rows) => {
                if (err) {
                    return reject(`Error retrieving guildServer: ${err.message}`);
                }
                if (rows) {
                    rows.forEach((row) => {
                        const server = {
                            URL: row["URL"],
                            Type: row["Type"],
                            Alias: row["Alias"] ?? null
                        };
                        servers.push(server);
                    });
                }
                resolve(servers);
            });
        });
    });
}
export async function GetDefaultServer(guildId) {
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
                            const server = {
                                URL: serverRow["URL"],
                                Type: serverRow["Type"]
                            };
                            resolve(server);
                        }
                        else {
                            return reject(`Default Server: ${row["defaultServer"]} does not have an entry in GuildServer table`);
                        }
                    });
                }
                else {
                    return reject(`Guild does not exist in Guilds table`);
                }
            });
        });
    });
}
export async function RemoveServer(guildId, server) {
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
                    return reject(`Error deleting row for guildId: ${guildId}, URL: ${server.URL}`);
                }
                resolve();
            });
        });
    });
}
//# sourceMappingURL=Db.js.map