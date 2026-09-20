export function selectZeroOnFocus(event: React.FocusEvent<HTMLInputElement>) {
  if (Number(event.currentTarget.value) === 0) {
    event.currentTarget.select();
  }
}
