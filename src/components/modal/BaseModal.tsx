import { ModalState } from '@/types/modal/modal';
import { Dialog, DialogActions, DialogContent } from '@mui/material';
import ModalContent from './ModalContent';
import ModalActions from './ModalActions';

interface BaseModalProps {
  modal: ModalState;
  zIndex: number;
}

export default function BaseModal({ modal, zIndex }: BaseModalProps) {
  const { options, resolve, reject } = modal;

  const handleClose = () => {
    reject();
  };

  const handleConfirm = (value?: unknown) => {
    resolve(value);
  };

  return (
    <Dialog open={true} onClose={handleClose} sx={{ zIndex }}>
      <DialogContent>
        <ModalContent {...options} />
      </DialogContent>

      <DialogActions>
        <ModalActions
          {...options}
          onCancel={handleClose}
          onConfirm={handleConfirm}
        />
      </DialogActions>
    </Dialog>
  );
}
