// databaseSchema.js

export const firebaseDatabaseSchema = {
    users: {
        // User data structure
        userId1: {
            email: "user1@example.com",
            friends: {
                friendId1: true,
                friendId2: true,
            },
        },
        userId2: {
            email: "user2@example.com",
            friends: {
                friendId1: true,
            },
        },
        // ... other users
    },
    // ... other database sections
};
