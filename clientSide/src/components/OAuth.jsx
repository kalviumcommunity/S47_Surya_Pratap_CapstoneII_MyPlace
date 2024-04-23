import { GoogleAuthProvider, getAuth, signInWithPopup } from 'firebase/auth'
import { app } from '../firebase'
import axios from "axios"
import { useDispatch } from 'react-redux'
import { signInSuccess } from '../redux/user/userSlice'
import { useNavigate } from "react-router-dom";



const OAuth = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handelGoogleClick = async () => {
    try {

      const provider = new GoogleAuthProvider()
      const auth = getAuth(app)
      const result = await signInWithPopup(auth, provider)
      const res = await axios.post('http://localhost:300/api/auth/google', {
        name: result.user.displayName, email: result.user.email, image: result.user.photoURL
      })
      const data = await res
      sessionStorage.setItem("access_token", data.data.token)
      dispatch(signInSuccess(data))
      navigate('/home')
    } catch (error) {
      alert(error)
    }
  }

  return (
    <button
      type="button"
      onClick={handelGoogleClick}
      className="bg-red-700 text-white p-3 rounded-lg uppercase hover:opacity-95"
    >
      Continue With Google
    </button>
  )
}

export default OAuth
