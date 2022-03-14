var faker = require('faker');
const { v4: uuidv4 } = require('uuid');
const  commune = [ 'ain beniane','cheraga','bab zour','bab eloued','stawali','swidania','zeralda'];
const  wilaya  = [ 'Alger',  'blida','tipazza', 'Jijel',  'skikda',   'chlef','stif', 'batna', 'annaba'];
const  addressName  = [ 'Alger',  'blida','tipazza', 'Jijel',  'skikda',   'chlef','stif', 'batna', 'annaba'];
const  images  = [ '1.jpg', '2.jpg', '3.jpg', '4.jpg', '5.jpg',  '6.jpg','7.jpg',  '8.jpg',  '9.jpg'];
const  imagesUrl  = [ 'assets/bg-img/1.jpg', 'assets/bg-img/2.jpg', 'assets/bg-img/3.jpg', 'assets/bg-img/4.jpg', 'assets/bg-img/5.jpg',  'assets/bg-img/6.jpg','assets/bg-img/7.jpg',  'assets/bg-img/8.jpg',  'assets/bg-img/9.jpg'];

const  imageFirebase  =  'default_e82e19d6-c7c1-4a8c-9193-315427a1bccb_0';
const  imageUrlFirebase  = 'https://firebasestorage.googleapis.com/v0/b/rtdb-5ec40.appspot.com/o/images%2Fproducts%2Fdefault_e82e19d6-c7c1-4a8c-9193-315427a1bccb_0?alt=media&token=d6e354c8-5d74-4a76-b032-2af565686e9b';
 
const  animNames  = [
    "bounce",
    "flash",
    "pulse",
    "rubberBand",
    "shakeX",
    "shakeY",
    "headShake",
    "swing",
    "tada",
    "wobble",
    "jello",
    "heartBeat",
    "backInDown",
    "backInLeft",
    "backInRight",
    "backInUp",
    "backOutDown",
    "backOutLeft",
    "backOutRight",
    "backOutUp",
    "bounceIn",
    "bounceInDown",
    "bounceInLeft",
    "bounceInRight",
    "bounceInUp",
    "bounceOut",
    "bounceOutDown",
    "bounceOutLeft",
    "bounceOutRight",
    "bounceOutUp",
    "fadeIn",
    "fadeInDown",
    "fadeInDownBig",
    "fadeInLeft",
    "fadeInLeftBig",
    "fadeInRight",
    "fadeInRightBig",
    "fadeInUp",
    "fadeInUpBig",
    "fadeInTopLeft",
    "fadeInTopRight",
    "fadeInBottomLeft",
    "fadeInBottomRight",
    "fadeOut",
    "fadeOutDown",
    "fadeOutDownBig",
    "fadeOutLeft",
    "fadeOutLeftBig",
    "fadeOutRight",
    "fadeOutRightBig",
    "fadeOutUp",
    "fadeOutUpBig",
    "fadeOutTopLeft",
    "fadeOutTopRight",
    "fadeOutBottomRight",
    "fadeOutBottomLeft",
    "flip",
    "flipInX",
    "flipInY",
    "flipOutX",
    "flipOutY",
    "lightSpeedInRight",
    "lightSpeedInLeft",
    "lightSpeedOutRight",
    "lightSpeedOutLeft",
    "rotateIn",
    "rotateInDownLeft",
    "rotateInDownRight",
    "rotateInUpLeft",
    "rotateInUpRight",
    "rotateOut",
    "rotateOutDownLeft",
    "rotateOutDownRight",
    "rotateOutUpLeft",
    "rotateOutUpRight",
    "hinge",
    "jackInTheBox",
    "rollIn",
    "rollOut",
    "zoomIn",
    "zoomInDown",
    "zoomInLeft",
    "zoomInRight",
    "zoomInUp",
    "zoomOut",
    "zoomOutDown",
    "zoomOutLeft",
    "zoomOutRight",
    "zoomOutUp",
    "slideInDown",
    "slideInLeft",
    "slideInRight",
    "slideInUp",
    "slideOutDown",
    "slideOutLeft",
    "slideOutRight",
    "slideOutUp"
]
    
 
/*
animate__slow	2s
animate__slower	3s
animate__fast	800ms
animate__faster	500ms
*/
const  animSpeeds  = [   ' ',
                             'animate__slow', 
                             'animate__slower',
                             'animate__fast' , 
                             'animate__faster' ];

/*
animate__delay-2s	2s
animate__delay-3s	3s
animate__delay-4s	4s
animate__delay-5s	5s
*/
const  animDelays  = [   ' ',
                             'animate__delay-2s', 
                             'animate__delay-3s',
                             'animate__delay-4s' , 
                             'animate__delay-5s' ];

/*
animate__repeat-1	1
animate__repeat-2	2
animate__repeat-3	3
animate__infinite	infinite
*/
const  animRepeats  = [  ' ',
                             'animate__repeat-1', 
                             'animate__repeat-2',
                             'animate__repeat-3' , 
                             'animate__infinite' ];


const  randomNumber = (min, max) => {
        return Math.floor(  Math.random() * (max - min + 1) )  + min;
}
const  randomAnimation = () => {
    const animStr =   "animate__animated  " +  
                       animNames[ randomNumber(0,animNames.length-1)]+  " " +    
                       animSpeeds[ randomNumber(0,animSpeeds.length-1)]+  " " +
                       animRepeats[ randomNumber(0,animRepeats.length-1)]+  " " + 
                       animDelays[ randomNumber(0,animDelays.length-1)];   
    return  animStr;
}                         

/* Generate Images */
const generateImages = (number) => {
    const imgs = [];
    while (number !== 0) {
      const value = faker.random.arrayElement(images);
      imgs.push(value);
      number--;
    }
    return imgs;
};
 
const generateImagesUrl = (number , isFirebase) => {
    const imgs = [ ];
    while (number !== 0) {
      const name =isFirebase==true?imageFirebase: faker.random.arrayElement(images);
      const url =isFirebase==true?imageUrlFirebase: faker.random.arrayElement(imagesUrl);
     
      imgs.push({ Name:name, Url:url} );
      number--;
    }
 
    return imgs;
};

function generate_configuration(items )    {
    for (var i=1; i<=9; i++) {
        items.push(
            {
                uuid:uuidv4(),
                Name:   faker.name.firstName()  , 
                priceAnimationId :1,
                loginAnimationId :1,
                registerAnimationId :1,
            });
    }

    return  items;
}

function generate_Animations(items )    {
    for (var i=1; i<=9; i++) {
        items.push(
            {
                uuid:uuidv4(),
                Name:faker.name.firstName(), 
                config:   randomAnimation()     , 
            });
    }

    return  items;
}

function generate_DeliveryType(items )    {
    for (var i=1; i<=2; i++) {
        items.push(
            {
                uuid:uuidv4(),
                    shortName: i==1? 'point de ralais':  'domicile '  , 
                    deliveryTime: '3 days',
                    description: 'description',
                    price:  faker.datatype.number({min: 400, max: 2000}), 
            });
    }

    return  items;
}
 




function generate_Categories(items ) {
    for (var i=1; i<=8; i++) {
        items.push(
            {
                uuid:uuidv4(),
                Name:faker.name.firstName(), 
            });
    }
    return  items;
}

function generate_Brands(items ) {
    for (var i=1; i<=5; i++) {
        items.push(
            {
                uuid:uuidv4(),
                Name:faker.name.firstName(), 
            });
    }
    return  items;
}

 
 
function generate_Products(items ) {
    for (var i=1; i<=4; i++) {
        items.push(
            {
                uuid:uuidv4(),
                Name:faker.commerce.productName(),
                Decription: faker.lorem.paragraph(), 
                Price :  faker.datatype.number({min: 10, max: 10000}),
                Rating:faker.random.arrayElement([1, 2, 3,4]),
                Stocks:faker.datatype.number({min: 10, max: 100}), 
                CategorieId:faker.random.arrayElement([1, 2, 3,4,5,6,7,8]),  
                BrandId: faker.random.arrayElement([1, 2, 3,4,5]),  

                PhotosUrl  : generateImagesUrl(6,true)
               
            });
    }
    return  items;
}
 
 



function generate_address(items )    {
    for (var i=1; i<=10; i++) {
        items.push(
            {
                uuid:uuidv4(),
                name:   faker.random.arrayElement(addressName), 
                street: faker.address.streetAddress(true),
                wilaya: faker.random.arrayElement(wilaya),  
                commune: faker.random.arrayElement(commune),  
            });
    }

    return  items;
}



function generate_users(items, _addressName,_deliveryAddressName )    {
    for (var i=1; i<=10; i++) {
        items.push(
            {
                uuid:uuidv4(),
                email:faker.internet.email(),     
                password: faker.internet.password(), 
                firstName:faker.name.firstName(), 
                lastName: faker.name.lastName(), 
                phone :  faker.phone.phoneNumber(),
                token:' no token',

                addressId: addressName.indexOf(_addressName) ,

                DeliveryAddressId: addressName.indexOf(_deliveryAddressName),
            });
    }

    return  items;
}

  
 


module.exports ={
    commune,
    wilaya,
    addressName,

    generate_Animations,
    generate_DeliveryType,
    generate_Categories,
    generate_Brands,
    generate_Products,

    generate_users,
    generate_address,
    generateImages
}
