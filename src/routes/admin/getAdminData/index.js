const Admin=require("../../../modals/admin/index");


let getAdminCred= async (req, res) =>{
  
    try {
     
       let adminData=await Admin.findById({_id: req.userId});
        return res.status(200).json({
          status: 200,
          data: adminData,
          message: "Get data successfully",
        });
      
    } catch (err) {
      return res.status(400).json({ status: 400, message: err.message });
    }
  };

  module.exports=getAdminCred;