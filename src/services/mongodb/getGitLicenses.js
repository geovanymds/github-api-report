const axios = require("axios");
const License = require('../../models/mongo/License');
const config = require("../../../config/axios");
const LICENSES_URL = "https://api.github.com/licenses";

exports.getGitLicenses = async (req, res, next) => {

  try {
    
    const {data} = await axios.get(LICENSES_URL,config);

    let licenses = await Promise.all(data.map(async (license) => {

        const newLicense = {
          key: license.key,
        }
  
        const response = await axios.get(`${LICENSES_URL}/${license.key}`,config);

        newLicense.description = response.data.description;

        newLicense.permissions = response.data.permissions;

        return newLicense;
  
    }));

    //Storing licenses on the database

    licenses = await License.create(licenses);

    if(!!licenses) {

      return res.status(200).json(licenses);

    } else {

      const error = new Error('Não foi possível persistir os dados.');
      error.statusCode = 500;
      throw error; 

    }  

  } catch (error) {
    next(error);
  }
};

