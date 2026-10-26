const { z } = require("zod");

const createListingSchema = z.object({
  title: z.string().trim().min(3).max(100),
  description: z.string().trim().min(10).max(2000),
  price: z.coerce.number().finite().min(0),
  location: z.string().trim().min(2),
  country: z.string().trim().min(2),
  image: z.string().trim().optional(),
});

const updateListingSchema = z.object({
  title: z.string().trim().min(3).max(100).optional(),
  description: z.string().trim().min(10).max(2000).optional(),
  price: z.coerce.number().finite().min(0).optional(),
  location: z.string().trim().min(2).optional(),
  country: z.string().trim().min(2).optional(),
  image: z.string().trim().optional(),
}).refine(
  (data) => Object.keys(data).length > 0,
  { message: "Provide at least one field to update" }
);

module.exports = {
  createListingSchema,
  updateListingSchema,
};