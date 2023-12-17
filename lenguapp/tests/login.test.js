
const db = require("../config/database");
const UserSchema = require("../models/user");
const User = db.model("Users",UserSchema);

//user@mail ,ab
test("login successfully ", async () => {
    const test_email =  "user@mail";
    const user =await User.find({email : test_email})
    expect( user[0].email ).toBe(test_email)
})