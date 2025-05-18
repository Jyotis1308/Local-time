class user{
    constructor(username){
        this.username= username
    }
   
    logme(){
        console.log(`USERNAME is ${this.username}`)
    }
}
class teacher extends user{
    constructor(username,email,password){
        super(username)
        this.email =email;
        this.password = password;
    }
    addCourse(){
        console.log(`A new course was added by${this.username}`);
    }
}
 const joke = new teacher("jyoti", "jyoti@hbnb.com", "1234")
 joke.addCourse()
 const masla = new user("masala chai")
 masla.logme()
 joke.logme();

 console.log(joke instanceof user)
 