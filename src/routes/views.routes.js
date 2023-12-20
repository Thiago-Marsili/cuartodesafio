import { Router } from 'express'
import productos from '../app.js'

const viewsRouters = Router()

viewsRouters.get('/',(req, res) => {
    res.render('home', { productos })
})
viewsRouters.get('/realtimeproducts',(req, res) => {
    res.render('realTimeProducts')
})

export default viewsRouters