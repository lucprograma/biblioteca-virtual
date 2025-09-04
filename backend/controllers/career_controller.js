export const get_careers = async(req,res) =>{

    try{

        const careers = [ 
            {
                id:1,
                name:"PROFESORADO DE EDUCACIÓN INICIAL"
            },

            {
                id:2,
                name:"PROFESORADO DE EDUCACIÓN ESPECIAL CON ORIENTACIÓN EN DISCAPACIDAD INTELECTUAL"
            },

            {
                id:3,
                name:"PROFESORADO DE EDUCACIÓN SECUNDARIA EN PSICOLOGÍA"
            },

            {
                id:4,
                name:"PROFESORADO DE EDUCACIÓN SECUNDARIA EN CIENCIA POLÍTICA"
            },

            {
                id:5,
                name:"TECNICATURA SUPERIOR EN ADMINISTRACIÓN CON ORIENTACIÓN EN PEQUEÑAS Y MEDIANAS EMPRESAS"
            },


            {
                id:6,
                name:"TECNICATURA SUPERIOR EN ADMINISTRACIÓN PUBLICA"
            },

            {
                id:7,
                name:"TRABAJADOR/A SOCIAL"
            },

            {
                id:8,
                name:"TECNICATURA SUPERIOR EN ACOMPAÑAMIENTO TERAPÉUTICO"
            },

            {
                id:9,
                name:"ANALISTA EN SISTEMAS"
            },

        ] 
        
        res.status(200).json(careers);
        
    }catch(error){
        res.status(500).json({message:"Error al devolver las carreras"});
    }

}