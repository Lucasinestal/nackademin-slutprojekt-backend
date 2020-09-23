const chai = require("chai");
const chaihttp = require("chai-http");
chai.use(chaihttp);
const { expect, request } = chai;
const app = require("../../app");
const productModel = require("../../models/productModel");
const userModel = require("../../models/userModel")
const db = require("../../db/index");


describe("Products Integrations tests", function () {

    before(async function () {
        await db.connect();
    })

    after(async function () {
        await db.disconnect();
    })

    beforeEach(async function () {
        await productModel.deleteAll();
        await userModel.deleteAll();
        const credentials = {
                email: 'test@test.se',
                password: 'test',
                name: 'testing tester',
                role: 'admin',
                adress: {
                    street: 'testerStreet 3',
                    zip: '123 45',
                    city: 'testingTown'
                }
        }
        const adminLogin = {
            email: 'test@test.se',
            password: 'test'
        }

        await userModel.createUser(credentials);
        this.currentTest.admin = await userModel.loginUser(adminLogin);

    })
    it("Should create a new product", async function () {
        const productFields = {
            title: 'Gretas Fury',
            price: 999,
            shortDesc: 'Unisex',
            longDesc: 'Skate ipsum dolor sit amet...',
            imgFile: 'skateboard-greta.png'
        }
        const token = this.test.admin.token
        const res = await request(app)
            .post("/api/products")
            .set("Authorization", `Bearer ${token}`)
            .set("Content-Type", "application/json")
            .send(productFields)
        expect(res.body).to.be.a("object")
        expect(res).to.have.status(201)

    })
    it("Should update/edit a product", async function () {
        const productFields = {
            title: 'Gretas Fury',
            price: 999,
            shortDesc: 'Unisex',
            longDesc: 'Skate ipsum dolor sit amet...',
            imgFile: 'skateboard-greta.png'
        }

        const updatedProductFields = {
            title: 'Tyson Fury',
            price: 1000
        }

        const token = this.test.admin.token
        const productData = await productModel.createProduct(productFields);
        const res = await request(app)
            .patch(`/api/products/${productData._id}`)
            .set("Authorization", `Bearer ${token}`)
            .set("Content-Type", "application/json")
            .send(updatedProductFields)
        expect(res.body).to.be.a("object")
        expect(res).to.have.status(202)

    })
    it("Should delete a product", async function () {
        const productFields = {
            title: 'Gretas Fury',
            price: 999,
            shortDesc: 'Unisex',
            longDesc: 'Skate ipsum dolor sit amet...',
            imgFile: 'skateboard-greta.png'
        }
        const productData = await productModel.createProduct(productFields);
        const token = this.test.admin.token
        const res = await request(app)
            .delete(`/api/products/${productData._id}`)
            .set("Content-Type", "application/json")
            .set("Authorization", `Bearer ${token}`)
            .send()
        expect(res.body).to.be.a("object")
        expect(res).to.have.status(202)
    })
    it("Should return all products", async function () {
        const productFields = {
            title: 'Gretas Fury',
            price: 999,
            shortDesc: 'Unisex',
            longDesc: 'Skate ipsum dolor sit amet...',
            imgFile: 'skateboard-greta.png'
        }

        await productModel.createProduct(productFields);
        await productModel.createProduct(productFields);
        await productModel.createProduct(productFields);
        const token = this.test.admin.token
        const res = await request(app)
            .get("/api/products")
            .set("Content-Type", "application/json")
            .set("Authorization", `Bearer ${token}`)
            .send()
        expect(res.body).to.be.a("array")
        expect(res).to.have.status(200)
    })

    it("Should return product by ID", async function () {
        const productFields = {
            title: 'Gretas Fury',
            price: 999,
            shortDesc: 'Unisex',
            longDesc: 'Skate ipsum dolor sit amet...',
            imgFile: 'skateboard-greta.png'
        }

        const productData = await productModel.createProduct(productFields);

        const token = this.test.admin.token

        const res = await request(app)
            .get(`/api/products/${productData._id}`)
            .set("Content-Type", "application/json")
            .set("Authorization", `Bearer ${token}`)
            .send()
        expect(res.body).to.be.a("object")
        expect(res).to.have.status(200)
    })
})

