const { Router } = require("express");
const { Awards } = require("../db.js")


const router = Router();

router.post("/", async (req, res) => {

  try {
    const { name, stock, points, description, specifications, img, freeShipping } = req.body

    if (!name || !stock || !points || !description || !specifications || !img || !freeShipping) {
      return res.send("mandatory information is missing to continue")
    }
    let newAward = await Awards.create({
      name,
      description,
      stock,
      points,
      img,
      specifications,
      freeShipping
    })
    res.send("creating correctly")
  } catch (error) {
   res.json({error: error})
  }
})