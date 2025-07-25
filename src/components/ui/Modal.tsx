'use client';

import React from 'react';
import Button from './Button';

/**
 * @interface ModalProps
 * @description Props for the Modal component.
 * @property {boolean} isOpen - Controls the visibility of the modal.
 * @property {() => void} onClose - Callback function when the modal is requested to close (e.g., by clicking backdrop or cancel).
 * @property {React.ReactNode} children - The content to display inside the modal.
 * @property {string} [title] - Optional title for the modal header.
 * @property {string} [confirmText='Confirm'] - Text for the confirm button.
 * @property {string} [cancelText='Cancel'] - Text for the cancel button.
 * @property {() => void} [onConfirm] - Callback function when the confirm button is clicked.
 * @property {boolean} [showButtons=true] - Whether to show the default confirm/cancel buttons.
 * @property {'primary' | 'danger'} [confirmButtonVariant='primary'] - Variant for the confirm button.
 */
interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  title?: string;
  confirmText?: string;
  cancelText?: string;
  onConfirm?: () => void;
  showButtons?: boolean;
  confirmButtonVariant?: 'primary' | 'danger';
}

/**
 * @function Modal
 * @description A customizable modal dialog component.
 * @param {ModalProps} props - The component props.
 */
export default function Modal({
  isOpen,
  onClose,
  children,
  title,
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  onConfirm,
  showButtons = true,
  confirmButtonVariant = 'primary',
}: ModalProps) {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-opacity-50 p-4"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-lg shadow-xl max-w-sm w-full p-6 relative transform transition-all scale-100 opacity-100"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby={title ? 'modal-title' : undefined}
      >

        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 text-2xl"
          aria-label="Close modal"
        >
          &times;
        </button>

        {title && (
          <h3 id="modal-title" className="text-2xl font-bold text-gray-900 mb-4 pr-8">
            {title}
          </h3>
        )}

        <div className="text-gray-700 mb-6">
          {children}
        </div>

        {showButtons && (
          <div className="flex justify-end space-x-3">
            <Button variant="secondary" onClick={onClose}>
              {cancelText}
            </Button>
            <Button
              variant={confirmButtonVariant}
              onClick={onConfirm}
              disabled={!onConfirm} 
            >
              {confirmText}
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
