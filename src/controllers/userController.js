const usersData = require('../files/data.json');
const { randomNumberGenerate, randomIdGenerated, lastIdNumber } = require('../lib/randomNumberGenerate');
const fs = require('fs');

// GET /user/random A random user
const getUser = async (req, res) => {
    try {
        const randomNumber = randomNumberGenerate();
        const userResponseData = usersData[randomNumber];
        return res.status(200).send(userResponseData)
    } catch (error) {
        return res.status(500).send("Server Error.")
    }
};

// GET /user/all A list of random users || with LIMIT  || with shorted
const getAllUser = async (req, res) => {
    try {
        const { limit } = req?.query;
        const userDataShort = usersData.sort((a, b) => a.id - b.id)
        if (limit) {
            if (limit <= 0 || limit > usersData.length) {
                return res.status(200).send({ limit: `limit should be 1-10 . You give limit ${limit}. So no data found.` })
            }
            else {
                let limitedData = [];
                for (let i = 0; i < limit; i++) {
                    limitedData.push(userDataShort[i])
                }
                return res.status(200).send(limitedData);
            }
        }
        return res.status(200).send(userDataShort)
    } catch (error) {
        return res.status(500).send("Server Error.")
    }
};

// POST /user/save Save a random user || with Validate 
const postlUser = async (req, res) => {
    try {
        const { gender, name, contact, address, photoUrl } = req?.body;
        if (!gender || !name || !contact || !address || !photoUrl) {
            return res.status(411).send({
                status: false,
                message: "Missing Info. User Data must be contain this formate: id, gender, name, contact, address, photoUrl",
                example: {
                    "gender": "male",
                    "name": "John Doe",
                    "contact": "+1234567890",
                    "address": "123 Main St, City",
                    "photoUrl": "https://example.com/john_doe.jpg"
                }
            })
        }
        else {
            const newData = {
                id: randomIdGenerated(),
                name,
                gender,
                contact,
                address,
                photoUrl,
            };
            const jsonData = fs.readFile(
                'src/files/data.json',
                (err, data) => {
                    if (data) {
                        const existingData = [...JSON.parse(data), newData];
                        fs.writeFile(
                            'src/files/data.json',
                            JSON.stringify(existingData, null, 2), // Add formatting for readability
                            (err, data) => {
                                if (err) {
                                    return res.status(411).send("File Save Failed.");
                                }
                                else {
                                    return res.status(201).send("File Save Success.");
                                }
                            }
                        );
                    }
                    // console.log('err:', err);
                }
            );
            // console.log('jsonData:', jsonData);
        };

    } catch (error) {
        return res.status(500).send("Server Error. Post users");
    }
};

// PUT /user/update Update a random user
const updateUser = async (req, res) => {
    try {
        const { id, gender, name, contact, address, photoUrl } = req?.body;
        const userDataFromclient = req?.body;
        if (!id || !gender || !name || !contact || !address || !photoUrl) {
            return res.status(411).send("Id or gender  or name  or contact  or address  or photoUrl is missing.")
        };
        const numericId = Number(id, 10);
        userDataFromclient.id = numericId;
        if (isNaN(numericId)) {
            return res.status(411).send("ID is not a valid number");
        };
        if (!Number.isInteger(numericId)) {
            return res.status(411).send("ID is not a valid number its contains decimal");
        };
        if (numericId < 1 || numericId > lastIdNumber()) {
            return res.status(411).send({
                status: false,
                message: `id should be 0- ${lastIdNumber()}`
            })
        };

        const isUserExist = usersData.filter(
            (user) => user.id !== numericId
        );
        if (isUserExist) {
            const modifiedUserData = usersData.map(
                (user) => {
                    if (user.id == numericId) {
                        return userDataFromclient;
                    }
                    else {
                        return user;
                    }
                }
            );
            fs.writeFile(
                'src/files/data.json',
                JSON.stringify(modifiedUserData, null, 2), // Add formatting for readability
                (err, data) => {
                    if (err) {
                        return res.status(411).send("Failed to update");
                    }
                    else {
                        return res.status(201).send("Successfully Updated");
                    }
                }
            )
        }
        else {
            return res.status(200).send(`ID: ${id} Not Found.`)
        }
    } catch (error) {
        return res.status(500).send("Server Error. Delete Users");
    }
};

// PATCH /user/bulk-update update multiple users
const updateBulkUser = async (req, res) => {
    try {
        const userArrayDataFromClient = req.body;

        const validData = userArrayDataFromClient.map(user => {
            const { id, gender, name, contact, address, photoUrl } = user;
            if (!id || !gender || !name || !contact || !address || !photoUrl) {
                return false;
            }
            const numericId = Number(id);
            if (isNaN(numericId)) {
                return false
            }
            if (!Number.isInteger(numericId)) {
                return false;
            };
            if (numericId < 1 || numericId > lastIdNumber()) {
                return false;
            }

            return user;
        });

        if (validData.includes(false)) {
            return res.status(411).send("Id or gender  or name  or contact  or address  or photoUrl is missing.")
        }

        const updatedUsers = usersData.map(user => {
            const updatedUser = validData.find(u => u.id === user.id);
            if (updatedUser) {
                return updatedUser;
            }
            return user;
        });

        fs.writeFileSync(
            'src/files/data.json',
            JSON.stringify(updatedUsers, null, 2) // Add formatting for readability
        );

        return res.status(201).send("Successfully Updated");
    } catch (error) {
        console.error(error);
        return res.status(500).send("Server Error. Update Users");
    }
};

// DELETE /user/ delete
const deleteUser = async (req, res) => {
    try {
        const { id } = req?.query;
        if (!id) {
            return res.status(411).send("Id is missing for delete")
        };
        const numericId = Number(id, 10);
        if (isNaN(numericId)) {
            return res.status(411).send("ID is not a valid number");
        };
        if (!Number.isInteger(numericId)) {
            return res.status(411).send("ID is not a valid number its contains decimal");
        };
        if (numericId < 1 || numericId > lastIdNumber()) {
            return res.status(411).send({
                status: false,
                message: `id should be 0- ${lastIdNumber()}`
            })
        };

        const isUserAvailable = usersData.find(
            (user) => user.id === numericId
        );
        if (!isUserAvailable) {
            return res.status(201).send(`The user contain this id: ${id} is not avilable at this moment.`);
        }

        const isUserExist = usersData.filter(
            (user) => user.id !== numericId
        );
        if (isUserExist) {
            const jsonData = fs.readFile(
                'src/files/data.json',
                (err, data) => {
                    if (data) {
                        const userData = JSON.parse(data);
                        const userDataWithDeleted = userData.filter(
                            (user) => user.id !== numericId
                        )
                        fs.writeFile(
                            'src/files/data.json',
                            JSON.stringify(userDataWithDeleted, null, 2), // Add formatting for readability
                            (err, data) => {
                                if (err) {
                                    return res.status(411).send("Deleted Unsuccessfull.");
                                }
                                else {
                                    return res.status(201).send("Successfully Deleted.");
                                }
                            }
                        );
                    }
                }
            );
        }
        else {
            return res.status(200).send(`ID: ${id} Not Found.`)
        }
    } catch (error) {
        return res.status(500).send("Server Error. Delete Users");
    }
};

module.exports = {
    getUser,
    getAllUser,
    postlUser,
    updateUser,
    updateBulkUser,
    deleteUser,
};