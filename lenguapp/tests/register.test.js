const db = require("../config/database");
const UserSchema = require("../models/user")
const User = db.model("Users",UserSchema)


const test_user = {
    "username" :"tester",
    "email" : "test@mail.com",
    "password" : "abc",
}

test("create a user", async() => {
    await User.create(test_user);
    let found_user = await User.find({email : test_user.email})
    await User.deleteOne({email : "test@mail.com"})
    expect(found_user[0].email).toBe("test@mail.com");
});

test("modify password ", async () => {
    await User.create(test_user);
    await User.updateOne(
        { email : "test@mail.com" },
        {
            $set : {
               password : "def" 
            }
        }
    );
    let found_user = await User.find({email : "test@mail.com"});
    await User.deleteOne({email : "test@mail.com"});
    expect(found_user[0].password).toBe("def");
});