import axios from "axios";
import { API_URL } from './config'
axios.defaults.baseURL = `${API_URL}`;

export const apiDataTtntest = async () => {
    try {
        return await axios.get('data/ttntest');
    } catch (error) {
        console.error('error : ', error)
    }
}