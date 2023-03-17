const dataSource = require("../utils").dataSource;
const Wilder = require("../entity/Wilder");
const Skill = require("../entity/Skill");
const Grade = require("../entity/Grade");
const In = require("typeorm").In;

module.exports = {
    create: async (req, res) => {
        try {
            const wilderToAdd = await dataSource
                .getRepository(Wilder)
                .save({ name: req.body.wilderName });
            const wilderObject = await dataSource
                .getRepository(Wilder)
                .findOneByOrFail({ id: wilderToAdd.id });
                console.log(wilderObject);
            const skillsToAdd = await dataSource
                .getRepository(Skill)
                .findBy({ name: In(req.body.skillsToAdd) });
                console.log(skillsToAdd);
            wilderObject.skills.push(...skillsToAdd);
            await dataSource
                .getRepository(Wilder)
                .save(wilderObject);
            res.send("Wilder created successfully");
        } catch(err) {
            console.log(err);
            res.send("Error while creating wilder");
        }
    },
    read: async (req, res) => {
        try {
            const data = await dataSource.getRepository(Wilder).find({order: {id: "DESC"}});
            res.send(data);
        } catch(err) {
            res.send("Error while retrieving data", err);
        }
    },
    delete: async (req, res) => {
        try {
            await dataSource.getRepository(Wilder).delete(req.params.id);
            res.send(`Wilder has been successfully deleted`);
        } catch(err) {
            console.log(err);
            res.send("Error while deleting wilder");
        }
    },
    update: async (req, res) => {
        try {
            await dataSource.getRepository(Wilder).update(req.params.id, req.body);
            res.send(`Wilder has been successfully updated`);
        } catch(err) {
            console.log(err);
            res.send("Error while updating wilder");
        }
    },
    addSkill: async (req, res) => {
        try {
            const wilderToUpdate = await dataSource
                .getRepository(Wilder)
                .findOneByOrFail({ name: req.body.wilderName });
            // console.log to make sure we've got a wilder
            console.log(wilderToUpdate);
            const skillToAdd = await dataSource
                .getRepository(Skill)
                .findOneByOrFail({ name: req.body.skillName });
            // console.log to make sure we've got a skill
            console.log(skillToAdd);
            wilderToUpdate.skills.push(skillToAdd);
            await dataSource
                .getRepository(Wilder)
                .save(wilderToUpdate);
            res.send('Skill successfully added to the Wilder !');
        } catch (err) {
            console.log(err);
            res.send('Error while adding the skill.');
        }
    },
    rateSkill: async (req, res) => {
        try {
            const wilderToUpdate = await dataSource
                .getRepository(Wilder)
                .findOneByOrFail({ name: req.body.wilderName });
            // console.log to make sure we've got a wilder
            console.log(wilderToUpdate);
            const skillToRate = await dataSource
                .getRepository(Skill)
                .findOneByOrFail({ name: req.body.skillName });
            // console.log to make sure we've got a skill
            console.log(skillToRate);
            const rating = await dataSource
                .getRepository(Grade)
                .save({ rating: req.body.rating, skills: skillToRate, wilders: wilderToUpdate });
            res.send('Skill successfully rated !');
        } catch (err) {
            console.log(err);
            res.send('Error while rating the skill.');
        }
    },
};