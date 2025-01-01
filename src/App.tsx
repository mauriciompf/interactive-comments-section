import Comments from "./components/Comments";
import UserComment from "./components/UserComment";

function App() {
  return (
    <main className="md:mx-auto md:w-[50%]">
      <Comments />
      <UserComment />
    </main>
  );
}

export default App;
