import { atom } from 'jotai';
import { ModalOptions, ModalState } from '@/types/modal/modal';

export const modalsAtom = atom<ModalState[]>([]);

export const openModalAtom = atom(null, (get, set, options: ModalOptions) => {
  return new Promise<unknown>((resolve, reject) => {
    const id = crypto.randomUUID();
    const currentModals = get(modalsAtom);

    const newModal: ModalState = {
      id,
      options,
      resolve,
      reject,
    };

    set(modalsAtom, [...currentModals, newModal]);
  });
});

export const closeModalAtom = atom(
  null,
  (get, set, payload: { id: string; value?: unknown }) => {
    const modals = get(modalsAtom);

    const modal = modals.find((m) => m.id === payload.id);

    if (modal) {
      modal.resolve(payload.value);

      set(
        modalsAtom,
        modals.filter((m) => m.id !== payload.id),
      );
    }
  },
);

export const closeAllModalsAtom = atom(null, (get, set) => {
  const modals = get(modalsAtom);

  modals.forEach((modal) => {
    modal.reject(new Error('All modals closed'));
  });

  set(modalsAtom, []);
});
