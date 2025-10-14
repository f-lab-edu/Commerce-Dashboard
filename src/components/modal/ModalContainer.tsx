import { modalsAtom } from '@/lib/modal/modalAtoms';
import { useAtomValue } from 'jotai';
import { createPortal } from 'react-dom';
import BaseModal from './BaseModal';

export function ModalContainer() {
  const modals = useAtomValue(modalsAtom);

  if (modals.length === 0) return null;

  return createPortal(
    <>
      {modals.map((modal, index) => (
        <BaseModal key={modal.id} modal={modal} zIndex={1300 + index * 10} />
      ))}
    </>,
    document.body,
  );
}
