import { useState, useEffect, ReactNode } from "react";
//import bridge from '@vkontakte/vk-bridge';
import { View, SplitLayout, SplitCol, ScreenSpinner } from "@vkontakte/vkui";
import { useActiveVkuiLocation } from "@vkontakte/vk-mini-apps-router";

import { Facts, Home } from "./panels";
import { DEFAULT_VIEW_PANELS } from "./routes";
import { SearchPanel } from "./panels/SearchNames";

export const App = () => {
  const { panel: activePanel = DEFAULT_VIEW_PANELS.HOME } =
    useActiveVkuiLocation();
  const [popout, setPopout] = useState<ReactNode | null>(
    <ScreenSpinner size="large" />
  );

  useEffect(() => {
    async function fetchData() {
      // const user = await bridge.send('VKWebAppGetUserInfo');
      setPopout(null);
    }
    fetchData();
  }, []);

  return (
    <SplitLayout popout={popout}>
      <SplitCol>
        <View activePanel={activePanel}>
          <Home id="home" />
          <Facts id="facts" />
          <SearchPanel id="search-names" />
        </View>
      </SplitCol>
    </SplitLayout>
  );
};
