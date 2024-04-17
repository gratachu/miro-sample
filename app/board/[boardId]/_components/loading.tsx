import { Loader } from "lucide-react";

import { InfoSkeleton} from "./info";
import { ParticipantsSkeleton } from "@/app/board/[boardId]/_components/participants";
import { ToolbarSkeleton } from "@/app/board/[boardId]/_components/toolbar";

export const Loading = () => {
  return (
    <main
      className="h-full w-full relative bg-neutral-50 touch-none flex items-center justify-center"
    >
      <Loader className="h-6 w-6 text-muted-foreground animate-spin" />
      <InfoSkeleton />
      <ParticipantsSkeleton />
      <ToolbarSkeleton />
    </main>
  )
}

export default Loading
