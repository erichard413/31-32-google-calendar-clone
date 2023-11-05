import { useState } from "react";
import "./styles/styles.css";
import { Calendar } from "./components/Calendar";

function App() {
  const [currentMonth, setCurrentMonth] = useState<Date>(new Date());
  return (
    <>
      <Calendar currentMonth={currentMonth} />
    </>
  );
}

export default App;
