const Connection = require('../util/connection')
const { Op } = require("sequelize");
const Constant = require('../config/constant');
const BusinessLocation = Connection.BusinessLocation;
const BusinessEntity = Connection.BusinessEntityModel;
const Contract = Connection.contract;
const ContractLocation = Connection.AssignContract;
const ContractType = Connection.contractType;
const City = Connection.City;

module.exports = {
  /**
   * Description : Check business Entity id exits or not.
   * @param {*} entityId 
   * @returns 
   */
  isBusinessEntityIdExits: async(entityId)=>{
    return await BusinessEntity.findAll({
      where: {
        status:Constant.ACTIVE,
        $col: Connection.sequelize.where(
          Connection.sequelize.fn("lower", Connection.sequelize.col("business_entity_id")),
          Connection.sequelize.fn("lower", entityId)
        ),
      },
    });
  },
  
  /**
   * Description : Check Assignment id is exits or not.
   * @param {*} assignmentId
   */
  isAssignmentExits: async (assignmentId) => {
    return await ContractLocation.findAll({
      where: {
        id: assignmentId,
      },
      raw: true,
    });
  },

  /**
   * Description : Check Business entityId is used or not.
   * @param {*} businessEntityId
   * @param {*} entityId
   */
  checkBusinessEntityIsUsed: async (businessEntityId, entityId) => {
    return await BusinessEntity.findAll({
      where: {
        id: {
          [Op.ne]: entityId,
        },
        business_entity_id: businessEntityId,
      },
    });
  },

  /**
   * Description :
   * @param {*} businessName
   * @param {*} businessId
   */

  isBusinessNameInUse: async (businessName, businessId) => {
    return await BusinessEntity.findAll({
      where: {
        id: {
          [Op.ne]: businessId,
        },
        $col: Connection.sequelize.where(
          Connection.sequelize.fn("lower", Connection.sequelize.col("name")),
          Connection.sequelize.fn("lower", businessName)
        ),
      },
    });
  },

  /**
   * Description : Location name check
   * @param {*} locationId
   * @param {*} locationName
   */
  checkOtherLocationName: async (locationId, locationName) => {
    return await BusinessLocation.findAll({
      where: {
        $col: Connection.sequelize.where(
          Connection.sequelize.fn(
            "lower",
            Connection.sequelize.col("location_name")
          ),
          Connection.sequelize.fn("lower", locationName)
        ),
        id: { [Op.ne]: locationId },
      },
      raw: true,
    });
  },
  /**
   * Description : Business Location name check.
   * @param {*} locationName
   */
  checkLocationName: async (locationName, cityId) => {
    return await BusinessLocation.findAll({
      where: {
        $col: Connection.sequelize.where(
          Connection.sequelize.fn(
            "lower",
            Connection.sequelize.col("location_name")
          ),
          Connection.sequelize.fn("lower", locationName)
        ),
        city_id: cityId,
      },
      raw: true,
    });
  },

  /**
   * Description : Business entity ID in alredy used.
   * @param {*} businessEntity
   */

  isBusinessEntityIDUse: async (entityId) => {
    return await BusinessEntity.findAll({
      where: Connection.sequelize.where(
        Connection.sequelize.fn(
          "lower",
          Connection.sequelize.col("business_entity_id")
        ),
        Connection.sequelize.fn("lower", entityId)
      ),
      raw: true,
    });
  },
  /**
   * Description : Business entity name alreay used.
   * @param {*} businessName
   */

  isBusinessNameUse: async (businessName) => {
    return await BusinessEntity.findAll({
      where: Connection.sequelize.where(
        Connection.sequelize.fn("lower", Connection.sequelize.col("name")),
        Connection.sequelize.fn("lower", businessName)
      ),
      raw: true,
    });
  },

  /**
   * Description : Check Type
   * @param {*} contractId
   */

  isContractTypeExits: async (contractTypeId) => {
    return await ContractType.findAll({
      where: {
        id: contractTypeId,
      },
      raw: true,
    });
  },

  /**
   * Descrption : Check Business location is used or not.
   * @param {*} id
   * @param {*} name
   */
  isContractExits: async (contractId) => {
    return await Contract.findAll({
      where: {
        id: contractId,
      },
      raw: true,
    });
  },

  /**
   * Descrption : Check Business location is used or not.
   * @param {*} id
   * @param {*} name
   */
  isBusinessLocationInUse: async (id, name) => {
    return await BusinessLocation.findAll({
      where: {
        $col: Connection.sequelize.where(
          Connection.sequelize.fn(
            "lower",
            Connection.sequelize.col("location_name")
          ),
          Connection.sequelize.fn("lower", name)
        ),
        id: { [Op.ne]: id },
      },
      raw: true,
    });
  },

  /**
   * Description : Check contract is already created or not.
   * @param {*} name
   * @param {*} id
   */

  isContractInUse: async (name, id) => {
    return BusinessEntity.findAll({
      attributes: ["id", "name"],
      where: {
        name: name,
        id: { [Op.ne]: id },
      },
      raw: true,
    });
  },

  /**
   * Description : Check canId with locations
   * @param {*} canId
   * @param {*} LocationId
   */
  isCanIdExitsOtheLocation: async (canId, LocationId) => {
    return BusinessLocation.findAll({
      where: {
        id: { [Op.ne]: LocationId },
        can_id: canId,
      },
    });
  },

  /**
   * Description : Check Business location is exits or not.
   * @param {} locationId
   */

  isBusinessLocation: async (locationId) => {
    return await BusinessLocation.findAll({
      where: {
        id: locationId,
      },
      raw: true,
    });
  },

  /**
   * Description : check Business entity
   * @param {*} businessId
   */

  isBusinessExits: async (businessId) => {
    return await BusinessEntity.findAll({
      where: {
        id: businessId,
      },
      raw: true,
    });
  },

  /**
   * Description : Active business entity check.
   * @param {*} businessId 
   * @returns 
   */
  isActiveBusinessExits: async (businessId)=>{
    return await BusinessEntity.findAll({
      where: {
        id: businessId,
        status:Constant.ACTIVE,
      },
      raw: true,
    });
  },

  /**
   * Description : Check Business location is already used or not.
   * @param {*} businessLocationId
   */
  isLocationContractUsed: async (businessLocationId) => {
    return await ContractLocation.findAll({
      where: {
        business_entity_location_id: businessLocationId,
      },
      raw: true,
    });
  },

  /**
   * Description : Match location is exits with given entity.
   * @param {*} locationId
   * @param {*} entityId
   */

  matchEntityLocation: async (locationId, entityId) => {
    return await BusinessLocation.findAll({
      where: {
        id: locationId,
        entity_id: entityId,
      },
      raw: true,
    });
  },

  /**
   * Description : Check Assign contract is exits or not.
   * @param {*} assignmentId
   * @param {*} entityId
   * @param {*} locationId
   */
  isAssignContractLocationExits: async (assignmentId, entityId, locationId) => {
    return await ContractLocation.findAll({
      where: {
        id: assignmentId,
        entity_id: entityId,
        business_entity_location_id: locationId,
      },
      raw: true,
    });
  },

  /**
   * Description : Check city id is exists or not.
   * @param {*} cityId
   */
  isCityExits: async (cityId) => {
    return await City.findAll({
      where: {
        id: cityId,
      },
      raw: true,
    });
  },

  /**
   * Description: Check CAN ID already exits or not.
   * @param {*} businessId
   */
  isCanIdExits: async (canId) => {
    return await BusinessLocation.findAll({
      where: {
        can_id: canId,
      },
      raw: true,
    });
  },

  /**
   * Description : Check contract name already exits or not.
   * @param {*} name
   */
  isContractInUse: async (name) => {
    return await Contract.findAll({
      attributes: ["id", "name"],
      where: {
        status:Constant.ACTIVE,
        $col: Connection.sequelize.where(
          Connection.sequelize.fn("lower", Connection.sequelize.col("name")),
          Connection.sequelize.fn("lower", name)
        ),
      },
      raw: true,
    });
  },

  /**
   * Description :
   * @param {*} assignId
   */
  isContractAssignExits: async (assignId) => {
    return await ContractLocation.findAll({
      where: {
        id: assignId,
      },
      raw: true,
    });
  },

  /**
   * Description : Assingn business location
   * @param {Assign contract} entityId
   */

  isEntityLocationAssign: async (entityId) => {
    
    return await ContractLocation.findAll({
      attributes: ['id', 'business_entity_location_id', 'entity_id','business_entity_locations.location_name'],
      include: [
        {
          model: BusinessLocation,
          required: true,
          attributes: [],
        },
      ],
      where: {
        entity_id: entityId,
      },
      raw: true,
    });
  },

  /**
   * 
   * @param {*} locationId 
   * @returns 
   */
  
  isEntityLocationAssignCheck:async (locationId) => {
    
    return await ContractLocation.findAll({
      attributes: ['id', 'business_entity_location_id', 'entity_id','business_entity_locations.location_name','contracts.name'],
      include: [
        {
          model: BusinessLocation,
          required: true,
          attributes: [],
        },
        {
          model:Contract,
          required:true,
          attributes:[]
        }
      ],
      where: {
        business_entity_location_id: locationId,
        status:Constant.ACTIVE
      },
      raw: true,
    });
  },


};
