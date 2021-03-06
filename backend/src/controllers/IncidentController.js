const connection = require("../database/connection");

module.exports = {
  async index(request, response) {
    const { page = 1 } = request.query;

    const [count] = await connection("incidents").count();

    const incidents = await connection("incidents")
      .join("ongs", "ongs.id", "=", "incidents.ong_id")
      .limit(5)
      .offset((page - 1) * 5)
      .select([
        "incidents.*",
        "ongs.name",
        "ongs.email",
        "ongs.whatsapp",
        "ongs.city",
        "ongs.uf",
      ]);

    response.header("X-Total-Count", count["count(*)"]);
    return response.json(incidents);
  },
  async show(request, response) {
    const { id } = request.params;

    const ong_id = await connection("incidents")
      .where({ id })
      .select("*")
      .first();

    return response.json(ong_id);
  },
  async store(request, response) {
    const ong_id = request.headers.authorization;
    const { title, description, value } = request.body;

    const [id] = await connection("incidents").insert({
      title,
      description,
      value,
      ong_id,
    });

    return response.json({ id });
  },
  async update(request, response) {
    const { id } = request.params;
    const ong_id = request.headers.authorization;

    const { title, description, value } = request.body;

    const incident = await connection("incidents")
      .where({ id })
      .select("ong_id")
      .first();

    if (incident.ong_id != ong_id)
      return response.status(401).json({ error: "Operation not permitted." });

    await connection("incidents")
      .where({ id, ong_id })
      .update({ title, description, value });

    return response.status(204).send();
  },
  async destroy(request, response) {
    const { id } = request.params;
    const ong_id = request.headers.authorization;

    const incident = await connection("incidents")
      .where("id", id)
      .select("ong_id")
      .first();

    if (incident.ong_id != ong_id)
      return response.status(401).json({ error: "Operation not permitted." });

    await connection("incidents").where("id", id).delete();

    return response.status(204).send();
  },
};
