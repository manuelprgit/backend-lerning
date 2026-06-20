import sql from "../config/db.js";

export const getAllUsers = async () => {
    const result = await new sql.Request()
        .query('SELECT * FROM Users');
    return result.recordset;
}

export const getUserById = async (id) => {
    const result = await new sql.Request()
        .input('id', sql.Int, id)
        .query('SELECT * FROM Users WHERE id = @id');
    const userParsed = result.recordset[0];
    if (!userParsed) return null;
    return userParsed;
}

export const postUser = async (name) => {
    const result = await new sql.Request()
        .input('name', sql.VarChar, name)
        .query(`
            INSERT INTO Users (name)
            OUTPUT inserted.*
            VALUES (@name)
        `);
    return result.recordset[0];
}

export const putUser = async (id, name) => {
    if (isNaN(id)) return null;
    const result = await new sql.Request()
        .input('id', sql.Int, id)
        .input('name', sql.VarChar, name)
        .query(`
            UPDATE Users
            SET name = @name
            OUTPUT inserted.*
            WHERE id = @id
        `);
    const updatedUser = result.recordset[0];
    if (!updatedUser) return null;
    return updatedUser;
}

export const delUser = async (id) => {
    if (isNaN(id)) return null;
    const result = await new sql.Request()
        .input('id', sql.Int, id)
        .query('DELETE FROM Users WHERE id = @id');
    if (result.rowsAffected[0] === 0) return null;
    return true;
}
