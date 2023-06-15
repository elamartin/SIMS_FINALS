//ARROW AND CALLBBACK

function myFunction(){
    console.log(`This is the second function`)
}

function myFunction2(callback){
    console.log(`This is the first function`)
    callback()
    //heavy process myFunction2
}

//myFunction > myFunction2

myFunction2(myFunction)
