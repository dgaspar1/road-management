import { Container, Paper, Typography, Button, Box } from "@mui/material";
import { Link } from "react-router-dom";

const Home = () => {
    return (
        <Container maxWidth="md">
            <Paper elevation={3} sx={{ padding: 6, marginTop: 4, textAlign: "center" }}>
                <Typography variant="h3" gutterBottom>
                    Gestão de Infraestrutura Rodoviária
                </Typography>
                <Typography variant="body1" color="textSecondary" paragraph>
                    Bem-vindo ao sistema de gestão de rodovias e pontes. Aqui você pode visualizar, cadastrar, atualizar e remover informações sobre rodovias e pontes de maneira prática e eficiente.
                </Typography>

                {/* Botões de navegação */}
                <Box sx={{ display: "flex", justifyContent: "center", gap: 2, marginTop: 3 }}>
                    <Button component={Link} to="/rodovias" variant="contained" color="primary" size="large">
                        Gerenciar Rodovias
                    </Button>
                    <Button component={Link} to="/pontes" variant="contained" color="secondary" size="large">
                        Gerenciar Pontes
                    </Button>
                </Box>
            </Paper>
        </Container>
    );
};

export default Home;
