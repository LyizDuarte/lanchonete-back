/*
store => Cadastrar / Adicionar
index => Listar vários
show => Listar apenas um
update => atualizar
delete => deletar
*/
import { v4 } from 'uuid';
import User from '../models/User';
import * as Yup from 'yup';

class UserController {
  async store(req, res) {
    //metodo store é async

    const schema = Yup.object().shape({
      name: Yup.string().required('É necessario inserir o nome!'),
      email: Yup.string()
        .email('Formato de email inválido')
        .required('É necessário inserir o email!'),
      password: Yup.string()
        .required('É necessário inserir a senha!')
        .min(6, 'A senha deve ter pelo menos 6 caractéres!'),
      admin: Yup.boolean('Deve ser true or false'),
    });

    try {
      await schema.validateSync(req.body, { abortEarly: false }); // diz para considerar todos os erros invés apenas do primeiro
    } catch (err) {
      return res.status(400).json({ error: err.errors }); // retorna com status 400 todos os erros
    }

    const { name, email, password, admin } = req.body; //pega os dados que precisa

    const emailExists = await User.findOne({
      where: { email },
    }); //procura se já existe o email fornecido

    if (emailExists) {
      return res.status(400).json({ Error: 'Email já existe!' });
    }

    const user = await User.create({
      //chama o model User e usa uma função create para criar o usuario
      id: v4(),
      name,
      email,
      password,
      admin,
    }); //modelo do objeto de usuário

    return res.status(201).json({ id: user.id, name, email, admin }); //retorna status 201 e id, name, email e admin inseridos
  }
}
export default new UserController();
