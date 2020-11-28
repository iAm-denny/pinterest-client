import { specificImage, user, like } from "../gql/queries";
import { useQuery, useMutation } from "@apollo/client";
import Cookies from "universal-cookie";
import moment from "moment";
import Base64Downloader from "react-base64-downloader";

function Detail(props) {
  const cookies = new Cookies();
  const getCookie = cookies.get("userid");

  const [likeMut] = useMutation(like);

  const { data, loading } = useQuery(specificImage, {
    variables: { id: props.match.params.id },
  });
  function LikeOrNot() {
    if (data) {
      const liked = data.specificImage.likes.find(like => {
        if(like.userid === getCookie) {
          return true
        }
        else {
          return false
        }
      })
      if(liked) {
        return "fas fa-heart active"
      }else {
        return "fas fa-heart "
      }
    }    
  }


  const { data: userData } = useQuery(user, {
    variables: { id: props.match.params.userid },
  });

  const likeimage = (e) => {
    e.preventDefault();
    likeMut({
      variables: {
        imageid: props.match.params.id,
        userid: cookies.get("userid"),
      },
      refetchQueries: [
        {
          query: specificImage,
          variables: { id: props.match.params.id },
        },
      ],
    })
      .then(() => console.log("Liked"))
      .catch((err) => console.log(err));
  };

  function displayImage() {
    console.log(data);
    if (loading) {
      return <div className="loading"></div>;
    }
    if (data) {
      const base64 = data.specificImage.image;
      console.log(data.specificImage.createdAt)
      return (
        <div className="pin-container">
          <div className="image">
            <img src={data.specificImage.image} alt="" />
          </div>
          <div className="right-side">
            <div className="right-side-user">
              <div>
                <img src={userData ? userData.user.profileImage : ""} alt="" />
              </div>
              <div className="download-user">
                <div>
  
                  <span>{moment().calendar(data.specificImage.createdAt.toString())}</span>
                </div>
                <div className="download-btn">
                  <Base64Downloader
                    base64={base64}
                    downloadName={props.match.params.id}
                    style={{
                      backgroundColor: "blue",
                      color: "#fff",
                      backgroundColor: "#e60023",
                      padding: "15px 25px",
                      borderRadius: "25px",
                      border: "none",
                      cursor: "pointer",
                      fontFamily: "Poppins, sans-serif",
                      outline: "none",
                    }}
                  >
                    Download
                  </Base64Downloader>
                </div>
              </div>
            </div>
            <div className="like-btn">
              <p>{data.specificImage.likes.length} People liked this </p>
              {
                getCookie ? (
                  <>
                  <i className={LikeOrNot()} onClick={likeimage}></i>
                  <span>{data.specificImage.likes.userid}</span>
                  </>
                ):  ""
              }
 
            </div>
          </div>
        </div>
      );
    }
  }

  return <>{displayImage()}</>;
}

export default Detail;
