const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

// find all tags
  // be sure to include its associated Product data
  router.get('/', async (req, res) => {
    const tagData = await Tag.findAll({
      include: {
        model: Product,
        through: ProductTag
      }
    }).catch((err) => {
      res.json(err);
    });
    res.json(tagData);
  });


// find a single tag by its `id`
  // be sure to include its associated Product data
  router.get('/:id', async (req, res) => {
    const tagData = await Tag.findOne({
      where: {
        id: req.params.id,
      },
      include: {
        model: Product,
        through: ProductTag
      }
    });
  
    return res.json(tagData);
  });

// create a new tag
router.post('/', async (req, res) => {
  const tagData = await Tag.create(req.body);

  return res.json(tagData);
});

// update a tag's name by its `id` value
router.put('/:id', async (req, res) => {
  const tagData = await Tag.update(req.body, {
    where: {
      id: req.params.id,
    },
  })
  return res.json(tagData);
});


// delete on tag by its `id` value
router.delete('/:id', async (req, res) => {
  const tagData = await Tag.destroy({
    where: {
      id: req.params.id,
    },
  });

  return res.json(tagData);
});

module.exports = router;
