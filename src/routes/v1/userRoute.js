const { getUser, getAllUser, postlUser, updateUser, updateBulkUser, deleteUser } = require("../../controllers/userController");

const router = require("express").Router();

router

    /** 
    * @api  {get} /user All User 
    * @apiDescription  Get All User 
    * @apiPermission  {get} /user All User 
    *  
    * @apiHeader {string} Authorization User's access token
    * 
    * @apiPram {Number{1-}}  [page=1] List page
    * @apiHeader {Number{1-100}} [limit=10] User Per page
    * 
    * @apiSuccess {Object[]} all the tools
    * 
    * @apiError {Unzuthorized 401} Unauthorization  Only authenticated users can access the data
    * @apiErro {Unzuthorized 403} Forbidden Only admins can access the data
     */
    .get("/", getUser)
    .get("/all", getAllUser)
    .post("/", postlUser)
    .put("/", updateUser)
    .patch("/", updateBulkUser)
    .delete("/", deleteUser)

module.exports = router;