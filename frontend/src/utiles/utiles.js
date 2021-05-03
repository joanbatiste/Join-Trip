//FUNCIONES ÚTILES Y MISCELANEA.

const checkError = (datosCheck) => {
    

    for(let field in datosCheck){


        switch(field) {

            case 'name' : 

                // eslint-disable-next-line
                if(! /^[a-zA-ZÀ-ÿ\u00f1\u00d1]+(\s*[a-zA-ZÀ-ÿ\u00f1\u00d1]*)*[a-zA-ZÀ-ÿ\u00f1\u00d1]+$/.test(datosCheck[field])){

                    return "El nombre introducido solo puede contener letras";
                }

            break;

            case 'surname' : 

                // eslint-disable-next-line
                if(! /^[a-zA-ZÀ-ÿ\u00f1\u00d1]+(\s*[a-zA-ZÀ-ÿ\u00f1\u00d1]*)*[a-zA-ZÀ-ÿ\u00f1\u00d1]+$/.test(datosCheck[field])){

                    return "El apellido introducido solo puede contener letras";
                }

            break;

            case 'city' : 

                // eslint-disable-next-line
                if(! /^[a-zA-ZÀ-ÿ\u00f1\u00d1]+(\s*[a-zA-ZÀ-ÿ\u00f1\u00d1]*)*[a-zA-ZÀ-ÿ\u00f1\u00d1]+$/.test(datosCheck[field])){

                    return "El campo ciudad solo puede contener letras";
                }

            break;

            case 'username' : 

                // eslint-disable-next-line
                if(! /^[A-Za-z0-9_-]{6,10}$/.test(datosCheck[field])){

                    return "Nombre de usuario debe tener entre 6 y 10 caracteres";
                }

            break;

            case 'birthday' :
                function ageCalculator(bornDate){
                    let birthday = new Date(bornDate) 
                    let today = new Date();
                    let age = today.getFullYear() - birthday.getFullYear();
                    let month = today.getMonth() - birthday.getMonth();

                    if (month < 0 || (month === 0 && today.getDate() < birthday.getDate())){
                    age--;
                    }
                    return age;
                }
                let age = ageCalculator(datosCheck[field]);
                if(age < 18){
                    return "Debes de ser mayor de edad para poder registrarte"
                }
                
            break;    

            case 'dni' : 

                // eslint-disable-next-line
                if(! /^[0-9]{8,8}[A-Za-z]$/.test(datosCheck[field])){

                    return "El dni introducido es incorrecto";
                }

            break;

            case 'telefono' : 

                // eslint-disable-next-line
                if(! /^[0-9]{9,11}$/.test(datosCheck[field])){

                    return "El telefono introducido solo puede contener números";
                }

            break;

            case 'email' :
                
                // eslint-disable-next-line
                if(! /^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/.test(datosCheck[field]) ){
                    
                    return "El email introducido no es correcto";
                }

            break;


            case 'password' :

                // eslint-disable-next-line
                if(! /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/.test(datosCheck[field])){
                    return "El password debe contener al menos 8 caracteres, mayúsculas, minúsculas, número y algún caracter especial";
                }
                
            break;

            default: 

            break;


        }
    }

};

export default checkError;