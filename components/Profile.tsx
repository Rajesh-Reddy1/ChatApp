import React from 'react';

function ProfileOptions() {
    return (
        <div>
            <h2>Profile Options</h2>
            <ul>
                <li><button onClick={() => console.log('Change Name Clicked')}>Change Name</button></li>
                <li><button onClick={() => console.log('Change Picture Clicked')}>Change Picture</button></li>
                <li><button onClick={() => console.log('Change Bio Clicked')}>Change Bio</button></li>
                <li><button onClick={() => console.log('Sign Out Clicked')}>Sign Out</button></li>
            </ul>
        </div>
    );
}

export default ProfileOptions;
