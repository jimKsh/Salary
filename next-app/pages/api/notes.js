import { ColInstanse } from "../../firebase/firestore";

const collection = new ColInstanse("notes");

const handler = async (req, res) => {
  switch (req.method) {
    case "GET": {
      let notes;

      if (req.query.id) {
        notes = await collection.get(req.query.id);
      }
      else if (req.query.content) {
        notes = await collection.query("content", req.query.content);
      }
      else {
        notes = await collection.getAll();
      }

      if (notes !== null) {
        return res.status(200).json({ notes: notes });
      }
    }

    case "POST": {
      if (!req.body.content) {
        return res.status(400).json({});
      }

      const note = await collection.add({ content: req.body.content });

      if (note !== null) {
        return res.status(200).json({ note: { ...note } });
      }
    }

    case "PUT": {
      if (!req.body.id || !req.body.content) {
        return res.status(400).json({});
      }

      const note = await collection.update(req.body.id, { content: req.body.content });

      if (note !== null) {
        return res.status(200).json({ note: { ...note } });
      }
    }

    case "DELETE": {
      if (!req.body.id) {
        return res.status(400).json({});
      }

      const note = await collection.delete(req.body.id);

      if (note !== null) {
        return res.status(200).json({});
      }
    }
  }

  return res.status(400).json({});
};

export default handler;
