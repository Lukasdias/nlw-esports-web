import { useDarkTheme } from "../../store/themeStore";
import Button from "components/buttons";
import { useEffect } from "react";

function App() {
  const { theme, toggleTheme } = useDarkTheme();

  useEffect(() => {
    if (theme !== "dark") document.documentElement.classList.add("dark");
    else document.documentElement.classList.remove("dark");
  }, [theme]);

  return (
    <div className="w-screen h-screen bg-slate-300 dark:bg-slate-700 flex justify-center items-center">
      <h1 className="text-5xl text-blue-900 font-black">NLW</h1>
    </div>
  );
}

export default App;
