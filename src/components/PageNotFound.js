import { Link } from "react-router-dom";

export default function PageNotFound() {
  return <div className="not-found">
    <h1>Error 404</h1>
     
      <h4>Sorry that page cannot be found</h4>
      <Link to="/">Take me back to the homepage...</Link>
  </div>;
}
