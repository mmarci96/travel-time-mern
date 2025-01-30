import { useState } from 'react';
import useAuthContext from '../../hooks/useAuthContext';
import CommentOwnerOptions from './CommentOwnerOptions';
import CommentEditorForm from './CommentEditorForm';

const CommentCard = ({ comment, onDeleteCount }) => {
    const [editing, setEditing] = useState(false);
    const { currentUserId } = useAuthContext();
    return (
        <div className="mx-auto flex justify-start my-1 p-2 w-full bg-slate-100 bg-opacity-90 rounded-lg ring-1 ring-slate-200">
            {editing ? (
                <CommentEditorForm
                    onEdit={setEditing}
                    onDeleteCount={onDeleteCount}
                    commentId={comment.id}
                    content={comment.content}
                />
            ) : (
                <>
                    <p className="mx-2 text-md  italic">
                        {comment.content},
                    </p>
                    <p className="italic text-md">
                        {comment.author_name},
                        {new Date(comment?.created_at).toDateString()}
                    </p>
                </>
            )}
            {comment.author_id === currentUserId && !editing && (
                <div className="ml-auto">
                    <CommentOwnerOptions
                        commentId={comment.id}
                        onDeleteCount={onDeleteCount}
                        onEditing={setEditing}
                    />
                </div>
            )}
        </div>
    );
};

export default CommentCard;
