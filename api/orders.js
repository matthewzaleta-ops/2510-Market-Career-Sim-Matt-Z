import express from "express";
const router = express.Router();
export default router;

import { createOrder, getOrderById, getOrderssByUserId } from "#db/orders";
import { createOrderProduct } from "#db/orders_products";
import { getProductsByOrderId } from "#db/products";
import requireUser from "#middleware/requireUser";
import requireBody from "#middleware/requireBody";

router.use(requireUser);

router.get("/", async (req, res) => {
  const orders = await getOrdersByUserId(req.user.id);
  res.send(orders);
});

router.post("/", requireBody(["name", "description"]), async (req, res) => {
  const { name, description } = req.body;
  const order = await createOrder(name, description, req.user.id);
  res.status(201).send(order);
});

router.param("id", async (req, res, next, id) => {
  const playlist = await getPlaylistById(id);
  if (!playlist) return res.status(404).send("Playlist not found.");

  if (playlist.user_id !== req.user.id)
    return res
      .status(403)
      .send("You do not have permission to access this playlist.");

  req.playlist = playlist;
  next();
});

router.get("/:id", (req, res) => {
  res.send(req.playlist);
});

router.get("/:id/tracks", async (req, res) => {
  const tracks = await getTracksByPlaylistId(req.playlist.id);
  res.send(tracks);
});

router.post("/:id/tracks", requireBody(["trackId"]), async (req, res) => {
  const { trackId } = req.body;
  const playlistTrack = await createPlaylistTrack(req.playlist.id, trackId);
  res.status(201).send(playlistTrack);
});
