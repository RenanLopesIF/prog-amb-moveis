import database from "../database/database.js";

class UsuariosModel{
   async insertOne({nome, role}){
        const [res] = await database.query(
            "INSERT INTO `users` (name, role) VALUES (?, ?)",
            [nome, role],
            )
            return res;
    }

   async updateOne({userID, novoNome, novaRole}){
       const [result] = await database.query(
            "UPDATE `users` SET name = ?, role = ? WHERE `id` = ? ",
            [novoNome, novaRole, userID],
        )

        return result;
    }
}

export default new UsuariosModel();