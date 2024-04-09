const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  // find all categories
  // be sure to include its associated Products
  try{
  const categories = await Category.findAll({
    include:[Product]
  })

  res.status(200).json(categories)
}
catch(err){
  res.status(400).json(err)
}
  
});

router.get('/:id', async (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  const categories = await Category.findbyPK({
    include: [Product]
  })
  return res.status.json(categories)
});

router.post('/', async (req, res) => {
  // create a new category
 try{
  const categoryData = await Category.Create(req.body);
   res.status(200).json(categoryData);

 } catch(err) {
  res.status(500).json(err)
 }
});

router.put('/:id', async (req, res) => {
  // update a category by its `id` value
  try{
    const categoryData = await Category.update(
      {
        id: req.body.id,
        category_name: req.body.category_name
      },
      {
        where: {
          id: req.params.id
        }
      }
    )
    res.status(200).json(categoryData)
  } catch(err){
    res.status(500).json(err)
  }
});

router.delete('/:id', async (req, res) => {
  // delete a category by its `id` value
  try{
    const deletedCategory = await Category.destroy({
      where: {
        id: req.params.id
      }
    })
    res.status(200).json(deletedCategory)
  } catch (err) {
    res.status(500).json(err)
  }
});

module.exports = router;
