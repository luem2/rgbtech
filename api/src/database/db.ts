/* // Para relacionarlos hacemos un destructuring
const { Brand, Comment, Product, Tag, User, Sale, Award } = sequelize.models

// Aca vendrian las relaciones
// Product - Brand
Product.belongsTo(Brand, { through: 'productBrand' })
Brand.belongsToMany(Product, { through: 'productBrand' })
// Product - Tag
Product.belongsToMany(Tag, { through: 'productTag' })
Tag.belongsToMany(Product, { through: 'productTag' })
// Comment - Product
Product.belongsToMany(Comment, { through: 'productComment' })
Comment.belongsToMany(Product, { through: 'productComment' })

// ---------------------------------------------------------
//Modelo ventas
Sale.belongsTo(Brand, { through: 'saleBrand' })
Brand.belongsToMany(Sale, { through: 'saleBrand' })

Sale.belongsToMany(Tag, { through: 'saleProduct' })
Tag.belongsToMany(Sale, { through: 'saleProduct' })

Sale.belongsTo(User, { through: 'saleUser' })
User.belongsToMany(Sale, { through: 'saleUser' })

*/
