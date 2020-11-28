import FacebookLogin from "react-facebook-login";
import GoogleLogin from "react-google-login";
import { useMutation } from "@apollo/client";
import { UserLogin } from "../gql/queries";
import Cookies from "universal-cookie";
import { withRouter } from "react-router-dom";
import { LoginContext,UserContext } from '../Helper/Context'
import { useContext } from "react";

function Login(props) {
  const { loggedIn, setLoggedIn } = useContext(LoginContext)
  const { userProfile, setUserProfile } = useContext(UserContext)

  const [loginMut] = useMutation(UserLogin);

  const cookies = new Cookies();

  const responseFacebook = (response) => {
    const getCookie = cookies.get("userid");
    if (getCookie) {
      cookies.remove("userid");
    }

    loginMut({
      variables: {
        name: response.name,
        email: response.email,
        profileImage: response.picture.data.url,
      },
    })
      .then((user) => {
        cookies.set("userid", user.data.user.id);
        window.sessionStorage.setItem("userImg", user.data.user.profileImage);
        window.sessionStorage.setItem("loggedIn", true);
        props.history.push("/");
        setLoggedIn(true)
        setUserProfile(window.sessionStorage.getItem("userImg"))
      })
      .catch((err) => console.log(err));
  };

  const responseGoogle = (response) => {
    const getCookie = cookies.get("userid");
    if (getCookie) {
      cookies.remove("userid");
    }

    loginMut({
      variables: {
        name: response.profileObj.name,
        email: response.profileObj.email,
        profileImage: response.profileObj.imageUrl,
      },
    })
      .then((user) => {
        cookies.set("userid", user.data.user.id);
        sessionStorage.setItem("userImg", user.data.user.profileImage);
        sessionStorage.setItem("loggedIn", "true");
        setLoggedIn(true)
        props.history.push("/");
        setUserProfile(window.sessionStorage.getItem("userImg"))
      })
      .catch((err) => console.log(err));
  };
  return (
    <div>
      <div className="loginForm">
        <h1>Login in with</h1>
        <div className="fb_login">
          <FacebookLogin
            appId="449720276049010"
            autoLoad={true}
            fields="name,email,picture"
            callback={responseFacebook}
            textButton="Facebook"
          />
        </div>

        <div>
          <GoogleLogin
            clientId="918645088712-8gm5aodfiekhjcqud8fio1nom2sqvang.apps.googleusercontent.com"
            buttonText="Login"
            onSuccess={responseGoogle}
            onFailure={responseGoogle}
          />
        </div>
      </div>
    </div>
  );
}

export default withRouter(Login);
