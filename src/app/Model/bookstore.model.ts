
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