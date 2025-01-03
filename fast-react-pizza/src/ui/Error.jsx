import { useNavigate } from "react-router-dom";

function Error() {
  const navigate = useNavigate();
  // const notFound = useRouteError();

  return (
    <div>
      <h1>Something went wrong 😢</h1>
      {/* <p>{notFound.data || notFound.message}</p> */}
      <button onClick={() => navigate(-1)}>&larr; Go back</button>
    </div>
  );
}

export default Error;
