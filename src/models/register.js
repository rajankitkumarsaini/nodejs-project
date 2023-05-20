const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const emmployeeSchema = new mongoose.Schema({
    firstname: {
        type: String,
        required: true
    }, lastname: {
        type: String,
        required: true
    }, email: {
        type: String,
        required: true,
        unique: true
    }, gender: {
        type: String,
        required: true
    }, phone: {
        type: Number,
        required: true,
        unique: true
    }, age: {
        type: Number,
        required: true
    }, password: {
        type: String,
        required: true
    }, confirmpassword: {
        type: String,
        
    }, tokens: [{
           token: {
            type: String,
            required: true

           }
    }]
});

emmployeeSchema.methods.generateAuthToken = async function () {
    try {

        const token = await jwt.sign({ _id: this._id.toString() }, process.env.SECRET_KEY);
        this.tokens=this.tokens.concat({token:token});
        await this.save();
        console.log(token);
        return token;
        //     const userVerification=await jwt.verify(token,"ahsgdvbcnmxkiyfdhnsjbcdhcjjcbdgc",{expiresIn:"2 seconds"});
        //     console.log(userVerification);
        // }
        // createToken();
    } catch (error) {
        //res.send('Error:' + error);
        console.log('Error:' + error);
    }
}
emmployeeSchema.pre("save", async function (next) {
    if (this.isModified('password')) {
        const passwordHash = await bcrypt.hash(this.password, 10);
        console.log(`The current password is ${this.passwordHash}`);
        this.password = await bcrypt.hash(this.password, 10);
        this.confirmpassword = undefined;
    }
    next();
});
const Register = new mongoose.model("Register", emmployeeSchema);
module.exports = Register;