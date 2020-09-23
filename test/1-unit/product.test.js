const chai = require('chai')
const { expect } = chai
const { connect, disconnect } = require('../../db/index')

const productModel = require('../../models/productModel')

describe('unit test for product models', () => {
    before(async () => {
        await connect()
    })
    after(async () => {
        await disconnect()
    })
    beforeEach('clean product data', async () => {
        await productModel.deleteAll();
    })

    it('Should add a new product', async () => {
        // arrange
        const productFields = {
            title: 'Gretas Fury',
            price: 999,
            shortDesc: 'Unisex',
            longDesc: 'Skate ipsum dolor sit amet...',
            imgFile: 'skateboard-greta.png'
        }

        // act
        const productData = await productModel.createProduct(productFields);

        // assert
        expect(productData).to.be.a('object');

        expect(productData).to.have.any.keys('title', '_id', 'price', 'shortDesc', 'longDesc', 'imgFile');
    })

    it('Should update a product', async () => {
        // arrange
        const productFields = {
            title: 'Gretas Fury',
            price: 999,
            shortDesc: 'Unisex',
            longDesc: 'Skate ipsum dolor sit amet...',
            imgFile: 'skateboard-greta.png'
        }

        const updatedProductFields = {
            title: 'Gretas Fury 2'
        }

        // act
        const productData = await productModel.createProduct(productFields);
        const updatedProductData = await productModel.updateProduct(productData._id.toString(), updatedProductFields);

        // assert
        expect(updatedProductData).to.be.a('object');
        expect(updatedProductData).to.have.any.keys('title', '_id', 'price', 'shortDesc', 'longDesc', 'imgFile');
        expect(updatedProductData.title).to.equal('Gretas Fury 2');
    })

    it('Should delete a product', async () => {
        // arrange
        const productFields = {
            title: 'Gretas Fury',
            price: 999,
            shortDesc: 'Unisex',
            longDesc: 'Skate ipsum dolor sit amet...',
            imgFile: 'skateboard-greta.png'
        }

        // act
        const { _id } = await productModel.createProduct(productFields);
        const deleted = await productModel.deleteProduct(_id.toString());

        // assert
        expect(deleted).to.be.a('object');
        
        expect(deleted).to.have.any.keys('title', '_id', 'price', 'shortDesc', 'longDesc', 'imgFile');
    })

    it('Should get a product by id', async () => {
        // arrange
        const productFields = {
            title: 'Gretas Fury',
            price: 999,
            shortDesc: 'Unisex',
            longDesc: 'Skate ipsum dolor sit amet...',
            imgFile: 'skateboard-greta.png'
        }

        // act
        const { _id } = await productModel.createProduct(productFields);
        const found = await productModel.getProduct(_id.toString());

        // assert
        expect(found).to.be.a('object');
        expect(found).to.have.any.keys('title', '_id', 'price', 'shortDesc', 'longDesc', 'imgFile');
    })

    it('Should get all products', async () => {
        // arrange
        let products = [
            {
                title: 'Gretas Fury',
                price: 999,
                shortDesc: 'Unisex',
                longDesc: 'Skate ipsum dolor sit amet...',
                imgFile: 'skateboard-greta.png'
            },
            {
                title: 'Gretas Fury',
                price: 999,
                shortDesc: 'Unisex',
                longDesc: 'Skate ipsum dolor sit amet...',
                imgFile: 'skateboard-greta.png'
            },
            {
                title: 'Gretas Fury',
                price: 999,
                shortDesc: 'Unisex',
                longDesc: 'Skate ipsum dolor sit amet...',
                imgFile: 'skateboard-greta.png'
            },
        ].map(product => productModel.createProduct(product));     

        // act
        await Promise.all(products);

        const foundProducts = await productModel.getProducts();

        // assert
        foundProducts.forEach(product => {
            expect(product).to.be.a('object');
            expect(product.toObject()).to.have.any.keys('title', '_id', 'price', 'shortDesc', 'longDesc', 'imgFile');
        })

    })
}) 