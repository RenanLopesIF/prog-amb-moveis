import UsuariosModel from "../models/usuariosModel.js";

class UsuariosController {
    async getOne(req, res) {
        try {
          const userId = req.params.id;

          const result = await UsuariosModel.getUserById({ userId });
    
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
          const result = await UsuariosModel.getAll();
    
          res.status(200).send(result);
        } catch (error) {
          console.log(error);
          res.status(400).send({ message: 'error' });
        } finally {
          res.end();
        }
      }

      async insertOne(req, res) {
        try {
          console.log(req.body)
          const result = await UsuariosModel.insertOne({nome: req.body.name, idade: req.body.age});
    
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
          const result = await UsuariosModel.deleteOne({userId: req.body.userId});
    
          res.status(200).send(result);

        } catch (error) {
          console.log(error);
          res.status(400).send({ message: 'error' });
        } finally {
          res.end();
        }
      }

      async updateOne(req,res){
        try {
          const result = await UsuariosModel.updateOne({novaIdade: req.body.age, novoNome: req.body.name, userID: req.body.userId});
          console.log(req.body);
          res.status(200).send(result);

        } catch (error) {
          console.log(error);
          res.status(400).send({ message: 'error' });
        } finally {
          res.end();
        }
      }
}

export default new UsuariosController();