import useAuthContext from "../../hooks/useAuthContext";
import CommentOwnerOptions from "./CommentOwnerOptions";

const CommentCard = ({ comment, onDeleteCount }) => {
    const { currentUserId } = useAuthContext()
    return (
        <div className="mx-auto flex justify-start my-1 p-2 w-full bg-slate-100 bg-opacity-90">
            <p className="mx-2 text-md  italic">{comment.content},</p>
            <p className="italic text-md">
                {comment.author_name},
                {new Date(comment?.created_at).toDateString()}
            </p>
            {comment.author_id === currentUserId && 

                <div className="ml-auto">
                    <CommentOwnerOptions commentId={comment.id} onDeleteCount={onDeleteCount} />
                </div>}
        </div>
    );
};

export default CommentCard;
