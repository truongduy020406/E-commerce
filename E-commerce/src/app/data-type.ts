import { NumberInput } from "@angular/cdk/coercion"

export interface SignUp{
    name:string,
    password:string,
    email:string
}

export interface SignIn{
    email:string,
    password:string

}

export interface product{
    name:string,
    price:number,
    category:string,
    color:string,
    description:string,
    imageUrl:string,
    id:number,
    quantity: undefined | number,
    productId : number
}

export interface cart{
    name:string,
    price:number,
    category:string,
    color:string,
    description:string,
    imageUrl:string,
    id:number | undefined,
    quantity: undefined | number,
    userId :number,
    productId : number
}