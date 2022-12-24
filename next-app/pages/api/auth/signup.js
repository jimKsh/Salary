import { signup } from '../../../firebase/auth';

const handler = async (req, res) => {
  switch (req.method) {
    case "POST": {
      if (!req.body.email || !req.body.password) {
        return res.status(400).json({});
      }

      const user = await signup(req.body.email, req.body.password)
      if (!user) {
        return res.status(400).json({});
      }

      return res.status(200).json({ user: user });
    }
    default:
      return res.status(400).json({ error: "unable to create user" });
  }
};

export default handler;
