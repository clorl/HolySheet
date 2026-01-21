/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_4149738850")

  // update collection data
  unmarshal({
    "createRule": "",
    "updateRule": "@request.auth.id = id",
    "viewRule": ""
  }, collection)

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_4149738850")

  // update collection data
  unmarshal({
    "createRule": null,
    "updateRule": null,
    "viewRule": null
  }, collection)

  return app.save(collection)
})
