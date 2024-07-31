/*
store => Cadastrar / Adicionar
index => Listar vários
show => Listar apenas um
update => atualizar
delete => deletar
*/
import { v4 } from 'uuid';
import User from '../models/User';

class UserController {
  async store(req, res) { //metodo store é async
    const { name, email, password_hash, admin } = req.body; //pega os dados que precisa

    const user = await User.create({ //chama o model User e usa uma função create para criar o usuario
      id: v4(),
      name,
      email,
      password_hash,
      admin,
    }); //modelo do objeto de usuário

    return res.status(201).json({ id: user.id, name, email, admin}); //retorna status 201 e id, name, email e admin inseridos
  }
}
export default new UserController()

