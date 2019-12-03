class ProductService {

    async findAll() {
       return [
            { category: 'Custom', name: 'Sandwich froid', image: '/assets/thumbnails/sandwich-froid.png', quantity: 120, price: 3.80 },
            { category: 'Custom', name: 'Sandwich chaud', image: '/assets/thumbnails/sandwich-chaud.png', quantity: 80, price: 1.80 },
            { category: 'Custom', name: 'Salade Gégé', image: '/assets/thumbnails/salade-gege.png', price: 4.00 },
            { category: 'Chaud', name: 'Pizza', image: '/assets/thumbnails/pizza.png', quantity: 60, price: 3.00 },
            { category: 'Chaud', name: 'Quiche', image: '/assets/thumbnails/quiche.png', quantity: 20, price: 2.80 },
            { category: 'Chaud', name: 'Pâté Lorrain', image: '/assets/thumbnails/pate-lorrain.png', quantity: 40, price: 3.00 },
            { category: 'Chaud', name: 'Croque monsieur', image: '/assets/thumbnails/croque-monsieur.png', quantity: 0, price: 2.70 },
            { category: 'Froid', name: 'Le Mitch', image: '/assets/thumbnails/mitch.png', quantity: 50, price: 5.00 },
            { category: 'Froid', name: 'Le jambon beurre', image: '/assets/thumbnails/jambon-beurre.png', quantity: 100, price: 4.60 },
            { category: 'Froid', name: 'Le jambon tartare', image: '/assets/thumbnails/jambon-tartare.png', quantity: 10, price: 2.20 },
            { category: 'Froid', name: 'La Rosette', image: '/assets/thumbnails/rosette.png', quantity: 60, price: 2.90 },
            { category: 'Froid', name: 'Le Paté', image: '/assets/thumbnails/pate.png', quantity: 5, price: 2.70 },
            { category: 'Boissons', name: 'Soda', image: '/assets/thumbnails/soda.png', quantity: 30, price: 3.10 },
            { category: 'Boissons', name: 'Eau', image: '/assets/thumbnails/eau.png', quantity: 10, price: 3.70 },
            { category: 'Boissons', name: 'Sirop', image: '/assets/thumbnails/sirop.png', quantity: 60, price: 2.20 },
            { category: 'Desserts', name: 'Croissant', image: '/assets/thumbnails/croissant.png', quantity: 60, price: 4.10 },
            { category: 'Desserts', name: 'Pain choco', image: '/assets/thumbnails/pain-choco.png', quantity: 30, price: 2.10 },
            { category: 'Desserts', name: 'Tresse', image: '/assets/thumbnails/tresse.png', quantity: 10, price: 3.20 },
            { category: 'Desserts', name: 'Barre chco', image: '/assets/thumbnails/barre-choco.png', quantity: 20, price: 2.80 },
            { category: 'Desserts', name: 'Kinder Bueno', image: '/assets/thumbnails/kinder-bueno.png', quantity: 20, price: 3.40 }
        ];
    }

}

export default new ProductService();
