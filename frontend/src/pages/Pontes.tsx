import { useEffect, useState } from "react";
import { getPontes, createPonte, updatePonte, deletePonte, Ponte } from "../services/pontes";
import { Container, Paper, Typography, TextField, MenuItem, Button, List, ListItem, ListItemText, IconButton, Box } from "@mui/material";
import { Edit as EditIcon, Delete as DeleteIcon } from "@mui/icons-material";

const Pontes = () => {
    const [pontes, setPontes] = useState<Ponte[]>([]);
    const [novaPonte, setNovaPonte] = useState<Ponte>({
        nome: "",
        estado_conservacao: "",
        ultimo_reparo: "",
        trafego_medio_diario: 0,
    });
    const [editandoPonte, setEditandoPonte] = useState<Ponte | null>(null);

    useEffect(() => {
        carregarPontes();
    }, []);

    const carregarPontes = async () => {
        const data = await getPontes();
        setPontes(data);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setNovaPonte((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (editandoPonte) {
            await updatePonte(editandoPonte.id!, novaPonte);
        } else {
            await createPonte(novaPonte);
        }

        setNovaPonte({ nome: "", estado_conservacao: "", ultimo_reparo: "", trafego_medio_diario: 0 });
        setEditandoPonte(null);
        carregarPontes();
    };

    const handleDelete = async (id: string) => {
        await deletePonte(id);
        carregarPontes();
    };

    const handleEdit = (ponte: Ponte) => {
        setEditandoPonte(ponte);
        setNovaPonte(ponte);
    };

    return (
        <Container maxWidth="md">
            <Paper elevation={3} sx={{ padding: 4, marginTop: 4 }}>
                <Typography variant="h4" gutterBottom>
                    Gerenciar Pontes
                </Typography>

                {/* Formulário de Cadastro */}
                <Box component="form" onSubmit={handleSubmit} sx={{ display: "flex", flexDirection: "column", gap: 2, marginBottom: 3 }}>
                    <TextField label="Nome" name="nome" value={novaPonte.nome} onChange={handleChange} fullWidth required />

                    <TextField select label="Estado de Conservação" name="estado_conservacao" value={novaPonte.estado_conservacao} onChange={handleChange} fullWidth required>
                        <MenuItem value="">Selecione</MenuItem>
                        <MenuItem value="Bom">Bom</MenuItem>
                        <MenuItem value="Regular">Regular</MenuItem>
                        <MenuItem value="Ruim">Ruim</MenuItem>
                    </TextField>

                    <TextField label="Último Reparo" type="date" name="ultimo_reparo" value={novaPonte.ultimo_reparo} onChange={handleChange} fullWidth required InputLabelProps={{ shrink: true }} />

                    <TextField label="Tráfego Médio Diário" type="number" name="trafego_medio_diario" value={novaPonte.trafego_medio_diario} onChange={handleChange} fullWidth required />

                    <Button type="submit" variant="contained" color="primary" fullWidth>
                        {editandoPonte ? "Atualizar Ponte" : "Adicionar Ponte"}
                    </Button>
                </Box>

                {/* Lista de Pontes */}
                <List>
                    {pontes.map((ponte) => (
                        <ListItem key={ponte.id} secondaryAction={
                            <>
                                <IconButton edge="end" aria-label="edit" onClick={() => handleEdit(ponte)}>
                                    <EditIcon />
                                </IconButton>
                                <IconButton edge="end" aria-label="delete" onClick={() => handleDelete(ponte.id!)}>
                                    <DeleteIcon />
                                </IconButton>
                            </>
                        }>
                            <ListItemText
                                primary={ponte.nome}
                                secondary={`Estado: ${ponte.estado_conservacao} | Último Reparo: ${ponte.ultimo_reparo} | Tráfego: ${ponte.trafego_medio_diario}`}
                            />
                        </ListItem>
                    ))}
                </List>
            </Paper>
        </Container>
    );
};

export default Pontes;
