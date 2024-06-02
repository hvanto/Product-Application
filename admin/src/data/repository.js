import { gql } from "@apollo/client";
import client from "../apollo/client";

// Define the GraphQL queries and mutations
const GET_USERS = gql`
  query GetUsers {
    users {
      userId
      username
      blocked
    }
  }
`;

const BLOCK_UNBLOCK_USER = gql`
  mutation BlockUnblockUser($userId: ID!, $block: Boolean!) {
    blockUnblockUser(userId: $userId, block: $block) {
      userId
      username
      blocked
    }
  }
`;

// Function to get users
export const getUsers = async () => {
  console.log("Fetching users...");
  try {
    const { data } = await client.query({ query: GET_USERS });
    console.log("Users fetched:", data.users);
    return data.users;
  } catch (error) {
    console.error("Error fetching users:", error);
    throw error;
  }
};

// Function to block or unblock a user
export const blockUnblockUser = async (userId, block) => {
  console.log(`Updating user block status: ${userId}, Block: ${block}`);
  try {
    const { data } = await client.mutate({
      mutation: BLOCK_UNBLOCK_USER,
      variables: { userId, block }
    });
    console.log("User block status updated:", data.blockUnblockUser);
    return data.blockUnblockUser;
  } catch (error) {
    console.error("Error updating user block status:", error);
    throw error; 
  }
};
