"use client"

import { useState } from "react";

import {CanvasMode, CanvasState} from "@/types/canvas";

import { Info } from "@/app/board/[boardId]/_components/info";
import { Participants } from "@/app/board/[boardId]/_components/participants";
import { Toolbar } from "@/app/board/[boardId]/_components/toolbar";

import {useCanRedo, useCanUndo, useHistory, useSelf, useUndo} from "@/liveblocks.config";

interface CanvasProps {
  boardId: string;
}

export const Canvas = ({
  boardId
}: CanvasProps) => {
  const [canvasState, setCanvasState] = useState<CanvasState>({
    mode: CanvasMode.None
  })

  const history = useHistory()
  const canUndo = useCanUndo()
  const canRedo = useCanRedo()

  return (
    <main
      className="h-full w-full relative bg-neutral-50 touch-none"
    >
      <Info boardId={boardId}/>
      <Participants />
      <Toolbar
        canvasState={canvasState}
        setCanvasState={setCanvasState}
        undo={history.undo}
        redo={history.redo}
        canUndo={canUndo}
        canRedo={canRedo}
      />
    </main>
  )
}
