"use client"

interface LayerPreviewProps {
  id: string;
  onLayerPointerDown: () => void; // TODO: Fix types
  selectionColor?: string;
}

export const LayerPreview = ({
  id,
  onLayerPointerDown,
  selectionColor
}: LayerPreviewProps) => {
  return (
    <div>
      LayerPreview
    </div>
  )
}
