import database from "../database/database.js";

class UsuariosModel{
  async getUserById({userId}){
       const [res] = await database.query(
        'SELECT * FROM `usuarios` WHERE id = ?',
        [userId])

        return res
    }

   async getAll(){
        const [res] = await database.query("SELECT * FROM `usuarios`");
        return res
    }

   async insertOne({nome, idade}){
        const [res] = await database.query(
            "INSERT INTO `usuarios` VALUES (default, ?, ?)",
            [nome, idade],
            )
            return res;
    }

   async updateOne({userID, novoNome, novaIdade}){
       const [result] = await database.query(
            "UPDATE `usuarios` SET nome = ?, idade = ? WHERE `id` = ? ",
            [novoNome, novaIdade, userID],
        )

        return result;
    }

    async deleteOne({userId}){
        console.log(userId);
       const [res] = await database.query(
            "DELETE FROM `usuarios` WHERE `id` = ?",
            [userId],
        )

        return res;
    }
}

export default new UsuariosModel();