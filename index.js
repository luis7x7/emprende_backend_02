require("dotenv").config();

const express = require("express");
const app = express();
const port = process.env.PORT;
const mongoose = require("mongoose");

const schema = mongoose.Schema;

mongoose
  .connect(process.env.MONGODB_URL) 
  .then(() => {
    console.log("exitosa conex!!!");
  })
  .catch((err) => console.log("error de conex", { err }));

const task_schema = new schema({
  name: String,
  done: Boolean,
  //createby:
});

//modelo pára interactuat
const task = mongoose.model("Task", task_schema, "tasks");

//interarcuat

//archivos estaticos
//middleware oara archivos estativos
//recive una funcion y debuelve una funcion
app.use(express.static("public"));

//middlware para parcer el body de la request
//solo para json esto para parce la data
//app.use(express.json())

//pasamois una funcion anonima
app.use((req, res, next) => {
  //preposicionamiento
  console.log("ruta no especificada");
  console.log("middleware 1");
  //next continua en la logica
  next();
});

//unba funcion es retornar por otra funcion o metodo
const logger = {
  logthis: (whatToLog) => {
    //retorna funcion
    return (req, res, next) => {
      console.log("middleware 2", whatToLog);
      next();
    };
  },
};
//el metodo logthis retorna otra funcion o metodo
app.use("/luis", logger.logthis("logueame esta"));

app.get("/api/tasks", function (req, res) {
  task
    .find()
    .then((tasks) => {
      res.status(200).json({ ok: true, data: tasks });
    })
    .catch((err) => {
      res.status(400).json({ ok: false, message: "errror al obtener datos" });
    });
});

app.post("/api/tasks", express.json(), function (req, res) {
  //tenemos que preposesarla para concatenar
  const body = req.body;
  console.log({ body });
  task
    .create({
      name: body.text,
      done: false,
      hello: "hola",
    })
    .then((createdtask) => {
      res
        .status(201)
        .json({ ok: true, message: "exito al crear tarea", data: createdtask });
    })
    .catch((error) => {
      res.status(400).json({ ok: false, message: "error al crear tarea" });
    });
});

app.put("/api/tasks/:id", express.json(), function (req, res) {
  //tenemos que preposesarla para concatenar
  const body = req.body;
  const id = req.params.id;
  task
    .findByIdAndUpdate(id, {
      name: body.text,
    })
    .then((updatetask) => {
      res.status(200).json({
        ok: true,
        message: "exito al actualizar tarea",
        data: updatetask,
      });
    })
    .catch((err) => {
      res.status(400).json({ ok: false, message: "error al editar tarea" });
    });
});

app.delete("/api/tasks/:id", function (req, res) {
  //tenemos que preposesarla para concatenar
  const id = req.params.id;
  task
    .findByIdAndRemove(id)
    .then((delete_task) => {
      res.status(200).json({ ok: true, data: delete_task });
    })
    .catch(() => {
      res.status(400).json({ ok: false, message: "erro al delete" });
    });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
