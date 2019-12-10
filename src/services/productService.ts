import Product from "../models/product.model";
import { sleep } from "../utils";

class ProductService {

    async findAll(): Promise<Product[]> {
        await sleep(300);

        return [
            { id: '01', category: 'Custom', name: 'Sandwich froid', image: '/assets/thumbnails/sandwich-froid.png', quantity: 120, price: 3.80 },
            { id: '02', category: 'Custom', name: 'Sandwich chaud', image: '/assets/thumbnails/sandwich-chaud.png', quantity: 80, price: 1.80 },
            { id: '03', category: 'Chaud', name: 'Pizza', image: '/assets/thumbnails/pizza.png', quantity: 60, price: 3.00 },
            { id: '04', category: 'Chaud', name: 'Quiche', image: '/assets/thumbnails/quiche.png', quantity: 20, price: 2.80 },
            { id: '05', category: 'Chaud', name: 'Pâté Lorrain', image: '/assets/thumbnails/pate-lorrain.png', quantity: 40, price: 3.00 },
            { id: '06', category: 'Chaud', name: 'Croque monsieur', image: '/assets/thumbnails/croque-monsieur.png', quantity: 0, price: 2.70 },
            { id: '07', category: 'Froid', name: 'Le Mitch', image: '/assets/thumbnails/mitch.png', quantity: 50, price: 5.00 },
            { id: '08', category: 'Froid', name: 'Le jambon beurre', image: '/assets/thumbnails/jambon-beurre.png', quantity: 100, price: 4.60 },
            { id: '09', category: 'Froid', name: 'Le jambon tartare', image: '/assets/thumbnails/jambon-tartare.png', quantity: 10, price: 2.20 },
            { id: '10', category: 'Froid', name: 'La Rosette', image: '/assets/thumbnails/rosette.png', quantity: 60, price: 2.90 },
            { id: '11', category: 'Froid', name: 'Le Paté', image: '/assets/thumbnails/pate.png', quantity: 5, price: 2.70 },
            { id: '12', category: 'Boissons', name: 'Soda', image: '/assets/thumbnails/soda.png', quantity: 30, price: 3.10 },
            { id: '13', category: 'Boissons', name: 'Eau', image: '/assets/thumbnails/eau.png', quantity: 10, price: 3.70 },
            { id: '14', category: 'Boissons', name: 'Sirop', image: '/assets/thumbnails/sirop.png', quantity: 60, price: 2.20 },
            { id: '15', category: 'Desserts', name: 'Croissant', image: '/assets/thumbnails/croissant.png', quantity: 60, price: 4.10 },
            { id: '16', category: 'Desserts', name: 'Pain choco', image: '/assets/thumbnails/pain-choco.png', quantity: 30, price: 2.10 },
            { id: '17', category: 'Desserts', name: 'Tresse', image: '/assets/thumbnails/tresse.png', quantity: 10, price: 3.20 },
            { id: '18', category: 'Desserts', name: 'Barre chco', image: '/assets/thumbnails/barre-choco.png', quantity: 20, price: 2.80 },
            { id: '19', category: 'Desserts', name: 'Kinder Bueno', image: '/assets/thumbnails/kinder-bueno.png', quantity: 20, price: 3.40 }
        ];
    }

}

export default new ProductService();
