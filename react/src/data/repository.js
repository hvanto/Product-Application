import { request, gql } from "graphql-request";

// --- Constants ----------------------------------------------------------------------------------
const GRAPH_QL_URL = "http://localhost:4000/graphql";

// --- Comments -----------------------------------------------------------------------------------
async function getComments() {
  const query = gql`
    {
      comments {
        id,
        content
      }
    }
  `;

  const data = await request(GRAPH_QL_URL, query);

  return data.comments;
}

async function createComment(content) {
  const query = gql`
    mutation ($content: String!) {
      create_comment(content: $content) {
        id,
        content
      }
    }
  `;

  const variables = { content };

  const data = await request(GRAPH_QL_URL, query, variables);

  return data.create_comment;
}

export {
  getComments, createComment
}
