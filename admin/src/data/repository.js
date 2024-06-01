import { gql } from "@apollo/client";
import client from "../apollo/client";


const GET_USERS = gql`
  query GetUsers {
    users {
      userId
      username
    }
  }
`

const BLOCK_UNBLOCK_USER = gql`
  mutation BlockUnblockUser($userId: ID!, $block: Boolean!) {
    blockUnblockUser(userId: $userId, block: $block) {
      id
      username
      blocked
    }
  }
`;

export const getUsers = async () => {
  console.log("Get users");
  const { data } = await client.query({ query: GET_USERS });
  console.log("Users:", data);
  return data.users;
}

export const blockUnblockUser = async (userId, block) => {
  console.log(`Block/Unblock user with ID: ${userId}, Block: ${block}`);
  const { data } = await client.mutate({
    mutation: BLOCK_UNBLOCK_USER,
    variables: { userId, block }
  });
  console.log("Block/Unblock response:", data);
  return data.blockUnblockUser;
};
