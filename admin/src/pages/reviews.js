// import React, { useState, useContext, useEffect } from "react";
// import gql from "graphql-tag";
// import MessageContext from "../contexts/AdminContext.js";
// import { getComments, createComment } from "../data/repository.js";
// import client from "../apollo/client.js";

// export default function Comments() {
//   const [comment, setComment] = useState("");
//   const [errorMessage, setErrorMessage] = useState(null);
//   const [comments, setComments] = useState([]);
//   const { setMessage } = useContext(MessageContext);

//   // Load comments.
//   useEffect(() => {
//     async function loadComments() {
//       const currentComments = await getComments();

//       setComments(currentComments);
//     }
//     loadComments();
//   }, []);

//   // Setup subscription.
//   useEffect(() => {
//     // Subscripe to the GraphQL comment_added subscription.
//     const subscription = client.subscribe({
//       query: gql`
//         subscription {
//           comment_added {
//             id,
//             content
//           }
//         }`
//     }).subscribe({
//       next: (payload) => {
//         const newComment = payload.data.comment_added;

//         // Ignore the new comment if it already exists.
//         for(const x of comments) {
//           if(newComment.id === x.id)
//             return;
//         }

//         // Add new comment.
//         setComments([...comments, newComment]);

//         // Set message.
//         setMessage(<>Comment with <strong>ID {newComment.id}</strong> created.</>);
//       }
//     });

//     // Unsubscripe from the subscription when the effect unmounts.
//     return () => {
//       subscription.unsubscribe();
//     };
//   }, [comments, setMessage]);

//   const handleInputChange = (event) => {
//     setComment(event.target.value);
//   };

//   const handleSubmit = async (event) => {
//     event.preventDefault();

//     // Trim the comment text.
//     const commentTrimmed = comment.trim();

//     if(commentTrimmed === "") {
//       setErrorMessage("A comment cannot be empty.");
//       return;
//     }

//     // Create comment.
//     const newComment = await createComment(commentTrimmed);

//     // Update comments.
//     setComments([...comments, newComment]);

//     // Set message.
//     setMessage(<>Comment with <strong>ID {newComment.id}</strong> created.</>);

//     // Reset comment content.
//     setComment("");
//     setErrorMessage("");
//   };

//   return (
//     <div>
//       <form onSubmit={handleSubmit}>
//         <fieldset>
//           <legend>New Comment</legend>
//           <div className="form-group">
//             <textarea name="comment" id="comment" className="form-control" rows="3"
//               value={comment} onChange={handleInputChange} />
//           </div>
//           {errorMessage !== null &&
//             <div className="form-group">
//               <span className="text-danger">{errorMessage}</span>
//             </div>
//           }
//           <div className="form-group">
//             <input type="button" className="btn btn-danger mr-5" value="Cancel"
//               onClick={() => { setComment(""); setErrorMessage(null); }} />
//             <input type="submit" className="btn btn-primary" value="Comment" />
//           </div>
//         </fieldset>
//       </form>

//       <hr />
//       <h1>Comments</h1>
//       <div>
//         {comments.length === 0 ?
//           <span className="text-muted">No comments have been submitted.</span>
//           :
//           comments.map((x) =>
//             <div key={x.id} className="border my-3 p-3" style={{ whiteSpace: "pre-wrap" }}>{x.content}</div>
//           )
//         }
//       </div>
//     </div>
//   );
// }
