const APLHA_SPEICAL = "Name can contain alphabets & special characters only";
const APLHA_NUM_SPEICAL =
  "Name can be alphanumberic with special characters only";
const REQUIRED = "Field is required";
const phoneRegex = /^([1-9])(\d{7})$/;

export const addSubAdminValidator = (values) => {
  let errors = {};
  if (!values.email) {
    errors.email = REQUIRED;
  } else if (
    !/^([a-zA-Z0-9_.-])+@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/.test(
      values.email
    )
  ) {
    errors.email = "Enter a valid email address";
  }

  if (!values.mobile_number) {
    errors.mobile_number = "Phone number is required.";
  }
  if (!values.password) {
    errors.password = REQUIRED;
  }
  if (!values.name) {
    errors.name = REQUIRED;
  }
  console.log(errors);

  return errors;
};

const checkEmail = (value) => {
  if (
    !/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
      value
    )
  ) {
    return true;
  } else if (
    value.includes('"') ||
    value.includes("'") ||
    value.includes(",") ||
    value.includes(" ")
  ) {
    return true;
  } else {
    return false;
  }
};

export const loginValidator = (values) => {
  let errors = {};
  if (!values.phone) {
    errors.phone = REQUIRED;
  }

  if (!values.password) {
    errors.password = REQUIRED;
  }

  return errors;
};

export const capacityValidator = (values) => {
  let errors = {};
  if (!values.capacity) {
    errors.capacity = REQUIRED;
  }

  return errors;
};
export const typesValidator = (values) => {
  let errors = {};
  if (!values.type) {
    errors.type = REQUIRED;
  }

  return errors;
};

export const categoryValidator = (values, image) => {
  let errors = {};
  if (!values.category_name) {
    errors.category_name = REQUIRED;
  }
  if (!image) {
    errors.category_image = REQUIRED;
  }

  return errors;
};

export const machineValidator = (values, image) => {
  let errors = {};
  if (!values.machine_name) {
    errors.machine_name = REQUIRED;
  }
  if (!values.machine_number) {
    errors.machine_number = REQUIRED;
  }
  if (!values.category_id) {
    errors.category_id = REQUIRED;
  }
  if (!values.capacity_id) {
    errors.capacity_id = REQUIRED;
  }
  if (!values.machine_type_id) {
    errors.machine_type_id = REQUIRED;
  }
  if (!values.description) {
    errors.description = REQUIRED;
  }

  if (!image) {
    errors.category_image = REQUIRED;
  }

  return errors;
};

export const signUPValidator = (values) => {
  let errors = {};
  if (!values.first_name) {
    errors.first_name = REQUIRED;
  }
  if (!values.last_name) {
    errors.last_name = REQUIRED;
  }

  if (!values.phone) {
    errors.phone = REQUIRED;
  }
  if (!values.company_name) {
    errors.company_name = REQUIRED;
  }

  if (!values.company_name) {
    errors.company_name = REQUIRED;
  }
  if (values.email) {
    if (
      !/^([a-zA-Z0-9_.-])+@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/.test(
        values.email
      )
    ) {
      errors.email = "Enter a valid email address";
    }
  }

  if (!values.password) {
    errors.password = REQUIRED;
  }
  if (!values.confirm_password) {
    errors.confirm_password = REQUIRED;
  } else if (values.password !== values.confirm_password) {
    errors.confirm_password = "Password does not match";
  }
  console.log(errors);
  return errors;
};

export const changePasswordValidator = (values) => {
  let errors = {};
  if (!values.old_password) {
    errors.old_password = REQUIRED;
  }
  if (!values.password) {
    errors.password = REQUIRED;
  }
  if (!values.confirm_password) {
    errors.confirm_password = REQUIRED;
  } else if (values.password !== values.confirm_password) {
    errors.confirm_password = "Password does not match";
  }
  console.log(errors);
  return errors;
};

export const contactvalidator = (values) => {
  let errors = {};
  if (!values.name) {
    errors.name = REQUIRED;
  }
  if (!values.email) {
    errors.email = REQUIRED;
  } else if (
    !/^([a-zA-Z0-9_.-])+@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/.test(
      values.email
    )
  ) {
    errors.email = "Enter a valid email address";
  }
  if (!values.phone) {
    errors.phone = "Phone number is required.";
  }

  if (!values.business_name) {
    errors.business_name = REQUIRED;
  }

  if (!values.message) {
    errors.message = REQUIRED;
  }

  return errors;
};

export const profileValidator = (values) => {
  let errors = {};
  if (!values.first_name) {
    errors.first_name = REQUIRED;
  }
  if (!values.last_name) {
    errors.last_name = REQUIRED;
  }
  if (!values.company_name) {
    errors.company_name = REQUIRED;
  }

  console.log(errors);
  return errors;
};

export const countryValidator = (values) => {
  let errors = {};
  if (!values.name) {
    errors.name = REQUIRED;
  }
  if (!values.country_code) {
    errors.country_code = REQUIRED;
  }

  return errors;
};

export const orderValidator = (values) => {
  let errors = {};
  if (!values.order_scope) {
    errors.order_scope = REQUIRED;
  }
  if (!values.delivery_location) {
    errors.delivery_location = REQUIRED;
  }
  if (!values.comments_remarks) {
    errors.comments_remarks = REQUIRED;
  }
  if (!values.order_scope) {
    errors.order_scope = REQUIRED;
  }
  if (!values.work_start_date) {
    errors.work_start_date = REQUIRED;
  }

  return errors;
};

export const inquiryValidator = (values) => {
  console.log(values);
  let errors = {};
  if (values.user !== "") {
  }
  if (!values.price_type) {
    errors.price_type = REQUIRED;
  }
  if (!values.delivery_date) {
    errors.delivery_date = REQUIRED;
  }
  if (!values.location) {
    errors.location = REQUIRED;
  }
  if (!values.requirment) {
    errors.requirment = REQUIRED;
  }

  return errors;
};
