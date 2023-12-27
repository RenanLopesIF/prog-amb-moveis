import { Router, json } from 'express'; 
import UsuariosController from './controllers/usuariosController.js';

const routes = new Router();
routes.use(json());

routes.get('/usuarios', UsuariosController.getAll);
routes.post('/inserir-usuario', UsuariosController.insertOne);
routes.put('/atualizar-usuario', UsuariosController.updateOne);
routes.delete('/deletar-usuario', UsuariosController.deleteOne);

export default routes;