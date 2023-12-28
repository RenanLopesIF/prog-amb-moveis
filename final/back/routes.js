import { Router, json } from 'express'; 
import UsuariosController from './controllers/usuariosController.js';
import MessagesController from './controllers/messagesController.js';

const routes = new Router();
routes.use(json());

routes.get('/messages', MessagesController.getAll);
routes.post('/messages/inserir', MessagesController.insertOne);
routes.delete('/messages/deletar', MessagesController.deleteOne);

routes.post('/usuario/inserir', UsuariosController.insertOne);
routes.put('/usuario/atualizar', UsuariosController.updateOne);

export default routes;