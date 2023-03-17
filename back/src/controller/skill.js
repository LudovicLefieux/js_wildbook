const dataSource = require("../utils").dataSource;
const Skill = require("../entity/Skill");

module.exports = {
    create: (req, res) => {
        dataSource
            .getRepository(Skill)
            .save(req.body)
            .then(() => {
                res.send("Skill created successfully");
            })
            .catch((err) => {
                res.send("Error while creating skill", err);
            });
    },
    read: async (req, res) => {
        try {
            const data = await dataSource.getRepository(Skill).find();
            res.send(data);
        } catch(err) {
            res.send("Error while retrieving data", err);
        }
    },
    delete: async (req, res) => {
        try {
            await dataSource.getRepository(Skill).delete(req.params.id);
            res.send(`Skill has been successfully deleted`);
        } catch(err) {
            console.log(err);
            res.send("Error while deleting skill");
        }
    },
    update: async (req, res) => {
        try {
            await dataSource.getRepository(Skill).update(req.params.id, req.body);
            res.send(`Skill has been successfully updated`);
        } catch(err) {
            console.log(err);
            res.send("Error while updating skill");
        }
    },
};