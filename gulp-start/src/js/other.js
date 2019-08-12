{
    const abc = "ZHG";
    console.log("other");

}
class User {

    constructor(name) {
      this.name = name;
    }
  
    HelloUser() {
      alert(this.name);
    }
  
  }
  
  let user = new User("Pasha");
  user.HelloUser(); 