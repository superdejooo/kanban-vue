import axios from 'axios';
const baseUrl = 'https://dejannjezic.com/kanban/public/api';

    export async function getColumns() {
        let columns = [];
        const response = await axios.get(`${baseUrl}/columns`);
        columns = response.data;
        return columns;
    }

    export async function createColumn(payload) {
        const params = new URLSearchParams(payload).toString()
        const response = await axios.post(`${baseUrl}/columns?${params}`);
        return response;
    }

    export async function destroyColumn(id) {
        const response = await axios.delete(`${baseUrl}/columns/${id}`);
        return response;
    }

