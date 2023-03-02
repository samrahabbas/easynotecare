const  client  = require("../models/client");

class ClientService {
    getClient (req){
        return new client.findOne(req);
    }

    getClients(req = {}, perPage, pageNo) {
        return client.find(req)
        //   .populate("project", "title")
        //   .populate("jobType", "title")
        //   .populate("inquiryType", "title")
        //   .populate("customer", "first_name last_name email imageUrl")
          .skip((pageNo - 1) * perPage)
          .limit(perPage);
      }
}
module.exports = new ClientService();