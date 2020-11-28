import { Link, withRouter } from "react-router-dom";
import { images } from "../gql/queries";
import { useQuery } from "@apollo/client";
import { LoginContext } from '../Helper/Context'
import { useContext } from "react";

function Home() {
  const { data, error, loading } = useQuery(images);
  const { loggedIn, setLoggedIn } = useContext(LoginContext)
  console.log(data);
  function displayImg() {
    if (error) {
      console.log(error);
    }
    if (loading) {
      return <div className="loading"></div>;
    }
    if (data) {
      return data.images.map((img) => {
        return <Image item={img} key={img.id} />;
      });
    }
  }

  return (
  <>
    <div className="img-container">
      {displayImg()}
      {
        loggedIn && <div className="createPost"><Link to='/post'>+</Link></div>
      }
     
    </div>
    
    </>
  );
}

export default withRouter(Home);

function Image({ item }) {
  console.log(item.userid);
  return (
    <Link to={{ pathname: `/pin/${item.id}/${item.userid}` }}>
      <div className="img">
        <img src={item.image} alt="" />
        <div>
          <i className="fas fa-heart"></i>
        </div>
      </div>
    </Link>
  );
}
