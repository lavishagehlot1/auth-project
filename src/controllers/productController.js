import Product from "../models/productModel.js";

export const addProduct = async (req, res) => {
    try {
        const { productName, brandName, price, description } = req.body;

        if (!productName || !brandName || !price || !description) {
            return res.status(400).json({ message: "All fields are required!" });
        }

        const product = await Product.create({
            productName,
            brandName,
            price,
            description
        });

        return res.status(201).json({
            message: "Product added successfully!",
            product
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: error.message });
    }
};


export const getProducts = async (req, res) => {

    try 
    {
        const allProducts = await Product.find();
        return res.status(200).json( {message:"Fetched all products successfully!", allProducts})
    } 
    catch (error) 
    {
        console.log(error);
        return res.status(500).json({message:`Get all Products error... ${error}`})
    }
}