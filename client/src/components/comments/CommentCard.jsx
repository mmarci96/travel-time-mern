const CommentCard = ({ comment }) => {
    return (
        <div className="mx-auto my-1 p-2 w-full bg-slate-100 bg-opacity-90">
            <p>{comment.content}</p>
            <p className="italic text-md">
                {comment.author_name},{' '}
                {new Date(comment?.created_at).toDateString()}
            </p>
        </div>
    );
};

export default CommentCard;
