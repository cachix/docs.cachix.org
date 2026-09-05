---
title: "Glossary"
description: "Nix can fetch a binary result instead of performing the build by looking up store hash in binary cache API."
slug: "glossary.html"
---

<span id="glossary" class="legacy-anchor"></span>

<dl class="glossary">
<dt id="term-binary-cache">binary cache</dt><dd><p>Nix can fetch a binary result instead of performing the build by looking up
store hash in binary cache API.</p>
</dd>
<dt id="term-nar-archive">nar archive</dt><dd><p>Deterministic archive alternative to other archives like tar.</p>
<p>See <a href="https://gist.github.com/jbeda/5c79d2b1434f0018d693">specification</a>.</p>
</dd>
<dt id="term-narinfo">narinfo</dt><dd><p>Metadata information about <a href="/glossary.html#term-nar-archive"><span>nar archive</span></a> used by Nix.</p>
</dd>
<dt id="term-signing-key">signing key</dt><dd><p>Secret used by <code><span>cachix</span></code> command line interface to
<a href="https://en.wikipedia.org/wiki/Digital_signature">sign</a> <a href="/glossary.html#term-narinfo"><span>narinfo</span></a>
before it’s pushed to a <a href="/glossary.html#term-binary-cache"><span>binary cache</span></a>.</p>
</dd>
<dt id="term-access-token">access token</dt><dd><p>Secret for accessing Cachix HTTP API authenticated to a user.</p>
</dd>
<dt id="term-agent">agent</dt><dd><p>Cachix Deploy Agent manages a lifecycle of a Nix profile. The agent connects to Cachix and awaits new deployments.</p>
</dd>
<dt id="term-store-path">store path</dt><dd><p>Example: /nix/store/41zwxsdh0l66zvq2wqxnyx55xa1jn9b9-nixos-system-cherimoya-21.05.3367.fd8a7fd07da</p>
</dd>
</dl>
