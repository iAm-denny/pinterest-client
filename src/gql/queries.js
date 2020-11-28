import { gql } from '@apollo/client'

const UserLogin = gql`
 mutation($email: String!, $name: String!, $profileImage: String!) {
     user(email: $email, name: $name, profileImage: $profileImage) {
         id,
        email,
        name 
        profileImage
     }
 }
`
const user = gql`
query($id: ID!) {
    user(id: $id) {
        id
        name
        email
        profileImage
    }
}
`
const post = gql`
mutation($userid: ID!, $image: String!) {
    image (userid: $userid, image: $image) {
        userid
        image
    }
}
`
const images = gql`
query{
    images {
        id
        userid
        image

    }
}
`
const specificImage = gql`
query($id: ID!) {
    specificImage(id: $id) {
        id
        image
        userid
        createdAt
        likes
            {
                userid
            }
        
    }
}
`
const like = gql`
mutation($imageid: ID!, $userid: ID!) {
    likeImage(imageid: $imageid, userid: $userid) {
     id
   } 
   }
`
const specificUserImage = gql`
   query($id: ID!) {
    specificUserImage(userid: $id) {
        image
    }
   }
`
export { UserLogin, user, post, images, specificImage, like, specificUserImage }