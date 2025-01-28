import { useState } from "react"
import { Link } from "react-router-dom";
import { FaTrashAlt, FaEdit, FaEllipsisV } from "react-icons/fa";
import useAuthRequest from "../../hooks/useAuthRequest";

const PostOwnerOptions = ({ onDeleteCount, postId }) => {
    const [toggleOptions, setToggleOptions] = useState(false);
    const { sendRequest } = useAuthRequest()
    const handleToggle = () => {
        setToggleOptions(!toggleOptions)
    }
    const handleDelete = async () => {
        const deletePost = await sendRequest(`/api/posts/${postId}`,'DELETE')
        if(deletePost){
            onDeleteCount((prev) => prev + 1)
        }
    }
    return (
        <div className="relative">
            <button onClick={handleToggle}>
                <FaEllipsisV size={28}
                    className="text-slate-600" />
            </button>
            {toggleOptions &&
                <div className="absolute flex flex-col">
                    <button
                        onClick={handleDelete}
                    >
                        <FaTrashAlt
                            size={28}
                            className="text-red-600 mx-2 my-1"
                        />
                    </button>

                    <Link to={`/post/edit/${postId}`}>
                        <FaEdit
                            size={28}
                            className="text-slate-600 mx-2 my-1"
                        />
                    </Link>


                </div>}
        </div>
    ) 
}

export default PostOwnerOptions;
