
const Products = [
  {
    name: "Soporte apoya celular",
    points: 7.34,
    description: "Extensible y flexible, lo mejor solo para vos",
    specifications: [{
      "length": "26cm-36cm",
      width: "11.5cm"
    }
    ],
    img: "https://http2.mlstatic.com/D_NQ_NP_854384-MLA45113663302_032021-O.webp",
    stock: 0,
  },
  {
    name: "Aro de luz led",
    points: 27,
    description: "No pierda la oportunidad el mejor aro de luz solo para vos",
    specifications: [{
      "connector": "USB",
      LEDQuantity: "120",
      itIsRechargeable: "No"
    }
    ],
    img: "https://http2.mlstatic.com/D_NQ_NP_654445-MLA43815950610_102020-O.webp",
    stock: 200,
  },
  {
    name: "Auriculares in-ear inalámbricos F9-5",
    points: 27,
    description: "l formato perfecto para vos. Al ser in-ear, mejoran la calidad del audio y son de tamaño pequeño para poder insertarse en tu oreja. Son ideales para acompañarte a la hora de hacer ejercicio mientras te sumergís en el mejor sonido envolvente.",
    specifications: [{
      wireless: "Yes",
      NoiseCancellation: "Yes",
      microphone: "Yes",
      batteryLife: "5 hs",
      waterproof: "Yes",
    }
    ],
    img: "https://http2.mlstatic.com/D_NQ_NP_745358-MLA45449928637_042021-O.webp",
    stock: 200,
  },
]

module.exports = {Products}