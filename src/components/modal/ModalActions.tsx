import { Button } from '@mui/material';

interface ModalActionsProps {
  confirmText?: string;
  cancelText?: string;
  showCancel?: boolean;
  onConfirm: (value?: unknown) => void;
  onCancel: () => void;
}

export default function ModalActions({
  confirmText = '확인',
  cancelText = '취소',
  showCancel = false,
  onConfirm,
  onCancel,
}: ModalActionsProps) {
  return (
    <>
      {showCancel && (
        <Button onClick={onCancel} color='inherit'>
          {cancelText}
        </Button>
      )}

      <Button onClick={() => onConfirm(true)} variant='contained'>
        {confirmText}
      </Button>
    </>
  );
}
