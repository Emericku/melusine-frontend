import { Ingredient } from './ingredient.model';

export interface Product {
    id: string;
    name: string;
    category: string;
    price?: number;
    quantity: number;
    image?: string;
    ingredients: Ingredient[]
}

export interface ProductCategory {
    name: string;
    icon: string;
    color: string;
}

export interface ProductResponse {
    id: string;
    name: string;
    category: string;
    price?: number;
    quantity: number;
    image?: string;
    ingredients: Ingredient[]
}

export class ProductRequest {

    constructor(
        public name: string,
        public category: string,
        public ingredients: string[],
        public isOriginal: boolean,
        public image?: string,
        public price?: number,
        public id?: string
    ) {}

}

export enum Category {

    CUSTOM = "CUSTOM",
    CHAUD = "CHAUD",
    FROID = "FROID",
    BOISSON = "BOISSON",
    DESSERT = "DESSERT"
}

export const categoryMapping = [
    { value: Category.CUSTOM, label: 'Custom' },
    { value: Category.CHAUD, label: 'Chaud' },
    { value: Category.FROID, label: 'Froid' },
    { value: Category.BOISSON, label: 'Boisson' },
    { value: Category.DESSERT, label: 'Dessert' }
];

export const productDefaultImage = 'iVBORw0KGgoAAAANSUhEUgAAAFQAAABUCAYAAAAcaxDBAAAAAXNSR0IArs4c6QAAADhlWElmTU0AKgAAAAgAAYdpAAQAAAABAAAAGgAAAAAAAqACAAQAAAABAAAAVKADAAQAAAABAAAAVAAAAACUoO96AAAMqklEQVR4AeVdv3MbuRUGltRY3SllKvO6647XJLalG9EzKdyJ7q4z/ReIjqVESiN6MhMpkWSzvM5yl868Kum8mvjkS3W87rrIXUqls0dcIt8H7lLLJbC/tEtSPszIxD4AD8C3D3gPD1hYigUIO+2dmlzybiulGkLJmpCqppuFuJRiFNcEIZQS50g/56MUoq+EuJBSuuqy8v6ge6DpTJtXQJtmHzSAlct1JZwGam9EQQMtV9BgC+FKMXSVt3Q6D4BnBmin3V75WKlsCOm0gVY9F2JZCynRE2LYu+V533W63YusxfPkLx1QSqOoeHuQwlaeBhZSRqkLJWRPeJVnZUttaYDubG01pJKbmOiahYBSEBNMCydlAls4oKP50XuxaEBG3weBXfYunxQ9FRQKKKRyTyrRFlKuRDuQ6Vmp9+Bxrssoda4kNPso1KXweStYAlLe9un5fjAVwG5o7x8fv8rHYLpUIYD+aXu7jjf+Euzr01UkUAgeNLNS0nUqov+Xw8N+QomJZNY99ERdSphcsBjygKyEcpcHg4dFSOu1Ad35/XYLncEQzyCVWgJFVw2qvaKVhK8E21KoZiZwqbikeHhwdOROvLGMD9cCdOfp9stM2lupV9KR3axSmLFP4+xaMQrZAWF9TEyMqO7+0dGTxGyWDLkApU35oVp9jfmsYeE7SQaQyqt2ipbGyUrsTyNFOehAYh/Zc12lUGEdHB8+vqKkj2UGVBvo1aU3qCLNfHkKCW7PSiKTuk2JFUp0sVT9Milv3nk1E6BpwVRC/E8MRfvg+eFJUsPnkb67tdWGJ+BFirr7twaX97MoKycFU50lNZhK/SQGlfqigsnOYI6ElIqv4Iz5KaH/9Y+VpZcJeSaSKxNPMQ931tb+gTnzTkwWuoJeHRwfPXj7w9uL2HwLkPivs7P//u63v/m7J51fY261T19SfLF2d7X29t3Zd2manWrIp9Pm6gnffJpKFy3P7tOtkySFhTn1GUyqTlLbEwHVdqajjXYrLzUUjxd5iFsbHkpIM68C1PtJdmosoHoFNFRv8PZWQnVPRD8FMIMOJYIK4/+WN/g8TknFKiW9nIwBE5Pmk5sumQGY/NVTFvRAmDYRBxa0vydokQerUoLN1oES+iaS/+oRFe8fH+1cET6NGJRPb+3eva/Q9y9MPQK9tnZn9T3y9U3pRgnVKwslNk0FSKO5ATBbtvSbToejpIVOvrf1g74LmpGm9KqJKCv0Z5rnTW20e9WmqVxRNL5QVfE28LYbSqoVuATr5A3nRR9O64uytzU4R0J/NDHl/WjsE4d+ZamDtHY0fUop+Q6FN9GMwXOZSki74pR6gWHVCOqL++Wau0zvuz/t7dnaoAaVz6P+CdOQn0I9xPC0LCUEW7dLiUgLJttET5esev9Bx62dDrU9c1TbnXFDvwKHSyRMSKieO9HASJ7xI5drRTs60i5px42wRbDDecu7fBxn0tiKxtETR2xESickVBoQH1cGrV40mOT9oVJ18aPnSD7nDtgMzLruTlOXb8ifWvNWB61w2hhQrbVi/IX0Z4YLFhHnki+NKy11XQCVU0fq/CkzYoXUsWWFwpywhsaAfnCWmrZC2ulR8DEXDiVMgo+sdfoJNNHQITomTlN4hzivblK5JfHNkh4rpdD4u0//MMZubDZJZxLpcIXctgg/FxKHoxdbzfaAKcbk5ec8L6qDLpTXhq3wEJYC0u7b0nPRFTCQat1cdkhAe0zTXYpVRtByMOJrzFxU0G9Uqtc2fmlMszwmja2+tPSdre0LAPaZKf/+0aHGcjTkHa9hyqRpEpJUcMAQbthYIu1ZGtOMJo0/FRhZyeqAUlNokEppKTQxDYa9BtTf0zblE9zqNSZcg6i3eA3lFbZOsOxL/wIH1baBjU+STXtavhSs1E5sJQMh0YDiIJV5bsBwj64EbAwz0S0nPigBWexIv22nxrqV+tJIvwaRyokv3cQCylBj6Oj5U4qaKRNoroWem2xzKpBh6MhNav6QDNeY2eKLMObNRLTU59vSDjRmzcaPx2NsaWXQpXL6ZfAtkic0j2vjR1OQQ75hy8CzRra0vHQOaZM9yaGkvOyAwrCu5W1LnnJopx2Toaw5cQ0qY6nJTjiObIXnIh3nPn6OxYOSZuVjeml5AJwqM6ieT9ECgqNqDpYWteB54jfGyzKRL8cDX9Ty4LKGSfMhbc68+/jcA8IQNNqFMLHdHE1LLJLw0uvjldIUp+B85lRCMQRfm/fycvM3EPdsqy2spNy8vFOUO0We9Wg+1LniwAd5O5qw6M/c2lZxu7F6dfe33C/rOv2vwn6qGRng5LCRPgeilkYMbcyLDUhBE02o+6tmY2tgnXSMCTMgWod8Hpuw6PbqLZGheI1RVCNvgJmmitJ2FZIq52i3AppUeBbpGNY9+EtTT0naWhhUWrNom6kOLKnhtLOEOHPKUqRQsu8vzQSmI0UjQQsX2sYpZlDkjnX/WcraVIEFJWibE0coy7Kbs3Sbduh5lgKLlJdDnO6+ZW8wa8m02L5CWOfQRTantETCg748vMzknSpQGGBlTAe83IsqgOsHrqdwFqs5Fc40rzjO7eOjAnce1estGOHZqu5jyPNrMnMoerPLXMsNo8Z45+gto5Z3bV3iF2q2tF8wvWHru5LDC0fEeE/itkZsTD91OhYXVkDp0Xe03WbxLFm3Rj511OL7t25JPiU9MOxdUyYqptEkbEqdH82RPNI4+xDsbJpqDrZiNKCxWx0Vr21iUDYNu5+8oGV6QwyjaX4GvD7QYOu6y4SRhA4r+oEEQ9gw0EonaX8pvPhhUBnHKZZm6ZXbKzBiwXb5x3VGgHIehcjy/NBU0MOe55DmEPSBBywp6dXnH73885JO+mCxqlwxwRA+AHG1UhrKHuA1vgEw2cOfa2JWNs13dpyUXU8if0c9svtgnV5QPlBKgss4im6QEP6lqbCIyincxjLj9HxZzaXI7sBYQjln4bxmD2KNNzEd/MO4remU8ijchIPC3Awtg/tCDbtF3hGSsvUcocYAR/xJOGEsoSTGHqoF0NpHGS5dYhx1dTDEXoTAZG11XKR1ouezEusOs6apZJNOjujoWawJQH0j/1WYYTgOxi/Cz+XGZdvGP+4sq61MHjqPDUFZx/RZdf3d2zH7CUBJjZVSSMjoe8hx+VIi7Ah2jz6LYV6PSSssCZ8htiMjZIJ3VDqZOAVokpQKJfZ+CV4oXxHZ5044tqPSaQSURHxxO2FQkzYOsMXgQ30Zd4punDdnhA3l/GQrXtoxG79CPUKUeG2rn9tGJulk/ikJJZEdwg5eh3FLqOPTvJi5xVIqE1l1rdl53r3EoL84thjxrBaavWWSTqZZv0Z+e3b2w9f3Vu8jT40ZowFzSz3L1RHR8knPqN/FV8GYSiW+DBbLzE+pxYvexTUc3yaVz5s+ur3CvrzlihLLzAMbf7TVHrQxX/X6yBSjIG7u1RjRnideBYKhjumwbpNO8rNKKBN5GcvXd9d+xoGNb/hsDvLB6t3Vi+/fnf3bnH4zqIlgohtwzNz/8/Pn53E9igWUBd+++/5nDO1fYYjfsTFC2oMyh7+t3qLoacCkc2b/+PCfSXXGDvlw4TQ3x2CSK+UD1nA7ioxTm6e6cm50e0UrTd2pASWz3a1tFz/rjNsCTKpzxxEP5+Vms7UrStd2Jk2jGG2uy2QAk/mNZlO08uAZ15Y1k2xAriwA6o9osNUoDvjN45dSybZhGR17249uW0YwWSaThLKAP0xO0KANPscFSiv2/R8H3uy4vLNIo6ODa3O+9MT6coBJnpkBDRqSak71M6MTLqK8mYu/Mw8c3qiUUsnf5JATTDLODSgLo6EdNDL10CawMM67fz06Mm63kGeRYffp00f4SqSVGkhUTm2e5ltTWzuvBSiZjt6+7IFRjPEfqZ6XScMxi8O0hd8S8cetrQ3cnNPEiqqZqHDCzYLRzg3A6yrTawPKNnFe/Vhd6iEaawGE2z+O65u6pTvEnhWsg36W/9ODK7nx/yEiRCOLJI7rR4TLSTg7rOvzcN6keCGABpVoT7qDG2SzSGtQOPLrz7sR6ugRwK0gVjcmZiFCKunoKHJuLxRQ9kVbAbgkCpp0M0vfZp0XL+wZXXBx6/I8bSoc0KARejjylh3Lpl+Qb5a/UIjwsapuGUAG/SgN0KAC7bHicR5eWlXAVBDwzfQ7GtonZQIZtKd0QIOK+Ds6bIXzQTOQWkrj6ESH09s/nt1XdTMFNAou5rEGhmCjwLubTn1l5hapaMLtTorPDdBow7Q9i+/NBT6RRlrd1+Q6G6StDmmD7Xr1xQqAu0Aibmt0+jw5PC8AdQND//wf7Xk9Cya7FOYAAAAASUVORK5CYII='