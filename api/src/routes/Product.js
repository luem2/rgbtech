const { Router } = require("express");
const { Product, Tag, Comment } = require("../db.js");
const {
	setQueryConditions,
	setPagination,
	checkPost,
} = require("../middlewares/productMiddleware.js");
const { Op } = require("sequelize");

const router = Router();

router.get("/search", async (req, res) => {
	const { name } = req.query;
	try {
		if (!name) {
			res.send([]);
		} else {
			const products = await Product.findAll({
				where: {
					name: {
						[Op.iLike]: `%${name}%`,
					},
				},
			});
			const namesProducts = products.map((p) => {
				return {
					id: p.id,
					name: p.name,
					price: p.price,
					image: p.img,
				};
			});
			res.send(namesProducts);
		}
	} catch (error) {
		res.send(error);
	}
});

router.get("/", setQueryConditions, setPagination, async (req, res) => {
	try {
		const { count, nextPage, limit, offset, queryConditions, paginationPages } =
			req.body;
		console.log(req.body);
		const products = await Product.findAll({
			...queryConditions,
			limit,
			offset,
		});
		const response = {
			count,
			data: products,
			nextPage,
			pageNumbers: paginationPages,
		};
		res.status(200).send(response);
	} catch (error) {
		console.error(error);
		res.status(500).send(error);
	}
});

router.get("/All", async (req, res) => {
	const { name } = req.query;
	try {
		const AllProduct = await Product.findAll({
			include: {
				model: Tag,
				through: {
					attributes: [],
				},
			},
		});
		if (name) {
			let ProductName = AllProduct.filter((e) => {
				if (e && e.name) {
					return e.name.toLowerCase().includes(name.toLowerCase());
				}
			});
			res.status(200).send(ProductName);
		} else {
			res.status(200).send(AllProduct);
		}
	} catch (error) {
		res.status(500).send(error);
	}
});

router.get("/:id", async (req, res) => {
	try {
		const { id } = req.params;
		let productEspecific = await Product.findByPk(id, {
			include: [
				{
					model: Tag,
					through: { attributes: [] },
				},
				{
					model: Comment,
					through: { attributes: [] },
				},
			],
		});
		return res.status(201).json(productEspecific);
	} catch (error) {
		res.send("No se encontro el Product del  Id");
	}
});

router.post("/", checkPost, async (req, res) => {
	try {
		const newProduct = await Product.create(req.body.product);
		await newProduct.setBrand(brand);
		await newProduct.addTags(tag);
		return res
			.status(201)
			.send({ msg: "Product created successfully", statusCode: 201 });
	} catch (error) {
		return res
			.status(400)
			.send({ msg: "Ops! Something went wrong", statusCode: 400 });
	}
});

router.put("/:id", async (req, res, next) => {
	try {
		const { id } = req.params;
		const {
			name,
			price,
			description,
			specifications,
			img,
			stock,
			onDiscount,
			discountPercentage,
			freeShipping,
		} = req.body;
		await Product.update(
			{
				name: name,
				price: price,
				description: description,
				specifications: specifications,
				img: img,
				stock: stock,
				onDiscount: onDiscount,
				discountPercentage: discountPercentage,
				freeShipping: freeShipping,
			},
			{
				where: {
					id: id,
				},
			}
		);
		res.send("updated product");
	} catch (error) {
		next(error);
	}
});

router.delete("/:id", async (req, res, next) => {
	try {
		const { id } = req.params;
		await Product.destroy({
			where: {
				id: id,
			},
		});
		res.send("Delete product");
	} catch (error) {
		next(error);
	}
});

router.get("/Cartshop", async (req, res) => {
	const { carrito } = req.params;
	try {
		const CartProduct = await Product.filter(Item => carrito.map(id=> id === Item.id)
		)
		res.send(CartProduct);
	}
catch(error){
	
}})

router.get("/Favorite", async (req, res) => {
	const { fav } = req.params;
	try {
		const FavProduct = await Product.filter(Item => fav.map(id=> id === Item.id)
		)
		res.send(FavProduct);
	}
catch(error){
	
}})


module.exports = router;
