'use client';

import { useRouter } from 'next/navigation';
import { deleteProductDB } from '@/lib/indexeddb';
import Modal from '@/components/ui/Modal';
import { useState } from 'react';
import Button from './ui/Button';

export default function DeleteProductButton({ slug }: { slug: string }) {
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  /**
   * @function handleInitiateDelete
   * @description Opens the confirmation modal.
   */
  const handleInitiateDelete = () => {
    setIsModalOpen(true);
  };

  /**
   * @function handleConfirmDelete
   * @description Handles the actual product deletion after confirmation.
   */
  const handleConfirmDelete = async () => {
    setIsDeleting(true);
    setIsModalOpen(false);

    try {
      console.log('Deleting product with ID:', slug);
      await deleteProductDB(slug);
      console.log('Product deleted successfully!');
      router.push('/'); // Navigate back to the home page
    } catch (error) {
      console.error('Error deleting product:', error);
      alert('Failed to delete product. Please try again.');
    } finally {
      setIsDeleting(false); // Reset deleting state
    }
  };

  /**
 * @function handleCancelDelete
 * @description Closes the confirmation modal without deleting.
 */
  const handleCancelDelete = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <Button
        disabled={isDeleting}
        onClick={handleInitiateDelete}
        variant="danger"
        className=""
        size='small'

      >
        {isDeleting ? 'Deleting...' : 'Delete Product'}
      </Button>
      <Modal
        isOpen={isModalOpen}
        onClose={handleCancelDelete}
        title="Confirm Deletion"
        confirmText="Delete"
        cancelText="Cancel"
        onConfirm={handleConfirmDelete}
        confirmButtonVariant="danger"
      >
        <p>Are you sure you want to delete this product?</p>
        <p className="mt-2 text-sm text-gray-500">This action cannot be undone.</p>
      </Modal>

    </>

  );
}
