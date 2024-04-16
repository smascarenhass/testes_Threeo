import { APIURL } from "../../../env";
import axios from 'axios';

export const getAllUsers = async (token) => {
    try {
        const response = await axios.get(
            `${APIURL}/users`,
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        );

        return response.data;
    } catch (error) {
        console.error('Erro ao fazer a requisição:', error);
        return { ok: false, data: null };
    }
};
