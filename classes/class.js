class user{
   constructor(user,email,password){
    this.user=user;
    this.email=email;
    this.password=password
   }
   encryptPassword(){
      return `${this.password}abc`
   }
   changeuser(){
    return `${this.user.toUpperCase}`
   }
}
const chai = new user("jyoti"," jyoti@gmail.com"," 123")
console.log(chai.encryptPassword());
console.log(chai.changeuser)

function user(user, email,password){
    this.user= user;
    this.email=email
    this.password= password

}
user.prototype.encryptPassword= function(){
 return `${this.password}abc`
}
user.prototype.changeuser=function(){
return `${this.user.toUpperCase}`
}