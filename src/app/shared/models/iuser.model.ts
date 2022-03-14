export interface IUser {

    id: number ,
    userName:string,
    email:string,     
    password: string, 
    phone?:  string,    
    role:string  
    firstName?:string,     
    lastName?: string,     
    accessToken?:string,  
}

export interface IRole {
  id:number
  name: string;
  label: string;
}


export interface IUserLogin {
    email: string,
    password: string,
}
  

export interface IUserLoginResponse {
    accessToken?:string,  
    user?: IUser,
}

export interface IUserRegister {
  email: string,
  password: string,
  firstName?:string, 
  phone?:  string,      
}
  
export interface IUserRegisterResponse {
  accessToken?:string,  
  user?: IUser,
}
