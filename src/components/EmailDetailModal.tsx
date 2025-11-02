import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  Button,
  List,
  ListItem,
  ListItemText,
  Divider,
  Stack,
} from '@mui/material';
import { Email, Attachment } from '../types';
import { useEffect, useState } from 'react';
import { getAttachmentsByEmail } from '../services/emailService';

interface Props {
  open: boolean;
  email: Email | null;   // <<< aquí
  onClose: () => void;
}

export default function EmailDetailModal({ open, email, onClose }: Props) {
  const [attachments, setAttachments] = useState<Attachment[]>([]);

  useEffect(() => {
    if (email) {
      getAttachmentsByEmail(email.id).then((rows) => {
        console.log("ATTACHMENTS:", rows);
        setAttachments(rows);
      })
    }
  }, [email])

  if (!email) return null;

  return (
    <Dialog 
      open={open} 
      onClose={onClose} 
      fullWidth maxWidth="md"
      PaperProps={{
        sx:{
          borderRadius: 3,
          border: '1px solid #e2e8f0'
        }
      }}
      >
      <DialogTitle
        sx={{
          fontWeight: 700,
          bgcolor: '#f8fafc',
          borderBottom: '1px solid #e2e8f0',
          py:1.5
        }}      
      >
        📧 Detalle del correo
      </DialogTitle>
      <DialogContent  dividers sx={{ bgcolor:'#fff', py:3 }}>
        <Stack spacing={1.2}>
          <Typography variant="subtitle1">
            <strong>Remitente:</strong> {email.sender}
          </Typography>
          <Typography variant="subtitle1">
            <strong>Asunto:</strong> {email.subject}
          </Typography>
          <Typography variant="subtitle2" color="text.secondary">
            {new Date(email.received_at).toLocaleString()}
          </Typography>
        </Stack>


        <Divider sx={{ my: 2 }} />

        <Typography variant="body1" sx={{ whiteSpace:'pre-wrap', lineHeight:1.45 }}>
          {email.body || 'Sin contenido disponible.'}
        </Typography>

        {attachments.length > 0 && (
          <>
            <Divider sx={{ my: 2 }} />
            <Typography variant="subtitle1" sx={{fontWeight:600, mb:1}}>
              📎 Adjuntos
            </Typography>
            <List dense>
              {attachments.map((att, i) => (
                <ListItem key={i} sx={{py:0.5}}>
                  <ListItemText
                    primary={att.file_name}
                    secondary={
                      <Button
                        href={att.file_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        size="small"
                      >
                        Descargar
                      </Button>
                    }
                  />
                </ListItem>
              ))}
            </List>
          </>
        )}
      </DialogContent>
      <DialogActions  sx={{ bgcolor:'#f8fafc', borderTop:'1px solid #e2e8f0', py:1.5 }}>
        <Button onClick={onClose} variant="contained" disableElevation>
          Cerrar
        </Button>
      </DialogActions>
    </Dialog>
  );
}
