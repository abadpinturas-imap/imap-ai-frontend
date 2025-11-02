import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchEmails, selectEmail } from '../store/emailSlice';
import { RootState, AppDispatch } from '../store';
import {
  Box,
  CircularProgress,
  Typography,
  TextField,
  MenuItem,
  Stack,
  Button,
  Paper
} from '@mui/material';

import EmailTable from '../components/EmailTable';
import EmailDetailModal from '../components/EmailDetailModal';

export default function DashboardPage() {
  const dispatch = useDispatch<AppDispatch>();
  const { data, loading, error, selectedEmail } = useSelector(
    (state: RootState) => state.emails
  );

  // Filtros
  const [category, setCategory] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    dispatch(fetchEmails({ category, startDate, endDate }));
  }, [dispatch, category, startDate, endDate]);

  if (loading) return <CircularProgress />;
  if (error) return <Typography color="error">{error}</Typography>;

  const filtered = data.filter((e) => {
    const t = searchText.toLowerCase();
    return (
      (e.sender || '').toLowerCase().includes(t) ||
      (e.subject || '').toLowerCase().includes(t) ||
      (e.body || '').toLowerCase().includes(t)
    );
  });

  return (
    <Box sx={{ p: 2 }}>
      <Typography 
        variant="h5" 
        sx={{ 
          mb: 2, 
          fontWeight: 600, 
          color: '#1e293b' 
        }}>
        📬 Correos Procesados
      </Typography>

      <Typography 
        variant="body2" 
        sx={{ 
          mb: 3, 
          color: 'text.secondary' 
        }}>
        Panel de análisis y clasificación automática de emails entrantes
      </Typography>      

      {/* Filtros */}
      <Paper 
        elevation={1}
        sx={{
          p: 2,
          mb: 2,
          borderRadius: 2,
          display: 'flex',
          flexWrap: 'wrap',
          gap: 2,
          alignItems: 'center'
        }}
        >
        <Stack
          direction={{ xs: 'column', sm: 'row' }}
          spacing={2}
          width="100%"
          sx={{
            alignItems: { xs: "stretch", md: "center" },
            "& .MuiTextField-root": {
              width: { xs: "100%", md: "auto" }
            }
          }}
        >
          <TextField
            label="Categoría"
            select
            size="small"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            sx={{
              width: 200,
              '& .MuiOutlinedInput-root': {
                borderRadius: '10px',
                backgroundColor: '#f8fafc', // slate-50
              },
              '& fieldset': {
                borderColor: '#cbd5e1',     // slate-300
              },
            }}
          >
            <MenuItem value="">Todas</MenuItem>
            <MenuItem value="CLIENTES">Clientes</MenuItem>
            <MenuItem value="PROVEEDORES">Proveedores</MenuItem>
            <MenuItem value="BANCOS">Bancos</MenuItem>
            <MenuItem value="VARIOS">Varios</MenuItem>
          </TextField>

          <TextField
            label="Desde"
            type="date"
            size="small"
            InputLabelProps={{ shrink: true }}
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            sx={{
              width:140,
              '& .MuiOutlinedInput-root': {
                borderRadius: '10px',
                backgroundColor: '#f8fafc',
              },
              '& fieldset': {
                borderColor: '#cbd5e1',
              },
            }}            
          />
          <TextField
            label="Hasta"
            type="date"
            size="small"
            InputLabelProps={{ shrink: true }}
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            sx={{
              width:140,
              '& .MuiOutlinedInput-root': {
                borderRadius: '10px',
                backgroundColor: '#f8fafc',
              },
              '& fieldset': {
                borderColor: '#cbd5e1',
              },
            }}            
          />

          {/* >>> NUEVO input de búsqueda */}
          <TextField
            label="Buscar texto"
            size="small"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            sx={{ width: 200 }}
          />      

          <Button
            variant="outlined"
            onClick={() => {
              setCategory('');
              setStartDate('');
              setEndDate('');
            }}
          >
            Limpiar
          </Button>
        </Stack>
      </Paper>


      {/* Tabla */}
      <EmailTable
        emails={filtered}
        onSelect={(email) => dispatch(selectEmail(email))}
      />

      {/* Modal de detalle */}
      <EmailDetailModal
        open={Boolean(selectedEmail)}
        email={selectedEmail}
        onClose={() => dispatch(selectEmail(null))}
      />
    </Box>
  );
}
