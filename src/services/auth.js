import db from '../models'
import bcrypt from 'bcryptjs'
import { raw } from 'express'
import jwt from 'jsonwebtoken'
import { v4 } from 'uuid'
require('dotenv').config()

const hashPassword = password =>bcrypt.hashSync(password,bcrypt.genSaltSync(12))

export const registerService =({phone,name,password})=> new Promise(async(resolve, reject)=>{
    try {
        console.log({name,phone,password});
        const response = await db.User.findOrCreate({
            where: {phone},
            defaults:{
                name,
                phone,
                password: hashPassword(password),
                id: v4()
            }
        })
        const token = response[1] && jwt.sign({id:response[0].id,phone:response[0].phone},process.env.SECRET_KEY,{expiresIn:'2d'});
        resolve({
            err:token?0:2,
            msg: token?'Register is succesfully':'Phone number is already used',
            token:token||null
        })
    } catch (error) {
        reject(error)
    }
})

export const loginService =({phone,password})=> new Promise(async(resolve, reject)=>{
    try {
        //console.log({name,phone,password});
        const response = await db.User.findOne({
            where: {phone} ,
            raw          
        })
        console.log(response);
        const checkPass = response && bcrypt.compareSync(password, response.password)
        const token = checkPass && jwt.sign({id:response.id,phone:response.phone},process.env.SECRET_KEY,{expiresIn:'2d'});
        resolve({
            err:token?0:2,
            msg: token?'Login is succesfully': response ?'Wrong password':'Phone wrong',
            token:token||null
        })
    } catch (error) {
        reject(error)
    }
})