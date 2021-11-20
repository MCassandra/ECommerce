const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  const categoryData = await Category.findAll({
    include: [Product]
  }).catch((err) => {
    res.json(err);
  });
  res.json(categoryData);
});

router.get('/:id', async (req, res) => {
  const categoryData = await Category.findOne({
    where: {
      id: req.params.id,
    },
    include: [Product]
  });

  return res.json(categoryData);
});

router.post('/', async (req, res) => {
  const categoryData = await Category.create(req.body);

  return res.json(categoryData);
});

router.put('/:id', async (req, res) => {
  const categoryData = await Category.update(req.body, {
    where: {
      id: req.params.id,
    },
  })
  return res.json(categoryData);
});

router.delete('/:id', async (req, res) => {
  const categoryData = await Category.destroy({
    where: {
      id: req.params.id,
    },
  });

  return res.json(categoryData);
});

module.exports = router;
