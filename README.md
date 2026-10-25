# Quickstart for Bitasmbl project (Express)

## 1) Install Bitasmbl-CLI package

```bash
npm i bitasmbl-cli
```

## 2) Run bitasmbl command to set up the project

```bash
bitasmbl pull --repoUrl https://github.com/he1snber8/Bitasmbl_cappucinno_8bd_71_58 --appId 71 --repoId 58
```

## 3) Enter into the main directory and start coding!

```bash
cd Bitasmbl_cappucinno_8bd_71_58
```

## Customize requirements in a way you like

Bitasmbl organizes development into requirements. Each requirement describes a feature or implementation goal and can define suggested file locations through a `paths` array.

The `paths` property acts as a mapping guideline, helping contributors understand where related code should live.

You can customize `paths` mappings through the `bitasmbl.json` file.

{"Requirement":"Define note model","Paths":["**/src/models/**","**/src/entities/**","**/src/types/**"]}

## Requirement Evaluation

Bitasmbl includes a requirement evaluation workflow that lets contributors select a task and submit work for validation.

Run:

```bash
bitasmbl evaluate
```

Example output:

<pre>
? Available Requirements:

❯ [<span style="color:#9333ea">1</span>] <span style="color:#9333ea"> Define portfolio layout </span>            [3]
  [2] Build showcase components            [3]
  [3] Implement navigation routing         [3]
</pre>

`[x]` on the right represents the number of submission attempts remaining for a requirement.

## Example evaluation result

```js
/*
|--------------------------------------------------------------------------
| BITASMBL EVALUATION
|--------------------------------------------------------------------------
| REQUIREMENT:
| Implement product catalog API
|
| SCORE: 15/100
| STATUS: FAIL ✕
|
| INSIGHT:
| The endpoint returns static product data and does not use a data layer,
| validation, filtering, service abstraction, or asynchronous persistence.
|--------------------------------------------------------------------------
*/

const express = require("express");

const app = express();

app.get("/api/products", (req, res) => {
  const products = [
    {
      id: 1,
      name: "Keyboard",
      price: 89.99,
    },
    {
      id: 2,
      name: "Mouse",
      price: 49.99,
    },
  ];

  res.json(products);
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
```

## Learn More

For complete command references, workflow explanations, and additional documentation, visit:

👉 [Bitasmbl Documentation](https://bitasmbl.com/docs)
