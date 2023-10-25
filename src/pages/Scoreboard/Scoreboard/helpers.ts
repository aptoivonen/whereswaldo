export function isActivePlayerRow(
  activePlayerId: string | null,
  rowPlayerId: string
) {
  return activePlayerId && activePlayerId === rowPlayerId;
}

export function scrollRowIntoView(
  activePlayerId: string | null,
  rowPlayerId: string
) {
  return isActivePlayerRow(activePlayerId, rowPlayerId)
    ? (element: HTMLTableRowElement | null): void => element?.scrollIntoView()
    : undefined;
}

function isEven(index: number) {
  return index % 2 === 0;
}

export function getRowColor(
  activePlayerId: string | null,
  rowPlayerId: string,
  rowIndex: number
) {
  if (isActivePlayerRow(activePlayerId, rowPlayerId)) {
    return 'bg-gold';
  }
  return isEven(rowIndex) ? 'bg-transparent' : 'bg-light';
}
