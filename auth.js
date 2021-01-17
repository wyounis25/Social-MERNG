const {AuthenticationError} = require('apollo-server');


const jwt = require('jsonwebtoken')
const {SECERT} = require('./config')

module.exports = {context} => {
    const authHeader = context.req.header.authorization
    if(authHeader){
        const token = authHeader.split('Bearer')[1]
        if(token){
            try{
                const user = jwt.verify(token,SECERT)
                return user
            } catch (err){
                throw new AuthenticationError('Invalid/Expired token')
            }
        }
        throw new Error('Authenication token was invalid')
    }
    throw new Error('Authenication header must be provided ')

}
