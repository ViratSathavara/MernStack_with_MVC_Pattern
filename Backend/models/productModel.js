const mongoose = require('mongoose');
const Counter = require('./counterModel');

const productSchema = new mongoose.Schema({
  productId: {
    type: Number,
    unique: true,
    required: true
  },
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  category: { type: String, required: true },
  stock: { type: Number, required: true },
}, { timestamps: true });

productSchema.pre('save', async function (next) {
  if (this.isNew) {
    try {
      const counter = await Counter.findOneAndUpdate(
        { id: 'productId' },
        { $inc: { seq: 1 } },
        { new: true, upsert: true }
      );

      this.productId = counter.seq;
      next();
    } catch (err) {
      next(err);
    }
  } else {
    next();
  }
});

const Product = mongoose.model('Product', productSchema);
module.exports = Product;
