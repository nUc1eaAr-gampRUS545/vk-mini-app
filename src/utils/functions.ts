export const clear = (textInput: React.RefObject<HTMLInputElement>) => {
    if (textInput.current) {
      textInput.current.value = "";
      textInput.current.focus();
    }
  };
 export const findFirstWord = (data:string):number =>{
    const firstSpaceIndex = data.indexOf(' ');
      const cursorPosition = firstSpaceIndex !== -1 ? firstSpaceIndex + 1 : data.length;
      return cursorPosition;
  }