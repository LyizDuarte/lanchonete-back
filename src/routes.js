import { Router } from 'express';
import UserController from './app/controllers/UserController';
const routes = new Router();

routes.post('/users', UserController.store); //chama o método post e o controller de User com cadastro de user

export default routes;
