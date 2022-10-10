const { Router } = require('express'); 
const { postPokemon } = require('../utils/index.js');
const { Pokemon , T_types } = require("../db");
const router = Router();

router.post("/", async (req, res) => {
    try {
        const dataFromForm = req.body; // --> dataFromForm is an object
        let validateName = await Pokemon.findOne({where: {name: dataFromForm.name}})
        if(validateName !== null) return res.status(404).send("This name already exists, try another one.")
        await postPokemon(dataFromForm);
        return res.status(200).send("Pokemon was created succesfully");
    } catch (error) {
        res.status(404).send('Error while creating Pokemon');
    }
})

// router.delete("/delete", (async(req, res) => {
//     try {
//         const deleted = await Pokemon.destroy({
//             where: {name: "UNKNOWN"}
//         })
//         return res.status(200).send(`${deleted} pokemon deleted succesfully`);
//     } catch (error) {
//         res.status(404).send('Error while deleting Pokemon');
//     }
// }))

module.exports = router;