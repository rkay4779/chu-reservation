import React from 'react';
import { Dialog } from '@headlessui/react';
import { Button } from '@/components/ui/button';

interface ConfirmDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  message: string;
}

export default function ConfirmDialog({ isOpen, onClose, onConfirm, message }: ConfirmDialogProps) {
  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-50">
      <div className="fixed inset-0 bg-black/30 backdrop-blur-sm" />
      <div className="fixed inset-0 flex items-center justify-center p-4">
      <Dialog.Panel className="bg-white dark:bg-black text-black dark:text-white p-6 rounded-xl shadow-xl max-w-sm w-full">
          <Dialog.Title className="text-lg font-semibold">Confirmation</Dialog.Title>
          <p className="mt-2">{message}</p>
          <div className="mt-4 flex justify-end gap-2">
            <Button variant="ghost" onClick={onClose}>Annuler</Button>
            <Button variant="destructive" onClick={onConfirm}>Confirmer</Button>
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
}
