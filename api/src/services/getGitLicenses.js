const axios = require("axios");
const License = require('../models/pg/License');
const Permission = require('../models/pg/Permission');
const config = require("../../config/axios");
const LICENSES_URL = "https://api.github.com/licenses";

exports.getGitLicenses = async (req, res, next) => {

  try {
    
    const {data} = await axios.get(LICENSES_URL,config);

    const licenses = await Promise.all(data.map(async (license) => {

        const newLicense = {
          id: license.key,
          name: license.name,
        }
  
        const response = await axios.get(`${LICENSES_URL}/${license.key}`,config);

        newLicense.description = response.data.description;

        newLicense.permissions = response.data.permissions;

        return newLicense;
  
    }));

    //Storing licenses on the database
    const storedLicenses = await Promise.all(licenses.map(async (license) => {
  
      const {id,description} = license;
      dbLicense = await License.create({id, description});

      return dbLicense;

    }));

    const permissions = await Promise.all(licenses.map(async (license) => {
  
      const {id,permissions} = license;
      
      return await Promise.all(permissions.map(async (permission) => {

          return await Permission.create({licenseid:id, name: permission});

      }));

    }));

    if(!!storedLicenses) {

      return res.status(200).json({licenses: storedLicenses});

    } else {

      const error = new Error('Não foi possível persistir os dados.');
      error.statusCode = 500;
      throw error; 

    }  

  } catch (error) {
    next(error);
  }
};

