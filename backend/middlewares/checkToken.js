import jwt from 'jsonwebtoken';

const chktoken = async (req,res,next) =>{
    if(req.headers.authorization){
        const token = req.headers.authorization.split(" ")[1];
        console.log(token)
        jwt.verify(token,process.env.JWT_SECRET,(err,result)=>{
            if(err){res.status(403).send(err.message)}
            if(result){next()}
        })
    }else{
        return res.status(403).send('ERROR EN LA AUTENTICACION 2')
    }
}


export default chktoken