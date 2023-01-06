import prisma from "../../../lib/prisma";

export default async function handle(req, res) {
  const { id, title, image, uri } = req.body;
  const result = await prisma.post.create({
    data: {
      id: id,
      title: title,
      image: image,
      uri: uri,
    },
  });
  res.json(result);
}
