/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_1654525312")

  // add field
  collection.fields.addAt(3, new Field({
    "cascadeDelete": false,
    "collectionId": "pbc_3016807592",
    "hidden": false,
    "id": "relation544531829",
    "maxSelect": 999,
    "minSelect": 0,
    "name": "pages",
    "presentable": false,
    "required": false,
    "system": false,
    "type": "relation"
  }))

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_1654525312")

  // remove field
  collection.fields.removeById("relation544531829")

  return app.save(collection)
})
