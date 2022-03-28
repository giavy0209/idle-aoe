import { faCircleQuestion } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import callAPI from "callAPI";
import Button from "components/Button";
import Modal from "components/Modal";
import storage from "helpers/storage";
import { FC, useCallback, useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { actionChangeLoading} from "store/actions";

const Login: FC = function () {
    const formRef = useRef<any>()
    const dispatch = useDispatch()
    const [Worlds, setWorlds] = useState<any[]>([])
    const [ShowModal, setShowModal] = useState(false)
    useEffect(() => {
        callAPI.get('/worlds')
            .then(res => {
                setWorlds([...res.data])
            })
    }, [])
    const handleLogin = useCallback(async (e ? : any) => {
        console.log(e);
        
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
        const submitData = {}
        for (let field of form) {
            submitData[field[0]] = field[1]
        }
        dispatch(actionChangeLoading(true))
        const res = await callAPI.post('/signup', submitData)
        if (res.status === 100) {
            toast('Username is exist')
        }
        if (res.status === 1) {
            toast('Register success, please login')
        }
        dispatch(actionChangeLoading(false))
    }, [dispatch])
    return (
        <>
            <div className="login">
                <form ref={formRef} onSubmit={handleLogin} action="">
                    <input type="text" name="username" placeholder="username" />
                    <input type="password" name="password" id="" placeholder="password" />
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
                        <p>Each of the worlds have it's own speed, start date, end date</p>
                    </div>
                    <div className="title">What is speed?</div>
                    <div className="content">
                        <p>Your resource generate, upgrade time, training time and moving time base on their own speed and world speed</p>
                        <p>Example your resource's building level 0 generate 100 per hour and world speed is 10, you will get 1000 per hour</p>
                        <p>Example you need to wait 900 seconds to training 1 Catapult, world speed is 10 so you only have to wait 90 seconds</p>
                    </div>
                    <div className="title">Why worlds have end date?</div>
                    <div className="content">
                        <p>After a few month play, you will upgrade your building at maxium level</p>
                        <p>You also have alot of resource, a great army</p>
                        <p>New player join to that world can't hurt you</p>
                        <p>So we need to reset that world, top player will get some bonus on next round</p>
                        <p>Top clan's owner (on development) also will get some bonus on next round</p>
                        <p>World will stop at 00:00 UTC time on end date, we will calculate top player, reset every thing and send bonus to top player/top clan's owner</p>
                    </div>
                    <div className="title">So I have to start again?</div>
                    <div className="content">
                        <p>Yes, every player will start again</p>
                        <p>We have long term world (World 1) with 0.1x speed, this world will never end, this world for busy people, it's so slow, almost time you have to wait. With some people, waiting is boring. If you don't want to way too much, select faster world</p>
                        <p>Test world with 100x speed will reset weekly, on this world you can try many type of unit on your army</p>
                    </div>
                    <div className="title">So all the time I spend on it will be for nothing?</div>
                    <div className="content">
                        <p>At I said above, top player will get some bouns for next round. but it's not too much to unbalance.</p>
                        <p>And other player will get nothing. Yes you will lost all time you have been spent</p>
                        <p>But I hope you have good time with this game, with your clanmate</p>
                        <p>And you will have more experience after each round, this is also advantage with new player</p>
                        <p>I don't want only old player on 1 world, they will make the game boring</p>
                        <p>Thanks for understand!</p>
                    </div>
                    <div className="title">Which world should I choose?</div>
                    <div className="content">
                        <p>Yah If you read this line, I think you are new player on this game. You should spend a few minute on test world to see what we have</p>
                        <p>After understand this game, if you have time to manage your castle, feel free to choose 10x world</p>
                        <p>I know it will be hard to play on 10x world with new player but don't worry keep upgrade your castle, training army, you will be fine.</p>
                        <p>If you are busy person, 1x world is best choose. It's will reset after 6 months. You only need to spend few minute per day to manage your castle</p>
                        <p>0.1x world is for every one, it's so f*king slow, maybe you can take a look on your castle once per week - so f*king boring but it's still there for super busy people</p>
                        <p>Thanks for reading</p>
                    </div>
                    <div className="title">Start and end date</div>
                    <div className="content">
                        <p>Test world - 100x speed</p>
                        <p>-Start date : 2022-03-25</p>
                        <p>-End date : 2022-1-04</p>
                        <p>--------</p>
                        <p>World 1 - 0.1x speed</p>
                        <p>-Start date : 2022-03-25</p>
                        <p>-End date : Never(Maybe)</p>
                        <p>--------</p>
                        <p>World 2 - 1x speed</p>
                        <p>-Start date : 2022-03-25</p>
                        <p>-End date : 2022-09-25</p>
                        <p>--------</p>
                        <p>World 3 - 2x speed</p>
                        <p>-Start date : 2022-03-25</p>
                        <p>-End date : 2022-06-25</p>
                        <p>--------</p>
                        <p>World 4 - 10x speed</p>
                        <p>-Start date : 2022-03-25</p>
                        <p>-End date : 2022-04-25</p>
                    </div>

                </div>
            </Modal>
        </>
    )
}

export default Login