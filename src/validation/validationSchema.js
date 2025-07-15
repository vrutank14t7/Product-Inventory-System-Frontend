import * as yup from "yup";
import { formatErrorObject } from "../helpers";
const validationOptions = { abortEarly: false };

const emailPattern = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/;

export const validateSchema = async (schema, formData, setError) => {
  try {
    await schema.validate(formData, validationOptions);
    return true;
  } catch (err) {
    console.log(err, "error at validation");
    if (err instanceof yup.ValidationError) {
      const modifiedErrors = err.inner.reduce((acc, error) => {
        acc[error.path] = { message: error.message };
        return acc;
      }, {});
      setError(formatErrorObject(modifiedErrors));
      console.log(formatErrorObject(modifiedErrors), "validation errors");
    }
    return false;
  }
};

const validateFile = (value) => {
  if (!value) {
    return true;
  }

  if (Array.isArray(value)) {
    for (const file of value) {
      if (!file || !(file instanceof File)) {
        return false;
      }
    }
    return true;
  }
  return false;
};

// ? USAGE
// const isValid = await validateSchema(LoginSchema, formData, setErrors);
// if (!isValid) {
//   return;
// }

export const LoginSchema = yup.object().shape({
  email: yup
    .string()
    .matches(emailPattern, "Invalid Email Id")
    .email()
    .required("Email is required"),
  password: yup
    .string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters long")
    .matches(
      /[@$!%*?&]/,
      "Password must contain at least one special character"
    )
    .matches(/[a-z]/, "Password must contain at least one lowercase letter")
    .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
    .matches(/[0-9]/, "Password must contain at least one number"),
});

export const signupSchema = yup.object().shape({
  name: yup.string().required(),
  email: yup
    .string()
    .matches(emailPattern, "Invalid Email Id")
    .email()
    .required("Email is required"),
  password: yup
    .string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters long")
    .matches(
      /[@$!%*?&]/,
      "Password must contain at least one special character"
    )
    .matches(/[a-z]/, "Password must contain at least one lowercase letter")
    .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
    .matches(/[0-9]/, "Password must contain at least one number"),
  confirm_password: yup
    .string()
    .oneOf([yup.ref("password"), null], "Passwords must match")
    .required("Confirm Password is required"),
});

export const updatePasswordSchema = yup.object().shape({
  new_password: yup.string().required(),
  confirm_password: yup
    .string()
    .oneOf([yup.ref("confirm_password"), null], "Passwords must match")
    .required("Confirm Password is required"),
  email: yup
    .string()
    .matches(emailPattern, "Invalid Email Id")
    .email()
    .required("Email is required"),
});

export const sendVerificationCodeSchema = yup.object().shape({
  email: yup
    .string()
    .matches(emailPattern, "Invalid Email Id")
    .email()
    .required("Email is required"),
});

export const verifyVerificationCodeSchema = yup.object().shape({
  email: yup
    .string()
    .matches(emailPattern, "Invalid Email Id")
    .email()
    .required("Email is required"),
  verification_code: yup.string().required(),
});

export const UserSchema = yup.object().shape({
  is_verified: yup.boolean(),
  is_blocked: yup.boolean(),
  password: yup.string().required(),
  is_app_user: yup.boolean(),
  name: yup.string(),
  agro_name: yup.string().required(),
  contact_number: yup.string().required(),
  gst_number: yup.string(),
  email: yup.string().email("Invalid email format").required(),
  billing_address: yup.object().shape({
    address_line: yup.string(),
    city: yup.string(),
    state: yup.string(),
    pincode: yup.string(),
    coordinates: yup.array().of(yup.number().positive()).length(2),
  }),
  billing_equals_shipping: yup.boolean(),
  shipping_address: yup.object().shape({
    address_line: yup.string(),
    city: yup.string(),
    state: yup.string(),
    pincode: yup.string(),
    coordinates: yup.array().of(yup.number().positive()).length(2),
  }),

  profile: yup.array().default([]),
  gst_certificate: yup.array().default([]),
  aadhar_card: yup.array().default([]),
  bank_details: yup.array().default([]),
  other_document: yup.array().default([]),
});
export const UpdateUserSchema = yup.object().shape({
  is_verified: yup.boolean(),
  is_blocked: yup.boolean(),
  is_app_user: yup.boolean(),
  name: yup.string(),
  contact_number: yup.string(),
  gst_number: yup.string().length(15),
  email: yup.string().email("Invalid email format"),
  billing_address: yup.object().shape({
    address_line: yup.string(),
    city: yup.string(),
    state: yup.string(),
    pincode: yup.string(),
    coordinates: yup.array().of(yup.number().positive()).length(2),
  }),
  billing_equals_shipping: yup.boolean(),
  shipping_address: yup.object().shape({
    address_line: yup.string(),
    city: yup.string(),
    state: yup.string(),
    pincode: yup.string(),
    coordinates: yup.array().of(yup.number().positive()).length(2),
  }),

  profile: yup.array().default([]),
  gst_certificate: yup.array().default([]),
  aadhar_card: yup.array().default([]),
  bank_details: yup.array().default([]),
  other_document: yup.array().default([]),
});

export const ProductSchema = yup.object().shape({
  product_name: yup.string().required(),
  product_code: yup.string().required(),
  description: yup.string().required(),
  price: yup.number().min(1).required(),
  quantity: yup.number().min(0).required(),
  category_id: yup.array().of(yup.string()).required(),
});

export const UpdateProductSchema = yup.object().shape({
  product_name: yup.string(),
  product_code: yup.string(),
  description: yup.string(),
  price: yup.number().min(1),
  quantity: yup.number().min(0),
  category_id: yup.array().of(yup.string()),
});

export const BrandSchema = yup.object().shape({
  brand_name: yup.string().required(),
  tag_line: yup.string(),
  logo: yup
    .mixed()
    .test("fileType", "Invalid file type", validateFile)
    .required("Logo is required"),
});

export const UpdateBrandSchema = yup.object().shape({
  brand_name: yup.string(),
  tag_line: yup.string(),
  logo: yup.mixed().test("fileType", "Invalid file type", validateFile),
});

export const CategorySchema = yup.object().shape({
  category_name: yup.string().required(),
  description: yup.string().required(),
});

export const updateCategorySchema = yup.object().shape({
  category_name: yup.string(),
  description: yup.string(),
  logo: yup.mixed().test("fileType", "Invalid file type", validateFile),
});

// export const OfferSchema = yup.object().shape({
//   image: yup.array().default([]),
//   description: yup.string().required(),
//   product_id: yup.string().required(),
//   offer_name: yup.string().required(),
//   offer_code: yup.string().required(),
// });

export const OfferSchema = yup.object().shape({
  description: yup.string().required(),
  offer_code: yup.string().required(),
  offer_name: yup.string().required(),
  product_specified: yup.boolean().default(false),
  products: yup
    .array()
    .of(yup.string())
    .when("product_specified", {
      is: true,
      then: (schema) => schema.min(1).required(),
      otherwise: (schema) => schema.notRequired(),
    })
    .nullable(),
  category_specified: yup.boolean().default(false),
  categories: yup
    .array()
    .of(yup.string())
    .when("category_specified", {
      is: true,
      then: (schema) => schema.min(1).required(),
      otherwise: (schema) => schema.notRequired(),
    })
    .nullable(),
  offer_type: yup
    .string()
    .oneOf([
      "percentage",
      "fixed_amount",
      "tiered",
      "buy_x_get_y",
      "bundle",
      "referral",
      "coupon",
    ])
    .required(),
  percentage_discount: yup
    .number()
    .min(0.1)
    .max(99.99)
    .positive()
    .when("offer_type", {
      is: "percentage",
      then: (schema) => schema.required(),
      otherwise: (schema) => schema.notRequired(),
    })
    .nullable(),
  fixed_amount_discount: yup
    .number()
    .positive()
    .when("offer_type", {
      is: "fixed_amount",
      then: (schema) => schema.required(),
      otherwise: (schema) => schema.notRequired(),
    })
    .nullable(),
  tiers: yup
    .array()
    .when("offer_type", {
      is: "tiered",
      then: (schema) =>
        schema
          .of(
            yup.object().shape({
              min_order_value: yup.number().positive().required(),
              discount: yup.number().positive().required(),
            })
          )
          .min(1)
          .required(),
      otherwise: (schema) => schema.notRequired(),
    })
    .nullable(),
  buy_quantity: yup
    .number()
    .min(1)
    .positive()
    .when("offer_type", {
      is: "buy_x_get_y",
      then: (schema) => schema.required(),
      otherwise: (schema) => schema.notRequired(),
    })
    .nullable(),
  get_quantity: yup
    .number()
    .min(1)
    .positive()
    .when("offer_type", {
      is: "buy_x_get_y",
      then: (schema) => schema.required(),
      otherwise: (schema) => schema.notRequired(),
    })
    .nullable(),
  bundle_items: yup
    .array()
    .when("offer_type", {
      is: "bundle",
      then: (schema) =>
        schema
          .of(
            yup.object().shape({
              product_id: yup.string().required(),
              quantity: yup.number().min(1).positive().required(),
              price: yup.number().min(1).positive().required(),
            })
          )
          .min(1)
          .required(),
      otherwise: (schema) => schema.notRequired(),
    })
    .nullable(),
  referral_code: yup
    .string()
    .when("offer_type", {
      is: "referral",
      then: (schema) => schema.required(),
      otherwise: (schema) => schema.notRequired(),
    })
    .nullable(),
  referral_amount: yup
    .number()
    .min(1)
    .positive()
    .when("offer_type", {
      is: "referral",
      then: (schema) => schema.required(),
      otherwise: (schema) => schema.notRequired(),
    })
    .nullable(),
  coupon_code: yup
    .string()
    .when("offer_type", {
      is: "coupon",
      then: (schema) => schema.required(),
      otherwise: (schema) => schema.notRequired(),
    })
    .nullable(),
  coupon_details: yup
    .object()
    .when("offer_type", {
      is: "coupon",
      then: (schema) =>
        schema
          .shape({
            coupon_type: yup
              .string()
              .oneOf(["percentage", "amount"])
              .required(),
            value: yup
              .number()
              .min(0.1)
              .max(99.99)
              .positive()
              .when("coupon_type", {
                is: "percentage",
                then: (schema) => schema.required(),
                otherwise: (schema) => schema.notRequired(),
              })
              .required(),
          })
          .required(),
      otherwise: (schema) => schema.notRequired(),
    })
    .nullable(),
});

export const tierSchema = yup.object().shape({
  min_order_value: yup.number().positive().required(),
  discount: yup.number().positive().required(),
});
export const bundelSchema = yup.object().shape({
  product_id: yup.string().required(),
  quantity: yup.number().positive().required(),
  price: yup.number().positive().required(),
});

export const UpdateOfferSchema = yup.object().shape({
  image: yup.array().default([]),
  description: yup.string(),
  product_id: yup.string(),
  offer_name: yup.string(),
  offer_code: yup.string(),
});

export const NotificationSchema = yup.object().shape({
  image: yup.array().default([]),
  description: yup.string().required(),
  product_id: yup.string().required(),
});
export const UpdateNotificationSchema = yup.object().shape({
  image: yup.array().default([]),
  description: yup.string(),
  product_id: yup.string(),
});

export const orderProductSchema = yup.object().shape({
  product_id: yup.string().required(),
  quantity: yup.number().positive().integer().min(1).required(),
  offer_id: yup.string().optional(),
});
export const returnOrderProductSchema = yup.object().shape({
  product_id: yup.string().required(),
  quantity: yup.number().positive().integer().min(1).required(),
});

export const OrderSchema = yup.object().shape({
  user_id: yup.string().required(),
  products: yup.array().of(orderProductSchema).min(1).required(),
});
export const returnOrderSchema = yup.object().shape({
  reason: yup.string().required(),
});

export const updateOrderSchema = yup.object().shape({
  status: yup
    .string()
    .oneOf([
      "confirm",
      "rejected",
      "pending",
      "delivered",
      "cancelled",
      "return_requested",
      "return_accepeted",
      "return_rejected",
      "return_fulfilled",
    ])
    .required(),

  is_creditable: yup.boolean().nullable(),

  credit_duration: yup
    .number()
    .min(1)
    .max(90)
    .positive()
    .when("is_creditable", {
      is: true,
      then: (schema) => schema.required(),
      otherwise: (schema) => schema.notRequired(),
    }),

  order_notes: yup.string().nullable(),

  payment_method: yup
    .string()
    .oneOf(["cash", "online"])
    .when("status", {
      is: (status) => ["delivered", "return_fulfilled"].includes(status),
      then: (schema) => schema.optional(),
      otherwise: (schema) => schema.notRequired(),
    }),

  reason: yup.string().when("status", {
    is: (status) => ["return_rejected", "rejected"].includes(status),
    then: (schema) => schema.required(),
    otherwise: (schema) => schema.notRequired(),
  }),
});

export const roleSchema = yup.object().shape({
  role_name: yup.string().required("Role name is required"),
  is_active: yup.boolean().default(false),
});

export const roleUpdateSchema = yup.object().shape({
  role_name: yup.string(),
  is_active: yup.boolean().default(false),
});

export const languageSchema = yup.object().shape({
  lang_name: yup.string().required("Language name is required"),
  lang_code: yup.string().required("Language code is required"),
});
export const updateLanguageSchema = yup.object().shape({
  lang_name: yup.string(),
});

export const billSchema = yup.object().shape({
  payment_status: yup.string().oneOf(["paid", "unpaid"]).required(),
  payment_method: yup.string().when("payment_status", {
    is: (status) => ["paid"].includes(status),
    then: (schema) => schema.required(),
    otherwise: (schema) => schema.notRequired(),
  }),
});

export const addMoneySchema = yup.object().shape({
  user_id: yup.string().required(),
  amount: yup.number().min(1).positive().required(),
  description: yup.string(),
});

export const addVendorSchema = yup.object().shape({
  name: yup.string().required(),
  agro_name: yup.string().required(),
  contact_number: yup.string().length(10).required(),
  pesticide_license_no: yup.string(),
  seed_license_no: yup.string(),
  fertilizer_license_no: yup.string(),
  gst_number: yup.string().length(15),
  pan_number: yup.string().length(10),
  email: yup.string().email().required(),
  address: yup
    .object()
    .shape({
      address_line: yup.string(),
      city: yup.string(),
      state: yup.string(),
      pincode: yup.string(),
      coordinates: yup.array().of(yup.number()).length(2),
    })
    .required(),
  bank_details: yup
    .object()
    .shape({
      bankName: yup.string().required(),
      accountNumber: yup.string().required(),
      ifscCode: yup.string().required(),
      branchName: yup.string().required(),
    })
    .required(),
});

export const updateVendorSchema = yup.object().shape({
  name: yup.string(),
  agro_name: yup.string(),
  contact_number: yup.string().length(10),
  pesticide_license_no: yup.string(),
  seed_license_no: yup.string(),
  fertilizer_license_no: yup.string(),
  gst_number: yup.string().length(15),
  pan_number: yup.string().length(10),
  email: yup.string().email(),
  address: yup.object().shape({
    address_line: yup.string(),
    city: yup.string(),
    state: yup.string(),
    pincode: yup.string(),
    coordinates: yup.array().of(yup.number()).length(2),
  }),
  bank_details: yup.object().shape({
    bankName: yup.string(),
    accountNumber: yup.string(),
    ifscCode: yup.string(),
    branchName: yup.string(),
  }),
});

export const productSchema = yup.object().shape({
  product_id: yup.string().required(),
  quantity: yup.number().required(),
  lot_no: yup.string().required(),
  manufacture_date: yup.date().required(),
  expiry_date: yup.date().required(),
});

export const addPurchaseOrderSchema = yup.object().shape({
  vendor_id: yup.string().required(),
  contact_name: yup.string().required(),
  contact_number: yup.string().required(),
  products: yup.array().of(productSchema).required(),
  advance_payment_amount: yup.number().default(0),
  status: yup
    .string()
    .oneOf([
      "transit",
      "completed",
      "due",
      "routing_payment",
      "advance_payment",
    ])
    .required(),
  payment_status: yup.string().oneOf(["paid", "unpaid"]).required(),
  order_notes: yup.string().default(""),
});

export const updatePurchaseOrderSchema = yup.object().shape({
  contact_name: yup.string(),
  contact_number: yup.string(),
  products: yup.array().of(productSchema),
  status: yup
    .string()
    .oneOf([
      "transit",
      "completed",
      "due",
      "routing_payment",
      "advance_payment",
    ]),
  payment_status: yup.string().oneOf(["paid", "unpaid"]),
  order_notes: yup.string().default(""),
});
