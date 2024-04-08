
const jsonServer = require('json-server')

const blogserver=jsonServer.create()

const router=jsonServer.router('db.json')

const middileware=jsonServer.defaults()

blogserver.use(middileware)
blogserver.use(router)

const port =5000;

blogserver.listen(port,()=>{
    console.log(`server is up and running in port ${port}`)
})
