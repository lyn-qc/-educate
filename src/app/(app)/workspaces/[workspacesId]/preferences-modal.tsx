import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { TrashIcon } from "lucide-react";
import { useState } from "react";
interface PrreferencesModalProps {
    open: boolean;
    setOpen: (open: boolean) => void;
    initialValue:string
}

export default function PreferencesModal({open, setOpen, initialValue}: PrreferencesModalProps) {
    const [value, setValue] = useState(initialValue)
    return(
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent className="p-0 bg-gray-50 overflow-hidden">
                <DialogHeader className="p-4 border-b bg-white">
                    <DialogTitle>{value}</DialogTitle>
                </DialogHeader>
                <div className="px-4 py-4 flex flex-col gap-y-2">
                    <div className="px-5 py-4 bg-white rounded-lg border cursor-pointer hover:bg-gray-50">
                        <div className="flex items-center justify-between">
                            <p className="text-sm font-semibold">   
                                worksapce name
                            </p>
                            <p className="text-sm font-semibold text-[#1264a3] hover:underline">   
                                Edit
                            </p>
                        </div>
                            <p className="text-sm">
                                {value}
                            </p>
                    </div>
                    <button 
                     disabled= {false}
                     onClick={()=>{}}
                     className="flex items-center gap-x-2 px-5 py-4 bg-white rounded-lg border cursor-pointer hover:bg-gray-50 text-rose-600"
                    >
                        <TrashIcon className="size-4"></TrashIcon>
                        <p className="text-sm font-semibold">
                            删除工作区
                        </p>
                    </button>
                </div>
            </DialogContent>
        </Dialog>
    )
}