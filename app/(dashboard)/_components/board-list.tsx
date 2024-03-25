"use client"

import {EmptySearch} from "@/app/(dashboard)/_components/empty-search";
import {EmptyFavorites} from "@/app/(dashboard)/_components/empty-favorite";
import {EmptyBoards} from "@/app/(dashboard)/_components/empty-boards";
import {useQuery} from "convex/react";
import {api} from "@/convex/_generated/api";
import {BoardCard} from "@/app/(dashboard)/_components/board-card";

interface BoardListProps {
  orgId: string;
  query: {
    search?: string;
    favorites?: string;
  }
}

export const BoardList = ({
  orgId,
  query
}: BoardListProps) => {
  // TODO: change to API call
  const data = useQuery(api.boards.get, {orgId});

  if (data === undefined) {
    return (
      <div>
        Loading...
      </div>
    )
  }

  if (!data?.length && query.search) {
    return <EmptySearch />
  }

  if (!data?.length && query.favorites) {
    return <EmptyFavorites />
  }

  if (!data?.length) {
    return <EmptyBoards />
  }

  return (
    <div>
      <h2 className="text-3xl">
        { query.favorites ? 'Favorite boards' : 'Team boards' }
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-5 mt-8 pb-10">
        {data?.map((board) => (
          <BoardCard
            key={board._id}
            id={board._id}
            title={board.title}
            imageUrl={board.imageUrl}
            authorId={board.authorId}
            authorName={board.authorName}
            createdAt={board._creationTime}
            orgId={board.orgId}
            isFavorite={false}
          />
        ))}
      </div>
    </div>
  )
}
