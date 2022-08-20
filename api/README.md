
### Get all products

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
{
    "count": integer,
    "data": array de objetos,//¹
    "next": url a la siguiente página//²
    "prev": url a la página previa//²
}


```
**¹ url** El url de las propiedades next y prev, conservan todos los querys que hayan sido enviados en la petición inicial.

**² data** los objetos contenidos por el array (productos), tienen el siguiente formato
        
        {
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

### Get product

```http
  GET /products/${id}
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `string` | **Requerido**. Id del producto |

resultado de la petición

```javascript
{
  "name": string,
  "id": string,
  "price": float,
  "description": text,
  "specifications": array de objetos,//¹
  "img": string,
  "stock": integer,
  "onDiscount": boolean,
  "discountPercentage": float,
  "freeShipping": boolean,
  "brandId": string,
  "tags": array de objetos,//²
  "comments": array de objetos//³
}

```
**¹ Specifications**, array que contiene un objeto. este objeto posee distintas propiedades correspondiente a cada especificación
        
        {
            "model" : "sasdla",
            "color" : "white"
        }
**² Tags**

        {
            id: string,
            name: string
        }
**³ Comments**
        
        {
            id: string,
            comment: text,
            rating: float,
            user: string
        }

