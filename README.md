Post Dependencies To Confluence
===============================

Take a JSON list of dependencies as input and post them to a configured Confluence wiki page.

# Workflow

* Get the dependencies provided from a previous action
* Get the current dependencies from the configured wiki page
* Merge the new and existing dependencies
* Convert to markup
* Update the wiki page replacing the content with the new table of dependencies

# Usage

Add the following workflow to GitHub Actions to trigger on created and updated pull requests:

```yml
on:
  pull_request:
    types: [opened, edited, synchronize]
    branches:
      - develop

jobs:
  update_external_dependencies:
    runs-on: ubuntu-latest
    name: Update External Dependencies
    steps:
      - name: Checkout
        uses: actions/checkout@v3
      - name: Setup Node
        uses: actions/setup-node@v3
        with:
          node-version: 16
      - name: Check external dependencies
        uses: surikaterna/check-external-dependencies@v1.0.1
        with:
          internal-dependency-pattern: 'surikat'
      - name: Post To Confluence
        uses: surikaterna/post-dependencies-to-confluence@v1.0.0
        with:
          dependency-input-name: 'external-dependencies'
          confluence-url: ${{ secrets.URL }}
          confluence-user: ${{ secrets.USER }}
          confluence-token: ${{ secrets.TOKEN }}
          confluence-content-id: ${{ secrets.CONTENT_ID }}
```
