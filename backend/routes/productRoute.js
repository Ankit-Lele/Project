const express = require('express');
const router = express.Router();
const multer = require('multer');
const productController = require('../controllers/productController');
const upload = multer({ dest: "uploads/" });



// ----------------- Single Product CRUD -----------------
router.post(
  '/',
  upload.single('image'), // Multer middleware to upload a single image
  productController.createProduct
);

router.get('/', productController.getProducts);

// ----------------- Bulk Upload (CSV/XLSX) -----------------
router.post(
  "/bulk-upload",
  upload.single("file"),  
  productController.bulkUpload
);

// ----------------- Generate CSV Report -----------------
router.get('/report', productController.generateReport);

router.put('/:id', upload.single('image'), productController.updateProduct);
router.delete('/:id', productController.deleteProduct);
router.get('/report/xlsx', productController.generateXLSXReport);
module.exports = router;
