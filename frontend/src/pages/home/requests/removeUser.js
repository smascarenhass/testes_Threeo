import axios from 'axios';
import { APIURL } from "../../../env";

export const removeUser = async (token, userId) => {
  try {
    const response = await axios.delete(`${APIURL}/users/remove/${userId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json"
      }
    });
    return response.data;
  } catch (error) {
    console.error('Erro ao fazer a requisição:', error);
    return { status: false, message: 'Erro ao remover usuário' };
  }
};
