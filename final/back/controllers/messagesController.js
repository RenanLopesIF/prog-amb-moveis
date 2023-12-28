import MessagesModel from "../models/messagesModel.js";

class MessagesController {
      async insertOne(req, res) {
        try {
          const result = await MessagesModel.insertOne({autorId: req.body.autorId, message: req.body.message});
    
          res.status(200).send(result);

        } catch (error) {
          console.log(error);
          res.status(400).send({ message: 'error' });
        } finally {
          res.end();
        }
      }

      async getAll(req, res) {
        try {
          const result = await MessagesModel.getAll();
    
          res.status(200).send(result);
        } catch (error) {
          console.log(error);
          res.status(400).send({ message: 'error' });
        } finally {
          res.end();
        }
      }

      async deleteOne(req,res){
        try {
          const result = await MessagesModel.deleteOne({messageId: req.body.messageId});
    
          res.status(200).send(result);

        } catch (error) {
          console.log(error);
          res.status(400).send({ message: 'error' });
        } finally {
          res.end();
        }
      }
}

export default new MessagesController();