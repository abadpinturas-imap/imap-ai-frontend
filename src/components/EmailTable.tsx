
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { Box } from '@mui/material';

interface Email {
  id: number;
  sender: string;
  subject: string;
  received_at: string;
  classification_code?: string;
}

interface Props {
  emails: Email[];
  onSelect: (email: Email) => void;
}

export default function EmailTable({ emails, onSelect }: Props) {
  const columns: GridColDef[] = [
    { field: 'sender', headerName: 'Remitente', flex: 1 },
    { field: 'subject', headerName: 'Asunto', flex: 1 },
    { field: 'classification_code', headerName: 'Clasificación', flex: 1 },
    { field: 'received_at', headerName: 'Fecha', flex: 0.6 },
  ];

  return (
    <Box height={500}>
      <DataGrid
        rows={emails}
        columns={columns}
        getRowId={(r) => r.id}
        onRowClick={(params) => onSelect(params.row)}
        disableRowSelectionOnClick
      />
    </Box>
  );
}
