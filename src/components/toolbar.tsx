import { MessageSquareTextIcon, Pencil, Smile, Trash } from "lucide-react";
import { Button } from "./ui/button";
import { Hint } from "./hint";
import EmojiPopover from "./emoji-popover";

interface ToolbarProps {
  isAuthor: boolean;
  isPending:boolean;
  handleEdit: () => void;
  handleThread: () => void;
  handleDelete: () => void;
  handleReaction:(value:string) => void;
  hideThreadButton?:boolean;
}

export default function Toolbar({isAuthor, isPending, handleEdit, handleThread, handleDelete, handleReaction
, hideThreadButton}: ToolbarProps) {

  return (
    <div className="absolute top-0 right-5">
        <div className="group-hover:opacity-100 opacity-0 transition-opacity border bg-white rounded-md shadow-sm">
          <EmojiPopover hint='emoji' onEmojiSelect={(enmoji)=>{}}>
          <Button
           variant="ghost"
           size="sm"
           disabled={isPending}
          >
            <Smile className="size-4"></Smile>
          </Button>
          </EmojiPopover>
         {
            !hideThreadButton && (
                <Hint label="回复">
                <Button
                   variant="ghost"
                   size="sm"
                   disabled={isPending}
                   onClick={handleThread}
                  >
                    <MessageSquareTextIcon className="size-4"></MessageSquareTextIcon>
                  </Button>
                </Hint>
            )
         }
         {/* {
            isAuthor && (
                <Hint label="编辑">
                <Button
                   variant="ghost"
                   size="sm"
                   disabled={isPending}
                   onClick={handleEdit}
                  >
                    <Pencil className="size-4"></Pencil>
                  </Button>
                </Hint>
            )
         } */}
        {
            isAuthor && (
            <Hint label="删除">
                <Button
                    variant="ghost"
                    size="sm"
                    disabled={isPending}
                    onClick={handleDelete}
                >
                    <Trash className="size-4"></Trash>
                </Button>
            </Hint>
            )
            
        }
        
        </div>
    </div>
  )
}


