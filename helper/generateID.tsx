export const generateTrackListId = (trackListName: string, search?: string) => {
  return `${trackListName}${`-${search}` || ""}`;
};
