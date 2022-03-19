
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

  

 