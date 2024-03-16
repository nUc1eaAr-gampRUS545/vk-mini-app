import { FC, useEffect, useRef, useState } from "react";
import {
  Button,
  Div,
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
import { clear } from "../utils/functions";
type NameInfoType = {
  count: number;
  name: string;
  age: number;
};

export const SearchPanel: FC<NavIdProps> = ({ id }) => {
  const routeNavigator = useRouteNavigator();
  const [resInServer, setResInServer] = useState<NameInfoType>({
    count: 0,
    name: "",
    age: 0,
  });
  const [activeInfoShow, setActiveInfoShow] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [inputValue, setInputValue] = useState<string>("");
  const [isFocused, setIsFocused] = useState<boolean>(false);
  const textInput = useRef<HTMLInputElement>(null);


  const handleInputForm = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (/^[a-zA-Z]*$/.test(value) || value === "") {
      setInputValue(value);
    }
  };
  const handleClickButton = () => {
    setIsLoading(true);
    fetch(`https://api.agify.io?name=${inputValue}`)
      .then((response) => response.json())
      .then((res: NameInfoType) => {
        setActiveInfoShow(true);
     
        setResInServer(res);
        setIsLoading(false);
      })
      .catch((err) => {
        setIsLoading(false);
        console.error(err);
      });
  };
  useEffect(() => {
    if (inputValue !== "" && !isFocused) {
      setTimeout(handleClickButton, 3000);
    }
  }, [inputValue, isFocused]);

  return (
    <Panel id={id}>
      <PanelHeader
        before={<PanelHeaderBack onClick={() => routeNavigator.back()} />}
      >
        Найти информацию
      </PanelHeader>
      <Placeholder>
        <FormItem
          htmlFor="example"
          top="📝 Найти информацию о..."
          status={"default"}
        >
          <Input
            id="example"
            onChange={handleInputForm}
            getRef={textInput}
            type="text"
            onBlur={() => setIsFocused(false)}
            onFocus={() => setIsFocused(true)}
            value={inputValue}
            after={
              <IconButton
                hoverMode="opacity"
                label="Очистить поле"
                onClick={() => clear(textInput)}
              >
                <Icon16Clear />
              </IconButton>
            }
            defaultValue="Забавный факт ждет!"
            disabled={isLoading}
          />
        </FormItem>
        <Button stretched size="l" mode="secondary" onClick={handleClickButton}>
          Найти
        </Button>
        {activeInfoShow && (
          <Div
            style={{
              backgroundColor: "grey",
              borderRadius: "6px",
              marginTop: "20px",
            }}
          >
            <Div
              style={{ color: "white" }}
            >{`Возраст: ${resInServer.age}`}</Div>
            <Div style={{ color: "white" }}>{`Имя: ${resInServer.name}`}</Div>
            <Div style={{ color: "white" }}>{`Счет: ${resInServer.count}`}</Div>
          </Div>
        )}
      </Placeholder>
    </Panel>
  );
};
