//FUNCIONES ÚTILES Y MISCELANEA.

//Url producción o local
const BASE_URL_LOCAL = 'http://127.0.0.1:8000';
const BASE_URL_PRODUCTION = 'https://backend.lacasadebella.es';

//Comprobación de campo vacío type text
const notEmpty = (inputValue) => {
    return /^\s*$/.test(inputValue) ? 'Campo vacio' : null;
};

//Comprobación de campo vacío type date
const notEmptyDate = (inputValue) =>{
    if(inputValue.length === 0){
        return 'Campo vacio';
    }
}



const checkField = (inputName, inputValue) => {

    switch (inputName) {

        case 'name':

            // eslint-disable-next-line
            if (! /^[a-zA-ZÀ-ÿ\u00f1\u00d1]+(\s*[a-zA-ZÀ-ÿ\u00f1\u00d1]*)*[a-zA-ZÀ-ÿ\u00f1\u00d1]+$/.test(inputValue)) {

                return "El nombre introducido solo puede contener letras" || notEmpty(inputValue);
            }

            break;

        case 'surname':

            // eslint-disable-next-line
            if (! /^[a-zA-ZÀ-ÿ\u00f1\u00d1]+(\s*[a-zA-ZÀ-ÿ\u00f1\u00d1]*)*[a-zA-ZÀ-ÿ\u00f1\u00d1]+$/.test(inputValue)) {

                return "El apellido introducido solo puede contener letras" || notEmpty(inputValue);
            }

            break;

        case 'title':

            // eslint-disable-next-line
            if (! /^[a-zA-ZÀ-ÿ\u00f1\u00d1]+(\s*[a-zA-ZÀ-ÿ\u00f1\u00d1]*)*[a-zA-ZÀ-ÿ\u00f1\u00d1]+$/.test(inputValue)) {

                return "El campo título solo puede contener letras" || notEmpty(inputValue);
            }

            break;

        case 'city':

            // eslint-disable-next-line
            if (! /^[a-zA-ZÀ-ÿ\u00f1\u00d1]+(\s*[a-zA-ZÀ-ÿ\u00f1\u00d1]*)*[a-zA-ZÀ-ÿ\u00f1\u00d1]+$/.test(inputValue)) {

                return "El campo ciudad solo puede contener letras" || notEmpty(inputValue);
            }

            break;

        case 'destination':

            // eslint-disable-next-line
            if (! /^[a-zA-ZÀ-ÿ\u00f1\u00d1]+(\s*[a-zA-ZÀ-ÿ\u00f1\u00d1]*)*[a-zA-ZÀ-ÿ\u00f1\u00d1]+$/.test(inputValue)) {

                return "El campo destino solo puede contener letras" || notEmpty(inputValue);
            }

            break;

        case 'username':

            // eslint-disable-next-line
            if (! /^[A-Za-z0-9_-]{6,10}$/.test(inputValue)) {

                return "Nombre de usuario debe tener entre 6 y 10 caracteres" || notEmpty(inputValue);
            }

            break;

        case 'birthday':
            function ageCalculator(bornDate) {
                let birthday = new Date(bornDate)
                let today = new Date();
                let age = today.getFullYear() - birthday.getFullYear();
                let month = today.getMonth() - birthday.getMonth();

                if (month < 0 || (month === 0 && today.getDate() < birthday.getDate())) {
                    age--;
                }
                return age;
            }
            let age = ageCalculator(inputValue);
            if (age < 18) {
                return "Debes de ser mayor de edad para poder registrarte" || notEmpty(inputValue);
            }

            break;

        case 'date':
            function testDate(date) {
                let today = new Date().setHours(0, 0, 0, 0);
                let formDate = new Date(date).setHours(0, 0, 0, 0);
                return (today - formDate);
            }
            testDate(inputValue);

            if (testDate(inputValue) >= 0) {
                return 'Debes indicar una fecha futura para tu viaje' || notEmptyDate(inputValue);
            };
            break;

        case 'dni':

            // eslint-disable-next-line
            if (! /^[0-9]{8,8}[A-Za-z]$/.test(inputValue)) {

                return "El dni introducido es incorrecto" || notEmpty(inputValue);
            }

            break;

        case 'telefono':

            // eslint-disable-next-line
            if (! /^[0-9]{9,11}$/.test(inputValue)) {

                return "El telefono introducido solo puede contener números" || notEmpty(inputValue);
            }

            break;

        case 'days':

            // eslint-disable-next-line
            if (! /^[0-9]{1,2}$/.test(inputValue)) {

                return "El campo días solo puede tener 2 dígitos" || notEmpty(inputValue);
            }

            break;

        case 'email':

            // eslint-disable-next-line
            if (! /^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/.test(inputValue)) {

                return "El email introducido no es correcto" || notEmpty(inputValue);
            }

            break;


        case 'password':

            // eslint-disable-next-line
            if (! /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/.test(inputValue)) {
                return "El password debe contener al menos 8 caracteres, mayúsculas, minúsculas, número y algún caracter especial" || notEmpty(inputValue);
            }

            break;

        default:

            break;


    }


};

const validateFields = (datosCheck) => {
    let results = {};

    for (let field in datosCheck) {
        results[field] = checkField(field, datosCheck[field]);
    }
    return results;
}

const isValid = (validationResults) => {
    for (const field in validationResults) {
        const error = validationResults[field];
        if (error) {
            return false;
        }
    }
    return true;
}

export { checkField, validateFields, isValid, BASE_URL_LOCAL };