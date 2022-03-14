
export interface IImage  {
    Url     :string  ,
    Name :string
}

export interface IProduct {
    uuid         :string,
    Name       :string,
    Decription :string,
    Price      :number,
    Rating     :number,
    Stocks     :number,
    Brand    :string,
    Categorie:string,
    Images     :IImage []  
}

  export interface IProductFilter {
    Brand    :string,
    Categorie:string,
    Price :  number,
    isReset:boolean
}
 
export interface ISteperFilter {
    min: number  ,
    max:  number  ,
    value :  number,
    tickInterval:number,
    step:number;
}  


 