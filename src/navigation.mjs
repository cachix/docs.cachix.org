const page = (label, path) => ({ label, link: `/${path}.html` });

export const sidebar = [
  { label: 'Overview', link: '/' },
  { label: 'Binary caches', items: [
    page('What is a binary cache?', 'what-is-a-binary-cache'),
    page('Make your first push', 'getting-started'),
    page('Use an existing cache', 'using-a-cache'),
    page('Configuring a cache', 'configuring-a-cache'),
    page('Pushing to Cachix', 'pushing'),
  ] },
  { label: 'Continuous Integration', items: [
    page('Caching builds in CI', 'continuous-integration-setup/index'),
    page('GitHub Actions (cachix-action)', 'continuous-integration-setup/github-actions'),
    page('Buildkite', 'continuous-integration-setup/buildkite'),
    page('CircleCI', 'continuous-integration-setup/circleci'),
    page('GitLab CI', 'continuous-integration-setup/gitlab'),
    page('Hercules CI', 'continuous-integration-setup/hercules-ci'),
    page('Hydra', 'continuous-integration-setup/hydra'),
    page('Travis CI', 'continuous-integration-setup/travis-ci'),
  ] },
  { label: 'Cache management', items: [
    page('Upstreams', 'upstreams'),
    page('Garbage Collection', 'garbage-collection'),
    page('Pins', 'pins'),
    page('Importing from S3', 'importing-from-s3'),
  ] },
  { label: 'Reference', items: [
    page('Cachix CLI', 'cli'),
    page('Installation options', 'installation'),
    page('Security', 'security'),
    page('FAQ', 'faq'),
    page('Glossary', 'glossary'),
  ] },
  { label: 'Cachix Deploy', collapsed: true, items: [
    page('Overview', 'deploy/index'),
    { label: 'Running an agent', items: [
      page('Getting started', 'deploy/running-an-agent/index'),
      page('Simple Nix profile', 'deploy/running-an-agent/manually'),
      page('NixOS', 'deploy/running-an-agent/nixos'),
      page('nix-darwin', 'deploy/running-an-agent/darwin'),
      page('Home Manager', 'deploy/running-an-agent/home-manager'),
    ] },
    page('Deploying to agents', 'deploy/deploying-to-agents/index'),
    page('Troubleshooting', 'deploy/troubleshooting'),
    page('Reference', 'deploy/reference'),
  ] },
];
