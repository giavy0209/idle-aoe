import callAPI from "callAPI";
import Button from "components/Button";
import Modal from "components/Modal";
import { FC, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { actionChangeShowCreateClan } from "store/actions";

const CreateClan: FC = () => {
    const dispatch = useDispatch()
    const showCreateClan = useSelector((state: any) => state.showCreateClan)
    const formRef = useRef<any>()
    const handleSubmit = async (e?: any) => {
        if (e) {
            e.preventDefault()
        }
        const form = new FormData(formRef.current)
        const submitData: { [key: string]: any } = {}
        for (let field of form) {
            submitData[field[0]] = field[1]
        }

        if (showCreateClan?.type === 'create') {
            const res = await callAPI.post('/clan', submitData)
            if (res.status === 101) {
                toast("Clan's name must be 4-20 character")
            }
            if (res.status === 102) {
                toast("Clan's name is exist")
            }
            if (res.status === 1) {
                toast('Create clan successfully')
                dispatch(actionChangeShowCreateClan({ show: false }))
            }
        }
        if (showCreateClan?.type === 'edit') {
            const res = await callAPI.post(`/clan/${showCreateClan?.clan}`, submitData)
            if (res.status === 1) {
                toast('Edit clan successfully')
                dispatch(actionChangeShowCreateClan({ show: false }))
            }
        }
    }
    return (
        <>
            <Modal show={showCreateClan?.show} onClose={() => dispatch(actionChangeShowCreateClan({ show: false }))} >
                <div className="create-clan">
                    <div className="title">{showCreateClan?.type === 'create' ? 'Create' : 'Edit'} Clan</div>
                    <form ref={formRef} action="" onSubmit={handleSubmit}>
                        {showCreateClan?.type === 'create' && <div className="input">
                            <div className="label">Name</div>
                            <input type="text" name="name" />
                        </div>}
                        <div className="input">
                            <div className="label">Description</div>
                            <input type="text" name="description" />
                        </div>
                        <div className="input">
                            <div className="label">Website/chatgroup/contact</div>
                            <input type="text" name="website" />
                        </div>
                        <div className="input">
                            <div className="label">Min population (0-50,000)</div>
                            <input type="number" name="minPopulation" />
                        </div>
                        <button type="submit" style={{ display: 'none' }}></button>
                        <Button text={showCreateClan?.type === 'create' ? 'Create' : 'Edit'} onClick={handleSubmit} />
                    </form>
                </div>
            </Modal>
        </>
    )
}

export default CreateClan