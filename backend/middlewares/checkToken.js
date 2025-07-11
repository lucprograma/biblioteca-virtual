import jwt from 'jsonwebtoken';
import cookieParser from 'cookie-parser';

const chktoken = async (req,res,next) =>{
    if(req.cookies.token){
        const token = req.cookies.token ;
        jwt.verify(token,process.env.JWT_SECRET,(err,result)=>{
            if(err){res.status(403).send(err.message)}
            if(result){next()}
        })
    }else{
        return res.status(403).send('ERROR EN LA AUTENTICACION DESCONOCIDO')
    }
}


export default chktoken