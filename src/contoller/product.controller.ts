import { Request, Response } from 'express';
import {
  CreateProductInput,
  DeleteProductInput,
  GetProductInput,
  UpdateProductInput,
} from '../schema/product.schema';
import {
  createProduct,
  deleteProduct,
  findProduct,
  findUpdateProduct,
} from '../service/product.service';
import logger from '../utils/logger';

export async function createProductHandler(
  req: Request<{}, {}, CreateProductInput['body']>,
  res: Response
) {
  const userId = res.locals.user._id; // Use middleware to ensure we have res.locals.user
  const body = req.body;
  const product = await createProduct({ ...body, user: userId }); // TODO use try catch to add error handling for this

  return res.send(product);
}

export async function updateProductHandler(
  req: Request<UpdateProductInput['params']>,
  res: Response
) {
  const userId = res.locals.user._id;
  const productId = req.params.productId;
  const update = req.body;

  const product = await findProduct({ productId });

  if (!product) return res.sendStatus(404);

  // user is trying to update someone else's product
  if (String(product.user) !== userId) return res.sendStatus(403);

  const updatedProduct = await findUpdateProduct({ productId }, update, {
    new: true,
  });

  return res.send(updatedProduct);
}

export async function getProductHandler(
  req: Request<GetProductInput['params']>,
  res: Response
) {
  const productId = req.params.productId;
  const product = await findProduct({ productId });

  if (!product) return res.sendStatus(404);

  return res.send(product);
}

export async function deleteProductHandler(
  req: Request<DeleteProductInput['params']>,
  res: Response
) {
  const userId = res.locals.user._id;
  const productId = req.params.productId;

  const product = await findProduct({ productId });

  if (!product) return res.sendStatus(404);

  // user is trying to update someone else's product
  if (String(product.user) !== userId) return res.sendStatus(403);

  await deleteProduct({ productId });

  return res.sendStatus(200);
}
