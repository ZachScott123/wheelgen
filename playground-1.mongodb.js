/* global use, db */
// MongoDB Playground
// To disable this template go to Settings | MongoDB | Use Default Template For Playground.
// Make sure you are connected to enable completions and to be able to run a playground.
// Use Ctrl+Space inside a snippet or a string literal to trigger completions.
// The result of the last command run in a playground is shown on the results panel.
// By default the first 20 documents will be returned with a cursor.
// Use 'console.log()' to print to the debug output.
// For more documentation on playgrounds please refer to
// https://www.mongodb.com/docs/mongodb-vscode/playgrounds/

// Select the database to use.
use('WheelGen');

// Insert a few documents into the sales collection.
db.getCollection('rims').insertMany([
  {
    id: "rotiform-las-r",
    name: "LAS-R",
    brand: "Rotiform",
    size: "17x8.0",
    boltPattern: "4x100",
    offset: "+40",
    finish: "Gloss Silver",
    price: 389.99,
    imageUrl: "/images/rims/rotiform-las-r.jpg",
    description: "A deep concave, flow-form design with aggressive styling and premium finish.",
    category: "Performance",
    fitmentNotes: "Popular on sports sedans and sport coupes."
  },
  {
    id: "rotiform-r141-rse",
    name: "R141-RSE",
    brand: "Rotiform",
    size: "17x8.0",
    boltPattern: "4x100",
    offset: "+30",
    finish: "Matte Black",
    price: 382.99,
    imageUrl: "/images/rims/rotiform-r141-rse.jpg",
    description: "A distinctive, single-piece cast aluminum wheel that fuses classic design with modern performance and fitment",
    category: "Performance",
    fitmentNotes: "Popular on sports sedans and sport coupes."
  },
  {
    id: "enkei-rpf1",
    name: "RPF1",
    brand: "Enkei",
    size: "18x8.0",
    boltPattern: "5x114.3",
    offset: "+40",
    finish: "Gloss Silver",
    price: 329.99,
    imageUrl: "/images/rims/enkei-rpf1.jpg",
    description: "Lightweight track-inspired wheel favored by enthusiasts and racers.",
    category: "Track",
    fitmentNotes: "Great for sporty coupes and compact performance cars."
  },
  {
    id: "enkei-j10",
    name: "J10",
    brand: "Enkei",
    size: "17x7.5",
    boltPattern: "5x114.3",
    offset: "+35",
    finish: "Gloss Silver / Matte Grey",
    price: 309.99,
    imageUrl: "/images/rims/enkei-j10.jpg",
    description: "Lightweight track-inspired wheel favored by motorist enthusiasts and tuners.",
    category: "Street",
    fitmentNotes: "Great for sporty coupes and compact performance cars."
  },
  {
    id: "motegi-mr151-cs5",
    name: "MR151-CS5",
    brand: "Motegi",
    size: "18x9.0",
    boltPattern: "5x114.3",
    offset: "+25",
    finish: "Frosted White",
    price: 249.99,
    imageUrl: "/images/rims/motegi-mr151-cs5.jpg",
    description: "Classic five-spoke style with modern performance fitment.",
    category: "Street",
    fitmentNotes: "A versatile choice for daily drivers and tuner builds."
  },
  {
    id: "motegi-mr140-ss10",
    name: "MR140-SS10",
    brand: "Motegi",
    size: "17x7.0",
    boltPattern: "5x114.3",
    offset: "+38",
    finish: "Satin Black",
    price: 249.99,
    imageUrl: "/images/rims/motegi-mr140-ss10.jpg",
    description: "Sporty ten-spoke designed for stylish performance.",
    category: "Track",
    fitmentNotes: "A versatile choice for track enthusiasts and tuner builds."
  },
  {
    id: "tsw-tw002",
    name: "TW002",
    brand: "TSW",
    size: "17x8.0",
    boltPattern: "5x108.0",
    offset: "+45",
    finish: "Diamond Cut",
    price: 279.99,
    imageUrl: "/images/rims/tsw-tw002.jpg",
    description: "Stylish fourteen-spoke design with a modern aesthetic.",
    category: "Street",
    fitmentNotes: "A versatile choice for daily drivers and modern cars."
  },
  {
    id: "tsw-tw005",
    name: "TW005",
    brand: "TSW",
    size: "19x9.5",
    boltPattern: "5x114.3",
    offset: "+35",
    finish: "Gloss Silver",
    price: 380.00,
    imageUrl: "/images/rims/tsw-tw005.jpg",
    description: "The wheel features a classic 15-spoke design with a contemporary concave profile and a unique lip design .",
    category: "Street",
    fitmentNotes: "A versatile choice for daily drivers and modern cars."
  }
]);

db.getCollection('cars').insertMany([
    {
        imageName: "mazda-rx7-rpf1.jpg",
        year: "1997",
        make: "Mazda",
        model: "RX-7",
        extraInfo: "FD3s, running Enkei RPF1s in 17x9 5x114.3 45 offset Set of Four. Custom HKS intake, aftermarket"
    },
    {
        imageName: "mini-r56-rotiform-ccv.jpg",
        year: "2012",
        make: "Mini",
        model: "John Cooper Works",
        extraInfo: "Lowered on coilovers with aftermarket rims, aftermarket intake."
    },
    {
        imageName: "toyota-4runner-offroad.jpg",
        year: "2016",
        make: "Toyota",
        model: "4Runner",
        extraInfo: "Lift kid, factory TRD body."
    },
    {
        imageName: "mclaren-senna-ankry-xr.jpg",
        year: "2019",
        make: "Mclaren",
        model: "Senna",
        extraInfo: "Lowered on chrome rims."
    },
    {
        imageName: "vw-taos-fifteen52.jpg",
        year: "2017",
        make: "Volkswagen",
        model: "Taos",
        extraInfo: "Offroad rims."
    }
]);

//console.log(db.getCollection('rims').find({}));