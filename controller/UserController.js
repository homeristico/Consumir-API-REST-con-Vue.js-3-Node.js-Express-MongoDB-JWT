// Modelos
const User = require('./../models/User');

const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

// Validaciones
const { userValidation, loginValidation } = require('./../validations/UserValidation');




const register = async (req, res) => {

    const registerValidation = userValidation.validate(req.body);

    if(registerValidation.error){
        return res.status(400).json({
            error: registerValidation.error.details[0].message
        });
    }

    const emailExit = await User.findOne({email: req.body.email});

    if(emailExit){
        return res.status(400).json({
            error: true,
            message: 'el email ya existe'
        });
    }

    const saltos = await bcrypt.genSalt(10);
    const password = await bcrypt.hash(req.body.password, saltos);
    

    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: password
    });

    try{

        const userDB = await user.save();

        res.json({
            error:null,
            data:userDB
        });


    }catch(error){
        res.status(400).json(error);
    }
    
}

const login = async (req, res) => {
     const userLoginValidation  = loginValidation.validate(req.body);
     if(userLoginValidation.error){
         return res.status(400).json({
             error: userLoginValidation.error.details[0].message
         });
     }

     const user = await User.findOne({email: req.body.email});

     if(!user){
         return res.status(400).json({
             error: true,
             message: 'usuario no encontrado.'
         });
     }

     const passValidation = await bcrypt.compare(req.body.password, user.password);

     if(!passValidation){
        return res.status(400).json({
            error: true,
            message: 'la contraseña no coincide.'
        });
     }

     const token = jwt.sign({
         name:user.name,
         id:user._id,         
     }, process.env.TOKEN_SECRET);

     res.header('auth-token', token).json({
         error:null,
         data:{token}
     });  
     
}

const admin = async (req, res) => {
    res.json({
        adios:'hasta nunca',
        user: req.user
    });
}








module.exports = {
    register,
    admin,
    login
};