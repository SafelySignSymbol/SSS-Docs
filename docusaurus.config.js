// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion
const webpack = require('webpack');

const lightCodeTheme = require('prism-react-renderer/themes/github');
const darkCodeTheme = require('prism-react-renderer/themes/dracula');

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'SSS Extension',
  tagline: 'SSS Extension Documents',
  url: 'https://your-docusaurus-test-site.com',
  baseUrl: '/',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/sss_128.png',
  organizationName: 'SSS Extension', // Usually your GitHub org/user name.
  projectName: 'SSS Extension Documents',

  // Even if you don't use internalization, you can use this field to set useful
  // metadata like html lang. For example, if your site is Chinese, you may want
  // to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },
  plugins: [
    function(context, options) {
      return {
        name: 'docusaurus-plugin',
        configureWebpack() {
          return {
            resolve: {
              alias: {
                'crypto': require.resolve('crypto-browserify'),
                'stream': require.resolve('stream-browserify'),
              },
            },
            plugins: [
              new webpack.ProvidePlugin({
                Buffer: ['buffer', 'Buffer'],
              })
            ]
          };
        },
      };
    }
  ],
  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          routeBasePath: '/',
          sidebarPath: require.resolve('./sidebars.js'),
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl: 'https://github.com/inatatsu-tatsuhiro/SSS-Docs',
        },
        blog: {
          showReadingTime: true,
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl: 'https://github.com/inatatsu-tatsuhiro/SSS-Docs',
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      navbar: {
        logo: {
          alt: 'SSS Extension',
          src: 'img/sss_logo.svg',
        },
        items: [
          {
            type: 'doc',
            docId: 'intro',
            position: 'left',
            label: 'DOCS',
          },
          {to: '/blog', label: 'BLOG', position: 'left'},
          {to: '/demo/testnet', label: 'TESTNET DEMO', position: 'left'},
          {to: '/demo/mainnet', label: 'MAINNET DEMO', position: 'left'},
          {
            href: 'https://github.com/inatatsu-tatsuhiro/SSS-Docs',
            label: 'GITHUB',
            position: 'right',
          },
        ],
      },
      footer: {
        style: 'dark',
        links: [
          {
            title: 'Store',
            items: [
              {
                label: 'SSS Extension',
                href: 'https://chrome.google.com/webstore/detail/sss-extension/llildiojemakefgnhhkmiiffonembcan',
              },
              {
                label: 'SSS Dev version',
                href: 'https://chrome.google.com/webstore/detail/sss-extension-dev-beta/bljghapgomlclpjmhhjbjhofbgdpiihp',
              },
              {
                label: 'SSS Archive version',
                href: 'https://chrome.google.com/webstore/detail/sss-extension/mhgjebmbajeidolanlbekpncopdeclio',
              },
            ],
          },
          {
            title: 'Docs',
            items: [
              {
                label: 'UsersGuide',
                to: '/docs/category/developpers-guide',
              },
              {
                label: 'DevellopersGuide',
                to: '/docs/category/developpers-guide',
              },
            ],
          },
          {
            title: 'Community',
            items: [
              {
                label: 'Twitter',
                href: 'https://twitter.com/docusaurus',
              },
              {
                label: 'Discord',
                href: 'https://discord.gg/t84XCanB8F',
              },
              {
                label: 'XYM City',
                href: 'https://discord.gg/xymcity',
              },
            ],
          },
          {
            title: 'More',
            items: [
              {
                label: 'Blog',
                to: '/blog',
              },
              {
                label: 'GitHub',
                href: 'https://github.com/inatatsu-tatsuhiro/SSS-Docs',
              },
              {
                label: 'Wiki',
                href: 'https://github.com/inatatsu-tatsuhiro/SSS-Docs/wiki',
              },
              {
                label: 'Demo',
                href: 'https://inatatsu-tatsuhiro.github.io/SSS-Demo/',
              },
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} Safely Sign Symbol. Built with Docusaurus.`,
      },
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
      },
    }),
};

module.exports = config;
