 
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


 