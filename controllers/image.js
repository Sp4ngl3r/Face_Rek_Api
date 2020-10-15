const Clarifai = require("clarifai");

const app = new Clarifai.App({
  apiKey: "bb13efbe0d1f41e98096cbb097e23a3e",
});

const handleApiCall = (req, res) => {
  app.models
    .predict(Clarifai.FACE_DETECT_MODEL, req.body.input)
    .then((data) => {
      res.json(data);
    })
    .catch((err) => res.status(400).json("Unable to handle API request"));
};

const handleImage = (req, res, db) => {
  const { id } = req.body;
  db("users")
    .where("id", "=", id)
    .increment("entries", 1)
    .returning("entries")
    .then((entries) => {
      res.json(entries[0]);
    })
    .catch((err) => res.status(400).json("Unable to get entries"));
};

module.exports = {
  handleImage,
  handleApiCall,
};
