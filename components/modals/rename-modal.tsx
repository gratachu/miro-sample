"use client"

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogFooter,
  DialogClose,
  DialogTitle
} from "@/components/ui/dialog"
import {useRenameModal} from "@/store/use-rename-modal";

export const RenameModal = () => {
  const {
    isOpen,
    initialValues,
    onClose
  } = useRenameModal()

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            Edit board title
          </DialogTitle>
        </DialogHeader>

        <DialogDescription>
          Enter a new title for this board
        </DialogDescription>
      </DialogContent>

    </Dialog>
  )
}
