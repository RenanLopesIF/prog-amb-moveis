import database from "../database/database.js";

class MessagesModel{
   async insertOne({autorId, message}){
        const [res] = await database.query(
            "INSERT INTO `messages` (autorId, message) VALUES (?, ?)",
            [autorId, message],
            )
            return res;
    }

    async getAll(){
        const [res] = await database.query("SELECT messages.*, users.name AS autorName, users.`role` as autorRole FROM `messages` JOIN users ON messages.autorId = users.id ORDER BY messages.created_at DESC");
        return res
    }

   async deleteOne({messageId}){
       const [result] = await database.query(
            "DELETE FROM `messages` WHERE `id` = ? ",
            [messageId],
        )

        return result;
    }
}

export default new MessagesModel();