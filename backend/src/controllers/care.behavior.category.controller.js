const behaviorInterventionCategories=require('../models/care.behavior.category.model')
const createBehaviorCategory = async (req, res) => {
  if (!req.body) {
    res.status(400).send({ message: "No behavior category found!" });
    return;
  }
  const category = new behaviorInterventionCategories({
    id:req.body.id,
    name: req.body.name,
    type: req.body.type,
    enteredBy:req.body.enteredBy,
    lastUpdatedBy:req.body.lastUpdatedBy
  });
  await category.save().then(data => {
        res.send({
            message:"Category created successfully!!",
            category:data
        });
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating category"
        });
    });
};

const getAllBehaviorCategories = async (req, res) => {
    try {
        const categories = await behaviorInterventionCategories.find();
        res.status(200).json(categories);
    } catch(error) {
        res.status(404).json({message: error.message});
    }
};

const getBehaviorCategory = async (req, res) => {
    try {
        const category = await behaviorInterventionCategories.findById(req.params.id);
        res.status(200).json(category);
    } catch(error) {
        res.status(404).json({ message: error.message});
    }
};

const updateBehaviorCategory = async (req, res) => {
    if(!req.body) {
        res.status(400).send({
            message: "Data to update can not be empty!"
        });
    }
    const id = req.params.id;
    await behaviorInterventionCategories.findByIdAndUpdate(id, req.body, { useFindAndModify: false }).then(data => {
        if (!data) {
            res.status(404).send({
                message: `Category not found.`
            });
        }else{
            res.send({ message: "Category updated successfully." })
        }
    }).catch(err => {
        res.status(500).send({
            message: err.message
        });
    });
};
const deleteBehaviorCategory = async (req, res) => {
  await behaviorInterventionCategories.findByIdAndRemove(req.params.id)
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Category not found.`,
        });
      } else {
        res.send({
          message: "Category deleted successfully!",
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
 createBehaviorCategory,
 getAllBehaviorCategories,
 getBehaviorCategory,
 updateBehaviorCategory,
 deleteBehaviorCategory
};
