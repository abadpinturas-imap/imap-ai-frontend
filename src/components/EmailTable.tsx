
import {
  DataGrid,
  GridColDef,
} from '@mui/x-data-grid';

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
    { field: 'id', headerName: 'ID', width: 80 },
    { field: 'sender', headerName: 'Remitente', flex: 1 },
    { field: 'subject', headerName: 'Asunto', flex: 1 },
    { field: 'body', headerName: 'Contenido', flex: 2, sortable:false },
    { field: 'classification_code', headerName: 'Clasificación', flex: 1 },
    
    {
      field: 'received_at',
      headerName: 'Fecha',
      type: 'dateTime',
      width: 170,
      // v6: valueGetter(value, row)
      valueGetter: (_value, row) => {
        const v = row?.received_at;
        if (!v) return null;
        const d = new Date(v);
        return isNaN(d.getTime()) ? null : d; // devolvemos Date para que el grid lo trate como dateTime
      },
      // v6: valueFormatter(value, row)
      valueFormatter: (value) => {
        if (!value) return '';
        const d = value as Date; // viene del valueGetter
        return d.toLocaleString('es-ES', {
          day: '2-digit',
          month: '2-digit',
          year: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
          hour12: false,
        });
      },
    },


  ];

  return (
    <Box 
      sx={{
        width: "100%",
        overflowX: "auto",
        "& .MuiDataGrid-root": {
          minWidth: 900   // así no se aplastan columnas
        }
      }}
    >
      <DataGrid
        rows={emails}
        columns={columns}
        getRowId={(r) => r.id}
        onRowClick={(params) => onSelect(params.row)}
        disableRowSelectionOnClick
        sx={{
          '& .MuiDataGrid-columnHeaders': {
            backgroundColor: '#f1f5f9',   // slate-100
            fontWeight: '600',
            borderBottom: '1px solid #cbd5e1', // slate-300
          },
          '& .MuiDataGrid-row:nth-of-type(odd)': {
            backgroundColor: '#f8fafc',   // slate-50
          },
          '& .MuiDataGrid-row:hover': {
            backgroundColor: '#e2e8f0',   // slate-200
          },
        }}
      />
    </Box>
  );
}
