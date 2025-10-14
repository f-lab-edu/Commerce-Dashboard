import { ModalState } from '@/types/modal/modal';
import { Dialog, DialogActions, DialogContent } from '@mui/material';
import ModalContent from './ModalContent';
import ModalActions from './ModalActions';
import { closeModalAtom } from '@/lib/modal/modalAtoms';
import { useSetAtom } from 'jotai';

interface BaseModalProps {
  modal: ModalState;
  zIndex: number;
}

export default function BaseModal({ modal, zIndex }: BaseModalProps) {
  const { id, options, resolve, reject } = modal;
  const closeModal = useSetAtom(closeModalAtom);

  const handleClose = () => {
    reject();
    closeModal({ id, value: undefined });
  };

  const handleConfirm = (value?: unknown) => {
    resolve(value);
    closeModal({ id, value });
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
