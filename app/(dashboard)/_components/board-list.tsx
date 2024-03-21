"use client"

import {EmptySearch} from "@/app/(dashboard)/_components/empty-search";

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
  const data = []

  if (!data?.length && query.search) {
    return (
      <EmptySearch />
    )
  }

  if (!data?.length && query.favorites) {
    return (
      <div>
        No favorites
      </div>
    )
  }

  if (!data?.length) {
    return (
      <div>
        No boards at all
      </div>
    )
  }

  return (
    <div>
      {JSON.stringify(query)}
    </div>
  )
}
