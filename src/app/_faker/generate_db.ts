const dbp= require("./db_helper.ts")
var faker = require('faker');
const fs = require('fs');

var db_users =  {  
                  Users:[],
                  Address:[]
                };
var db_products = {          
                      //static 
                      Configuartion:[],
                      Animations:[],
                      Categories:[],
                      Brands:[],
                      DeliveryType:[], 

                      //dynamic
                      orders:[],  
                      shopingbasket:[], 
                      Products:[]
                    };


const args = process.argv;
//console.log(args);


/* Generate db */
const generateDb = (db, path) => {
  const jsonString = JSON.stringify(db,null, 2)

  fs.writeFile(path, jsonString, err => {
    if (err) {
        console.log('Error writing file' + path, err)
    } else {
        console.log('Successfully wrote file' +path )
    }
  })  
};
 


if(args.length >2 ){
  var param   = args[2];  
  

  console.log("your arg : " + param   );

  if(param === "--user")
  {
    dbp.generate_address(db_users.Address);
    dbp.generate_users(db_users.Users, faker.random.arrayElement(dbp.addressName),faker.random.arrayElement(dbp.addressName));
    
   
    generateDb(db_users,'./dbusers.json' );
  }
  else if(param === "--prod")
  {
    dbp.generate_Animations(db_products.Animations);
    dbp.generate_DeliveryType(db_products.DeliveryType);
    dbp.generate_Categories(db_products.Categories);
    dbp.generate_Brands(db_products.Brands);
    dbp.generate_Products(db_products.Products);
    
    
    generateDb(db_products,'./dbproducts.json' );
  }
  else {
    console.log("must use args :"  );
    
    console.log(" --prod : for products database "  );
    console.log(" --user : for users  database "  );
  }
}
else{
  console.log("must use args :"  );
    
  console.log(" --prod : for products database "  );
  console.log(" --user : for users  database "  );

}







 
 