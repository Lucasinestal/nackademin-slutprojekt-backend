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
        await productModel.Product.deleteMany({})
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

    it('Should add a new product', async () => {
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
        const productData = await productModel.createProduct(productFields);
        const deleted = await productModel.Product.findByIdAndDelete(productData._id.toString());

        // assert
        expect(productData).to.be.a('object');

        expect(productData).to.have.any.keys('title', '_id', 'price', 'shortDesc', 'longDesc', 'imgFile');
    })
}) 