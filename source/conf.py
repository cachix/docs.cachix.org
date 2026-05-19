#!/usr/bin/env python3
# -*- coding: utf-8 -*-

import datetime

# -- General configuration ------------------------------------------------

extensions = []

templates_path = ['_templates']

source_suffix = '.rst'

master_doc = 'index'

project = ''
copyright = u'2016-{}, Enlambda OÜ'.format(datetime.date.today().year)
author = u'Enlambda OÜ'

release = ""

language = 'en'

suppress_warnings = ["ref.option"]

linkcheck_ignore = [
    # anchor is done via JS
    "https://docs.gitlab.com/ee/ci/variables/#creating-a-custom-environment-variable"
]

exclude_patterns = []

pygments_style = 'sphinx'


# -- Options for HTML output ----------------------------------------------

html_theme = "alabaster"

# https://alabaster.readthedocs.io/en/latest/customization.html
html_theme_options = {
    "description": 'Binary Cache platform for open source and business.',
    "github_user": "cachix",
    "github_repo": "docs.cachix.org",
    "github_type": "star",
    "fixed_sidebar": True,
    "github_banner": True,
}

html_logo = 'logo.png'
html_favicon = 'favicon.svg'

html_sidebars = {
    '**': [
        'about.html',
        'searchbox.html',
        'navigation.html',
        'srclinks.html'
        ],
}
