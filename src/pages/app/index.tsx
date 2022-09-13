import { useDarkTheme } from "../../store/themeStore";
import { useEffect } from "react";
import Home from "pages/home";

function App() {
  const { theme, toggleTheme } = useDarkTheme();

  useEffect(() => {
    if (theme !== "dark") document.documentElement.classList.add("dark");
    else document.documentElement.classList.remove("dark");
  }, [theme]);

  return (
    <div className="w-screen h-screen p-0 m-0 overflow-hidden">
      <div className="w-full max-h-screen overflow-x-hidden overflow-y-auto flex flex-col">
        <Home />
      </div>
    </div>
  );
}

export default App;
