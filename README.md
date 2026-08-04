## Generate `requirements.txt`

To generate the `requirements.txt` file containing only the required project dependencies, run the following command from the project root:

```bash
pipreqs . --force --ignore .venv,__pycache__,.git,node_modules,build,dist
```

**Options used:**

- `--force` – Overwrites the existing `requirements.txt` file.
- `--ignore` – Excludes the specified directories from dependency scanning:
  - `.venv`
  - `__pycache__`
  - `.git`
  - `node_modules`
  - `build`
  - `dist`