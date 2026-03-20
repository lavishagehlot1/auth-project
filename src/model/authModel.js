import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
const userSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    }
    
   
   
},{timestamps:true})

userSchema.pre('save', async function(next) {
    if (!this.isModified('password')) { 
        return next();
    }

    try {
        const salt = await bcrypt.genSalt(12);
        this.password = await bcrypt.hash(this.password, salt);
        next(); //call it to mongoose that we are done with pre save,continue saving the document.
    } catch (err) {
        next(err);
    }
});

const User = mongoose.model('User', userSchema);

// Export the User model as the default export
export default User;