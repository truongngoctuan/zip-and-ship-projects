# zip-and-ship-projects

This project is used to sync ASP.NET projects between workplace and home by taking only nescesary files
* [x] Zip projects, remove `bin`, `obj`, `packages`, `node_modules`, `bower_components`...
* [ ] Ship to `dest` folder to be synced by other services.
* [ ] Buile a shared `pakages` folder to save spaces.
* [ ] Ship `packages` folder to `dest` folder.
* [ ] Extract all these files to correct places.

### Goals of these scripts
* Save time copy, delete redunrant folders.
* Ship with nessesary materials, including a shared `pakages` folder across projects

##An example of the file `folder-list.json`
```json
{
    "configs": {},
    "projects": [
        {
            "source": "the/path/to/project/folder",
            "filename": "output-file-name.zip",
            "includes": [
                "!(packages)/!(bin|obj|node_modules|bower_components)/**/*.*",
                "!(packages)/*.*",
                "*.*",
                ".*/**/*"
            ],
            "syncs": [
                "packages/**/*"
            ]
        }
    ]
}
```