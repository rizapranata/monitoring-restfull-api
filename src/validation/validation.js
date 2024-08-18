import { ResponseError } from "../error/response-error.js";

const validate = (schema, request) => {
    const result = schema.validate(request, {
        abortEarly: false,
        allowUnknown: false //auto reject jika ada field yg tidak diketahui
    });
    if (result.error) {
        console.log("error validate:", result.error);
        throw new ResponseError(400, result.error.message);
    }else{
        return result.value;
    }
}

export {
    validate // --> dipakai di service
}