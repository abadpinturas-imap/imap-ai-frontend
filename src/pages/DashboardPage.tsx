import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchEmails, selectEmail } from '../store/emailSlice';
import { RootState, AppDispatch } from '../store';
import { Box, CircularProgress, Typography } from '@mui/material';
import EmailTable from '../components/EmailTable';

export default function DashboardPage() {
  const dispatch = useDispatch<AppDispatch>();
  const { data, loading, error } = useSelector((state: RootState) => state.emails);

  useEffect(() => {
    dispatch(fetchEmails());
  }, [dispatch]);

  if (loading) return <CircularProgress />;
  if (error) return <Typography color="error">{error}</Typography>;

  return (
    <Box p={2}>
      <Typography variant="h5" mb={2}>📬 Correos Procesados</Typography>
      <EmailTable emails={data} onSelect={(email) => dispatch(selectEmail(email))} />
    </Box>
  );
}
