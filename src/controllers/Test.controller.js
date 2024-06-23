import { initWeddingControllers } from "./wedding.controller.js";

export const testController = async (WeddingModel) => {
  const { createWedding, updateWedding, deleteWedding, getAllWeddings } =
    await initWeddingControllers(WeddingModel);

  const wedding = await createWedding(Date.UTC(2024, 7, 1, 12, 20, 0));
  await updateWedding(
    wedding.getDataValue("id"),
    Date.UTC(2025, 7, 1, 16, 20, 0)
  );
  deleteWedding(wedding.getDataValue("id"));

  console.log(await getAllWeddings());
};
