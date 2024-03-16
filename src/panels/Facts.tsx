import { FC, useRef, useState } from "react";
import {
  Button,
  FormItem,
  IconButton,
  Input,
  NavIdProps,
  Panel,
  PanelHeader,
  PanelHeaderBack,
  Placeholder,
} from "@vkontakte/vkui";
import { useRouteNavigator } from "@vkontakte/vk-mini-apps-router";
import { Icon16Clear } from "@vkontakte/icons";
import { clear, findFirstWord } from "../utils/functions";
type FactType = {
  fact: string;
  length: number;
};

export const Facts: FC<NavIdProps> = ({ id }) => {
  const routeNavigator = useRouteNavigator();
  const [factInServer, setFactInServer] = useState<FactType>({
    fact: "",
    length: 0,
  });
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const textInput = useRef<HTMLInputElement>(null);
 
  const setCursorAfterFirstWord = (ref:React.RefObject<HTMLInputElement>, data:FactType) => {
    const firstWordLength = findFirstWord(data.fact)
    if (ref.current) {
      ref.current.value = data.fact;
      ref.current.focus;
      ref.current.setSelectionRange(firstWordLength, firstWordLength);
      
    }
  };
  
  const handleClickButton = () => {
    setIsLoading(true);
    fetch("https://catfact.ninja/fact")
      .then((response) => response.json())
      .then((value: FactType) => {
       
        setCursorAfterFirstWord(textInput, value)
        setFactInServer(value);
        setIsLoading(false);
      })
      .catch((err) => {
        setIsLoading(false);
        console.error(err);
      });
  };

 

  return (
    <Panel id={id}>
      <PanelHeader
        before={<PanelHeaderBack onClick={() => routeNavigator.back()} />}
      >
        Факты
      </PanelHeader>
      <Placeholder>
        <FormItem
          htmlFor="example"
          top="📝 Забавный факт о котах"
          status={"default"}
        >
          <Input
            id="example"
            value={factInServer.fact}
            getRef={textInput}
            type="text"
            onFocus={ ()=>setCursorAfterFirstWord(textInput, factInServer)}
            after={
              <IconButton
                hoverMode="opacity"
                label="Очистить поле"
                onClick={()=>clear(textInput)}
              >
                <Icon16Clear />
              </IconButton>
            }
            defaultValue="Забавный факт ждет!"
            disabled={isLoading}
          />
        </FormItem>
        <Button
          stretched
          size="l"
          disabled={isLoading}
          mode="secondary"
          onClick={handleClickButton}
        >
          Найти
        </Button>
      </Placeholder>
    </Panel>
  );
};
