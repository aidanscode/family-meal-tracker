import { Doc } from "@/convex/_generated/dataModel";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import ContextIcon from "@/components/icons/context";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { formatTimestamp } from "../_utils/date";
import { Button } from "@/components/ui/button";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useCallback, useState } from "react";
import DatePicker from "@/components/ui/date-picker";

export default function Meal({ meal }: { meal: Doc<"meals"> }) {
  const [isChangeDateDialogOpen, setIsChangeDateDialogOpen] = useState(false);
  const [newManualDate, setNewManualDate] = useState<Date>();

  const reuseMeal = useMutation(api.meals.reuse);
  const removeMeal = useMutation(api.meals.remove);
  const overrideMealDate = useMutation(api.meals.setDate);

  const setLatest = useCallback(async () => {
    await reuseMeal({ meal: meal._id });
  }, []);

  const deleteMeal = useCallback(async () => {
    await removeMeal({ meal: meal._id });
  }, []);

  const handleSetManualDate = useCallback(async () => {
    if (newManualDate) {
      await overrideMealDate({
        meal: meal._id,
        lastUsed: newManualDate.getTime(),
      });

      setNewManualDate(undefined);
      setIsChangeDateDialogOpen(false);
    }
  }, [newManualDate]);

  return (
    <div className="border border-gray-400 flex flex-row justify-between items-center px-3 py-1">
      <div className="flex flex-col">
        <span className="text-xl font-bold">{meal.title}</span>
        <span className="text-xs font-semibold">
          {formatTimestamp(meal.lastUsed)}
        </span>
      </div>
      <div className="flex flex-row items-center">
        <Button onClick={setLatest}>Set Latest</Button>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon">
              <ContextIcon />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem onClick={() => setIsChangeDateDialogOpen(true)}>
              Change Date
            </DropdownMenuItem>
            <DropdownMenuItem onClick={deleteMeal}>Remove</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <Dialog
        open={isChangeDateDialogOpen}
        onOpenChange={(open) => setIsChangeDateDialogOpen(open)}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{meal.title}</DialogTitle>
            <DialogDescription>Override meal date</DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSetManualDate}>
            <DatePicker value={newManualDate} onChange={setNewManualDate} />
          </form>
          <DialogFooter>
            <DialogClose asChild>
              <Button>Cancel</Button>
            </DialogClose>
            <Button disabled={!newManualDate} onClick={handleSetManualDate}>
              Submit
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
