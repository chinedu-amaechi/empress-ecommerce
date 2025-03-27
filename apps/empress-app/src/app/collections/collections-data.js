// /collections/collections-data.js
export default function CollectionsData() {
  return {
    ethereal: {
      name: "Ethereal",
      description:
        "Delicate designs that whisper elegance and capture the subtle beauty of moonlight.",
      heroImage: "/collections/ethereal.jpg",
      products: [
        {
          id: "ethereal-1",
          name: "Aurelia",
          price: 129.99,
          originalPrice: 159.99,
          images: [
            "/products/ethereal-1-01.jpg",
            "/products/ethereal-1-02.jpg",
            "/products/ethereal-1-03.jpg",
          ],
          rating: 4.5,
          reviews: 24,
          material: "Sterling Silver",
          colors: ["Silver", "Rose Gold"],
          description: "A delicate silver bracelet with lunar inspiration.",
        },
        {
          id: "ethereal-2",
          name: "Aluna",
          price: 149.99,
          originalPrice: 179.99,
          images: [
            "/products/ethereal-2-01.jpg",
            "/products/ethereal-2-02.jpg",
          ],
          rating: 4.7,
          reviews: 18,
          material: "Sterling Silver",
          colors: ["Silver"],
          description: "Gossamer-light design that captures moonbeam elegance.",
        },
        {
          id: "ethereal-3",
          name: "Sorelle",
          price: 169.99,
          originalPrice: 199.99,
          images: [
            "/products/ethereal-3-01.jpg",
            "/products/ethereal-3-02.jpg",
            "/products/ethereal-3-03.jpg",
          ],
          rating: 4.8,
          reviews: 31,
          material: "Sterling Silver with Moonstone",
          colors: ["Silver", "Rose Gold"],
          description:
            "A moonstone bracelet that shimmers with ethereal beauty.",
        },
      ],
    },
    divine: {
      name: "Divine",
      description:
        "Bold statements of inner strength, crafted for the modern empress who commands attention.",
      heroImage: "/collections/divine.jpg",
      products: [
        {
          id: "divine-1",
          name: "Verdana",
          price: 199.99,
          originalPrice: 249.99,
          images: [
            "/products/divine-1-01.jpg",
            "/products/divine-1-02.jpg",
            "/products/divine-1-03.jpg",
        ],
          rating: 4.8,
          reviews: 36,
          material: "Gold-Plated Silver",
          colors: ["Gold", "Rose Gold"],
          description: "A regal piece that embodies luxury and sophistication.",
        },
        {
          id: "divine-2",
          name: "Noor",
          price: 249.99,
          originalPrice: 299.99,
          images: ["/products/divine-2-01.jpg", "/products/divine-2-02.jpg"],
          rating: 4.9,
          reviews: 42,
          material: "18K Gold with Diamond Accents",
          colors: ["Gold"],
          description:
            "The epitome of elegance, designed for those who shine brightest.",
        },
        {
            id: "divine-3",
            name: "Aegis",
            price: 219.99,
            originalPrice: 269.99,
            images: ["/products/divine-3-01.jpg", "/products/divine-3-02.jpg"],
            rating: 4.7,
            reviews: 29,
            material: "Gold-Plated Silver with Gemstone Accents",
            colors: ["Gold", "Rose Gold"],
            description:
                "A radiant piece that captures the warmth of the sun's embrace.",
        }
      ],
    },
    heritage: {
      name: "Heritage",
      description:
        "Timeless craftsmanship passed down through generations, embodying classic elegance.",
      heroImage: "/collections/heritage.jpg",
      products: [
        {
          id: "heritage-1",
          name: "Suyan",
          price: 159.99,
          originalPrice: 189.99,
          images: [
            "/products/heritage-1-01.jpg",
            "/products/heritage-1-02.jpg",
          ],
          rating: 4.6,
          reviews: 33,
          material: "Antique Silver with Vintage Finish",
          colors: ["Silver", "Antique Bronze"],
          description:
            "A delicate piece that tells a story of timeless elegance.",
        },
        {
            id: "heritage-2",
            name: "Jinhua",
            price: 179.99,
            originalPrice: 209.99,
            images: [
                "/products/heritage-2-01.jpg",
                "/products/heritage-2-02.jpg",
            ],
            rating: 4.8,
            reviews: 27,
            material: "Rose Gold-Plated Silver",
            colors: ["Rose Gold"],
            description:
                "A rose gold bracelet that captures the essence of classic beauty.",
        }
      ],
    },
    "celestial-bloom": {
      name: "Celestial Bloom",
      description:
        "Inspired by the cosmic dance of stars, featuring intricate designs that tell celestial stories.",
      heroImage: "/collections/celestial.jpg",
      products: [
        {
          id: "celestial-1",
          name: "Azurea",
          price: 189.99,
          originalPrice: 219.99,
          images: [
            "/products/celestial-1-01.jpg",
            "/products/celestial-1-02.jpg",
          ],
          rating: 4.9,
          reviews: 52,
          material: "Sterling Silver with Gemstone Accents",
          colors: ["Silver", "Platinum"],
          description: "Ethereal design capturing the mystique of the cosmos.",
        },
        {
          id: "celestial-2",
          name: "Nyra",
          price: 209.99,
          originalPrice: 249.99,
          images: [
            "/products/celestial-2-01.jpg",
            "/products/celestial-2-02.jpg",
          ],
          rating: 4.7,
          reviews: 37,
          material: "Platinum with Star-Cut Crystals",
          colors: ["Platinum", "Silver"],
          description:
            "A mesmerizing bracelet that captures the intricate beauty of the night sky.",
        },
      ],
    },
  };
}
