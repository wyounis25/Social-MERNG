const User = require('../../models/User')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { userInputError } = require('apollo-server')
const { validateRegisterInput, validateLoginInput } = require('../../validate')
const {SECERT} = require('../../config')
function generateToken(user) {
  return jwt.sign(
    {
      id: user.id,
      email: user.email,
      username: user.username,
    },
    SECERT,
    { expiresIn: '1h' },
  )
}


module.exports = {
  Mutation: {
    async login(_, { username, password }) {
      const { errors, valid } = validateLoginInput(username, password)

      if(!valid){
        throw new UserInputError('Errors', { errors })
      }
      const user = await User.findOne({ username })
      if (!user) {
        errors.general = 'User not found'
        throw new UserInputError('User not found', { errors })
      }
      const match = await bcrypt.compare(password, user.password)
      if (!match) {
        errors.general = 'Wrong Credentials'
        throw new UserInputError('Wrong Credentials', { errors })
      }
      const token = generateToken(res)

      return {
        ...res._doc,
        id: res.id,
        token,
      }
    },
    async register(
      _,
      { registerInput: { username, email, password, confirmPassword } },
    ) {
      const { valid, errors } = validateRegisterInput(
        username,
        email,
        password,
        confirmPassword,
      )

      if (!valid) {
        throw new userInputError('Errors', { errors })
      }
      password = await bcrypt.hash(password, 12)
      const user = await User.findOne({ username })
      if (user) {
        throw new userInputError('Username is taken', {
          errors: {
            username: 'this username is taken',
          },
        })
      }
      const newUser = new User({
        email,
        username,
        password,
        createdAt: new Date().toISOString(),
      })
      const res = await newUser.save()

      const token = generateToken(res)

      return {
        ...res._doc,
        id: res.id,
        token,
      }
    },
  },
}
