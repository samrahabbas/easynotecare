const validator = require("validator");
// const UserService = require("../services/users");
// const AccountDetailsService = require("../services/accounts_details");
// const MailService = require("../services/mail");
// const SkillService = require("../services/skill");
// const ClientRateService = require("../services/ClientRate");
exports.getAllclients = async (req, res, next) => {
    try {
      let pageNo = parseInt(req.query.page) || 1;
      let perPage = parseInt(req.query.perPage) || 10;
  
      const query = {
        isDeleted: false,
        company_id: req.user.company_id,
      };
      if (req.query.ClientId) {
        query.ClientId = req.query.ClientId;
      }
      if (req.query.ClientType) {
        query.ClientType = req.query.ClientType;
      }
  
    
  
      // if (req.query.name) {
      //   query.$or = [
      //     {
      //       first_name: new RegExp(req.query.name || "", "i"),
      //     },
      //     {
      //       middle_name: new RegExp(req.query.name || "", "i"),
      //     },
      //     {
      //       last_name: new RegExp(req.query.name || "", "i"),
      //     },
      //   ];
      // }
  
      // if (req.query.company_name) {
      //   query.company_name = new RegExp(req.query.company_name || "", "i");
      // }
  
      // if (req.query.email) {
      //   query.email = new RegExp(req.query.email || "", "i");
      // }
  
      // if (req.query.Phone) {
      //   query.$or = [
      //     {
      //       phone_1: new RegExp(req.query.Phone || "", "i"),
      //     },
      //     {
      //       phone_2: new RegExp(req.query.Phone || "", "i"),
      //     },
      //   ];
      //   // query.Phone = new RegExp(req.query.Phone || "", "i");
      // }
  
      // if (req.query.skill) {
      //   query.skill = req.query.skill;
      // }
      // let search = req.query.search || ''
  
      // if (req.query.filter == "deleted") {
      //   query.isDeleted = true;
      // }
      // const inquiries = await ClientService.getInquiries(query, perPage, pageNo);
      const [ clients, total] = await Promise.all([
        ClientService.getclients(query, perPage, pageNo),
        ClientService.getTotalclients(query)
      ])
      return res.status(200).json({
        success: true,
        data: {
          clients,
          total
        },
        message: "ok",
        status: 200,
      });
    } catch (error) {
      return next(error);
    }
  };
