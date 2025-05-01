const product = require('../models/productModel');


//get all procucts
const getProducts = async(req, res) => {
try {
    const allProducts = await product.find();
    if (!allProducts || allProducts.length === 0) {
        return res.status(404).json({message: 'There is No products'});
    }
    res.status(200).json({
        success: true,
        products: allProducts});
} catch (error) {
    res.status(500).json({message: error.message});
}
}

// create product

const createProduct = async(req, res) => {
    const {name, description, price, category, stock} = req.body;

    if (!name || !description || !price || !category || !stock) {
        return res.status(400).json({message: 'Please fill all fields'});
    }

    try {
        
        const newProduct = await product.create({
            name, description, price, category, stock
        });
        
        if (!newProduct) {
            return res.status(400).json({message: 'Product not created'});
        }
        res.status(201).json({
            success: true,
            product: newProduct
        });

    } catch (error) {
        res.status(500).json({message: error.message});
    }

}

// Update Product

const updateProduct = async(req, res) => 
    {
        console.log('object')
    const {id} = req.params;
    const {name, description, price, categotry, stock} = req.body;

    // if (!name || !description || !price || !categotry || !stock) {
    //     return res.status(400).json({
    //         status: false,
    //         message: 'Please fill all fields'
    //     })
    // }

    try {
        
        const updatedProduct = await product.findByIdAndUpdate(id, {
            name, description, price, categotry, stock
        }, {new: true});

        if (!updatedProduct) {
            return res.status(400).json({
                status: false,
                message: 'Product not updated'
            })
        }
        res.status(200).json({
            status: true,
            message: 'Product Updated Sucessfully',
            product: updatedProduct
        })
    } catch (error) {
        res.status(500).json({
            status: false,
            message: error.message
        })
    }
}

// delete product

const deleteProduct = async(req, res) => {
    const {id} = req.params;

    if (!id) {
        return res.status(400).json({
            status: false,
            message: 'Please provide product id'
        })
    }

    try {
        

        const deletedProduct = await product.findByIdAndDelete(id);

        if (!deletedProduct) {
            return res.status(400).json({
                status: false,
                message: 'Product not deleted'
            })
        }

        res.status(200).json({
            status: true,
            message: 'Product deleted successfully'
        })

    } catch (error) {
       res.status(500).json({
            status: false,
            message: error.message
        }) 
    }

}

module.exports = {
    getProducts, createProduct, updateProduct, deleteProduct
}