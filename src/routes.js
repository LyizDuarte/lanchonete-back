import { Router } from 'express';
import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';
const routes = new Router();

routes.post('/users', UserController.store); //chama o método post e o controller de User com cadastro de user
routes.post('/sessions', SessionController.store);

export default routes;
