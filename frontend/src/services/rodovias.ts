import { api } from "./api";

export interface Rodovia {
    id?: string;  // ID opcional para permitir criação sem enviar um ID
    nome: string;
    estado_conservacao: string;
    ultimo_reparo: string;
    trafego_medio_diario: number;
}

// Buscar todas as rodovias
export const getRodovias = async (): Promise<Rodovia[]> => {
    const response = await api.get("/rodovias");
    return response.data;
};

// Criar uma nova rodovia
export const createRodovia = async (rodovia: Omit<Rodovia, "id">): Promise<Rodovia> => {
    const response = await api.post("/rodovias", rodovia);
    return response.data;
};

// Atualizar uma rodovia existente
export const updateRodovia = async (id: string, rodovia: Omit<Rodovia, "id">): Promise<Rodovia> => {
    const response = await api.put(`/rodovias/${id}`, rodovia);
    return response.data;
};

// Deletar uma rodovia
export const deleteRodovia = async (id: string): Promise<void> => {
    await api.delete(`/rodovias/${id}`);
};
