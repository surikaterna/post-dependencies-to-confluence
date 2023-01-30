Action Template
===============

# TODO

1. Update the description & workflow steps
2. Update the action.yml file
3. Rename from "Action Template" to whatever the actions is called, in the title AND yml.
4. Finalize the logic
5. Compile and commit the compiled bundle
6. Create a v1.0.0 branch to reference

{Describe the action briefly}

# Workflow

* What it does initially
* What happens in the logic
* The final outcome and output

# Usage

Add the following workflow to GitHub Actions to trigger on created and updated pull requests:

```yml
on:
  pull_request:
    types: [opened, edited, synchronize]
    branches:
      - develop

jobs:
  check_external_dependencies:
    runs-on: ubuntu-latest
    name: Action Template
    steps:
      - name: Checkout
        uses: actions/checkout@v3
      - name: Setup Node
        uses: actions/setup-node@v3
        with:
          node-version: 16
      - name: Current action name
        uses: surikaterna/action-template@v1.0.0
        with:
          some-arg: 'input-value'
```
