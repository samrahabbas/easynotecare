const behaviorInterventions=require('../models/care.behavior.model')
const createBehavior = async (req, res) => {
  if (!req.body) {
    res.status(400).send({ message: "No behavior intervention found!" });
    return;
  }
  const behavior = new behaviorInterventions({
    id:req.body.id,
    name: req.body.name,
    description: req.body.description,
    category: req.body.category,
    type: req.body.type,
  });
  await behavior
    .save()
    .then((data) => {
      res.send({
        message: "Behavior created successfully!!",
        behavior: data,
      });
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while creating behavior",
      });
    });
};

const getAllBehaviors = async (req, res) => {
  try {
    const behaviors = await behaviorInterventions.find();
    res.status(200).json(behaviors);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

const getBehavior = async (req, res) => {
  try {
    const behavior = await behaviorInterventions.findById(
      req.params.id
    );
    res.status(200).json(behavior);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

const updateBehavior = async (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "Data to update can not be empty!",
    });
  }
  const id = req.params.id;
  await behaviorInterventions
    .findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Behavior not found.`,
        });
      } else {
        res.send({ message: "Behavior updated successfully." });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message,
      });
    });
};
const deleteBehavior = async (req, res) => {
  await behaviorInterventions
    .findByIdAndRemove(req.params.id)
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Behavior not found.`,
        });
      } else {
        res.send({
          message: "Behavior deleted successfully!",
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message,
      });
    });
};
module.exports = {
 createBehavior,
 getAllBehaviors,
 getBehavior,
 updateBehavior,
 deleteBehavior
};
