// Initialisation
const express = require("express");
const cors = require("cors");
const dataSource = require("./utils").dataSource;
const wilderController = require("./controller/wilder");
const skillController = require("./controller/skill");

const app = express();
app.use(express.json());

const port = 5000;

app.use(cors());

// Route
app.get("/", (req, res) => {
    res.send("Hello from Express");
});

// Routes Wilders
app.post("/api/wilder", wilderController.create);
app.get("/api/wilder", wilderController.read);
app.put("/api/wilder/addSkill", wilderController.addSkill);
app.put("/api/wilder/rateSkill", wilderController.rateSkill);
app.delete("/api/wilder/:id", wilderController.delete);
app.put("/api/wilder/:id", wilderController.update);

// Routes Skills
app.post("/api/skill", skillController.create);
app.get("/api/skill", skillController.read);
app.delete("/api/skill/:id", skillController.delete);
app.put("/api/skill/:id", skillController.update);

//Start Server
const start = async () => {
    await dataSource.initialize();
    app.listen(port, () => {
        console.log(`Server started on ${port}`);
    });
};

start();