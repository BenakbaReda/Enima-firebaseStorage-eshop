const AOS_Animation_Names=[
    "fade",
   ,"fade-up"
    ,"fade-down"
    ,"fade-left"
    ,"fade-right"
    ,"fade-up-right"
    ,"fade-up-left"
    ,"fade-down-right"
    ,"fade-down-left"
    
    ,"flip-up"
    ,"flip-down"
    ,"flip-left"
    ,"flip-right"
       
    ,"slide-up"
    ,"slide-down"
    ,"slide-left"
    ,"slide-right"
      
    ,"zoom-in"
    ,"zoom-in-up"
    ,"zoom-in-down"
    ,"zoom-in-left"
    ,"zoom-in-right" 
     ,"zoom-out"
   ,"zoom-out-up"
    ,"zoom-out-down"
    ,"zoom-out-left"
    ,"zoom-out-right"  
  ]


  export  function getRandomAnimation( ) {

    const idx =  randomInteger(0,AOS_Animation_Names.length-1);

    return AOS_Animation_Names [idx];
}



export  function randomInteger(min, max) {
      return Math.floor(  Math.random() * (max - min + 1) )  + min;
}
    
