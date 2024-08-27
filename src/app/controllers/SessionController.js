import * as Yup from 'yup';
import User from '../models/User';
import jwt from 'jsonwebtoken';
import authConfig from '../../config/auth';

class SessionController {
  async store(req, res) {
    const schema = Yup.object().shape({
      email: Yup.string().email().required(),
      password: Yup.string().required(),
    }); //criação do esquema de validação

    const emailOrPasswordIncorrect = () => {
      return res.status(401).json('Email ou senha incorretos!');
    }; //função para retorna mensagem de erro

    if (!(await schema.isValid(req.body))) return emailOrPasswordIncorrect();
    //verifica se os dados são validos

    const { email, password } = req.body; //pega email e senha no corpo de requisição

    const user = await User.findOne({
      where: { email },
    }); //procura um email igual o enviado no corpo de requisição

    if (!user) return emailOrPasswordIncorrect(); //se não existir o email retorna um erro

    if (!(await user.checkPassword(password)))
      return emailOrPasswordIncorrect(); //se a senha estiver incorreta retorna um erro

    return res.json({
      id: user.id,
      email,
      name: user.name,
      admin: user.admin,
      token: jwt.sign({ id: user.id }, authConfig.secret, {
        expiresIn: authConfig.expiresIn,
      }),
    }); //se estiver tudo certo retorna o user
  }
}

export default new SessionController();
