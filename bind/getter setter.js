class user{
   constructor (email,password) {
     this.email = email;
      this.password = password;

}
 get email (){
    return this.email.toUpperCase()
 }
 set email(value){
   this._email;
 }
 get password(){
 // return this._password.toUpperCase()
 return `${this._password}jyoti`
 }
 set password(value){
    this._password= value
 }
}
  const jyoti = new user("jyoti@gmail.com", "123")
  console.log(jyoti.password);