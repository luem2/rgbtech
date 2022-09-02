const { Router } = require("express");
const { User, Sale, Product, Brand, Tag, conn } = require("../db");
const jwt = require("jsonwebtoken");
const { Op } = require("sequelize");
const { validateToken } = require("../middlewares/userMiddleware.js");

const router = Router();

router.post("/sale", async (req, res) => {
	const { userId, products } = req.body;

	products.map(async (product) => {
		const { productId, name, productPrice, tags, brand, month, year, amount } =
			product;
		const newSale = await Sale.create({
			productId,
			name,
			productPrice,
			month,
			year,
			amount,
			totalPrice: productPrice * amount,
		});
		await newSale.addTags(tags);
		await newSale.setBrand(brand);
		await newSale.setUser(userId);

		// const stockProduct = await Product.findByPk(productId)
		// const updatedStock = stockProduct.stock - amount
		// await Product.update({
		//   stock: updatedStock
		// },
		// {
		//   where:{id:productId}
		// })
	});
	res.send("producto comprado");
});

router.get("/dashboard", async (req, res) => {
	const { year } = req.query;
	const conditions = {};
	year ? (conditions.year = year) : null;
	let stock = await Product.findAll({
		attributes: [[conn.fn("SUM", conn.col("stock")), "totalStock"]],
	});
	let totalSales = await Sale.findAll({
		attributes: [[conn.fn("SUM", conn.col("totalPrice")), "totalSales"]],
	});
	stock = stock[0];
	totalSales = totalSales[0];

	const users = await User.findAndCountAll({
		attributes: { exclude: ["password"] },
	});
	let sales = await Sale.findAll({
		include: [
			{
				model: Tag,
				through: { attributes: [] },
			},
		],
	});

	const monthSales = {};
	sales.forEach((sale) => {
		const month = sale.month;
		if (!monthSales.hasOwnProperty(month)) {
			monthSales[month] = sale.totalPrice;
		} else {
			monthSales[month] = monthSales[month] + sale.totalPrice;
		}
	});

	const monthProducts = {};
	sales.forEach((sale) => {
		const month = sale.month;
		if (!monthProducts.hasOwnProperty(month)) {
			monthProducts[month] = sale.amount;
		} else {
			monthProducts[month] = monthProducts[month] + sale.amount;
		}
	});

	const ventasMes = [];
	for (const mes in monthSales) {
		ventasMes.push({ month: mes, amount: monthSales[mes] });
	}

	const productosMes = [];
	for (const mes in monthProducts) {
		productosMes.push({ month: mes, amount: monthProducts[mes] });
	}

	res.json({
		monthSales: ventasMes,
		monthProducts: productosMes,
		sales: sales.length,
		totalSales: totalSales.dataValues.totalSales,
		stock: stock.dataValues.totalStock,
		users: users.count,
	});
});

router.get("/products", async (req, res) => {
	try {
		const products = await Product.findAll({
			include: {
				model: Tag,
				through: { attributes: [] },
			},
		});
		res.status(200).send(products);
	} catch (error) {
		res.sendStatus(500);
	}
});

router.get("/tags", async (req, res) => {
	try {
		const tags = await Tag.findAll({
			attributes: ["id", "name"],
		});
		const brands = await Brand.findAll({
			attributes: ["id", "name"],
		});
		const response = {
			brands,
			tags,
		};
		res.status(200).send(response);
	} catch (error) {
		res.status(500).send("Internal error server");
	}
});

router.get("/users", async (req, res) => {
	try {
		const users = await User.findAndCountAll({
			attributes: {
				exclude: ["password", "cartShop", "favorite", "shoppingHistory"],
			},
		});
		res.json(users);
	} catch (error) {
		res.sendStatus(500);
	}
});

module.exports = router;
