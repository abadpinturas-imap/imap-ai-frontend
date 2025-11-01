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

  useEffect(() => {
    dispatch(fetchEmails({ category, startDate, endDate }));
  }, [dispatch, category, startDate, endDate]);

  if (loading) return <CircularProgress />;
  if (error) return <Typography color="error">{error}</Typography>;

  return (
    <Box p={2}>
      <Typography variant="h5" mb={2}>
        📬 Correos Procesados
      </Typography>

      {/* Filtros */}
      <Stack
        direction={{ xs: 'column', sm: 'row' }}
        spacing={2}
        mb={2}
        alignItems="center"
      >
        <TextField
          label="Categoría"
          select
          size="small"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          sx={{ width: 200 }}
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
        />
        <TextField
          label="Hasta"
          type="date"
          size="small"
          InputLabelProps={{ shrink: true }}
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
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

      {/* Tabla */}
      <EmailTable
        emails={data}
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
