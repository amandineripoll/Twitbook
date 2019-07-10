// import React, { useState, useContext, useEffect } from 'react';
// import Tweets from '../components/tweets';
// import {
//   Box,
//   Image,
//   Columns,
//   Column,
//   Input,
//   Field,
//   Label,
//   Control,
//   Icon,
// } from 'bloomer';
// // import app from 'firebase/app';
// import 'firebase/auth';
// import { FirebaseContext } from '../components/Firebase';

// // import { FirebaseContext } from '../components/Firebase';

// const Profile = () => {
//   const handleImageChange = event => {
//     event.preventDefault();
//     // console.log(event.target.files[0].name);
//     const image = event.target.files[0];
//     const formData = new FormData();
//     formData.append('image', image, image.name);
//     this.props.uploadImage(formData);
//   };

//   const handleEditPicture = () => {
//     const fileInput = document.getElementById('imageInput');
//     fileInput.click();
//   };

//   const { firebase } = useContext(FirebaseContext);
//   const [setUser] = setState({});

//   useEffect(() => {
//     const { uid } = JSON.parse(window.localStorage.getItem('user'));
//     firebase.user(uid).on('value', snapshot => {
//       console.log(firebase.user(uid));
//       const user = snapshot.val();
//       setUser({
//         username: user.username,
//         name: user.name,
//       });
//     });
//   }, []);

//   return (
//     <>
//       <Columns isCentered>
//         <Column isSize="1/3">
//           <Box>
//             <Image
//               isSize="128x128"
//               src="https://randomuser.me/api/portraits/women/79.jpg"
//               isCentered
//             />
//             <Field>
//               <Label>{Profile.username}</Label>
//               <Control>
//                 <Input
//                   type="file"
//                   id="imageInput"
//                   onChange={handleImageChange}
//                   hidden="hidden"
//                 />
//                 <Icon
//                   isSize="medium"
//                   className="fas fa-pen"
//                   onClick={handleEditPicture}
//                   color="primary"
//                 />
//               </Control>
//             </Field>
//             <p style={{ margin: '0 0 5rem' }}>
//             <strong>{user.name}</strong> <small>@{user.username}</small>
//             <br />
//             People Keep Asking If I’m Back, And I Haven’t Really Had An Answer,
//             But Now, Yeah, I’m Thinking I’m Back.
//             </p>
//             {user && currentUid === user.uid && <PostTweet />}
//             {user && <Tweets uid={user.uid} profile={true} />}
//           </Box>
//         </Column>
//       </Columns>
//       <Tweets />
//     </>

import React, { useState, useEffect, useContext } from 'react';
import {
  Box,
  Image,
  Columns,
  Column,
  Input,
  Field,
  Label,
  Control,
  Icon,
} from 'bloomer';

import { FirebaseContext } from '../components/Firebase';
import Tweets from '../components/tweets';
import PostTweet from '../components/tweets/Post';

const Profile = ({ match }) => {
  const { firebase } = useContext(FirebaseContext);
  const [user, setUser] = useState({});
  const [currentUid, setCurrentUid] = useState({});

  const handleImageChange = event => {
    event.preventDefault();
    // console.log(event.target.files[0].name);
    const image = event.target.files[0];
    const formData = new FormData();
    formData.append('image', image, image.name);
    this.props.uploadImage(formData);
  };

  useEffect(() => {
    const { uid } = JSON.parse(window.localStorage.getItem('user'));
    setCurrentUid(uid);

    firebase.getUserByUsername(match.params.username).on('value', snapshot => {
      const users = snapshot.val();
      for (let user in users) {
        setUser({
          uid: user,
          name: users[user].name,
          username: users[user].username,
        });
      }
    });
  }, [match.params.username]);

  return (
    <>
      <Columns isCentered>
        <Column isSize="1/3">
          <Box>
            <Image
              isSize="128x128"
              src="https://randomuser.me/api/portraits/women/79.jpg"
              isCentered
            />
            <Field>
              <Label>{Profile.username}</Label>
              <Control>
                <Input
                  type="file"
                  id="imageInput"
                  onChange={handleImageChange}
                  hidden="hidden"
                />
                <Icon
                  isSize="medium"
                  className="fas fa-pen"
                  onClick={handleEditPicture}
                  color="primary"
                />
              </Control>
            </Field>
            <p style={{ margin: '0 0 5rem' }}>
              <strong>{user.name}</strong> <small>@{user.username}</small>
              <br />
              People Keep Asking If I’m Back, And I Haven’t Really Had An
              Answer, But Now, Yeah, I’m Thinking I’m Back.
            </p>
            {user && currentUid === user.uid && <PostTweet />}
            {user && <Tweets uid={user.uid} profile={true} />}
          </Box>
        </Column>
      </Columns>
      <Tweets />
    </>
  );
};

export default Profile;
