import UsuariosModel from "../models/usuariosModel.js";

class UsuariosController {
      async insertOne(req, res) {
        try {
          const result = await UsuariosModel.insertOne({nome: req.body.name, role: req.body.role});
    
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
          const result = await UsuariosModel.updateOne({novaRole: req.body.role, novoNome: req.body.name, userID: req.body.userId});
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