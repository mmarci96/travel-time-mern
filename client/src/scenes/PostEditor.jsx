import { useParams } from "react-router-dom"
import PostForm from "../components/posts/PostForm"

const PostEditor = () => {
    const { postId } = useParams()
    return (
    <PostForm postId={postId} />
    )
}

export default PostEditor;
