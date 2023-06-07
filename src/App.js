import { Fragment, lazy, Suspense } from "react";
// import HomePage from "./pages/HomePage";
import { Routes, Route } from "react-router-dom";
import Main from "./layout/Main ";
// import MoviePage from "./pages/MoviePage";
// import MovieDetailPage from "./pages/MovieDetailPage";

const HomePage = lazy(() => import("./pages/HomePage"));
// const MoviePage = lazy(() => import("./pages/MoviePage"));
const MoviePage2 = lazy(() => import("./pages/MoviePage-Load_more"));
const MovieDetailPage = lazy(() => import("./pages/MovieDetailPage"));


function App() {
  return (
    <Fragment >
      <Suspense fallback={<></>}>
        <Routes>
          <Route element={<Main></Main>}>

            <Route path="/" element={<HomePage></HomePage>}></Route>
            <Route path="/movies" element={<MoviePage2></MoviePage2>}></Route>
            <Route path="/movies/:movieId" element={<MovieDetailPage></MovieDetailPage>}></Route>

          </Route>
        </Routes>
      </Suspense>
    </Fragment>
  );
}

export default App;
