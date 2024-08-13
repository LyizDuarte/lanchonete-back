import * as Yup from 'yup';
import User from '../models/User';

class SessionController {
  async store(req, res) {
    const schema = Yup.object().shape({
      email: Yup.string().email().required(),
      password: Yup.string().required(),
    }); //criação do esquema de validação

    const emailOrPasswordIncorrect = () => {
      return res.status(401).json('Email ou senha incorretos!');
    };

    if (!(await schema.isValid(req.body))) return emailOrPasswordIncorrect();
    //verifica se os dados são validos

    const { email, password } = req.body; //pega email e senha no corpo de requisição

    const user = await User.findOne({
      where: { email },
    }); //procura um email igual o enviado no corpo de requisição

    if (!user) return emailOrPasswordIncorrect();

    if (!(await user.checkPassword(password)))
      return emailOrPasswordIncorrect();

    return res.json({ id: user.id, email, name: user.name, admin: user.admin }); //se email ou senha estiverem incorretos retorna um erro, se não retorna o usuario e seus dados
  }
}

export default new SessionController();
