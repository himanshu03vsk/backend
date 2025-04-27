const express = require('express');
const router = express.Router();
const partController = require('../controllers/partController');
const authMiddleware = require('../middleware/authMiddleware'); // Import authMiddleware



router.post('/reviews', authMiddleware, partController.createPartReview);
router.get('/categoryList/', partController.getCategoryList);
router.get('/catelogue/', partController.getPartsForList);
router.get('/by-category', partController.getPartBySelectedCategory); 

router.get('/related', authMiddleware, partController.getRelatedParts);
router.get('/',authMiddleware, partController.getAllParts);
router.get('/:id',authMiddleware, partController.getPartById);
router.post('/',authMiddleware, partController.createPart);
router.put('/:id',authMiddleware, partController.updatePart);
router.delete('/:id',authMiddleware, partController.deletePart);
router.get('/name/:name',authMiddleware, partController.getPartByName);
router.get('/category/:category',authMiddleware, partController.getPartByCategory);
router.get('/brand/:brand',authMiddleware, partController.getPartByBrand);
router.get('/price/:price',authMiddleware, partController.getPartByPrice);
router.get('/model/:model',authMiddleware, partController.getPartByModel);
router.get('/type/:type',authMiddleware, partController.getPartByType);
router.get('/year/:year',authMiddleware, partController.getPartByYear);
// router.get('/color/:color',authMiddleware, partController.getPartByColor);
router.get('/color/:id', partController.getPartColorsById);
router.get('/reviews/:id', partController.getReviewsByPartId);

module.exports = router;
