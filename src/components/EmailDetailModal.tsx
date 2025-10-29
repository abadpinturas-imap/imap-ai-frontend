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
} from '@mui/material';
import { Email } from '../types';

interface Props {
  open: boolean;
  email?: Email;
  onClose: () => void;
}

export default function EmailDetailModal({ open, email, onClose }: Props) {
  if (!email) return null;

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="md">
      <DialogTitle>📧 Detalle del correo</DialogTitle>
      <DialogContent dividers>
        <Typography variant="subtitle1">
          <strong>Remitente:</strong> {email.sender}
        </Typography>
        <Typography variant="subtitle1">
          <strong>Asunto:</strong> {email.subject}
        </Typography>
        <Typography variant="subtitle2" color="text.secondary">
          {new Date(email.received_at).toLocaleString()}
        </Typography>

        <Divider sx={{ my: 2 }} />

        <Typography variant="body1" sx={{ whiteSpace: 'pre-wrap' }}>
          {email.body || 'Sin contenido disponible.'}
        </Typography>

        {email.attachments && email.attachments.length > 0 && (
          <>
            <Divider sx={{ my: 2 }} />
            <Typography variant="h6" mb={1}>
              📎 Adjuntos
            </Typography>
            <List dense>
              {email.attachments.map((file, i) => (
                <ListItem key={i}>
                  <ListItemText
                    primary={file.filename}
                    secondary={
                      <Button
                        href={file.url}
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
      <DialogActions>
        <Button onClick={onClose} variant="contained">
          Cerrar
        </Button>
      </DialogActions>
    </Dialog>
  );
}
