const page = (label, path) => ({ label, link: `/${path}.html` });

export const sidebar = [
  { label: 'Overview', link: '/' },
  { label: 'Get started', items: [
    page('What is a Binary Cache?', 'what-is-a-binary-cache'),
    page('Installation', 'installation'),
    page('Getting Started', 'getting-started'),
  ] },
  { label: 'Guides', items: [
    page('Pushing to Cachix', 'pushing'),
    { label: 'Continuous integration', collapsed: true, items: [
      page('Overview', 'continuous-integration-setup/index'),
      page('GitHub Actions', 'continuous-integration-setup/github-actions'),
      page('Buildkite', 'continuous-integration-setup/buildkite'),
      page('CircleCI', 'continuous-integration-setup/circleci'),
      page('GitLab CI', 'continuous-integration-setup/gitlab'),
      page('Hercules CI', 'continuous-integration-setup/hercules-ci'),
      page('Hydra', 'continuous-integration-setup/hydra'),
      page('Travis CI', 'continuous-integration-setup/travis-ci'),
    ] },
    page('Pins', 'pins'),
    page('Garbage Collection', 'garbage-collection'),
    page('Importing from S3', 'importing-from-s3'),
  ] },
  { label: 'Explanation', items: [page('Security', 'security')] },
  { label: 'Reference', items: [
    page('Frequently Asked Questions', 'faq'),
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
  { label: 'Enterprise', collapsed: true, items: [
    page('Overview', 'enterprise/index'),
    page('Telemetry', 'enterprise/telemetry'),
  ] },
];
