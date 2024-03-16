type FactType = {
  fact: string;
  length: number;
};
export const clear = (textInput: React.RefObject<HTMLInputElement>) => {
  if (textInput.current) {
    textInput.current.value = "";
    textInput.current.focus();
  }
};
export const findFirstWord = (data: string): number => {
  const firstSpaceIndex = data.indexOf(" ");
  const cursorPosition =
    firstSpaceIndex !== -1 ? firstSpaceIndex + 1 : data.length;
  return cursorPosition - 1;
};
export const setCursorAfterFirstWord = (
  ref: React.RefObject<HTMLInputElement>,
  data: FactType
) => {
  const firstWordLength = findFirstWord(data.fact);
  if (ref.current) {
    ref.current.value = data.fact;
    ref.current.focus();
    ref.current.setSelectionRange(firstWordLength, firstWordLength);
  }
};
