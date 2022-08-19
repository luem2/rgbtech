
# Routes




### Get all items

```http
  GET /products
```
puede recibir 5 query
| query | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `column` | `string` | nombre de columna a ordenar|
| `order` | `string` | ASC o DESC |
| `name` | `string` | Busqueda por nombre de producto |
| `tag` | `string` | Busqueda por tag |
| `brand` | `string` | Busqueda por marca |

**nota**: el orden solo puede aplicar si se envían en conjunto la columna y el tipo de ordenamiento.

resultado de la petición

```javascript
  const singleProduct = {
  "name": string,
  "id": string,
  "price": float,
  "description": text,
  "specifications": array de objetos,
  "img": string,
  "stock": integer,
  "onDiscount": boolean,
  "discountPercentage": float,
  "freeShipping": boolean,
  "brandId": string,
  "tags": array de objetos 
}
```


### Get item

```http
  GET /products/${id}
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `string` | **Requerido**. Id del producto |

resultado de la petición

```javascript
  const singleProduct = {
  "name": string,
  "id": string,
  "price": float,
  "description": text,
  "specifications": array de objetos,
  "img": string,
  "stock": integer,
  "onDiscount": boolean,
  "discountPercentage": float,
  "freeShipping": boolean,
  "brandId": string,
  "tags": array de objetos,
  "comments": array de objetos
}
```
