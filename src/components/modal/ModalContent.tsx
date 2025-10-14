import { Box, Typography } from '@mui/material';
import { ReactNode } from 'react';

interface ModalContentProps {
  title?: string;
  description?: string;
  content?: ReactNode;
}

export default function ModalContent({
  title,
  description,
  content,
}: ModalContentProps) {
  return (
    <Box>
      {title && <Typography variant='h6'>{title}</Typography>}

      {description && (
        <Typography variant='body2' color='text.secondary'>
          {description}
        </Typography>
      )}

      {content}
    </Box>
  );
}
