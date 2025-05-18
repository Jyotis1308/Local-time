class user {
    constructor(username){
        this.username = username
    }

    logMe(){
        console.log(`USERNAME:${this.username}`);
    }
    createid(){
        return `1234`
    }
}

const hitesh = new user ("yoti")
console.log(hitesh.createid())

class teacher extends user {
    constructor(username,email){
        super(username);
        this.email= email;

    }
}
const iphone = new teacher("iphone", "iphonw@g.com")
console.log(iphone.logMe())