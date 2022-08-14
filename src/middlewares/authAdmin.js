import { User } from '../models/Users.js'
import jwt from "jsonwebtoken"

import "dotenv/config"

const { REFRESH_TOKEN_SECRET } = process.env

export const authAdmin = async (req, res, next) => {
  try {
    const authorizationToken = req.header("Authorization")

    if(!authorizationToken) return res.status(401).send({message: "Autorización invalida"})
    
    const { id } = jwt.verify(authorizationToken, REFRESH_TOKEN_SECRET)
    
    const user = await User.findOne({ where: {user_id: id }})


    if(user.user_is_admin || user.user_is_staff){
      next()
    }else{
      return res.status(401).send({message: "Autorización invalida"})
    }
  } catch (error) {
    return res.status(500).send({ message: `Ha ocurrido un error: ${error}`})
  }
}