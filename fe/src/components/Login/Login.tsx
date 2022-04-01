import { faCircleQuestion } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import callAPI from "callAPI";
import Button from "components/Button";
import Modal from "components/Modal";
import storage from "helpers/storage";
import { FC, useCallback, useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { actionChangeLoading } from "store/actions/state";

const Login: FC = function () {
    const formRef = useRef<any>()
    const dispatch = useDispatch()
    const [Username, setUsername] = useState('')
    const [Password, setPassword] = useState('')
    const [Worlds, setWorlds] = useState<any[]>([])
    const [ShowModal, setShowModal] = useState(false)
    useEffect(() => {
        callAPI.get('/worlds')
            .then(res => {
                setWorlds([...res.data])
            })
    }, [])
    const handleLogin = useCallback(async (e ? : any) => {
        if(e) {
            e.preventDefault()
        }
        const form = new FormData(formRef.current)
        const submitData = {}
        for (let field of form) {
            submitData[field[0]] = field[1]
        }
        const res = await callAPI.post('/auth', submitData)
        if (res.status === 100) {
            toast('please input username and password')
        }
        if (res.status === 101) {
            toast('user is not exist')
        }
        if (res.status === 102) {
            toast('Incorrect username or password')
        }
        if (res.status === 1) {
            toast('Login successfully')
            storage.setToken(res.token)
            window.location.reload()
        }

    }, [])
    const handleSignup = useCallback(async () => {
        const form = new FormData(formRef.current)
        const submitData : {[key: string] : any} = {}
        for (let field of form) {
            submitData[field[0]] = field[1]
        }
        dispatch(actionChangeLoading(true))
        if(submitData.username.length < 6 || submitData.password.length < 6 ) {
            toast('min 6 character for username and password')
        }else {
            const res = await callAPI.post('/signup', submitData)
            if (res.status === 100) {
                toast('Username is exist')
            }
            if (res.status === 1) {
                toast('Register success, please login')
            }
        }
        dispatch(actionChangeLoading(false))
    }, [dispatch])

    const handleUsername = e => {
        let value = e.target.value
        const regex = new RegExp('^[A-Za-z0-9]*$' , 'g')
        if(regex.test(value)) {
            setUsername(value)
        }else {
            toast('accept only a-z 0-9')
        }
    }

    const handlePassword = e => {
        let value = e.target.value
        const regex = new RegExp('^[A-Za-z0-9]*$' , 'g')
        if(regex.test(value)) {
            setPassword(value)
        }else {
            toast('accept only a-z 0-9')
        }
    }

    
    return (
        <>
            <div className="login">
                <form ref={formRef} onSubmit={handleLogin} action="">
                    <p>You can use a-z 0-9 for username and password, min 6 character</p>
                    <input onChange={handleUsername} value={Username} type="text" name="username" placeholder="username" />
                    <input onChange={handlePassword} value={Password} type="password" name="password" id="" placeholder="password" />
                    <select name="world" placeholder="Select Worlds">
                        {
                            Worlds.map(o => <option key={o._id} value={o._id}>{o.name} - x{o.speed} Speed</option>)
                        }
                    </select>
                    <div onClick={() => setShowModal(true)} className="show-info">What is Worlds? <FontAwesomeIcon icon={faCircleQuestion} /></div>
                    <button type="submit" style={{display : 'none'}}></button>
                    <Button text="Login" onClick={handleLogin} />
                    <Button text="Signup" onClick={handleSignup} />
                </form>
            </div>
            <Modal onClose={() => setShowModal(false)} show={ShowModal}>
                <div className="question">
                    <div className="title">What is Worlds?</div>
                    <div className="content">
                        <p>We have several worlds</p>
                        <p>Each of the worlds have it's own speed</p>
                        <p>Currently, we have only world x1 speed and world test x100 speed</p>
                    </div>
                    <div className="title">What is speed?</div>
                    <div className="content">
                        <p>Your resource generate, upgrade time, training time and moving time base on their own speed and world speed</p>
                        <p>Example your resource's building level 0 generate 100 per hour and world speed is 10, you will get 1000 per hour</p>
                        <p>Example you need to wait 900 seconds to training 1 Catapult, world speed is 10 so you only have to wait 90 seconds</p>
                    </div>
                    <div className="title">Which world should I choose?</div>
                    <div className="content">
                        <p>Yah If you read this line, I think you are new player on this game. You should spend a few minute on test world to see what we have</p>
                        <p>After understand this game, if you have time to manage your castle, feel free to choose x1 world</p>
                        <p>Thanks for reading</p>
                    </div>
                </div>
            </Modal>
        </>
    )
}

export default Login