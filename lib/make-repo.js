'use strict'

/* Shamelessly taken from js-github example.
 * Will refactor later.
 * Possibly.
 * Don't even care.
 * Nice module btw, thanks. */

module.exports = function makeRepo(repo, token) {
  // Start out the normal way with a plain object.
  var repo = {}

  // This only works for normal repos.  Github doesn't allow access to gists as
  // far as I can tell.
  var githubName = repo

  // Your user can generate these manually at https://github.com/settings/tokens/new
  // Or you can use an oauth flow to get a token for the user.
  var githubToken = token

  // Mixin the main library using github to provide the following:
  // - repo.loadAs(type, hash) => value
  // - repo.saveAs(type, value) => hash
  // - repo.readRef(ref) => hash
  // - repo.updateRef(ref, hash) => hash
  // - repo.createTree(entries) => hash
  // - repo.hasHash(hash) => has
  require('js-github/mixins/github-db')(repo, githubName, githubToken)

  // Github has this built-in, but it's currently very buggy so we replace with
  // the manual implementation in js-git.
  require('js-git/mixins/create-tree')(repo)

  // Cache github objects locally in indexeddb
  require('js-git/mixins/add-cache')(repo, require('js-git/mixins/indexed-db'))

  // Cache everything except blobs over 100 bytes in memory.
  // This makes path-to-hash lookup a sync operation in most cases.
  require('js-git/mixins/mem-cache')(repo)

  // Combine concurrent read requests for the same hash
  require('js-git/mixins/read-combiner')(repo)

  // Add in value formatting niceties.  Also adds text and array types.
  require('js-git/mixins/formats')(repo)
}

