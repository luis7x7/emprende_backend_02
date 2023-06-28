const dotenv = {
     config: function () {
          console.log('metodo de nodevm');
          
     },
}
dotenv.config()
const http = require("http")




function requestcontrolles() {
     console.log('hola mundo!!!!!!!!!!!!');
     
     

}

//peticiones que llegan realizamos este funcion que controla las acciones 
//configurar nuesto servidor 
const server = http.createServer(requestcontrolles)
const PORT=process.env.PORT
server.listen(process.env.PORT, function () {
    console.log("corriedo en "+PORT);

})