const brands = require('./brands.js')
const { Brand } = require('../db.js')
const crypto = require('crypto')

const addBrands = () => {
    try {
        brands.map(async (brand) => {
            const brandId = crypto
                .createHash('md5')
                .update(brand.name)
                .digest('hex')
            await Brand.create({
                ...brand,
                id: brandId,
            })
        })
        console.log('Brands added to db')
    } catch (error) {
        console.error(error)
    }
}

module.exports = addBrands
