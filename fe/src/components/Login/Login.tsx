import callAPI from "callAPI";
import storage from "helpers/storage";
import { FC, useCallback, useRef } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { actionChangeLoading, asyncInit } from "store/actions";

const Login : FC = function () {
    const formRef = useRef<any>()
    const dispatch = useDispatch()
    const handleLogin = useCallback(async (e) => {
        e.preventDefault()
        const form = new FormData(formRef.current)
        const submitData = {}
        for (let field of form) {
            submitData[field[0]] = field[1]
        }
        const res = await callAPI.post('/auth' , submitData)
        if(res.status === 100) {
            toast('please input username and password')
        }
        if(res.status === 101) {
            toast('user is not exist')
        }
        if(res.status === 102) {
            toast('Incorrect username or password')
        }
        if(res.status === 1) {
            toast('Login successfully')
            storage.setToken(res.token)
            dispatch(asyncInit())
        }

    },[dispatch])
    const handleSignup = useCallback(async (e) => {
        e.preventDefault()
        const form = new FormData(formRef.current)
        const submitData = {}
        for (let field of form) {
            submitData[field[0]] = field[1]
        }
        dispatch(actionChangeLoading(true))
        const res = await callAPI.post('/signup' , submitData)
        if(res.status === 100) {
            toast('Username is exist')
        }
        if(res.status === 1) {
            toast('Register success, please login')
        }
        dispatch(actionChangeLoading(false))
    },[])
    return (
        <>
            <div className="login">
                <form ref={ref => formRef.current = ref} onSubmit={handleLogin} action="">
                    <input type="text" name="username" placeholder="username"/>    
                    <input type="password" name="password" id="" placeholder="password"/>
                    <button type="submit">Login</button>
                    <button type="button" onClick={handleSignup}>Signup</button>
                </form>
            </div>
        </>
    )
}

export default Login