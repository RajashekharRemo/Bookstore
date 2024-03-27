
export interface Book{
    id:number,
    title:string,
    description:string,
    author:string,
    price:number,
    quantity:number,
    image:string,
    actualPrice:number
}

export interface Review{
    fullName:string,
    review:string,
    stars:number
}

export interface AddToCart{
    bookId:number,
    quantity:number
}

export interface WishList{
    bookId:number
}

export interface Orders{
    id:number,
    uName:string,
    address:string,
    city:string,
    phone:number,
    state:string,
    quantiy:number,
    title:string,
    description:string,
    auther:string,
    image:string,
    price:number,
    actualPrice:number
}

export interface Address{
    id:number,
    uName:string,
    uPhone:string,
    city:string,
    state:string,
    uAddress:string,
    addressType:string
}
