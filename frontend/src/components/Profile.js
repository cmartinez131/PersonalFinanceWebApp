import React, { useEffect, useState } from 'react';
import { getProfile } from '../api';

const Profile = () => {
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await getProfile();
        setProfile(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchProfile();
  }, []);

  return (
    <div>
      {profile ? (
        <div>
          <h2>Profile</h2>
          <p>Username: {profile.username}</p>
          <p>Email: {profile.email}</p>
          {/* Add more profile fields as needed */}
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default Profile;
