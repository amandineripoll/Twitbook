import React, { useState } from 'react';
import Tweets from '../components/tweets';
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
// import app from 'firebase/app';
import 'firebase/auth';

// import { FirebaseContext } from '../components/Firebase';

const Profile = () => {
  const handleImageChange = event => {
    event.preventDefault();
    // console.log(event.target.files[0].name);
    const image = event.target.files[0];
    const formData = new FormData();
    formData.append('image', image, image.name);
    this.props.uploadImage(formData);
  };

  const handleEditPicture = () => {
    const fileInput = document.getElementById('imageInput');
    fileInput.click();
  };

  const username = useState('');
  // const { firebase } = useContext(FirebaseContext);

  // useEffect(() => {
  //   firebase.user(uid).on('value', snapshot => {
  //     const user = snapshot.val();
  //   });
  // });

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
              <Label>Name</Label>
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
              <strong>{username}</strong> <small>@Chloe</small>
              <br />
              People Keep Asking If I’m Back, And I Haven’t Really Had An Yeah,
              I’m Thinking I’m Back.
            </p>
          </Box>
        </Column>
      </Columns>
      <Tweets />
    </>
  );
};

export default Profile;
