"use client"

import {Overlay} from "@/app/(dashboard)/_components/board-card/overlay";
import {useAuth} from "@clerk/nextjs";
import Link from "next/link";
import Image from "next/image";
import {formatDistanceToNow} from "date-fns";
import {Footer} from "@/app/(dashboard)/_components/board-card/footer";

import { Skeleton } from "@/components/ui/skeleton"
import {Actions} from "@/components/actions";
import {MoreHorizontal} from "lucide-react";
import {useApiMutation} from "@/hooks/use-api-mutation";
import {api} from "@/convex/_generated/api";
import {toast} from "sonner";
import {useMutation} from "convex/react";
import {Id} from "@/convex/_generated/dataModel";

interface BoardCardProps {
  id: string;
  title: string;
  imageUrl: string;
  authorId: string;
  authorName: string;
  createdAt: number;
  orgId: string;
  isFavorite: boolean;
}

export const BoardCard = ({
  id,
  title,
  imageUrl,
  authorId,
  authorName,
  createdAt,
  orgId,
  isFavorite
}: BoardCardProps) => {
  const { userId } = useAuth()

  const authorLabel = userId === authorId ? "You" : authorName
  const createdAtLabel = formatDistanceToNow(createdAt, { addSuffix: true })

  const handleFavorite = useMutation(api.board.favorite)
  const handleUnfavorite = useMutation(api.board.unfavorite)

  const {
    mutate: onFavorite,
    pending: pendingFavorite
  } = useApiMutation(api.board.favorite)

  const {
    mutate: onUnfavorite,
    pending: pendingUnfavorite
  } = useApiMutation(api.board.unfavorite)

  const toggleFavorite = () => {
    if (isFavorite) {
      try {
        handleUnfavorite({ id: id as Id<"boards"> })
      } catch (error) {
        toast.error('Failed to unfavorite')
      }
    } else {
      try {
        handleFavorite({ id: id as Id<"boards">, orgId })
      } catch (error) {
        toast.error('Failed to favorite')
      }
    }
  }

  return (
    <Link href={`/board/${id}`}>
      <div className="group aspect-[100/127] border rounded-lg flex flex-col justify-between overflow-hidden">
        <div className="relative flex-1 bg-amber-50">
          <Image
            src={imageUrl}
            alt={title}
            fill
            className="object-fit"
          />
          <Actions
            id={id}
            title={title}
            side="right"
          >
            <button className="absolute z-50 top-1 right-1 opacity-0 group-hover:opacity-100 transition-opacity px-3 py-2 outline-none">
              <MoreHorizontal
                className="text-white opacity-75 hover:opacity-100 transition-opacity"
              />
            </button>
          </Actions>
          <Overlay />
        </div>
        <Footer
          isFavorite={isFavorite}
          title={title}
          authorLabel={authorLabel}
          createdAtLabel={createdAtLabel}
          onClick={toggleFavorite}
          disabled={pendingFavorite || pendingUnfavorite}
        />
      </div>
    </Link>
  )
}

BoardCard.Skeleton = function BoardCardSkeleton() {
  return (
    <div className="aspect-[100/127] rounded-lg overflow-hidden">
      <Skeleton className="h-full w-full"/>
    </div>
  )
}
