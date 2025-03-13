import { useEffect, useState } from "react";
import { getRodovias, createRodovia, updateRodovia, deleteRodovia, Rodovia } from "../services/rodovias";
import { Container, Paper, Typography, TextField, MenuItem, Button, List, ListItem, ListItemText, IconButton, Box } from "@mui/material";
import { Edit as EditIcon, Delete as DeleteIcon } from "@mui/icons-material";

const Rodovias = () => {
    const [rodovias, setRodovias] = useState<Rodovia[]>([]);
    const [novaRodovia, setNovaRodovia] = useState<Rodovia>({
        nome: "",
        estado_conservacao: "",
        ultimo_reparo: "",
        trafego_medio_diario: 0,
    });
    const [editandoRodovia, setEditandoRodovia] = useState<Rodovia | null>(null);

    useEffect(() => {
        carregarRodovias();
    }, []);

    const carregarRodovias = async () => {
        const data = await getRodovias();
        setRodovias(data);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setNovaRodovia((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (editandoRodovia) {
            await updateRodovia(editandoRodovia.id!, novaRodovia);
        } else {
            await createRodovia(novaRodovia);
        }

        setNovaRodovia({ nome: "", estado_conservacao: "", ultimo_reparo: "", trafego_medio_diario: 0 });
        setEditandoRodovia(null);
        carregarRodovias();
    };

    const handleDelete = async (id: string) => {
        await deleteRodovia(id);
        carregarRodovias();
    };

    const handleEdit = (rodovia: Rodovia) => {
        setEditandoRodovia(rodovia);
        setNovaRodovia(rodovia);
    };

    return (
        <Container maxWidth="md">
            <Paper elevation={3} sx={{ padding: 4, marginTop: 4 }}>
                <Typography variant="h4" gutterBottom>
                    Gerenciar Rodovias
                </Typography>

                {/* Formulário de Cadastro */}
                <Box component="form" onSubmit={handleSubmit} sx={{ display: "flex", flexDirection: "column", gap: 2, marginBottom: 3 }}>
                    <TextField label="Nome" name="nome" value={novaRodovia.nome} onChange={handleChange} fullWidth required />

                    <TextField select label="Estado de Conservação" name="estado_conservacao" value={novaRodovia.estado_conservacao} onChange={handleChange} fullWidth required>
                        <MenuItem value="">Selecione</MenuItem>
                        <MenuItem value="Bom">Bom</MenuItem>
                        <MenuItem value="Regular">Regular</MenuItem>
                        <MenuItem value="Ruim">Ruim</MenuItem>
                    </TextField>

                    <TextField label="Último Reparo" type="date" name="ultimo_reparo" value={novaRodovia.ultimo_reparo} onChange={handleChange} fullWidth required InputLabelProps={{ shrink: true }} />

                    <TextField label="Tráfego Médio Diário" type="number" name="trafego_medio_diario" value={novaRodovia.trafego_medio_diario} onChange={handleChange} fullWidth required />

                    <Button type="submit" variant="contained" color="primary" fullWidth>
                        {editandoRodovia ? "Atualizar Rodovia" : "Adicionar Rodovia"}
                    </Button>
                </Box>

                {/* Lista de Rodovias */}
                <List>
                    {rodovias.map((rodovia) => (
                        <ListItem key={rodovia.id} secondaryAction={
                            <>
                                <IconButton edge="end" aria-label="edit" onClick={() => handleEdit(rodovia)}>
                                    <EditIcon />
                                </IconButton>
                                <IconButton edge="end" aria-label="delete" onClick={() => handleDelete(rodovia.id!)}>
                                    <DeleteIcon />
                                </IconButton>
                            </>
                        }>
                            <ListItemText
                                primary={rodovia.nome}
                                secondary={`Estado: ${rodovia.estado_conservacao} | Último Reparo: ${rodovia.ultimo_reparo} | Tráfego: ${rodovia.trafego_medio_diario}`}
                            />
                        </ListItem>
                    ))}
                </List>
            </Paper>
        </Container>
    );
};

export default Rodovias;
