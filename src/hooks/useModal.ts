import {
  closeAllModalsAtom,
  closeModalAtom,
  openModalAtom,
} from '@/lib/modal/modalAtoms';
import { ModalOptions } from '@/types/modal/modal';
import { useSetAtom } from 'jotai';

export function useModal() {
  const openModal = useSetAtom(openModalAtom);
  const closeModal = useSetAtom(closeModalAtom);
  const closeAllModal = useSetAtom(closeAllModalsAtom);

  const open = <T = unknown>(options: ModalOptions): Promise<T> => {
    return openModal(options) as Promise<T>;
  };

  const confirm = (
    options: Omit<ModalOptions, 'content'>,
  ): Promise<boolean> => {
    return openModal({
      ...options,
      type: 'confirm',
      showCancel: true,
      confirmText: options.confirmText || '확인',
      cancelText: options.cancelText || '취소',
    }).then(
      (value) => value === true,
      () => false,
    );
  };

  const alert = (
    options: Omit<ModalOptions, 'content' | 'showCancel'>,
  ): Promise<void> => {
    return openModal({
      ...options,
      type: 'alert',
      showCancel: false,
      confirmText: options.confirmText || '확인',
    }).then(() => undefined);
  };

  const success = (
    options: Pick<ModalOptions, 'title' | 'description'>,
  ): Promise<void> => {
    return alert({
      ...options,
      type: 'success',
    });
  };

  const error = (
    options: Pick<ModalOptions, 'title' | 'description'>,
  ): Promise<void> => {
    return alert({
      ...options,
      type: 'error',
    });
  };

  const close = (id?: string) => {
    if (id) {
      closeModal({ id, value: undefined });
    }
  };

  const closeAll = () => {
    closeAllModals();
  };

  return {
    open,
    confirm,
    alert,
    success,
    error,
    close,
    closeAll,
  };
}
