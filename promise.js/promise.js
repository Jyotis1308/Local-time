const promiseone= new Promise(function (resolve,reject){
setTimeout(function(){
    console.log('ASYN task is complete');
   resolve()
},1000)
})

promiseone.then(function(){
    console.log("promise consumed");
})
    

new Promise(function(resolve,reject){
    setTimeout(function(){
        console.log("new promise 2")
        resolve();
    },1000)
   
}).then(function(){
    console.log("prrmose consumed")
})

const promisethree = new Promise(function(resolve,reject){
    setTimeout(function(){
        resolve({usrname: "jyoti" , email:"chai@examole.com"})
    },1000)
})

promisethree.then(function(user)){
    console.log(user);
}


const promisefour= new Promise(function(resolve , reject){
     setTimeout(function(){
  let error = true 
  if(!error){
    resolve({usernamee:"jyoti", pass: "1234566"})
  }else{
    reject('ERROR: something went wrong')
  }
     },1000)
})
promisefour.then((user)=> {
    console.log(user);
    return user.usernamee
}).then((usernamee)=>{
  console.log(usernamee)
}).catch(function(error){
    console.log(error);
}).finally(()=> console.log("promise is either rsolved orrejected"))

const promisefive = new promise (function (resolve, reject){
    setTimeout(function(){
    let error = true 
    if(!error){
      resolve({usernamee:"javascript", pass: "1234566"})
    }else{
      reject('js went  wrong')
    }
       },1000)
})
async function consumepromisefive(){
    try{
        const repsonse = await promisefive
        console.log(repsonse);
 
    } catch(error){
        console.log(error);
    }
   
}
consumepromisefive()

async function getalluser(){
    try{
        const response =await fetch ('https://jsonplaceholder.typicode.com/users')
        const data = await response.json()
        console.log (data);
    }
  catch(error){
    console.log("E:", error);
  }
}

getalluser()

fetch('')
.then((response)=>{
    return response.json()
})
.then((data)=>{
console.log(data);
})
.catch((error)=>console.log(error))




