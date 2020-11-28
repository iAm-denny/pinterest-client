import React from "react";
import Cookies from "universal-cookie";
import { user, specificUserImage } from "../gql/queries";
import { useQuery } from "@apollo/client";

function User() {
  const cookies = new Cookies();
  const { data } = useQuery(user, { variables: { id: cookies.get("userid") } });
  const { data: dataImg } = useQuery(specificUserImage, {
    variables: { id: cookies.get("userid") },
  });
  if (data) {
    console.log(data);
  }
  if (dataImg) {
    console.log(dataImg);
  }
  function displayUserProfile() {
    if (data) {
      return (
        <div className="profile">
          <div>
            <img src={data.user.profileImage} width="120px" />
          </div>
          <div>
            <h1>{data.user.name}</h1>
          </div>
        </div>
      );
    }
  }
  function displayImg() {
    if (dataImg) {
      return (
        <>
          <h2>My pin</h2>
          <div className="mypins">
            {dataImg.specificUserImage.map((img) => {
              return (
                <div>
                  <img src={img.image} width="200px" height="auto" />
                </div>
              );
            })}
          </div>
        </>
      );
    }
  }
  return (
    <div>
      <div className="pins">

        {
          cookies.get("userid") ? (
            <>
            {displayUserProfile()}
            {displayImg()}
            </>
          ): (
            <div>Go login first</div>
          )
        }
      </div>
    </div>
  );
}

export default User;
