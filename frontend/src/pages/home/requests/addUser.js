import axios from 'axios';
import { APIURL } from '../../../env';

export const addUser = async (token, name, email, password) => {
    try {
        const response = await axios.post(
            `${APIURL}/users/add_user`,
            {
                name: name,
                email: email,
                password: password
            },
            {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                    'accept': 'application/json'
                }
            }
        );
        return response.data;
    } catch (error) {
        console.error('Erro ao adicionar usuário:', error);
        return { status: false, message: 'Erro ao adicionar usuário' };
    }
};
