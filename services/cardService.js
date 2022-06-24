import axios from 'axios';
    const baseUrl = 'http://kanban-app.test/api';

    export async function getCard(id) {
        let card = {};
        const response = await axios.get(`${baseUrl}/cards/${id}`);
        card = response.data;
        return card;
    }

    export async function createCard(payload) {
        const params = new URLSearchParams(payload).toString()
        const response = await axios.post(`${baseUrl}/cards?${params}`);
        return response;
    }

    export async function updateCard(id, payload) {
        const params = new URLSearchParams(payload).toString()
        const response = await axios.put(`${baseUrl}/cards/${id}?${params}`);
        return response;
    }

    export async function destroyCard(id) {
        const response = await axios.delete(`${baseUrl}/cards/${id}`);
        return response;
    }

    export async function moveCard(payload) {
        const params = new URLSearchParams(payload).toString()
        const response = await axios.put(`${baseUrl}/cards/move?${params}`);
        return response;
    }


  
