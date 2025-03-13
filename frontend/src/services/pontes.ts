import { api } from "./api";

export interface Ponte {
    id?: string; // ID pode ser opcional na criação
    nome: string;
    estado_conservacao: string;
    ultimo_reparo: string;
    trafego_medio_diario: number;
}

// Buscar todas as pontes
export const getPontes = async (): Promise<Ponte[]> => {
    const response = await api.get("/pontes");
    return response.data;
};

// Criar uma nova ponte
export const createPonte = async (ponte: Ponte): Promise<Ponte> => {
    const response = await api.post("/pontes", ponte);
    return response.data;
};

// Atualizar uma ponte existente
export const updatePonte = async (id: string, ponte: Ponte): Promise<Ponte> => {
    const response = await api.put(`/pontes/${id}`, ponte);
    return response.data;
};

// Deletar uma ponte
export const deletePonte = async (id: string): Promise<void> => {
    await api.delete(`/pontes/${id}`);
};
