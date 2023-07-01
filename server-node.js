require("dotenv").config()
const http = require("http")

const fs = require("fs");


function requestcontrolles(req, res) {
     //url que ruta ingresa el usuario
     const url = req.url
     //el tipo de metodo
     const method = req.method

     if (method === 'GET' && url === "/") {
          //metadata de la respuesta dada
          res.setHeader('Content-Type', 'text/html')
          //
          fs.readFile('./public/index.html', function (err,file) {
               if (err) {
                    console.log('hubo un error')
               }
               res.write(file)
          //
               res.end()
          
              
          })
        return
      }
     if (method === 'GET' && url === "/about") {
          res.setHeader('Content-Type', 'text/html')
          fs.readFile('./public/about.html', function (err,file) {
               if (err) {
                    console.log('hubo un error')
                    return
               }
               res.write(file)
          //
          res.end()
          
               
          })
          //
          return
     }
     

     res.setHeader('Content-Type', 'text/html;charset=utf-8')
          //
          res.write("<h1>hola mundo pagina no encontrada</h1>")
          //
          res.end()
        
     
     

}

//peticiones que llegan realizamos este funcion que controla las acciones
//configurar nuesto servidor de la libreria http,el crateserver contiene un evento que se realiza al obtner un reques una peticionen este caso requestcontrolles
const server = http.createServer(requestcontrolles)


const PORT=process.env.PORT
server.listen(process.env.PORT, function () {
    console.log("corriedo en " + PORT);

})