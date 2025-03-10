"use client";
import {
    AlertDialog,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import useDialogModal from "@/hooks/useDialogModal";
import { Button } from "../ui/button";

export default function DialogModal() {
    const { open, onClose, title, description, disabled } = useDialogModal()
    return (
        <AlertDialog open={open}>
            <AlertDialogContent className='border-zinc-800 bg-[rgb(5,0,0)]'>
                <AlertDialogHeader>
                    <AlertDialogTitle className='text-red-600'>{title}</AlertDialogTitle>
                    <AlertDialogDescription className='text-red-600'>
                        {description}
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <Button type="button" size="sm" disabled={disabled} className="disabled:cursor-not-allowed disabled:opacity-80" variant={"destructive"} onClick={() => onClose(true)}>
                        Continue
                    </Button>
                    <Button type="button" size="sm" disabled={disabled} className="disabled:cursor-not-allowed disabled:opacity-80" variant={"outline-destructive"} onClick={() => onClose(false)}>
                        Cancel
                    </Button>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}
