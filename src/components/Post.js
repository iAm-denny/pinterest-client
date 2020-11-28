import { useState, useEffect } from "react";
import Cookies from "universal-cookie";
import FileBase64 from "react-file-base64";
import { useMutation } from "@apollo/client";
import { post, images } from "../gql/queries";

function Post(props) {
  const [image, setImage] = useState("");
  const [addImageMut] = useMutation(post);
  const cookies = new Cookies();
  const userid = cookies.get("userid");

  const submitHandle = (e) => {
    e.preventDefault();
    addImageMut({
      variables: {
        userid,
        image,
      },
      
        refetchQueries: [{
          query: images
        }]
      
    })
    .then(() => {
      props.history.push("/")

     })
    .catch(err => console.log(err))
  };
  return (
    <div >
      {
        userid ? (
          <form onSubmit={submitHandle} className="post">
            <div>
            <FileBase64
            multiple={false}
            onDone={({ base64 }) => setImage(base64)}
          />
          <div className="img"><img src={image} alt=""/></div>
          
            </div>

          <div className="submit">
          <button>Submit</button>
          </div>
          
        </form>
        )
        : (
          <div>Go login Frist</div>
        )

      }

    </div>
  );
}

export default Post;
