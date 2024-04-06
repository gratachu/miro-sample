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
import {FormEvent, FormEventHandler, useEffect, useState} from "react";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {useApiMutation} from "@/hooks/use-api-mutation";
import {api} from "@/convex/_generated/api";
import {toast} from "sonner";

export const RenameModal = () => {
  const { mutate, pending } = useApiMutation(api.board.update)
  const {
    isOpen,
    initialValues,
    onClose
  } = useRenameModal((state) => state)

  const [title, setTitle] = useState(initialValues.title)
  useEffect(() => {
    setTitle(initialValues.title)
  }, [initialValues])

  const onSubmit: FormEventHandler<HTMLFormElement> = (
    e
  ) => {
    e.preventDefault()

    try {
      mutate({
        id: initialValues.id,
        title
      })
      toast.success("Board title updated")
      onClose()
    } catch (e) {
     toast.error("Failed to update board title")
    }
  }

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
        <form onSubmit={onSubmit} className="space-y-4">
          <Input
            disabled={pending}
            required
            maxLength={60}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Board title"
          />
          <DialogFooter>
            <DialogClose>
              <Button type="button" variant="outline">
                Cancel
              </Button>
            </DialogClose>
            <Button disabled={pending} type="submit">
              Save
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
