import { useState, useContext, useEffect } from "react"
import useAuthRequest from "../../hooks/useAuthRequest"
import { AuthContext } from "../../context/AuthContext"

const UserList = () => {
    const { user } = useContext(AuthContext);
    const [ users, setUsers ] = useState([])
    const { sendRequest, loading, error } = useAuthRequest();
    useEffect(() => {
        sendRequest('/api/users', 'GET').then((data) =>
            data ? setUsers(data.users) : setUsers([]))
    }, [])
    useEffect(() => {
        console.log(users)
    }, [users])
    return (
    <div>
            UserList!
    </div>
    )
}

export default UserList
