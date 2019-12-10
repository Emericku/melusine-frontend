export type Category = 'Custom' | 'Chaud' | 'Froid' | 'Boissons' | 'Desserts';

export default interface Product {
    name: string;
    category: Category;
    image: string;
    quantity: number;
    price: number;
}

interface CategoryItem {
    name: Category;
    image: string;
}

export const categories: CategoryItem[] = [
    {
        name: 'Custom',
        image: '/assets/icons/restaurant.svg'
    },

    {
        name: 'Chaud',
        image: '/assets/icons/bell-covering-hot-dish.svg'
    },

    {
        name: 'Froid',
        image: '/assets/icons/cyclone.svg'
    },

    {
        name: 'Boissons',
        image: '/assets/icons/orange-juice.svg'
    },

    {
        name: 'Desserts',
        image: '/assets/icons/cup-cake.svg'
    }
];
