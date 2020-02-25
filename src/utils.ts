export const priceFormatter = new Intl.NumberFormat(navigator.language, { 
    style: 'currency', 
    currency: 'EUR' 
});

export const sleep = (duration: number) => new Promise((resolve) => setTimeout(resolve, duration));

export const formatNumber = (value: number) => (value < 10) ? '0' + value : value;
