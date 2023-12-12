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
    quantity: undefined | number
}