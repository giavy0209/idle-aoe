import {model, Schema, Types} from 'mongoose'
import { IClan } from '../interfaces'

const ClanSchema = new Schema<IClan>({
})

const Clans = model<IClan>('clans' , ClanSchema)

export default Clans