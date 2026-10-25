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
        uses: actions/checkout@v6
      - name: Setup Node
        uses: actions/setup-node@249970729cb0ef3589644e2896645e5dc5ba9c38 # v6
        with:
          node-version: '22.23.4'
          package-manager-cache: false
      - name: Check external dependencies
        id: check-external-dependencies
        uses: surikaterna/check-external-dependencies@main
        with:
          internal-dependency-pattern: 'surikat'
      - name: Post To Confluence
        uses: surikaterna/post-dependencies-to-confluence@main
        with:
          dependencies: ${{ steps.check-external-dependencies.outputs.external-dependencies }}
          confluence-url: ${{ secrets.URL }}
          confluence-user: ${{ secrets.USER }}
          confluence-token: ${{ secrets.TOKEN }}
          confluence-content-id: ${{ secrets.CONTENT_ID }}
```

# Runtime security and compatibility

For CVE-2026-111497, this composite action installs **Node.js 22.23.4** with
commit-pinned `actions/setup-node` and runs the existing `lib/index.js` bundle.
All five inputs and authentication values are forwarded unchanged. HTTP
decompression remains enabled. No application code or dependencies changed,
so no bundle rebuild is needed.

Use GitHub Actions runner **2.338.1 or newer with patched embedded Node.js**:
[runner 2.338.1](https://github.com/actions/runner/releases/tag/v2.338.1)
[ships Node.js 24.22.1](https://github.com/actions/runner/blob/v2.338.1/src/Misc/externals.sh)
for the setup-node bootstrap. `runs.using: node24` alone does not select a patch.
Linux, macOS and Windows remain supported where Node.js 22 and Bash are available
(Windows uses Git Bash); this is not a Docker/Linux-only action.
The setup step adds Node.js 22.23.4 to the job's **PATH for subsequent steps**;
run setup-node again afterwards if another runtime is needed.

After merging, select commits/tags containing the fixes for both actions in the
example; old release tags do not change. The example uses `main`; production
workflows should pin fixed commits. Direct development requires
`^22.23.4 || ^24.22.1 || >=26.12.1`. Update self-hosted runners and rerun workflows
to activate the fix; no deployment was performed. See the
[Node.js security release](https://nodejs.org/en/blog/vulnerability/october-2026-security-releases).

Targeted Linux smoke: the unchanged bundle ran through the manifest's Bash command
on Node.js 22.23.4 against local Brotli-encoded Confluence API fixtures. Page reads,
dependency publication, version increment and Basic authentication passed. Hosted
Actions and Windows/macOS were not exercised; no exploit payloads or full suite were run.
