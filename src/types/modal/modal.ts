import { ReactNode } from 'react';

export type ModalType = 'default' | 'comfirm' | 'alert' | 'success' | 'error';

export interface ModalOptions {
  title?: string;
  description?: string;
  content?: ReactNode;
  confirmText?: string;
  cancelText?: string;
  showCancel?: boolean;
  type?: ModalType;
}

export interface ModalState {
  id: string;
  options?: ModalOptions;
  resolve: (value?: unknown) => void;
  reject: (reason?: unknown) => void;
}
