import Login from "./components/Login"
import backgr from "/background.jpg"

const App = () => {
  return (
    <div className={`grid py-4 min-h-screen bg-[url(${backgr})] bg-center`}>
      <Login />
    </div>
  )
}

export default App