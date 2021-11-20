const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

// find all categories
  // be sure to include its associated Products

router.get('/', async (req, res) => {
  const categoryData = await Category.findAll({
    include: [Product]
  }).catch((err) => {
    res.json(err);
  });
  res.json(categoryData);
});

 // find one category by its `id` value
  // be sure to include its associated Products
router.get('/:id', async (req, res) => {
  const categoryData = await Category.findOne({
    where: {
      id: req.params.id,
    },
    include: [Product]
  });

  return res.json(categoryData);
});

// create a new category
router.post('/', async (req, res) => {
  try {
    const categoryData = await Category.create(req.body);
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(400).json(err);
  }
});


// update a category by its `id` value
router.put('/:id', async (req, res) => {
  const categoryData = await Category.update(req.body, {
    where: {
      id: req.params.id,
    },
  })
  return res.json(categoryData);
});

// delete a category by its `id` value
router.delete('/:id', async (req, res) => {
  try {
    const categoryData = await Category.destroy({
      where: {
        id: req.params.id
      }
    });

    if (!categoryData) {
      res.status(404).json({ message: 'No category found with this id!' });
      return;
    }

    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
