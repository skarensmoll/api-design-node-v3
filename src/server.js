import express from 'express'
import { json, urlencoded } from 'body-parser'
import morgan from 'morgan'
import cors from 'cors'

export const app = express()
const router = express.Router()

/* router.get('/me', (req, res) => {
  res.send({ me: 'hello' })
})

app.use('/api', router)
 */

const routes = ['get /cat', 'get /cat/:id', 'post /cat', 'put /cat', 'delete /cat/:id']

// we could use either the router or app to handle this scenario.
app
  .router('/cat')
  .get((req, res) => {
    res.send('here is a cat')
  })
  .post((req, res) => {
    res.send('the cat was entered correctly')
  })

app.disable('x-powered-by')

app.use(cors())
app.use(json())
app.use(urlencoded({ extended: true }))
app.use(morgan('dev'))

const customMiddleWare = (req, res, next) => {
  console.log('login')
  req.myData = 'hey there from the middleware'
  next()
}

// Although this is possible, the logic on this get
// should be in the middleware
app.get('/', (req, res, next) => {
  next()
})

app.get('/', (req, res) => {
  res.send('executed')
})

/// CHECKING ORDER
// I am running the custom middleware before the callback
// if I wanted to have that customMiddleWare run for all the gets or posts...etc
// then we put app.use(customMiddleWare())
app.get('/', [customMiddleWare], (req, res) => {
  res.send({ message: '1', data: req.myData })
})

app.get('/', [customMiddleWare], (req, res) => {
  res.send({ message: '2', data: req.myData })
})

app.post('/', (req, res) => {
  console.log(req.body)
  res.send({ message: 'ok' })
})

app.get('/users/*', (req, res) => {
  res.send({ path: req.path, message: ':o Love programming!' })
})

app.get('/users/:id', (req, res) => {
  res.send({ path: req.path, message: ':o Love programming!' })
})

export const start = () => {
  app.listen(3000, () => {
    console.log('server is on 3000')
  })
}
