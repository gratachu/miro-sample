"use client"

import React, {useCallback, useState} from "react";

import {Camera, CanvasMode, CanvasState} from "@/types/canvas";

import { Info } from "@/app/board/[boardId]/_components/info";
import { Participants } from "@/app/board/[boardId]/_components/participants";
import { Toolbar } from "@/app/board/[boardId]/_components/toolbar";

import {useCanRedo, useCanUndo, useHistory, useMutation } from "@/liveblocks.config";
import {CursorsPresence} from "@/app/board/[boardId]/_components/cursors-presence";
import {pointerEventToCanvasPoint} from "@/lib/utils";

const MAX_LAYER = 100

interface CanvasProps {
  boardId: string;
}

export const Canvas = ({
  boardId
}: CanvasProps) => {
  const [canvasState, setCanvasState] = useState<CanvasState>({
    mode: CanvasMode.None
  })
  const [camera, setCamera] = useState<Camera>({ x: 0, y: 0})

  const history = useHistory()
  const canUndo = useCanUndo()
  const canRedo = useCanRedo()

  const onWheel = useCallback((e: React.WheelEvent) => {
    setCamera((camera) => ({
      x: camera.x - e.deltaX,
      y: camera.y - e.deltaY,
    }))
  }, [])

  const onPointerMove = useMutation(({ setMyPresence}, e: React.PointerEvent) => {
    e.preventDefault()

    const current = pointerEventToCanvasPoint(e, camera)

    setMyPresence({cursor: current})
  }, [])

  const onPointerLeave = useMutation(({
    setMyPresence
  }) => {
    setMyPresence({cursor: null})
  }, [])

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
      <svg
        className="h-[100vh] w-[100vw]"
        onWheel={onWheel}
        onPointerMove={onPointerMove}
        onPointerLeave={onPointerLeave}
      >
        <g
          style={{
            transform: `translate(${camera.x}px, ${camera.y}px)`
          }}
        >
          <CursorsPresence />
        </g>
      </svg>
    </main>
  )
}
