import express from "express";

const app = express();
const PORT = process.env.PORT || 3000;

let resources = [
  { id: "1", name: "First resource", description: "Example resource" },
  { id: "2", name: "Second resource", description: "Another example" }
];

app.use(express.json());

function logger(req, res, next) {
  console.log(
    `[${new Date().toISOString()}] ${req.method} request targeting path: ${req.path}`
  );
  next();
}

app.use(logger);

app.get("/api/resources", (req, res) => {
  res.status(200).json({ data: resources });
});

app.get("/api/resources/:id", (req, res) => {
  const resource = resources.find((item) => item.id === req.params.id);

  if (!resource) {
    return res.status(404).json({ error: "Resource not found." });
  }

  res.status(200).json({ data: resource });
});

app.post("/api/resources", (req, res) => {
  const newResource = req.body;

  if (
    !newResource ||
    typeof newResource !== "object" ||
    Array.isArray(newResource)
  ) {
    return res.status(400).json({ error: "Request body must be a JSON object." });
  }

  const resource = {
    ...newResource,
    id: Date.now().toString()
  };

  resources.push(resource);
  res.status(201).json({ data: resource });
});

app.put("/api/resources/:id", (req, res) => {
  const index = resources.findIndex((item) => item.id === req.params.id);

  if (index === -1) {
    return res.status(404).json({ error: "Resource not found." });
  }

  if (
    !req.body ||
    typeof req.body !== "object" ||
    Array.isArray(req.body)
  ) {
    return res.status(400).json({ error: "Request body must be a JSON object." });
  }

  resources[index] = {
    ...resources[index],
    ...req.body,
    id: resources[index].id
  };

  res.status(200).json({ data: resources[index] });
});

app.delete("/api/resources/:id", (req, res) => {
  const index = resources.findIndex((item) => item.id === req.params.id);

  if (index === -1) {
    return res.status(404).json({ error: "Resource not found." });
  }

  const deletedResource = resources.splice(index, 1)[0];

  res.status(200).json({
    message: "Resource deleted successfully.",
    data: deletedResource
  });
});

app.use((req, res) => {
  res.status(404).json({ error: "Route not found." });
});

app.listen(PORT, () => {
  console.log(`Server actively listening on port ${PORT}`);
});
