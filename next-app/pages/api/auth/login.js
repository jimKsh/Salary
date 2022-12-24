import { login } from '../../../firebase/auth' 

const handler = async (req, res) => {
  switch (req.method) {
    case "POST": {
      if (!req.body.email || !req.body.password) {
        return res.status(400).json({});
      }

      const user = await login(req.body.email, req.body.password)

      if (user !== null) {
        return res.status(200).json({ user: user});
      }

      return res.status(400).json({});
    }
    default: return res.status(400).json({});
  }
};

export default handler;
