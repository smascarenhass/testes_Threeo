import { APIURL } from "../../../env";

import axios from 'axios';

export const loginUser = async (email, password) => {

    try {
        const response = await axios.post(`${APIURL}/login`, {
            name: 'null',
            email: email,
            password: password
        });
        return response.data
    } catch (error) {
        console.error('Erro ao fazer a requisição:', error);
        return { ok: false, data: null };
    }
};
